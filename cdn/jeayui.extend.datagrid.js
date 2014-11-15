 $.fn.datagrid.defaults.fit=true;
 $.fn.datagrid.defaults.pagination=true;
 $.fn.datagrid.defaults.nowrap=false;
 $.fn.datagrid.defaults.idField="id";
 $.fn.datagrid.defaults.rownumbers=true;
 $.fn.datagrid.defaults.pageSize=50;
 $.fn.datagrid.defaults.groupFormatter=function(value,rows){return value + ' - 共' + rows.length + ' 条';};
 
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
	,
	
	initEditForm: function(jq, opt){
    	var el=jq;
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
    	var el=jq;
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
	
	,
	stringify:function(obj) {
          switch (typeof (obj)) {
        case 'object':
            var ret = [];
            if (obj instanceof Array) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    ret.push($.datagrid("stringify",(obj[i])));
                }
                return '[' + ret.join(',') + ']';
            }
            else if (obj instanceof RegExp) {
                return obj.toString();
            }
            else {
                for (var a in obj) {
                    ret.push(a + ':' + $.datagrid("stringify",(obj[a])));
                }
                return '{' + ret.join(',') + '}';
            }
        case 'function':
            return 'function() {}';
        case 'number':
            return obj.toString();
        case 'string':
            return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function(a) { return ("\n" == a) ? "\\n" : ("\r" == a) ? "\\r" : ("\t" == a) ? "\\t" : ""; }) + "\"";
        case 'boolean':
            return obj.toString();
        default:
            return obj.toString();

      };
	
});
 
 
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
		textarea.val($.datagrid("stringify",(rowData)));
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	}};
	var item_copy_selectrow={parent:item_copy.target,text:"选择行",handler:function(){
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		var ds=_datagrid.datagrid("getSelections");
		textarea.val($.datagrid("stringify",(ds["rows"])));
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	}};
	var item_copy_allrow={parent:item_copy.target,text:"全部行",handler:function(){
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		var ds=_datagrid.datagrid("getData");
		textarea.val($.datagrid("stringify",(ds["rows"])));
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
