(function(win){

	var context={},_gl_renderer,_gl_scene,_gl_camera;


	context["createRenderer"]=function(gl){
         return new THREE.WebGLRenderer({
                    canvas: gl
                });
	};
	


	context["createScene"]=function(gl,gl_renderer){ return new THREE.Scene(); };

	context["createCamera"]=function(gl,gl_renderer,gl_scene){

		          var  gl_camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
					gl_camera.position.set(0, 0, 5);
					gl_camera.lookAt(new THREE.Vector3(0, 0, 0));
		          return gl_camera;

	};

	context["onPreRender"]=function onInit(gl,gl_renderer,gl_scene,gl_camera){};

        context["onRender"]=function (gl_renderer,gl_scene,gl_camera){};

        context['render']=function() {
        	context.onRender(_gl_renderer,_gl_scene,_gl_camera);
                _gl_renderer.render(_gl_scene, _gl_camera);
        };   

	context['renderElementById']=function(el_id) {
			    var gl=document.getElementById(el_id);
                _gl_renderer = context.createRenderer(gl);
                _gl_scene =context.createScene(gl,_gl_renderer);


		_gl_camera=context.createCamera(gl,_gl_renderer,_gl_scene);

		context.onPreRender(gl,_gl_renderer,_gl_scene,_gl_camera);
                //gl_scene.add(gl_camera);
               
                context.render(_gl_renderer,_gl_scene,_gl_camera);
            }
            
 

   THREE.Context=context;

	console.log("overwrite methods:");
    var mtprefix="THREE.Context";
	console.log(mtprefix+'.createRenderer=function(%s){};',"gl");
	console.log(mtprefix+'.createScene=function(%s,%s){};',"gl","gl_renderer");
	console.log(mtprefix+'.createCamera=function(%s,%s,%s){};',"gl","gl_renderer","gl_scene");
	console.log(mtprefix+'.onPreRender=function(%s,%s,%s,%s){};',"gl","gl_renderer","gl_scene","gl_camera");
	console.log(mtprefix+'.onRender=function(%s,%s,%s){};',"gl_renderer","gl_scene","gl_camera");
    console.log("public methods: ");
     console.log(mtprefix+'.renderElementById(%s);',"elid");
     console.log(mtprefix+'.render();');
})(window);
