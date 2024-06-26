////////////////////////////////////////////////////////////////////////////////
//
// THIS CODE IS NOT APPROVED FOR USE IN/ON ANY OTHER UI ELEMENT OR PRODUCT COMPONENT.
// Copyright (c) 2009 Microsoft Corporation. All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
var clockThemes	= new Array("trad", "system", "cronometer", "diner", "flower", "modern", "square", "novelty", "monitor");
var newPositionMinutes	= 0;
var currentPositionMinutes	= 0;
var newPositionHours	= 0;
var currentPositionHours	= 0;
var midClockNameFontHeight	= 8;
var maxClockNameWidth	= 60;
var posClockNameTop	= 75;
var clockPartsWidth;
var clockPartsHeight;
var clockPartsTop;
var clockPartsLeft;
var date;
var intervalTime;
var newTimeOut;
var clockFont;
var clockFontColor;
var clockFontSize;
////////////////////////////////////////////////////////////////////////////////
//
// load initial settings
//
////////////////////////////////////////////////////////////////////////////////
function loadMain()
{
	settingsChanged();

	System.Gadget.settingsUI = "settings.html";
	System.Gadget.onSettingsClosed = settingsClosed;
	
	System.Gadget.visibilityChanged = visibilityChanged;
	
	h.addShadow("grey", 2, 40, 2, 2);
	m.addShadow("grey", 2, 40, 2, 2);
	s.addShadow("grey", 2, 40, 2, 2);
}
////////////////////////////////////////////////////////////////////////////////
//
// set theme images
//
////////////////////////////////////////////////////////////////////////////////
function setImages()
{
    var curTheme = clockThemes[mySetting.themeID];

    var wshShell = new ActiveXObject("WScript.Shell");
    var ieVersion = wshShell.RegRead("HKLM\\SOFTWARE\\Microsoft\\Internet Explorer\\svcVersion");
    var isWin8 = (ieVersion.charAt(3) == '0');

    clockBg.src = "url(images/" + curTheme + ".png)";
    clockBg_.src = "images/" + curTheme + "_.png";
	clockBg_.style.visibility = isWin8 ? "hidden" : "visible"; 

	
	h.src = "images/" + curTheme + "_h.png";
	m.src = "images/" + curTheme + "_m.png";
	s.src = "images/" + curTheme + "_s.png";
	dot.src = "images/" + curTheme + "_dot.png";
}
////////////////////////////////////////////////////////////////////////////////
//
// calculate current time
//
////////////////////////////////////////////////////////////////////////////////
function timePerInterval()
{
	refreshDate();
	with (date)
	{
		hours = getHours();
		minutes = getMinutes();
		seconds = getSeconds();
	}
	
	var rotationHours = hours;

	if (hours > 12)
	{
		rotationHours = hours - 12;
	}
	
	h.Rotation = (rotationHours * 30) + (minutes / 2);
	m.Rotation = (minutes * 6) + (seconds / 10);
		
	if (mySetting.secondsEnabled)
	{
		s.Rotation = (seconds * 6);

		var secondOffset = secondTimeOffset();
			
		if (secondOffset > 0)
		{
			newTimeOut = setTimeout("timePerInterval()", secondOffset);
		}
		else
		{
			timePerInterval();
		}
	}
	else
	{
		var minuteOffset = minuteTimeOffset();
		
		if (minuteOffset > 0)
		{
			newTimeOut = setTimeout("timePerInterval()", minuteOffset);
		}
		else
		{
			timePerInterval();
		}
	}
}
////////////////////////////////////////////////////////////////////////////////
//
//
////////////////////////////////////////////////////////////////////////////////
function visibilityChanged()
{
	if (System.Gadget.visible)
	{
		if (!newTimeOut)
		{
			timePerInterval();
		}
	}
	else
	{
		clearTimeout(newTimeOut);
		newTimeOut = null;
	}
}
////////////////////////////////////////////////////////////////////////////////
//
// updates the tooltip with the current time
//
////////////////////////////////////////////////////////////////////////////////
function updateTooltip()
{
	refreshDate();
	highlights.title = clockTime.alt = date.toLocaleTimeString();
}
////////////////////////////////////////////////////////////////////////////////
//
// updates the date object with the current system time
//
////////////////////////////////////////////////////////////////////////////////
function refreshDate()
{
	if (mySetting.timeZoneIndex != -1 && getValidTimeZone(mySetting.timeZoneIndex) != -1)
	{
		date = new Date(System.Time.getLocalTime(zones.item(mySetting.timeZoneIndex)));
	}
	else
	{
		date = new Date(System.Time.getLocalTime(System.Time.currentTimeZone));
	}
}
////////////////////////////////////////////////////////////////////////////////
//
// settings event closed
//
////////////////////////////////////////////////////////////////////////////////
function settingsClosed(event)
{
	if (event.closeAction == event.Action.commit)
	{
		settingsChanged();
	}
}
////////////////////////////////////////////////////////////////////////////////
// 
// set clock to the new settings
//
////////////////////////////////////////////////////////////////////////////////
function settingsChanged()
{
	mySetting.load();

	if (mySetting.timeZoneIndex != -1 && zonesCount == 0)
	{
		updateTimeZones();
	}

	var topPX = 0;
	var leftPX = 0;

	clockFont = "Segoe UI, Tahoma, Sans-Serif";
	clockFontColor = "#000000";
	clockFontSize = 10;
	
	var curTheme = clockThemes[getValidThemeID(mySetting.themeID)];
	
	switch (curTheme)
	{
		case "trad":
			clockFont = "Constantia, " + clockFont;
			clockFontColor = "#2F2E2E";
			topPX += -3;
			leftPX += -1;
			maxClockNameWidth = 66;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 57;
			break;
		case "system":
			clockFont = "Arial Narrow, " + clockFont;
			clockFontColor = "#666666";
			topPX += 3;
			leftPX += 1;
			maxClockNameWidth = 72;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = 0;
			clockPartsLeft = 58;
			break;
		case "cronometer":
			clockFont = "Arial Narrow, " + clockFont;
			clockFontColor = "#FF0000";
			topPX += 6;
			maxClockNameWidth = 70;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 57;
			break;
		case "diner":
			clockFont = "Segoe Script Bold, " + clockFont;
			clockFontColor = "#D3D9E3";
			clockFontSize = 9;
			maxClockNameWidth = 56;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 58;
			break;
		case "flower":
			clockFont = "Arial Rounded MT Bold, " + clockFont;
			clockFontColor="#FE8E08";
			clockFontSize = 9;
			topPX += 2;
			leftPX += 2;
			maxClockNameWidth = 71;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = 0;
			clockPartsLeft = 59;
			break;
		case "modern":
			clockFont = "Arial Narrow, " + clockFont;
			clockFontColor = "#FFFFFF";
			topPX += 3;
			maxClockNameWidth = 74;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 58;
			break;
		case "square":
			clockFont = "Calibri, " + clockFont;
			clockFontColor = "#000000";
			clockFontSize = 9;
			maxClockNameWidth = 70;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 57;
			break;
		case "novelty":
			clockFont = "Calibri Bold, " + clockFont;
			clockFontColor = "#6dadff";
			clockFontSize = 10;
			topPX += 18;
			maxClockNameWidth = 60;
			clockPartsWidth = 7;
			clockPartsHeight = 81;
			clockPartsTop = 46;
			clockPartsLeft = 59;
			break;
		case "monitor":
			clockFont = "Arial Narrow, " + clockFont;
			clockFontColor = "#FFFFFF";
			clockFontSize = 9;
			maxClockNameWidth = 70;
			clockPartsWidth = 13;
			clockPartsHeight = 129;
			clockPartsTop = -1;
			clockPartsLeft = 57;
			break;
	}
	
	dot.style.width = h.style.width = m.style.width = s.style.width = clockPartsWidth;
	dot.style.height = h.style.height = m.style.height = s.style.height = clockPartsHeight;
	dot.style.top = h.style.top = m.style.top = s.style.top = clockPartsTop;
	dot.style.left = h.style.left = m.style.left = s.style.left = clockPartsLeft;
	
	setImages();

	with (clockNamePosition.style)
	{
		top = posClockNameTop + topPX + "px";
		left = leftPX + "px";
		visibility = "hidden";
	}
 
	if (mySetting.clockName.length > 0)
	{
		with (clockName.style)
		{
			width = maxClockNameWidth + "px";
			fontFamily = clockFont;
			color = clockFontColor;
			fontSize = clockFontSize + "pt";
		}
		
		clockName.innerText = mySetting.clockName;
		
		with (clockNamePosition.style)
		{
			top = parseInt(top) + midClockNameFontHeight - Math.floor(clockName.offsetHeight / 2) + "px";
			visibility = "visible";
		}
	}

	clearTimeout(newTimeOut);

	if (mySetting.secondsEnabled)
	{
		s.style.visibility = "visible"; 
		dot.style.visibility = "hidden"; 
	}
	else
	{
		s.style.visibility = "hidden";
		dot.style.visibility = "visible";
	}
	
	timePerInterval();
}
////////////////////////////////////////////////////////////////////////////////
//
// calculates how many milliseconds remain until the start of the next second
//
////////////////////////////////////////////////////////////////////////////////
function secondTimeOffset()
{
	return 1000 - new Date().getMilliseconds();
}
////////////////////////////////////////////////////////////////////////////////
//
// calculates how many milliseconds remain until the start of the next minute
//
////////////////////////////////////////////////////////////////////////////////
function minuteTimeOffset()
{
	var d = new Date();
	return ((60 - d.getSeconds()) * 1000) - d.getMilliseconds();
}
