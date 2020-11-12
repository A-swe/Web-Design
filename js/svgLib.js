var SVGLib = {
    createTag: function(tag, attrs) {
        var obj = document.createElementNS(CONST.SVG.NAMESPACE, tag);
        $.map(Object.keys(attrs), function(key){ $(obj).attr(key, attrs[key]); });

        return obj;
    },

    getStrMatrix: function(a, b, c, d, e, f) {
        return "matrix(" + [a, b, c, d, e, f].join(',') + ")";
    },

    getLinePath: function(o, p1, p2, grid) {
        var d = ["M", 
            roundDecimal2((o.x + p1.x) * grid), 
            roundDecimal2((o.y + p1.y) * grid), 
            "L", 
            roundDecimal2((o.x + p2.x) * grid), 
            roundDecimal2((o.y + p2.y) * grid)].join(' ');
        return d;
    },

    drawLine: function(o, p1, p2, grid, lineStyle, id, strClass) {
        var attrs = Object.assign(lineStyle, {
              d: this.getLinePath(o, p1, p2, grid),
            id: id,
            class: strClass
        });

        var line = this.createTag("path", attrs);
        return line;
    },
    
    getPointPos: function(o, p, grid) {
        var cx = roundDecimal2((o.x + p.x) * grid);
        var cy = roundDecimal2((o.y + p.y) * grid);
        return {
            cx: cx,
            cy: cy
        };
    },

    drawPoint: function(o, p, grid, pointStyle, id) {
        var pointPos = this.getPointPos(o, p, grid);
        var attrs = Object.assign(pointStyle, {
              cx: pointPos.cx,
              cy: pointPos.cy,
            id: id
        });

        var point = this.createTag("circle", attrs);
        return point;
    },

    getFacePath: function(o, faceVertices, grid) {
        var d = $.map(faceVertices, function(v, id){ 
            return [id == 0? "M": "L", 
                roundDecimal2((o.x + v.x) * grid), 
                roundDecimal2((o.y + v.y) * grid)].join(' ')
        }).join(' ') + "z";
        return d;
    },

    getFaceStyle: function(faceVertices, type) {
        var fill, opacity;
        var minOpacity = 0.2;
        var middleOpacity = 0.5;
        var maxOpacity = 0.8;

        var u = faceVertices[0].sub(faceVertices[1]);
        var v = faceVertices[0].sub(faceVertices[2]);
        var normVector = u.crossProduct(v);
        var w = new Point3D(0, 0, 1);

        var color1 = (type == CONST.SHAPE_TYPES.CUBE_CORE)? "#6DB8EB": "#D8E9F0";
        var color2 = (type == CONST.SHAPE_TYPES.CUBE_CORE)? "#6DB8EB": "#D8E9F0";

        // 0 to 180
        var alpha = MathLib.angleBetweenVectors(new Point3D(0, 0, 0), normVector, w);

        // alpha = 180 - alpha;

        // if (alpha > 90)
        //     alpha = 180 - alpha;
        
        if (alpha < 90) { // [middle, max]
            fill = color1;;
            opacity = middleOpacity + (maxOpacity - middleOpacity) * (1 - alpha / 90);
        } else { // [min, middle]
            fill = color2;
            opacity = middleOpacity - (alpha / 90 - 1) * (middleOpacity - minOpacity);
        }

        if (type != CONST.SHAPE_TYPES.CUBE_CORE) 
            opacity = 0.7;

        return {
            fill: fill,
            opacity: roundDecimal2(opacity)
        }
    },

    drawFace: function(o, faceVertices, grid, faceStyle, id) {
        var attrs = Object.assign(faceStyle, {
            d: this.getFacePath(o, faceVertices, grid),
            id: id
        });

        var face = this.createTag("path", attrs);
        return face;
    },

    drawText: function(o, x, y, text, grid, textStyle, id) {
        var attrs = Object.assign(textStyle, {
            x: roundDecimal2((o.x + x) * grid),
            y: roundDecimal2((o.y + y) * grid),
            id: id
        });

        var svgText = this.createTag("text", attrs);
        svgText.textContent = text;
        return svgText;
    },

    updateStyle: function(el, styles) {
        $.map(Object.keys(styles), function(key){$(el).attr(key, styles[key])});
    }
}