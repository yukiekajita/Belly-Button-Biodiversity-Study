// Creating function for data plotting of bar, buggle, and gauge (bonus) with id
function buildPlots(){

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("./samples.json").then((sampledata) => {
    console.log(sampledata)
    
    // Create a horizontal bar chart with id=940
    // filter sample values by id
    var ids = sampledata.samples[0];
    console.log(ids);

    var sampleValues = ids.sample_values.slice(0,10).reverse();
    console.log(sampleValues);

    var otuIds = ids.otu_ids.slice(0,10).reverse();
    console.log(otuIds);

    var chartLabels = otuIds.map(d => "OTU " + d)
    console.log(`OTU IDs: ${chartLabels}`)
    
    var hovertextLabels = ids.otu_labels.slice(0,10).reverse();
    console.log(hovertextLabels);

    var trace = {
        x: sampleValues,
        y: chartLabels,
        text: hovertextLabels,
        marker: {
            color: 'blue'},
            type: "bar",
            orientation: "h"
        };
    
    var data = [trace];

    var layout = {
        title: "Top 10 OTUs Found in Selected Sample ID",
        xaxis: {title: "OTU Values"},
        yaxis: {
            title: "OTU IDs",
            tickmode: "linear",
        },
        margin: {
            l: 100, r: 100, t: 100, b: 30
        }
    };
    Plotly.newPlot("bar", data, layout);

    // Create a bubble chart
    var trace1 = {
        x: ids.otu_ids,
        y: ids.sample_values,
        mode: "markers",
        marker: {
            size: ids.sample_values,
            color: ids.otu_ids
        },
        text: ids.otu_labels
        };
    
    var data1 = [trace1];

    var layout1= {
        title: "Total OTU IDs and Values Found in Selected Sample ID",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "OTU Values"},
        height: 600,
        width: 1000,
    };
    Plotly.newPlot("bubble", data1, layout1);

    var wfreq = sampledata.metadata.map(d => d.wfreq)
    console.log(wfreq)
    var wfreq0 = wfreq[0]
    console.log(wfreq0)

    var data2 = [
        {
          type: "indicator",
          mode: "gauge+number",
          value: wfreq0,
          title: { text: "Belly Button Washing Frequency", font: { size: 17 } },
          gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 2], color: "lightblue" },
              { range: [2, 4], color: "skyblue" },
              { range: [4, 6], color: "royalblue" },
              { range: [6, 8], color: "blue" },
              { range: [8, 9], color: "orange" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: 8.8
            }
          }
        }
      ];
      
      var layout2 = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "black" }
      };
    Plotly.newPlot('gauge', data2, layout2);
});
}

// Create another function to get the neccesary data
function getInfo(sample){
  // Use D3 fetch to read the JSON file
  // The data from the JSON file is arbitrarily named importedData as the argument
  d3.json("./samples.json").then((sampledata) => {
  
    // get metadata infor for the demographic panel
    var metadata = sampledata.metadata;
    console.log(metadata)

    // filter metadata info by id
    var filterIds = metadata.filter(meta => meta.id.toString() === sample)[0];

    // select demographic panel in htlm file to put data
    var demographicInfo = d3.select("#sample-metadata");

    // empty the demographic info panel each time before getting new id info
    demographicInfo.html("");

    // grab the necessary demographic data for the id and append the info to the panel
    Object.entries(filterIds).forEach((key) => {
      demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
  });
}

// Create function for the initial data rendering
function init() {

  // select dropdown menu
  var dropdown = d3.select("#selDataset");

  // read data
  d3.json("./samples.json").then((sampledata) => {
  
    // get id data for the dropdown menu
    sampledata.names.forEach(function(name) {
      dropdown.append("option").text(name).property("value", name);
    });
    
    // use the first sample from the list to build the initial plots
    var firstsample = sampledata[0];

    // call the functions to display the data and the plots to the page
    buildPlots(firstsample);
    getInfo(firstsample);
  });
}

// Create function for change event
function optionChanged(newSample) {
  buildPlots(newSample);
  getInfo(newSample);
};

init();