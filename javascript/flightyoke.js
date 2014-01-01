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
		var heightMultiplier = 4.5;
		var depthMultiplier = 3;
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

		// coord = function(){

		// }
		// hillCount = getRandomInt(7,53);
		// var hills= new Array();
		// for(var h = 0; h < hillCount; h++){
		// 	hills.push (new Hill(widthsegments,depthsegments, getRandomInt(10,widthsegments), getRandomInt( 7,61)));
		// }

		// lakeCount = getRandomInt(7,53);
		// var lakes = new Array();
		// for(var h = 0; h < lakeCount; h++){
		// 	lakes.push (new Hill(widthsegments,depthsegments, getRandomInt(10,widthsegments), getRandomInt( 29,93)));
		// }

		// build topograpy
		for(var i = 0; i <= this.widthSegments; i++){

			this.terrain[i] = new Array();
			for( var j =0; j <= this.depthSegments; j++){
				this.terrain[i][j] = new coord();
				this.terrain[i][j].x = this.startX +(i*this.segWidth);
				//
				this.terrain[i][j].y =0;
				// for(var h = 0; h < hillCount; h++){
				// 	this.terrain[i][j].y += (hills[h][i][j] * heightMultiplier);
				// }

				// for(var h = 0; h < lakeCount; h++){
				// 	this.terrain[i][j].y -= lakes[h][i][j] * depthMultiplier;
				// }

 				this.terrain[i][j].y += (Math.random() * this.ruggedness);
				this.terrain[i][j].z = this.startZ +(j*this.segDepth);
			}
			
		}

		// using topography from above. generate squares


		var index = 0;
		this.squares = new Array();
		var color;
		squareColors = [];
		var yPoint1 = 100;
		var yPoint2 = 100;
		var yPoint3 = 100;
		var yPoint4 = 100;
		for(var i = 0; i < this.widthSegments; i++){
			
			for( var j =0; j < this.depthSegments; j++){
				var geometry = new THREE.Geometry();
				this.terrain[i][j].y < 0 ?  color = 0x3333FF:  color = 0x77ff77;
				//this.terrain[i][j].y ==0 ?  color = 0xCCEEFF:  '';

				// //foothills
				// this.terrain[i][j].y > 6 ?  color = 0x333300:  '';
				// j < this.widthsegments-1  && this.terrain[i][j-1].y > 6  ?   color = 0x333300:  '';
				// j > 0  && this.terrain[i][j+1].y > 6 ?  color = 0x333300:  '';

				// i < this.depthsegments-1  && this.terrain[i-1][j].y > 6 ?  color = 0x333300:  '';
				// i > 0  && this.terrain[i+1][j].y > 6 ?  color = 0x333300:  '';

				// i > 0 && j > 0 && this.terrain[i+1][j+1].y > 6 ?  color = 0x333300:  '';


				// //peaks
				// this.terrain[i][j].y > 48 ?  color = 0xAAAAFF:  '';
				// j < this.widthsegments-1  && this.terrain[i][j-1].y > 48  ?   color = 0xAAAAFF:  '';
				// j > 0  && this.terrain[i][j+1].y > 48 ?  color = 0xAAAAFF:  '';

				// i < this.depthsegments-1  && this.terrain[i-1][j].y > 48 ?  color = 0xAAAAFF:  '';
				// i > 0  && this.terrain[i+1][j].y > 48 ?  color = 0xAAAAFF:  '';

				// i > 0 && j > 0 && this.terrain[i+1][j+1].y > 48 ?  color = 0xAAAAFF:  '';




				var jthis = j <= 1 ? 0:1; 
				this.terrain[i][jthis].y > 7 ?  color = 0x333300:  '';
				geometry.vertices.push( new THREE.Vector3( this.terrain[i][j].x, this.terrain[i][j].y, this.terrain[i][j].z ));
				geometry.vertices.push( new THREE.Vector3( this.terrain[i+1][j].x, this.terrain[i+1][j].y, this.terrain[i+1][j].z ));
				geometry.vertices.push( new THREE.Vector3( this.terrain[i+1][j+1].x, this.terrain[i+1][j+1].y, this.terrain[i+1][j+1].z ));
				geometry.vertices.push( new THREE.Vector3( this.terrain[i][j+1].x, this.terrain[i][j+1].y, this.terrain[i][j+1].z ));
				geometry.vertices.push( new THREE.Vector3( this.terrain[i][j].x, this.terrain[i][j].y, this.terrain[i][j].z ));
				this.squares.push(geometry);
				squareColors.push(color);

				if(this.terrain[i][j].y !== undefined && this.terrain[i][j].y <= 0 )
				{ 
					var geometrySurface = new THREE.Geometry();
					geometrySurface.vertices.push( new THREE.Vector3( this.terrain[i][j].x, 0, this.terrain[i][j].z ));
					geometrySurface.vertices.push( new THREE.Vector3( this.terrain[i+1][j].x, 0, this.terrain[i+1][j].z ));
					geometrySurface.vertices.push( new THREE.Vector3( this.terrain[i+1][j+1].x, 0, this.terrain[i+1][j+1].z ));
					geometrySurface.vertices.push( new THREE.Vector3( this.terrain[i][j+1].x, 0, this.terrain[i][j+1].z ));
					geometrySurface.vertices.push( new THREE.Vector3( this.terrain[i][j].x, 0, this.terrain[i][j].z ));


					this.squares.push(geometrySurface);
					squareColors.push(0x33ccFF);
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
			
			camera.position.set(0,50,500);
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

				shape_line[shape][index] = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 2 } ) );
				shape_line[shape][index].position.set( x, y, z );
				shape_line[shape][index].rotation.set( rx, ry, rz );
				shape_line[shape][index].scale.set( s, s, s );
				scene.add( shape_line[shape][index] );
			}

			function addTerrain(){

			}

			function madness(x,y,z){
				var x1,x2,y1,y2,z1,z2,x3,y3,z3;
				var leaf = [];
				pts =[];
				x1=0;
				y1= 0;
				x2=0;
				y2=0;
				z1=0;
				z2=x3=y3=z3=0;
				var geometry = new THREE.Geometry();

				for(var i = 1; i <= 22; i++){
					x1 = getRandomArbitary(-1,1) * 10;
					y1 += Math.random() * 30;
					z1 = getRandomArbitary(-1,1) * 10;
					x1 = x+x1;
					y1 = y+y1;
					z1 = z+z1;
					geometry.vertices.push(new THREE.Vector3 (x1,y1,z1));
					var fl = false;

					var geometry2 = new THREE.Geometry();
					y2=y1;
					for(var i2 = 1; i2 <= 4; i2++){
						

						x2 = getRandomArbitary(-1,1) * 30;
						y2 +=getRandomArbitary(-1,1) * 10;
						z2 = getRandomArbitary(-1,1) * 30;

						x2 = x+x2;
						y2 = y+y2;
						z2 = z+z2;

						i2 == 1 ? geometry2.vertices.push(new THREE.Vector3 (x1,y1,z1)):geometry2.vertices.push(new THREE.Vector3 (x2,y2,z2));
					

						var geometry3 = new THREE.Geometry();
						y3=y2;
						for(var i3 = 1; i3 <= 3; i3++){
							

							x3 = getRandomArbitary(-1,1) * 10;
							y3 +=getRandomArbitary(-1,1) * 10;
							z3 = getRandomArbitary(-1,1) * 10;

							x3 = x+x3;
							y3 = y+y3;
							z3 = z+z3;
							i3 == 1 ? geometry3.vertices.push(new THREE.Vector3 (x2,y2,z2)):geometry3.vertices.push(new THREE.Vector3 (x3,y3,z3));
							
						}
						var material3 = new THREE.LineBasicMaterial({
			        		color: Math.random()* 0xffffff
			    		});
			    		var line3 = new THREE.Line(geometry3, material3);
			    		scene.add(line3);



					}
					var material2 = new THREE.LineBasicMaterial({
	        			color: Math.random()* 0xffffff,linewidth: 2
	    			});
	    			var line2 = new THREE.Line(geometry2, material2);
	    				scene.add(line2);

					}
				

				var material = new THREE.LineBasicMaterial({
        			color:  0x00ff00, linewidth: 3 
    			});
    			var line = new THREE.Line(geometry, material);
    			scene.add(line);
    			//geometry.vertices.push(pts)
				//var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
				//addSolidLineShape( shape, extrudeSettings, Math.random() * 0xffffff, 0, 0, 0, 0, 0, 0, 1, 1,0 );
				

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

			function addLampButtonIndicator(x,y,z,radius,index,colorOff, colorOn){
				circPoints = [];
				lamps = [];
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
				addSolidLineShape( circShape, extrudeSettings, colorOff, 0, 0, 0, 0, 0, 0, 1, index,LAMP );
				//lamps[index].colorOn = colorOn;
				//lamps[index].colorOff = colorOff;
			
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
			//scene.fog = new THREE.FogExp2( 0x450000, 0.0025 );
			
			////////////
			// CUSTOM //
			////////////
			



/*
*
				index % 2 == 0 ? img = "images/fire.jpeg": img = "images/fire.jpeg"
				var fire = new THREE.MeshBasicMaterial({
				    map: THREE.ImageUtils.loadTexture(img)
				});

				var sphereGeometry = new THREE.SphereGeometry(radius, segWidth, segHeight);
				var sphereTexture = new THREE.ImageUtils.loadTexture( img );
				var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture } );
				sol[index] = new THREE.Mesh(sphereGeometry.clone() , sphereMaterial);
*/

			drawGuage(camera.position.x,camera.position.y,camera.position.z-100,20,1,0xff0000,null);
			drawGuage(-400,900,0,140,2,0xff0000,null);
			drawGuage(400,0,900,140,3,0xff0000,null);
			drawGuage(-245,230,900,120,4, 0xff0000,null);

			//addLampButtonIndicator(x,y,z,radius,index,colorOff, ColorOn)
			addLampButtonIndicator(-500, 400, 0 , 15, 0, 0xFFFF00, 0xFF0000);
			addLampButtonIndicator( 500, 400, 0 , 15, 1, 0xFFFF00, 0xFF0000);


			addLampButtonIndicator(-540, 360, 0 , 15, 8, 0xFFFF00, 0xFF0000);
			addLampButtonIndicator(-540, 300, 0 , 15, 9, 0xFFFF00, 0xFF0000);

			// for( var j = 1; j <=21; j++){
			// 	madness(getRandomArbitary(-1,1) * 700, 0, getRandomArbitary(-1,1) * 500);
			// }
		

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
			

			/*
			* guage motion
			*/
//console.log(camera.position.z,guages[1].position.z)
			// scene.remove(guages[1]);
			// drawGuage(camera.position.x,camera.position.y,camera.position.z-100,20,1,0xff0000,null);
			// scene.add(guages[1]);
			//guages[1].position.z = camera.position.z -100;
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

	function drawGuage(x,y,z,radius,index,color,axisController){

				circPoints = [];

				var geometry = new THREE.Geometry();
				function setCirclePointCoordinates(radius){
					for(var iDeg= 1; iDeg <=360 ; iDeg++){
						var xN = radius * Math.cos(2 * Math.PI * iDeg / 360).toFixed(6);
						var yN = radius * Math.sin(2 * Math.PI * iDeg / 360).toFixed(6); 
						geometry.vertices.push(new THREE.Vector3 (xN+x,yN+y,z));
					}
				}
				setCirclePointCoordinates(radius);

				
				// var circShape = new THREE.Shape( circPoints );
				// var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
				// addSolidLineShape( circShape, extrudeSettings, color, x, y, z, 0, 0, 0, 1, index,GUAGE );
				//addExtruded3DShape( circShape, extrudeSettings, Math.random() * 0xffffff, 0, 0, 0, 0, 0,0, .8, index );
				
				var material = new THREE.LineBasicMaterial({
        			color: 0xff0000,linewidth: 2
    			});
    			guages[index] = new THREE.Line(geometry, material);
    				

				// var lineGeometry = new THREE.Geometry();
				// var vertArray = lineGeometry.vertices;
				// vertArray.push( new THREE.Vector3(x, y ,z), new THREE.Vector3(x,radius,z));
				// lineGeometry.computeLineDistances();
				// var lineMaterial = new THREE.LineBasicMaterial( { color:color } );

			 // 	indicators[index] = new THREE.Line( lineGeometry, lineMaterial );
			 // 	indicators[index].startX = x;
			 // 	indicators[index].startY = y;
				// indicators[index].startZ = z;
				// indicators[index].radius = radius;
				// indicators[index].color = color;

				// scene.add(indicators[index]);

				// // create a canvas element
				// function addText(text, x,y,z){
				// 	var canvas1 = document.createElement('canvas');
				// 	var context1 = canvas1.getContext('2d');
				// 	context1.font = "Bold 8px Arial";
				// 	c = "#"+Math.round(color).toString(16);
				// 	context1.fillStyle = c;
				//     context1.fillText(text, 0, 50);
				    
				// 	// canvas contents will be used for a texture
				// 	var texture1 = new THREE.Texture(canvas1) 
				// 	texture1.needsUpdate = true;
				      
				//     var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
				//     material1.transparent = true;

				//     var mesht = new THREE.Mesh(
				//         new THREE.PlaneGeometry(canvas1.width, canvas1.height),
				//         material1
				//       );
				// 	mesht.position.set(x,y,z);
				// 	scene.add( mesht );
				// }
				// var rInner = radius-2;
				// for(var tp = 0; tp <=11; tp++){

				// 		xT = rInner * Math.cos(2 * Math.PI * (tp +135) / 12).toFixed(6)+140;
				// 		yT = rInner * Math.sin(2 * Math.PI * (tp +135) / 12).toFixed(6)-28; 
				// 		//alert(x+135+' : '+y+165);
				// 		addText(invertDisplay(tp), xT+x, yT+y ,z , tp);
				// }

			}

}