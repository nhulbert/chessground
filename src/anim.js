var util = require('./util');
var collide = require('./collide');

// https://gist.github.com/gre/1650294
var easing = {
  easeInOutCubic: function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
};

function makePiece(k, piece, invert) {
  var key = invert ? util.invertKey(k) : k;
  return {
    key: key,
    pos: util.key2pos(key),
    role: piece.role,
    color: piece.color
  };
}

function samePiece(p1, p2) {
  return p1.role === p2.role && p1.color === p2.color;
}

function closer(piece, pieces) {
  return pieces.sort(function(p1, p2) {
    return util.distance(piece.pos, p1.pos) - util.distance(piece.pos, p2.pos);
  })[0];
}

function computePlan(prev, current) {
  var bounds = current.bounds(),
    width = bounds.width / 8,
    height = bounds.height / 8,
    anims = {},
    animedOrigs = [],
    fadings = [],
    missings = [],
    news = [],
    invert = prev.orientation !== current.orientation,
    prePieces = {},
    white = current.orientation === 'white';
  for (var pk in prev.pieces) {
    var piece = makePiece(pk, prev.pieces[pk], invert);
    prePieces[piece.key] = piece;
  }
  for (var i = 0; i < util.allKeys.length; i++) {
    var key = util.allKeys[i];
    if (key !== current.movable.dropped[1]) {
      var curP = current.pieces[key];
      var preP = prePieces[key];
      if (curP) {
        if (preP) {
          if (!samePiece(curP, preP)) {
            missings.push(preP);
            news.push(makePiece(key, curP, false));
          }
        } else
          news.push(makePiece(key, curP, false));
      } else if (preP)
        missings.push(preP);
    }
  }
  news.forEach(function(newP) {
    var preP = closer(newP, missings.filter(util.partial(samePiece, newP)));
    if (preP) {
      var orig = white ? preP.pos : newP.pos;
      var dest = white ? newP.pos : preP.pos;
      var vector = [(orig[0] - dest[0]) * width, (dest[1] - orig[1]) * height];
      anims[newP.key] = [vector, vector];
      animedOrigs.push(preP.key);
    }
  });
  missings.forEach(function(p) {
    if (
      p.key !== current.movable.dropped[0] &&
      !util.containsX(animedOrigs, p.key) &&
      !(current.items ? current.items.render(p.pos, p.key) : false)
    )
      fadings.push({
        piece: p,
        opacity: 1
      });
  });

  return {
    anims: anims,
    fadings: fadings
  };
}

function roundBy(n, by) {
  return Math.round(n * by) / by;
}

function go(data) {
  if (!data.animation.current.start) return; // animation was canceled
  var rest = 1 - (new Date().getTime() - data.animation.current.start) / data.animation.current.duration;
  if (rest <= 0) {
    data.animation.current = {};
    data.render();
  } else {
    var ease = easing.easeInOutCubic(rest);
    for (var key in data.animation.current.anims) {
      var cfg = data.animation.current.anims[key];
      cfg[1] = [roundBy(cfg[0][0] * ease, 10), roundBy(cfg[0][1] * ease, 10)];
    }
    for (var i in data.animation.current.fadings) {
      data.animation.current.fadings[i].opacity = roundBy(ease, 100);
    }
    data.render();
    util.requestAnimationFrame(function() {
      go(data);
    });
  }
}

function goDiscrete(data){
  if (!data.animationDiscrete.current.active) return; // animation was canceled
  var rest = 1 - (new Date().getTime() - data.animationDiscrete.current.start) / data.animationDiscrete.current.duration;
  if (rest <= 0){
    //data.animationDiscrete.current = {};
    for (var key in data.animationDiscrete.current.anims){
        var cfg = data.animationDiscrete.current.anims[key];
        cfg[1] = cfg[0][data.animationDiscrete.current.numFrames-1];
    }
    var toRemove = data.animationDiscrete.current.toRemove;
    for (var key in toRemove){
        delete data.pieces[toRemove[key]];
        delete data.animationDiscrete.current.anims[toRemove[key]];
    }
    data.animationDiscrete.current.active = false;
    data.render();
  } else{
    var frameNum = Math.floor((1-rest)*data.animationDiscrete.current.numFrames);
    for (var key in data.animationDiscrete.current.anims){
      var cfg = data.animationDiscrete.current.anims[key];
      cfg[1] = cfg[0][frameNum];
    }
    data.render();
    util.requestAnimationFrame(function(){
      goDiscrete(data);
    });
  }
}

function animate(transformation, data) {
  // clone data
  var prev = {
    orientation: data.orientation,
    pieces: {}
  };
  // clone pieces
  for (var key in data.pieces) {
    prev.pieces[key] = {
      role: data.pieces[key].role,
      color: data.pieces[key].color
    };
  }
  var result = transformation();
  if (data.animation.enabled) {
    var plan = computePlan(prev, data);
    if (Object.keys(plan.anims).length > 0 || plan.fadings.length > 0) {
      var alreadyRunning = data.animation.current.start;
      data.animation.current = {
        start: new Date().getTime(),
        duration: data.animation.duration,
        anims: plan.anims,
        fadings: plan.fadings,
        active: true
      };
      if (!alreadyRunning) go(data);
    } else {
      // don't animate, just render right away
      data.renderRAF();
    }
  } else {
    // animations are now disabled
    data.renderRAF();
  }
  return result;
}

function animateDiscrete(flickInfo, data){
  if (data.animationDiscrete.enabled){
    var plan = computePlanDiscrete(flickInfo, data);
    if (Object.keys(plan.anims).length > 0){
      var alreadyRunning = data.animationDiscrete.current.active;
      data.animationDiscrete.current = {
        start: new Date().getTime(),
        duration: data.animationDiscrete.duration,
        anims: plan.anims,
        numFrames: plan.numFrames,
        active: true,
        toRemove: plan.toRemove
      };
      if (!alreadyRunning) goDiscrete(data);
    }
  }
}

function computePlanDiscrete(flickInfo, current){
  var bounds = current.bounds();
  var width = bounds.width / 8;
  var height = bounds.height / 8;
  var curs = [];
  var anims = [];
  var white = current.orientation === 'white';
  for (var i = 0; i < util.allKeys.length; i++) {
    var key = util.allKeys[i];
    if (key !== current.movable.dropped[1]) {
      var curP = current.pieces[key];
      if (curP) {
        curs.push(makePiece(key, curP, false));
      }
    }
  }
  
  var numFrames = 300;
  
  var tempCur = [];
  
  var firstFlick = !current.animationDiscrete.current.anims;
  
  var moveColor;    
    
  for (var h=0; h<curs.length; h++) {
    var newP = curs[h];
    var pos;
    if (!firstFlick){
      var posOrig = current.animationDiscrete.current.anims[newP.key][1];
      pos = [posOrig[0]/width, posOrig[1]/height];
    }
    else {
      pos = white ? [newP.pos[0]-1, 8-newP.pos[1]] : [8-newP.pos[0], newP.pos[1]-1];
    }
    var vel = [0,0];
    var activated = newP.key === flickInfo.piece;
    
    if (activated) {
        moveColor = newP.color;
        var dist2 = flickInfo.vec[0]*flickInfo.vec[0]+flickInfo.vec[1]*flickInfo.vec[1];
        vel[0] = flickInfo.vec[0];
        vel[1] = flickInfo.vec[1];
        if (dist2 > 5041){
            var fact = 71/Math.sqrt(dist2);
            vel[0] *= fact;
            vel[1] *= fact;
        }
        vel[0] = -vel[0]*0.04/64;
        vel[1] = -vel[1]*0.04/64;
    }
    tempCur.push({pos: pos,
                  vel: vel,
                  role: newP.role,
                  color: newP.color,
                  key: newP.key,
                  activated: activated});
  }
  
  var toRemove = [];
  var collideRemove = false;
  
  for (var i = 0; i < numFrames; i++){
    for (var h=0; h<tempCur.length; h++){
      var newP = tempCur[h];
      if (newP.activated) {
          newP.pos[0] = newP.vel[0]+newP.pos[0];
          newP.pos[1] = newP.vel[1]+newP.pos[1];
          newP.vel[0] *= 0.99;
          newP.vel[1] *= 0.99;
          var col = collide.isColliding(current.orientation, h, tempCur);
          for (var j=0; j<col.length; j++) {
              var other = tempCur[col[j][0]];
              var corDir = col[j][1];
              
              if (!collideRemove && newP.color === moveColor && newP.color !== other.color){
                  toRemove.push(other.key);
                  collideRemove = true;
              }
              
              newP.pos[0] += (1.05*corDir[0])/256;
              newP.pos[1] += (1.05*corDir[1])/256;
              
              var dist = Math.sqrt(corDir[0]*corDir[0]+corDir[1]*corDir[1]);

              corDir[0] /= dist;
              corDir[1] /= dist;

              var dot = collide.dot(newP.vel, corDir);
              var newPVelComp = [dot*corDir[0], dot*corDir[1]];
              var newPFricComp = [newP.vel[0]-newPVelComp[0], newP.vel[1]-newPVelComp[1]];
              
              dot = collide.dot(other.vel, corDir);
              var otherVelComp = [dot*corDir[0], dot*corDir[1]];
              var otherFricComp = [other.vel[0]-otherVelComp[0], other.vel[1]-otherVelComp[1]];
              
              var restCoef = 0.9;
              var fricCoef = -0.7;
              
              newP.vel[0] += (restCoef*(otherVelComp[0]-newPVelComp[0])+newPVelComp[0]+otherVelComp[0])/2-newPVelComp[0];
              newP.vel[1] += (restCoef*(otherVelComp[1]-newPVelComp[1])+newPVelComp[1]+otherVelComp[1])/2-newPVelComp[1];
              
              other.vel[0] += (restCoef*(newPVelComp[0]-otherVelComp[0])+newPVelComp[0]+otherVelComp[0])/2-otherVelComp[0];
              other.vel[1] += (restCoef*(newPVelComp[1]-otherVelComp[1])+newPVelComp[1]+otherVelComp[1])/2-otherVelComp[1];
              
              newP.vel[0] += (fricCoef*(otherFricComp[0]-newPFricComp[0])+newPFricComp[0]+otherFricComp[0])/2-newPFricComp[0];
              newP.vel[1] += (fricCoef*(otherFricComp[1]-newPFricComp[1])+newPFricComp[1]+otherFricComp[1])/2-newPFricComp[1];
              
              other.vel[0] += (fricCoef*(newPFricComp[0]-otherFricComp[0])+newPFricComp[0]+otherFricComp[0])/2-otherFricComp[0];
              other.vel[1] += (fricCoef*(newPFricComp[1]-otherFricComp[1])+newPFricComp[1]+otherFricComp[1])/2-otherFricComp[1];
              
              /*newP.vel[0] += otherVelComp[0]-newPVelComp[0];
              newP.vel[1] += otherVelComp[1]-newPVelComp[1];

              other.vel[0] += newPVelComp[0]-otherVelComp[0];
              other.vel[1] += newPVelComp[1]-otherVelComp[1];*/           
              
              other.activated = true;
          }
      }
      
      var animsKey = anims[newP.key];
      if (animsKey){
          var frames = anims[newP.key][0];
          frames.push([newP.pos[0]*width, newP.pos[1]*height]);
      }
      else {
          anims[newP.key] = [ [[newP.pos[0]*width, newP.pos[1]*height]], [newP.pos[0]*width, newP.pos[1]*height] ];
      }
    }
  }

  for (var h=0; h<tempCur.length; h++){
      var newP = tempCur[h];
      
      if (newP.activated){
          if (collide.isOutsideBounds(newP)){
              toRemove.push(newP.key);
          }
      }
  }
    
  return {
    anims: anims,
    numFrames: numFrames,
    toRemove: toRemove
  };
}

// transformation is a function
// accepts board data and any number of arguments,
// and mutates the board.
module.exports = function(transformation, data, skip) {
  return function(flickInfo) {
    var transformationArgs = [data].concat(Array.prototype.slice.call(arguments, 0));
    if (!flickInfo || !flickInfo.vec){
      if (!data.render)
        return transformation.apply(null, transformationArgs);
      else if (data.animation.enabled && !skip)
        return animate(util.partialApply(transformation, transformationArgs), data);
      else {
        var result = transformation.apply(null, transformationArgs);
        data.renderRAF();
        return result;
      }
    }
    else{
      if (!data.render)
        return transformation.apply(null, transformationArgs);
      else if (data.animationDiscrete.enabled && !skip)
        return animateDiscrete(flickInfo, data);
    }
  };
};
