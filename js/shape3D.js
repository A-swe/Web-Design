function Shape3D(type, origin, grid, id) {
    this.origin = origin || new Point3D(0, 0, 0);
    this.initGrid = grid || 1;
    this.id = id;
    this.rotateLines = [];

    this.lineStyle = {
        opacity: 0
    };

    this.textStyle = {
        fontSize: "18px",
        fill: "red",
        "text-anchor": "middle"
    };

    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;

    this.initGrid = grid;
    this.openFaceData = [];
    this.type = type;
    this.isPlaying = false;
    this.translateStep = 0.01;
    this.translateDirection = 1;
    this.translateRatioMin = 0;
    this.translateRatioMax = 1;
    this.translateRatio = this.translateRatioMin;
    this.translateRatioOpacity = 0.7;
    this.translateRatioShowLabel = 0.2;
    this.opacity = 1;

    this.initVertices = [
        new Point3D(1, -1, 1),
        new Point3D(-1, -1, 1),
        new Point3D(-1, -1, -1),
        new Point3D(1, -1, -1),
        new Point3D(1, 1, 1),
        new Point3D(-1, 1, 1),
        new Point3D(-1, 1, -1),
        new Point3D(1, 1, -1),
    ];

    this.adjustRatio = 0.95;
    this.initAngles = [31, 48, 24.2];
    this.origin = new Point3D(-1, 0, 0);

    switch (type) {
        case CONST.SHAPE_TYPES.CUBE_CORE:
            // vertices
            this.vertices = [
                this.initVertices[1],
                this.initVertices[3],
                this.initVertices[4],
                this.initVertices[6],
            ];

            this.translateVector = this.initVertices[1].sub(this.origin);
            

            this.vertexLabels = [
                "D", "B", "G", "E"
            ];

            // edges
            this.edges = [
                [0, 1],
                [0, 2],
                [0, 3],

                [1, 2],
                [1, 3],

                [2, 3]
            ];

            this.initEdges = this.edges.slice();
            this.duplicateEdges = [
                
            ];

            // faces
            this.faces = [
                [0, 1, 3],
                [1, 2, 3],
                [0, 1, 2],
                [0, 2, 3]
            ];

            this.isShowFaces = [true, true, true, true];

        break;

        case CONST.SHAPE_TYPES.CUBE_BDE:
            // vertices
            this.vertices = [
                this.initVertices[2],
                this.initVertices[1],
                this.initVertices[3],
                this.initVertices[6],
            ];

            this.translateVector = this.initVertices[2].sub(this.origin);

            this.vertexLabels = [
                "1-A", "1-D@", "1-B@", "1-E@"
            ];

            // edges
            this.edges = [
                [0, 1],
                [0, 2],
                [0, 3],
                [1, 2],
                [1, 3],
                [2, 3]
            ];

            this.initEdges = this.edges.slice();
            this.duplicateEdges = [

            ];

            // faces
            this.faces = [
                [1, 2, 3],
                [0, 2, 3],
                [0, 1, 3],
                [0, 1, 2],
            ];

            this.isShowFaces = [true, true, true, true];

        break;

        case CONST.SHAPE_TYPES.CUBE_BEG:
            // vertices
            this.vertices = [
                this.initVertices[7],
                this.initVertices[3],
                this.initVertices[4],
                this.initVertices[6],
            ];

            this.translateVector = this.initVertices[7].sub(this.origin);

            this.vertexLabels = [
                "2-F", "2-B@", "2-G@", "2-E@"
            ];

            // edges
            this.edges = [
                [0, 1],
                [0, 2],
                [0, 3],
                [1, 2],
                [1, 3],
                [2, 3]
            ];

            this.initEdges = this.edges.slice();
            this.duplicateEdges = [

            ];

            // faces
            this.faces = [
                [1, 2, 3],
                [0, 2, 3],
                [0, 1, 3],
                [0, 1, 2],
            ];

            this.isShowFaces = [true, true, true, true];

        break;

        case CONST.SHAPE_TYPES.CUBE_BGD:
            // vertices
            this.vertices = [
                this.initVertices[0],
                this.initVertices[1],
                this.initVertices[3],
                this.initVertices[4],
            ];

            this.translateVector = this.initVertices[0].sub(this.origin);

            this.vertexLabels = [
                "3-C", "3-D@", "3-B@", "3-G@"
            ];

            // edges
            this.edges = [
                [0, 1],
                [0, 2],
                [0, 3],
                [1, 2],
                [1, 3],
                [2, 3]
            ];

            this.initEdges = this.edges.slice();
            this.duplicateEdges = [

            ];

            // faces
            this.faces = [
                [1, 2, 3],
                [0, 2, 3],
                [0, 1, 3],
                [0, 1, 2],
            ];

            this.isShowFaces = [true, true, true, true];

        break;

        case CONST.SHAPE_TYPES.CUBE_DEG:
            // vertices
            this.vertices = [
                this.initVertices[5],
                this.initVertices[1],
                this.initVertices[4],
                this.initVertices[6],
            ];

            this.translateVector = this.initVertices[5].sub(this.origin);

            this.vertexLabels = [
                "4-H", "4-D@", "4-G@", "4-E@"
            ];

            // edges
            this.edges = [
                [0, 1],
                [0, 2],
                [0, 3],
                [1, 2],
                [1, 3],
                [2, 3]
            ];

            this.initEdges = this.edges.slice();
            this.duplicateEdges = [

            ];

            // faces
            this.faces = [
                [1, 2, 3],
                [0, 2, 3],
                [0, 1, 3],
                [0, 1, 2],
            ];

            this.isShowFaces = [true, true, true, true];

        break;
    }

    // open angles
    this.rotateX(this.initAngles[0]);
    this.rotateY(this.initAngles[1]);
    this.rotateZ(this.initAngles[2]);
}

Shape3D.prototype.rotateX = function(alpha) {
    MathLib.rotate(this, CONST.AXIS.X, alpha);
}

Shape3D.prototype.rotateY = function(alpha) {
    MathLib.rotate(this, CONST.AXIS.Y, alpha);
}

Shape3D.prototype.rotateZ = function(alpha) {
    MathLib.rotate(this, CONST.AXIS.Z, alpha);
}

Shape3D.prototype.rotateEdge = function(id, id1, id2, alpha) {
    var edge = [id1, id2];
    if (indexInArray2(this.rotateLines, edge) == -1)
        this.rotateLines.push(edge);

    return MathLib.customRotate(this.vertices[id], this.vertices[id1], this.vertices[id2], alpha);
}

Shape3D.prototype.initDom = function(id) {
    this.shapeDom = SVGLib.createTag(CONST.SVG.TAG.GROUP, {
        id: "shape_dom_" + this.id
    });

    this.grid = this.initGrid * this.adjustRatio;

    this.shapeDom.append(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
        id: ["hidden_face", this.id].join("_")
    }));

    // this.shapeDom.append(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
    //     id: ["hidden_line", this.id].join("_")
    // }));

    this.shapeDom.append(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
        id: ["visible_face", this.id].join("_")
    }));

    // this.shapeDom.append(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
    //     id: ["visible_line", this.id].join("_")
    // }));

    // draw faces
    for (var i=0; i<this.faces.length; i++) {
        var vertexIds =  this.faces[i];
        var faceVertices = [];
        for (var j=0; j<vertexIds.length; j++)
            faceVertices.push(this.vertices[vertexIds[j]]);

        var colorList = ['red', 'green', '#FBCEB1', '#7FFFD4', '#007FFF', '#89CFF0', '#F5F5DC', '#000000', '#0000FF', '#0095B6', '#8A2BE2', '#DE5D83', '#CD7F32', '#964B00', '#800020', '#702963', '#960018', '#DE3163', '#007BA7', '#F7E7CE', '#7FFF00', '#7B3F00', '#0047AB', '#6F4E37', '#B87333', '#FF7F50', '#DC143C', '#00FFFF', '#EDC9Af', '#7DF9FF', '#50C878', '#00FF3F', '#FFD700', '#808080', '#008000', '#3FFF00', '#4B0082', '#FFFFF0', '#00A86B', '#29AB87', '#B57EDC', '#FFF700', '#C8A2C8', '#BFFF00', '#FF00FF', '#FF00AF', '#800000', '#E0B0FF', '#000080', '#CC7722', '#808000', '#FF6600', '#FF4500', '#DA70D6', '#FFE5B4', '#D1E231', '#CCCCFF', '#1C39BB', '#FD6C9E', '#8E4585', '#003153', '#CC8899', '#800080', '#E30B5C', '#FF0000', '#C71585', '#FF007F', '#E0115F', '#FA8072', '#92000A', '#0F52BA', '#FF2400', '#C0C0C0', '#708090', '#A7FC00', '#00FF7F', '#D2B48C', '#483C32', '#008080', '#40E0D0', '#3F00FF', '#7F00FF', '#40826D', '#FFFFFF', '#FFFF00'];
        var faceStyle = {
            fill: colorList[Math.round(Math.random() * colorList.length)],
            opacity: this.id == 1? 0.5: 0
        }

        var svgFace = SVGLib.drawFace(this.origin, faceVertices, this.grid, faceStyle, ["face", this.id, i].join('_'));
        this.shapeDom.append(svgFace);
    }

    // draw edges
    for (var i=0; i<this.edges.length; i++) {
        var line =  this.edges[i];
        var svgLine = SVGLib.drawLine(this.origin, this.vertices[line[0]], this.vertices[line[1]], this.grid, this.lineStyle, ["edge", i].join("_"));
        this.shapeDom.append(svgLine);
    }

    // vertices text
    if (g_isShowVertexId) {
        for (var i=0; i<this.vertices.length; i++) {
            var vertex = this.vertices[i];
            var svgText = SVGLib.drawText(this.origin, vertex.x * 1.05, vertex.y * 1.05, "v" + i, 
                this.grid, this.textStyle, ["text_vertex", this.id, i].join("_"));
            this.shapeDom.append(svgText);
        }

        for (var i=this.vertices.length; i<20; i++) {
            var svgText = SVGLib.drawText(this.origin, 0, 0, "v" + i, 
                this.grid, this.textStyle, ["text_vertex", this.id, i].join("_"));
            this.shapeDom.append(svgText);
        }

    }

    return this.shapeDom;
}

function indexInArray2(arr, edge) {
    for (var i=0; i<arr.length; i++) {
        if ((arr[i][0] == edge[0] && arr[i][1] == edge[1])
        || (arr[i][0] == edge[1] && arr[i][1] == edge[0])) {
            return i;
        }
    }

    return -1;
}

Shape3D.prototype.checkHiddenLine = function(P, Q, faceArrayList, _n) {
    var isPartialVisible = false;
    var isTotalVisible = true;
    var n = _n | 1;

    for (var k=1; k<n; k++) {
        var M = MathLib.getPointByRatio(P, Q, k/n);
        var isPointVisible = !this.isHiddenPoint(M, faceArrayList);

        if (isPointVisible)
            isPartialVisible = true;
        else
            isTotalVisible = false;
    }

    var isHiddenLine = !isPartialVisible;

    return {
        isHiddenLine: isHiddenLine,
        isTotalVisible: isTotalVisible
    }
}

Shape3D.prototype.getIntersectionLine = function(P, Q, lineArrayList) {
    var ratios = [0, 1];

    for (var i=0; i<lineArrayList.length; i++)
        for (var j=0; j<lineArrayList[i].length; j++) {
            var line = lineArrayList[i][j];
            var P2 = line[0];
            var Q2 = line[1];

            var dP = Math.min(MathLib.length3D(P, P2), MathLib.length3D(P, Q2));
            var dQ = Math.min(MathLib.length3D(Q, P2), MathLib.length3D(Q, Q2));

            if (Math.min(dP, dQ) > CONST.EPSILON) {
                var output = MathLib.lineIntersectLine(P, Q, P2, Q2);

                if (output.intersect && output.ratio > 0 && output.ratio < 1 
                    && output.ratio2 > 0 && output.ratio2 < 1)
                        ratios.push(output.ratio);
            }
        }

    var ratios = ratios.sort(function(a, b) { return a - b; });
    var ratios2 = [];

    var i = 0;
    while (i < ratios.length - 1) {
        ratios2.push(ratios[i]);

        var j = i+1;
        while (ratios[j] - ratios[i] < 0.001) j++;
        i = j;
    }

    if (1 - ratios2[ratios2.length - 1] < 0.001)
        ratios2[ratios2.length - 1] = 1;
    else
        ratios2.push(1);

    return ratios2;
}

Shape3D.prototype.isHiddenPoint = function(p, faceArrayList) {
    var Q = new Point3D(0, 0, -1000);

    for (var i=0; i<faceArrayList.length; i++)
        for (var j=0; j<faceArrayList[i].length; j++) {
            var facePoints = faceArrayList[i][j];

            // var isInsidePolyon = MathLib.pointInsidePolygon(p, facePoints);
            var isInsidePolyon = true;
            var minZ = 1000;

            for (var k=0; k<facePoints.length; k++)
                if (minZ > facePoints[k].z)
                    minZ = facePoints[k].z;

            if (isInsidePolyon && p.z > minZ) {
                var output = MathLib.lineIntersectPlan(Q, p, facePoints);
                if (output.isInsideRay && output.isInsidePolygon)
                    return true;
            }
        }

    return false;
}

Shape3D.prototype.updateData = function() {
    var vertices = $.map(this.vertices, function(v) {return v.add(this.translateVector.multiple(this.translateRatio))}.bind(this));
    this.grid = this.initGrid * this.adjustRatio;

    var validEdges = [];
    g_faceArrayList[this.id] = [];

    // g_faceArrayList
    for (var i=0; i<this.faces.length; i++) {
        var vertexIds =  this.faces[i];
        var faceVertices = [];
        var isShowFace = true;

        if (this.type == CONST.SHAPE_TYPES.CUBE_CORE) {
            isShowFace = Math.abs(g_shapes[i+1].translateRatio - g_shapes[i+1].translateRatioMin) > CONST.EPSILON;
        } else {
            isShowFace = (i > 0) || Math.abs(g_shapes[this.id].translateRatio - g_shapes[this.id].translateRatioMin) > CONST.EPSILON;
        }

        for (var j=0; j<vertexIds.length; j++) {
            faceVertices.push(vertices[vertexIds[j]]);
        }

        if (isShowFace && this.opacity > 0.01)
            g_faceArrayList[this.id].push(faceVertices);
    }

    // get validEdges
    for (var i=0; i<this.faces.length; i++) {
        var vertexIds =  this.faces[i];
        var faceVertices = [];

        for (var j=0; j<vertexIds.length; j++) {
            var edge = [vertexIds[j], vertexIds[(j + 1) % vertexIds.length]];
            
            if (indexInArray2(validEdges, edge) == -1 && edge[0] != edge[1])
                validEdges.push(edge);
        }
    }

    // valid edges
    g_edgeArrayList[this.id] = [];

    for (var i=0; i<validEdges.length; i++) {
        var line =  validEdges[i];
        var i1 = line[0];
        var i2 = line[1];
        var isShowLine = true;

        if (this.type == CONST.SHAPE_TYPES.CUBE_CORE) {
            var r1 = Math.abs(g_shapes[1].translateRatio - g_shapes[1].translateRatioMin) < CONST.EPSILON;
            var r2 = Math.abs(g_shapes[2].translateRatio - g_shapes[2].translateRatioMin) < CONST.EPSILON;
            var r3 = Math.abs(g_shapes[3].translateRatio - g_shapes[3].translateRatioMin) < CONST.EPSILON;
            var r4 = Math.abs(g_shapes[4].translateRatio - g_shapes[4].translateRatioMin) < CONST.EPSILON;
            var isStop = [r1, r2, r3, r4];

            var found = false;

            for (var j=0; j < this.faces.length; j++) {
                if (this.faces[j].indexOf(i1) >= 0 && this.faces[j].indexOf(i2) >= 0 && !isStop[j]) {
                    found = true;
                }
            }

            if (!found)
                isShowLine = false;

        } else if (i1 > 0 && i2 > 0) {
            if (Math.abs(this.translateRatio - this.translateRatioMin) < CONST.EPSILON)
                isShowLine = false;
        }

        if (isShowLine && this.opacity > 0.01)
            g_edgeArrayList[this.id].push([vertices[i1], vertices[i2]]);
    }
}

Shape3D.prototype.render = function() {
    if (!g_isRender) {
        g_isRender = true;
        $("#svg_root").css("opacity", 1);
    }
    
    $("#shape_dom_" + this.id).css("opacity", this.opacity);
    $("#group-label-" + this.id).css("opacity", this.opacity);
    $(".shape-element-" + this.id).css("opacity", this.opacity);

    var vertices = $.map(this.vertices, function(v) {return v.add(this.translateVector.multiple(this.translateRatio))}.bind(this));
    this.grid = this.initGrid * this.adjustRatio;

    var validEdges = [];
    var zValueData = {};

    // g_faceArrayList
    for (var i=0; i<this.faces.length; i++) {
        var vertexIds =  this.faces[i];
        var faceVertices = [];
        var isShowFace = true;

        if (this.type == CONST.SHAPE_TYPES.CUBE_CORE) {
            isShowFace = Math.abs(g_shapes[i+1].translateRatio - g_shapes[i+1].translateRatioMin) > CONST.EPSILON;
        } else {
            isShowFace = (i > 0) || Math.abs(g_shapes[this.id].translateRatio - g_shapes[this.id].translateRatioMin) > CONST.EPSILON;
        }

        for (var j=0; j<vertexIds.length; j++) {
            faceVertices.push(vertices[vertexIds[j]]);
        }
    }

    // update faces
    for (var i=0; i<this.faces.length; i++) {
        var vertexIds =  this.faces[i];
        var faceVertices = [];
        var id = ["#face", this.id, i].join("_");
        var isShowFace = true;

        if (this.type == CONST.SHAPE_TYPES.CUBE_CORE) {
            isShowFace = Math.abs(g_shapes[i+1].translateRatio - g_shapes[i+1].translateRatioMin) > CONST.EPSILON;
            // console.log("Show Face", i, isShowFace);
        } else {
            isShowFace = (i > 0) || Math.abs(g_shapes[this.id].translateRatio - g_shapes[this.id].translateRatioMin) > CONST.EPSILON;
        }

        var isVisibleFace = true;

        for (var j=0; j<vertexIds.length; j++) {
            faceVertices.push(vertices[vertexIds[j]]);

            var edge = [vertexIds[j], vertexIds[(j + 1) % vertexIds.length]];
            
            if (indexInArray2(validEdges, edge) == -1 && edge[0] != edge[1]) {
                validEdges.push(edge);
            }

            if (this.opacity < 1 && this.opacity > 0.5) {
                // check if face is visible
                var P = vertices[edge[0]];
                var Q = vertices[edge[1]];

                var hiddenLineData = this.checkHiddenLine(P, Q, g_faceArrayList, 1)
                var isHiddenLine = hiddenLineData.isHiddenLine;

                if (isHiddenLine)
                    isVisibleFace = false;
            }
        }

        var el = $(id);

        if (el.length > 0) {
            var d = SVGLib.getFacePath(this.origin, faceVertices, this.grid);
            $(el).attr("d", d);

            var faceStyle = SVGLib.getFaceStyle(faceVertices, this.type);
            $(el).attr("fill", faceStyle.fill);
            $(el).attr("opacity", faceStyle.opacity);
        } else {
            var colorList = ['red', 'green', '#FBCEB1', '#7FFFD4', '#007FFF', '#89CFF0', '#F5F5DC', '#000000', '#0000FF', '#0095B6', '#8A2BE2', '#DE5D83', '#CD7F32', '#964B00', '#800020', '#702963', '#960018', '#DE3163', '#007BA7', '#F7E7CE', '#7FFF00', '#7B3F00', '#0047AB', '#6F4E37', '#B87333', '#FF7F50', '#DC143C', '#00FFFF', '#EDC9Af', '#7DF9FF', '#50C878', '#00FF3F', '#FFD700', '#808080', '#008000', '#3FFF00', '#4B0082', '#FFFFF0', '#00A86B', '#29AB87', '#B57EDC', '#FFF700', '#C8A2C8', '#BFFF00', '#FF00FF', '#FF00AF', '#800000', '#E0B0FF', '#000080', '#CC7722', '#808000', '#FF6600', '#FF4500', '#DA70D6', '#FFE5B4', '#D1E231', '#CCCCFF', '#1C39BB', '#FD6C9E', '#8E4585', '#003153', '#CC8899', '#800080', '#E30B5C', '#FF0000', '#C71585', '#FF007F', '#E0115F', '#FA8072', '#92000A', '#0F52BA', '#FF2400', '#C0C0C0', '#708090', '#A7FC00', '#00FF7F', '#D2B48C', '#483C32', '#008080', '#40E0D0', '#3F00FF', '#7F00FF', '#40826D', '#FFFFFF', '#FFFF00'];
            var faceStyle = {
                fill: colorList[Math.round(Math.random() * colorList.length)],
                opacity: 0.5
            }
    
            var svgFace = SVGLib.drawFace(this.origin, faceVertices, this.grid, faceStyle, ["face", this.id, i].join("_"));
            this.shapeDom.append(svgFace);
        }

        if (isVisibleFace)
            $(el).insertAfter($(["#visible_face", this.id].join("_")));
        else {
            $(el).insertAfter($(["#hidden_face", this.id].join("_")));
        }

        showElement(id, isShowFace);
        this.isShowFaces[i] = isShowFace;
    }

    // valid edges
    var lineVisibilityStates = [];

    for (var i=0; i<validEdges.length; i++) {
        var line =  validEdges[i];
        var i1 = line[0];
        var i2 = line[1];
        var isShowLine = true;

        if (this.type == CONST.SHAPE_TYPES.CUBE_CORE) {
            var r1 = Math.abs(g_shapes[1].translateRatio - g_shapes[1].translateRatioMin) < CONST.EPSILON;
            var r2 = Math.abs(g_shapes[2].translateRatio - g_shapes[2].translateRatioMin) < CONST.EPSILON;
            var r3 = Math.abs(g_shapes[3].translateRatio - g_shapes[3].translateRatioMin) < CONST.EPSILON;
            var r4 = Math.abs(g_shapes[4].translateRatio - g_shapes[4].translateRatioMin) < CONST.EPSILON;
            var isStop = [r1, r2, r3, r4];

            var found = false;

            for (var j=0; j < this.faces.length; j++) {
                if (this.faces[j].indexOf(i1) >= 0 && this.faces[j].indexOf(i2) >= 0 && !isStop[j]) {
                    found = true;
                }
            }

            if (!found)
                isShowLine = false;

        } else if (i1 > 0 && i2 > 0) {
            if (Math.abs(this.translateRatio - this.translateRatioMin) < CONST.EPSILON)
                isShowLine = false;
        }

        lineVisibilityStates.push(isShowLine)
    }

    for (var i=0; i<validEdges.length; i++) {
        var id = ["valid_edge", this.id, i].join("_");
        var sid = "#" + id;
        var isShowLine = lineVisibilityStates[i];
        var numberOfSegments = 10;

        for (var j = 0; j < numberOfSegments; j++) {
            var el2 = $([sid, j].join("_"));
            $(el2).attr("d", "");
            showElement([sid, j].join("_"), false);
        }

        if (isShowLine) {
            var line =  validEdges[i];
            var el = $(sid);
            if (el.length == 0) {
                var lineGroup = SVGLib.createTag(CONST.SVG.TAG.GROUP, {
                    id: id
                });

                for (var j=0; j<numberOfSegments; j++) {
                    var strClass = ["line", this.id, i, i].join("_") + " shape-element-" + this.id;
                    var edgeStyle = {
                        "stroke-linejoin": "round",
                        "stroke-linecap": "round"
                    }

                    var svgLine = SVGLib.drawLine(this.origin, new Point3D(0, 0, 0), new Point3D(0, 0, 0), this.grid, edgeStyle, [id, j].join("_"), strClass);
                    lineGroup.append(svgLine)
                }

                this.shapeDom.append(lineGroup);
            }
            
            // check hidden
            var P = vertices[line[0]];
            var Q = vertices[line[1]];

            var ratios = this.getIntersectionLine(P, Q, g_edgeArrayList);

            for (var j=0; j < ratios.length - 1; j++) {
                var R = MathLib.getPointByRatio(P, Q, ratios[j]);
                var S = MathLib.getPointByRatio(P, Q, ratios[j + 1]);
                var M = MathLib.getPointByRatio(R, S, 0.5);
                var isHiddenLine = this.isHiddenPoint(M, g_faceArrayList);

                var el2 = $([sid, j].join("_"));
                var d = SVGLib.getLinePath(this.origin, R, S, this.grid);
                $(el2).attr("d", d);
                showElement([sid, j].join("_"), true);

                var strokeWidth = isHiddenLine ? "4px": "5px";
                var stroke = isHiddenLine? "#666": "#000";
                var strokeDashArray = "";

                $(el2).attr("d", d);
                $(el2).attr("stroke-dasharray", strokeDashArray);
                $(el2).attr("stroke-width", strokeWidth);
                $(el2).attr("stroke", stroke);

                if (isHiddenLine)
                    $(el2).insertAfter($("#hidden_line_core"));
                else
                    $(el2).insertAfter($("#visible_line_core"));
            }

            showElement(id, true);
        } else {
            showElement(id, false);
        }
    }
        
    // text + label
    for (var i=0; i<vertices.length; i++) {
        var vertex = vertices[i];
        var el = $(["#text_vertex", this.id, i].join("_"));
        var dText = -0.3;

        var centerPoint = MathLib.centerPoint(vertices);

        if (this.type == CONST.SHAPE_TYPES.CUBE_CORE) {
            centerPoint = new Point3D(0, 0, 0);
        } else {
            centerPoint = MathLib.centerPoint([
                vertices[1], vertices[2], vertices[3]
            ])
        }

        var textPoint = MathLib.getPointByLengthXY(vertex, centerPoint, dText);

        var textWidth = 27;
        var textHeight = 30;

        if (i == 3)
            textHeight = 38;

        var x0 = (this.origin.x + vertex.x) * this.grid;
        var y0 = (this.origin.y + vertex.y) * this.grid;  

        var x = ((this.origin.x + textPoint.x) * this.grid) - textWidth / 2;
        var y = ((this.origin.y + textPoint.y) * this.grid) - textHeight / 2;

        if (g_isShowVertexId) {
            if (el.length > 0) {
                $(el).attr("x", x0);
                $(el).attr("y", y0);
            } else {
                var svgText = SVGLib.drawText(this.origin, vertex.x * 1.05, vertex.y * 1.05, "v" + i, 
                    this.grid, this.textStyle, ["text_vertex", this.id, i].join("_"));
                this.shapeDom.append(svgText);
                $(["#text_vertex", this.id, i].join("_")).attr("opacity", 0);
            }
        }

        var labelVisible = true;
        var vertexLabel = this.vertexLabels[i];
        var opacity = 1;

        if (vertexLabel) {
            if (vertexLabel.indexOf("@") >= 0) {
                vertexLabel = vertexLabel.replace("@", "");
    
                if (this.translateRatio < this.translateRatioShowLabel) {
                    opacity = this.translateRatio / this.translateRatioShowLabel;
                }
            }
    
            el = $("#label-" + vertexLabel);
            $(el).attr("transform", SVGLib.getStrMatrix(1, 0, 0, 1, 512 + x, 324 + y));
            showElement("#label-" + vertexLabel, labelVisible);
            $("#label-" + vertexLabel).css("opacity", opacity);
        }
    }

    // short shapes
    var zValueData = {};

    for (var i=0; i<g_shapes.length; i++) {
        var z = [roundDecimal2(MathLib.centerPoint(g_shapes[i].vertices).z), i].join("");
        zValueData[z] = i;
    }

    var zValues = Object.keys(zValueData).sort(function(a, b){
        return parseFloat(a) - parseFloat(b);
    });

    for (var i=0; i<zValues.length; i++)
        $("#shape_dom_" + zValueData[zValues[i]]).insertAfter($("#shape_sort_flag"))
}