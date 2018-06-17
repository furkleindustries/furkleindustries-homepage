function getTwineElement(query) {
	return $($('#interactiveTutorialIFrame').contents()).find(query);
}

$(document).ready(function() {
	// wait until the tw-passage element is loaded
	var loadedInterval = setInterval(function() {
		if (getTwineElement('tw-passage').length > 0) {
			addStartingTwElements();
			clearInterval(loadedInterval);
		}
	}, 1000);

	function addStartingTwElements() {
		getTwineElement('tw-passage').append('I am ordinary text.<br/><br/><tw-expression type="macro" name="link-goto"><tw-link title="I am a link!">I am a link.</tw-link></tw-expression><br /><br /><tw-expression type="macro" name="link-goto"><tw-link class="visited" title="I am a visited link!">I am a visited link.</tw-link></tw-expression><br /><br />');
		
		getTwineElement('tw-passage').append("<mark style='display: inline-block;'><span style='display: block;'>I am a mark.</span><img width='50%' height='auto' src='http://furkleindustries.com/images/furkle.png'</img></mark><mark style='display: none'>");
		
		$('#elementEntryButton').click(function(e) {
			if ($('#elementEntryInput').val() !== '') {
				addToElement($('#elementEntryInput').val().trim(), getTwineElement('tw-passage'));
				$('#elementEntryInput').val('');
			}
		});
		
		$('#elementClearButton').click(function(e) {
			// clear all child elements except the sidebar
			$('tw-passage > :not(tw-sidebar)').remove();
			// clear all text nodes
			$('tw-passage').contents().filter(function(){
	    	return this.nodeType === 3;
			}).remove();
		});
	}
	window.addStartingTwElements = addStartingTwElements;

	function addToElement(addition, element) {
		var spacer = '<br /><br />';
		// don't add newlines if the tw-sidebar is the only
		// element in tw-passage
		if ($('tw-passage').contents().length === 1) {
			spacer = '';
		}
		if (addition[0] === '(' && 
				addition.slice(addition.length - 1, addition.length) === ')') {
			if (addition.slice(1, 10) === 'link-goto') {
				var txt = addition.slice(11, addition.length - 1);
				var linkParts = txt.split(',');
				if (linkParts.length < 2) {
					$(element).append(spacer + addition);	
				} else {
					var linkText = linkParts[0].replace(/"|'/g, '');
					var linkTitle = linkParts.slice(1, linkParts.length).join(',')
						.replace(/"|'/g, '');
					$(element).append(spacer + '<tw-link title="' + linkTitle
														 + '">' + linkText + '</tw-link>');	
				}
			}
			
		} else if (addition.slice(0, 2) === '[[' && 
							 addition.slice(addition.length - 2, addition.length) === ']]') {
			if (addition.indexOf('->') !== -1) {
				var splitIndex = addition.lastIndexOf('->');
				var linkText = addition.slice(2, splitIndex);
				var linkTitle = addition.slice(splitIndex + 2, addition.length - 2);
				$(element).append(spacer + '<tw-link title="' + linkTitle
													 + '">' + linkText + '</tw-link>');	
			} else if (addition.indexOf('<-') !== -1) {
				var splitIndex = addition.indexOf('<-');
				var linkText = addition.slice(splitIndex + 2, addition.length - 2);
				var linkTitle = addition.slice(2, splitIndex);
				$(element).append(spacer + '<tw-link title="' + linkTitle
													 + '">' + linkText + '</tw-link>');	
			} else {
				var linkText = addition.slice(2, addition.length - 2);
				$(element).append(spacer + '<tw-link title="' + linkText
													 + '">' + linkText + '</tw-link>');	
			}
		} else {
			$(element).append(spacer + addition);
		}
	}

	var colors = [
		'rgba(255, 0, 0, 0.15)', 
		'rgba(255, 127, 0, 0.15)', 
		'rgba(255, 255, 0, 0.15)', 
		'rgba(127, 255, 0, 0.15)', 
		'rgba(0, 255, 0, 0.15)', 
		'rgba(0, 255, 127, 0.15)', 
		'rgba(0, 255, 255, 0.15)', 
		'rgba(0, 127, 255, 0.15)', 
		'rgba(0, 0, 255, 0.15)', 
		'rgba(127, 0, 255, 0.15)', 
		'rgba(255, 0, 255, 0.15)', 
		'rgba(255, 0, 127, 0.15)'];
	var counter = 0;
	function createNewSelector(selector) {
		var color = colors[counter % colors.length];
		
		if (selector === 'tw-icon' || 
			selector === 'tw-icon.undo' || 
			selector === 'tw-icon.redo') {
			var splitColor = color.split(',');
			color = splitColor.slice(0, splitColor.length - 1).join(',') + ', 1.0)';
		}
		
		var selectorDiv = document.createElement('div');
		selectorDiv.className = 'selectorDiv';
		
		var selectorDivCheck = document.createElement('input');
		selectorDivCheck.className = 'selectorDivCheck';
		$(selectorDivCheck).attr('type', 'checkbox');
		$(selectorDiv).append(selectorDivCheck);
		
		var selectorDivText = document.createElement('span');
		$(selectorDivText).text(selector);
		$(selectorDiv).append(selectorDivText);
		
		var selectorDivTriangle = document.createElement('span');
		selectorDivTriangle.className = 'selectorDivTriangle'
		$(selectorDivTriangle).text('▶');
		$(selectorDiv).append(selectorDivTriangle);
		$('#sidebarPrebuiltDiv').append(selectorDiv);
		
		$(selectorDivTriangle).click(function(e) {
			if ($(selectorDivTriangle).text() === '▶') {
				$(selectorDivTriangle).text('▼');	
				$(selectorDivStyleEntry).css('display', 'block');
			} else {
				$(selectorDivTriangle).text('▶');
				$(selectorDivStyleEntry).css('display', 'none');
			}
		});
		
		var selectorDivStyleEntry = document.createElement('div');
		selectorDivStyleEntry.className = 'selectorDivStyleEntry';
		
		var selectorDivStyleList = document.createElement('ul');
		$(selectorDivStyleEntry).append(selectorDivStyleList);
		
		var selectorDivStyleInputDiv = document.createElement('div');
		selectorDivStyleInputDiv.className = 'selectorDivStyleInputDiv';
		var selectorDivStyleInput = document.createElement('input');
		selectorDivStyleInput.className = 'selectorDivStyleInput';
		$(selectorDivStyleEntry).append(selectorDivStyleInput);
		
		var selectorDivStyleAddButton = document.createElement('button');
		selectorDivStyleAddButton.className = 'selectorDivStyleAddButton';
		$(selectorDivStyleAddButton).text('Add');
		$(selectorDivStyleEntry).append(selectorDivStyleAddButton);

		var selectorDivStyleClearButton = document.createElement('button');
		selectorDivStyleClearButton.className = 'selectorDivStyleClearButton';
		$(selectorDivStyleClearButton).text('Clear');
		$(selectorDivStyleEntry).append(selectorDivStyleClearButton);
		
		$(selectorDiv).append(selectorDivStyleEntry);
		
		$(selectorDivStyleAddButton).click(function(e) {
			if ($(selectorDivStyleInput).val() !== '') {
				var entry = $(selectorDivStyleInput).val().trim();
				var scSplitEntries = entry.split(';');
				
				for (var ii = 0; ii < scSplitEntries.length; ii++) {
					var _rule = scSplitEntries[ii].trim().replace(';', '');
					if (_rule === '') {
						continue;	
					}
					addStyleRule(_rule,
								 selector,
								 selectorDivStyleList);
				}
				
				if ($(selectorDivCheck).prop('checked')) {
					applyStyleRules(selector, selectorDivStyleList);
				}
												
				$(selectorDivStyleInput).val('');
			}
		});

		$(selectorDivStyleClearButton).click(function(e) {
			console.log(e);
			console.log(selectorDivStyleList);
			selectorDivStyleList.innerHTML = '';
		});
		
		addStyleRule('background-color: ' + color, selector, selectorDivStyleList);
		counter++;
		
		$(selectorDivText).on({
			touchstart: function(e) {
				$(selectorDivCheck).click();
				if (!$(selectorDivCheck).prop('checked')) {
					negateStyleRules(selector, selectorDivStyleList);	
				}
				return false;
			},
			click: function() {
				$(selectorDivCheck).click();
			},
		});
		$(selectorDivText).hover(
			function() {
				applyStyleRules(selector, selectorDivStyleList);
			}, function() {
				if (!$(selectorDivCheck).prop('checked')) {
					negateStyleRules(selector, selectorDivStyleList);
				}
			}
		);
		$(selectorDivCheck).click(function() {
			if (!$(selectorDivCheck).prop('checked')) {
				negateStyleRules(selector, selectorDivStyleList);
			} else {
				applyStyleRules(selector, selectorDivStyleList);
			}
		});
	}

	function addStyleRule(rule, selector, selectorDivStyleList) {
		var ruleLi = document.createElement('li');
				
		var ruleSpan = document.createElement('span');
		ruleSpan.className = 'styleRule';
		$(ruleSpan).text(rule);
		$(ruleLi).append(ruleSpan);

		var ruleRemove = document.createElement('button');
		ruleRemove.className = 'ruleRemove';
		$(ruleRemove).text('x');
		$(ruleLi).append(ruleRemove);
		$(ruleRemove).click(function(e) {
			negateStyleRule(selector, rule);
			$(ruleLi).remove();
		});

		$(selectorDivStyleList).append(ruleLi);	
	}

	function applyStyleRules(selector, selectorDivStyleList) {
		if (typeof(selectorDivStyleList) === typeof(undefined) ||
				selectorDivStyleList === null) {
			return;	
		}
		
		var styleRules = $(selectorDivStyleList).find('li > .styleRule');
		for (var ii = 0; ii < styleRules.length; ii++) {
			var splitRule = $(styleRules[ii]).text().split(':');
			if (splitRule.length < 2) {
				continue;	
			}
			
			var property = splitRule[0];
			var value = splitRule.slice(1, splitRule.length).join(':');
		
			if (value[value.length - 1] === ';') {
				value = value.slice(0, value.length - 1);	
			}
			
			getTwineElement(selector).css(property, value);
		}
	}
	function negateStyleRule(selector, rule) {
		var splitRule = rule.split(':');
		if (splitRule.length < 2) {
			return;	
		}

		var property = splitRule[0];
		var value = splitRule[1];

		if (value[value.length - 1] === ';') {
			value = value.slice(0, value.length - 1);	
		}

		getTwineElement(selector).css(property, '');
	}
	function negateStyleRules(selector, selectorDivStyleList) {
		if (typeof(selectorDivStyleList) === typeof(undefined) ||
				selectorDivStyleList === null) {
			return;	
		}
		
		var styleRules = $(selectorDivStyleList).find('li > .styleRule');
		for (var ii = 0; ii < styleRules.length; ii++) {
			var splitRule = $(styleRules[ii]).text().split(':');
			if (splitRule.length < 2) {
				continue;	
			}
			
			var property = splitRule[0];
			var value = splitRule[1];
		
			if (value[value.length - 1] === ';') {
				value = value.slice(0, value.length - 1);	
			}
			
			getTwineElement(selector).css(property, '');
		}
	}

	var selectors = ['html', 'tw-story', 'tw-passage', 'tw-link', 'tw-link.visited', 
					 'tw-sidebar', 'tw-icon', 'tw-icon.undo', 'tw-icon.redo',
					 'mark'];
	for (var ii = 0; ii < selectors.length; ii++) {
		createNewSelector(selectors[ii]);
	}

	$('#selectorButton').click(function(e) {
		createNewSelector($('#selectorInput').val());
		$('#selectorInput').val('');
	});
});