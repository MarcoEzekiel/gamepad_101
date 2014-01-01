window.onload = function() {

	/**
	 * Returns a random number between min and max
	 */
	function getRandomArbitary (min, max) {
	    return Math.random() * (max - min) + min;
	}

	/**
	 * Returns a random integer between min and max
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	Hill = function(terrainWidthInSegments,terrainDepthInSegments, Xseg, Zseg){

		/*
		******##**
		****###***
		***##X##**
		**####****
		***#******

		10 * 5 above == ten horizontal segments * ten vertical segments
		*/
		var yPlus=0;
		this.mtPts = new Array();
		for(var i = 0;  i <= terrainWidthInSegments; i++){
			this.mtPts[i] = new Array();
			for(var j = 0; j <= terrainDepthInSegments; j++){

				if(i == Xseg -5){
					switch(j){
						case 5 + Zseg:
						case 7 + Zseg:
						 	yPlus = 1;
						 	break;
						case 8 + Zseg: 
							yPlus = 1;
							break;
						default: 
							yPlus=0;
							break;
					}
				}
				if(i == Xseg -4){
					
					switch(j){
						case 7 + Zseg:
						 	yPlus = 2;
						 	break;
						case 8 + Zseg: 
							yPlus = 3;
							break;
						default:
							yPlus=0;
							break;
					}	
				}
				if(i == Xseg -3){
					switch(j){
						case 5 + Zseg:
						case 7 + Zseg:
						 	yPlus = 3;
						 	break;
						case 6 + Zseg: 
							yPlus = 4;
							break;
						default:
							yPlus=0;
							break;
					}				
				}
				if(i == Xseg -2){
					switch(j){
						case 5 + Zseg:
						case 7 + Zseg:
						 	yPlus = 5;
						 	break;
						case 6 + Zseg: 
							yPlus = 6;
							break;
						default:
							yPlus=0;
							break;
					}			
				}
				if(i == Xseg -1){
					switch(j){
						case 4 + Zseg:
						case 8 + Zseg:
							yPlus = 7;
							break;
						case 5 + Zseg:
						case 7 + Zseg:
						 	yPlus = 8;
						 	break;
						case 6 + Zseg: 
							yPlus = 9;
							break;
						case 9 + Zseg:
						case 3 + Zseg:
						 	yPlus = 1;
						 	break;
						default:
							yPlus=0;
							break;
					}					
				}
				if(i == Xseg){
					switch(j){
						case 4 + Zseg:
						case 8 + Zseg:
							yPlus = 8;
							break;
						case 5 + Zseg:
						case 7 + Zseg:
						 	yPlus = 9;
						 	break;
						case 6 + Zseg: 
							yPlus = 10;
						break;
						case 9 + Zseg:
						case 3 + Zseg:
						 	yPlus = 1;
						 	break;
						default:
							yPlus=0;
							break;
					}
				}
				if(i == Xseg +1){
					switch(j){
						case 4 + Zseg:
						case 8 + Zseg:
							yPlus = 7;
							break;
						case 5 + Zseg:
						case 7 + Zseg:
						 	yPlus = 8;
						 	break;
						case 6 + Zseg: 
							yPlus = 9;
						break;
						case 9 + Zseg:
						case 3 + Zseg:
						 	yPlus = 1;
						 	break;
						default:
							yPlus=0;
							break;
					}						
				}
				if(i == Xseg +2){
					switch(j){
						case 3 + Zseg:
						 	yPlus = 4;
						 	break;
						case 4 + Zseg:
							yPlus = 4;
							break;
						case 5 + Zseg:
						 	yPlus = 5;
						 	break;
						case 6 + Zseg:
						 	yPlus = 6;
						 	break;
						default:
							yPlus=0;
							break;
					}	
				}
				if(i == Xseg +3){
					switch(j){
						case 3 + Zseg:
						 	yPlus = 2;
						 	break;
						case 4 + Zseg:
							yPlus = 3;
							break;
						case 5 + Zseg:
						 	yPlus = 4;
						 	break;
						case 6 + Zseg:
						 	yPlus = 4;
						 	break;
						default:
							yPlus=0;
							break;
					}	
				}
				if(i == Xseg +4){
						switch(j){
						case 3 + Zseg:
						 	yPlus = 1;
						 	break;
						case 4 + Zseg:
							yPlus = 2;
							break;
						case 5 + Zseg:
						 	yPlus = 2;
						 	break;
						case 6 + Zseg:
						 	yPlus = 3;
						 	break;
						default:
							yPlus=0;
							break;
					}				
				}
				if(i == Xseg +5){
						switch(j){
						case 4 + Zseg:
							yPlus = 1;
							break;
						case 5 + Zseg:
						 	yPlus = 1;
						 	break;
						case 7 + Zseg:
						case 6 + Zseg:
						 	yPlus = 1;
						 	break;
						default:
							yPlus=0;
							break;
					}				
				}

				this.mtPts[i][j]= yPlus;
			}
		}
		return this.mtPts;
	}
	var squareColors = new Array();
	// generate points for a terrain
	Terrain = function(width , depth, widthsegments, depthsegments, ruggedness){

		var heightMultiplier = 1;
		var depthMultiplier = 1;
		this.width = width;
		this.depth = depth;
		this.widthSegments = widthsegments;
		this.depthSegments = depthsegments;
		this.ruggedness = ruggedness;

		this.segWidth = width/widthsegments;
		this.segDepth = depth/depthsegments;
		this.startX = 0 -(width/2);
		this.startZ = 0 -(depth/2);

		this.terrain = new Array();

		var grassImg = "images/grass.jpeg";


		coord = function(){

		}
		hillCount = getRandomInt(7,35);
		var hills= new Array();
		for(var h = 0; h < hillCount; h++){
			hills.push (new Hill(widthsegments,depthsegments, getRandomInt(10,widthsegments-10), getRandomInt( 10,depthsegments-10)));
		}

		lakeCount = getRandomInt(7,43);
		var lakes = new Array();
		for(var h = 0; h < lakeCount; h++){
			lakes.push (new Hill(widthsegments,depthsegments, getRandomInt(10,widthsegments-10), getRandomInt( 10,depthsegments-10)));
		}

		// build topograpy points
		for(var i = 0; i <= this.widthSegments; i++){

			this.terrain[i] = new Array();
			for( var j =0; j <= this.depthSegments; j++){
				this.terrain[i][j] = new coord();
				this.terrain[i][j].x = this.startX +(i*this.segWidth);
				//
				this.terrain[i][j].y =0;
				// adjust points add hills
				for(var h = 0; h < hillCount; h++){
					this.terrain[i][j].y += (hills[h][i][j] * heightMultiplier);
				}
				// adjust points subtract lakes
				for(var h = 0; h < lakeCount; h++){
					this.terrain[i][j].y -= lakes[h][i][j] * depthMultiplier;
				}
				this.terrain[i][j].y <= 0 ? this.terrain[i][j].y -= (Math.random() * this.ruggedness):
 				this.terrain[i][j].y += (Math.random() * this.ruggedness);
				this.terrain[i][j].z = this.startZ +(j*this.segDepth);
			}
			
		}

		// using topography from above. generate squares

		var index = 0;
		this.squares = new Array();
		var color;		var yPoint1 = 100;
		var yPoint2 = 100;
		var yPoint3 = 100;
		var yPoint4 = 100;
		var geometry = new THREE.Geometry();
		for(var i = 0; i < this.widthSegments; i++){
			
			for( var j =0; j < this.depthSegments; j++){
				
				this.terrain[i][j].y < -1 ?  color = 0x3333FF:  color = 0x77ff77;
				this.terrain[i][j].y > 5 ?  color = 0x87421F:  '';
				this.terrain[i][j].y > 10 ?  color = 0xCCEEFF:  '';

				i > 0 && j > 0 && this.terrain[i+1][j+1].y > 48 ?  color = 0xAAAAFF:  '';

				if(this.terrain[i][j].y !== undefined )
				{

					var squareGeometry = new THREE.Geometry();
					squareGeometry.vertices.push( new THREE.Vector3( this.terrain[i][j].x, this.terrain[i][j].y , this.terrain[i][j].z ));
					squareGeometry.vertices.push( new THREE.Vector3( this.terrain[i+1][j].x, this.terrain[i+1][j].y, this.terrain[i+1][j].z ));
					squareGeometry.vertices.push( new THREE.Vector3( this.terrain[i+1][j+1].x, this.terrain[i+1][j+1].y, this.terrain[i+1][j+1].z ));
					squareGeometry.vertices.push( new THREE.Vector3( this.terrain[i][j+1].x, this.terrain[i][j+1].y, this.terrain[i][j+1].z ));
					squareGeometry.vertices.push( new THREE.Vector3( this.terrain[i][j].x, this.terrain[i][j].y, this.terrain[i][j].z ));
					squareGeometry.faces.push( new THREE.Face4( 0, 1, 2, 3) );
					squareGeometry.computeBoundingSphere();

					var squareMaterial = new THREE.MeshBasicMaterial({
                       color:color,
                       side:THREE.DoubleSide,
                       wireframe:true
                	});

					 //var wireframe_material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframe_linewidth: 10 } );

		            var squareMesh = new THREE.Mesh(squareGeometry.clone(), squareMaterial);

					this.squares.push(squareMesh);
				}
			
			}

		}
		
		return this.squares;

	}



	var GUAGE = 0;
	var LAMP = 1;

	var mesh = [];
	function de2ra(degree)   { return degree*(Math.PI/180); }

	var circPoints =[];
	var pts = [];
	var indicators = [];
	var lamps = [];
	var text = [];
	var shape_line = [];
	var guages =[];
	var terrain = [];


	//showPadDetails();


	start();
  
    function start(){
    	createPresentation();
    };

    function getRandomArbitary (min, max) {
    	return Math.random() * (max - min) + min;
	}

	function createPresentation(){

	    // MAIN

		// standard global variables
		var container, scene, camera, renderer, controls, stats;
		var keyboard = new THREEx.KeyboardState();
		var clock = new THREE.Clock();

		var mesh, texture;
		var worldWidth = 256, worldDepth = 256,
			worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
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
			//scene.fog = new THREE.FogExp2( 0xff0000, 0.0025 );
			// CAMERA
			var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
			var VIEW_ANGLE = 70, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
			camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);


			scene.add(camera);
			
			camera.position.set(0,30,130);
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




			// SKYBOX/FOG
			var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
			var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
			var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
		    skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
			// scene.add(skyBox);
			//scene.fog = new THREE.FogExp2( 0x450000, 0.0025 );
			
			////////////
			// CUSTOM //
			////////////
			
			var terrainSquares = new Terrain(150 , 150, 70, 70, 1);

			// var mesh = new Array();
			// var  mesh2 = new Array();
			// var mesh3 = new Array();
			//var c;
			for(var i=0; i < terrainSquares.length; i++ ){

				// c = typeof squareColors[i] != "undefined" ? squareColors[i]: 0xff3333;

				// //mesh[i] = new THREE.Mesh( terrainSquares[i],  new THREE.MeshBasicMaterial( { color: c }));
				// mesh2[i] = THREE.SceneUtils.createMultiMaterialObject( terrainSquares[i], [ new THREE.MeshLambertMaterial( { color: squareColors[i] } ), new THREE.MeshBasicMaterial( { color: squareColors[i], wireframe: true, transparent: false } ) ] );
				
				// texture.needsUpdate = true;
				// terrainSquares[i].buffersNeedUpdate = true;
				// terrainSquares[i].uvsNeedUpdate = true;
				// if (i == 	'100'){
				// 	mesh3[i] = new THREE.Mesh( terrainSquares[i].clone() , grass );

				// 	scene.add(mesh3[i]);
				// }
				//var mesh = THREE.SceneUtils.createMultiMaterialObject( terrainSquares[i], [ new THREE.MeshLambertMaterial( { color: squareColors[i] } ), new THREE.MeshBasicMaterial( { color: squareColors[i], wireframe: true, transparent: false } ) ] );
				//scene.add(mesh);
				scene.add(terrainSquares[i]);
				//scene.add(mesh2[i]);
				
    		}
    		//scene.add(mesh2)
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


				var cbutton0 = pad.buttons[0]; 
				var cbutton0 = pad.buttons[1];
				var cbutton0 = pad.buttons[2];
				var cbutton0 = pad.buttons[3];
				var cbutton0 = pad.buttons[4];
				var cbutton0 = pad.buttons[5];
				var cbutton0 = pad.buttons[6];
				var cbutton0 = pad.buttons[7];
				var cbutton0 = pad.buttons[8];
				var cbutton0 = pad.buttons[9];

				for( var gIdx = 1; gIdx <=1; gIdx++ ){

					switch(gIdx){
						case 1:
						  cAxis  = caxis2;
						  break;
						case 2:
						  cAxis  = caxis4;
						  break;
						case 3:
						  cAxis  = caxis3;
						  break;
						case 4:
						  cAxis  = caxis9;
						  break;
						default:
						  alert('etf2');
						  break;
					}

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