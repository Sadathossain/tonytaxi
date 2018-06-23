if (typeof SM6 === 'undefined' || SM6 === null) { SM6 = {}; }
if (typeof SM6.PageHeight === 'undefined' || SM6.PageHeight === null) {

    SM6.PageHeight = (function() {
        var pageFooterId    = 'footer';
        var pageContentId   = 'pageContent';

        // Get the page footer height if it exists, returns 0 otherwise
        var pageFooterHeight = function() {
            var div = $('#'+pageFooterId);
            if ($(div).length > 0) {
                return parseInt($(div).outerHeight(true));
            } else {
                return 0;
            }
        };

        var correctPageHeight = function(container) {
            // get the distance from page start to the end of the container
            var element = $('.'+container).first();
            var totalHeight = parseInt($(element).position().top) + parseInt($(element).outerHeight(true));
            // add optional page footer height
            totalHeight += pageFooterHeight();
            // compare with the specified minimum height,
            // and chose the larger of the two
            $('#'+pageContentId).each(function() {
                var oldHeight = $(this).css("min-height").match(/([0-9]*)px/)[1];
                var newHeight = Math.max(totalHeight, oldHeight);
                $(this).height(newHeight);
                $('#'+pageContentId).height(newHeight);
            })
        };

        //public objects

        return {
            correctPageHeight: function(container) {
                correctPageHeight(container);
            }
        }
    })();
}
