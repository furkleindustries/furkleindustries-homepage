$(document).ready(function() {
	$('.collapser').click(function(e) {
		if ($(this).text() === '▼') {
			$(this.parentElement.parentElement).find('> :not(.listItemTitle)').css('display', 'none');
			$(this).text('◀');
		} else {
			$(this.parentElement.parentElement).find('> :not(.listItemTitle)').css('display', '');
			$(this).text('▼')
		}
	});

	createTableOfContents();
});

function createTableOfContents() {
	var tableList = $('#tableOfContentsList');
	var titleSpans = $('.listItemTitle');
	for (var ii = 0; ii < titleSpans.length; ii++) {
		var title = $(titleSpans[ii]).find('span')[0];
		var titleText = $(title).text();
		$(titleSpans[ii]).prepend('<a name=' + titleText.replace(' ', '').toLowerCase() + '></a>');
		tableList.append('<li><a href=#' + titleText.replace(' ', '').toLowerCase() + '>' + titleText + '</a></li><br>');
	}
}