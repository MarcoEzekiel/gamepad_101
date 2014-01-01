window.onload = function() {

	// you know , For Circles
	function de2ra(degree)   { return degree*(Math.PI/180); }

	// shows buttons and axes data
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

	// containers for objects
	// 
	var planet = [];
	var sol = [];
	var suns = [];
	var lookAt;
	var daylightIndicator;
	var daylight;
	var iMod = 0;
	var shape_line =[];



	var seeAll = false;
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
			
			camera.position.set(0,2000,0);
			lookAt = scene.position;
			lookAt.x =0;
			lookAt.y =0;
			lookAt.z =0;
			camera.lookAt(0,0,0);	

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
			
			//
			// LIGHT
			//
			var light = new THREE.PointLight(0xffffff);
			light.position.set(0,1000,2000);
			scene.add(light);

			

			function addSolidLineShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){
				

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

			function addPlanet(xDistance, y, z, radius, segWidth, segHeight, color1, color2, index , motionAngle, sunIndex, sun){
				var planetDarkMaterial = new THREE.MeshBasicMaterial( { color: color1 } );
				var planetWireframeMaterial = new THREE.MeshBasicMaterial( { color: color2, wireframe: true, transparent: true } ); 
				var planetMaterial = [ planetDarkMaterial, planetWireframeMaterial ]; 

				planet[index] = THREE.SceneUtils.createMultiMaterialObject( 
				new THREE.SphereGeometry( radius, segWidth, segHeight  ), 
				planetMaterial );
				planet[index].radius = radius;

				sun == 0 ? pPos = sol[sunIndex].radius: pPos = planet[sun].radius
				planet[index].position.set( pPos + xDistance ,y,z);
				planet[index].motionAngle = motionAngle;
				planet[index].xDistance=xDistance;
				scene.add( planet[index] );
			}


			function addSun(x, y, z, radius, segWidth, segHeight, index ){
				var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6103, wireframe: true, transparent: true } ); 
				var multiMaterial = [ darkMaterial, wireframeMaterial ]; 
				
				index % 2 == 0 ? img = "images/fire.jpeg": img = "images/fire.jpeg"
				var fire = new THREE.MeshBasicMaterial({
				    map: THREE.ImageUtils.loadTexture(img)
				});

				var sphereGeometry = new THREE.SphereGeometry(radius, segWidth, segHeight);
				var sphereTexture = new THREE.ImageUtils.loadTexture( img );
				var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture } );
				sol[index] = new THREE.Mesh(sphereGeometry.clone() , wireframeMaterial);

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


			//sun addSun(x, y, z, radius, segWidth, segHeight, index )
			addSun(0,0,0,400,32,16,1);
			//planets
			addPlanet(100, sol[1].position.y, sol[1].position.z, 20, 32, 16, 0xFF0033, 0x000000, 1 ,0.0049	,1,1);
			// addPlanet(800, sol[1].position.y, sol[1].position.z, 30, 32, 16, 0x00DD99, 0x000000, 2 ,0.0047	,1,0);
			// addPlanet(1400, sol[1].position.y, sol[1].position.z, 35, 32, 16, 0x00ff00, 0x000000, 3 ,0.0027	,1,0);
			// addPlanet(2600,sol[1].position.y, sol[1].position.z, 200, 32, 16, 0xFF00ff, 0x000000, 4 ,0.00201	,1,0);	





// 			// sun addSun(x, y, z, radius, segWidth, segHeight, index )
// 			// addSun(-2000,4000,-4000,900,32,16,2);
// 			// //planets
// 			// addPlanet(600, sol[2].position.y, sol[2].position.z, 22, 32, 16, 0xFF00ff, 0x000000, 5 ,0.0047	,2);
// 			// addPlanet(1250, sol[2].position.y, sol[2].position.z, 75, 32, 16, 0x00ff00, 0x000000, 6 ,0.0027	,2);
// 			// addPlanet(1850,sol[2].position.y, sol[2].position.z, 61, 32, 16, 0xFFA07A, 0x000000, 7 ,0.00201	,2);	

// // //tilt		
// 			planet[1].rotation.x = 0.311;
// 			planet[2].rotation.x = 0.47;
// 			planet[3].rotation.x = 0.6;
// 			//planet[4].rotation.x = 0.11;
// // 			//moons
//  			addPlanet(321,planet[4].position.y, planet[4].position.z, 33, 32, 16, 0xFFFFCC, 0xFFDDAA, 8 ,0.00201	,1,4);
//  			addPlanet(600,planet[4].position.y, planet[4].position.z, 66, 32, 17, 0xFFCC99, 0xFFAA88, 9 ,0.00201	,1,4);

// 			planet[8].rotation.x = 6.68;
// 			planet[9].rotation.x= 3.13; 			

//  			// surface
// 			//addPlanet(1,planet[4].position.y, planet[4].position.z, 10, 32, 16, 0xffffff, 0x000000, 10 ,0.00201	,1,4);

//  			// lookat
//  			addPlanet(5000,planet[4].position.y, planet[4].position.z, 1, 4, 2, 0xffffff, 0x000000, 11 ,0.00201	,1,4);

//  			daylightIndicator = Math.sqrt(Math.pow(2600,2) + Math.pow(5000,2) );
//  			//alert(daylightIndicator);

			
		}

		var x_motion_positive = true;
		var drawAmmo = false;
		var releaseAmmo = false;
		var follow = false;
		var theta_xz =0;
		var theta_yz =0;
		var cameraMotionAngle=0;

		var camX, camY, camZ, lookX,lookY,lookZ;
		function animate() 
		{

			iMod++;
			var gamepads = navigator.webkitGetGamepads();

			var pad = gamepads[0];
			if( pad )
			{

				/*
				*
				*/
		
				pad.buttons[1] == 1 ? seeAll = true: seeAll = false;
		
				// drift protection as axis controllers do not return 0
				var cxaxis  = Math.round( pad.axes[0] * 10 ) / 10; 
				var cyaxis  = Math.round( pad.axes[1] * 10 ) / 10; 
				var czaxis  = Math.round( pad.axes[3] * 10 ) / 10; 

				
				//camera.position.z <=.01 ? camera.rotation.x = 180: camera.rotation.x = 0;
				//crossX.position.set(crossX.position.x + ( cxaxis * 10), crossX.position.y+ ( cyaxis * 10 ), crossX.position.z+ ( czaxis * 10));
			  	//crossY.position.set(crossY.position.x + ( cxaxis * 10), crossY.position.y+ ( cyaxis * 10 ), crossY.position.z+ ( czaxis * 10));
//			alert(scene.position.x+':'+scene.position.y+':'+scene.position.z);
			//calculate distance to 0,0,0



				//sx, sy, sz are the coordinates you are trying to calculate. 
				//cx, cy, cz are the coordinates you are at, 
				//r is euclidean distance (range in your terms). 
				//theta_xz is the angle in the xz plane (sweeping from z to x), 
				//and theta yz is the angl in the yz plane (sweeping from z to y).
				//alert(lookAt.x+":"+lookAt.y+":"+lookAt.z);
				// isNaN(lookAt.x) ? lookAt.x = 0: lookAt.x = lookAt.x;
				// isNaN(lookAt.y) ? lookAt.y = 0: lookAt.y = lookAt.y;
				// isNaN(lookAt.z) ? lookAt.z = 0: lookAt.z = lookAt.z;
				// var r = Math.sqrt(Math.pow(camera.position.x -lookAt.x,2) + Math.pow(camera.position.y - lookAt.y,2) + Math.pow(camera.position.z - lookAt.z,2));
				// cxaxis > 0 ? rxMotion = 2:rxMotion = -2;
				// cyaxis > 0 ? ryMotion = 2:ryMotion = -2;
				// czaxis > 0 ? rzMotion = 2:rzMotion = -2;

				// theta_xz += de2ra(cxaxis);
				// theta_yz += de2ra(cyaxis);

				// if(czaxis != 0){
				// 	moveTo.x = (Math.sin(theta_xz) * rxMotion * Math.cos(theta_yz)) + camera.position.x;
				// 	moveTo.y = (ryMotion*Math.sin(theta_yz) ) + camera.position.y;
				// 	moveTo.z = ( Math.cos(theta_xz) * rzMotion *  Math.cos(theta_yz)) + camera.position.z;
				// 	//alert(theta_xz+":"+theta_yz+":"+moveTo.x+":"+moveTo.y+":"+moveTo.z);
				// 	camera.position.set(moveTo.x, moveTo.y, moveTo.z);



				// 	lookAt.x = (Math.sin(theta_xz) * r * Math.cos(theta_yz)) + camera.position.x;
				// 	lookAt.y = (r*Math.sin(theta_yz) ) + camera.position.y;
				// 	lookAt.z = (Math.cos(theta_xz) * r * Math.cos(theta_yz)) - camera.position.z;

				// }
				// //alert(lookAt.x+":"+lookAt.y+":"+lookAt.z);
				// camera.lookAt(lookAt)
			}
			

			

			// rotations
			sol[1].rotation.y -= 0.006;
			//sol[2].rotation.y -= 0.01;

// 			planet[1].rotation.y -= 0.008;
// 			planet[2].rotation.y -= 0.009;
// 			planet[3].rotation.y -= 0.011;
// 			planet[4].rotation.y -= 0.00715;
// 			// // planet[5].rotation.y -= 0.011;
// 			// // planet[6].rotation.y -= 0.014;
// 			// // planet[7].rotation.y -= 0.018;

// 			planet[8].rotation.y -= 0.0027;

// 			planet[9].rotation.y -= 0.0036;

// 			//planet[10].rotation.y -=0.0012;

// 			/*
// 			* Orbits
// 			*/ 
			planet[1].motionAngle += 0.006;
			planet[1].position.set(   (sol[1].radius + planet[1].xDistance ) * Math.cos(planet[1].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+planet[1].xDistance)* Math.sin(planet[1].motionAngle) + sol[1].position.z)


// 			planet[2].motionAngle += 0.0047; 
// 			planet[2].position.set(  (sol[1].radius + planet[2].xDistance )* Math.cos(planet[2].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+planet[2].xDistance)* Math.sin(planet[2].motionAngle) + sol[1].position.z)
			

// 			planet[3].motionAngle += 0.0027; 
// 			planet[3].position.set(   (sol[1].radius + planet[3].xDistance )* Math.cos(planet[3].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+planet[3].xDistance)* Math.sin(planet[3].motionAngle) + sol[1].position.z)
			
// 			planet[4].motionAngle += 0.0011;
// 			planet[4].position.set(   (sol[1].radius + planet[4].xDistance )* Math.cos(planet[4].motionAngle) + sol[1].position.x , sol[1].position.y ,(sol[1].radius+planet[4].xDistance)* Math.sin(planet[4].motionAngle) + sol[1].position.z)
			

// 			// the moon s

// 			planet[9].motionAngle += 0.0011/12;
// 			planet[9].position.set(   (planet[4].radius+planet[9].xDistance)* Math.cos(planet[9].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+planet[9].xDistance)* Math.sin(planet[9].motionAngle) + planet[4].position.z)

// 			planet[8].motionAngle += 0.0011/10;
// 			planet[8].position.set(   (planet[4].radius+planet[8].xDistance)* Math.cos(planet[8].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+planet[8].xDistance)* Math.sin(planet[8].motionAngle) + planet[4].position.z)

// // surface
// 			// planet[10].motionAngle += 0.0015;
// 			// planet[10].position.set(   (planet[4].radius+planet[10].xDistance)* Math.cos(planet[10].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+planet[10].xDistance)* Math.sin(planet[10].motionAngle) + planet[4].position.z)

// // lookat
// 			planet[11].motionAngle += 0.0030;
// 			planet[11].position.set(   (planet[4].radius+planet[11].xDistance)* Math.cos(planet[11].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+planet[11].xDistance)* Math.sin(planet[11].motionAngle) + planet[4].position.z)

// 			var distancetosun = Math.sqrt( Math.pow(sol[1].position.z - planet[11].position.z, 2 ) + Math.pow(sol[1].position.x - planet[11].position.x,2  ));
// 			Math.round(distancetosun) <= Math.round(daylightIndicator) ? daylight=true: daylight=false;


// 			daylight === true ? document.body.style.background = '#4444FF': document.body.style.background= '#020002';
// 			// var skyColor = getGradients(distancetosun);
// 			// document.body.style.background = skyColor[1];

// 			camX = planet[4].radius * Math.cos(planet[4].motionAngle) + planet[4].position.x;
// 			camY = planet[4].position.y;
// 			camZ = planet[4].radius * Math.sin(planet[4].motionAngle) + planet[4].position.z;

// 			// lookAt.x = planet[11].position.x
// 			// lookAt.y = planet[11].position.y;
// 			// lookAt.z = planet[11].position.z;

			
// 			if(seeAll === false){
// 				camera.position.set((planet[4].radius+1)* Math.cos(planet[11].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+1)* Math.sin(planet[11].motionAngle) + planet[4].position.z);
// 				camera.lookAt(planet[11].position);
// 			}
// 			else{
// 				camera.position.set(0,0,16000);
// 				camera.lookAt(scene.position);
// 			}
			 // camera.position.set(sol[1].position.x, sol[1].position.y+5000, sol[1].position.z+500);
			 // camera.lookAt(sol[1].position);
			// camera is on
			// // planet[5].motionAngle += 0.00201;
			// // planet[5].position.set(   (sol[2].radius+600)* Math.cos(planet[5].motionAngle) + sol[2].position.x , sol[2].position.y ,(sol[2].radius+1150)* Math.sin(planet[5].motionAngle) + sol[2].position.z)
			
			// // planet[6].motionAngle += 0.00201;
			// // planet[6].position.set(   (sol[2].radius+1200)* Math.cos(planet[6].motionAngle) + sol[2].position.x , sol[2].position.y ,(sol[2].radius+1150)* Math.sin(planet[6].motionAngle) + sol[2].position.z)
			
			// // planet[7].motionAngle += 0.00201;
			// // planet[7].position.set(   (sol[2].radius+1850)* Math.cos(planet[7].motionAngle) + sol[2].position.x , sol[2].position.y ,(sol[2].radius+1150)* Math.sin(planet[7].motionAngle) + sol[2].position.z)
			
			// planet[8].motionAngle += 0.00601;
			// planet[8].position.set(   (planet[4].radius+planet[8].xDistance)* Math.cos(planet[8].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+planet[8].xDistance)* Math.sin(planet[8].motionAngle) + planet[4].position.z)

			// planet[9].motionAngle += 0.00301;
			// planet[9].position.set(   (planet[4].radius+planet[9].xDistance)* Math.cos(planet[9].motionAngle) + planet[4].position.x , planet[4].position.y ,(planet[4].radius+planet[9].xDistance)* Math.sin(planet[9].motionAngle) + planet[4].position.z)

			//var 4RotDisplay = '<div class="headerShort">4 rot: '+planet[4].rotation.y+'</div>';


			// if( Math.round( planet[4].rotation.y*100 )/100 % Math.round() ){

			// }
			// var piMod = ( Math.round( Math.PI*100 )/100 ) % (0-( Math.round( planet[4].rotation.y*100 )/100 )) ;

			// if(piMod == 0){alert('0')}

			// var xDisplay = '<div class="headerShort">'+daylight +' : </br>'+Math.round(distancetosun)+' : </br>'+Math.round(daylightIndicator)+'</div>';
			// //var xDisplay = '<div class="headerShort">X: '+Math.round(camera.position.x * 100)/100 +'</div>';
			// var yDisplay = '<div class="headerShort">Y: '+Math.round(camera.position.y * 100)/100 +'</div>';
			// var zDisplay = '<div class="headerShort">Z: '+Math.round(camera.position.z * 100)/100 +'</div>';
			// var theta_yzDisplay = '<div class="headerLong">theta_yz: '+theta_yz+'</div> ';
			// var theta_xzDisplay = '<div class="headerLong">theta_xz: '+theta_xz+'</div>';
			// var displayLookAtX = '<div class="headerLong">lookAtX: '+lookAt.x +'</div>';
			// var displayLookAtY = '<div class="headerLong">lookAtY: '+lookAt.y +'</div>';
			// var displayLookAtZ = '<div class="headerLong">lookAtZ: '+lookAt.z +'</div>';
			// var details = xDisplay+yDisplay+zDisplay+theta_yzDisplay+theta_xzDisplay+displayLookAtX+displayLookAtY+displayLookAtZ;



			// $('#details').html( details  );
			// //pad.buttons[i]
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