// Create Base64 Object
/*var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
*/
var UTILS = {
    removeInArray: function(arr, item) {
        var tmp = item.slice().sort();
        var id = -1;
        for (var i=0; i<arr.length; i++) {
            var tmp2 = arr[i].slice().sort();
            if (tmp2.length == tmp.length) {
                var j = 0;
                while (j < tmp.length && tmp[j] == tmp2[j]) j++;
                if (j == tmp.length) {
                    id = i;
                    break;
                }
            }
        }
    
        return id >= 0 ? arr.splice(id, 1): arr;
    }
} 

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// fix IE
if (!Object.keys) {
    Object.keys = function(obj) {
      var keys = [];
  
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          keys.push(i);
        }
      }
  
      return keys;
    };
}

if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function(value) {
  
        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
  
        var O = Object(this);
  
        // Steps 3-5.
        var len = O.length >>> 0;
  
        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;
  
        // Step 8.
        var k = relativeStart < 0 ?
          Math.max(len + relativeStart, 0) :
          Math.min(relativeStart, len);
  
        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
          len : end >> 0;
  
        // Step 11.
        var final = relativeEnd < 0 ?
          Math.max(len + relativeEnd, 0) :
          Math.min(relativeEnd, len);
  
        // Step 12.
        while (k < final) {
          O[k] = value;
          k++;
        }
  
        // Step 13.
        return O;
      }
    });
  }

/*  if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
  
      target = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
      return target;
    };
  }
*/
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('append')) {
        return;
      }
      Object.defineProperty(item, 'append', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function append() {
          var argArr = Array.prototype.slice.call(arguments),
            docFrag = document.createDocumentFragment();
          
          argArr.forEach(function (argItem) {
            var isNode = argItem instanceof Node;
            docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
          });
          
          this.appendChild(docFrag);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
}

function initDragEvent() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}

function roundDecimal2(x) {
    var p = Math.pow(10, 2);
    return Math.round(x * p) / p;
}

// https://www.geeksforgeeks.org/how-to-check-the-user-is-using-internet-explorer-in-javascript/
function getBrowserType() {
  var ua = window.navigator.userAgent;

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
   // IE 10 or older => return version number
        return CONST.BROWSER_TYPE.IE10;//parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return CONST.BROWSER_TYPE.IE11;//parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
          // Edge (IE 12+) => return version number
          return CONST.BROWSER_TYPE.EDGE;//parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

  return CONST.BROWSER_TYPE.OTHERS;
}

function getIPadVersion() {
  window.ondevicemotion = function(event) {
      if (navigator.platform.indexOf("iPad") != -1) {
          var version = 1;
          if (event.acceleration) 
            version += window.devicePixelRatio;

          return version;
      }
      window.ondevicemotion = null;
  }

  return 0;
}

function getFrameRate() {
  var browserType = getBrowserType();
  var ipadVersion = getIPadVersion();
  var frameRate;

  switch (browserType) {
    case CONST.BROWSER_TYPE.IE10:
      g_browserLog = "Browser: < IE 10 " + ipadVersion;
      frameRate = 20;
      break;

    case CONST.BROWSER_TYPE.IE11:
      g_browserLog = "Browser: IE 11 " + ipadVersion;
      frameRate = 20;
      break;

    case CONST.BROWSER_TYPE.EDGE:
      g_browserLog = "Browser: Edge " + ipadVersion;
      frameRate = 30;
      break;

    case CONST.BROWSER_TYPE.OTHERS:
      g_browserLog = "Browser: Others " + ipadVersion;
      frameRate = 40;
      break;
  }

  g_msgLog = g_browserLog;
  writeLog();

  return frameRate;
}

function getNumberOfFrames() {
  var browserType = getBrowserType();

  switch (browserType) {
    case CONST.BROWSER_TYPE.IE10:
      return 60;

    case CONST.BROWSER_TYPE.IE11:
      return 70;

    case CONST.BROWSER_TYPE.EDGE:
      return 80;

    case CONST.BROWSER_TYPE.OTHERS:
      return 150;
  }
}
var disableRightClick = true;
