<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:variable
        name="matchpath"
        select="//match"/>
    
    <xsl:template match="/">
        <xsl:apply-templates select="$matchpath"/>    
    </xsl:template>
    
    
    
    <xsl:template match="match">
        <xsl:variable name="teamA" select="@team_A_id" />
        <xsl:variable name="teamB"  select="@team_B_id" />
        <table class="">
            <tr>
                <th>
                    <xsl:value-of select="@team_A_name"/>
                </th>
                <th>
                    vs 
                </th>
                <th>
                    <xsl:value-of select="@team_B_name"/>
                </th>
            </tr>
            <tr>
                <td>
                    <xsl:apply-templates select="goals/goal[event/@team_id =  $teamA]" />
                </td>
                <td class="middleColumn">
                    Goals
                </td>
                <td>
                    <xsl:apply-templates select="goals/goal[event/@team_id = $teamB]" />
                </td>
            </tr>
            <tr>
                <td>
                    <xsl:apply-templates select="bookings/event[@team_id = $teamA]" />
                </td>
                <td class="middleColumn">
                    Bookings
                </td>
                <td>
                    <xsl:apply-templates select="bookings/event[@team_id = $teamB]" />
                </td>
            </tr>
            <tr>
                <td>
                    <xsl:apply-templates select="substitutions/sub[event/@team_id = $teamA]" />
                </td>
                <td class="middleColumn">
                    Subs
                </td>
                <td>
                    <xsl:apply-templates select="substitutions/sub[event/@team_id = $teamB]" />
                </td>
            </tr>
        </table>
        
        
        
        <xsl:apply-templates select="matchinfo"/>
    </xsl:template>
    
    <xsl:template match="matchinfo">
        <p class="venue">
            Stadium: 
            <xsl:value-of select="venue/@name"/>
            <br />
            Attendance: 
            <xsl:value-of select="attendance/@value"/>
        </p>
        
        <p class="referees">
            Referees:
            <xsl:value-of select="referee/@name"/>
            ,
            <xsl:value-of select="assistant_referee[1]/@name"/>
            ,
            <xsl:value-of select="assistant_referee[2]/@name"/>
            ,
            <xsl:value-of select="fourth_official/@name"/>
        </p>
    </xsl:template>
    
    <xsl:template match="goal">
        <xsl:value-of select="event/@minute"/>'
        <xsl:value-of select="event[@code = 'G']/@person"/>
        <xsl:apply-templates select="event[@code = 'PG']" />
        <xsl:apply-templates select="event[@code = 'AS']" />
        <xsl:apply-templates select="event[@code = 'OG']" />
        <br />
    </xsl:template>
    <xsl:template match="event[@code = 'AS'][parent::goal]">
        (
        <xsl:value-of select="@person"/>
        )
    </xsl:template>
    
    <xsl:template match="event[@code = 'OG'][parent::goal]">
        <xsl:value-of select="@person"/>
        OG
    </xsl:template>
    <xsl:template match="event[@code = 'PG'][parent::goal]">
        <xsl:value-of select="@person"/> (P)
    </xsl:template>   
   
   
    <xsl:template match="event[parent::bookings]">
        <xsl:value-of select="@minute"/>'
        <xsl:value-of select="@code"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="@person"/>
        <br />
    </xsl:template>
    
    
    <xsl:template match="sub">
        <xsl:value-of select="event/@minute"/>'
        <xsl:apply-templates select="event[@code = 'SI']" />
        &lt; 
        <xsl:apply-templates select="event[@code = 'SO']" />
        <br />
    </xsl:template>    
    
    <xsl:template match="event[parent::sub]">
        <xsl:value-of select="@person"/>
    </xsl:template>    
        
        
        
</xsl:stylesheet>
