var g_shapes = [];
var g_buttonAnimateInterval = [false, false, false, false, false];
var g_buttonStates = [false, false, false, false];
var g_isShowLog = true;
var g_isShowVertexId = false;
var g_layoutWidth = 1024;
var g_layoutHeight = 648;
var g_isRender = false;
var g_isAnimatingButton = [false, false, false, false, false];
var g_isRotated = false;
var g_latestMousePress = "";
var g_faceArrayList = [];
var g_edgeArrayList = [];
var g_msgLog = "";
var g_browserLog = "";
var g_startTime;
var g_endTime;
var g_disableReload = true;
var g_isStartGame = false;
var g_interval;
var g_framePerSecond = getFrameRate();
var g_numberOfFrames = getNumberOfFrames();
var g_dragablePosition = {}; // store initial dragable area position

// ---------------------------------------------------------

/*window.addEventListener('touchmove', function (ev) {
    (ev.preventDefault) ? ev.preventDefault(): ev.returnValue = false;
}, {
    passive: false
});
    
window.addEventListener('mousemove', function (ev) {
    (ev.preventDefault) ? ev.preventDefault(): ev.returnValue = false;
});
*/
// ---------------------------------------------------------

var Draw = {
    setting: {
        svgDom: $('#svg'),
        grid: 100,
        lineStyle: {
            stroke: "black",
            "stroke-width": "2.5px"
        }
    },

    init: function() {
        this.shapeGroup = SVGLib.createTag(CONST.SVG.TAG.GROUP, {
            id: "svg_shape",
            transform: SVGLib.getStrMatrix(1, 0, 0, 1, 512, 324)
        });
        this.setting.svgDom.append(this.shapeGroup);
        
        this.rotateEvent(".draggable-zone");
    },

    rotateEvent: function(element) {
        var prevX = 0;
        var prevY = 0;
           
        $(element).draggable({
            start: function( event, ui ) {
                prevX = event.clientX;
                prevY = event.clientY;

                if (!g_isRotated) 
                    enableReload();

                g_isRotated = true;

                event.stopPropagation();
            },
            drag: function( event, ui ) {    
                var x = event.clientX;
                var y = event.clientY;

                var w = window.innerWidth;
                var h = window.innerHeight;

                w = Math.min(w, h * g_layoutWidth / g_layoutHeight);

                var dx = x - prevX;
                var dy = y - prevY;
                var ratio = 0.4 * g_layoutWidth / w;
        
                for (var i=0; i<g_shapes.length; i++) {
                    g_shapes[i].rotateY(-dx * ratio);
                    g_shapes[i].rotateX(dy * ratio);

                    g_shapes[i].needRender = true;
                }
                keepDraggableSvgNotMove();
    
                prevX = x;
                prevY = y;

                event.stopPropagation();
            }
        });
    },

    appendToShapeGroup: function(childElement) {
        this.shapeGroup.append(childElement);
        return childElement;
    },

    appendToFloatingShapeGroup: function(childElement) {
        this.floatingShapeGroup.append(childElement)
    }
}

// ---------------------------------------------------------

function showElement(element, visible) {
    $(element).css("visibility", visible ? "visible": "hidden");
}

function updateSeparateButton() {
    for (var i=1; i<g_buttonStates.length; i++)
        if (g_buttonStates[i] && g_buttonStates[i-1])
            showElement("#separate-" + i, true);
        else 
            showElement("#separate-" + i, false);
}

function minifyNumber(str) {
    var n = 2;
    var p = Math.pow(10, n);
    var str2 = str;
    var i = 0;

    while (i < str.length) {
        if (str[i] == ".") {
            var j = i-1;
            while (j >= 0 && str[j] >= '0' && str[j] <= '9')
                j--;

            var k = i + 1;
            while (k < str.length && str[k] >= '0' && str[k] <= '9')
                k++;
            
            var s = str.substring(j + 1, k);
            var x = Math.round(parseFloat(s) * p) / p;
            str2 = str2.replace(s, x.toString());
            i = k;
        } else {
            i++;
        }
    }

    return str2;
}

function writeLog() {
    $("#text-log").text(g_msgLog);
}

function keepDraggableSvgNotMove() {
    if (g_dragablePosition.top === undefined) {
        g_dragablePosition.top = parseInt($(".draggable-zone").css("top"), 10);
        g_dragablePosition.left = parseInt(
            $(".draggable-zone").css("left"),
            10
        );
    } else {
        setTimeout(function() {
            $(".draggable-zone").css("top", g_dragablePosition.top);
            $(".draggable-zone").css("left", g_dragablePosition.left);
        }, 50);
    }
}

/**
 * RELOAD ACTION STATE
 */

function disableReload() {
    g_disableReload = true;
    showElement("#btn-reload-active", false);
    showElement("#btn-reload-disabled", true);
    $("#btn-reload-group").removeClass("btn-pointer");
}

function enableReload() {
    g_disableReload = false;
    showElement("#btn-reload-active", true);
    showElement("#btn-reload-disabled", false);
    $("#btn-reload-group").addClass("btn-pointer");
}

function playAllShape() {
    var isDisableReload = true;
    keepDraggableSvgNotMove();

    // update ratio
    for (var i=0; i<g_shapes.length; i++) {
        var shape = g_shapes[i];
        shape.updateData();

        if (Math.abs(shape.translateRatioMin - shape.translateRatio) > CONST.EPSILON)
            isDisableReload = false;

        if (!shape.isPlaying)
            continue;

        var translateStep = (shape.translateRatioMax - shape.translateRatioMin) / g_numberOfFrames;
        shape.translateRatio += translateStep * shape.translateDirection;

        var opacity = 1;
        
        if (shape.translateRatio < shape.translateRatioOpacity)
            opacity = 1;
        else 
            opacity = 1 - (shape.translateRatio - shape.translateRatioOpacity) 
                / (shape.translateRatioMax - shape.translateRatioOpacity);

        shape.opacity = opacity;

        if ((Math.abs(shape.translateRatioMax - shape.translateRatio) < CONST.EPSILON)
            || (Math.abs(shape.translateRatioMin - shape.translateRatio) < CONST.EPSILON))
            {
                shape.isPlaying = false;
                g_endTime = new Date();
                g_msgLog = g_browserLog + " - Runtime: " + (g_endTime - g_startTime);
                writeLog();
            }
    }

    // Update reload button state
    isDisableReload = !g_isRotated && isDisableReload;

    if (g_isStartGame) {
        if (isDisableReload)
            disableReload();
        else
            enableReload();
    }

    // render
    for (var i=0; i<g_shapes.length; i++) {
        var shape = g_shapes[i];
        shape.render();
    }
}

function animateButtonEffect(sid, id, isDown) {
    if (g_isAnimatingButton[id])
        return;

    g_isAnimatingButton[id] = true;

    if (g_buttonAnimateInterval[id])
        clearInterval(g_buttonAnimateInterval[id]);

    var self = $(sid);
    var duration = 200, nFrame = 10;
    var dy1 = isDown? 0: 4, 
        dy2 = isDown? 4: 0, 
        ddy = (dy2 - dy1) / nFrame; 

    g_buttonAnimateInterval[id] = setInterval(function(){
        dy1 += ddy;

        self.attr('transform', SVGLib.getStrMatrix(1, 0, 0, 1, 0, dy1));

        if (Math.abs(dy1 - dy2) < CONST.EPSILON) {
            clearInterval(g_buttonAnimateInterval[id]);
            g_isAnimatingButton[id] = false;
            return;
        }
    }, duration / nFrame)
}

function initShapes() {
    if (g_interval)
        clearInterval(g_interval);

    g_shapes = [];
    g_isRotated = false;
    g_faceArrayList = [];
    g_edgeArrayList = [];

    $("#shape_dom_0").remove();
    $("#shape_dom_1").remove();
    $("#shape_dom_2").remove();
    $("#shape_dom_3").remove();
    $("#shape_dom_4").remove();
    $("#shape_sort_flag").remove();
    $("#hidden_line_core").remove();
    $("#visible_line_core").remove();

    showElement("#btn-01-active", false);
    showElement("#btn-02-active", false);
    showElement("#btn-03-active", false);
    showElement("#btn-04-active", false);

    showElement("#btn-01-inactive", true);
    showElement("#btn-02-inactive", true);
    showElement("#btn-03-inactive", true);
    showElement("#btn-04-inactive", true);

    g_buttonStates = [false, false, false, false];
    showElement(".btn-separate", false);

    for (var i=0; i < g_buttonAnimateInterval.length; i++)
        clearInterval(g_buttonAnimateInterval[i]);

    for (var i=0; i < g_isAnimatingButton.length; i++)
        g_isAnimatingButton[i] = false;

    // text
    $("#group-label-1").css("opacity", 1);
    $("#group-label-2").css("opacity", 1);
    $("#group-label-3").css("opacity", 1);
    $("#group-label-4").css("opacity", 1);
    showElement("#btn-reload-active", false);
    showElement("#btn-reload-down", false);
    showElement("#btn-reload-disabled", true);

    showElement(".text-label", false);

    var origin = new Point3D(0, 0, 0);

    var shapeTypes = [ 
        "CUBE_CORE", 
        "CUBE_BDE", 
        "CUBE_BEG", 
        "CUBE_BGD", 
        "CUBE_DEG" 
    ];

    Draw.appendToShapeGroup(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
        id: "shape_sort_flag"
    }));

    for (var i=0; i<shapeTypes.length; i++) {
        $(".shape-element-" + i).remove();
        var shape = new Shape3D(CONST.SHAPE_TYPES[shapeTypes[i]], origin, Draw.setting.grid, i);
        g_shapes.push(shape);
        Draw.appendToShapeGroup(shape.initDom());
        g_faceArrayList.push([]);
        g_edgeArrayList.push([]);
    }

/*    Draw.appendToShapeGroup(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
        id: "hidden_line_core"
    }));

    Draw.appendToShapeGroup(SVGLib.createTag(CONST.SVG.TAG.GROUP, {
        id: "visible_line_core"
    }));*/

    for (var i=0; i<shapeTypes.length; i++)
        g_shapes[i].updateData();
    for (var i=0; i<shapeTypes.length; i++) {
        g_shapes[i].render();
    }

    keepDraggableSvgNotMove();

    var delay = 1000 / g_framePerSecond;
    g_interval = setInterval(function() { playAllShape(); }, delay);
    g_startTime = "";
    g_isStartGame = false;
    writeLog();

    disableReload();
}

$(document).ready(function(){
    initDragEvent();
    Draw.init();

    // init shapes
    initShapes();

    if (!g_isShowLog)
        $("#text-log").css("opacity", 0);

    $(".btn-active").on("mousedown", function(){
        if (!g_startTime)
            g_startTime = new Date();
        
        var eid = $(this).attr('id');
        var sid = eid.replace("btn-", "").replace("-active", "");
        var id = parseInt(sid);

        if (g_isAnimatingButton[id]) 
            return;

        var activeId = "#btn-" + sid + "-active";
        var inactiveId = "#btn-" + sid + "-inactive";
        g_latestMousePress = "btn-active@" + sid;
    
        showElement(activeId, false);
        showElement(inactiveId, true);
        g_buttonStates[id-1] = !g_buttonStates[id-1];
        
        updateSeparateButton();
        animateButtonEffect("#btn-" + sid + "-inactive-text", id, true)
    });
    
    $(".btn-inactive").on("mousedown", function(){
        if (!g_startTime)
            g_startTime = new Date();
        
        var eid = $(this).attr('id');
        var sid = eid.replace("btn-", "").replace("-inactive", "");
        var id = parseInt(sid);
        
        if (g_isAnimatingButton[id]) 
            return;
            
        var activeId = "#btn-" + sid + "-active";
        var inactiveId = "#btn-" + sid + "-inactive";
        g_latestMousePress = "btn-inactive@" + sid;
    
        showElement(activeId, true);
        showElement(inactiveId, false);
        g_buttonStates[id-1] = !g_buttonStates[id-1];
    
        updateSeparateButton();
        animateButtonEffect("#btn-" + sid + "-active-text", id, true)
    });

    /**
     * RELOAD
     */

    $("#btn-reload-group").on("mousedown", function(e) {
        if (g_disableReload)
            return;

        e.preventDefault();
        e.stopPropagation();
        g_latestMousePress = "btn-reload@";

        animateButtonEffect("#btn-reload-group", 0, true);
        showElement("#btn-reload-active", false);
        showElement("#btn-reload-down", true);
    })

    $(document).on("mouseup", function(e){
        g_isMouseDown = false;

        var type = g_latestMousePress.indexOf("@") >= 0? 
            g_latestMousePress.split("@")[0]: "";

        var sid = g_latestMousePress.indexOf("@") >= 0? 
            g_latestMousePress.split("@")[1]: "";

        var id = parseInt(sid);
        
        switch (type) {
            case "btn-active":
                g_isStartGame = true;
                g_isAnimatingButton[id] = false;
                animateButtonEffect("#btn-" + sid + "-inactive-text", id, false);
                g_shapes[id].isPlaying = true;
                g_shapes[id].translateDirection = -1;
            break;

            case "btn-inactive":
                g_isStartGame = true;
                g_isAnimatingButton[id] = false;
                animateButtonEffect("#btn-" + sid + "-active-text", id, false);
                g_shapes[id].isPlaying = true;
                g_shapes[id].translateDirection = 1;
            break;

            case "btn-reload":
                if (g_disableReload)
                    return;

                initShapes();

                g_isAnimatingButton[0] = false;
                animateButtonEffect("#btn-reload-group", 0, false);

            break;
    }

        g_latestMousePress = "";
    })
});