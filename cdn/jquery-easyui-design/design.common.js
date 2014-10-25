var _tag="input",easyui_base="../jquery-easyui-1.3.5";

function importScript(src){
     document.write("<script type='text/javascript' src='"+src+"'><"+"/script>");
}

function importStyle(href){
     document.write("<link rel='stylesheet' type='text/css' href='"+href+"' />");
}

function importUI(){
    importStyle(easyui_base+"/themes/default/easyui.css");
	importStyle(easyui_base+"/themes/icon.css");
	importScript(easyui_base+"/jquery.easyui.min.js");
}

function importAll(){
    importStyle("design.common.css");
    importStyle(easyui_base+"/themes/default/easyui.css");
	importStyle(easyui_base+"/themes/icon.css");
	importScript(easyui_base+"/jquery.min.js");
	importScript(easyui_base+"/jquery.easyui.min.js");
}

function genJsContext(method){
	var el=_tag=="input"?"input[name=]":"#";
	var context="$('"+el+"')."+method+"({ ";
	$("#form-ui").find("input,textarea").each(function(index){
		var name=$(this).attr("name");
		if(!name)return true;
		var val=$(this).val();
		if(!val||val=="")return true;
		var prev=$(this).prev();
		if(prev&&prev.hasClass("numberbox-f")){
			context+= "\n"+ name+":"+val+",";	
		}
        else if($(this).attr("type")=="checkbox"){
            context+= "\n"+ name+":"+val+",";
        }
        else if($(this).hasClass("obj")){
            context+= "\n"+ name+":"+val+",";
        }
        else{
			context+= "\n"+ name+":'"+val+"',";
		}



	});

    if(_method=="datagrid"){
        var jarrColumn=$("#table-datagrid-columns").datagrid("getData");
        var forzeHeader="frozenColumn:[",header="columns:[",toolbar="toolbar:[";
        $.each(jarrColumn["rows"],function(index,item){
            var el="{"+genDatagridColumnJsContext(item)+"}";
            if(item["forze"]=="true"){
                forzeHeader+=el+"\n";
            }else{
                header+=el+"\n";
            }
        });
        header+="]";
        forzeHeader+="]";
        context+=forzeHeader+",\n"+header+",\n";
        var jarrToolbar=$("#table-datagrid-toolbar").datagrid("getData");
        $.each(jarrToolbar["rows"],function(index,item){
            var el="{"+genDatagridToolbarJsContext(item)+"}";
            toolbar+=el+"\n";
        });
        toolbar+="]";
        context+=toolbar+",";
    }
	context=context.substr(0,context.length-1);
	context+="\n} ) ;// end $('')."+method;
	
	return context;
}

function genHtmlContext(method){
	var tagEnd=_tag=="input"?"/>":"></"+_tag+">";
	var context="<" +_tag+"  name=\"\" class=\"easyui-"+method+"\" style=\"\" \n data-options=\" ";
	if(_method=="datagrid"){
      context+="toolbar:'#div-tb',";
    }

    $("#form-ui").find("input,textarea").each(function(index){
		var name=$(this).attr("name");
		if(!name)return true;
		var val=$(this).val();
		if(!val||val=="")return true;
		var prev=$(this).prev();
		if(prev&&prev.hasClass("numberbox-f")){
			context+=  name+":"+val+",";	
		}else if($(this).attr("type")=="checkbox"){
			context+=  name+":"+val+",";
		}else if($(this).hasClass("obj")){
            context+=  name+":"+val+",";
        }
        else{
			context+=  name+":'"+val+"',";
		}
		
	});

	context=context.substr(0,context.length-1);
    if(_tag=="input"){
        context+="\" />";
    }
    else {
        context+="\" >";
        switch (_method) {
            case "datagrid":{

                var jarrColumn=$("#table-datagrid-columns").datagrid("getData");
                var forzeHeader="<thead data-options=\"frozen:true\">\n",header="<thead>\n";
                $.each(jarrColumn["rows"],function(index,item){
                    var el="<th data-options=\""+genDatagridColumnJsContext(item)+"\"></th>";
                    if(item["forze"]=="true"){
                        forzeHeader+=el+"\n";
                    }else{
                        header+=el+"\n";
                    }
                 });
                header+="</thead>";
                forzeHeader+="</thead>";
                context+=forzeHeader+"\n"+header;
                 break;
            }
            case "layout":{
                context+="\n";
                var regions= ["north","south","west","east","center"];
                for(var i =0;i<regions.length; i++){
                    var r=regions[i];
                    var isExist="checked"==$("#"+r).attr("checked");
                    if(!isExist)return;
                    var obj={region:r};
                    $("#fieldset-"+r).find("input").each(function(index){
                         var name=$(this).attr("name");
                         if(!name)return true;
                         obj[name]=$(this).val();
                    });
                    var el="<div data-options=\""+genLayoutJsContext(obj)+"\" style=\"\" ></div>" ;
                    context+=el+"\n";
                }
                break;
            }
            default : {break;}
        }
        if(_tag=="a"){

            context+=$("input[name=text]").val();
        }
        context+="</"+_tag+">";
        if(_method=="datagrid"){
            var toolbar="<div id=\"div-tb\">";
            var jarrToolbar=$("#table-datagrid-toolbar").datagrid("getData");
            $.each(jarrToolbar["rows"],function(index,item){
                var el="<a class=\"easyui-linkbutton\" data-options=\""+genDatagridToolbarJsContext(item)+"\"></a>";
                toolbar+=el+"\n";
            });
            toolbar+="</div>";
            context+=toolbar+"";
        }
    }

	return context;
}

/*
 <thead data-options="frozen:true">

 <th data-options="field:'title',width:100,editor:{type:'text'}">title</th>
 <th data-options="field:'field',width:100,editor:{type:'text'}">field</th>
 <th data-options="field:'width',width:50,editor:{type:'numberbox',options:{min:1}}">width</th>
 </thead>
 <thead>

 <th data-options="field:'frozen',width:60,editor:design['editor']['ind']">frozen</th>
 <th data-options="field:'rowspan',width:50,editor:{type:'numberbox',options:{min:1}}">rowspan</th>
 <th data-options="field:'colspan',width:50,editor:{type:'numberbox',options:{min:1}}">colspan</th>
 <th data-options="field:'align',width:80,formatter:iconRowFormatter,editor:{type:'combobox',options:{data:[{text:'',value:''},{text:'left',value:'left'},{text:'center',value:'center'},{text:'right',value:'right'}]},editable:false}">align</th>
 <th data-options="field:'halign',width:80,formatter:iconRowFormatter,editor:{type:'combobox',options:{data:[{text:'',value:''},{text:'left',value:'left'},{text:'center',value:'center'},{text:'right',value:'right'}]},editable:false}">halign</th>
 <th data-options="field:'sortable',width:60,editor:design['editor']['ind']">sortable</th>
 <th data-options="field:'order',width:60,formatter:iconRowFormatter,editor:{type:'combobox',options:{data:[{text:'',value:''},{text:'asc',value:'asc'},{text:'desc',value:'desc'}]},editable:false}">order</th>
 <th data-options="field:'resizable',width:60,editor:design['editor']['ind']">resizable</th>
 <th data-options="field:'hidden',width:60,editor:design['editor']['ind']">hidden</th>
 <th data-options="field:'checkbox',width:60,editor:design['editor']['ind']">checkbox</th>
 <th data-options="field:'formatter',width:180,editor:{type:'textarea'}">formatter</th>
 <th data-options="field:'styler',width:180,editor:{type:'textarea'}">styler</th>
 <th data-options="field:'sorter',width:180,editor:{type:'textarea'}">sorter</th>
 <th data-options="field:'editor',width:180,editor:{type:'textarea'}">editor</th>
 </thead>
 */



function genDatagridColumnJsContext(obj){
    var isStr={title:true,field:true,width:false,frozen:false,rowspan:false,colspan:false,align:true,halign:true
    ,sortable:false,order:true,resizable:false,hidden:false,checkbox:false,formatter:false,styler:false,sorter:false,editor:false
    };
    var context=" ";
    for(var key in obj){
        var val=obj[key]||"";
        if(val=="")continue;
        if(isStr[key]){
            context+=key+":'"+val+"',";
        }else{
            context+=key+":"+val+",";
        }
    }
    context=context.substr(0,context.length-1);
    return context;
}

function genDatagridToolbarJsContext(obj){
    var isStr={text:true,iconCls:true,handle:false,title:true};
    var context=" ";
   // obj["title"]=obj["text"];
    for(var key in obj){
        var val=obj[key]||"";
        if(val=="")continue;
        if(isStr[key]){
            context+=key+":'"+val+"',";
        }else{
            context+=key+":"+val+",";
        }
    }
    context=context.substr(0,context.length-1);
    return context;
}

function genLayoutJsContext(obj){
    var isStr={split:true,iconCls:true,title:true,border:false,href:true,region:true};
    var context=" ";
    // obj["title"]=obj["text"];
    for(var key in obj){
        var val=obj[key]||"";
        if(val=="")continue;
        if(isStr[key]){
            context+=key+":'"+val+"',";
        }else{
            context+=key+":"+val+",";
        }
    }
    context=context.substr(0,context.length-1);
    return context;
}
function openPreviewWindow(method){
	var div =$("<div></div>");
	var html=genHtmlContext(method),js=genJsContext(method);
	var context="<div class='easyui-layout' data-options=\"fit:true\">";
	context+="<div data-options=\"region:'center',title:'preview'\"  ><div style=\"padding:20px\">"+html+"</div></div>";
	context+="<div data-options=\"region:'west',title:'js code',split:true\" style=\"width:360px\" ><textarea style=\"width:98%;height:97%\" readonly='readonly'>"+js+"</textarea></div>";
	context+="<div data-options=\"region:'south',title:'html code',split:true\" style=\"height:180px\" ><textarea style=\"width:98%;height:98%\" readonly='readonly' >"+html+"</textarea></div>";
	context+="</div>";
	div.window({
		title:"preview "+ method,
		minimizable:false,
	    maximizable:false,
	    collapsible:false,
		maximized:true,
		content:context,
		modal:true
	});
}

var design={};




design["menu"]={};


design["menu"]["tree"]=[
    {
        id:210,text:"base",children:[
        {id:"411",text:"pagination",attributes:{url:"base.pagination.html"}}

    ]
    },
         {id:310,text:"form",children:[
                                          {id:"312",text:"validatebox",attributes:{url:"form.validatebox.html"}}
                                          ,{id:"311",text:"numberbox",attributes:{url:"form.numberbox.html"}}
                                          ,{id:"312",text:"numberspinner",attributes:{url:"form.numberspinner.html"}}
                                          ,{id:"315",text:"slider",attributes:{url:"form.slider.html"}}
                                      //   ,{id:"313",text:"combob",attributes:{url:"form.combo.html"}}
                                         ,{id:"314",text:"combobox",attributes:{url:"form.combobox.html"}}
                                         ,{id:"315",text:"combotree",attributes:{url:"form.combotree.html"}}
                                         ,{id:"316",text:"calendar",attributes:{url:"form.calendar.html"}}
             ,{id:"317",text:"datebox",attributes:{url:"form.datebox.html"}}
             ,{id:"318",text:"datetimebox",attributes:{url:"form.datetimebox.html"}}

             ]
         },{
           id:410,text:"data",children:[
                     {id:"411",text:"datagrid",attributes:{url:"data.datagrid.html"}}
                     ,{id:"412",text:"tree",attributes:{url:"data.tree.html"}}
                     ,{id:"413",text:"treegrid",attributes:{url:"data.treegrid.html"}}
                 ]
             }
    ,{
        id:510,text:"layout",children:[
            {id:"511",text:"panel",attributes:{url:"layout.panel.html"}}
            ,{id:"512",text:"layout",attributes:{url:"layout.layout.html"}}
            ,{id:"513",text:"tab",attributes:{url:"layout.tab.html"}}
        ]
    }
    ,{
        id:610,text:"window",children:[
            {id:"611",text:"messager",attributes:{url:"window.messager.html"}}
            ,{id:"612",text:"window",attributes:{url:"window.window.html"}}
            ,{id:"613",text:"dialog",attributes:{url:"window.dialog.html"}}
        ]
    }
    ,{
        id:710,text:"button",children:[
            {id:"711",text:"linkbutton",attributes:{url:"button.linkbutton.html"}}

        ]
    }
    ];   //easyui

design["editor"]={};
design["editor"]["ind"]= {type:"combobox",options:{data:[{text:'true',value:'true'},{text:'false',value:'false'}],editable:false}};

design["regions"]=["north","south","center","west","east"];

design["iconClss"]=[{text:"",value:""},{text:"icon-blank",value:"icon-blank"}

    ,{text:"icon-add",value:"icon-add"}
    ,{text:"icon-edit",value:"icon-edit"}
    ,{text:"icon-remove",value:"icon-remove"}
    ,{text:"icon-save",value:"icon-save"}
    ,{text:"icon-cut",value:"icon-cut"}
    ,{text:"icon-ok",value:"icon-ok"}
    ,{text:"icon-no",value:"icon-no"}
    ,{text:"icon-cancel",value:"icon-cancel"}
    ,{text:"icon-reload",value:"icon-reload"}
    ,{text:"icon-search",value:"icon-search"}
    ,{text:"icon-print",value:"icon-print"}
    ,{text:"icon-help",value:"icon-help"}
    ,{text:"icon-undo",value:"icon-undo"}
    ,{text:"icon-redo",value:"icon-redo"}
    ,{text:"icon-back",value:"icon-back"}
    ,{text:"icon-sum",value:"icon-sum"}
    ,{text:"icon-tip",value:"icon-tip"}
    ,{text:"icon-mini-add",value:"icon-mini-add"}
    ,{text:"icon-mini-edit",value:"icon-mini-edit"}
    ,{text:"icon-mini-refresh",value:"icon-mini-refresh"}


];


function iconComboFormatter(row){
        return "<a style='width:16px' class=\""+row["value"]+"\">"+row["text"]+"</a>";
}
function iconRowFormatter(value,row,index){
    return "<a ' class=\""+value+" icon16\">"+value+"</a>";
}
/*

 */