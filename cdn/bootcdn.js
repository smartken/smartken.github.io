

(function(win){

    var doc=window.document;
    
    var bootcdn={};
    
    var base="http://cdn.bootcss.com";
    
    bootcdn["base"]=base;
    
    var writeScript=function(src){
         doc.write("<script type='text/javascript' src=\""+src+"\" ><"+"/script>");
    }
    
    var writeStyle=function(href){
         doc.write("<link rel=\"stylesheet\" type=\"text/css\"  href=\""+href+"\" />");
    }
    
    bootcdn["importJquery"]=function(version){
         version=version||"2.1.1";
         writeScript(base+"/jquery/"+version+"/jquery.min.js");
    }
    
    bootcdn["importJqueryui"]=function(version){
         version=version||"1.11.2";
         writeScript(base+"/jqueryui/"+version+"/jquery-ui.min.js");
         writeStyle(base+"/jqueryui/"+version+"/jquery-ui.min.css")
    }
    
    bootcdn["importBootstrap"]=function(version){
         version=version||"3.3.0";
         writeScript(base+"/bootstrap/"+version+"/js/bootstrap.min.js");
         writeStyle(base+"/bootstrap/"+version+"/css/bootstrap.min.css")
    }
    
     bootcdn["importKnockout"]=function(version){  
         version=version||"3.2.0";
         writeScript(base+"/knockout/"+version+"/knockout-min.js");
    }
    
    bootcdn["importD3"]=function(version){  
         version=version||"3.4.13";
         writeScript(base+"/d3/"+version+"/d3.min.js");
    }
    
    bootcdn["importThree"]=function(version){  
         version=version||"r69";
         writeScript(base+"/three.js/"+version+"/three.min.js");
    }
    
    win['Bootcdn']=bootcdn;
  
})(window);
