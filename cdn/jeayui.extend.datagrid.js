 $.fn.datagrid.defaults.fit=true;
 $.fn.datagrid.defaults.pagination=true;
 $.fn.datagrid.defaults.nowrap=false;
 $.fn.datagrid.defaults.idField="id";
 $.fn.datagrid.defaults.rownumbers=true;
 $.fn.datagrid.defaults.pageSize=50;
 $.fn.datagrid.defaults.groupFormatter=function(value,rows){return value + ' - 共' + rows.length + ' 条';};
 
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
