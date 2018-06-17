$(document).ready(function() {
	$('#interactiveTutorialArrow').click(function(e) {
		if ($(this).text() === 'Interactive Tutorial ◀') {
			$(this).text('Interactive Tutorial ▼');	
			$('#interactiveTutorialIFrame').css('display', 'block');
		} else {
			$(this).text('Interactive Tutorial ◀');
			$('#interactiveTutorialIFrame').css('display', 'none');
		}
	});

	var frameNumber = 0;
	var frames = $('.sliderFrame').toArray();

	// set arrow visibility
	$('#leftSliderArrow').css('display', 'none');
	if ($('.sliderFrame').length === 1) {
		$('#rightSliderArrow').css('display', 'none');
	}

	// titles correspond to the order of .sliderFrames
	// in the HTML document
	var titles = ['html', 'tw-story', 'tw-passage', 'tw-link',
	'tw-link.visited', 'tw-sidebar', 'tw-icon', 'tw-icon.undo',
	'tw-icon.redo', 'mark', 'homework'];
	// set the visible title to the first index of titles
	$('#sliderTitle').text(titles[frameNumber]);

	// make dot navigator
	var fontSize = $('#tutorialSlider').width() / $('.sliderFrame').length;
	for (var ii = 0; ii < $('.sliderFrame').length; ii++) {
		$('#sliderDotNavigator').append('<span data-framenumber=' + ii + ' style="font-size: ' + 
			fontSize + 
			'px;" class="navigatorDot">•</span>');
	}
	// set the first dot to the active dot
	setActiveNavigatorDot(frameNumber);

	// click logic for navigator dots
	$('.navigatorDot').click(function(e) {
		console.log($(this).attr('data-framenumber'));

		var clickedFrameNumber = $(this).attr('data-framenumber');
		var currentFrameNumber = frameNumber;

		if (currentFrameNumber < clickedFrameNumber) {
			for (var ii = 0; ii < clickedFrameNumber - currentFrameNumber; ii++) {
				setTimeout(function() {
					$('#rightSliderArrow').click();
				}, ii * 350);
			}
		} else {
			for (var ii = 0; ii < currentFrameNumber - clickedFrameNumber; ii++) {
				setTimeout(function() {
					$('#leftSliderArrow').click();
				}, ii * 350);
			}
		}
	});

	$('#leftSliderArrow').click(function(e) {
		$('#sliderTitle').css('opacity', 0);

		var currentFrame = $(frames[0]);
		var nextFrame = $(frames[frames.length - 1]);

		$(nextFrame).removeClass('activeSlider');
		$(nextFrame).css('transform', 'translateX(' + $('#tutorialSlider').width() * -2 + 'px)');

		$(currentFrame).addClass('activeSlider');
		$(nextFrame).addClass('activeSlider');

		$(currentFrame).css('transform', 'translateX(' + $('#tutorialSlider').width() * 2 + 'px)');
		$(nextFrame).scrollTop(0);
		$(nextFrame).css('transform', 'translateX(0px)');

		setTimeout(function() {
			$(currentFrame).removeClass('activeSlider');
		}, 1500);

		frames.unshift(frames.pop());

		frameNumber--;
		setSliderArrowVisibility(frameNumber);
		setActiveNavigatorDot(frameNumber);

		setTimeout(function() {
			$('#sliderTitle').text(titles[frameNumber]);
			$('#sliderTitle').css('opacity', 1);
		}, 900);
	});
	$('#rightSliderArrow').click(function(e) {
		$('#sliderTitle').css('opacity', 0);

		var currentFrame = $(frames[0]);
		var nextFrame = $(frames[1]);

		$(nextFrame).removeClass('activeSlider');
		$(nextFrame).css('transform', 'translateX(' + $(window).width() + 'px)');

		$(currentFrame).addClass('activeSlider');
		$(nextFrame).addClass('activeSlider');

		$(currentFrame).css('transform', 'translateX(' + $(window).width() * -1 + 'px)');
		$(nextFrame).scrollTop(0);
		$(nextFrame).css('transform', 'translateX(0px)');

		setTimeout(function() {
			$(currentFrame).removeClass('activeSlider');
		}, 1500);

		frames.push(frames.shift());

		frameNumber++;
		setSliderArrowVisibility(frameNumber);
		setActiveNavigatorDot(frameNumber);

		setTimeout(function() {
			$('#sliderTitle').text(titles[frameNumber]);
			$('#sliderTitle').css('opacity', 1);
		}, 900);
	});

	function setSliderArrowVisibility(frameNumber) {
		if (frameNumber === 0) {
			$('#leftSliderArrow').css('display', 'none');
		} else {
			$('#leftSliderArrow').css('display', 'initial');
		}
		if (frameNumber === $('.sliderFrame').length - 1) {
			$('#rightSliderArrow').css('display', 'none');
		} else {
			$('#rightSliderArrow').css('display', 'initial');
		}
	}

	function setActiveNavigatorDot(frameNumber) {
		$('.navigatorDot').removeClass('activeNavigatorDot');
		$('.navigatorDot[data-framenumber=' + frameNumber + ']').addClass('activeNavigatorDot');
	}
});
