//This is the translation file. All strings that have to be localized are here, except
//the gadgetdescription in gadget.xml
//When you test the translation, note that you have to restart the sidebar process
//(click on "Hide all gadgets") so that changes take effect.

var Localized = [];

Localized['Language'] = "正體中文"; //Name of language in its own language
Localized['LanguageCode'] = "zh-TW";
Localized['Translator'] = "翻譯由 Merci chao 提供"; //Put something like "Translated by Helmut Buhler" (in the language you translate to) if you want to show up in the settings menu
Localized['IsRTL'] = "0"; //arabic and hebrew set to 1
Localized['IsTranslationComplete'] = "1";
Localized['EnableChristmashat'] = "1"; //Show christmas hat in second half of december.

Localized['Name'] = "7 Sidebar"; //If english names arn't common in your language and you have a cool name in mind, feel free to change this. Don't forget to change it in gadget.xml, too.

Localized['Config'] = "7 Sidebar 設定";

Localized['ID_Orientation'] = "排列方式";
Localized['ID_Autoshow'] = "自動顯示資訊看板";
Localized['ID_AutoshowShift'] = "shift鍵按下才顯示";
Localized['ID_TopMost'] = "讓資訊看板最上層顯示";
Localized['ID_AboveWindows'] = "讓資訊看板永遠在其他視窗上方";
Localized['ID_ShowOnDesktop'] = "總是顯示資訊看板";
Localized['ID_ShowInTaskbar'] = "在通知區顯示圖示";
Localized['ID_Side'] = "位置：";
Localized['ID_Left'] = "左";
Localized['ID_Right'] = "右";
Localized['ID_MonitorText'] = "顯示器：";
Localized['ID_Monitor'] = "顯示器(&M)";
Localized['ID_AutoWidth'] = "固定寬度";

Localized['ID_Design'] = "外觀";
Localized['ID_DefaultDesign'] = "預設";
Localized['ID_Color'] = "圖片"; //use adjectives here if possible, but also watch the space
Localized['ID_Transparency'] = "浮水印";
Localized['ID_Glass'] = "圖片（套用視窗色彩）";
Localized['ID_EnableGlass'] = "黯化，不透底";

Localized['ID_WindowManager'] = "自動為所有視窗建立縮圖";
Localized['ID_HideGadgets'] = "啟用時隱藏小工具";
Localized['ID_ShowExtrabuttons'] = "顯示目前視窗的控制按鈕";
Localized['ID_AutoUpdatePreviews'] = "更新最小化視窗的縮圖";

//Remove the clipboarder files in C:\Users\User\AppData\Local\Microsoft\Windows Sidebar\Gadgets\ClipboarderDLLs
//if you want this to show up in the settings dialog
Localized['ClipTitle'] = "Clipboarder Gadget";
Localized['ClipMessage'] = "試試這個超酷的剪貼簿管理工具，絕對不會令您失望喔  ; )";
Localized['ClipUrl'] = "https://tiny.cc/clipboarder2";

Localized['ID_More'] = "更多";
Localized['ID_Website'] = "網站首頁";
Localized['ID_Feedback'] = "意見迴響";
Localized['Donate'] = "捐助";
Localized['Version'] = "版本 %i.%i (%ibit%s)";
Localized['WebsiteUrl'] = "http://tiny.cc/7sidebar2";
Localized['FeedbackUrl'] = "https://8gadgetpack.net/Feedback.php";
Localized['DonateUrl'] = "https://8gadgetpack.net/donate.html";

Localized['IDOK'] = "關閉(&C)";

Localized['ShowPreview'] = "自動建立縮圖(&P)";
Localized['ClosePreview'] = "關閉縮圖(&P)";
Localized['UpdatePreview'] = "重新整理縮圖(&E)";
Localized['TopMost'] = "最上層顯示(&W)"; //This is also used in the sidebar contextmenu and the current-window contextmenu
Localized['Opacity'] = "不透明度(&I)";
Localized['Percent20'] = "20%";
Localized['Percent40'] = "40%";
Localized['Percent60'] = "60%";
Localized['Percent80'] = "80%";
Localized['Percent100'] = "100%";
Localized['Process'] = "處理程序(&O)";
Localized['RestoreWindow'] = "還原視窗(&R)";
Localized['MinimizeWindow'] = "最小化視窗(&M)";
Localized['CloseWindow'] = "關閉視窗(&C)";

Localized['AddGadget'] = "新增小工具(&A)...";
Localized['AddGadgetTool'] = "新增小工具..."; //Without &
Localized['ShowAllGadgets'] = "將所有小工具提到最上層(&S)";
Localized['WindowManager'] = "自動為所有視窗建立縮圖(&I)";
Localized['ShowConfig'] = "設定(&E)";
Localized['CloseAll'] = "結束所有小工具(&H)";
Localized['CloseSidebar'] = "關閉 7 Sidebar(&C)";

Localized['NextPage'] = "下一頁";
Localized['PrevPage'] = "上一頁";
Localized['MinimizeCurrent'] = "最小化目前視窗";
Localized['CloseCurrent'] = "關閉目前視窗 (點擊右鍵顯示更多選項)";

Localized['AddPreviewForCurrent'] = "建立縮圖(&A)";
Localized['MuteCurrent'] = "靜音(&M)";
Localized['SuspendCurrent'] = "暫停(&S)";
Localized['ResumeCurrent'] = "恢復(&R)";
Localized['ResumeProcess'] = "恢復 %s"; //This is shown in the taskbar together with the suspended process. If grammar needs the verb after the processname, better use something like: "Resume: %s"
Localized['TerminateCurrent'] = "結束(&E)";
Localized['PriorityCurrent'] = "設置優先順序(&P)";
Localized['Priority1'] = "即時(&R)";
Localized['Priority2'] = "高(&H)";
Localized['Priority3'] = "在標準以上(&A)";
Localized['Priority4'] = "標準(&N)";
Localized['Priority5'] = "在標準以下(&B)";
Localized['Priority6'] = "低(&L)";

Localized['UpdateTitle'] = "7 Sidebar 更新";
Localized['UpdateText'] = "7 Sidebar 成功從版本 %i.%i 更新到 %i.%i。";

//New in Version 1.60:

Localized['ErrorText'] = "7 Sidebar 須要 Windows 7 或更新。";

Localized['Info'] = "關於";
Localized['ID_NoAutoWidth'] = "自動調整寬度";
Localized['ID_Skin'] = "背景";
Localized['ID_ShowTopButtons'] = "在頂端顯示按鈕";
Localized['SelectPage'] = "第 &%i 頁";

//1.70:

Localized['PMTitle'] = "Glassy CPU Monitor Gadget";
Localized['PMMessage'] = "流暢並幾乎不占用 CPU 資源地顯示 CPU 和記憶體使用率。";
Localized['PMUrl'] = "http://tiny.cc/GlassyCPUMonitor";

//2.10:
Localized['8GadgetPackIntro1'] = "不喜歡資訊看板嗎？";
Localized['8GadgetPackIntro2'] = "不用擔心！您可以先把所小工具都拖回桌面上，然後在資訊看板上面「點擊右鍵→關閉 7 Sidebar」。";

//2.20:
Localized['AlignGadgets'] = "小工具對齊方式：";
Localized['Top'] = "靠上";
Localized['Center'] = "置中";
Localized['Bottom'] = "靠下";

Localized['UpdateTextNews'] = "（如果您想升級至 Windows 10：小工具這項功能已經在 Windows 10 當中被移除，但您仍然可以使用我所創作的 <a=\"bla\">8GadgetPack</a> 來找回它。）";
Localized['UpdateTextNews2'] = "(你可以下載新版的<a=\"bla\">8GadgetPack</a>來取得所有的小工具更新和完善的支援)";

//2.30:
Localized['ShowWindowManager'] = "自動為所有視窗建立縮圖";
Localized['Peek'] = "使用 Aero Peek 預覽";

//2.70
Localized['ID_Tip'] = "秘訣: 可開多個Sidebars。{ Win+ G 切換側欄} {Tab 切換docked的小工具}。";

