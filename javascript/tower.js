window.onload = function() {

	function de2ra(degree)   { return degree*(Math.PI/180); }

	var bricks = [];
	var brickPts = [];
	var shape_line = [];
	var mesh =[];

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

			function addSolidLineShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index, OBJ ){
				//shape_line =[];

				var points = shape.createPointsGeometry();
				shape_line[shape] = [];

				

				shape_line[index] = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 1 } ) );
				//shape_line[index] = new THREE.Line( points, fire );
				shape_line[index].position.set( x, y, z );
				shape_line[index].rotation.set( rx, ry, rz );
				shape_line[index].scale.set( s, s, s );
				scene.add( shape_line[index] );
			}

			

			function addExtruded3DShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s,index ){

					var points = shape.createPointsGeometry();
					var spacedPoints = shape.createSpacedPointsGeometry( 100 );
					
					var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );



					var img = "images/stone1.jpeg";
					var imgMesh = new THREE.MeshBasicMaterial({
					    map: THREE.ImageUtils.loadTexture(img)
					});
					mesh =[];
					mesh[index] = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: color } ), new THREE.MeshBasicMaterial( { color: color, wireframe: true, transparent: true } ) ] );
					//mesh[index] = THREE.SceneUtils.createMultiMaterialObject( geometry, [ imgMesh, new THREE.MeshLambertMaterial( { color: color } )] );
					mesh[index].position.set( x, y, z);
					mesh[index].rotation.set( rx, ry, rz );
					mesh[index].scale.set( s, s, s );
					scene.add( mesh[index] );

			}


			function drawHewnBrick(r,cnt,thickness, height, courses){

					for (var i = 1; i <=cnt; i ++){
						brickPts=[];
						xOuter = r * Math.cos(2 * Math.PI * i / cnt).toFixed(6);
						yOuter = r * Math.sin(2 * Math.PI * i / cnt).toFixed(6); 
						xInner = (r-thickness) * Math.cos(2 * Math.PI * i / cnt).toFixed(6);
						yInner = (r-thickness) * Math.sin(2 * Math.PI * i / cnt).toFixed(6);


						var iAdj = i+1;
						xNextOuter = r * Math.cos(2 * Math.PI * iAdj / cnt).toFixed(6);
						yNextOuter = r * Math.sin(2 * Math.PI * iAdj / cnt).toFixed(6); 
						xNextInner = (r-thickness) * Math.cos(2 * Math.PI * iAdj / cnt).toFixed(6);
						yNextInner = (r-thickness) * Math.sin(2 * Math.PI * iAdj / cnt).toFixed(6);

						brickPts.push(new THREE.Vector2 (xOuter, yOuter));
						brickPts.push(new THREE.Vector2 (xInner, yInner));

						//alert(xOuter+":"+yOuter+":"+xInner+":"+yInner);
						brickPts.push(new THREE.Vector2 (xNextInner, yNextInner));
						brickPts.push(new THREE.Vector2 (xNextOuter, yNextOuter));

						var brickShape = new THREE.Shape( brickPts );
					
						var extrudeSettings = { amount: height-10, steps: 5 , bevelSegments: 5, bevelSize: 5, bevelThickness:5 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
						
						for(var l = 1;  l <=courses; l++){
							//addSolidLineShape( brickShape, extrudeSettings, 0xff0000, 0, 0, l*20, 0, 0, 0, 1,i, 'brick' );
							addExtruded3DShape( brickShape, extrudeSettings, Math.random() * 0xffffff, 0, 0,  (l*height) , 0,0, 0, 1,i);
						}

					}




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

			drawHewnBrick(80,27,10, 20, 20);


		

		}

		function animate() 
		{

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