var marker = $('<div />', {id: 'marker-ic'}).html('<span class="good"></span><span class="meh"></span><span class="bad"></span><span class="facebook"></span>');
$(document).bind('mouseup', function(e) {
  setTimeout(function() {
    var selection = getSelectionHtml();

    console.log(selection.length);

    if (selection.length > 0) {

      marker.css({
        left: e.pageX,
        top: e.pageY
      });
      marker.show();

      if ($('body').find('#marker-ic').length == 0) {
        marker.appendTo($('body'));
      }   
    }
    else {
      marker.hide();
    }
  }, 100);
});

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}