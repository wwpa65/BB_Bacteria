# Dashboard to visualize Bellybutton bacteria data

## Overview

The aim of this project was to visually experimental data obtained on bacteria in bellybuttons of volunteers. Visualizing data will facilitate conveying data and results to volunteers and other researchers involved in the project. For volunteers, visualing their bacteria help them identify the types of bacteria that colonize their bellies.

Javascript was used Plotly and d3 libraries to develop a dashboard. The data were in JSON format and Javascript d3 library tools were used to extract data and to populate data into the dashboard. In this webpage, demographic information, top ten (10) bacterial Operational Taxonomic Units (OTUs, a measure of the bacterial species taxonomy), a bubble plot for the distribution of bacteria (diversity) and a gauge to show the washing frequency is populated which is specific to the sample identification number of each of the volunteer. 

Finally this repository was deployed into the GitHub pages for easy visualization of the webpage without the need for using additional software tools. 

**Software tools:**
Javascript
Javascript d3 library
VS Code
Web browser
Command-line interface
GitHub

## Results

The bacterial data in JSON formt were successfully extracted to retrieve OTU ID, Values (counts), information on bacterial species (labels) usind d3.json(data).then(..) method. A dropdown menu was developed to select sample identiofication number for populating information into the dashboard. 
Figures 1-5 depits the screenshots for demographics, bar plot, bubble plot, gauge plot, and the dashboard, respectively.
![Demographics](/static/images/Initial-dashboard.png)

**Figure 1.** Initial drop down menu to retrieve demographics information 


![Bar plot](/static/images/bar_graph.png)


**Figure 2.** Demographics and bar graph for the volunteer id 940


![Bubble plot](/static/images/bubble_plot.png)

**Figure 3.** Demographics and bubble plot for the volunteer id 940


![Gauge plot](/static/images/gauge_plot.png)

**Figure 4** Demographics and gauge plot for the volunteer id 940

![Dashboard](/static/images/dashboard.png)

**Figure 5** Dashboard showing all information for the volunteer id 940

![olored Dashboard](/static/images/dashboard-colored bg.png)

**Figure 6** Colored Dashboard showing all information for the volunteer id 940

## Summary

We could develop a web dashboard to visualize bacterial data acquired for volunteers. This dashboard enables the volunteer to visualize their bacteria data easily as bar plots (top 10 OTU), bubble plot, and a guage (to show washing frequency). 
