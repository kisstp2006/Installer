        ��  ��                  ?  ,   U I F I L E   ��EH    0	          <duixml>
	<element resid="FlyoutPageFrame" id="atom(FlyoutPageFrame)" sheet="ModernStyle" layout="flowlayout()" padding="rect(40rp, 13rp, 40rp, 0rp)">
		<element layout="borderlayout()" width="265rp" padding="rect(0rp, 0rp, 0rp, 10rp)" layoutpos="client">
			<element layout="flowlayout(0,2,1,0)" layoutpos="left" margin="rect(0rp,0rp,10rp,0rp)" padding="rect(0rp,0rp,0rp,2rp)">
				<element id="atom(NetworkIcon)" class="DynamicSizedIcon" accrole="graphic"/>
			</element>
			<RichText id="atom(NetworkName)" class="SemiBoldText" layoutpos="left" contentalign="middleleft|endellipsis" accrole="statictext" accessible="true"/>
		</element>
		<element id="atom(PageContainer)" layout="flowlayout()">

</element>
	</element>
	<element resid="SPCPage" id="atom(SPCPage)" sheet="ModernStyle" layout="flowlayout()" width="265rp" behaviors="PVL::AnimationTrap()">
		<element id="atom(IDC_HEADER_GROUP)" layout="flowlayout()" layoutpos="top" active="pointer" padding="rect(0rp, 28rp, 0rp, 20rp)">
			<RichText class="NormalText" layoutpos="top" contentalign="wrapleft" accrole="statictext" content="resstr(18402)" accessible="true"/>
		</element>
		<element id="atom(IDC_PROGRESS_GROUP)" layout="flowlayout()" layoutpos="none" visible="false" active="pointer" padding="rect(0rp,28rp,0rp,0rp)" accessible="true">
			<ModernProgressRing id="atom(IDC_PROGRESS)" class="ProgessRing" layoutpos="left" visible="true"/>
			<RichText id="atom(IDC_CONNECTING)" contentalign="bottomleft|wrapleft" layoutpos="client" class="NormalText" content="resstr(18409)" padding="rect(10rp,0rp,0rp,0rp)" accessible="true" accrole="statictext"/>
		</element>
		<element id="atom(IDC_PROXY_CREDENTIALS_ERROR_GROUP)" layout="flowlayout()" layoutpos="none" visible="false" active="pointer" padding="rect(0rp,0rp,0rp,5rp)" accessible="true">
			<RichText id="atom(IDC_PROXY_CREDENTIALS_ERROR)" class="ErrorText" content="resstr(18406)" layoutpos="top" contentalign="wrapleft" accrole="statictext" accessible="true"/>
		</element>
		<element id="atom(IDC_PROXY_CREDENTIALS_GROUP)" layout="flowlayout()" layoutpos="top" visible="true" active="pointer" accessible="true">
			<element layout="flowlayout()" layoutpos="top" active="pointer" margin="rect(0rp,15rp,0rp,0rp)" accessible="true">
				<touchedit2 id="atom(IDC_PROXY_CREDENTIALS_USERNAME)" PromptText="resstr(18403)" PromptWithCaret="true" layoutpos="top" accessible="true" behaviors="Windows.UI.Popups::TouchEditContextMenu()"/>
			</element>
			<element layout="flowlayout()" active="pointer" padding="rect(0rp,20rp,0rp,4rp)" layoutpos="top" accessible="true">
				<touchedit2 id="atom(IDC_PROXY_CREDENTIALS_PASSWORD)" PromptText="resstr(18404)" PromptWithCaret="true" layoutpos="top" passwordcharacter="9679" accessible="true" behaviors="Windows.UI.Popups::TouchEditContextMenu()"/>
			</element>
			<element layout="flowlayout()" active="pointer" padding="rect(0rp,10rp,0rp,4rp)" layoutpos="top" accessible="true">
				<RichText id="atom(IDC_PROXY_CREDENTIALS_HOST_NAME)" class="NormalText" layoutpos="top" contentalign="wrapleft" accrole="statictext" accessible="true"/>
			</element>
		</element>
		<element id="atom(IDC_COMMAND_BUTTON_GROUP)" layout="flowlayout(1,0,1,0)" padding="rect(0rp, 30rp, 0rp, 12rp)" layoutPos="top" contentalign="topright" active="pointer">
			<TouchButton id="atom(IDC_TOUCH_BUTTON_OK)" margin="rect(0rp,0rp,20rp,0rp)" class="default" handleenter="true" shortcut="auto" active="keyboard|mouse|pointer" accrole="pushbutton" accessible="true" content="resstr(18407)"/>
			<TouchButton id="atom(IDC_TOUCH_BUTTON_CANCEL)" handleenter="true" shortcut="auto" active="keyboard|mouse|pointer" accrole="pushbutton" accessible="true" content="resstr(18408)"/>
		</element>
	</element>
	<stylesheets>
		<style resid="ModernStyle" base="ressheet(ImmersiveStyles, library(Windows.UI.Immersive.dll), Dark)">
			<RichText constrainlayout="narrow"/>
			<if class="SemiBoldText">
				<RichText foreground="buttontext" font="resstr(18420)"/>
			</if>
			<if class="NormalText">
				<RichText foreground="buttontext" font="resstr(18421)"/>
			</if>
			<if class="ErrorText">
				<RichText foreground="themeable(gtc(DragDrop, 5, 0, 3803))" font="resstr(18421)"/>
			</if>
			<if class="ProgessRing">
				<ModernProgressRing foreground="buttontext" height="20rp" width="20rp"/>
			</if>
		</style>
	</stylesheets>
</duixml>
 