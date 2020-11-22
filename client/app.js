(function() { 
  var sendData = function (data) {
    console.log('item', data)
    $.ajax({
      type: 'POST',
      data: data,
      url: '/',
      success: (data) => { console.log(data); }
    })
  }

  $('#entryForm').on('submit', function(e) {
    e.preventDefault();
    let path = $('#data')[0].value.slice(12);
    console.log(path)
    sendData(path)
});

})();