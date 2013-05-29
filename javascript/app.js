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
			alert("wtf");
		}
	}

	//showPadDetails();

	// container for planets
	var planet = [];
	var sol = [];
	var suns = [];

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
		var star;
		init();
		animate();


		// FUNCTIONS 		
		function init() 
		{
			// SCENE
			scene = new THREE.Scene();
			// CAMERA
			var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
			var VIEW_ANGLE = 40, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
			camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);


			scene.add(camera);
			
			camera.position.set(0,0,14000);
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



			var light2 = new THREE.PointLight(0xffffff);
			light2.position.set(1000,250,12000);
			scene.add(light2);

			function addSolidLineShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){
				var shape_line =[];

				var points = shape.createPointsGeometry();
				

				shape_line[index] = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
				shape_line[index].position.set( x, y, z );
				shape_line[index].rotation.set( rx, ry, rz );
				shape_line[index].scale.set( s, s, s );
				scene.add( shape_line[index] );
			}

			

			function addExtruded3DShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){

					var points = shape.createPointsGeometry();
					var spacedPoints = shape.createSpacedPointsGeometry( 100 );
					
					var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					mesh[index] = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: color } ), new THREE.MeshBasicMaterial( { color: 0xFF6EC7, wireframe: true, transparent: true } ) ] );
					mesh[index].position.set( x, y, z);
					mesh[index].rotation.set( rx, ry, rz );
					mesh[index].scale.set( s, s, s );
					parent.add( mesh[index] );

			}

			function addPlanet(xDistance, y, z, radius, segWidth, segHeight, color1, color2, index , motionAngle, sunIndex){
				var planetDarkMaterial = new THREE.MeshBasicMaterial( { color: color1 } );
				var planetWireframeMaterial = new THREE.MeshBasicMaterial( { color: color2, wireframe: true, transparent: true } ); 
				var planetMaterial = [ planetDarkMaterial, planetWireframeMaterial ]; 

				planet[index] = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.SphereGeometry( radius, segWidth, segHeight  ), 
				planetMaterial );

				planet[index].position.set( sol[sunIndex].radius + xDistance ,y,z);
				planet[index].motionAngle = motionAngle;
				scene.add( planet[index] );
			}


			function addSun(x, y, z, radius, segWidth, segHeight, index ){
				// var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				// var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6103, wireframe: true, transparent: true } ); 
				// var multiMaterial = [ darkMaterial, wireframeMaterial ]; 
				
				var fire = new THREE.MeshBasicMaterial({
				    map: THREE.ImageUtils.loadTexture("images/fire.jpeg")
				});

				var sphereGeometry = new THREE.SphereGeometry(radius, segWidth, segHeight);
				var sphereTexture = new THREE.ImageUtils.loadTexture( 'images/fire.jpeg' );
				var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture } );
				sol[index] = new THREE.Mesh(sphereGeometry.clone() , sphereMaterial);

				sol[index].position.set(x, y, z);
				sol[index].radius = radius;
				scene.add( sol[index] );
			}


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


			// create the particle variables
			var particleCount = 14400,
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
			  var pX = Math.random() * 14000 -7000,
			      pY = Math.random() * 14000 -7000,
			      pZ = Math.random() * 14000 -7000,
			      particle = new THREE.Vertex(
			        new THREE.Vector3(pX, pY, pZ)
			      );
				// particle = new THREE.Particle( new THREE.ParticleCircleMaterial( { color: 0xffffff, opacity: 1, blending: THREE.AdditiveBlending } ) );
				// particle.position.set(px, py, pz);
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
			function sun(){

			}

			//sun addSun(x, y, z, radius, segWidth, segHeight, index )
			addSun(0,0,9000,600,32,16,1);
			//planets
			addPlanet(200, sol[1].position.y, sol[1].position.z, 20, 32, 16, 0x0000ff, 0x7EB6FF, 1 ,0.0049	,1);
			addPlanet(400, sol[1].position.y, sol[1].position.z, 30, 32, 16, 0xFF00ff, 0x000000, 2 ,0.0047	,1);
			addPlanet(650, sol[1].position.y, sol[1].position.z, 35, 32, 16, 0x00ff00, 0x000000, 3 ,0.0027	,1);
			addPlanet(1250,sol[1].position.y, sol[1].position.z, 91, 32, 16, 0xFFA07A, 0x000000, 4 ,0.00201	,1);	





			// sun addSun(x, y, z, radius, segWidth, segHeight, index )
			addSun(0,0,1000,900,32,16,2);
			//planets
			addPlanet(600, sol[2].position.y, sol[2].position.z, 22, 32, 16, 0xFF00ff, 0x000000, 5 ,0.0047	,2);
			addPlanet(1250, sol[2].position.y, sol[2].position.z, 75, 32, 16, 0x00ff00, 0x000000, 6 ,0.0027	,2);
			addPlanet(1850,sol[2].position.y, sol[2].position.z, 61, 32, 16, 0xFFA07A, 0x000000, 7 ,0.00201	,2);	


			var radInner = 150;
			var radMiddle = 155;
			var radOuter = 160;

			// for(var iDeg= 1; iDeg <=360 ; iDeg++){
			// 	xInner = radInner * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
			// 	yInner = radInner * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6); 


			// 	xMiddle = radMiddle * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
			// 	yMiddle = radMiddle * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6); 

			// 	var lineGeometry = new THREE.Geometry();
			// 	var vertArray = lineGeometry.vertices;
			// 	vertArray.push( new THREE.Vector3(xInner, yInner, 1800), new THREE.Vector3(xMiddle, yMiddle, 1800));
			// 	lineGeometry.computeLineDistances();
			// 	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			//  	line = new THREE.Line( lineGeometry, lineMaterial );
			// 	scene.add(line);
			// }



			// var lineGeometry = new THREE.Geometry();
			// var vertArray = lineGeometry.vertices;
			// vertArray.push( new THREE.Vector3(-10, 0, camera.position.z-10), new THREE.Vector3(10, 0, camera.position.z-10));
			// lineGeometry.computeLineDistances();
			// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
		 // 	crossX = new THREE.Line( lineGeometry, lineMaterial );
			// scene.add(crossX);

			// var lineGeometry = new THREE.Geometry();
			// var vertArray = lineGeometry.vertices;
			// vertArray.push( new THREE.Vector3(0, -10, camera.position.z-10), new THREE.Vector3(0, 10, camera.position.z-10));
			// lineGeometry.computeLineDistances();
			// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
		 // 	crossY = new THREE.Line( lineGeometry, lineMaterial );
			// scene.add(crossY);

		}

		var x_motion_positive = true;
		var drawAmmo = false;
		var releaseAmmo = false;
		var follow = false;
		var m_angle = 0;
		var planet2_m_angle =0;
		var planet3_m_angle =0;
		var planet4_m_angle =0;

		function animate() 
		{
			var gamepads = navigator.webkitGetGamepads();

			var pad = gamepads[0];
			if( pad )
			{
		
				pad.buttons[1] == 1 ? camera.position.set(0,150,14000): '';
		
				// drift protection as axis controllers do not return 0
				var cxaxis  = Math.round( pad.axes[0] * 10 ) / 10; 
				var cyaxis  = Math.round( pad.axes[1] * 10 ) / 10; 
				var czaxis  = Math.round( pad.axes[3] * 10 ) / 10; 

				camera.position.set(camera.position.x + ( cxaxis * 10), camera.position.y+ ( cyaxis * 10 ), camera.position.z + ( czaxis * 10));
				
				//camera.position.z <=.01 ? camera.rotation.x = 180: camera.rotation.x = 0;
				//crossX.position.set(crossX.position.x + ( cxaxis * 10), crossX.position.y+ ( cyaxis * 10 ), crossX.position.z+ ( czaxis * 10));
			  	//crossY.position.set(crossY.position.x + ( cxaxis * 10), crossY.position.y+ ( cyaxis * 10 ), crossY.position.z+ ( czaxis * 10));
//			alert(scene.position.x+':'+scene.position.y+':'+scene.position.z);
			//calculate distance to 0,0,0
			var r = Math.sqrt(Math.pow(camera.position.x,2) + Math.pow(camera.position.y,2) + Math.pow(camera.position.z,2));


//sx, sy, sz are the coordinates you are trying to calculate. 
//cx, cy, cz are the coordinates you are at, 
//r is euclidean distance (range in your terms). 
//theta_xz is the angle in the xz plane (sweeping from z to x), 
//and theta yz is the angl in the yz plane (sweeping from z to y).

// sx = (Math.sin(theta_xz) * r * Math.cos(theta_yz)) + camera.position.x;
// sy = (r*Math.sin(theta_yz) ) + camera.position.y;
// sz = (Math.cos(theta_xz) * r * Math.cos(theta_yz)) + camera.position.z;
			}
			

			// cubey stuff
			sol[1].rotation.y += 0.01;
			sol[2].rotation.y += 0.01;




			planet[1].rotation.y += 0.008;
			planet[2].rotation.y += 0.009;
			planet[3].rotation.y += 0.011;
			planet[4].rotation.y += 0.011;
			planet[5].rotation.y += 0.011;
			planet[6].rotation.y += 0.014;
			planet[7].rotation.y += 0.018;

			planet[1].motionAngle += 0.0049;
			planet[1].position.set(   (sol[1].radius+200) * Math.cos(planet[1].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+200)* Math.sin(planet[1].motionAngle) + sol[1].position.z)


			planet[2].motionAngle += 0.0047; 
			planet[2].position.set(  (sol[1].radius+400)* Math.cos(planet[2].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+400)* Math.sin(planet[2].motionAngle) + sol[1].position.z)
			

			planet[3].motionAngle += 0.0027; 
			planet[3].position.set(   (sol[1].radius+650)* Math.cos(planet[3].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+650)* Math.sin(planet[3].motionAngle) + sol[1].position.z)
			
			planet[4].motionAngle += 0.00201;
			planet[4].position.set(   (sol[1].radius+1150)* Math.cos(planet[4].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+1150)* Math.sin(planet[4].motionAngle) + sol[1].position.z)
			
			planet[5].motionAngle += 0.00201;
			planet[5].position.set(   (sol[2].radius+600)* Math.cos(planet[5].motionAngle) + sol[2].position.x , sol[2].position.y ,(sol[2].radius+1150)* Math.sin(planet[5].motionAngle) + sol[2].position.z)
			
			planet[6].motionAngle += 0.00201;
			planet[6].position.set(   (sol[2].radius+1200)* Math.cos(planet[6].motionAngle) + sol[2].position.x , sol[2].position.y ,(sol[2].radius+1150)* Math.sin(planet[6].motionAngle) + sol[2].position.z)
			
			planet[7].motionAngle += 0.00201;
			planet[7].position.set(   (sol[2].radius+1850)* Math.cos(planet[7].motionAngle) + sol[2].position.x , sol[2].position.y ,(sol[2].radius+1150)* Math.sin(planet[7].motionAngle) + sol[2].position.z)
			

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