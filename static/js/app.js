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

