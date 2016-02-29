 $(function(){

  //create scene
  var scene = new THREE.Scene();
  var spotlight = setSpotLight();
  scene.add( spotlight );
  scene.add( setAmbientLight() );
  var camera = setCamera( scene );
  var cameraControls = setCameraMouseControls();
  var renderer =  setDefaultRenderer();

  $('#viewbox').append( renderer.domElement );
  renderer.setSize( $('#viewbox').innerWidth() - 100, $('#viewbox').innerHeight() );
  
  
  //scene.fog = new THREE.Fog( 0xefefef , 0.055, 90 );

  //create Plane
  var planeGeometry = new THREE.PlaneGeometry( 80 , 50 );
  var planeMaterial = new THREE.MeshLambertMaterial( { color : 0xEEEEEE } );
  var plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.rotation.x = -0.8;
  
  //create stripe
  var torusGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16  );
  var material = new THREE.MeshPhongMaterial( { color: 0x3302ff } );
  var stripe = new THREE.Mesh( torusGeometry, material );

  //create cube
  var cubeGeometry = new THREE.BoxGeometry( 10, 10, 10  );
  var material = new THREE.MeshLambertMaterial( { color: 0xdfcf34 } );
  var cube = new THREE.Mesh( cubeGeometry, material );

  plane.position.y = -18;
  plane.position.z = 0;
  
  cube.position.x = -15;
  stripe.position.x = 15;
  
  cube.castShadow = true;
  stripe.castShadow = true;
  plane.receiveShadow = true;
  spotlight.castShadow = true;
  
  //add plane to scene
  scene.add( plane );

  //add stripe to scene
  scene.add( stripe );

  //add cube to scene
  scene.add( cube );

  //place camera outside the stripe
  //camera.position.z = 50;
      

  var stats = initStats();
  var clock = new THREE.Clock();

  render();

  //animate scene ???
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
  function setCameraMouseControls() {
    var cameraControls = new THREE.TrackballControls(camera);
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
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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
   stripe.rotation.x += 0.1;
   stripe.rotation.y += 0.1;
       
   cube.rotation.x += -0.001;
   cube.rotation.y += -0.001;
  }
  
 
});
