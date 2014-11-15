$.extend($.fn.validatebox.defaults.rules, {

    minLength: {
                validator: function(value, param){
                              return value.length >= param[0];},
                message: 'Please enter at least {0} characters.'
    }  //minLength: {
   ,cnidcard:{
	   	validator:function(value,param){
	                   return (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value));
	            }
                ,message: '身份证格式错误'
   }
   ,cnzip:{
	   	        validator:function(value,param){
	                   return (/[1-9]\d{5}(?!\d)/.test(value));
	            }
                ,message: '邮政编码格式错误'
   }
   
    ,mobile:{
	   	        validator:function(value,param){
	                   return (/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}/).test(value);
	            }
                ,message: '手机号码格式错误'
   }
    
    
     ,ip:{
	   	      validator:function(value,param){
	                   return (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value));
	            }
                ,message: 'IP输入格式错误'
   }

});   //$.extend($.fn.validatebox.defaults.rules, {
