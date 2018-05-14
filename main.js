$(document).ready(function() {
  //var wikiPages = [];

  $('#wikiSearch').submit(function(e){
    
    var searchTerm = $('#searchbox').val();
    console.log('Search submitted.');
    console.log(searchTerm);

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm,
        gsrlimit: 10,
        prop: 'info|pageimages|extracts', 
        inprop: 'url',
        piprop: 'thumbnail|name',
        pithumbsize: 100,
        pilicense: 'any',
        exintro: true,
        explaintext: true,
        exsentences: 1,
        exlimit: 'max',
        format: 'json',
        formatversion: 2
      },
      dataType: 'jsonp',
      success: function (x) {
        // What to do with a bad query:
        if (!x.query) {
          return console.log("OOPS! BAD QUERY!");
        } 
        // Do this when query is returned
        else {
          // arr variable scoped to this block
          let arr = x.query.pages;
          console.log(arr[0].title);
          console.log(arr[0].extract);
          console.log(arr[0].canonicalurl);
          //console.log(arr[0].thumbnail.source);
          var i;
          $('#search-results').empty();
          for (i = 0; i < arr.length; i++) {
            // Provide a generic thumbnail for the item if there isn't one.
            if (!arr[i].thumbnail) {
              arr[i].thumbnail = {source: "https://en.wikipedia.org/static/images/project-logos/enwiki.png"};
            }
            // Write the results to the page
            $('#search-results').append(
              '<a href="' + arr[i].canonicalurl + '" target="_blank" class="list-group-item list-group-item-action flex-column align-items-start"><div class="media"><img class="thumbnail mr-3" src="' + arr[i].thumbnail.source + '" alt="Thumbnail image"><div class="media-body"><h5 class="mb-1">' + arr[i].title + '</h5><p class="mb-0">' + arr[i].extract + '</p></div><!-- .media-body --></div><!-- .media --></a><!-- .list-group-item -->'
            );
          }
        }
      }
    });



    e.preventDefault();
  });



  $('.list-group a').on('mouseenter', function() {
    $(this).addClass('active');
  });

  $('.list-group a').on('mouseleave', function() {
    $(this).removeClass('active');
  });

});
