ThreedObject = function( ){

  
  this.setDefaultScene = function( scene ){    
    //var geometries[] = null;
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
  
    //add plane to scene
    scene.add( plane );

    //add stripe to scene
    scene.add( stripe );

    //add cube to scene
    scene.add( cube );

    //place camera outside the stripe
    //camera.position.z = 50;
      
  };
};
