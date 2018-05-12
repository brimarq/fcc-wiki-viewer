$(document).ready(function() {
  var wikiPages = [];
  /** Round function from MDN, addresses funky JS math issues.
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#A_better_solution
   */
  function round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

  $('#wikiSearch').submit(function(e){
    
    var searchTerm = $('#searchbox').val();
    console.log('Search submitted.');
    console.log(searchTerm);

    $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm,
        gsrlimit: 10,
        prop: 'info|pageimages|extracts', 
        inprop: 'url',
        piprop: 'thumbnail|name',
        pithumbsize: 50,
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
        var arr = x.query.pages;
        console.log(x.query.pages);
        // $.wikiPages = x.query.pages;
        console.log(arr[0].title);
        console.log(arr[0].extract);
        console.log(arr[0].canonicalurl);
        console.log(arr[0].thumbnail.source);
        var i;
        $('#search-results').empty();
        for (i = 0; i < arr.length; i++) {
          $('#search-results').append(
            '<div class="media"><img class="media-thumbnail mr-3" src="' + arr[i].thumbnail.source + '" alt="thumbnail img"><div class="media-body"><h5 class="media-title mt-0">' + arr[i].title + '</h5><p class="media-extract">' + arr[i].extract + '</p></div><!-- .media-body --></div><!-- .media -->'
          );
        }
      }
    });



    e.preventDefault();
  });



  // Toggle temperature between F and C.
  $('.tempToggle').on('click', function() {
    $('.temp').toggle();
  });

});
