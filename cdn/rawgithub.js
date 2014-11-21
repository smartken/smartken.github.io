(function(win){



 var doc=window.document;
    
    var cdn={};
    
    var base="http://cdn.rawgit.com";
    
    cdn["base"]=base;
    
    var writeScript=function(src){
         doc.write("<script type='text/javascript' src=\""+src+"\" ><"+"/script>");
    };
    
    var writeStyle=function(href){
         doc.write("<link rel=\"stylesheet\" type=\"text/css\"  href=\""+href+"\" />");
    };
    
    var importScript=function(src){
         writeScript(base+src);
    };
    
    var importStyle=function(href){
         writeStyle(base+href);
    };
    
     cdn["importScript"]=importScript;
    cdn["importStyle"]=importStyle;

    cdn["importMetroUI"]=function(version){
         importStyle("/olton/Metro-UI-CSS/master/min/metro-bootstrap.min.css");
          importStyle("/olton/Metro-UI-CSS/master/min/iconFont.min.css");
    };
    
   
    cdn["importJqueryui_bootstrap"]=function(version){
       version=version||"1.10.3.theme";
       importStyle("/jquery-ui-bootstrap/jquery-ui-bootstrap/masterbs3/css/custom-theme/jquery-ui-"+version+".css");
    }
   
    //persistencejs
    cdn["importPersistencejs"]=function(plugins){
       //version=version||"1.10.3.theme";
       var prefix="persistence";
       importScript("/coresmart/persistencejs/master/lib/"+prefix+".js");
       for(var plugin in plugins){
        importScript("/coresmart/persistencejs/master/lib/"+prefix+"."+plugin+".js");
       }
    }
    
   
    win["Rawgithub"]=cdn;
    

})(window);
