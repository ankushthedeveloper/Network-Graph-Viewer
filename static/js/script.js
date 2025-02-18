let cy;

function handleFile() {
    let fileInput = document.getElementById('fileInput');
    let file = fileInput.files[0];

    if (!file) {
        showError("Please select a file.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(event) {
        let content = event.target.result;
        let filename = file.name;

        if (filename.endsWith('.json')) {
            parseJSON(content);
        } else if (filename.endsWith('.csv')) {
            parseCSV(content);
        } else {
            showError("❌ Unsupported file format! Only CSV and JSON are allowed.");
        }
    };

    reader.readAsText(file);
}

function parseJSON(content) {
    let layout = document.getElementById('layoutSelect').value;
    try {
        let jsonData = JSON.parse(content);

        if (!jsonData.nodes || !jsonData.edges) {
            throw new Error("Invalid JSON format! Must contain 'nodes' and 'edges'.");
        }

        clearError();
        visualizeGraph(jsonData.nodes, jsonData.edges,layout);
    } catch (error) {
        showError(error.message);
    }
}

function parseCSV(content) {     
    let layout = document.getElementById('layoutSelect').value; 
    Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            let data = results.data;

            if (!data[0].source || !data[0].target) {
                showError("Invalid CSV format! Must contain 'source' and 'target' columns.");
                return;
            }

            let nodes = new Set();
            let edges = [];

            data.forEach(row => {
                nodes.add(row.source);
                nodes.add(row.target);
                edges.push({ source: row.source, target: row.target });
            });

            let nodeArray = Array.from(nodes).map(id => ({ id }));
            let edgeArray = edges.map(e => ({ source: e.source, target: e.target }));

            clearError();
            visualizeGraph(nodeArray, edgeArray,layout);
        }
    });
}

function visualizeGraph(nodes, edges ,layout) {
    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [
            ...nodes.map(n => ({ data: { id: n.id } })),
            ...edges.map(e => ({ data: { source: e.source, target: e.target } }))
        ],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#0074D9',
                    'label': 'data(id)',
                    'color': 'white',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': '#0074D9',
                    'font-size': '12px'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#AAAAAA',
                    'curve-style': 'bezier'
                }
            }
        ],
        layout: {
            name: layout,
            fit: true
        }
    });
}

function queryNodes() {
    let layout = document.getElementById('layoutSelect').value; 
    if (!cy) {
        showError("Please upload and visualize a file first.");
        return;
    }

    let input = document.getElementById('queryNode').value.trim();
    if (!input) {
        showError("Please enter at least one node ID.");
        return;
    }

    let queryNodes = new Set(input.split(',').map(id => id.trim()));

    
    let subgraphNodes = new Set(queryNodes);

    cy.edges().forEach(edge => {
        if (queryNodes.has(edge.source().id())) {
            subgraphNodes.add(edge.target().id()); // Add target if source is in query
        }
        if (queryNodes.has(edge.target().id())) {
            subgraphNodes.add(edge.source().id()); // Add source if target is in query
        }
    });

    // Filter edges where both nodes exist in the subgraph
    let subgraphEdges = cy.edges().filter(e => 
        subgraphNodes.has(e.source().id()) && subgraphNodes.has(e.target().id())
    );

    // Convert to array format for Cytoscape
    let filteredNodes = Array.from(subgraphNodes).map(id => ({ id }));
    let filteredEdges = subgraphEdges.map(e => ({ source: e.source().id(), target: e.target().id() }));
   if(filteredEdges.length>0 && filteredEdges.length>0) {
    clearError();
    visualizeGraph(filteredNodes, filteredEdges,layout);
   } else {
    showError("No Matching Nodes , Enter Valid Nodes");
   }
}




function changeLayout() {
    if (!cy) return;
    let layout = document.getElementById('layoutSelect').value;
    cy.layout({ name: layout }).run();
}

function showError(message) {
    document.getElementById('error-message').innerText = message;
}

function clearError() {
    document.getElementById('error-message').innerText = "";
}

