(function() { 
  var sendData = function (data) {
    $.ajax({
      type: 'POST',
      data: { 'data': data },
      url: '/',
      success: (data) => { 
        let element = document.getElementById('lastSubmitted');
        if (!element) { 
          element = document.createElement('div'); 
          element.id = 'lastSubmitted';
          element.innerHTML = data;
          document.body.appendChild(element);
        } else {
          element.innerHTML = data;
        }
        let link = document.getElementById('lastSubmitLink');
        if (!link) {
          link = document.createElement('a');
          link.href = '/';
          link.id = 'lastSubmitLink';
          link.innerHTML = 'Last document processed';
          link.download = 'lastSubmitted.txt';
          document.body.appendChild(link);
        }
      }
    })
  }

  $('#entryForm').on('submit', function(e) {
    e.preventDefault();
    let path = $('#data')[0].value.slice(12);
    sendData(path);
  });

})();