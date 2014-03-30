
;
(function(win){
	
	var kull={};
	
	kull.classForName = function(fullNS)
	{
	    // 将命名空间切成N部分, 比如Grandsoft、GEA等
	    var nsArray = fullNS.split('.');
	    var sEval = "";
	    var sNS = "";
	    for (var i = 0; i < nsArray.length; i++)
	    {
	        if (i != 0) sNS += ".";
	        sNS += nsArray[i];
	        // 依次创建构造命名空间对象（假如不存在的话）的语句
	        // 比如先创建Grandsoft，然后创建Grandsoft.GEA，依次下去
	        sEval += "if (typeof(" + sNS + ") == 'undefined') " + sNS + " = new Object();"
	    }
	    if (sEval != "") eval(sEval);
	};
	
	kull.stringify= function(obj) {
    switch (typeof (obj)) {
        case 'object':
            var ret = [];
            if (obj instanceof Array) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    ret.push(kull.stringify(obj[i]));
                }
                return '[' + ret.join(',') + ']';
            }
            else if (obj instanceof RegExp) {
                return obj.toString();
            }
            else {
                for (var a in obj) {
                    ret.push(a + ':' + kull.stringify(obj[a]));
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
	}
	window.Kull=kull;
})(window);
 
String.prototype.isNullOrEmpty = function() {
    return ((this == null) || (this == ""));
}

//判断字符串是否只包含英文字母
String.prototype.isAlph=function(){
	
	return (/^[A-Za-z]+$/.test(this));
	
};

//判断字符串是否只包含英文字母和数字
String.prototype.isAlphOrNum=function(){
	return (/^[A-Za-z0-9]+$/.test(this));
};

//判断字符串是否不包含任何标点符号
String.prototype.isNotSymbol=function(){
	return !(/[^0-9A-z\u4e00-\u9fa5]/.test(this));

};


//判断字符是否符合身份证格式
String.prototype.isIdNoFormat=function(){
	return (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this));
};

//从身份证里提出出日期
String.prototype.getIdNoBornDate=function(){
	var len=this.length;
	if(len==15){
		var year="19"+this.slice(6,8);
		var month=this.slice(8,10);
		var day=this.slice(10,12);
		return new Date(year+"/"+month+"/"+day);
	}
	
	if(len==18){
		var year=this.slice(6,10);
		var month=this.slice(10,12);
		var day=this.slice(12,14);
		return new Date(year+"/"+month+"/"+day);
	}
};
//电话
String.prototype.isPhoneFormat=function(){
	return (/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/).test(this);
};
//手机号码
String.prototype.isMobileFormat=function(){
	return (/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|15[89]\d{8}/).test(this);


};
//邮政编码 
String.prototype.isZipCode=function(){
	return (/[1-9]\d{5}(?!\d)/.test(this));
};

//中文
String.prototype.isChinese=function(){
	return (/[\u4e00-\u9fff]+/.test(this));
};

//车牌号
String.prototype.isCarNo=function(){
	return (/\d{5}$|[A-Z]{1}\d{4}|\d{1}[A-Z]{1}\d{3}|[A-Z]{2}\d{3}$/.test(this));
};
//IP地址
String.prototype.isIP=function(){
	return (/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(this));
}
;

String.prototype.isDateTime= function(pattern, val) {
    if (pattern.length != val.length) return false;
    var reg = pattern;
    reg = reg.replace(/yyyy/, "[0-9]{4}");
    reg = reg.replace(/yy/, "[0-9]{2}");
    reg = reg.replace(/MM/, "((0[1-9])|1[0-2])");
    reg = reg.replace(/M/, "(([1-9])|1[0-2])");
    reg = reg.replace(/dd/, "((0[1-9])|([1-2][0-9])|30|31)");
    reg = reg.replace(/d/, "([1-9]|[1-2][0-9]|30|31))");
    reg = reg.replace(/HH/, "(([0-1][0-9])|20|21|22|23)");
    reg = reg.replace(/H/, "([0-9]|1[0-9]|20|21|22|23)");
    reg = reg.replace(/mm/, "([0-5][0-9])");
    reg = reg.replace(/m/, "([0-9]|([1-5][0-9]))");
    reg = reg.replace(/ss/, "([0-5][0-9])");
    reg = reg.replace(/s/, "([0-9]|([1-5][0-9]))");
    var regexp = new RegExp("^" + reg + "$");
    return regexp.test(val);
};


 


 
 
 



 
