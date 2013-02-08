var selection;
var marker = $('<div />', {id: 'marker-ic'}); //.html('<span class="good"></span><span class="meh"></span><span class="bad"></span><span class="facebook"></span>');

//
//	background: transparent url('icons/good.png') 0 0 no-repeat;
//}
//#marker-ic .meh {
//	background: transparent url('icons/meh.png') 0 0 no-repeat;
//}
//#marker-ic .bad {
//	background: transparent url('icons/bad.png') 0 0 no-repeat;
//}
//#marker-ic .facebook {
//	background: transparent url('icons/facebook.gif') 0 0 no-repeat;

var goodURL = chrome.extension.getURL("icons/good.png");
var mehURL = chrome.extension.getURL("icons/meh.png");
var badURL = chrome.extension.getURL("icons/bad.png");
var fbURL = chrome.extension.getURL("icons/facebook.gif");
marker.html('<img src="' + goodURL + '" />' +
  '<img src="' + mehURL + '" />' + 
  '<img src="' + badURL + '" />' + 
  '<img src="' + fbURL + '" class="facebook" />'
);
marker.hide();
//document.getElementById("someImage").src = imgURL;
var pos;

$(document).bind('mouseup', function(e) {
  if ($(e.target).parent().attr('id') != 'marker-ic') {
    setTimeout(function() {
      selection = getSelectionHtml();

      if (selection.length > 0) {
        
        pos = e.pageX;

        marker.css({
          left: e.pageX,
          top: e.pageY - 20
        });
        marker.show();
        marker.css({opacity: 0});
        marker.animate({top: e.pageY, opacity: 1}, 100);

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
    
    var url = "https://www.facebook.com/dialog/feed?%20app_id=128164550547805&%20link=http://saik.nu/premiarloppet&%20picture=http://www.dagensnyheter.se/Thumbnails/640/640/fit/ServicePlusArchive/4yX7pUMmmbgmZkiVz5bsW0/2013-01-09-12-08-34/bola%cc%8anetak-.png&%20name=" 
      + "Boskulderna%20bara%20ökar&%20caption=Dagens%20Nyheter&%20description=" + 
      selection + "&%20redirect_uri=http://saik.nu/premiarloppet";
    
//    var url = "https://www.facebook.com/dialog/feed?app_id=128164550547805&%20link=http://saik.nu/&picture=http://www.dagensnyheter.se/Thumbnails/640/640/fit/ServicePlusArchive/4yX7pUMmmbgmZkiVz5bsW0/2013-01-09-12-08-34/bola%cc%8anetak-.png&name=Jag%20%C3%A4r%20anm%C3%A4ld!&%20caption=" 
//      + "Boskulderna bara ökar%202013&description=...."; // + escape(selection) + "";

    if ($(e.target).attr('class') == 'facebook') {
      window.open(url); //'http://facebook.com');
    } else {
      $(e.target).addClass('clicked');
    }
    
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