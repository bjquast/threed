$(function(){

    $('#viewbox').dialog({
      modal: false,
      autoOpen: false,
      height: ($(window).height() - 60),
      width: ($(window).width() - 60),
    });

    $('.3dexample').each(function(){
      $(this).attr("style", "cursor: pointer;");
      $(this).click( function(){
          $('#viewbox').dialog( 'open' );
          $('.ui-dialog-buttonpane').append('<div id="stats"></div>');
          return false;
      });
    });
}); 
