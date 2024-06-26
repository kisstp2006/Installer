//	Javascript file for the WeatherCenter gadget
//	(c) 2009
//	WeatherCenter Gadget Team
//	Development: hadj 
//	Graphics: Tex
//	Testing: Digital	
////////////////////////////////////////////////////////////////////////



function WeatherChannelLoadSettings()
{
	loccode.value = System.Gadget.Settings.read("WlastSearch");
	loccode_id.value = System.Gadget.Settings.read("WlocationCode");

	updateInt[0].disabled=false;
	if (System.Gadget.Settings.read("WupdateInterval") == "0") updateInt[0].checked="1";
	else {
		updateInt[1].checked="1";
		updateIntValue.value = System.Gadget.Settings.read("WupdateInterval");
	}

		
	WUnits_makeUnitSelector("ShowParametersOption1");
	WUnits_makeUnitSelector("ShowParametersOption2");
	WUnits_makeUnitSelector("ShowParametersOption3");
	WUnits_makeUnitSelector("ShowParametersOption4");
	
}



/////////////////


function WUnits_makeUnitSelector(ShowParametersOption)
{
var unitsArray = [
		{"name":lng_Stats["nothing"], "value":"nothing"},
		{"name":lng_Stats["flik"], "value":"flik"},
		{"name":lng_Stats["wind"], "value":"wind"},
		{"name":lng_Stats["humidity"], "value":"humidity"},
		{"name":lng_Stats["precipitation"], "value":"precipitation"},
		{"name":lng_Stats["pressure"], "value":"pressure"},
		{"name":lng_Stats["pressuretrend"], "value":"pressuretrend"},
		{"name":lng_Stats["visibility"], "value":"visibility"},
		{"name":lng_Stats["sunrise"], "value":"sunrise"},
		{"name":lng_Stats["sunset"], "value":"sunset"},
		{"name":lng_Stats["dewpoint"], "value":"dewpoint"},
		{"name":lng_Stats["uvindex"], "value":"uvindex"},
		{"name":lng_Stats["uvlevel"], "value":"uvlevel"},
		{"name":lng_Stats["moonterminator"], "value":"moonterminator"},
		{"name":lng_Stats["latitude"], "value":"latitude"},
		{"name":lng_Stats["longitude"], "value":"longitude"},
		{"name":lng_Stats["localtime"], "value":"localtime"}
		]


for (i = 0; i < unitsArray.length; i++)
	{
		var sel = document.getElementById(ShowParametersOption);
		var opt = document.createElement("option");
		opt.value = unitsArray[i].value;
		opt.innerHTML = unitsArray[i].name;
		if (unitsArray[i].value == System.Gadget.Settings.read("W"+ShowParametersOption)) opt.selected = true; 
		sel.appendChild(opt);
	}
} 


/////////////////



function WeatherChannelSearchCityCode(LocCode)
{
	clearResults();

	var location = "http://gadgets.weather.com/search/search/?where=" + LocCode;

	parseCityResults(loadXmlDoc(location));
}


//////////////////


function parseCityResults(xmlData)
{
	hide("load_indicator");	

	if(xmlData.parseError.errorCode != 0) {document.getElementById("loccode").value = lng_NoData; return;}
	
	var xmlLocs = xmlData.getElementsByTagName('loc');
	
		for (var i = 0; i < xmlLocs.length; i++) {
			var option = document.createElement("OPTION");
			option.value = xmlLocs[i].getAttribute('id');
			option.innerText = xmlLocs[i].firstChild.nodeValue;
			results.appendChild(option);
		}
	
}

/////////////////////

