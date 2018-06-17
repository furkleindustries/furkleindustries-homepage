var selectedTransform;
var transformToPointNumber = {
	// 2d transforms
	'skewX2d': 1,
	'skewY2d': 1,
	'skew2d': 2,
	'translateX2d': 1,
	'translateY2d': 1,
	'translate2d': 2,
	'scaleX2d': 1,
	'scaleY2d': 1,
	'scale2d': 2,
	'rotateX2d': 1,
	'rotateY2d': 1,
	'rotate2d': 1,
	'matrix2d': 6,
	// 3d transforms
	'translateX3d': 1,
	'translateY3d': 1,
	'translateZ3d': 1,
	'translate3d': 3,
	'scaleX3d': 1,
	'scaleY3d': 1,
	'scaleZ3d': 1,
	'scale3d': 3,
	'rotateX3d': 1,
	'rotateY3d': 1,
	'rotateZ3d': 1,
	'rotate3d': 4,
	'matrix3d': 16,
}
$(document).ready(function() {
	//var selectedTransform;
	$('.selectionButton').click(function(e) {
		$('.selectionButton').removeClass('selected');
		$(e.target).addClass('selected');
		selectedTransform = e.target.id;
		updateTransformImage(selectedTransform);
		$('#manipulatorObject').css('transform', '');
		updateCodeDisplay($('#manipulatorObject')[0], $('#codeDisplay'));

		if ($('#3dTransformsList li').find(e.target).length > 0) {
			$('#perspectiveControl').css('display', 'block');
			$('#transformDisplay').css('perspective', $('#perspectiveSlider').val().toString() + 'px');
		} else {
			$('#perspectiveControl').css('display', '');
			$('#transformDisplay').css('perspective', '');
		}
	});

	function updateTransformImage(transform) {
		$('#manipulatorObject .manipulatorObjectHotspot').remove();
		switch(transformToPointNumber[transform]) {
			case 1:
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotOneOfOne manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				break;
			case 2:
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotOneOfTwo manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTwoOfTwo manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				break;
			case 3:
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotOneOfThree manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTwoOfThree manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotThreeOfThree manipulatorObjectHotspot centerHorizontally" draggable="false"></div>');
				break;
			case 4:
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotOneOfFour manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTwoOfFour manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotThreeOfFour manipulatorObjectHotspot centerHorizontally" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFourOfFour manipulatorObjectHotspot centerHorizontally" draggable="false"></div>');
				break;
			case 6:
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotOneOfSix manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTwoOfSix manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotThreeOfSix manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFourOfSix manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFiveOfSix manipulatorObjectHotspot centerVertically" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotSixOfSix manipulatorObjectHotspot" draggable="false"></div>');
				break;
			case 16:
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotOneOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTwoOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotThreeOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFourOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFiveOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotSixOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotSevenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotEightOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotNineOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotElevenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotTwelveOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotThirteenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFourteenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotFifteenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				$('#manipulatorObject').append('<div class="manipulatorObjectHotspotSixteenOfSixteen manipulatorObjectHotspot" draggable="false"></div>');
				break;
		}
		$('.manipulatorObjectHotspot').mousedown(function(e) {
			mousedata = e;
		});
	}

	var mousedata;
	$(document).mouseup(function(e) {
		mousedata = null;
	});
	$(document).mousemove(function(e) {
		if (!mousedata) {
			return null;
		}
		var distance = getDistanceFromMouseDown(mousedata, e, mousedata.target);
		var delta = distance;
		idToFunction[selectedTransform](delta, mousedata.target, document.getElementById('manipulatorObject'));
		updateCodeDisplay($('#manipulatorObject')[0], $('#codeDisplay'));
	});
	$('#mapContainer').on('dragstart', function(e) {
    	return false;
	});
	$('#perspectiveSlider').change(function(e) {
		$('#perspectiveValue').text($(e.target).val());
		$('#transformDisplay').css('perspective', $(e.target).val().toString() + 'px')
	})
});
var idToFunction = {
	// 2d transforms
	'skewX2d': skewX2d,
	'skewY2d': skewY2d,
	'skew2d': skew2d,
	'translateX2d': translateX,
	'translateY2d': translateY,
	'translate2d': translate2d,
	'scaleX2d': scaleX,
	'scaleY2d': scaleY,
	'scale2d': scale2d,
	'rotate2d': rotate2d,
	'matrix2d': matrix2d,
	// 3d transforms
	'translateX3d': translateX,
	'translateY3d': translateY,
	'translateZ3d': translateZ,
	'translate3d': translate3d,
	'scaleX3d': scaleX,
	'scaleY3d': scaleY,
	'scaleZ3d': scaleZ,
	'scale3d': scale3d,
	'rotateX3d': rotateX,
	'rotateY3d': rotateY,
	'rotateZ3d': rotateZ,
	'rotate3d': rotate3d,
	'matrix3d': matrix3d,
}
function skewX2d(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'skewX(' + value + 'deg)');
}
function skewY2d(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'skewY(' + value + 'deg)');
}
function skew2d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*skew\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || '0deg';
	var value2 = currentValue[1] || '0deg';
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfTwo')) {
		value1 = value.toString() + 'deg';
	} else {
		value2 = value.toString() + 'deg';
	}
	$(transformElement).css('transform', 'skew(' + value1 + ', ' + value2 + ')');
}

function translateX(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'translateX(' + value + 'px)');
}
function translateY(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'translateY(' + value + 'px)');
}
function translateZ(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'translateZ(' + value + 'px)');
}
function translate2d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*translate\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || '0px';
	var value2 = currentValue[1] || '0px';
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfTwo')) {
		value1 = value.toString() + 'px';
	} else {
		value2 = value.toString() + 'px';
	}
	$(transformElement).css('transform', 'translate(' + value1 + ', ' + value2 + ')');
}
function translate3d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*translate3d\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || 1;
	var value2 = currentValue[1] || 1;
	var value3 = currentValue[2] || 1;
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfThree')) {
		console.log(1);
		value1 = (value / 200).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTwoOfThree')) {
		console.log(2);
		value2 = (value / 200).toString();
	} else {
		console.log(3);
		value3 = (value / 200).toString();
	}
	$(transformElement).css('transform', 'scale3d(' + value1 + ', ' + value2 + ', ' + value3 + ')');
}

function scaleX(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'scaleX(' + (1 + value / 200).toString() + ')');
}
function scaleY(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'scaleY(' + (1 + value / 200).toString() + ')');
}
function scale2d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*scale\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || 1;
	var value2 = currentValue[1] || 1;
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfTwo')) {
		value1 = (1 + value / 200).toString();
	} else {
		value2 = (1 + value / 200).toString();
	}
	$(transformElement).css('transform', 'scale(' + value1 + ', ' + value2 + ')');
}
function scaleZ(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'scaleZ(' + (1 + value / 200).toString() + ')');
}
function scale3d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*scale3d\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || 1;
	var value2 = currentValue[1] || 1;
	var value3 = currentValue[2] || 1;
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfThree')) {
		value1 = (1 + value / 200).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTwoOfThree')) {
		value2 = (1 + value / 200).toString();
	} else {
		value3 = (1 + value / 200).toString();
	}
	$(transformElement).css('transform', 'scale3d(' + value1 + ', ' + value2 + ', ' + value3 + ')');
}

function rotate2d(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'rotate(' + value + 'deg)');
}
function rotateX(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'rotateX(' + value + 'deg)');
}
function rotateY(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'rotateY(' + value + 'deg)');
}
function rotateZ(value, clickedElement, transformElement) {
	$(transformElement).css('transform', 'rotateZ(' + value + 'deg)');
}
function rotate3d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*rotate3d\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || 0;
	var value2 = currentValue[1] || 0;
	var value3 = currentValue[2] || 0;
	var value4 = currentValue[3] || '0deg';
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfFour')) {
		value1 = (value / 200).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTwoOfFour')) {
		value2 = (value / 200).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotThreeOfFour')) {
		value3 = (value / 200).toString();
	} else {
		value4 = value.toString() + 'deg';
	}
	console.log('rotate3d(' + value1 + ', ' + value2 + ', ' + value3 + ',' + value4 + ')');
	$(transformElement).css('transform', 'rotate3d(' + value1 + ', ' + value2 + ', ' + value3 + ',' + value4 + ')');
}

function matrix2d(value, clickedElement, transformElement) {
	var currentValue = transformElement.style.transform.replace(/.*matrix\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || 1;
	var value2 = currentValue[1] || 0;
	var value3 = currentValue[2] || 0;
	var value4 = currentValue[3] || 1;
	var value5 = currentValue[4] || 0;
	var value6 = currentValue[5] || 0;
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfSix')) {
		value1 = (1 + value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTwoOfSix')) {
		value2 = (value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotThreeOfSix')) {
		value3 = (value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotFourOfSix')) {
		value4 = (1 + value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotFiveOfSix')) {
		value5 = value.toString();
	} else {
		value6 = value.toString();
	}
	$(transformElement).css('transform', 'matrix(' + value1 + ', ' + value2 + ', ' + value3 + ',' + value4 + ',' + value5 + ',' + value6 + ')');
}

function matrix3d(value, clickedElement, transformElement) {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1
	var currentValue = transformElement.style.transform.replace(/.*matrix3d\(|\).*/g, '').split(',');
	var value1 = currentValue[0] || 1;
	var value2 = currentValue[1] || 0;
	var value3 = currentValue[2] || 0;
	var value4 = currentValue[3] || 0;
	var value5 = currentValue[4] || 0;
	var value6 = currentValue[5] || 1;
	var value7 = currentValue[6] || 0;
	var value8 = currentValue[7] || 0;
	var value9 = currentValue[8] || 0;
	var value10 = currentValue[9] || 0;
	var value11 = currentValue[10] || 1;
	var value12 = currentValue[11] || 0;
	var value13 = currentValue[12] || 0;
	var value14 = currentValue[13] || 0;
	var value15 = currentValue[14] || 0;
	var value16 = currentValue[15] || 1;
	if ($(clickedElement).hasClass('manipulatorObjectHotspotOneOfSixteen')) {
		value1 = (1 + value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTwoOfSixteen')) {
		value2 = (value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotThreeOfSixteen')) {
		value3 = (value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotFourOfSixteen')) {
		value4 = (value / 20000).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotFiveOfSixteen')) {
		value5 = (value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotSixOfSixteen')) {
		value6 = (1 + value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotSevenOfSixteen')) {
		value7 = (value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotEightOfSixteen')) {
		value8 = (value / 20000).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotNineOfSixteen')) {
		value9 = value.toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTenOfSixteen')) {
		value10 = value.toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotElevenOfSixteen')) {
		value11 = (1 + value / 100).toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotTwelveOfSixteen')) {
		value12 = value.toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotThirteenOfSixteen')) {
		value13 = value.toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotFourteenOfSixteen')) {
		value14 = value.toString();
	} else if ($(clickedElement).hasClass('manipulatorObjectHotspotFifteenOfSixteen')) {
		value15 = value.toString();
	} else {
		value16 = (1 + value / 100).toString();
	}
	$(transformElement).css('transform', 'matrix3d(' + value1 + ', ' + value2 + ', ' + value3 + ',' + value4 + ',' + value5 + ',' + value6 + ',' + value7 + ',' + 
		value8 + ',' + value9 + ',' + value10 + ',' + value11 + ',' + value12 + ',' + value13 + ',' + value14 + ',' + value15 + ',' + value16 + ')');
}

function updateCodeDisplay(transformElement, textElement) {
	var value = transformElement.style.transform || 'unset';
	$(textElement).text('');
	$(textElement).append('<p class="codeLine">transform: ' + value + 
		'</p>\n<p class="codeLine">-webkit-transform: ' + value +
		'</p>\n<p class="codeLine">-ms-transform: ' + value +
		'</p>\n<p class="codeLine">-moz-transform: ' + value +
		'</p>\n<p class="codeLine">-o-transform: ' + value + '</p>');
}
function getCornerClassNameFromEventData(e) {
	var corner = e.target;
	if ($(corner).hasClass('phlMapImageLeftCorner')) {
		return "left";
	}
}
function getDistanceFromMouseDown(start, current, hotspot) {
	if ($(hotspot).css('top') === '0px') {
		return start.screenY - current.screenY;
	} else if ($(hotspot).css('bottom') === '0px') {
		return current.screenY - start.screenY;
	} else if ($(hotspot).css('left') === '0px') {
		return start.screenX - current.screenX;
	} else {
		return current.screenX - start.screenX;
	}
}