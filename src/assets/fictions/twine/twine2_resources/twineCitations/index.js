'use strict';
const $story = $('tw-story');
const $passage = $('tw-passage');

$story.on('click', '.citation', function(e) {	
	const target = e.target;

	const passageName = target.dataset.sourcePassage;
	let selector = 'tw-storydata > tw-passagedata[name="' + passageName + '"]';
	const passageElem = document.querySelector(selector);
	if (!passageElem) {
		console.log('Couldn\'t find passage to make citation popup.');
		return;
	}

	const fillText = passageElem.textContent;

	createCitationPopup(target, fillText, target.dataset.citationShape);
});

let globalCitationId = 0;
function createCitationPopup(target, content, citationShape) {
	const preexistingCitationId = target.dataset.citationId;
	let citationId;
	if (preexistingCitationId) {
		citationId = preexistingCitationId;
		
		// if there's already an open popup for this target, remove it
		const selector = '.citationPopupContainer[data-citation-id="' +
			citationId +
			'"]';
		const $preexistingPopup = $passage.find(selector);
		if ($preexistingPopup.length) {
			$preexistingPopup.remove();
		}
	} else {
		citationId = globalCitationId++;
	}

	target.dataset.citationId = citationId;

	const citationPopupContainer = document.createElement('div');
	citationPopupContainer.className = 'citationPopupContainer';
	citationPopupContainer.dataset.citationId = citationId;
	citationPopupContainer.dataset.citationShape = citationShape;
	$passage.append(citationPopupContainer);

	const citationPopup = document.createElement('div');
	citationPopup.className = 'citationPopup';
	if (citationShape === 'circle') {
		citationPopup.className += ' circle';
	} else if (citationShape === 'rectangle') {
		citationPopup.className += ' rectangle';
	} else if (citationShape === 'oval') {
		citationPopup.className += ' oval';
	}

	citationPopup.innerHTML = content;
	citationPopup.dataset.citationId = citationId;
	citationPopup.dataset.citationShape = citationShape;

	// must append before measuring clientHeight otherwise clientHeight is 0
	citationPopupContainer.appendChild(citationPopup);

	const citationPopupConnector = document.createElement('div');
	citationPopupConnector.className = 'citationPopupConnector';
	if (citationShape === 'circle') {
		citationPopupConnector.className += ' circle';
	} else if (citationShape === 'rectangle') {
		citationPopupConnector.className += ' rectangle';
	} else if (citationShape === 'oval') {
		citationPopupConnector.className += ' oval';
	}

	citationPopupConnector.dataset.citationId = citationId;
	citationPopupContainer.appendChild(citationPopupConnector);

	const closeButton = document.createElement('button');
	closeButton.className = 'citationPopupClose';
	closeButton.textContent = 'x';
	closeButton.onclick = function() {
		citationPopup.parentNode.removeChild(citationPopup);
		citationPopupConnector.parentNode.removeChild(citationPopupConnector);
	};

	citationPopup.appendChild(closeButton);

	sizeCitation(target, citationPopupContainer);
	// figure out why you need second call
	sizeCitation(target, citationPopupContainer);
}

$(window).resize(resizeCitations);

function resizeCitations() {
	$('.citation[data-citation-id]').each(function(aa, elem) {
		const citationId = elem.dataset.citationId;

		let selector = '.citationPopupContainer[data-citation-id="' + citationId + '"';
		const citationContainer = document.querySelector(selector);
		if (!citationContainer) {
			return;
		}

		sizeCitation(elem, citationContainer);
	});
}

const ARROW_SIZE = 12;
function sizeCitation(parent, container) {
	const $container = $(container);
	const $popup = $container.find('.citationPopup');
	if (!$popup.length) {
		console.log('Cannot find citation popup while sizing citation.');
		return;
	}

	const $connector = $container.find('.citationPopupConnector');
	if (!$connector.length) {
		console.log('Cannot find citation popup connector while sizing ' +
			'citation.');
	}

	const dontOverflow = Math.min(
		$passage.width() - $popup[0].offsetWidth,
		parent.offsetLeft);

	$container.css('left', dontOverflow + 'px');

	let top = parent.offsetTop - $popup[0].offsetHeight - ARROW_SIZE;
	const topOriginal = top;
	if (top >= 0) {
		$container.removeClass('flipped');
		$popup.removeClass('flipped');
		$connector.removeClass('flipped');
	} else {
		top = parent.offsetTop + parent.offsetHeight + ARROW_SIZE;
		$container.addClass('flipped');
		$popup.addClass('flipped');
		$connector.addClass('flipped');
	}
	
	$container.css('top', top + 'px');

	const connectorLeft = parent.offsetLeft - $container[0].offsetLeft;
	$connector.css('left', connectorLeft + 'px');
}