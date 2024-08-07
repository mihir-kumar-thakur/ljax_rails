document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.ljax-container').forEach(function(container) {
    var url = container.getAttribute('data-remote-url');
    var headers = new Headers({
      'X-LJAX': 'true',
      'X-LJAX-Container': container.id,
      'X-LJAX-Partial': container.getAttribute('data-ljax-partial')
    });

    fetch(url, { method: 'GET', headers: headers, cache: 'no-cache' })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(function(data) {
        container.outerHTML = data;
        var newContainer = document.getElementById(container.id);
        if (newContainer) {
          var event = new Event('ljax:success');
          newContainer.dispatchEvent(event);
        }
      })
      .catch(function() {
        var event = new Event('ljax:error');
        container.dispatchEvent(event);
      })
      .finally(function() {
        var event = new Event('ljax:complete');
        container.dispatchEvent(event);
      });
  });
});
