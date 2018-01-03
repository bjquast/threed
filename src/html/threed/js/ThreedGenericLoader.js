ThreedGenericLoader = function( ){

  var objUrl = '';
  
  this.setBlenderScene = function ( Scene ) {
    var scene = Scene;

//    clearScene( scene );
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setBaseUrl( cleanURL(matUrl));
    mtlLoader.setPath( cleanURL(matUrl));
    mtlLoader.load( matUrl.substring(matUrl.lastIndexOf('/')+1), function ( material ) {

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials ( material );
      objLoader.load( objUrl, function( object ){
       
      scene.add(object);
    });
    
    });
    
    return scene;    
  }
    
  this.setColladaScene = function ( Scene ) {
    var scene = Scene;
    
//    clearScene( scene );
    var mesh;
    var daeLoader = new THREE.ColladaLoader();
    daeLoader.load( objUrl, function ( collada) {
      dae = collada.scene;
      scene.add ( dae );
    } );
    
    return scene;    
  }
    
  
  function cleanURL(url) {
    return(url.replace(/\?.*$/, "")
           .replace(/\/[^\/]*\.[^\/]*$/, "")
           .replace(/\/$/, "") + "/");
  }


  function clearScene( scene ){
    var obj, i;
      for ( i = scene.children.length - 1; i >= 0 ; i -- ) {
        obj = scene.children[ i ];
        if ( obj.is_ob) {
          scene.remove(obj);
      }
    }
  }
  
  this.setObjectUrl = function ( ObjUrl ) {
    objUrl = ObjUrl;
  }

  this.setMaterialUrl = function ( MatUrl ) {
    matUrl = MatUrl;
  }
   
   
    
};
