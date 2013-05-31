window.onload = function() {

	var mesh = [];
	function de2ra(degree)   { return degree*(Math.PI/180); }

	var circPoints =[];
	var indicators = [];
	var text = [];

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
					scene.add( mesh[index] );

			}


			function drawGuage(x,y,z,radius,index,color,axisController){

				circPoints = [];
				function setCirclePointCoordinates(radius){
					for(var iDeg= 1; iDeg <=360 ; iDeg++){
						var xN = radius * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
						var yN = radius * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6); 
						circPoints.push(new THREE.Vector2 (xN+x,yN+y));
					}
				}
				setCirclePointCoordinates(radius);

				
				var circShape = new THREE.Shape( circPoints );
				var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
				addSolidLineShape( circShape, extrudeSettings, color, 0, 0, 0, 0, 0, 0, 1, index );
				//addExtruded3DShape( circShape, extrudeSettings, Math.random() * 0xffffff, 0, 0, 0, 0, 0,0, .8, index );

				var lineGeometry = new THREE.Geometry();
				var vertArray = lineGeometry.vertices;
				vertArray.push( new THREE.Vector3(x, y ,z), new THREE.Vector3(x,radius,z));
				lineGeometry.computeLineDistances();
				var lineMaterial = new THREE.LineBasicMaterial( { color:color } );


			 	indicators[index] = new THREE.Line( lineGeometry, lineMaterial );
			 	indicators[index].startX = x;
			 	indicators[index].startY = y;
				indicators[index].startZ = z;
				indicators[index].radius = radius;
				indicators[index].color = color;

				scene.add(indicators[index]);

				// create a canvas element
				function addText(text, x,y,z){
					var canvas1 = document.createElement('canvas');
					var context1 = canvas1.getContext('2d');
					context1.font = "Bold 20px Arial";
					c = "#"+Math.round(color).toString(16);
					context1.fillStyle = c;
				    context1.fillText(text, 0, 50);
				    
					// canvas contents will be used for a texture
					var texture1 = new THREE.Texture(canvas1) 
					texture1.needsUpdate = true;
				      
				    var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
				    material1.transparent = true;

				    var mesht = new THREE.Mesh(
				        new THREE.PlaneGeometry(canvas1.width, canvas1.height),
				        material1
				      );
					mesht.position.set(x,y,z);
					scene.add( mesht );
				}
				var rInner = radius-20;
				for(var tp = 0; tp <=11; tp++){

						xT = rInner * Math.cos(2 * Math.PI * (tp +135) / 12).toFixed(6)+140;
						yT = rInner * Math.sin(2 * Math.PI * (tp +135) / 12).toFixed(6)-28; 
						//alert(x+135+' : '+y+165);
						addText(invertDisplay(tp), xT+x, yT+y ,z , tp);
				}

			}

			function invertDisplay(n){
				switch(n){
					case 0:
						return '';
						break;
					case 1:
						return 110;
						break;
					case 2:
						return 100;
						break;
					case 3:
						return 90;
						break;
					case 4:
						return 80;
						break;
					case 5:
						return 70;
						break;
					case 6:
						return 60;
						break;
					case 7:
						return 50;
						break;
					case 8:
						return 40;
						break;
					case 9:
						return 30;
						break;
					case 10:
						return 20;
						break;
					case 11:
						return 10;
						break;

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

			drawGuage(0,0,0,200,1,Math.random() * 0xffffff,null);
			drawGuage(-400,0,0,160,2,Math.random() * 0xffffff,null);
			drawGuage(400,0,0,160,3,Math.random() * 0xffffff,null);
			//drawGuage(0,-400,0,120,4,Math.random() * 0xffffff,null);

		

		}
		var cAxis;
		function animate() 
		{


		var startX = [];
		var startY = [];
		var startZ = [];
		var radius = [];
		var color = [];
			var gamepads = navigator.webkitGetGamepads();

			var pad = gamepads[0];
			if( pad )
			{
		
				// drift protection as axis controllers do not return 0
				var caxis0  = Math.round( pad.axes[0] * 10 ) / 10; // yoke pull/push
				var caxis1  = Math.round( pad.axes[1] * 10 ) / 10; // yoke left/right
				var caxis2  = Math.round( pad.axes[2] * 10 ) / 10; // throttles left
				var caxis3  = Math.round( pad.axes[3] * 10 ) / 10; // throttle right 
				var caxis4  = Math.round( pad.axes[4] * 10 ) / 10; // throttle center
				var caxis5  = Math.round( pad.axes[5] * 10 ) / 10; 
				var caxis6  = Math.round( pad.axes[6] * 10 ) / 10; 
				var caxis7  = Math.round( pad.axes[7] * 10 ) / 10; 
				var caxis8  = Math.round( pad.axes[8] * 10 ) / 10; 
				var caxis9  = Math.round( pad.axes[9] * 10 ) / 10; // right thumb


				for( var gIdx = 1; gIdx <=3; gIdx++ ){

					switch(gIdx){
						case 1:
						  cAxis  = caxis2;
						  break;
						case 2:
						  cAxis  = caxis3;
						  break;
						case 3:
						  cAxis  = caxis4;
						  break;
						case 4:
						  cAxis  = caxis9;
						  break;
						default:
						  alert('etf2');
						  break;
					}

					var iDeg = (1 + cAxis ) * 180 + 90;

					var x = indicators[gIdx].radius * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
					var y = indicators[gIdx].radius * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6); 
		

					 startX[gIdx] = indicators[gIdx].startX;
					 startY[gIdx] = indicators[gIdx].startY;
					 startZ[gIdx] = indicators[gIdx].startZ;
					 radius[gIdx] = indicators[gIdx].radius;
					 color[gIdx] = indicators[gIdx].color;

					scene.remove( indicators[gIdx] );

					// creat replacement
					var lineGeometry = new THREE.Geometry();
					var vertArray = lineGeometry.vertices;

					vertArray.push( new THREE.Vector3(startX[gIdx],startY[gIdx],startZ[gIdx]), new THREE.Vector3(x+startX[gIdx],y+startY[gIdx],0));

					lineGeometry.computeLineDistances();
					var lineMaterial = new THREE.LineBasicMaterial( { color: color[gIdx] } );
				 	indicators[gIdx] = new THREE.Line( lineGeometry, lineMaterial );

					indicators[gIdx].startX = startX[gIdx];
					indicators[gIdx].startY = startY[gIdx];
					indicators[gIdx].startZ = startZ[gIdx];
					indicators[gIdx].radius = radius[gIdx];
					indicators[gIdx].color  = color[gIdx];
					scene.add(	indicators[gIdx]	);
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