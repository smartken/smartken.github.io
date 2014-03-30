
;jQuery.fn.extend({

    iframe: function(url) {
     $(this).html("<iframe scrolling='no' frameborder='0' src='" + url + "' style='width:99%;height:99%;overflow:hidden;'></iframe>");
 }

 ,
    toyzCrudForm: function(opts) {
	     var regexpContent=opts["regexpContent"]||"";
         var prefix = opts["prefix"] || "";
         var colNum = opts["colNum"] || 2;
         var editors = opts["editors"] || [];
         var urlSave = opts["urlSave"] || "";
         var id=opts["id"]||"";
         var data = opts["data"] || {};
         var objDiv = $("<div></div>");
         objDiv
         //.css("width","100%")
         //.css("height","100%")
	.css("overflow", "hidden")
	;
         var objForm = $("<form method='post'></form>");
         var objTable = $("<table cellspacing='0' ></table>");
         objTable.addClass("tableSimple");
         objTable.css("table-layout", "auto");

         $.each(data, function(dataName, dataValue) {
             var hidden = $("<input type=\"hidden\" disabled=\"disabled\" />");
             if(id==dataName){
            	 hidden = $("<input type=\"hidden\"  />");
             }
             hidden.attr("name", prefix + dataName).attr("value", dataValue);
 
             objForm.append(hidden);

         });

         var tr;
         $.each(editors, function(index, editor) {

             if (index % colNum == 0) {
                 tr = $("<tr></tr>");
             }

             var inputName = editor["field"] || "";
             var inputTitle = editor["title"] || "";
             var pattern = "input[name='" + prefix + inputName + "']";
             objForm.find("input").remove(pattern);
             var td = $("<td>&nbsp;</td>");
             var th = $("<th>&nbsp;</th>");
             var inputEditor = editor["editor"] || { type: "text" };
             var editorType = inputEditor["type"];
             var editorOpts = inputEditor["options"] || {};
             var inputObj;
             if (editorType == "textarea") {
                 inputObj = $("<textarea rows='5' cols='50'></textarea>");
                 inputObj.html(data[inputName]);
             } else if (editorType == "checkbox") {
                 inputObj = $("<input type='checkbox' value='Y' />");
             } else {
                 inputObj = $("<input type='text' />");
                 inputObj.val(data[inputName]);
             }

             inputObj.attr("name", prefix + inputName);
             var span = $("<span></span>");
             span.html(inputTitle);
             //td.html(data[inputName]);
             td.append(inputObj);
             th.append(span).append(":");
             tr.append(th);
             tr.append(td);
             if (index % colNum == colNum - 1 || index == editors.length - 1) {
                 objTable.append(tr);
             }

             switch (editorType) {

                 case "validatebox": { inputObj.validatebox(editorOpts); break; }

                 case "numberbox": { inputObj.numberbox(editorOpts); break; }
                 case "numberspinner": { inputObj.numberspinner(editorOpts); break; }
                 case "combobox": { inputObj.combobox(editorOpts); break; }
                 case "combotree": { inputObj.combotree(editorOpts); break; }
                 case "combogrid": { inputObj.combogrid(editorOpts); break; }
                 //case "toyzCombogrid": { inputObj.toyzCombogrid(editorOpts); break; }
                 case "datebox":
                     {
                         var val = inputObj.val();
                         val = DateFormatter(val);
                         inputObj.val(val);
                         inputObj.datebox(editorOpts);
                         break;
                     }
                 case "datetimebox":
                     {
                         var val = inputObj.val();
                         val = DatetimeFormatter(val);
                         inputObj.val(val);
                         inputObj.datetimebox(editorOpts);
                         break;
                     }
                 default: inputObj.validatebox(editorOpts); break;
             }

         });  //each

         var trOpera = $("<tr></tr>");
         var tdOpera = $("<th></th>");
         tdOpera.css("padding-right", "3%");
         trOpera.append(tdOpera);
         tdOpera.attr("colspan", colNum * 2);
         var aSave = $("<a></a>");
         var aClear = $("<a></a>");
         tdOpera.append(aSave);
         tdOpera.append(aClear);
         aSave.linkbutton({
             text: "保存"
    	, iconCls: "icon-save"
         });
         aClear.linkbutton({
             text: "清空"
    	, iconCls: "icon-cancel"
         });
         aSave.click(function() {
             //  $.messager.confirm("操作提示", "确认保存数据？", function(yes) {
             //      if (yes) {

             objForm.form("submit", {
                 url: urlSave
    		   , onSubmit: function() { return $(this).form("validate"); }
    	       , success: function(str) { str.messager(); $(regexpContent).dialog("close"); }
             });
             //      }
             //  });  //$.messager.alert

         });
         aClear.click(function() { objForm.form("clear"); });
         objTable.append(trOpera);
         objForm.append(objTable);
         objDiv.append(objForm);
         $(this).html(objDiv);

     
 }  //toyzCrudForm: function(opts)




 , toyzUploadForm: function(opts) {
     if (!opts) {
         opts = {};
     }
     var uploadUrl = opts["uploadUrl"] || "#";
     var inputName = opts["inputName"] || "file";
     var muti = opts["muti"] || false;
     var div = $("<div></div>");
     var table = $("<table></table>");
     var ol = $("<ol type='1'></ol>");
     var span = $("<span></span>");
     var form = $("<form method='post' enctype='multipart/form-data'></form>");
     form.attr("action", uploadUrl);
     var aNew = $("<a></a>");
     var aSubmit = $("<a></a>");
     aNew.linkbutton({
         text: "新增"
    		  , iconCls: "icon-add"
     });
     aSubmit.linkbutton({
         text: "提交"
    		  , iconCls: "icon-save"
     });
     aNew.click(function() {
         var li = $("<li></li>");
         var inputFile = $("<input type='file' />");
         inputFile.attr("name", inputName);
         var btnRemove = $("<button type='button'>删除</button>");
         btnRemove.click(function() {
             li.remove();
         });
         li.append(inputFile).append("&nbsp;&nbsp;").append(btnRemove);
         ol.append(li);
     });

     aSubmit.click(function() {
         form.form("submit");
     });

     //var btns=[];

     if (muti) {
         //btns=[btnNew,btnUpload];
         span.append(aNew);
     }
     span.append(aSubmit);
     var li = $("<li></li>");
     var inputFile = $("<input type='file' />");
     inputFile.attr("name", inputName);
     li.append(inputFile);
     ol.append(li);
     div.css("padding", "1%");
     span.css("width", "100%").css("text-align", "right").css("padding-right", "5%");
     form.append(ol);
     form.append(span);
     div.append(form);
     $(this).html(div);
 }  //toyzUploadForm: function(opts) 
 

});                 //jQuery.fn.entends({