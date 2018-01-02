ThreedGenericLoader = function( ){

  var objUrl = '';
  
  this.setBlenderScene = function ( Scene ) {
    var scene = Scene;

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load( matUrl, function ( material ) {

      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials ( material );
      objLoader.load( objUrl, function( object ){
       
      scene.add(object);
    });
    
    });
    
    return scene;    
  }
    
    
  
  
  this.setObjectUrl = function ( ObjUrl ) {
    objUrl = ObjUrl;
  }

  this.setMaterialUrl = function ( MatUrl ) {
    matUrl = MatUrl;
  }
   
   
    
};
