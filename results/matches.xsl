<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:fn="http://www.w3.org/2005/xpath-functions"
>

<xsl:template match="/">
    <xsl:for-each select="//match" name="match">
		<xsl:if test="contains(attribute::status, 'Played')">
			<match>
				<teamA><xsl:value-of select="attribute::team_A_name" /></teamA>
				<teamB><xsl:value-of select="attribute::team_B_name"/></teamB>
				<date><xsl:value-of select="attribute::date_utc"/></date>
				<fsA><xsl:value-of select="attribute::fs_A"/></fsA>
				<fsB><xsl:value-of select="attribute::fs_B"/></fsB>
			</match>
		</xsl:if> 
    </xsl:for-each>
	<xsl:for-each select="distinct-values(//match/attribute::team_A_name)" name="teams">
		<team>
			<xsl:value-of select="attribute::team_A_name" />
		</team>
	 
    </xsl:for-each>
</xsl:template>

</xsl:stylesheet>