(function() {
  var count = 0;
  function createURL(name, type) {
    return 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(name) + '&type=' +type + '&offset=' + count + '&limit=5';
  }

  function loadSongs() {
    var name = $('input').val();
    var type = $('select').val();
    var url = createURL(name,type);
    var timer;

    function makeUrl (urls, image, name){
      image = image || name
      $('<div><a href=' + urls + '><img src=' + image + '><span>' + name + '</span></a></div>').appendTo('#container');
    }

    $.get(url,function(response){
        type = type + 's';
        for (var i =0; i < response[type].items.length; i++) {
          try {
            makeUrl(response[type].items[i].external_urls.spotify, response[type].items[i].images[1].url, response[type].items[i].name);
          } catch(e) {
          }
        }
      if(window.location.search) {
        more = $('<button type="submit" id="more">more</button>').appendTo('#container')
        $('#more').on('click', function() {
          more.detach()
          loadSongs();
        });
      } else {
        window.addEventListener('scroll', function timing() {

        if(timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function() {
          loadSongs();
        }, 1000);
          window.removeEventListener('scroll', timing)
        })
      }
    })

    count++;
  }

  $('#go').on('click', function() {
    $('#container').empty();
    loadSongs();
  });
})()
