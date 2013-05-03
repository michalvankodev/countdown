<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
    <xsl:for-each select="gsmrs/competition/season">
		<xsl:if test="contains(attribute::name, '2013')">
			<option>
				<xsl:attribute name="value">
					<xsl:value-of select="attribute::season_id" />
				</xsl:attribute>
				<xsl:if test="../attribute::competition_id = 16">
					<xsl:attribute name="selected">
						selected
					</xsl:attribute>
				</xsl:if>
				<xsl:value-of select="../attribute::name" /> 
			</option>
		</xsl:if>
    </xsl:for-each>
</xsl:template>

</xsl:stylesheet>