//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////



function parseForecastWeatherBug(Xml,ForecastXml)
{
	var parametrsArray = [{"name":"nothing", "capt":"", "span":""}]


	//var locName = Xml.substring(Xml.indexOf(">", Xml.indexOf("<aws:city-state") + 16) + 1, Xml.indexOf("</aws:city-state>"));
	var locName = System.Gadget.Settings.read("WBlastSearch");
	setLocation(locName);

	
	var current = Xml.substring(Xml.indexOf(">", Xml.indexOf("<aws:current-condition") + 23) + 1, Xml.indexOf("</aws:current-condition>"));
	if (current.indexOf("Chance of Storms") > -1) current = "T-Storms";

	
	//var currentTime = new Date();
	//time = currentTime.getHours() +":" + currentTime.getMinutes();
	

	var sunriseTm_str = Xml.substring(Xml.indexOf("<aws:sunrise>") + 13, Xml.indexOf("</aws:sunrise>"));
	var sunriseTmH = sunriseTm_str.substring(sunriseTm_str.indexOf("hour-24=") + 9, sunriseTm_str.indexOf('"', sunriseTm_str.indexOf("hour-24=") + 9));
	var sunriseTmM = sunriseTm_str.substring(sunriseTm_str.indexOf("<aws:minute number=") + 20, sunriseTm_str.indexOf('"', sunriseTm_str.indexOf("<aws:minute number=") + 20));
	var sunriseTm = sunriseTmH + ":" + sunriseTmM;
	SunriseCapt = lng_Stats["sunrise"];
	SunriseSpan = sunriseTm;
	if (sunriseTm_str == 'N/A') SunriseSpan = lng_nodata;
	parametrsArray.push({"name":"sunrise", "capt":SunriseCapt, "span":SunriseSpan});


	var sunsetTm_str = Xml.substring(Xml.indexOf("<aws:sunset>") + 12, Xml.indexOf("</aws:sunset>"));
	var sunsetTmH = sunsetTm_str.substring(sunsetTm_str.indexOf("hour-24=") + 9, sunsetTm_str.indexOf('"', sunsetTm_str.indexOf("hour-24=") + 9));
	var sunsetTmM = sunsetTm_str.substring(sunsetTm_str.indexOf("<aws:minute number=") + 20, sunsetTm_str.indexOf('"', sunsetTm_str.indexOf("<aws:minute number=") + 20));
	var sunsetTm = sunsetTmH + ":" + sunsetTmM;
	SunsetCapt = lng_Stats["sunset"];
	SunsetSpan = sunsetTm;
	if (sunsetTm == sunsetTm_str) SunsetSpan = lng_nodata;
	parametrsArray.push({"name":"sunset", "capt":SunsetCapt, "span":SunsetSpan});
	
	
	var timeupdate_str = Xml.substring(Xml.indexOf("<aws:ob-date>") + 13, Xml.indexOf("</aws:ob-date>"));					//time last update
	var timeupdateH = timeupdate_str.substring(timeupdate_str.indexOf("hour-24=") + 9, timeupdate_str.indexOf('"', timeupdate_str.indexOf("hour-24=") + 9));
	var timeupdateM = timeupdate_str.substring(timeupdate_str.indexOf("<aws:minute number=") + 20, timeupdate_str.indexOf('"', timeupdate_str.indexOf("<aws:minute number=") + 20));
	timeupdateDay_str = timeupdate_str.substring(timeupdate_str.indexOf("<aws:day number=") + 17, timeupdate_str.indexOf('" abbrv=', timeupdate_str.indexOf("<aws:day number=") + 17));
	timeupdateDay = timeupdateDay_str.substring(timeupdateDay_str.indexOf('text="') + 6, timeupdateDay_str.length);
	lasttimeupdate24full = timeupdateH + ":" + timeupdateM;
	if ((System.Gadget.Settings.read("showLastTimeUpdate")) != 1) TimeLastUpdate.innerText = "";
	else TimeLastUpdate.innerText = lasttimeupdate24full;
	

	checkDayorNight(lasttimeupdate24full, sunriseTm, sunsetTm, current);


	var temp = Xml.substring(Xml.indexOf('<aws:temp units="&amp;deg;C">') + 29, Xml.indexOf('</aws:temp>'));		//actual temperature
	if (System.Gadget.Settings.read("tunits") == "m") {temp = (temp*1).toFixed(0); var TemperatureUnits = "C";}
	if (System.Gadget.Settings.read("tunits") == "f") {temp = (temp*(9/5) + 32).toFixed(0); var TemperatureUnits = "F";}
	if (temp == 'N/A') TempSpan.innerText = lng_nodata;
	else TempSpan.innerText = temp + "°" + lng_Units[TemperatureUnits];



	var flik = Xml.substring(Xml.indexOf('<aws:feels-like units="&amp;deg;C">') + 35, Xml.indexOf('</aws:feels-like>'));	//feels like temperature
	if (System.Gadget.Settings.read("tunits") == "m") {flik = (flik*1).toFixed(0);}
	if (System.Gadget.Settings.read("tunits") == "f") {flik = (flik*(9/5) + 32).toFixed(0);}
	FlikCapt = lng_Stats["flik"];
	FlikSpan = flik + "°" + lng_Units[TemperatureUnits];
	if (flik == 'N/A') FlikSpan = lng_nodata;
	parametrsArray.push({"name":"flik", "capt":FlikCapt, "span":FlikSpan});


	var pressure = Xml.substring(Xml.indexOf('<aws:pressure units="mb">') + 25, Xml.indexOf('</aws:pressure>'));
	if (System.Gadget.Settings.read("punits") == "mm") {pressure = (pressure * 0.750062).toFixed(0); var PressureUnits = "mm";}
	if (System.Gadget.Settings.read("punits") == "mb") {pressure = (pressure * 1).toFixed(1); var PressureUnits = "mb";}
	if (System.Gadget.Settings.read("punits") == "in") {pressure = (pressure * 0.02952998).toFixed(2); var PressureUnits = "in";}
	if (System.Gadget.Settings.read("punits") == "kpa") {pressure = (pressure/10).toFixed(2); var PressureUnits = "kPa";}
	PressureCapt = lng_Stats["pressure"];
	PressureSpan = pressure + lng_Units[PressureUnits];
	if (pressure == 'N/A' || pressure == 'NaN') PressureSpan = lng_nodata;
	parametrsArray.push({"name":"pressure", "capt":PressureCapt, "span":PressureSpan});


	
	var wind = Xml.substring(Xml.indexOf('<aws:wind-speed units="km/h">') + 29, Xml.indexOf('</aws:wind-speed>'));
	if (System.Gadget.Settings.read("sunits") == "ms") {windSpeed = (wind*0.277777778).toFixed(0); var SpeedUnits = "m/s";}
	if (System.Gadget.Settings.read("sunits") == "km") {windSpeed = wind; var SpeedUnits = "km/h";}
	if (System.Gadget.Settings.read("sunits") == "mp") {windSpeed = (wind*0.621371192).toFixed(0); var SpeedUnits = "mph";}

	var windDirection = Xml.substring(Xml.indexOf('<aws:wind-direction>') + 20, Xml.indexOf('</aws:wind-direction>'));
	var WindDirectionSpan = winddirection_Stats[windDirection];
	
	WindCapt = lng_Stats["wind"] + "[" + WindDirectionSpan + "]";
	WindSpan = windSpeed + lng_Units[SpeedUnits];
	if (wind == 'N/A' || wind == 'NaN') WindSpan = lng_nodata;
	parametrsArray.push({"name":"wind", "capt":WindCapt, "span":WindSpan});


	var humidity = Xml.substring(Xml.indexOf('<aws:humidity units="%">') + 24, Xml.indexOf('</aws:humidity>'));
	HumidityCapt = lng_Stats["humidity"];
	HumiditySpan = humidity + "%";
	if (humidity == 'N/A') HumiditySpan = lng_nodata;
	parametrsArray.push({"name":"humidity", "capt":HumidityCapt, "span":HumiditySpan});

	
	var dewpoint = Xml.substring(Xml.indexOf('<aws:dew-point units="&amp;deg;C">') + 34, Xml.indexOf('</aws:dew-point>'));	//dewpoint
	dewpoint = (dewpoint*1).toFixed(0);
	DewpCapt = lng_Stats["dewpoint"];
	DewpSpan = dewpoint + "°" + lng_Units[TemperatureUnits];
	if (dewpoint == 'N/A') DewpSpan = lng_nodata;
	parametrsArray.push({"name":"dewpoint", "capt":DewpCapt, "span":DewpSpan});



	var windGust = Xml.substring(Xml.indexOf('<aws:gust-speed units="km/h">') + 29, Xml.indexOf('</aws:gust-speed>'));
	if (System.Gadget.Settings.read("sunits") == "ms") {windGust = (windGust*0.277777778).toFixed(0);}
	if (System.Gadget.Settings.read("sunits") == "km") {windGust = windGust;}
	if (System.Gadget.Settings.read("sunits") == "mp") {windGust = (windGust*0.621371192).toFixed(0);}
	GustCapt = lng_Stats["gust"];
	GustSpan = windGust + lng_Units[SpeedUnits];
	parametrsArray.push({"name":"gust", "capt":GustCapt, "span":GustSpan});

	
		
	var latitude = Xml.substring(Xml.indexOf('<aws:latitude>') + 14, Xml.indexOf('</aws:latitude>'));	//latitude
	LatitudeCapt = lng_Stats["latitude"];
	LatitudeSpan = (latitude*1).toFixed(2);
	if (latitude == 'N/A') LatitudeSpan = lng_nodata;
	parametrsArray.push({"name":"latitude", "capt":LatitudeCapt, "span":LatitudeSpan});



	var longitude = Xml.substring(Xml.indexOf('<aws:longitude>') + 15, Xml.indexOf('</aws:longitude>'));	//longitude
	LongitudeCapt = lng_Stats["longitude"];
	LongitudeSpan = (longitude*1).toFixed(2);
	if (longitude == 'N/A') LongitudeSpan = lng_nodata;
	parametrsArray.push({"name":"longitude", "capt":LongitudeCapt, "span":LongitudeSpan});


	var precipitation = Xml.substring(Xml.indexOf('<aws:rain-today units="mm">') + 27, Xml.indexOf('</aws:rain-today>'));
	PrecipitationCapt = lng_Stats["precipitation"];
	PrecipitationSpan = precipitation + "mm";
	if (precipitation == 'NA') PrecipitationSpan = lng_nodata;
	parametrsArray.push({"name":"precipitation", "capt":PrecipitationCapt, "span":PrecipitationSpan});


	WeatherBugURL = Xml.substring(Xml.indexOf('<aws:WebURL>') + 12, Xml.indexOf('</aws:WebURL>'));

	
	setOptionsSettings(parametrsArray);


	currentImg.src = "images/" + System.Gadget.Settings.read('Skin') + "/" + daytime + "/" + WBGetCondImage(current);
	if (daytime == "Night" && current.search(/Sunny/i) > -1) {currentImg.src = "images/" + System.Gadget.Settings.read('Skin') + "/" + daytime + "/" + "clear.png"; img = "clear.png";}

	if (daytime == "Night" && (img == "partcloudy.png" || img == "cloudy.png" || img == "mostcloudy.png" || img == "clear.png")) {

	var moon_img = {
		New: "new.png",
		"Waxing Crescent": "waxing_crescent.png",
		"First Quarter": "first_quater.png",
		"Waxing Gibbous": "waxing_gibbous.png",
		Full: "full.png",
		"Waning Gibbous": "waning_gibbous.png",
		"Last Quarter": "last_quater.png",
		"Waning Crescent": "waning_crescent.png",
		Darkened: "new.png"
		};

		var moonphase = computePhaseOfMoon(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
		currentImgMoon.src = "images/" + System.Gadget.Settings.read('Skin') + "/Night/moon/" + moon_img[moonphase];
		if (img != "clear.png") {currentImg.style.display = "block";}
		else currentImg.style.display = "none";
	}
	else currentImgMoon.style.display = "none";

	if (current.indexOf(" ", current.length - 1) > -1) current = current.substring(0, current.length - 1);
	if (lng_WeatherBugStatus[current] != undefined) current = lng_WeatherBugStatus[current];
		while (current.length > 19) {
	 		current = current.slice(0, current.lastIndexOf(" "));
			lastsymbol = current.substring(current.lastIndexOf(" ") + 1, current.length);
			if (lastsymbol.length == 1 || lastsymbol == 'and') current = current.slice(0, current.lastIndexOf(" "));
		}
	



	//alert module
	var LocationCode = System.Gadget.Settings.read('locationCode');
	LocationCode = LocationCode.split('|');
	if ((LocationCode[0]).indexOf('u') > -1) LocationCode[0] = (LocationCode[0]).slice(1);
	var alertData = loadXmlDoc("http://datafeed.weatherbug.com/GetXML.aspx?RequestType=6&PartnerId=0eb57a3e-1462-4e61-bd79-bea5ca004c9f&ZipCode=" + LocationCode[0] + "&rnd=" + Math.random());
	var alerts = alertData.getElementsByTagName("./aws:alert");
	if (alerts.length > 0 && (CondSpan.innerHTML).search(/<MARQUEE/i) == -1)
			{
				var msgalert = "";
				for (var alert_index = 0; alert_index < alerts.length; alert_index++)
				msgalert += alerts[alert_index].getElementsByTagName("./aws:type")[0].firstChild.nodeValue + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				CondSpan.innerHTML = "<MARQUEE WIDTH='115' SCROLLDELAY='70' SCROLLAMOUNT='2'><font color='red'><b>" + msgalert + "</b></font></MARQUEE>";
			}
	else CondSpan.innerText = current;




	updateBar.style.display = "none";
	
	WBFillForecast(ForecastXml);

	

	
	redrawGadget();
		
}




////////////////////////




function WBGetCondImage(condition)
{
	img="undefined.png";

	if ((condition.search(/Cloudy/i) > -1) || (condition.search(/Clouds/i) > -1))
		img="cloudy.png";

	if (condition.search(/Rain/i) > -1)
		img="rain.png";

	if (condition.search(/Hail/i) > -1)
		img="hail.png";

	if ((condition.search(/Sunny/i) > -1) || (condition.search(/Clear/i) > -1) || (condition.search(/Very Cold/i) > -1) || (condition.search(/Very Hot/i) > -1))
		img="clear.png";

	if ((condition.search(/Mostly Sunny/i) > -1 || condition.search(/Partly Sunny/i) > -1))
		img="mostsunny.png";

	if (condition.search(/Dust/i) > -1)
		img="dusthaze.png";

	if ((condition.search(/Fog/i) > -1) || (condition.search(/Mist/i) > -1) || (condition.search(/Haze/i) > -1) || (condition.search(/Hazy/i) > -1))
		img="fog.png";

	if (condition.search(/Smoke/i) > -1)
		img="smoke.png";

	if (condition.search(/Snow/i) > -1)
		img="snow.png";

	if ((condition.search(/Thunder/i) > -1) || (condition.search(/T-Storm/i) > -1) || (condition.search(/Storms/i) > -1))
		img="thunderstorm.png";

	if ((condition.search(/Partly Cloudy/i) > -1) || (condition.search(/Fair/i) > -1))
		img="partcloudy.png";

	if (condition.search(/Mostly Cloudy/i) > -1)
		img="mostcloudy.png";

	if ((condition.search(/Light Rain/i) > -1) || (condition.search(/Shower/i) > -1) || (condition.search(/Showers/i) > -1) || (condition.search(/Drizzle/i) > -1))
		img="lightrain.png";

	if ((condition.search(/Sleet/i) > -1) || (condition.search(/Snow/i) > -1) && ((condition.search(/Rain/i) > -1) || (condition.search(/Shower/i) > -1)) || (condition.search(/Frozen/i) > -1))
		img="rainandsnow.png";
	
	if ((condition.search(/Snow/i) > -1) && (condition.search(/Light/i) > -1) || (condition.search(/Flurry/i) > -1) || (condition.search(/Flurries/i) > -1) || (condition.search(/Ice Crystals/i) > -1))
		img="lightsnow.png";

	if (condition.search(/Windy/i) > -1)
		img="wind.png";

	return img;
}




///////////////////////




function WBFillForecast(XmlData)
{

var lng_Number_Month = {
	1: "Jan",
	2: "Feb",
	3: "Mar",
	4: "Apr",
	5: "May",
	6: "Jun",
	7: "Jul",
	8: "Aug",
	9: "Sep",
	10: "Oct",
	11: "Nov",
	12: "Dec"};


	var n = 0;
	totalFCDays = 0;

	XmlData=XmlData.split('<aws:forecast>');

	if (XmlData.length == 1) System.Gadget.Settings.write("fcDays", 0);
	

	for (var i = 1; (i+1) < XmlData.length; i++) {
		if ((System.Gadget.Settings.read("showForecastToday")) != 1 || (DateToMinutesConvert(lasttimeupdate24full) >= 900 && timeupdateDay == XmlData[1].substring(XmlData[1].indexOf('<aws:description>') + 17, XmlData[1].indexOf('</aws:description>'))))
			{
				if (i == 1) n++;
				var dayData = XmlData[i+1];
				if (System.Gadget.Settings.read("showDayNameForecast") == 0) dayName1.innerText = lng_Tomorrow;
			}
 		else
			{
				var dayData = XmlData[i];
				if (System.Gadget.Settings.read("showDayNameForecast") == 0) {
					dayName1.innerText = lng_Today;
					dayName2.innerText = lng_Tomorrow;
				}
			}


		var high = dayData.substring(dayData.indexOf('<aws:high units="°C">') + 21, dayData.indexOf('</aws:high>'));
		var low = dayData.substring(dayData.indexOf('<aws:low units="°C">') + 20, dayData.indexOf('</aws:low>'));
		if (System.Gadget.Settings.read("tunits") == "f") {high = (high*(9/5) + 32).toFixed(0); low = (low*(9/5) + 32).toFixed(0);}
		
		if (high != "N/A" && high != "9999")
			high+="°";
		else	high = "??°";
		if (low != "N/A" && low != "9999")
			low +="°";
		else	low = "??°";

		var day = dayData.substring(dayData.indexOf('<aws:description>') + 17, dayData.indexOf('</aws:description>'));
		day = lng_DayOfWeek[day];

			
		var date = new Date();
		date.setDate(date.getDate()+n);
		date = date.getDate() + " " + lng_Month[lng_Number_Month[date.getMonth()+1]];

		
		var condition = dayData.substring(dayData.indexOf("<aws:short-prediction>") + 22, dayData.indexOf("</aws:short-prediction>"));
		if (condition == 'N/A' && document.getElementById("dayImg1").src) return;		
		
		document.getElementById("dayName" + i).innerText = day; 
		document.getElementById("date" + i).innerText = date;
		document.getElementById("dayHi" + i).innerText = high;
		document.getElementById("separator"  + i).innerText = "/";
		document.getElementById("dayLow" + i).innerText = low; 
		document.getElementById("dayImg" + i).src = "images/" + System.Gadget.Settings.read('Skin') + "/Forecast/" + WBGetCondImage(condition);
		if (lng_WeatherBugStatus[condition] != undefined) condition = lng_WeatherBugStatus[condition];
		if (System.Gadget.Settings.read('showFlyoutForecast') == "1") document.getElementById("dayImg" + i).alt = condition;
		totalFCDays++;
		n++;
	}

}




