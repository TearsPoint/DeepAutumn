function GetRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   
//var num = GetRandomNum(1,10);   
//if (num <= 8)
//{
var cu = window.location.host;
var pa = window.location.pathname;

if (pa == '/scm/')
{
	var type = 2;
	if (type == 1)
	{
		if (cu == 'ggg.17173h.cn')
		{
			var urlArr = [ 
				"ggg.2ta8.net",
				"ggg.2ta8.com.cn",
				"ggg.baifumeiba.cn",
				"ggg.gaofushuaiba.cn",
				"ggg.guolaiwanba.net"
					];
			var rand = GetRandomNum(0, urlArr.length - 1)
				var url = window.location.href.replace(cu, urlArr[rand]);
			//alert(url);
			location.href = url;
		}
	}
	else
	{
		var urlSrc = [
			"ggg.2ta8.net",
			"ggg.2ta8.com.cn",
			"ggg.baifumeiba.cn",
			"ggg.gaofushuaiba.cn",
			"ggg.guolaiwanba.net"
				];
		var urlDes = [
			"gg1.2ta8.net",
			"gg1.2ta8.com.cn",
			"gg1.baifumeiba.cn",
			"gg1.gaofushuaiba.cn",
			"gg1.guolaiwanba.net"
				];
		var pos = urlSrc.indexOf(cu);
		if (pos != -1)
		{
			var url = window.location.href.replace(urlSrc[pos], urlDes[pos]);
			location.href = url;
		}
	}
}
else if (pa == '/ljpp/')
{
	var type = 1;
	if (type == 1)
	{
		if (cu == 'ggg.17173h.cn')
		{
			var urlArr = [ 
				"ggg.2ta8.net",
				"ggg.2ta8.com.cn",
				"ggg.baifumeiba.cn",
				"ggg.gaofushuaiba.cn",
				"ggg.guolaiwanba.net"
					];
			var rand = GetRandomNum(0, urlArr.length - 1)
				var url = window.location.href.replace(cu, urlArr[rand]);
			//alert(url);
			location.href = url;
		}
	}
	else
	{
		var urlSrc = [
			"ggg.2ta8.net",
			"ggg.2ta8.com.cn",
			"ggg.baifumeiba.cn",
			"ggg.gaofushuaiba.cn",
			"ggg.guolaiwanba.net"
				];
		var urlDes = [
			"gg1.2ta8.net",
			"gg1.2ta8.com.cn",
			"gg1.baifumeiba.cn",
			"gg1.gaofushuaiba.cn",
			"gg1.guolaiwanba.net"
				];
		var pos = urlSrc.indexOf(cu);
		if (pos != -1)
		{
			var url = window.location.href.replace(urlSrc[pos], urlDes[pos]);
			location.href = url;
		}
	}
}
//}