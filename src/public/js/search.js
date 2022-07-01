var qsRegex;
var $grid = $('.dady-of').isotope({
  filter: function() {
    return qsRegex ? $(this).text().match( qsRegex ) : true;
  }
});

var $quicksearch = $('.filter').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}, 200 ) );

function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}