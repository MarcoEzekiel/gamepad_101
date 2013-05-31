
			//FLOOR
			// wireframe for xy-plane
			// var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, wireframe: true, side:THREE.DoubleSide } ); 
			// var floorGeometry = new THREE.PlaneGeometry(2000,4000,50,100);
			// var floor = new THREE.Mesh(floorGeometry, wireframeMaterial);
			// floor.position.z = -0.01;
			// // rotate to lie in x-y plane
			// floor.rotation.x = Math.PI / 1.5;
			// scene.add(floor);
			// var r = 50;
			// var hexaPts = [];
			// haxaFloor
			// function hexOut(){
			// 	for (var i = 0; i <6; i ++){

			// 		x = r * Math.cos(2 * Math.PI * i / 6).toFixed(6);
			// 		y = r * Math.sin(2 * Math.PI * i / 6).toFixed(6); 
					
			// 		hexaPts.push(new THREE.Vector2 (x,y));
			// 	}
			// }

			// hexOut();
			// var index=0;
			// var hexaShape = new THREE.Shape( hexaPts );
			// var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
			// addSolidLineShape( hexaShape, extrudeSettings, 0xFF00FF, 0, 0, 0, 0, 0, 33, 1, index );
			// //addExtruded3DShape( hexaShape, extrudeSettings, 0xFF00FF, 0, 0, 0, 0, 0,33, 1, index );

			// for( var i = 1; i <= 5; i++){
			// var xOrigin = -1000;
			// var zOrigin = -1000;
			// for( var zI = 1; zI <= 40; zI++)
			// {
			// 	for( var i = 1; i <= 20; i++)
			// 	{
			// 		hexOut();
			// 		var index=0;
			// 		var hexaShape = new THREE.Shape( hexaPts );
			// 		var extrudeSettings = { amount: 20 }; // bevelSegments: 2, steps: 2 , bevelSegments: 5, bevelSize: 8, bevelThickness:5;
			// 		addSolidLineShape( hexaShape, extrudeSettings, 0xFF00FF, xOrigin, 0, zOrigin, Math.PI / 1.5, 0, 0, 1, index );
			// 		xOrigin = xOrigin+100;
			// 	}
			// 	zOrigin = zOrigin+100;
			// 	zI % 2 == 0 ? xOrigin = -1000: xOrigin = -1050;
			// 	//xOrigin = -1000
			// }
			// //TETRAFLOR

			// var baseX = 0;
			// var baseZ = 0;

			// //var angle = 108;
			// var len = 100;

			// var x,z;
			// var start_x = 0;
			// var start_z = 0;
			// var deg = 108;


			// 	var divisor = deg/180;
			// 	var angle = Math.PI * divisor;

		 //        x = start_x + ( len  * Math.cos(angle) );
		 //        z = start_z + ( len  * Math.sin(angle) );

			// 	//alert( start_x+' '+start_z+' '+x+' '+z);

		 //        var lineGeometry = new THREE.Geometry();
			// 	var vertArray = lineGeometry.vertices;

			// 	vertArray.push( new THREE.Vector3( start_x , 0, start_z ), new THREE.Vector3( x, 0, z ));

			// 	lineGeometry.computeLineDistances();
			// 	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			//  	line = new THREE.Line( lineGeometry, lineMaterial );

			// 	scene.add(line);

		 //        start_x = x;
		 //        start_z = z;
		 //        deg -= 108;
		 //        //deg > 360 ? deg = deg -360: deg = deg;  
			// }

			// for( var i = 1; i <= 5; i++){

				// var lineGeometry = new THREE.Geometry();
				// var vertArray = lineGeometry.vertices;
				// vertArray.push( new THREE.Vector3(49.85 + baseX, 0, 88.69 + baseZ), new THREE.Vector3(93.66 + baseX, 0, 81.61 + baseZ));
				// lineGeometry.computeLineDistances();
				// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			 // 	line = new THREE.Line( lineGeometry, lineMaterial );
				// scene.add(line);

				// var lineGeometry = new THREE.Geometry();
				// var vertArray = lineGeometry.vertices;
				// vertArray.push( new THREE.Vector3(93.66 + baseX, 0, 81.61 + baseZ), new THREE.Vector3(90.96 + baseX, 0, 34.67 + baseZ));
				// lineGeometry.computeLineDistances();
				// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			 // 	line = new THREE.Line( lineGeometry, lineMaterial );
				// scene.add(line);

				// var lineGeometry = new THREE.Geometry();
				// var vertArray = lineGeometry.vertices;
				// vertArray.push( new THREE.Vector3(90.96 + baseX, 0, 34.67 + baseZ), new THREE.Vector3(45.47 + baseX, 0, 22.73 + baseZ));
				// lineGeometry.computeLineDistances();
				// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			 // 	line = new THREE.Line( lineGeometry, lineMaterial );
				// scene.add(line);

				// var lineGeometry = new THREE.Geometry();
				// var vertArray = lineGeometry.vertices;
				// vertArray.push( new THREE.Vector3(45.47 + baseX, 0, 22.73 + baseZ), new THREE.Vector3(20.07 + baseX, 0, 62.30 + baseZ));
				// lineGeometry.computeLineDistances();
				// var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			 // 	line = new THREE.Line( lineGeometry, lineMaterial );
				// scene.add(line);

			// 	var lineGeometry = new THREE.Geometry();
			// 	var vertArray = lineGeometry.vertices;
			// 	vertArray.push( new THREE.Vector3(20.07 + baseX, 0, 62.30 + baseZ), new THREE.Vector3(49.85 + baseX, 0, 88.69 + baseZ));
			// 	lineGeometry.computeLineDistances();
			// 	var lineMaterial = new THREE.LineBasicMaterial( { color: 0xcc0000 } );
			//  	line = new THREE.Line( lineGeometry, lineMaterial );
			// 	scene.add(line);

			// 	baseX += 49.85;
			// 	baseZ += 88.69;
			// }

			


