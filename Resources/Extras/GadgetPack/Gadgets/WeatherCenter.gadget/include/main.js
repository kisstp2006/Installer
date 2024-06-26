//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////




var daytime_back;
var updateTimer, ubarTimer;
var NoInetConnectionFlag = 0;
var daytime;
var daytime_back;
var totalFCDays;
var MeteonovaFlag = 0;


//////////////////

function onLoad()
{
	System.Gadget.settingsUI = "settings.html"
	System.Gadget.onSettingsClosed = settingsClosed;

	System.Gadget.background = "../images/spacer.png";

	System.Gadget.onDock = redrawGadget;	//no longer support in win7
	System.Gadget.onUndock = redrawGadget;	//msdn.microsoft.com/en-us/library/dd370867(VS.85).aspx

	updateBar.innerText = lng_Updating;

	
	if (System.Gadget.Settings.read('SourceOfUpdates') == "") {
		ReadSettings();
		GeoIPLocation();
	}


	getForecastData();

}
	
//////////////////


function getForecastData()
{
	SourceOfUpdates = System.Gadget.Settings.read('SourceOfUpdates');
	if (SourceOfUpdates == "weatherchannel") MakeTempProfile("W");
	if (SourceOfUpdates == "accuweather") MakeTempProfile("A");
	if (SourceOfUpdates == "wunderground") MakeTempProfile("WU");
	if (SourceOfUpdates == "msn") MakeTempProfile("MSN");
	if (SourceOfUpdates == "weathereye") MakeTempProfile("WE");
	if (SourceOfUpdates == "weatherbug") MakeTempProfile("WB");
	if (SourceOfUpdates == "yandex") MakeTempProfile("YA");
	if (SourceOfUpdates == "gismeteo") MakeTempProfile("GIS");
	if (SourceOfUpdates == "noaa") MakeTempProfile("NOAA");
	if (SourceOfUpdates == "meteonova") MakeTempProfile("METEONOVA");

	var LocationCode = System.Gadget.Settings.read('locationCode');
	var Units = System.Gadget.Settings.read('tunits');


	updateBar.style.display = "block";
	

	clearTimeout(updateTimer);
	if (System.Gadget.Settings.read("updateInterval") == 0) System.Gadget.Settings.write("updateInterval", "1");
	updateTimer = self.setTimeout('getForecastData();', 1000*60*System.Gadget.Settings.read("updateInterval"));

//http://gadgets.weather.com/weather/local/ASXX0112?dayf=10&cc=*&unit=m
//https://registration.weather.com/common/eula/xmloap.html
//http://vwidget.accuweather.com/widget/vista4/weather_data_v2.asp?location=OCN|AU|NSW|SYDNEY|&metric=1
//http://forecastfox3.accuweather.com/adcbin/forecastfox3/current-conditions.asp?location=cityId%3A324505&metric=1
//http://forecastfox.accuweather.com/adcbin/forecastfox/weather_data.asp?metric=1&partner=forecastfox&location=OCN|AU|NSW|SYDNEY|
//http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query=Sydney,AU
//http://api.wunderground.com/auto/wui/geo/ForecastXML/index.xml?query=Sydney,AU
//http://weather.service.msn.com/data.aspx?src=vista&wealocations=wc:ASXX0112&weadegreetype=C
//http://weyedata.pelmorex.com/WeatherEye/AllData/AUNS0001.xml?rnd=792406
//http://a4353274562.api.wxbug.net/getLiveWeatherRSS.aspx?ACode=A4353274562&stationid=YSSY&unittype=1
//http://export.yandex.ru/weather-ng/forecasts/94768.xml
//http://informer.gismeteo.ru/xml/94767_1.xml
//http://www.weather.gov/xml/current_obs/KJFK.xml
//http://www.weather.gov/forecasts/xml/SOAP_server/ndfdXMLclient.php?whichClient=NDFDgen&lat=34.027&lon=-118.329&product=glance&begin=2004-01-01T00%3A00%3A00&end=2014-02-24T00%3A00%3A00&maxt=maxt
//http://www.meteonova.ru/xml/27612.xml?r=0.07300381071540701

	
	var RandomNumber = Math.round(Math.random() * 10000);

	
	if (SourceOfUpdates == "weatherchannel")
		{
						
		var location = "http://gadgets.weather.com/weather/local/" + LocationCode + "?dayf=10&cc=*" + "&unit=m" + "&" + RandomNumber;
		
		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastWeatherChannel(tmp.responseText);}
			else {
				NoInetConnection();}	
			}
		}
		tmp.Send(null);
	}





	if (SourceOfUpdates == "accuweather")
		{
		
		var location = "http://forecastfox.accuweather.com/adcbin/forecastfox/weather_data.asp?&partner=forecastfox" + "&par=" + RandomNumber + "&location=" + LocationCode + "&metric=1";


		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastAccuWeather(tmp.responseText);}
			else {
				NoInetConnection();}
			}
				
		}
		tmp.Send(null);
	}			
		




	if (SourceOfUpdates == "wunderground")
		{
		
		var CurrentData = "http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query=" + LocationCode + "&key=" + RandomNumber;

		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", CurrentData, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				CurrentDataXML = tmp.responseText;}
			else {
				NoInetConnection();}
			}
		}
		tmp.Send(null);
		


		var ForecastData = "http://api.wunderground.com/auto/wui/geo/ForecastXML/index.xml?query=" + LocationCode + "&t=" + RandomNumber;
		
		var tmp2 = new ActiveXObject("Microsoft.XMLHTTP");
		tmp2.open("GET", ForecastData, true);
		tmp2.onreadystatechange=function() {
			if (tmp2.readyState==4) {
				if (tmp2.Status == 200) {
					ForecastDataXML = tmp2.responseText;
					InetConnectionIsOK(CurrentDataXML + "!!!!!\n" + ForecastDataXML);
					parseForecastWunderground(CurrentDataXML,ForecastDataXML);
				}
				else {
				NoInetConnection();}
			}
						
		}
		tmp2.Send(null);
	}





	if (SourceOfUpdates == "msn")
		{
						
		var location = "http://weather.service.msn.com/data.aspx?src=vista&wealocations=" + LocationCode + "&weadegreetype=C" + "&" + RandomNumber;
		
		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastMSN(tmp.responseXML);}
			else {
				NoInetConnection();
				if (System.Gadget.Settings.read('showWeatherAfterRestart') == 1) {}
			}
	
			}
		}
		tmp.Send(null);
	}




	if (SourceOfUpdates == "weathereye")
		{
		
		var location = "http://weyedata.pelmorex.com/WeatherEye/AllData/" + LocationCode + ".xml" + "?rnd=" + RandomNumber;


		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastWeatherEye(tmp.responseXML);}
			else {
				NoInetConnection();}
			}
				
		}
		tmp.Send(null);
	}	




	if (SourceOfUpdates == "weatherbug")
		{
				
		LocationCode = LocationCode.split('|');

		var CurrentData = "http://a4353274562.api.wxbug.net/getLiveWeatherRSS.aspx?ACode=A4353274562&unittype=1&stationid=" + LocationCode[1] + "&rnd=" + RandomNumber;
		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", CurrentData, false);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				CurrentDataXML = tmp.responseText.substring(tmp.responseText.indexOf('<aws:api version="2.0" />') + 25, tmp.responseText.indexOf('</aws:ob>'));}
			else {
				NoInetConnection();}
			}
		}
		tmp.Send(null);



		if ((LocationCode[0]).indexOf('u') > -1) LocationCode[0] = (LocationCode[0]).slice(1);
		var ForecastData = "http://a4353274562.api.wxbug.net/getForecastRSS.aspx?ACode=A4353274562&unittype=1&cityCode=" + LocationCode[0] + "&rnd=" + RandomNumber;
		var tmp2 = new ActiveXObject("Microsoft.XMLHTTP");
		tmp2.open("GET", ForecastData, true);
		tmp2.onreadystatechange=function()
		{
		if (tmp2.readyState==4)
			{
			if (tmp2.Status == 200) {
				var ForecastXmlData = tmp2.responseText.substring(tmp2.responseText.indexOf('<aws:api version="2.0" />') + 25, tmp2.responseText.indexOf('</aws:weather>'));
				InetConnectionIsOK(CurrentDataXML + "!!!!!\n" + ForecastXmlData);
				parseForecastWeatherBug(CurrentDataXML,ForecastXmlData);}
			else {
				NoInetConnection();}
			}
		}
		tmp2.Send(null);

	}	




	if (SourceOfUpdates == "yandex")
		{
						
		var location = "http://export.yandex.ru/weather-ng/forecasts/" + LocationCode + ".xml" + "?rnd=" + RandomNumber;

		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.setRequestHeader('contentType', 'application/x-www-form-urlencoded');
		tmp.setRequestHeader('Accept', 'text/javascript,text/html,application/xml,text/xml,text/plain,&#42;/&#42;');
		//tmp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		//tmp.setRequestHeader('encoding', 'windows-1251');

		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastYandex(tmp.responseXML);}
			else {
				NoInetConnection();}	
			}
		}
		tmp.Send(null);
	}



	if (SourceOfUpdates == "gismeteo")
		{
		
		var location = "http://informer.gismeteo.ru/xml/" + LocationCode + "_1.xml" + "?" + RandomNumber;


		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastGismeteo(tmp.responseXML);}
			else {
				NoInetConnection();}
			}
				
		}
		tmp.Send(null);
	}	



	if (SourceOfUpdates == "noaa")
		{

		LocationCode = LocationCode.split('|');
						
		var location = "http://www.weather.gov/xml/current_obs/" + LocationCode[1] + ".xml" + "?" + RandomNumber;
		
		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, false);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				CurrentDataXML = tmp.responseText;}
			else {
				NoInetConnection();}	
			}
		}
		tmp.Send(null);


		var lat = LocationCode[0].slice(0, LocationCode[0].indexOf(","));
		var lon = LocationCode[0].slice(LocationCode[0].indexOf(",") + 1, LocationCode[0].length);
		var location2 = "http://www.weather.gov/forecasts/xml/SOAP_server/ndfdXMLclient.php?whichClient=NDFDgen&lat=" + lat + "&lon=" + lon + "&product=glance&begin=2004-01-01T00%3A00%3A00&end=2014-02-24T00%3A00%3A00" + "&" + RandomNumber;
		
		var tmp2 = new ActiveXObject("Microsoft.XMLHTTP");
		tmp2.open("GET", location2, true);
		tmp2.onreadystatechange=function()
		{
		if (tmp2.readyState==4)
			{
			if (tmp2.Status == 200) {
				var ForecastXmlData = tmp2.responseXML;
				InetConnectionIsOK(CurrentDataXML + "!!!!!\n" + ForecastXmlData);
				parseForecastNOAA(CurrentDataXML,ForecastXmlData);}
			else {
				NoInetConnection();}	
			}
		}
		tmp2.Send(null);


	}



	if (SourceOfUpdates == "meteonova")
		{
		
		var location = "http://www.meteonova.ru/xml/" + LocationCode + ".xml" + "?r=" + RandomNumber;


		var tmp = new ActiveXObject("Microsoft.XMLHTTP");
		tmp.open("GET", location, true);
		tmp.onreadystatechange=function()
		{
		if (tmp.readyState==4)
			{
			if (tmp.Status == 200) {
				InetConnectionIsOK(tmp.responseText);
				parseForecastMeteonova(tmp.responseXML);}
			else {
				NoInetConnection();}
			}
				
		}
		tmp.Send(null);
	}	

		
}


//////////////////






function setOptionsSettings(parametrsArray)
{
	currentImg.style.display = "block";
	currentImgMoon.style.display = "block";


	for (i = 0; i < parametrsArray.length; i++)
	{
		if (System.Gadget.Settings.read("ShowParametersOption1") == parametrsArray[i].name)
		{
			document.getElementById('Param1Capt').innerHTML = parametrsArray[i].capt;
			document.getElementById('Param1Span').innerHTML = parametrsArray[i].span;
		}

		if (System.Gadget.Settings.read("ShowParametersOption2") == parametrsArray[i].name)
		{
			document.getElementById('Param2Capt').innerHTML = parametrsArray[i].capt;
			document.getElementById('Param2Span').innerHTML = parametrsArray[i].span;
		}

		if (System.Gadget.Settings.read("ShowParametersOption3") == parametrsArray[i].name)
		{
			document.getElementById('Param3Capt').innerHTML = parametrsArray[i].capt;
			document.getElementById('Param3Span').innerHTML = parametrsArray[i].span;
		}

		if (System.Gadget.Settings.read("ShowParametersOption4") == parametrsArray[i].name)
		{
			document.getElementById('Param4Capt').innerHTML = parametrsArray[i].capt;
			document.getElementById('Param4Span').innerHTML = parametrsArray[i].span;
		}

	}

}




///////////////////////


function settingsClosed(event)
{
    if (event.closeAction == event.Action.commit)
    {
	MeteonovaFlag = 0;
	getForecastData();
    }
}

//////////////////////

function redrawGadget()
{
if (NoInetConnectionFlag == 0 || NoInetConnectionFlag == 1) return;

updateBar.style.display = "none";


// infoScreen =
// 1 -  current full
// 2 - current short
// 3 -  current full + fc
// 4 - current short +fc
// 5 - forecast 1 - 9
// ...
// 13 - undocked full 3,6,9
// ...
// 15
	var imgPath;//, _background;
	var dayCount = System.Gadget.Settings.read("fcDays");
	if (dayCount > totalFCDays) {dayCount = totalFCDays; System.Gadget.Settings.write("fcDays", dayCount);}
	var showCurrent = true;
	//var showAlter = !System.Gadget.docked && System.Gadget.Settings.read("unDockAlter") && !System.Gadget.Settings.read("miniMode");
	var showAlter = !System.Gadget.docked && System.Gadget.Settings.read("unDockAlter");
	var mini = System.Gadget.Settings.read("showMiniMode") && !(showAlter && dayCount > 0);
	if (showAlter) mini = false;
	if (dayCount == 0 && showAlter) {dayCount = 1; System.Gadget.Settings.write("fcDays", dayCount);}	//prevents crash

	if (daytime == 'Day' && daytime_back == 'blue' && !showAlter) TimeLastUpdate.style.color = "#3090C7";
	if (daytime == 'Day' && daytime_back == 'grey' && !showAlter) TimeLastUpdate.style.color = "#808080";
	if (daytime == 'Day' && daytime_back == 'blue' && showAlter) TimeLastUpdate.style.color = "#E6F1FF";
	if (daytime == 'Day' && daytime_back == 'grey' && showAlter) TimeLastUpdate.style.color = "#808080";
	if (daytime == 'Night') TimeLastUpdate.style.color = "#E6F1FF";
	if (System.Gadget.Settings.read('Skin') == 'skin2') TimeLastUpdate.style.color = "#E6F1FF";


	imgPath="images/" + System.Gadget.Settings.read('Skin') + "/" + daytime + "/" + daytime_back + "/";
	
	var cur_width = 129;
	var cur_height = 0;
//	var cur_left = 8;
	var _vspace=0;
	var _hspace = 2;
	var fc_width = 0;
	var fc_height = 0;
	var fc1_left = 0;
	var fc1_top = 0;
	var fc2_left = 0;
	var fc2_top = 0;
	var fc3_left = 0;
	var fc3_top = 0;
	
	
	if (showCurrent) {
		if (mini) {
			cur_height = 90;
			StatsBox.style.display = "none";
			background_picture = "back_simple.png";
			buttonLeft.style.display = "none"; 
			buttonRight.style.display = "block";
			if (dayCount == 0) {cur_height = cur_height + 3; background_picture = "back_simple_footer.png";}
		}
		else {
			cur_height = 143;
			StatsBox.style.display="block";
			background_picture = "back_enchanged.png";
			buttonLeft.style.display = "block"; 
			buttonRight.style.display = "none";
			if (dayCount == 0) {cur_height = cur_height + 3; background_picture = "back_enchanged_footer.png";}
			 
		}
		
		
	}

	if (showAlter) {
		fc_width = (cur_width - _hspace) * (dayCount+2 - (dayCount+2)%3) / 3;
		cur_height = 146;
		background_picture = "back_enchanged_wide.png";
		var backforecastpicture = "back_forecast_wide";
		fc1_left = cur_width - _hspace;
		fc2_left = cur_width - _hspace + 127;
		fc3_left = cur_width - _hspace + 127*2;
	}
	else {
		if (!showCurrent) fc_width = 129;
		fc_height = dayCount * 47;
		fc1_top = cur_height;
		fc2_top = cur_height + 141;
		fc3_top = cur_height + 141*2;
		var backforecastpicture = "back_forecast_footer";
	}
	

	
	
	for (var i = 1; i <= dayCount; i++) {
		document.getElementById("day" + i).style.display="block";
		document.getElementById("day" + i).style.background="transparent url(" + imgPath + backforecastpicture +".png" + ")";
		if (showAlter) document.getElementById("day" + i).style.height = 53 + "px";
	}
	
	for (var i = dayCount + 1; i <= 9; i++) {
		document.getElementById("day" + i).style.display = "none";
		}
	
		


	var _width = cur_width + fc_width;

	if (dayCount > 0) fc_height = fc_height + 2;
	var _height = cur_height + fc_height;	


	forecastholder1.style.left = fc1_left.toString() + "px";
	forecastholder1.style.top = fc1_top.toString() + "px";
	forecastholder2.style.left = fc2_left.toString() + "px";
	forecastholder2.style.top = fc2_top.toString() + "px";
	forecastholder3.style.left = fc3_left.toString() + "px";
	forecastholder3.style.top = fc3_top.toString() + "px";
	


	with (document.body.style)
		height = _height.toString() + "px",
		width = _width.toString() + "px";

	backgroundimage.src = imgPath + background_picture;




if (System.Gadget.Settings.read("changeSkin") == 1) {
	if (!System.Gadget.Settings.read("MaxSkin")) SkinFolderCounter();
	var CurrentSkin = System.Gadget.Settings.read('Skin');
	var CurrentSkinNumber = CurrentSkin.substring(CurrentSkin.indexOf("skin") + 4, CurrentSkin.lengh);
	if (CurrentSkinNumber >= System.Gadget.Settings.read("MaxSkin")) CurrentSkinNumber = 1;
	else CurrentSkinNumber++;
	System.Gadget.Settings.write("Skin", "skin" + CurrentSkinNumber);
}


	//with (bg.style)
		//height = cur_height.toString() + "px",
		//width = cur_width.toString() + "px";

	//with (bgC.style)
		//height = (cur_height).toString()+"px",
		//width = (cur_width).toString()+"px",
		//background = "transparent url(" + imgPath + background_picture + ")";
	
}



////////////////////

function checkDayorNight(when, sunrise, sunset, current) {

	if (when.length < 6) mc = Date24ToMinutesConvert(when);
	else mc = DateToMinutesConvert(when);
	if (sunrise.length < 6) risemc = Date24ToMinutesConvert(sunrise);
	else risemc = DateToMinutesConvert(sunrise);
	if (sunrise.length < 6) setmc = Date24ToMinutesConvert(sunset);
	else setmc = DateToMinutesConvert(sunset);
	
	setmc = setmc - 10;
		
	if (risemc <= mc && mc <= setmc)
		daytime = "Day";
	else
		{daytime = "Night"; daytime_back = ""; currentImgMoon.style.display = "block";}

	if (daytime == "Day") 
	{
		
		if (current == "Clear" || current.search(/Sunny/i) > -1 || current == "Mostly Sunny" || current == "Fair" || current == "Fair and Windy" || current == "Dust" || current == "Ice Crystals" || current.search(/Partly Cloudy/i) > -1 || current == "Partly Sunny" || current == "Mostly Cloudy" || current == "Scattered Clouds" || current.search(/few/i) > -1)
			{
				daytime_back = "blue";
			}
		else
			{
				daytime_back = "grey";
			}
		currentImg.style.display = "block";
		currentImgMoon.style.display = "none";
	}
		
}


////////////////////

function toggleMode(mode) {
	if (NoInetConnectionFlag == 1) return;
	if (System.Gadget.Settings.read("showMiniMode") == "1") {
		System.Gadget.Settings.write("showMiniMode", "0"); }
	else {
		System.Gadget.Settings.write("showMiniMode", "1"); }
	WritefcDays();
	redrawGadget();
}

function incFCDays()
{
	if (NoInetConnectionFlag == 1) return;
	var dayCount = System.Gadget.Settings.read("fcDays");
	if (dayCount < totalFCDays) dayCount++;
	if (dayCount == totalFCDays) buttonDown.style.display = "none";
	buttonUp.style.display = "block";
	System.Gadget.Settings.write("fcDays", dayCount);
	WritefcDays();
	redrawGadget();
}

function decFCDays()
{
	if (NoInetConnectionFlag == 1) return;
	var dayCount = System.Gadget.Settings.read("fcDays");
	if (dayCount > 0) dayCount--;
	if (dayCount == 0) buttonUp.style.display = "none";
	buttonDown.style.display = "block";
	System.Gadget.Settings.write("fcDays", dayCount);
	WritefcDays();
	redrawGadget();
}

function refreshData() {
//	if (window.event.ctrlKey)
	getForecastData();
}




function setLocation(location)
{
	var delimPos = location.indexOf(", ");
	var locCountry = location.substring(delimPos + 2, location.length);
	if (lng_Countries[locCountry] != undefined)
		locCountry = lng_Countries[locCountry]; 

	var locCity = location.slice(0, delimPos);
	locCity = locCity.replace("’", "'");
	if (lng_Cities[locCity] != undefined)
		locCity = lng_Cities[locCity]; 

	var locText;
	if (System.Gadget.Settings.read("noCountry"))
		locText = locCity;
	else
		locText = locCity + ", " + locCountry;

	CityNameSpan.innerText = locText;

	var fontSize = Math.round(118 / locText.length * 1.72);
	if (fontSize > 20) fontSize = 20;
	if (fontSize < 11) fontSize = 11;
	var textTop = 69 - fontSize;
	CityNameSpan.style.fontSize = fontSize.toString() + "px";
	CityNameSpan.style.top = textTop.toString() + "px";
	
	if (locText.length > 18)
		CityNameSpan.innerText = locText.slice(0,18) + "..";	
}


function DateToMinutesConvert(timeparametr)
{	
	var hour = timeparametr.slice(0, timeparametr.indexOf(":")) - 0;
	var min = timeparametr.slice(timeparametr.indexOf(":") + 1, timeparametr.length-3) - 0;
	var ampm = timeparametr.slice(timeparametr.length - 2, timeparametr.length);
	if (ampm == "PM" && hour!=12) hour += 12;
	if (ampm == "AM" && hour==12) hour = 0;
	var mcc = hour*60 + min*1;
	return mcc;
}


function Date24ToMinutesConvert(timeparametr)
{	
	var hour = timeparametr.slice(0, timeparametr.indexOf(":"));
	var min = timeparametr.slice(timeparametr.indexOf(":") + 1, timeparametr.length);
	var mcc = hour*60 + min*1;
	return mcc;
}


function TimeTo24Convert(timeparametr)
{	
	var hour = timeparametr.slice(0, timeparametr.indexOf(":"));
	var min = timeparametr.slice(timeparametr.indexOf(":") + 1, timeparametr.indexOf(":") + 3);
	var ampm = timeparametr.slice(timeparametr.length - 2, timeparametr.length);
	if (ampm == "PM" && hour!=12) hour = hour*1 + 12;
	if (ampm == "AM" && hour==12) hour = "00";
	if (hour.length == 1) hour = "0" + hour;
	var time24 = hour +":" + min;
	return time24;
}

function MinutesToTime24Convert(timeminutes)
{	
	var hour = parseInt(timeminutes / 60);
	var min = timeminutes - hour*60;
	if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
	var time24 = hour +":" + min;
	return time24;
}

function NoInetConnection()
{	
	if(NoInetConnectionFlag == 0)	
	{
		NoInetConnectionSpan.innerHTML = lng_NoData;
		NoInetConnectionFlag = 1;

		if (System.Gadget.Settings.read('showWeatherAfterRestart') == 1) {
			NoInetConnectionSpan.innerText = "";
			NoInetConnectionFlag = 2;
			
			var fs = new ActiveXObject("Scripting.FileSystemObject");
			var ts = fs.OpenTextFile(System.Gadget.path + "/tempdata_" + System.Gadget.Settings.read('showWeatherAfterRestartTempData'), 1);
			var tempdata = ts.ReadAll();
			ts.Close();

			var SourceOfUpdates = System.Gadget.Settings.read('SourceOfUpdates');
			if (SourceOfUpdates == "weatherchannel") parseForecastWeatherChannel(tempdata);
			if (SourceOfUpdates == "accuweather") parseForecastAccuWeather(tempdata);
			if (SourceOfUpdates == "wunderground") {
				var tempdatasplit = tempdata.split('!!!!!');
				parseForecastWunderground(tempdatasplit[0],tempdatasplit[1]);
			}
			if (SourceOfUpdates == "msn") parseForecastMSN(TextToXml(tempdata));
			if (SourceOfUpdates == "weathereye") parseForecastWeatherEye(TextToXml(tempdata));
			if (SourceOfUpdates == "weatherbug") {
				var tempdatasplit = tempdata.split('!!!!!');
				parseForecastWeatherBug(tempdatasplit[0],tempdatasplit[1]);
			}
			if (SourceOfUpdates == "yandex") parseForecastYandex(TextToXml(decodeURIComponent(tempdata)));
			if (SourceOfUpdates == "gismeteo") parseForecastGismeteo(TextToXml(decodeURIComponent(tempdata)));
			if (SourceOfUpdates == "noaa") {
				var tempdatasplit = tempdata.split('!!!!!');
				parseForecastNOAA(tempdatasplit[0],tempdatasplit[1]);
			}
			if (SourceOfUpdates == "meteonova") parseForecastMeteonova(TextToXml(tempdata));
		}

	}

	if(NoInetConnectionFlag == 2)
	{
		TimeLastUpdate.innerHTML = lng_NoData;
	}

updateBar.style.display = "none";

clearTimeout(updateTimer);
updateTimer = self.setTimeout('getForecastData();', 1000*60*2);
	
}


function InetConnectionIsOK(tempdata)
{
	NoInetConnectionSpan.innerText = "";
	NoInetConnectionFlag = 2;

	if (System.Gadget.Settings.read('showWeatherAfterRestart') == 1) {
		if (!System.Gadget.Settings.read('showWeatherAfterRestartTempData')) System.Gadget.Settings.write('showWeatherAfterRestartTempData', Math.round(Math.random() * 10000));

		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var FileObject = fso.OpenTextFile(System.Gadget.path + "/tempdata_" + System.Gadget.Settings.read('showWeatherAfterRestartTempData'), 2, true, 0);
		if (tempdata.indexOf("utf-8") > -1) tempdata = encodeURIComponent(tempdata);
		FileObject.write(tempdata);
		FileObject.close();
	}
}


function MakeTempProfile(source)
{	
	System.Gadget.Settings.write("locationCode", System.Gadget.Settings.read(source+'locationCode'));
	System.Gadget.Settings.write("lastSearch", System.Gadget.Settings.read(source+'lastSearch'));
	System.Gadget.Settings.write("updateInterval", System.Gadget.Settings.read(source+'updateInterval'));
	System.Gadget.Settings.write("ShowParametersOption1", System.Gadget.Settings.read(source+'ShowParametersOption1'));
	System.Gadget.Settings.write("ShowParametersOption2", System.Gadget.Settings.read(source+'ShowParametersOption2'));
	System.Gadget.Settings.write("ShowParametersOption3", System.Gadget.Settings.read(source+'ShowParametersOption3'));
	System.Gadget.Settings.write("ShowParametersOption4", System.Gadget.Settings.read(source+'ShowParametersOption4'));
}


function openweblink()
{
	if (event.y < 78 && event.y > 54) return;

	if (SourceOfUpdates == "weatherchannel") {
		var filename = "http://www.weather.com/weather/wxdetail/" + System.Gadget.Settings.read('locationCode');
	}

	if (SourceOfUpdates == "accuweather") {
		if (System.Gadget.Settings.read("tunits") == "m") u = 1;
		if (System.Gadget.Settings.read("tunits") == "f") u = 0;
		var filename = "http://www.accuweather.com/world-forecast-current-conditions.asp?partner=forecastfox&zipcode=" + System.Gadget.Settings.read('locationCode') + "&metric=" + u;
		//var filename = "http://spotlight.accuweather.com/dyndoc/goto/spotlight/adc_qxa3504/forecastfox.gif|www.accuweather.com/us/il/moline/61265/forecast-current-conditions.asp?partner=forecastfox" + System.Gadget.Settings.read('locationCode');
	}

	if (SourceOfUpdates == "wunderground") {
		var filename = wundergroundurl;
	}

	if (SourceOfUpdates == "msn") {
		if (System.Gadget.Settings.read("tunits") == "m") u = "C";
		if (System.Gadget.Settings.read("tunits") == "f") u = "F";
		var filename = "http://weather.msn.com/local.aspx?wealocations=" + System.Gadget.Settings.read('locationCode') + "&setunit=" + u;
	}

	if (SourceOfUpdates == "weathereye") {
		if (System.Gadget.Settings.read("tunits") == "m") u = "c";
		if (System.Gadget.Settings.read("tunits") == "f") u = "f";
		var filename = "http://www.theweathernetwork.com/index.php?product=weather&placecode=" + System.Gadget.Settings.read('locationCode') + "&switchto=" + u;
	}

	if (SourceOfUpdates == "weatherbug") {
		if (System.Gadget.Settings.read("tunits") == "m") u = "1";
		if (System.Gadget.Settings.read("tunits") == "f") u = "0";
		var filename = WeatherBugURL.replace("Units=0", "Units=" + u);
	}

	if (SourceOfUpdates == "yandex") {
		var filename = "http://weather.yandex.ru/" + System.Gadget.Settings.read('locationCode') + "/";
	}

	if (SourceOfUpdates == "gismeteo") {
		var filename = "http://gismeteo.ru/towns/" + System.Gadget.Settings.read('locationCode') + ".htm";
	}

	if (SourceOfUpdates == "meteonova") {
		var filename = "http://meteonova.ru/frc/" + System.Gadget.Settings.read('locationCode') + ".htm";
	}

	if (SourceOfUpdates == "noaa") {
		LocationCode = System.Gadget.Settings.read('locationCode').split('|');
		var latitude = LocationCode[0].slice(0, LocationCode[0].indexOf(","));
		var longitude = LocationCode[0].slice(LocationCode[0].indexOf(",") + 1, LocationCode[0].length);
		var filename = "http://forecast.weather.gov/MapClick.php?textField1=" + latitude + "&textField2=" + longitude;
	}		

	window.location.href(filename);
}



function computePhaseOfMoon(Year, Month, Day)
{
    // Variable names used: J, K1, K2, K3, MM, P2, V, YY
    if (Day != 1) Day--;
    var P2 = 3.14159 * 2;
    var YY = Year - parseInt((12 - Month)/10);
    var MM = Month + 9;
    if (MM >= 12) { MM = MM-12; }
    var K1 = parseInt(365.25 * (YY+4712));
    var K2 = parseInt(30.6 * MM + .5);
    var K3 = parseInt(parseInt((YY/100) + 49) * .75) - 38;
    // J is the Julian date at 12h UT on day in question
    var J = K1+K2+Day+59;
    // Adjust for Gregorian calendar, if applicable
    if (J > 2299160) { J = J-K3; }
    // Calculate illumination (synodic) phase
    var V = (J - 2451550.1)/29.530588853;
    V = V - parseInt(V);
    // Normalize values to range from 0 to 1
    if (V<0) { V=V+1; }
    // Moon's age in days from New Moon
    var AG = V*29.53;

    switch (true)
    {
      // Each phase lasts approximately 3.28 days
      case ((AG > 27.6849270496875) || (AG <= 1.8456618033125)) :
        var retVal = 'New';
        break;
      case ((AG > 1.8456618033125) && (AG <= 5.5369854099375)) :
        var retVal = 'Waxing Crescent';
        break;
      case ((AG > 5.5369854099375) && (AG <= 9.2283090165625)) :
        var retVal = 'First Quarter';
        break;
      case ((AG > 9.2283090165625) && (AG <= 12.9196326231875)) :
        var retVal = 'Waxing Gibbous';
        break;
      case ((AG > 12.9196326231875) && (AG <= 16.6109562298125)) :
        var retVal = 'Full';
        break;
      case ((AG > 16.6109562298125) && (AG <= 20.3022798364375)) :
        var retVal = 'Waning Gibbous';
        break;
      case ((AG > 20.3022798364375) && (AG <= 23.9936034430625)) :
        var retVal = 'Last Quarter';
        break;
      case ((AG > 23.9936034430625) && (AG <= 27.6849270496875)) :
        var retVal = 'Waning Crescent';
        break;
      default :
        var retVal = 'Full';
        break;
    }
    return retVal;
}


function loadXmlDoc(url)
{
	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async = false;
	xmlDoc.load(url);
	return xmlDoc;
}


function TextToXml(temptext)
{
	var xmlDocument = new ActiveXObject('Microsoft.XMLDOM'); 
	xmlDocument.async = false; 
 	xmlDocument.loadXML(temptext);
	return xmlDocument;
}


function mousewheelForecast()
{
	if (event.wheelDelta >= 40)
		decFCDays();
	if (event.wheelDelta <= -40)
		incFCDays();
}

function GeoIPLocation()
{
	if (System.Gadget.Settings.read('SourceOfUpdates') != "weatherchannel") return;

	var locationip = "http://api.ipinfodb.com/v2/ip_query.php?key=cbc862c51d9da89e999d21406d01ce5c8dc99ceb1a1eb0730ff7ff0dda56d452&timezone=false";
	var geoipdata = loadXmlDoc(locationip);

	if (geoipdata.parseError.errorCode != 0) return;
	if (geoipdata.getElementsByTagName('City')[0].firstChild == null || geoipdata.getElementsByTagName('CountryName')[0].firstChild == null) return;


	var citybyip = geoipdata.getElementsByTagName('City')[0].firstChild.nodeValue;
	var countrybyip = geoipdata.getElementsByTagName('CountryName')[0].firstChild.nodeValue;

	
		if (countrybyip == "United States") var location = "http://gadgets.weather.com/search/search/?where=" + citybyip + ", " + geoipdata.getElementsByTagName('RegionName')[0].firstChild.nodeValue + ", " + countrybyip;
		else var location = "http://gadgets.weather.com/search/search/?where=" + citybyip + ", " + countrybyip;
		var LocationCodeData = loadXmlDoc(location);

		if (LocationCodeData.getElementsByTagName('loc')[0] == null) return;

		var LocationCode = LocationCodeData.getElementsByTagName('loc')[0].getAttribute('id');

		if (LocationCode) {
			System.Gadget.Settings.write("WlastSearch", citybyip + ", " + countrybyip);
			System.Gadget.Settings.write("WlocationCode", LocationCode);
		}
	
}


 
 


function SkinFolderCounter()
{
var SkinCounter = 0;
var myFileSysObj = new ActiveXObject("Scripting.FileSystemObject");
    var myFolder = myFileSysObj.GetFolder(System.Gadget.path + "/images");
    var myEnum = new Enumerator(myFolder.SubFolders);
    while(!myEnum.atEnd()){
	SkinCounter++;
	myEnum.moveNext();
    }
System.Gadget.Settings.write("MaxSkin", SkinCounter);
}


