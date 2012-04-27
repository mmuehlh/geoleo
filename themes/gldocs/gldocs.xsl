<?xml version="1.0" encoding="UTF-8"?>
<!--

	The contents of this file are subject to the license and copyright
	detailed in the LICENSE and NOTICE files at the root of the source
	tree and available online at

	http://www.dspace.org/license/

-->
<!--
	TODO: Describe this XSL file
	Author: Alexey Maslov

-->

<xsl:stylesheet xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
	xmlns:dri="http://di.tamu.edu/DRI/1.0/"
	xmlns:mets="http://www.loc.gov/METS/"
	xmlns:xlink="http://www.w3.org/TR/xlink/"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xmlns:dim="http://www.dspace.org/xmlns/dspace/dim"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:mods="http://www.loc.gov/mods/v3"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns="http://www.w3.org/1999/xhtml"
	exclude-result-prefixes="i18n dri mets xlink xsl dim xhtml mods dc">

	<xsl:import href="../dri2xhtml-alt/dri2xhtml.xsl"/>
	<xsl:import href="lib/xsl/core/global-variables.xsl"/>
	<xsl:import href="lib/xsl/core/page-structure.xsl"/>
	<xsl:import href="lib/xsl/core/navigation.xsl"/>
	<xsl:import href="lib/xsl/core/elements.xsl"/>
	<xsl:import href="lib/xsl/core/forms.xsl"/>
	<xsl:import href="lib/xsl/core/attribute-handlers.xsl"/>
	<xsl:import href="lib/xsl/core/utils.xsl"/>
	<xsl:import href="lib/xsl/aspect/general/choice-authority-control.xsl"/>
	<xsl:import href="lib/xsl/aspect/administrative/administrative.xsl"/>
	<xsl:import href="lib/xsl/aspect/artifactbrowser/item-list.xsl"/>
	<xsl:import href="lib/xsl/aspect/artifactbrowser/item-view.xsl"/>
	<xsl:import href="lib/xsl/aspect/artifactbrowser/community-list.xsl"/>
	<xsl:import href="lib/xsl/aspect/artifactbrowser/collection-list.xsl"/>
	<xsl:output indent="yes"/>
	
	<xsl:template match="dri:front-figure">
		<xsl:if test="@target">
			<a>
				<xsl:attribute name="href"><xsl:value-of select="@target"/></xsl:attribute>
				<xsl:if test="@title">
                                                <xsl:attribute name="title"><xsl:value-of select="@title"/></xsl:attribute>
                                </xsl:if>
				<xsl:if test="@frame">
                                                <xsl:attribute name="target"><xsl:value-of select="@frame"/></xsl:attribute>
                                </xsl:if>
				<img>
					<xsl:attribute name="src"><xsl:value-of select="@source"/></xsl:attribute>
					<xsl:attribute name="class"><xsl:text>cloudcarousel</xsl:text></xsl:attribute> 
					<xsl:if test="@id">
						<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
					</xsl:if>
					<xsl:if test="@alt">
                                                <xsl:attribute name="alt"><xsl:value-of select="@alt"/></xsl:attribute>
                                        </xsl:if>
				</img>
				<xsl:apply-templates />
			</a>
		</xsl:if>
		<xsl:if test="not(@target)">
			<img>
				<xsl:attribute name="src"><xsl:value-of select="@source"/></xsl:attribute>
				<!-- <xsl:attribute name="alt"><xsl:apply-templates /></xsl:attribute> -->
			</img>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="dri:button">
		<button>
			<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
			<xsl:value-of select="@text"/>
		</button>
	</xsl:template>

       <!-- ############## Customization for enable jsp-controlledVocabulary to pick up a GOK subject ############### -->

        <!-- Fieldset (instanced) field stuff, in the case of non-composites -->
    <xsl:template match="dri:field[dri:field/dri:instance | dri:params/@operations]" priority="2">
        <!-- Create the first field normally -->
        <xsl:apply-templates select="." mode="normalField"/>
        <!-- Follow it up with an ADD button if the add operation is specified. This allows
            entering more than one value for this field. -->
        <xsl:if test="contains(dri:params/@operations,'add')">
            <!-- Add buttons should be named "submit_[field]_add" so that we can ignore errors from required fields when simply adding new values-->
        
            <input type="submit" value="Add" name="{concat('submit_',@n,'_add')}" class="ds-button-field ds-add-button">
            <!-- added M.M. -->
            <xsl:if test="@n='dc_subject_gokverbal'">
                <br />
                <a>
                <xsl:attribute name="href"><xsl:text>javascript:void(null)</xsl:text></xsl:attribute>
                <xsl:attribute name="onclick"><xsl:text>javascript:popUp("/utils/controlledvocabulary/controlledvocabulary.jsp?ID=dc_subject_gok&amp;vocabulary=gok")</xsl:text>
</xsl:attribute>
                <span class="controlledVocabularyLink">GOK-Baum</span>
                </a>
         </xsl:if>
             <!-- M.M. end -->
        
              <!-- Make invisible if we have choice-lookup popup that provides its own Add. -->
              <xsl:if test="dri:params/@choicesPresentation = 'lookup'">
                <xsl:attribute name="style">
                  <xsl:text>display:none;</xsl:text>
                </xsl:attribute>
        </xsl:if>
           </input>
        </xsl:if>
        <br/>
        <xsl:apply-templates select="dri:help" mode="help"/>
        <xsl:apply-templates select="dri:error" mode="error"/>
        <xsl:if test="dri:instance">
            <div class="ds-previous-values">
                <!-- Iterate over the dri:instance elements contained in this field. The instances contain
                    stored values as either "interpreted", "raw", or "default" values. -->
                <xsl:call-template name="simpleFieldIterator">
                    <xsl:with-param name="position">1</xsl:with-param>
                </xsl:call-template>
                <!-- Conclude with a DELETE button if the delete operation is specified. This allows
                    removing one or more values stored for this field. -->
                <xsl:if test="contains(dri:params/@operations,'delete') and dri:instance">
                    <!-- Delete buttons should be named "submit_[field]_delete" so that we can ignore errors from required fields when simply removing values-->
                    <input type="submit" value="Remove selected" name="{concat('submit_',@n,'_delete')}" class="ds-button-field ds-delete-button" />
                </xsl:if>
                <!-- Behind the scenes, add hidden fields for every instance set. This is to make sure that
                    the form still submits the information in those instances, even though they are no
                    longer encoded as HTML fields. The DRI Reference should contain the exact attributes
                    the hidden fields should have in order for this to work properly. -->
                <xsl:apply-templates select="dri:instance" mode="hiddenInterpreter"/>
            </div>
        </xsl:if>
    </xsl:template>


</xsl:stylesheet>
