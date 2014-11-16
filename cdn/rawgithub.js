(function(win){



 var doc=window.document;
    
    var cdn={};
    
    var base="http://rawgithub.com";
    
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

    cdn["importMetro"]=function(version){
         writeStyle("/olton/Metro-UI-CSS/master/min/metro-bootstrap.min.css");
          writeStyle("/olton/Metro-UI-CSS/master/min/iconFont.min.css");
    };
    
   
    win["Rawgithub"]=cdn;
    

})(window);
