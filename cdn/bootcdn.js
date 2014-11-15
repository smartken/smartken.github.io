

(function(win){

    var doc=window.document;
    
    var bootcdn={};
    
    var base="http://cdn.bootcss.com";
    
    bootcdn["base"]=base;
    
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
    
    bootcdn["importScript"]=importScript;
    bootcdn["importStyle"]=importStyle;
    
    bootcdn["importJquery"]=function(version){
         version=version||"2.1.1";
         importScript("/jquery/"+version+"/jquery.min.js");
    };
    
    bootcdn["importJqueryui"]=function(version){
         version=version||"1.11.2";
         importStyle("/jqueryui/"+version+"/jquery-ui.min.css");
         importScript("/jqueryui/"+version+"/jquery-ui.min.js");
         
    };
    //yui/yui/yui-min.js
    bootcdn["importYui"]=function(version){
         version=version||"3.18.0/";
         importScript("/yui/"+version+"/yui/yui-min.js");
    };
    
    bootcdn["importBootstrap"]=function(version){
         version=version||"3.3.0";
         importStyle("/bootstrap/"+version+"/css/bootstrap.min.css");
         importScript("/bootstrap/"+version+"/js/bootstrap.min.js");
         
    };
    
     bootcdn["importKnockout"]=function(version){  
         version=version||"3.2.0";
         importScript("/knockout/"+version+"/knockout-min.js");
    };
    
    bootcdn["importD3"]=function(version){  
         version=version||"3.4.13";
         importScript("/d3/"+version+"/d3.min.js");
    };
    
    bootcdn["importThreejs"]=function(version){  
         version=version||"r69";
         importScript("/three.js/"+version+"/three.min.js");
    };
    
    bootcdn["importDatejs"]=function(version){  
         version=version||"1.0";
         importScript("/datejs/"+version+"/date.min.js");
    };
    
    bootcdn["importJsurl"]=function(version){  
         version=version||"1.8.4";
         importScript("/js-url/"+version+"/url.min.js");
    };
    
    
    bootcdn["importLinq"]=function(version){  
         version=version||"2.2.0.2";
         importScript("/linq.js/"+version+"/jquery.linq.min.js");
    };
  
    bootcdn["importRequirejs"]=fucntion(version){
        version=version||"2.1.15";
         importScript("/require.js/"+version+"/require.min.js");
    }
    
    win['Bootcdn']=bootcdn;
  
})(window);
