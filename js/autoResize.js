var gData = {
	screenWidth: 1024,
	screenHeight: 648
}

AutoResize();

function AutoResize() {
	//==== Auto resize ====
	$(window).on("load", function() {
		ResizeBody();
	});
	$(window).resize(function() {
		setTimeout(function(){
			ResizeBody();
		}, 200);
	}).trigger('resize');
}

var $baseContent;
var mTop;

if (!$baseContent) {
	$baseContent = $('#divBody');
	mTop = parseFloat($baseContent.css('top'));
}

function ResizeBody() {
	var ratio = gData.screenWidth/ gData.screenHeight;
	var w = $(window).width();
	var h = $(window).height();
	var left = 0;
	var nWidth = w;
	var nHeight = h;

	if(w/h<ratio) {
		nHeight = w/ratio;
		mTop = (h - nHeight)/2;
	} else {
		nWidth = h * ratio;
		mTop = 0;
		left = (w - nWidth) / 2;
	}
		
	$("svg:first").css({
		width: "100%",
		height: "100%"
	});
	$('#divBody').css({
		position: "relative",
		left: left,
		top: mTop,
		width: nWidth,
		height: nHeight,
		transform: 'scale(1)'
	});

    var contentWidth = $baseContent[0].clientWidth;
	var contentHeight = $baseContent[0].clientHeight;
	var windowOuterHeight = $(window).outerHeight();

    var outerRate = window.innerHeight / windowOuterHeight;

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

	var userAgent = window.navigator.userAgent.toLowerCase();
	var isIphone = userAgent.indexOf("iphone") > -1 && userAgent.indexOf("safari") > -1 ? true : false;

	var scale = Math.min(windowWidth / contentWidth, windowHeight / contentHeight);

	var newTop = 0;
	if (isIphone && outerRate < 1 && windowWidth > windowHeight) {
		newTop = mTop - (windowOuterHeight - window.innerHeight) / 2;
		$baseContent.css('top', newTop + 'px');
		$baseContent.css({transform: 'scale(' + scale + ')'});
		$(window).scrollTop(0);
	}
}