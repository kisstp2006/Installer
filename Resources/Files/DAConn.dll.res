        ��  ��                  w  ,   U I F I L E   ���    0	          <duixml>

<element resid="PreCFEPage"

id="atom(PreCFE)"

sheet="ModernStyle"

layout="borderlayout()"

layoutpos="top"

active="pointer"

margin="rect(0rp,20rp,0rp,0rp)"

accessible="true"

accrole="grouping">

<RichText

id="atom(ProblemText)"

class="ContentText"

layoutpos="top"

active="pointer"

margin="rect(0rp,0rp,0rp,20rp)"

ContentAlign="WrapLeft"

accrole="statictext"

accessible="true"

/>

<touchbutton

id="atom(ConnectButton)"

layoutpos="right"

content="resstr(650)"

accname="resstr(655)"

class="default"

selected="true"

shortcut="auto"

accrole="pushbutton"

accessible="true"

/>

<touchbutton

id="atom(DisconnectButton)"

layoutpos="right"

content="resstr(660)"

accname="resstr(665)"

class="default"

selected="true"

shortcut="auto"

accrole="pushbutton"

accessible="true"

/>

<touchbutton

id="atom(ContinueButton)"

layoutpos="right"

content="resstr(670)"

accname="resstr(675)"

class="default"

selected="true"

shortcut="auto"

accrole="pushbutton"

accessible="true"

/>

</element>

<element resid="Disconnect Info Page"

id="atom(DisconnectInfoPage)"

sheet="ModernStyle"

layout="flowlayout()"

active="pointer"

accessible="true"

width="265rp">

<element

layout="Borderlayout()"

layoutpos="top"

active="pointer"

accessible="true">

<RichText

id="atom(InfoText)"

layoutpos="top"

active="pointer"

contentalign="wrapleft"

padding="rect(0rp,40rp,0rp,0rp)"

accrole="statictext"

accessible="true"

/>

<touchcheckbox

id="atom(HideDisconnectMessageCheckBox)"

content="resstr(603)"

accname="resstr(604)"

shortcut="auto"

margin="rect(0rp,20rp,0rp,0rp)"

accrole="checkbutton"

accessible="true"

/>

</element>

</element>

<stylesheets>

<style resid="ModernStyle" base="ressheet(ImmersiveStyles, library(Windows.UI.Immersive.dll), Dark)">

<RichText constrainlayout="narrow"/>

<if class="ContentText">

<RichText

foreground="ImmersiveSaturatedSelectionSecondaryText"

/>

</if>

</style>

</stylesheets>

</duixml>

 