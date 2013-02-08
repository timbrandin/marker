var marker = $('<div />', {id: 'marker-ic'});

$(document).bind('mouseup', function(e) {
  
  var selection = document.getSelection();
  
  console.log(selection);
  
  if (selection) {
    
    marker.css({
      left: e.pageX,
      top: e.pageY
    });
    
    if ($('body').find('#marker-ic').length == 0) {
      marker.appendTo($('body'));
    }   
  }
});