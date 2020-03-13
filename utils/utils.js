// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
	//author: meizz
	var o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'q+': Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
	return fmt;
};
//调用： var time1 = new Date().Format("yyyy-MM-dd");var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");

jQuery.ownAjax = function(
	url,
	{ data = {}, type = 'GET', dataType = 'json', async = 'true' } = {},
	succCallback,
	errCallBack
) {
	$.ajax({
		url: url,
		data: data,
		type: type,
		dataType: dataType,
		async: async,
		success: function(r) {
			succCallback ? succCallback(r) : '';
		},
		error: function(e) {
			errCallBack ? errCallBack(e) : '';
		},
	});
};

// 转意符换成普通字符
function escape2Html(str) {
	var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
	return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
		return arrEntities[t];
	});
}

// 读取cookie
function getCookie(name) {
	var arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
	if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
	else return null;
}

function isNotEmpty(obj) {
	return obj != null && obj != undefined && obj.trim().length != 0;
}
//ali-dev.ahotels.tech/ota-biz-service/api/v1/exception/report
