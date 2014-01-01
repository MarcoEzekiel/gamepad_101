Mountains = function(){

	this.hill = function(terrainWidthInSegments,terrainDepthInSegments, Xseg, Zseg){


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
			for(var j = 0; j <= terrainDepthInSegments; j++{

				if(i == Xseg -5){
					switch(j){
						case 7 + Zseg:
						 	yPlus = 1;
						 	break;
						case 8 + Zseg: 
							yPlus = 2;
							break;
						default:
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
						default:
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
						default:
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
						default:
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
						case 6 + Zseg:
						 	yPlus = 1;
						 	break;
						default:
							break;
					}				
				}

				this.mtPts[i][j]= yPlus;
			}
		}
	}
}