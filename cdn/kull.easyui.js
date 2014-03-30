
String.prototype.messager=function(handler){
    try{
      
       var json=eval('('+this+')');
       json=json["map"];
       var msg=json["msg"]||"";
	   var title=json["title"]||"操作结果";
	   var icon=json["icon"]||"info";
	   var action=json["action"]||"show";
	   var result=false;
	   if(action=="show"){
		   $.messager.show({title:title
			                ,msg:msg
			                ,timeout:5000
			                ,showType:"slide"
			                ,showSpeed:500
		   });
	   }else if(action=="alert"){
		   $.messager.alert(title,msg,icon,handler==null?function(){ return true;}:handler);
	   }else if(action=="confirm"){
		   $.messager.confirm(title,msg,handler==null?function(y){ return y;}:handler);
	   }else if(action=="prompt"){
		   $.messager.prompt(title,msg,handler==null?function(val){return val;}:handler);
	   }
    }catch(ex){
    	alert(ex);
    	$.messager.alert("Format error","The result is not a Messager format");
    }	 
};

$.extend($.fn.validatebox.defaults.rules, {

    minLength: {
                validator: function(value, param){
                              return value.length >= param[0];},
                message: 'Please enter at least {0} characters.'
    }  //minLength: {
   ,idCard:{
	   	        validator:function(value,param){
	                   return value.isIdNoFormat(); 
	            }
                ,message: '身份证格式错误'
   }
   ,zip:{
	   	        validator:function(value,param){
	                   return value.isZipCode(); 
	            }
                ,message: '邮政编码格式错误'
   }
   ,phone:{
	   	        validator:function(value,param){
	                   return value.isPhoneFormat(); 
	            }
                ,message: '电话号码格式错误'
   }
    ,mobile:{
	   	        validator:function(value,param){
	                   return value.isMobileFormat(); 
	            }
                ,message: '手机号码格式错误'
   }
      ,Chinese:{
	   	        validator:function(value,param){
	                   return value.isChinese(); 
	            }
                ,message: '只能是中文'
   }
    ,five:{
	   	      validator:function(value,param){
	                   return value.isFive(); 
	            }
                ,message: '输入格式错误'
   }
     ,carno:{
	   	      validator:function(value,param){
	                   return value.carNo(); 
	            }
                ,message: '车牌输入格式错误'
   }
     ,ip:{
	   	      validator:function(value,param){
	                   return value.ip(); 
	            }
                ,message: 'IP输入格式错误'
   }

});   //$.extend($.fn.validatebox.defaults.rules, {

$.extend($.fn.datagrid.methods, { 
	
	getAllColumnFields:function(jq,opt){
		var fields=jq.datagrid("getColumnFields",true);
		var fields_s=jq.datagrid("getColumnFields",false);
		//for(var i=0;i<fields.length;i++){
		//	var f=_datagrid.datagrid("getColumnOption",fields[i]);
		
		//var fields=opts["columns"][0];
		for(var i=0;i<fields_s.length;i++){
			fields.push(fields_s[i]);
		}
		return fields;
	}
	,
	getAllColumnOptions:function(jq,opt){
		var copts=[];
		var fields=jq.datagrid("getAllColumnFields");
		
		for(var i=0;i<fields.length;i++){
			var copt=jq.datagrid("getColumnOption",fields[i]);
			copts.push(copt);
		}
		return copts;
	}
	
});

$.extend($.fn.dialog.methods, {  
    initEditForm: function(jq, opt){
    	var el=opt["el"];
    	var _datagrid=typeof el =="string"?$(el):el;
    	var surl=opt["surl"];
    	var rurl=opt["rurl"];
    	var opts=_datagrid.datagrid("options");
    	//var formID="form-"+el.attr("id");
    	var form=$("<form method='post' ></form>");
    	//form.attr("id",formID);
    	var table=$("<table></table>");
    	
		
    	return jq.each(function(){  
    		var _this=$(this);
    		_this.append(form);
    		form.append(table);
    		 
    		/*var fields=_datagrid.datagrid("getColumnFields",true);
    		var fields_s=_datagrid.datagrid("getColumnFields",false);
    		//for(var i=0;i<fields.length;i++){
    		//	var f=_datagrid.datagrid("getColumnOption",fields[i]);
    		
    		//var fields=opts["columns"][0];
    		for(var i=0;i<fields_s.length;i++){
    			fields.push(fields_s[i]);
    		}*/
    		var fields=_datagrid.datagrid("getAllColumnOptions",true);
    		for(var i=0;i<fields.length;i++){
    			//var field=_datagrid.datagrid("getColumnOption",fields[i]);
    			var field=fields[i];
    			if(!field["editor"])continue;
    			
    			var tr=$("<tr></tr>");
    			var th=$("<th></th>");
    			var td=$("<td></td>");
    			//td.css("width","280px");
    			var input=$("<input />");
    			input.attr("name",field["field"])
    			.attr("autocomplete","off");
    			
    			th.append(field["title"]);
    			td.append(input);
    			tr.append(th).append(td);
    			table.append(tr);
    			
    			var editor=field["editor"];
    			if(typeof editor == "string"){
    				input.validatebox(); 
    			}else if(typeof editor == "object"){
    				var etype=editor["type"];
    				var eoptions=editor["options"];
    				switch (etype) {

                    case "validatebox": { input.validatebox(eoptions); break; }

                    case "numberbox": { input.numberbox(eoptions); break; }
                    case "numberspinner": { input.numberspinner(eoptions); break; }
                    case "combobox": { input.combobox(eoptions); break; }
                    case "datebox": { input.datebox(eoptions); break; }
                    case "datetimebox": { input.datetimebox(eoptions); break; }
                    case "combotree": { input.combotree(eoptions); break; }
                    case "combogrid": { input.combogrid(eoptions); break; }
                    default: input.validatebox(eoptions); break;
                   }
    			}
    		}
    		$.getJSON(rurl,{},function(json){
    			form.form("load",json);
    		});
    		
    		var btn_submit={text:"保存",iconCls:"icon-add",handler:function(){
    			form.form('submit',{
    				url:surl
    				,success:function(str){$.messager.progress("close");
    				_datagrid.datagrid("reload");
    				_datagrid.treegrid("reload");
    				                      
    				  }
    			});
    		}};
    		
    		var btn_cancel={text:"取消",iconCls:"icon-cancel",handler:function(){
    			_this.dialog("close");
    		}};
    		
    		var btn_reset={text:"重置",iconCls:"icon-reload",handler:function(){
    			if(!rurl){
    				form.form("clear");
    			}else{
    			  $.getJSON(rurl,{},function(json){
        			form.form("load",json);
        		});
    		   }
    		}};
    		
    		var btn_copy={text:"复制",iconCls:"icon-cut",handler:function(){
    			var data=form.serializeArray();
    			var json={};
    			for(var i=0;i<data.length;i++){
    				var name=data[i]["name"];
    				var value=data[i]["value"];
    				json[name]=value;
    			}
    			var str=Kull.stringify(json);
    			var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
    			textarea.val(str);
    			$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
    		}};
    		
            var btn_paste={text:"粘帖",iconCls:"icon-pencil",handler:function(){
    			var div_ps=$("<div></div>");
            	var textarea=$("<textarea id='textarea-paste' cols='100' rows='12'></textarea>");
    			div_ps.append(textarea);
            	var btn_ps={text:"粘帖",iconCls:"icon-ok",handler:function(){
    				var val=textarea.val();
    				var data=eval('('+val+')');
    				form.form("load",data);
    				div_ps.dialog("close");
    			}};
            	var btn_cl={text:"清空",iconCls:"icon-remove",handler:function(){
    				textarea.val("");
    				
    			}};
    			div_ps.dialog({title:"粘帖板",modal:true,buttons:[btn_ps,btn_cl]});
    		}};
    		_this.dialog({buttons:[btn_submit,btn_reset,btn_cancel],toolbar:[btn_copy,btn_paste]});
    		form.find("input:eq(0)").focus();
        });  
    }
    ,initSearchForm:function(jq,opt){
    	var el=opt["el"];
    	var _datagrid=typeof el =="string"?$(el):el;
    	var surl=opt["surl"];
    	var rurl=opt["rurl"];
    	var opts=_datagrid.datagrid("options");
    	//var formID="form-"+el.attr("id");
    	var form=$("<form method='post' ></form>");
    	//form.attr("id",formID);
    	var table=$("<table></table>");
    	
		
    	return jq.each(function(){  
    		var _this=$(this);
    		_this.append(form);
    		form.append(table);
    		var fields=_datagrid.datagrid("getAllColumnOptions");
    		for(var i=0;i<fields.length;i++){
    			var field=fields[i];
    			if(!field["editor"])continue;
    			
    			var tr=$("<tr></tr>");
    			var th=$("<th></th>");
    			var td=$("<td></td>");
    			//td.css("width","280px");
    			var input=$("<input />");
    			input.attr("name",field["field"]);
    			
    			
    			th.append(field["title"]);
    			td.append(input);
    			tr.append(th).append(td);
    			table.append(tr);
    			
    			var editor=field["editor"];
    			if(typeof editor == "string"){
    				input.validatebox(); 
    			}else if(typeof editor == "object"){
    				var etype=editor["type"];
    				var eoptions=editor["options"];
    				switch (etype) {

                    case "validatebox": { input.validatebox(eoptions); break; }

                    case "numberbox": { input.numberbox(eoptions); break; }
                    case "numberspinner": { input.numberspinner(eoptions); break; }
                    case "combobox": { input.combobox(eoptions); break; }
                    case "combotree": { input.combotree(eoptions); break; }
                    case "combogrid": { input.combogrid(eoptions); break; }
                    default: input.validatebox(eoptions); break;
                   }
    			}
    		}
    		$.getJSON(rurl,{},function(json){
    			form.form("load",json);
    		});
    		
    		var btn_submit={text:"查找",iconCls:"icon-add",handler:function(){
    			var data=form.serializeArray();
    			var param={};
    			for(var i=0;i<data.length;i++){
    				param[data[i]["name"]]=data[i]["value"];
    			}
    			_datagrid.datagrid({queryParams:param});
    			_datagrid.datagrid("reload");
    		}};
    		
    		var btn_cancel={text:"取消",iconCls:"icon-cancel",handler:function(){
    			_this.dialog("close");
    		}};
    		
    		var btn_reset={text:"重置",iconCls:"icon-reload",handler:function(){
    			if(!rurl){
    				form.form("clear");
    			}else{
    			  $.getJSON(rurl,{},function(json){
        			form.form("load",json);
        		});
    		   }
    		}};
    		
    		
    		_this.dialog({buttons:[btn_submit,btn_reset,btn_cancel]});
        });  
    }
    ,initEtree:function(jq,opts){
    	/*
    	 url: 'tree_data.json',  
    createUrl: ...,  
    updateUrl: ...,  
    destroyUrl: ...,  
    dndUrl: ... 
    	 */
    	var createUrl=opts["createUrl"]||"";
    	var updateUrl=opts["updateUrl"]||"";
    	var destroyUrl=opts["destroyUrl"]||"";
    	 
    	var etreeId="et";
    	var divEtree=$("<div id='"+etreeId+"'></div>");
        var btn_reload={iconCls:"icon-reload",handler:function(){
    		
    		divEtree.etree("reload");
    	}};
    	var btn_create={iconCls:"icon-add",handler:function(){
    		
    		if(createUrl==""){$.messager.alert("error","createUrl can't be null");return;};
    		divEtree.etree("create");
    	}};
        var btn_edit={iconCls:"icon-edit",handler:function(){
        	
    		if(updateUrl==""){$.messager.alert("error","updateUrl can't be null");return;};
    		divEtree.etree("edit");
    	}};
        
        var btn_destroy={iconCls:"icon-remove",handler:function(){
        	if(destroyUrl==""){$.messager.alert("error","destroyUrl can't be null");return;};
        	divEtree.etree("destroy");
    	}};
        
        
    	return jq.each(function(){
    		var _this=$(this);
    		_this.html(divEtree);
    		
    		
    		_this.dialog({toolbar:[btn_reload,btn_create,btn_edit,btn_destroy]});
    		
    		var options=_this.dialog("options");
    		var h=options["height"]-72;
    		divEtree.height(h).css("overflow-y","scroll");
    		//opts["height"]=options["height"]-200;
    		//alert(opts["height"]);
    		divEtree.etree(opts);
    	});
    }
});
 

$.extend($.fn.form.methods, { 
	
	
	
});

 
  var dialog_onMove=function(left,top){
 	     if(left<0){
            $(this).panel("move",{left:10});
    	 }
    	 if(top<0){
    		$(this).panel("move",{top:10});
    	 }
    	 var right=left+$(this).width();
    	 var buttom=top+$(this).height();
    	 var wiw=parseInt(window.innerWidth);
    	 var wih=parseInt(window.innerHeight);
    	 if(right>wiw){  
    		 var r=wiw-$(this).width()-30;
    		 $(this).panel("move",{left:r});
    	 }
    	 if(buttom>wih){  
    		  var b=wih-$(this).height()-50;
    		 $(this).panel("move",{top:b});
    	 }
 };
  
 $.fn.window.defaults.onMove=dialog_onMove;
 $.fn.dialog.defaults.onMove= dialog_onMove;
 
 $.fn.window.defaults.shadow=false;

 $.fn.form.defaults.success=function(str){$.messager.progress("close");str.messager(null);};
 $.fn.form.defaults.onSubmit=function(){ 
	                                    var pass= $(this).form("validate");
	                                    if(pass){
	                                    	$.messager.progress({msg:"请求处理中，请稍候",text:""});
	                                    }
	                                    return pass;
                                        };
 $.fn.form.defaults.onLoadError=function(){
	 $.messager.progress("close");
	 $.messager.alert("Error","Can't access to the remote site.","error");
 };
 
 
  $.fn.datagrid.defaults.fit=true;
 $.fn.datagrid.defaults.pagination=true;
 $.fn.datagrid.defaults.nowrap=false;
 $.fn.datagrid.defaults.idField="id";
 $.fn.datagrid.defaults.rownumbers=true;
 $.fn.datagrid.defaults.pageSize=50;
 $.fn.datagrid.defaults.groupFormatter=function(value,rows){return value + ' - 共' + rows.length + ' 条';};

 $.fn.treegrid.defaults.pagination=true;
 $.fn.combobox.defaults.textField = "_text";
 $.fn.combobox.defaults.valueField = "_value";
 

 $.fn.tabs.defaults.onContextMenu=function(e,title,index){
	    e.preventDefault();
	    var _self=$(this); 
	    var divMenu=$("<div></div>");
	    divMenu.insertAfter(document.body);
	    var panels=_self.tabs("tabs");
	    var this_closable=_self.tabs("getTab",index).panel("options")["closable"];
	    divMenu.menu();
	    var itemCloseThis={text:"关闭当前标签",iconCls:"icon-remove",handler:function(item){ 
	    	_self.tabs("close",index); 
	    }};
	    var itemCloseOther={text:"关闭其他标签",iconCls:"icon-remove",handler:function(item){
	    	for(var i=panels.length-1;i>=0;i--){
	    		
	    		if(i==index){continue;} 
	    		var closable=_self.tabs("getTab",i).panel("options")["closable"];
	             if(!closable)continue;
	    		_self.tabs("close",i);   
	       };
	    }};
	    var itemCloseLeft={text:"关闭左侧标签",iconCls:"icon-remove",handler:function(item){
	    	for(var i=index-1;i>=0;i--){
	    		
	    		if(i==index){break;} 
	    		var closable=_self.tabs("getTab",i).panel("options")["closable"];
	             if(!closable)continue;
	    		_self.tabs("close",i);   
	       };
	    }};
	    var itemCloseRight={text:"关闭右侧标签",iconCls:"icon-remove",handler:function(item){
	    	for(var i=panels.length-1;i>=0;i--){
	    		
	    		if(i==index){break;} 
	    		var closable=_self.tabs("getTab",i).panel("options")["closable"];
	             if(!closable)continue;
	    		_self.tabs("close",i);   
	       };
	    }};
	    
	    var itemCloseAll={text:"关闭全部标签",iconCls:"icon-remove",handler:function(item){
	    	 
	    	for(var i=panels.length-1;i>=0;i--){ 
		             var closable=_self.tabs("getTab",i).panel("options")["closable"];
		             if(!closable)continue;
		    		_self.tabs("close",i);  
		       }; 
	    	
	    }};
	    var itemCloseQuery={text:"关闭关键字标签",iconCls:"icon-search",handler:function(item){
	    	
	    	$.messager.prompt("关闭关键字标签","请输入关键字",function(text){
	    		if(text=="")return;
	    		
	    		for(var i=panels.length-1;i>=0;i--){
		    		
		    		//if(i==index){break;}   
		    		var opts=_self.tabs("getTab",i).panel("options");
		    		var title=opts["title"];
		    		if(title.indexOf(text)<0)continue;
		    		var closable=opts["closable"];
		             if(!closable)continue;
		    		_self.tabs("close",i);    
		       };
	    		
	    	});
	    	
	    }};
	    if(this_closable){
	    	divMenu.menu("appendItem",itemCloseThis);
	    }
	    
	    divMenu.menu("appendItem",itemCloseOther)
	    .menu("appendItem",itemCloseLeft)
	    .menu("appendItem",itemCloseRight) 
	    .menu("appendItem",itemCloseAll)
	    .menu("appendItem",itemCloseQuery)
	    .menu("show",{left:e.pageX,top:e.pageY }) 
	    ;
   };
   
$.fn.datagrid.defaults.onHeaderContextMenu=function(e, field){
	e.preventDefault();
	var _datagrid=$(this);
	var opts=_datagrid.datagrid("options");
	var curl=opts["curl"],rurl=opts["rurl"];
	var divMenu=$("<div></div>");
	divMenu.insertAfter(document.body);
	divMenu.menu();
	var crurl;
	if(rurl){
		crurl=rurl.replace("{id}","");
		//ururl=rurl.replace("{id}",id);
	}
	
	if(curl){
		curl=curl.replace("{id}","");
		var item_create={text:"新增",iconCls:"icon-add",handler:function(){
			$("<div></div>")
			.dialog({modal:true,width:400})
			.dialog("initEditForm",{surl:curl,rurl:crurl,el:_datagrid})
			
			;
		}};
		divMenu.menu("appendItem",item_create);
	}
	var item_sort_asc={text:"正序",iconCls:"icon-undo",handler:function(){
		
	}};
	var item_sort_desc={text:"逆序",iconCls:"icon-redo",handler:function(){
		
	}};
	var item_copy_row={text:"复制列",iconCls:"icon-cut",handler:function(){
		var data=_datagrid.datagrid("getData");
		var rows=data["rows"];
		var context="";
		for(var i=0;i<rows.length;i++){
			
			context+=rows[i][field]||"";
			context+=",";
			
		}
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		textarea.val(context);
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	}};
	var item_cols={text:"列控制",iconCls:"icon-tip"};
	divMenu.menu("appendItem",item_cols);
	item_cols=divMenu.menu("findItem","列控制");
	var fields=_datagrid.datagrid("getAllColumnOptions");
	for(var i=0;i<fields.length;i++){
		var f=fields[i];
		var isHidden=f["hidden"]&&f["hidden"]==true;
		var iconCls=isHidden?"icon-no":"icon-ok";
		var ff=f["field"],ft=f["title"];
		var hh=function(ih,fs){
			return  function(){
				if(ih){
					_datagrid.datagrid("showColumn",fs);
				}else{
					_datagrid.datagrid("hideColumn",fs);
				}
			};
		};
		var item_col={parent:item_cols.target,text:ft,iconCls:iconCls,handler:hh(isHidden,ff)};
		divMenu.menu("appendItem",item_col);
	}
	
	divMenu
	//.menu("appendItem",item_sort_asc)
	//.menu("appendItem",item_sort_desc)
	.menu("appendItem",item_copy_row)
	
	.menu("show",{left:e.pageX,top:e.pageY })
	;
};

$.fn.datagrid.defaults.onRowContextMenu	=function(e, rowIndex, rowData){
	e.preventDefault();
	var _datagrid=$(this);
	var opts=_datagrid.datagrid("options");
	var curl=opts["curl"],rurl=opts["rurl"],durl=opts["durl"],uurl=opts["uurl"];
	var toolbar=opts["toolbar"],items=[];
	if(typeof toolbar == "string"){
		$(toolbar).find("a.l-btn").each(function(index,item){
			var _self=$(this);
			var dos=_self.attr("data-options");
			dos=eval('({'+dos+'})');
			var item={};
			item["text"]=_self.text();
			item["iconCls"]=dos["iconCls"];
			item["handler"]=function(){_self.click();};
			items.push(item);
		});
	}else{
		items=toolbar;
	}
	var divMenu=$("<div></div>");
	divMenu.insertAfter(document.body);
	divMenu.menu();
	for(var i=0;i<items.length;i++){
		divMenu.menu("appendItem",items[i]);
	}
	var item_search={text:"查找",iconCls:"icon-search",handler:function(){
		$("<div></div>")
		.dialog({modal:true,width:400})
		.dialog("initSearchForm",{el:_datagrid})
		
		;
	}};
	divMenu.menu("appendItem",item_search);
	var id=rowData[opts["idField"]];
	var crurl,ururl;
	if(rurl){
		crurl=rurl.replace("{id}","");
		ururl=rurl.replace("{id}",id);
	}
	
	if(curl){
		curl=curl.replace("{id}","");
		var item_create={text:"新增",iconCls:"icon-add",handler:function(){
			$("<div></div>")
			.dialog({modal:true,width:400})
			.dialog("initEditForm",{surl:curl,rurl:crurl,el:_datagrid})
			
			;
		}};
		divMenu.menu("appendItem",item_create);
	}
	
	if(uurl){
		uurl=uurl.replace("{id}",id);
		var item_update={text:"修改",iconCls:"icon-edit",handler:function(){
			$("<div></div>")
			.dialog({modal:true,width:400})
			.dialog("initEditForm",{surl:uurl,rurl:ururl,el:_datagrid})
			
			;
		}};
		divMenu.menu("appendItem",item_update);
	}
	
	if(durl){
		durl=durl.replace("{id}",id);
		var item_delete={text:"删除",iconCls:"icon-remove",handler:function(){
			$.messager.confirm("操作提示","确认删除?",function(yes){
				if(!yes)return;
				$.post(durl,function(text){
					_datagrid.datagrid('reload');
					text.messager();
				});
			});
		}};
		divMenu.menu("appendItem",item_delete);
		
		
	}
	var item_copy={text:"复制",iconCls:"icon-cut",id:"item_copy"},item_reload={text:"刷新",iconCls:"icon-reload"};
	divMenu.menu("appendItem",item_copy).menu("appendItem",item_reload);
    item_copy =divMenu.menu('findItem', "复制");
    item_reload =divMenu.menu('findItem', "刷新");
	var item_copy_thisrow={parent:item_copy.target,text:"本行",handler:function(){
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		textarea.val(Kull.stringify(rowData));
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	}};
	var item_copy_selectrow={parent:item_copy.target,text:"选择行",handler:function(){
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		var ds=_datagrid.datagrid("getSelections");
		textarea.val(Kull.stringify(ds["rows"]));
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	}};
	var item_copy_allrow={parent:item_copy.target,text:"全部行",handler:function(){
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		var ds=_datagrid.datagrid("getData");
		textarea.val(Kull.stringify(ds["rows"]));
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	}};
	
	var item_reload_data={parent:item_reload.target,text:"数据",handler:function(){
		_datagrid.datagrid('reload');
	}};
	var item_reload_page={parent:item_reload.target,text:"页面",handler:function(){
		window.location.reload();
	}};
	divMenu.menu("appendItem",item_copy_thisrow)
	.menu("appendItem",item_copy_selectrow)
	.menu("appendItem",item_copy_allrow)
	
	.menu("appendItem",item_reload_data)
	.menu("appendItem",item_reload_page)
	;
	divMenu.menu("show",{left:e.pageX,top:e.pageY }) ;
};
