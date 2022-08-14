/*=====================
     range slider js
     ==========================*/
     
     $( function() {
        $( "#slider-range" ).slider({
          range: true,
          min: 0,
          max: 50000,
          values: [ 2000, 6000 ],
          slide: function( event, ui ) {
            $( "#amount" ).val( "₹" + ui.values[ 0 ] + " - ₹" + ui.values[ 1 ] );
          }
        });
        $( "#amount" ).val( "₹" + $( "#slider-range" ).slider( "values", 0 ) +
          " - ₹" + $( "#slider-range" ).slider( "values", 1 ) );
      } );

      $( function() {
        $( "#slider-range1" ).slider({
          range: true,
          min: 0,
          max: 10000,
          values: [ 100, 2000 ],
          slide: function( event, ui ) {
            $( "#amount1" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + " sq ft"  );
          }
        });
        $( "#amount1" ).val( $( "#slider-range1" ).slider( "values", 0 ) +
          " - " + $( "#slider-range1" ).slider( "values", 1 ) + " sq ft" );
      } );