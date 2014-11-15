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
