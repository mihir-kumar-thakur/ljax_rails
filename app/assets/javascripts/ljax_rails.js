$(document).ready(function() {
  $('.ljax-container').each(function(index, container) {
    $.ajax({
      type: 'GET',
      dataType: 'html',
      url: $(container).data('remote-url'),
      cache: false,
      headers: {
        'X-LJAX': 'true',
        'X-LJAX-Container': container.id,
        'X-LJAX-Partial': $(container).data('ljax-partial')
      },
      success: function(data) {
        $(container).replaceWith(data).trigger('ljax:success');
      },
      error: function() {
        $(container).trigger('ljax:error');
      },
      complete: function() {
        $(container).trigger('ljax:complete');
      }
    });
  });
});
