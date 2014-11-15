(function(win){

	var context={};


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

	context["onRender"]=function onInit(gl,gl_renderer,gl_scene,gl_camera){};

        context['render']=function(gl_renderer,gl_scene, gl_camera) {
			    
                gl_renderer.render(gl_scene, gl_camera);
        };   

	context['renderElementById']=function(el_id) {
			    var gl=document.getElementById(el_id);
                var gl_renderer = context.createRenderer(gl);
                var gl_scene =context.createScene(gl,gl_renderer);


		var gl_camera=context.createCamera(gl,gl_renderer,gl_scene);

		context.onRender(gl,gl_renderer,gl_scene,gl_camera);
                //gl_scene.add(gl_camera);
                context.render(gl_scene, gl_camera);
            }
            
 

   THREE.Context=context;

	console.log("overwrite methods:");
    var mtprefix="THREE.Context";
	console.log(mtprefix+'.createRenderer=function(%s){};',"gl");
	console.log(mtprefix+'.createScene=function(%s,%s){};',"gl","gl_renderer");
	console.log(mtprefix+'.createCamera=function(%s,%s,%s){};',"gl","gl_renderer","gl_scene");
	console.log(mtprefix+'.onRender=function(%s,%s,%s,%s){};',"gl","gl_renderer","gl_scene","gl_camera");
        console.log(mtprefix+'.render=function(%s,%s,%s){};',"gl_renderer","gl_scene","gl_camera");
    console.log("enter method: ");
     console.log(mtprefix+'.renderElementById(%s);',"elid");
})(window);
