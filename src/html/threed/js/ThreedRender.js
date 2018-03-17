// Renderer calls appropriate loader function from Generic Loader 

$(function(){

  
  //create scene
  var scene = getScene();

  // create GenericLoader
  tgl = new ThreedGenericLoader();

  //load Blender Object via ThreedGenericLoader
  $('.wavefront').click(function(){
    scene = getScene();
    var objUrl = $(this).find('.obj').attr('href');
    var mtlUrl = $(this).find('.mtl').attr('href');

    tgl = new ThreedGenericLoader();

    tgl.setObjectUrl( objUrl );
    tgl.setMaterialUrl( mtlUrl );
    tgl.setBlenderScene( scene );;
  });

  //load Collada Object via ThreedGenericLoader
  $('.collada').click(function(){

    scene = getScene();
    var daeUrl = $(this).find('.dae').attr('href');
    tgl = new ThreedGenericLoader();

    tgl.setObjectUrl( daeUrl );
    tgl.setColladaScene( scene );
  });

  var camera = getCamera( scene );
  var cameraControls = getCameraMouseControls( camera );
  var renderer =  getDefaultRenderer();

  $('#viewbox').append( renderer.domElement );
  renderer.setSize( window.innerWidth - 100, window.innerHeight );
  //renderer.setSize( document.getElementById('viewbox').innerWidth, document.getElementById('viewbox').innerHeight );
  
  var stats = initStats();
  var clock = new THREE.Clock();
 
  render();


  // render the scene
  function render() {
   stats.update();
   var delta = clock.getDelta();
   cameraControls.update( delta );
   
   requestAnimationFrame( render );
   setAnimation();
   

   renderer.render( scene, camera );
   }


   // initalize scene
   function getScene( ){
     var scene = new THREE.Scene();
     scene.add( getSpotLight() );
     scene.add( getAmbientLight() );

     return scene;
   };

   // initialize stats
   function initStats() {
   var stats = new Stats();
   stats.setMode(0);
   stats.domElement.style.position = 'absolute';
   stats.domElement.style.left = '20px';
   stats.domElement.style.top = '10px';
   
   $('#viewbox').append (stats.domElement );
   return stats;
  }

  //append TrackBallControls
  function getCameraMouseControls( camera ) {
    var cameraControls = new THREE.TrackballControls( camera );
    cameraControls.rotationSpeed = 0.1;
    cameraControls.zoomSpeed = 0.1;
    cameraControls.panSpeed = 0.1;
    
    return cameraControls;
  }
  
  //append FirstPersonControls
  function getCameraFirstPersonControls( camera ) {
    var cameraControls = new THREE.FirstPersonControls( camera );
    cameraControls.noFly = true;
    cameraControls.lookVertical = true;
    cameraControls.LookSpeed = 0.4;
    //cameraControls.movementSpeed = 20;
    cameraControls.constrainVertical = true;
    cameraControls.verticalMin =0.2;
    cameraControls.verticalMax = 2.0;
    cameraControls.lon = 2;
    cameraControls.lat = 2;
    return cameraControls;
  }


  //append AmbientLight
  function getAmbientLight() {
    var ambiColor = '#bbe2b7';
    var ambiColor = '#cecece';
    var ambientLight = new THREE.AmbientLight( ambiColor );
 
    return ambientLight;
  }

  //append SpotLight
  function getSpotLight() {
    var spotlight = new THREE.SpotLight( 0xffffff, 2 );
    spotlight.position.set( -10, 90 , 10 );
    spotlight.shadowCameraVisible = true;
    spotlight.castShadow = true;
    spotlight.intensity = 0.2;
 
    return spotlight;
  }
   
  //append Camera To Scene
  function getCamera( scene ) {
    //var camera = new THREE.PerspectiveCamera( 75, document.getElementById('viewbox').innerWidth / document.getElementById('viewbox').innerHeight , 0.1, 1000 );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 2;
    camera.lookAt(scene.position);
 
    return camera;
  }

  // append Renderer
  function getDefaultRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x999999 );
    renderer.shadowMapEnabled = true;
    
    
    return renderer;
  }
  
  //append Animation to Objects
  function setAnimation() {
   //stripe.rotation.x += 0.1;
   //stripe.rotation.y += 0.1;
       
   //cube.rotation.x += -0.001;
   //cube.rotation.y += -0.001;
  }
  
  $('#viewbox').on("dialogopen",  function( ) {
    //alert($('#viewbox').innerWidth() + "\n" + $('#viewbox').innerHeight());    
    renderer.setSize($('#viewbox').innerWidth() - 45, $('#viewbox').innerHeight() - 35 );
    camera.aspect = $('#viewbox').innerWidth() / $('#viewbox').innerHeight();
    camera.updateProjectionMatrix();
  });
 
  $('#viewbox').on("dialogresizestop",  function( ) {
    //alert($('#viewbox').innerWidth() + "\n" + $('#viewbox').innerHeight());    
    renderer.setSize($('#viewbox').innerWidth() - 45 , $('#viewbox').innerHeight() - 35 );
    camera.aspect = $('#viewbox').innerWidth() / $('#viewbox').innerHeight();
    camera.updateProjectionMatrix();
  });
 
 
});
