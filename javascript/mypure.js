    var gl;
    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        //colors
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    }


    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }


    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length == 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }


    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


    var triangleVertexPositionBuffer;
    var triangleVertexColorBuffer;
    var squareVertexPositionBuffer;
    var squareVertexColorBuffer;

    // var triangleVertexPositionBuffer;
    // var squareVertexPositionBuffer;
    var hexVertexPositionBuffer;

    var hexVertexPurpleBuffer;
    var hexVertexRedBuffer;
    var hexVertexRandColorBuffer;

    var vertices = [];

    var randomNumber;

    function hexBuffer(){
            var vtcs = [];
            var hexVPB = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, hexVPB);
            // hex vericies with radius of 1
            for (var i = 1; i <=7; i ++){

                        x = 1 * Math.cos(2 * Math.PI * i / 6).toFixed(6);
                        y = 1 * Math.sin(2 * Math.PI * i / 6).toFixed(6); 
                        
                        vtcs.push(x);
                        vtcs.push(y);
                        vtcs.push(0);
            }

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            hexVPB.itemSize = 3;
            hexVPB.numItems = 7;

            return hexVPB;
    }

    var hexPosBuffer;
    function initBuffers() {

        hexPosBuffer = new hexBuffer();

        vertices = [];    
        hexVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, hexVertexPositionBuffer);
        // hex vericies with radius of 1
        for (var i = 1; i <=7; i ++){

                    x = 1 * Math.cos(2 * Math.PI * i / 6).toFixed(6);
                    y = 1 * Math.sin(2 * Math.PI * i / 6).toFixed(6); 
                    
                    vertices.push(x);
                    vertices.push(y);
                    vertices.push(0);
        }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        hexVertexPositionBuffer.itemSize = 3;
        hexVertexPositionBuffer.numItems = 7;

        //purple buffer
        hexVertexPurpleBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, hexVertexPurpleBuffer);
        purple = [];

        for (var i=1; i <= 7; i++) {
            purple = purple.concat([0.5, 0.0, 1.0, 1.0]);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(purple), gl.STATIC_DRAW);
        hexVertexPurpleBuffer.itemSize = 4;
        hexVertexPurpleBuffer.numItems = 7;

        reds =[];
        // redbuffer
        hexVertexRedBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, hexVertexRedBuffer);

        for (var i=1; i <= 7; i++) {
            reds = reds.concat([1.0, 0.0, 0.0, 1.0]);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(reds), gl.STATIC_DRAW);
        hexVertexRedBuffer.itemSize = 4;
        hexVertexRedBuffer.numItems = 7;


        colors =[];
        // redbuffer
        hexVertexRandColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, hexVertexRandColorBuffer);

        for (var i=1; i <= 7; i++) {
            colors = colors.concat([randNum(), randNum(), randNum(), 1.0]);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        hexVertexRandColorBuffer.itemSize = 4;
        hexVertexRandColorBuffer.numItems = 7;
    }

    function randNum(){return Math.floor(Math.random()*11) / 10;}

    var rHex =0;

    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        var hex1 = function(x,y,z, colorBuffer){
            //hpb = new initBuffers.hexBuffer();

            mat4.translate(mvMatrix, [x,y,z]);

            mvPushMatrix();
            mat4.rotate(mvMatrix, degToRad(rHex), [0, 1, 0]);

            mat4.scale(mvMatrix, [0.1,0.1,0.1]);
            gl.bindBuffer(gl.ARRAY_BUFFER, hexVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, hexVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
            

            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

            setMatrixUniforms();
            gl.drawArrays(gl.LINE_STRIP, 0, hexVertexPositionBuffer.numItems);
            mvPopMatrix();
        }
        hex1(0.0, 0.0, -2.0, hexVertexRandColorBuffer);

    }

    var lastTime = 0;

    function animate() {
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;

            rHex += (90 * elapsed) / 1000.0;
        }
        lastTime = timeNow;
    }


    function tick() {
        requestAnimFrame(tick);
        drawScene();
        animate();
    }

    function webGLStart() {
        var canvas = document.getElementById("canvas");
        initGL(canvas);
        initShaders();
        initBuffers();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        tick();
        //drawScene();
    }

