$(function(){
   
    var stats = initStats();
    
    function initStats() {
     var stats = new Stats();
     stats.setMode(0);
     $('#stats').append (stats.domElement );
     return stats;
    }
    
});


