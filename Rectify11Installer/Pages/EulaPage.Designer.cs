﻿namespace Rectify11Installer.Pages
{
    partial class EulaPage
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new Controls.DarkAwareLabel();
            this.richTextBox1 = new Controls.DarkAwareRichTextBox();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.Font = new System.Drawing.Font("Segoe UI Semibold", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(-3, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(301, 41);
            this.label1.TabIndex = 0;
            this.label1.Text = Strings.Rectify11.eulaTitle;
            // 
            // richTextBox1
            // 
            this.richTextBox1.BackColor = Theme.IsUsingDarkMode ? System.Drawing.Color.Black : System.Drawing.Color.White;
            this.richTextBox1.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.richTextBox1.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.richTextBox1.Location = new System.Drawing.Point(4, 45);
            this.richTextBox1.Name = "richTextBox1";
            this.richTextBox1.ReadOnly = true;
            this.richTextBox1.Size = new System.Drawing.Size(315, 290);
            this.richTextBox1.TabIndex = 1;
            this.richTextBox1.Rtf = Strings.Rectify11.eulaR11;
            // 
            // EulaPage
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Transparent;
            this.Controls.Add(this.richTextBox1);
            this.Controls.Add(this.label1);
            this.Name = "EulaPage";
            this.WizardHeader = Strings.Rectify11.eulaPageHeader;
            this.SideImage = global::Rectify11Installer.Properties.Resources.eula;
            this.ResumeLayout(false);

        }

        #endregion

        private Controls.DarkAwareLabel label1;
        private Controls.DarkAwareRichTextBox richTextBox1;
    }
}
