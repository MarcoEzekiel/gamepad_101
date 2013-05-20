window.onload = function() {

	function showPadDetails(){

		var gamepadSupportAvailable = Modernizr.gamepads;
		var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;

		if( gamepadSupportAvailable )
		{


			function updateStatus()
			{
				window.webkitRequestAnimationFrame(updateStatus);
				var data = '';
			 	var gamepads = navigator.webkitGetGamepads();
				
				var data = '';
			    for (var padindex = 0; padindex < gamepads.length; ++padindex)
			    {
			        var pad = gamepads[padindex];
			        var i;
			        if (!pad) continue;
			        data += '<pre>' + pad.index + ": " + pad.id + "<br/>";
			        for (i = 0; i < pad.buttons.length; ++i)
			            data += "button" + i + ": " + pad.buttons[i] + "<br/>";
			        for (i = 0; i < pad.axes.length; ++i)
			            data += "axis" + i + ": " + pad.axes[i] + "<br/>";
			    }
				document.body.innerHTML = data;
			}

			 window.webkitRequestAnimationFrame(updateStatus);
			 updateStatus();
		}
		else
		{

		}
	}

	//showPadDetails();
	start();
  

    function start(){
    	createPresentation();
    };

	function createPresentation(){

	    // MAIN

		// standard global variables
		var container, scene, camera, renderer, controls, stats;
		var keyboard = new THREEx.KeyboardState();
		var clock = new THREE.Clock();
		// custom global variables
		var cube;
		var spere;
		init();
		animate();

		// FUNCTIONS 		
		function init() 
		{
			// SCENE
			scene = new THREE.Scene();
			// CAMERA
			var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
			var VIEW_ANGLE = 140, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
			camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
			scene.add(camera);


			// 0 = center , 150 is high, 400 is into the scene
			camera.position.set(0,150,600);
			camera.lookAt(scene.position);	

			if ( Detector.webgl )
				renderer = new THREE.WebGLRenderer( {antialias:true} );
			else
				renderer = new THREE.CanvasRenderer(); 
			renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
			container = document.createElement( 'div' );
			document.body.appendChild( container );
			container.appendChild( renderer.domElement );
			// EVENTS
			THREEx.WindowResize(renderer, camera);
			THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
			// CONTROLS
			controls = new THREE.TrackballControls( camera );
			// STATS
			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.bottom = '0px';
			stats.domElement.style.zIndex = 100;
			container.appendChild( stats.domElement );
			// LIGHT
			var light = new THREE.PointLight(0xffffff);
			light.position.set(0,250,0);
			scene.add(light);

			//FLOOR
			// wireframe for xy-plane
			// var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true, side:THREE.DoubleSide } ); 
			// var floorGeometry = new THREE.PlaneGeometry(2000,4000,50,100);
			// var floor = new THREE.Mesh(floorGeometry, wireframeMaterial);
			// floor.position.z = -0.01;
			// // rotate to lie in x-y plane
			// floor.rotation.x = Math.PI / 1.5;
			// scene.add(floor);

			

			// SKYBOX/FOG
			var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
			var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
			var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
		    skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
			// scene.add(skyBox);
			scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
			
			////////////
			// CUSTOM //
			////////////
			// var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
			// var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x880000, wireframe: true, side:THREE.DoubleSide} );
			// cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
			// cube.position.set(0,30,0);
			// scene.add(cube);


			// create the particle variables
			var particleCount = 1800,
			    particles = new THREE.Geometry(),
			    pMaterial =
			      new THREE.ParticleBasicMaterial({
			        color: 0xFBDB0C,
			        size: .9
			      });
				pMaterial.blending = THREE.AdditiveBlending;
			// now create the individual particles
			for(var p = 0; p < particleCount; p++) {

			  // create a particle with random
			  // position values, -250 -> 250
			  var pX = Math.random() * 1000 - 250,
			      pY = Math.random() * 1000 - 250,
			      pZ = Math.random() * 1000 - 250,
			      particle = new THREE.Vertex(
			        new THREE.Vector3(pX, pY, pZ)
			      );
				//particle = new THREE.Particle( new THREE.ParticleCircleMaterial( { color: 0xffffff, opacity: 1, blending: THREE.AdditiveBlending } ) );

			  // add it to the geometry
			  particles.vertices.push(particle);
			}

			// create the particle system
			var particleSystem =
			  new THREE.ParticleSystem(
			    particles,
			    pMaterial);

			// add it to the scene
			scene.add(particleSystem);

			// Using wireframe materials to illustrate shape details.
			var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
			var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6103, wireframe: true, transparent: true } ); 
			var multiMaterial = [ darkMaterial, wireframeMaterial ]; 
			///
			// var orbitDarkMaterial =  new THREE.MeshBasicMaterial( { color: 0xffffff ,transparent: true, opacity: 0.0  } );
   			//  var invisibleWireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.0 } );
   			//  var invisibleMaterial = [ orbitDarkMaterial, invisibleWireframeMaterial ]; 
			// var sphereMaterial = new THREE.MeshBasicMaterial( 
			// 	{ color: 0xffffff, shading: THREE.FlatShading, 
			// 	  vertexColors: THREE.VertexColors } );
				
			// var color, face, numberOfSides, vertexIndex;
			
			// // faces are indexed using characters
			// var faceIndices = [ 'a', 'b', 'c', 'd' ];
			var fire = new THREE.MeshBasicMaterial({
			    map: THREE.ImageUtils.loadTexture("images/fire.jpeg")
			});

			var sphereGeometry = new THREE.SphereGeometry(100,32,16);
			var sphereTexture = new THREE.ImageUtils.loadTexture( 'images/fire.jpeg' );
			var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture } );
			sphere = new THREE.Mesh(sphereGeometry.clone() , sphereMaterial);

			// sphere = THREE.SceneUtils.createMultiMaterialObject( 
			// new THREE.SphereGeometry( 100, 32, 16 ), 
			// multiMaterial );

			sphere.position.set(0, 50, 0);
			scene.add( sphere );

			var planet1DarkMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
			var planet1WireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x7EB6FF, wireframe: true, transparent: true } ); 
			var planet1Material = [ planet1DarkMaterial, planet1WireframeMaterial ]; 

			satellite = THREE.SceneUtils.createMultiMaterialObject( 
			new THREE.SphereGeometry( 20, 32, 16 ), 
			planet1Material );

			satellite.position.set(300, 50, 0);
			scene.add( satellite );

			var planet2DarkMaterial = new THREE.MeshBasicMaterial( { color: 0xFF00ff } );
			var planet2WireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x0000, wireframe: true, transparent: true } ); 
			var planet2Material = [ planet2DarkMaterial, planet2WireframeMaterial ]; 

			satellite2 = THREE.SceneUtils.createMultiMaterialObject( 
			new THREE.SphereGeometry( 30, 32, 16 ), 
			planet2Material );

			satellite2.position.set(700, 50, 0);
			scene.add( satellite2 );			
		}

		var x_motion_positive = true;
		var drawAmmo = false;
		var releaseAmmo = false;
		var follow = false;
		var m_angle = 0;
		var sat2_m_angle =0;

		function animate() 
		{
			var gamepads = navigator.webkitGetGamepads();

			var pad = gamepads[0];
			if( pad )
			 {
			// 	cube.position.x += pad.axes[0] * 10;
			// 	cube.position.y -= pad.axes[1] * 10;
			// 	cube.position.z += pad.axes[3] * 10;

			// 	pad.buttons[4] == 1 ? cube.rotation.x += 0.01: '';
			// 	pad.buttons[6] == 1 ? cube.rotation.x -= 0.01: '';

			// 	pad.buttons[5] == 1 ? cube.rotation.y += 0.01: '';
			// 	pad.buttons[7] == 1 ? cube.rotation.y -= 0.01: '';

			// 	if(pad.buttons[1] == 1 && drawAmmo === false){
			// 		drawAmmo = true;
			// 	}

			// 	if( drawAmmo == true && pad.buttons[1] == 1){
			// 		var lineGeometry = new THREE.Geometry();
			// 		var vertArray = lineGeometry.vertices;
			// 		vertArray.push( new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z), new THREE.Vector3(-150, 100, 0) );
			// 		lineGeometry.computeLineDistances();
			// 		var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			// 	 	line = new THREE.Line( lineGeometry, lineMaterial );
			// 		scene.add(line);
					
			// 		follow = true;
			// 	}

			// 	if( follow ){				
			// 		line.position.x += cube.position.x;
			// 		line.position.y -= cube.position.y;
			// 		line.position.z -= cube.position.z;
			// 	}





				pad.buttons[1] == 1 ? camera.position.set(0,150,600): '';

				
				// drift protection as axis controllers do not return 0
				var cxaxis  = Math.round( pad.axes[0] * 10 ) / 10; 
				var cyaxis  = Math.round( pad.axes[1] * 10 ) / 10; 
				var czaxis  = Math.round( pad.axes[3] * 10 ) / 10; 

				camera.position.set(camera.position.x + ( cxaxis * 10), camera.position.y+ ( cyaxis * 10 ), camera.position.z + ( czaxis * 10));

				//$('#coords').append('<div>X coord '+camera.position.x+'</div>');
			}
			

			// cubey stuff
			// sphere.rotation.x += 0.01;
			sphere.rotation.y += 0.01;
			satellite.rotation.y += 0.008;
			satellite2.rotation.y += 0.009;

			m_angle += 0.0049;

			satellite.position.set(   300* Math.cos(m_angle) + sphere.position.x , sphere.position.y ,300* Math.sin(m_angle) + sphere.position.z)


			sat2_m_angle += 0.0047; 
			satellite2.position.set(   550* Math.cos(sat2_m_angle) + sphere.position.x , sphere.position.y ,550* Math.sin(sat2_m_angle) + sphere.position.z)
			var coords = '<div>X: '+Math.round(camera.position.x * 100)/100 +'</div><div>Y: '+Math.round(camera.position.y * 100)/100 +'</div><div>Z: '+Math.round(camera.position.z * 100)/100 +'</div>'
			$('#coords').html( coords  );
			//pad.buttons[i]
		    requestAnimationFrame( animate );
			render();		
			update();
		}


		function update()
		{
			if ( keyboard.pressed("z") ) 
			{ 
				// do something
			}
			
			controls.update();
			stats.update();
		}

		function render() 
		{
			renderer.render( scene, camera );
		}
	}

}