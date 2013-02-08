var marker = $('<div />', {id: 'marker-ic'});

var selection;

$(document).bind('mouseup', function(e) {
  if ($(e.target).attr('id') != 'marker-ic') {
    setTimeout(function() {
      selection = getSelectionHtml();

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
  }
  else {
    var url = "https://www.facebook.com/dialog/feed?%20app_id=128164550547805&%20link=http://dagensnyheter.se/&picture=http://www.dagensnyheter.se/Thumbnails/640/640/fit/ServicePlusArchive/4yX7pUMmmbgmZkiVz5bsW0/2013-01-09-12-08-34/bola%cc%8anetak-.png&name=Jag%20%C3%A4r%20anm%C3%A4ld!&%20caption=" 
      + "Boskulderna bara ökar%202013&description=" + escape(selection) + "";

    window.open(url);
    
  }
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