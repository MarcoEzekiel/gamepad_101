
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

			}