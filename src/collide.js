var boundingPolys = {
    pawn:
        [
            [
                [189, 190],
                [175, 163],
                [156, 146],
                [166, 126],
                [162, 101],
                [149, 85],
                [151, 65],
                [143, 53],
                [125, 46],
                [106, 55],
                [98, 69],
                [100, 86],
                [88, 100],
                [84, 127],
                [94, 146],
                [75, 164],
                [60, 194],
                [56, 228],
                [195, 229]
            ],

            [
                [2,3,4,5],
                [5,6,7,8,9,10,11],
                [14,15,16,17,18,0,1,2],
                [2,5,11,12,13,14]
            ],

            [
                56,195,46,229
            ]
        ],
    knight:
        [
            [
                [220, 221],
                [219, 171],
                [212, 129],
                [196, 91],
                [163, 62],
                [129, 51],
                [123, 37],
                [115, 36],
                [102, 51],
                [96, 51],
                [82, 38],
                [75, 38],
                [72, 47],
                [75, 60],
                [65, 76],
                [30, 143],
                [31, 161],
                [41, 174],
                [56, 175],
                [60, 180],
                [71, 179],
                [85, 164],
                [103, 150],
                [128, 130],
                [119, 160],
                [90, 191],
                [81, 218],
                [83, 226],
                [217, 226]
            ],

            [
                [5,6,7,8],
                [9,10,11,12,13],
                [9,13,14,15,16,17,18],
                [9,18,19,20,21],
                [9,21,22,23],
                [24,25,26,27,28,0],
                [23,24,0],
                [0,1,2,3,4,5,8,9,23]
            ],
            
            [
                30,220,36,226
            ]
        ],
    bishop:
        [
            [
                [156, 222],
                [195, 221],
                [214, 225],
                [226, 215],
                [202, 200],
                [146, 196],
                [173, 186],
                [176, 178],
                [174, 163],
                [165, 149],
                [179, 133],
                [181, 111],
                [173, 89],
                [157, 70],
                [140, 59],
                [146, 48],
                [143, 35],
                [128, 27],
                [113, 33],
                [109, 47],
                [116, 60],
                [100, 69],
                [83, 86],
                [74, 106],
                [75, 130],
                [90, 149],
                [82, 164],
                [79, 175],
                [82, 185],
                [109, 196],
                [42, 203],
                [30, 216],
                [42, 226],
                [60, 222],
                [113, 222],
                [128, 218]
            ],

            [
                [5,6,7,8,9],
                [9,10,11,12,13,14],
                [14,15,16,17,18,19,20],
                [14,20,21,22,23,24,25],
                [29,30,31,32,33],
                [29,33,34,35],
                [29,35,0,1],
                [29,1,2,3,4,5],
                [5,9,14,25,26,27,28,29]
            ],
            
            [
                30,226,27,226
            ]
        ],
    rook:
        [
            [
                [209, 221],
                [208, 201],
                [192, 199],
                [192, 180],
                [180, 166],
                [180, 98],
                [197, 80],
                [197, 48],
                [58, 48],
                [58, 81],
                [76, 98],
                [75, 166],
                [63, 180],
                [63, 200],
                [47, 201],
                [47, 223],
                [50, 226],
                [205, 226]
            ],

            [
                [2,3,4],
                [5,6,7,8,9,10],
                [5,10,11],
                [13,14,15,16,17,0,1,2],
                [4,5,11,12,13],
                [2,4,13]
            ],
            
            [
                47,209,48,226
            ]
        ],
    queen:
        [
            [
                [202, 213],
                [197, 203],
                [190, 178],
                [208, 155],
                [220, 84],
                [236, 75],
                [235, 60],
                [225, 52],
                [179, 35],
                [128, 27],
                [79, 33],
                [24, 55],
                [17, 66],
                [24, 80],
                [36, 84],
                [49, 157],
                [66, 180],
                [64, 188],
                [55, 204],
                [53, 215],
                [61, 223],
                [128, 228],
                [195, 224]
            ],

            [
                [4,5,6,7,8,9,10,11,12,13,14],
                [4,14,15,16],
                [4,16,17],
                [21,22,0,1],
                [2,3,4,17,18,19,20,21],
                [1,2,21]
            ],
            
            [
                17,236,27,228
            ]
        ],
    king:
        [
            [
                [165, 225],
                [189, 211],
                [189, 173],
                [205, 161],
                [219, 146],
                [226, 128],
                [219, 103],
                [202, 90],
                [177, 86],
                [150, 96],
                [150, 81],
                [143, 70],
                [146, 45],
                [128, 30],
                [109, 45],
                [113, 70],
                [106, 82],
                [106, 98],
                [91, 91],
                [69, 86],
                [47, 92],
                [31, 111],
                [31, 141],
                [61, 171],
                [61, 213],
                [93, 226],
                [127, 231]
            ],
        
            [
                [2,3,4,5,6,7,8,9],
                [11,12,13,14,15],
                [17,18,19,20,21,22,23],
                [17,23,24,25,26,0,1,2],
                [9,10,11,15,16,17],
                [2,9,17]
            ],
            
            [
                31,226,30,231
            ]
        ]
};

function dot(a, b){
    return a[0]*b[0]+a[1]*b[1];
}

function distance(a, b){
    if (!b){
        b = [0,0];
    }
    return Math.sqrt((a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]));
}

function generatePolyAccess(basePoly, polyInds) {
    return function(ind){
        return basePoly[polyInds[ind]];
    };
}

function polyPolygonProj(basePoly1, polyInds1, basePoly2, polyInds2) {  // Returns a vector representing the minimal displacement for the first polygon
    var proj = [0,0];
    
    var compare;
    var val;
    var separating;

    var penetration = Number.MAX_VALUE;
    var vector = [0,0];

    var maxpenetration;
    var temp;
    
    var poly1 = generatePolyAccess(basePoly1, polyInds1);
    var poly2 = generatePolyAccess(basePoly2, polyInds2);
    
    for (var i = 0; i < polyInds1.length; i++){
        separating = true;

        maxpenetration = Number.MIN_VALUE;

        proj[0] = poly1((i+1)%polyInds1.length)[1]-poly1(i)[1];
        proj[1] = poly1(i)[0]-poly1((i+1)%polyInds1.length)[0];

        compare = poly1(i)[0]*proj[0]+poly1(i)[1]*proj[1];
        
        for (var h = 0; h < polyInds2.length; h++){
            val = poly2(h)[0]*proj[0]+poly2(h)[1]*proj[1];
            if (val>compare){
                separating = false;

                temp = val-compare;

                if (temp > maxpenetration){
                    maxpenetration = temp;
                }
            }
        }

        if (separating) return null;

        temp = distance(proj);
        maxpenetration /= temp;

        if (maxpenetration < penetration){
            vector[0] = (proj[0] / temp)*maxpenetration;
            vector[1] = (proj[1] / temp)*maxpenetration;
            penetration = maxpenetration;
        }
    }

    for (var i = 0; i < polyInds2.length; i++){
        separating = true;

        maxpenetration = Number.MIN_VALUE;

        proj[0] = poly2((i+1)%polyInds2.length)[1]-poly2(i)[1];
        proj[1] = poly2(i)[0]-poly2((i+1)%polyInds2.length)[0];

        compare = poly2(i)[0]*proj[0]+poly2(i)[1]*proj[1];

        for (var h = 0; h < polyInds1.length; h++){
            val = poly1(h)[0]*proj[0]+poly1(h)[1]*proj[1];
            
            if (val>compare){
                separating = false;

                temp = val-compare;

                if (temp > maxpenetration){
                    maxpenetration = temp;
                }
            }
        }

        if (separating) return null;

        temp = distance(proj);
        maxpenetration /= temp;

        if (maxpenetration < penetration){
            vector[0] = -(proj[0] / temp)*maxpenetration;
            vector[1] = -(proj[1] / temp)*maxpenetration;
            penetration = maxpenetration;
        }
    }

    return vector;
}

function convexListCollide(basePoly1, polyInd, basePoly2, polyInds) {
    for (var i=0; i<polyInds.length; i++) {
        var res = polyPolygonProj(basePoly1, polyInd, basePoly2, polyInds[i]);
        if (res) return res;
    }
    return null;
}

function cPolyCPoly(basePoly1, inds1, basePoly2, inds2) {
    for (var i=0; i<inds1.length; i++) {
        var res = convexListCollide(basePoly1, inds1[i], basePoly2, inds2);
        if (res) return res;
    }
    return null;
}

function pointCPoly(pos, basePoly1, polyInds1) {  // Returns a vector representing the minimal displacement for the first polygon
    var proj = [0,0];
    
    var compare;
    var val;
    
    var poly1 = generatePolyAccess(basePoly1, polyInds1);
    
    for (var i = 0; i < polyInds1.length; i++){        
        proj[0] = poly1((i+1)%polyInds1.length)[1]-poly1(i)[1];
        proj[1] = poly1(i)[0]-poly1((i+1)%polyInds1.length)[0];
        
        compare = poly1(i)[0]*proj[0]+poly1(i)[1]*proj[1];
        
        val = pos[0]*proj[0]+pos[1]*proj[1];
        if (val<compare){
            return false;
        }
    }
    
    return true;
}

function pointCPolys(pos, role) {
    var poly = boundingPolys[role];
    var polyInds = poly[1];
    var AABB = poly[2];
    if (pos[0] < AABB[0] || pos[0] > AABB[1] || pos[1] < AABB[2] || pos[1] > AABB[3]){
        return false;
    }
    for (var i=0; i<polyInds.length; i++){
        if (pointCPoly(pos, poly[0], polyInds[i])){
            return true;
        }
    }
    return false;
}

function point(position, keys, data) {
    var color = data.orientation;
    var anims = data.animationDiscrete.current.anims;
    var pieces = data.pieces;
    var bounds = data.bounds();
    var posWhole = [Math.floor((position[0]-bounds.left)/(bounds.width)*8), Math.floor((position[1]-bounds.top)/(bounds.height)*8)];
    var posPart = [((position[0]-bounds.left)/(bounds.width)*8)%1, ((position[1]-bounds.top)/(bounds.height)*8)%1];
    for (var i=0; i<keys.length; i++){
        var key = keys[i];
        var piece = pieces[key];
        var anim = anims[key];
        var piecePos = [anim[1][0]*8/bounds.width*256, anim[1][1]*8/bounds.width*256];
        var pos;
        if (color !== piece.color){
            pos = [256*(posWhole[0]+1-posPart[0])-piecePos[0], 256*(posWhole[1]+1-posPart[1])-piecePos[1]];
        }
        else{
            pos = [256*(posWhole[0]+posPart[0])-piecePos[0], 256*(posWhole[1]+posPart[1])-piecePos[1]];
        }
        if (pointCPolys(pos, piece.role)){
            return key;
        }
    }
}

function piecePiecesColliding(color, pieceNum, curs) {
    var pieceType = curs[pieceNum].role;
    
    var piecesTransPoly = [];
    var transAABBs = [];
    
    for (var i=0; i<curs.length; i++) {
        var pType = curs[i].role;
        var pColor = curs[i].color;
        
        var rawPoly = boundingPolys[pType][0];
        var trans = curs[i].pos;
        var transPoly = [];
        
        var flip = (color !== pColor);
        
        var rawAABB = boundingPolys[pType][2];
        
        var tempAABB = [];
        
        tempAABB = [];
        
        for (var h=0; h<4; h++){
            var raw = rawAABB[h];
            if (flip) raw = 255-raw;
            tempAABB.push(raw+256*trans[Math.floor(h/2)]);
        }
        
        if (flip){
            var temp = tempAABB[0];
            tempAABB[0] = tempAABB[1];
            tempAABB[1] = temp;
            
            temp = tempAABB[2];
            tempAABB[2] = tempAABB[3];
            tempAABB[3] = temp;
        }
        
        transAABBs.push(tempAABB);
        
        for (var h=0; h < rawPoly.length; h++) {
            var pnt = rawPoly[h];
            var x = pnt[0];
            var y = pnt[1];
            
            if (flip) {
                x = 255-x;
                y = 255-y;
            }
            
            transPoly.push([x+256*trans[0], y+256*trans[1]]);
        }
        piecesTransPoly.push(transPoly);
    }
    
    var pieceTransPoly = piecesTransPoly[pieceNum];
    var curAABB = transAABBs[pieceNum];
    
    var toReturn = [];
    
    for (var i=1; i<curs.length; i++) {
        var ind = (pieceNum+i)%curs.length;
        if (!(curs[ind].activated && ind < pieceNum)){
            var otherType = curs[ind].role;
            
            var othAABB = transAABBs[ind];
            var xAABBCol = (curAABB[1] >= othAABB[0] && curAABB[1] <= othAABB[1]) || (curAABB[0] <= othAABB[1] && curAABB[0] >= othAABB[0]) ||
                           (othAABB[1] >= curAABB[0] && othAABB[1] <= curAABB[1]) || (othAABB[0] <= curAABB[1] && othAABB[0] >= curAABB[0]);
            var yAABBCol = (curAABB[3] >= othAABB[2] && curAABB[3] <= othAABB[3]) || (curAABB[2] <= othAABB[3] && curAABB[2] >= othAABB[2]) ||
                           (othAABB[3] >= curAABB[2] && othAABB[3] <= curAABB[3]) || (othAABB[2] <= curAABB[3] && othAABB[2] >= curAABB[2]);

            if (xAABBCol && yAABBCol){
                var res = cPolyCPoly(pieceTransPoly, boundingPolys[pieceType][1], piecesTransPoly[ind], boundingPolys[otherType][1]);
                if (res){
                    toReturn.push([ind, res]);
                }
            }
        }
    }
    
    return toReturn;
}

function isOutsideBounds(cur, color) {
        var pType = cur.role;
        var pColor = cur.color;
        
        var trans = cur.pos;
        
        var flip = (color !== pColor);
        
        var rawAABB = boundingPolys[pType][2];
        
        var tempAABB = [];
        
        tempAABB = [];
        
        for (var h=0; h<4; h++){
            var raw = rawAABB[h];
            if (flip) raw = 255-raw;
            tempAABB.push(raw+256*trans[Math.floor(h/2)]);
        }
        
        if (flip){
            var temp = tempAABB[0];
            tempAABB[0] = tempAABB[1];
            tempAABB[1] = temp;
            
            temp = tempAABB[2];
            tempAABB[2] = tempAABB[3];
            tempAABB[3] = temp;
        }
        
        if (tempAABB[0] > 256*8 || tempAABB[1] < 0 || tempAABB[2] > 256*8 || tempAABB[3] < 0){
            return true;
        }
    
        return false;
}

module.exports = {
    isColliding: piecePiecesColliding,
    isOutsideBounds: isOutsideBounds,
    point: point,
    dot: dot
};
