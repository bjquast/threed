 $(function(){

  
  //create scene
  var scene = new THREE.Scene();

  //load Blender Object via ThreedGenericLoader
  tgl = new ThreedGenericLoader();
  tgl.setObjectUrl( 'resources/Platy72h_LM2_2.obj' );
  tgl.setMaterialUrl( 'resources/Platy72h_LM2_2.mtl' );
  tgl.setBlenderScene( scene );
     
//  tgl.setObjectUrl( 'resources/raumplanung.obj' );
//  tgl.setMaterialUrl( 'resources/materials.mtl' );
//  tgl.setBlenderScene( scene );

  var spotlight = setSpotLight();
  spotlight.castShadow = true;

  scene.add( spotlight );
  scene.add( setAmbientLight() );
  var camera = setCamera( scene );
  var cameraControls = setCameraMouseControls( camera );
  var renderer =  setDefaultRenderer();

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
  function setCameraMouseControls( camera ) {
    var cameraControls = new THREE.TrackballControls( camera );
    cameraControls.rotationSpeed = 0.1;
    cameraControls.zoomSpeed = 0.1;
    cameraControls.panSpeed = 0.1;
    
    return cameraControls;
  }
  
  //append AmbientLight
  function setAmbientLight() {
    var ambiColor = '#bbe2b7';
    var ambiColor = '#cecece';
    var ambientLight = new THREE.AmbientLight( ambiColor );
 
    return ambientLight;
  }

  //append SpotLight
  function setSpotLight() {
    var spotlight = new THREE.SpotLight( 0xffffff, 2 );
    spotlight.position.set( -10, 90 , 10 );
    spotlight.shadowCameraVisible = true;
 
    return spotlight;
  }
   
  //append Camera To Scene
  function setCamera( scene ) {
    //var camera = new THREE.PerspectiveCamera( 75, document.getElementById('viewbox').innerWidth / document.getElementById('viewbox').innerHeight , 0.1, 1000 );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight , 0.1, 1000 );
    camera.position.x = -10;
    camera.position.y = 10;
    camera.position.z = 50;
    camera.lookAt(scene.position);
 
    return camera;
  }

  // append Renderer
  function setDefaultRenderer() {
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
