<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	>
	<xsl:key name="dteams" match="//match/@team_A_name" use="." />
	<xsl:key name="ddates" match="//match/@date_utc" use="." />
	<xsl:variable
		name="mojselect"
		select="//match[@status='Played']/@date_utc[generate-id() = generate-id(key('ddates',.)[1])]"/>

		
	<xsl:template match="/">
		<season>
			<xsl:attribute name="name">
				<xsl:value-of select="//competition/@name" />
			</xsl:attribute>
			
			<!-- GET TABLES OF MATCHES IN ONE DAY -->
			<matches>
				<xsl:for-each select="$mojselect">
					<xsl:sort select="." order="descending"/>
					<xsl:if test="not(position() > 10)">
					<xsl:variable name="datenow" select="."/>
					<xsl:variable name="mojdruhyselect"
						select="//match[@status='Played'][@date_utc = $datenow]" />
					<table>
						<tr>
							<th colspan="3">
								<xsl:value-of select="//competition/@name"/>
							</th>
							<th colspan="4">
								<xsl:value-of select="."/>
							</th>
						</tr>
						<xsl:apply-templates select="$mojdruhyselect" />
					</table>
					</xsl:if>
				</xsl:for-each>
			</matches>
			
			
			
			
			<teams>
				<!-- DISTINCT VALUES OF TEAMS -->
				<xsl:for-each select="//match/@team_A_name[generate-id() = generate-id(key('dteams',.)[1])]">
					<xsl:sort select="."/>
					<team>
						<xsl:value-of select="." />
					</team>
				</xsl:for-each>
			</teams>
			<dates>
				<!-- DISTINCT VALUES OF DATES -->
				<xsl:for-each select="//match[@status='Played']/@date_utc[generate-id() = generate-id(key('ddates',.)[1])]">
					<xsl:sort select="." order="descending"/>
					<date>
						<xsl:value-of select="." />
					</date>
				</xsl:for-each>
			</dates>
  
		</season>
	</xsl:template>
	<xsl:template match="match">
		<tr>
			<td class="time"><xsl:value-of select="@time_utc" /></td>
			<td class="homeTeam"><xsl:value-of select="@team_A_name" /></td>
			<td class="homeScore"><xsl:value-of select="@fs_A" /></td>
			<td class="vs"> : </td>
			<td class="awayScore"><xsl:value-of select="@fs_B" /></td>
			<td class="awayTeam"><xsl:value-of select="@team_B_name" /></td>
			<td class="details"><button>
			<xsl:attribute name="value">
				<xsl:value-of select="@match_id"/>
			</xsl:attribute>
				Details
			</button></td>
		</tr>

	</xsl:template>    
	
</xsl:stylesheet>