function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("public/samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("public/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("public/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    console.log(data);
    var samples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(sampleArray);
    //  5. Create a variable that holds the first sample in the array.

    var sampleResult = sampleArray[0];
    console.log(sampleResult);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu = sampleResult.otu_ids;
    console.log(otu);
    var otu_values = sampleResult.sample_values;
    console.log(otu_values);
    var otu_labels = sampleResult.otu_labels;
    console.log(otu_labels);

    // ========================================
    // BAR PLOT
    // ========================================
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu.slice(0, 10).map(otus => "OTU " + otus).reverse();
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: otu_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };


    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    // Plotly.newPlot();

    // ========================================
    // BUBBLE PLOT
    // =========================================
    // 1. Create the trace for the bubble chart.
    otu_valuesReversed = otu_values.reverse();
    otu_idReversed = otu.reverse();
    otu_labelsReversed = otu_labels.reverse();

    var bubbleData = [{
      x: otu_idReversed,
      y: otu_valuesReversed,
      text: otu_labelsReversed,
      type: "bubble",
      mode: 'markers',
      marker: {
        color: otu_idReversed,
        colorscale: 'Earth',
        size: otu_valuesReversed,
        sizeref: 0.05,
        sizemode: 'area'
      },
      hoverinfo: "x+y+text"

    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { zeroline: false, title: 'OTU ID' },
      hovermode: "closest",
      showlegend: false,
      height: 400,
      width: 1200,
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }

    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // Plotly.newPlot();

    //========================================
    //GAUGE PLOT
    //========================================
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(samples);
    // Create a variable that filters the samples for the object with the desired sample number.
    // var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var sampleResult = sampleArray[0];

    console.log(sampleResult);
    // 2. Create a variable that holds the first sample in the metadata array.
    var metadataResult = metadataArray[0];
    console.log(metadataResult)
    console.log(metadataResult.wfreq);
    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu = sampleResult.otu_ids;
    console.log(otu);
    var otu_values = sampleResult.sample_values;
    console.log(otu_values);
    var otu_labels = sampleResult.otu_labels;
    console.log(otu_labels);

    // 3. Create a variable that holds the washing frequency.
    var freq = parseInt(metadataResult.wfreq);
    console.log(freq);

    // // Create the yticks for the bar chart.
    // var yticks = otu.slice(0, 10).map(otus => "OTU " + otus).reverse();

    // var barData = [{
    //   x: otu_values.slice(0, 10).reverse(),
    //   y: yticks,
    //   text: otu_labels.slice(0, 10).reverse(),
    //   type: "bar",
    //   orientation: "h"
    // }];

    // var barLayout = {
    //   title: "Top 10 Bacteria Cultures Found",
    //   margin: {
    //     l: 100,
    //     r: 100,
    //     t: 100,
    //     b: 100
    //   }
    // };
    // Use Plotly to plot the bar data and layout.
    // Plotly.newPlot("bar", barData, barLayout);
    // Plotly.newPlot();

    // // Use Plotly to plot the bubble data and layout.

    otu_valuesReversed = otu_values.reverse();
    otu_idReversed = otu.reverse();
    otu_labelsReversed = otu_labels.reverse();

    var bubbleData = [{
      x: otu_idReversed,
      y: otu_valuesReversed,
      text: otu_labelsReversed,
      type: "bubble",
      mode: 'markers',
      marker: {
        color: otu_idReversed,
        colorscale: 'Earth',
        size: otu_valuesReversed,
        sizeref: 0.05,
        sizemode: 'area'
      },
      hoverinfo: "x+y+text"

    }];

    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { zeroline: false, title: 'OTU ID' },
      hovermode: "closest",
      showlegend: false,
      height: 400,
      width: 1200,
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }

    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // Plotly.newPlot();

    // // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: freq,
        title: '<b>Belly Button Washing Frequency</b> <br>Scrubs Per Week',
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black" },

          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" }
          ],
          threshold: {
            line: { color: "black", width: 4 },
            thickness: 0.01,
            value: 490
          }
        }

      }];

      
    // // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 }
  };
    
    // // 6. Use Plotly to plot the gauge data and layout.
    
    Plotly.newPlot('gauge', gaugeData, gaugeLayout)
    // Plotly.newplot();

  });
}

