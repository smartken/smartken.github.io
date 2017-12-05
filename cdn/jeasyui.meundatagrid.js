(function(){

var stringify= function(obj) {
    switch (typeof (obj)) {
        case 'object':
            var ret = [];
            if (obj instanceof Array) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    ret.push(stringify(obj[i]));
                }
                return '[' + ret.join(',') + ']';
            }
            else if (obj instanceof RegExp) {
                return obj.toString();
            }
            else {
                for (var a in obj) {
                    ret.push(a + ':' + stringify(obj[a]));
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
	};
	
	var toCsv=function(arr,fields){
		var val="";
		for(var i=0;i<arr.length;i++){
		
			var obj=arr[i];
			for(var j=0;j<fields.length;j++){
				 var key=fields[j];
				 var v=obj[key]||"";
			   val+=v+",";
			}
			val+="\n";
		}
		return val;
	}
	
	var onExport=function (val){
	
		var textarea=$("<textarea id='textarea-paste' cols='100' rows='12' readonly></textarea>");
		textarea.val(val);
		$("<div></div>").append(textarea).dialog({title:"复制板",modal:true});
	
	};

$.fn.datagrid.defaults.onRowContextMenu	=function(e, rowIndex, rowData){
	e.preventDefault();
	var _datagrid=$(this);
	var opts=_datagrid.datagrid("options");
	
	var _columns=opts.columns[0];
	
	var _fields=[];
	for(var i=0;i<_columns.length;i++){
				  var column=_columns[i];
		      _fields[i]=column["field"];
	} 
	
	
	var divMenu=$("<div></div>");
	divMenu.insertAfter(document.body);
	divMenu.menu();
	

	
	
	var item_exportthis={text:"导出本行"},item_exportselect={text:"导出所选行"},item_exportall={text:"导出全部行"};
	
	var item_exporthead={text:"导出表头",handler:function(){
	    // var columns=_datagrid.datagrid("options").columns[0];
		    var val="";
		  for(var i=0;i<_columns.length;i++){
				  var column=_columns[i];
		      val+=column["title"]+",";
			} 
		  onExport(val);
			}
	};
	
	divMenu.menu("appendItem",item_exportthis).menu("appendItem",item_exportselect)
		.menu("appendItem",item_exportall).menu("appendItem",item_exporthead)
		;
    item_exportthis =divMenu.menu('findItem', "导出本行");
    item_exportselect =divMenu.menu('findItem', "导出所选行");
	   item_exportall =divMenu.menu('findItem', "导出全部行");
	  //item_exportall =divMenu.menu('findItem', "导出全部行为");
	
	
	var item_export_thisrow_json={parent:item_exportthis.target,text:"json",handler:function(){
		
		var val=stringify(rowData);
		onExport(val);
	}};
	
	
	var item_export_selectrow_json={parent:item_exportselect.target,text:"json",handler:function(){
		var ds=_datagrid.datagrid("getSelections");
		var val=stringify(ds);
		onExport(val);
	}};
	
	var item_export_allrow_json={parent:item_exportall.target,text:"json",handler:function(){
		
		var ds=_datagrid.datagrid("getData");
		var val=stringify(ds);
		onExport(val);
	}};
	
	
	var item_export_thisrow_csv={parent:item_exportthis.target,text:"csv",handler:function(){
		var val=toCsv([rowData],_fields);
		onExport(val);
	}};
	
	var item_export_selectrow_csv={parent:item_exportselect.target,text:"csv",handler:function(){
		var ds=_datagrid.datagrid("getSelections");
		var val=toCsv(ds,_fields);
		onExport(val);
	}};
	
	var item_export_allrow_csv={parent:item_exportall.target,text:"csv",handler:function(){
			var ds=_datagrid.datagrid("getData");
		var val=toCsv(ds["rows"],_fields);
		onExport(val);
	}};

	
	//var item_reload_data={parent:item_reload.target,text:"数据",handler:function(){
	//	_datagrid.datagrid('reload');
	//}};
	//var item_reload_page={parent:item_reload.target,text:"页面",handler:function(){
	//	window.location.reload();
	//}};
	divMenu
		.menu("appendItem",item_export_thisrow_csv)
	.menu("appendItem",item_export_allrow_csv)
	.menu("appendItem",item_export_selectrow_csv)
		.menu("appendItem",item_export_thisrow_json)
	.menu("appendItem",item_export_allrow_json)
	.menu("appendItem",item_export_selectrow_json)

	
	//.menu("appendItem",item_reload_data)
	//.menu("appendItem",item_reload_page)
	;
	divMenu.menu("show",{left:e.pageX,top:e.pageY }) ;
};


})();
