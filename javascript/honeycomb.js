window.onload = function() {

	var mesh = [];
	var shape_line =[];
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
			var VIEW_ANGLE = 140, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
			camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);


			scene.add(camera);


			// 0 = center , 150 is high, 400 is into the scene
			camera.position.set(0,0,600);
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



			parent = new THREE.Object3D();


			//FLOOR
			// wireframe for xy-plane
			// var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true, side:THREE.DoubleSide } ); 
			// var floorGeometry = new THREE.PlaneGeometry(2000,4000,50,100);
			// var floor = new THREE.Mesh(floorGeometry, wireframeMaterial);
			// floor.position.z = -0.01;
			// // rotate to lie in x-y plane
			// floor.rotation.x = Math.PI / 1.5;
			// scene.add(floor);

			function addSolidLineShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){


				var points = shape.createPointsGeometry();


				shape_line[index] = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
				shape_line[index].position.set( x, y, z );
				shape_line[index].rotation.set( rx, ry, rz );
				shape_line[index].scale.set( s, s, s );
				parent.add( shape_line[index] );
			}

			

			function addExtruded3DShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){

					var points = shape.createPointsGeometry();
					var spacedPoints = shape.createSpacedPointsGeometry( 100 );
					
					var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					mesh[index] = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: color } ), new THREE.MeshBasicMaterial( { color: color, wireframe: true, transparent: true } ) ] );
					mesh[index].position.set( x, y, z);
					mesh[index].rotation.set( rx, ry, rz );
					mesh[index].scale.set( s, s, s );
					parent.add( mesh[index] );

			}

			

			function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s, index ) {

					var points = shape.createPointsGeometry();
					var spacedPoints = shape.createSpacedPointsGeometry( 100 );



					var geometry = new THREE.ShapeGeometry( shape );

					var mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: color } ), new THREE.MeshBasicMaterial( { color: color, wireframe: true, transparent: true } ) ] );
					mesh.position.set( x, y, z );
					mesh.rotation.set( rx, ry, rz );
					mesh.scale.set( s, s, s );
					//parent.add( mesh );

					// 3d shape

					var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

					var mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: color } ), new THREE.MeshBasicMaterial( { color: color, wireframe: true, transparent: true } ) ] );
					mesh.position.set( x, y, z);// fake out for floor
					mesh.rotation.set( rx, ry, rz );
					mesh.scale.set( s, s, s );
					parent.add( mesh );

					// solid line

					var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 1 } ) );
					line.position.set( x, y, z);
					line.rotation.set( rx, ry, rz );
					line.scale.set( s, s, s );
					//parent.add( line );

					// transparent line from real points

					// var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, opacity: 0.5 } ) );
					// line.position.set( x, y, z + 75 );
					// line.rotation.set( rx, ry, rz );
					// line.scale.set( s, s, s );
					// parent.add( line );

					// // vertices from real points

					// var pgeo = points.clone();
					// var particles = new THREE.ParticleSystem( pgeo, new THREE.ParticleBasicMaterial( { color: color, size: 2, opacity: 0.75 } ) );
					// particles.position.set( x, y, z + 75 );
					// particles.rotation.set( rx, ry, rz );
					// particles.scale.set( s, s, s );
					// parent.add( particles );

					// // transparent line from equidistance sampled points

					// var line = new THREE.Line( spacedPoints, new THREE.LineBasicMaterial( { color: color, opacity: 0.2 } ) );
					// line.position.set( x, y, z + 125 );
					// line.rotation.set( rx, ry, rz );
					// line.scale.set( s, s, s );
					// parent.add( line );

					// // equidistance sampled points

					// var pgeo = spacedPoints.clone();
					// var particles2 = new THREE.ParticleSystem( pgeo, new THREE.ParticleBasicMaterial( { color: color, size: 2, opacity: 0.5 } ) );
					// particles2.position.set( x, y, z + 125 );
					// particles2.rotation.set( rx, ry, rz );
					// particles2.scale.set( s, s, s );
					// parent.add( particles2 );

				}


			//TETRAFLOR

			var hexaPts = [];



			// flat shape
			var r = 200;
			var rInner = 400;
			var rOuter =800;
			var rWayOuter = 1200;
			var rRim = 1600;
			var n = 6;
			var x,y,x2,y2;


			function hexOut(){
				for (var i = 0; i <6; i ++){

					x = r * Math.cos(2 * Math.PI * i / n).toFixed(6);
					y = r * Math.sin(2 * Math.PI * i / n).toFixed(6); 
					
					hexaPts.push(new THREE.Vector2 (x,y));
				}
			}

			hexOut();

			var index=0;
			var hexaShape = new THREE.Shape( hexaPts );
			var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
			addSolidLineShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, 0, 0, 0, 0, 0, 33, 1, index );
			addExtruded3DShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, 0, 0, 0, 0, 0,33, 1, index );

			for (var ibig = 1; ibig <=6; ibig ++){

				xInner = rInner * Math.cos(2 * Math.PI * ibig / n).toFixed(8);
				yInner = rInner * Math.sin(2 * Math.PI * ibig / n).toFixed(8);

				hexOut();
				//randC = new toHex(randomColor());
				//alert( randC);
				var hexaShape = new THREE.Shape( hexaPts );
				var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;

				addSolidLineShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, xInner, yInner, 0, 0, 0, 33, 1, ibig );
				addExtruded3DShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, xInner, yInner, 0, 0, 0,33, 1, ibig );
			}


			hexaPts = [];
			n = 12;
			for (var ibig = 7; ibig < 19; ibig ++){

				ibig % 2 == 0 ? rOuter =  800: rOuter = 700;

				xOuter = rOuter * Math.cos(2 * Math.PI * ibig / n).toFixed(8);
				yOuter = rOuter * Math.sin(2 * Math.PI * ibig / n).toFixed(8); 


				for (i = 0; i < 6; i++) {
						x = r * Math.cos(2 * Math.PI * i / 6).toFixed(8);
						y = r * Math.sin(2 * Math.PI * i / 6).toFixed(8)

						hexaPts.push(new THREE.Vector2 ( x,y));
				}

				var hexaShape = new THREE.Shape( hexaPts );
				var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
				addSolidLineShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, xOuter, yOuter, 0, 0, 0,33, 1, ibig );
				addExtruded3DShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, xOuter, yOuter, 0, 0, 0,33, 1, ibig );
			}

			hexaPts = [];
			var yAdjustPos = 0;
			for (var ibig = 19; ibig <37; ibig ++){


				ibig % 3 == 0 ? rWayOuter =  1200: rWayOuter = 1100;
				

				xWayOuter = rWayOuter * Math.cos(2 * Math.PI * ibig / 18).toFixed(8);
				yWayOuter = rWayOuter * Math.sin(2 * Math.PI * ibig / 18).toFixed(8); 


				for (i = 0; i < 6; i++) {
						x = r * Math.cos(2 * Math.PI * i / 6).toFixed(8);
						y = r * Math.sin(2 * Math.PI * i / 6).toFixed(8)

						hexaPts.push(new THREE.Vector2 ( x,y));
				}

				var hexaShape = new THREE.Shape( hexaPts );
				//var extrudeSettings = { amount: 20, bevelSegments: 4, steps: 8 , bevelSize: 8, bevelThickness:5 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
				var extrudeSettings = { amount: 20 }; 
				addSolidLineShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, xWayOuter, yWayOuter, 0, 0, 0,33, 1, ibig );
				addExtruded3DShape( hexaShape, extrudeSettings, Math.random() * 0xffffff, xWayOuter, yWayOuter, 0, 0, 0,33, 1, ibig );
			}

	

			scene.add( parent );



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



		}


		function animate() 
		{
			//mesh[0].rotation.y +=  .01;
			//hape_line[0].rotation.y -=  .01;
			//alert(mesh.length);

			
			for(var i = 0; i< mesh.length; i++){

				if( mesh.hasOwnProperty(i)){
					i %2  == 0 ? mesh[i].rotation.y +=  .005: mesh[i].rotation.y -=  .005;
				}
				else{
					//alert(i)
				}
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