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
});

