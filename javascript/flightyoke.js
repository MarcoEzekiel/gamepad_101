window.onload = function() {

	var mesh = [];
	function de2ra(degree)   { return degree*(Math.PI/180); }

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
			var VIEW_ANGLE = 70, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
			camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);


			scene.add(camera);
			
			camera.position.set(0,0,1000);
			lookAt = scene.position;
			camera.lookAt(lookAt);	

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
			light2.position.set(0,0,16000);
			scene.add(light2);

			function addSolidLineShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){
				var shape_line =[];

				var points = shape.createPointsGeometry();
				

				shape_line[index] = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 4 } ) );
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
					scene.add( mesh[index] );

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
				scene.add( planet[index] );
			}


			function addSun(x, y, z, radius, segWidth, segHeight, index ){
				// var darkMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				// var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xFF6103, wireframe: true, transparent: true } ); 
				// var multiMaterial = [ darkMaterial, wireframeMaterial ]; 
				
				index % 2 == 0 ? img = "images/fire.jpeg": img = "images/blue.jpeg"
				var fire = new THREE.MeshBasicMaterial({
				    map: THREE.ImageUtils.loadTexture(img)
				});

				var sphereGeometry = new THREE.SphereGeometry(radius, segWidth, segHeight);
				var sphereTexture = new THREE.ImageUtils.loadTexture( img );
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


			// for(var iDeg= 1; iDeg <=360 ; iDeg++){
			// 	x = 200 * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
			// 	y = 200 * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6) +200; 

			// 	xTo = 200 * Math.cos(2 * Math.PI * (iDeg+1) / 360).toFixed(6);
			// 	yTo = 200 * Math.sin(2 * Math.PI * (iDeg+1) / 360).toFixed(6) +200; 



			// 	var lineGeometry = new THREE.Geometry();
			// 	var vertArray = lineGeometry.vertices;
			// 	vertArray.push( new THREE.Vector3(x, y, 0), new THREE.Vector3(xTo, yTo, 0));
			// 	lineGeometry.computeLineDistances();
			// 	var lineMaterial = new THREE.LineBasicMaterial( { color:0xff00000 } );
			//  	line = new THREE.Line( lineGeometry, lineMaterial );
			// 	scene.add(line);
			// }

			var circPoints =[]
			function drawCircle(){
				for(var iDeg= 1; iDeg <=360 ; iDeg++){
					x = 200 * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
					y = 200 * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6) +200; 

					// xTo = 200 * Math.cos(2 * Math.PI * (iDeg+1) / 360).toFixed(6);
					// yTo = 200 * Math.sin(2 * Math.PI * (iDeg+1) / 360).toFixed(6) +200; 
					
					circPoints.push(new THREE.Vector2 (x,y));
				}
			}

			drawCircle();

			var index=0;
			var circShape = new THREE.Shape( circPoints );
			var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
			addSolidLineShape( circShape, extrudeSettings, 0xff0000, 0, 0, 0, 0, 0, 0, 1, index );
			//addExtruded3DShape( circShape, extrudeSettings, Math.random() * 0xffffff, 0, 0, 0, 0, 0,0, .8, index );









			var lineGeometry = new THREE.Geometry();
			var vertArray = lineGeometry.vertices;
			vertArray.push( new THREE.Vector3(0,200,0), new THREE.Vector3(0,400,0));
			lineGeometry.computeLineDistances();
			var lineMaterial = new THREE.LineBasicMaterial( { color:0xff00000 } );
		 	indicator1 = new THREE.Line( lineGeometry, lineMaterial );
			scene.add(indicator1);


		}

		function animate() 
		{
			var gamepads = navigator.webkitGetGamepads();

			var pad = gamepads[0];
			if( pad )
			{
		
			
		
				// drift protection as axis controllers do not return 0
				var cxaxis0  = Math.round( pad.axes[0] * 10 ) / 10; // yoke pull/push
				var cyaxis1  = Math.round( pad.axes[1] * 10 ) / 10; // yoke left/right
				var czaxis2  = Math.round( pad.axes[2] * 10 ) / 10; // throttles left
				var cxaxis3  = Math.round( pad.axes[3] * 10 ) / 10; // throttle right 
				var cyaxis4  = Math.round( pad.axes[4] * 10 ) / 10; // throttle center
				var czaxis5  = Math.round( pad.axes[5] * 10 ) / 10; 
				var cxaxis6  = Math.round( pad.axes[6] * 10 ) / 10; 
				var cyaxis7  = Math.round( pad.axes[7] * 10 ) / 10; 
				var czaxis8  = Math.round( pad.axes[8] * 10 ) / 10; 
				var czaxis9  = Math.round( pad.axes[9] * 10 ) / 10; // right thumb


				var iDeg = (1 + czaxis2 ) *180 +90;
				var x = 180 * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
				var y = 180 * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6) +200; 

				scene.remove( indicator1 );
				var lineGeometry = new THREE.Geometry();
				var vertArray = lineGeometry.vertices;
				vertArray.push( new THREE.Vector3(0,200,0), new THREE.Vector3(x,y,0));
				lineGeometry.computeLineDistances();
				var lineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
			 	indicator1 = new THREE.Line( lineGeometry, lineMaterial );
				scene.add(indicator1);

			
			}
			

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