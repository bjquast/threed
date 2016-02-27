 $(function(){

  //create scene
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.x = -10;
  camera.position.y = 10;
  camera.position.z = 50;
  camera.lookAt(scene.position);
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x999999 );
  renderer.shadowMapEnabled = true; 

  $('#viewbox').append( renderer.domElement );
  //alert($('#viewbox').innerWidth());
  renderer.setSize( $('#viewbox').innerWidth() - 100, $('#viewbox').innerHeight() );
  
  var spotlight1 = new THREE.SpotLight( 0xffffff, 2 );
  spotlight1.position.set( -10, 90 , 10 );
  spotlight1.shadowCameraVisible = true;
  scene.add( spotlight1 );
  
  
  var ambiColor = '#bbe2b7';
  var ambiColor = '#cecece';
  var ambientLight = new THREE.AmbientLight( ambiColor );
  scene.add( ambientLight );
  
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
  spotlight1.castShadow = true;
  
  //add plane to scene
  scene.add( plane );

  //add stripe to scene
  scene.add( stripe );

  //add cube to scene
  scene.add( cube );

  //place camera outside the stripe
  //camera.position.z = 50;
      

  var stats = initStats();
    
  function initStats() {
   var stats = new Stats();
   stats.setMode(0);
   stats.domElement.style.position = 'absolute';
   stats.domElement.style.left = '20px';
   stats.domElement.style.top = '10px';
   
   $('#bla').append (stats.domElement );
   return stats;
  }


  //animate scene ???
  function render() {
   stats.update();
   requestAnimationFrame( render );

   stripe.rotation.x += 0.1;
   stripe.rotation.y += 0.1;
       
   cube.rotation.x += -0.001;
   cube.rotation.y += -0.001;

   renderer.render( scene, camera );
   }
  render();
  
 });
