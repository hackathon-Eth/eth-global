import React, { useEffect } from 'react';
import sigma from 'sigma';

function RandomGraphPage() {
  useEffect(() => {
    // Create a new Sigma.js instance and initialize it with your graph data
    const container = document.getElementById('graph-container');
    const s = new sigma({ container });

    // Replace this with your graph data setup
    const graphData = {
      nodes: [
        { id: 'n1', label: 'Node 1', x: 0, y: 0, size: 1 },
        { id: 'n2', label: 'Node 2', x: 1, y: 1, size: 1 },
      ],
      edges: [
        { id: 'e1', source: 'n1', target: 'n2', label: 'Edge 1' },
      ],
    };

    s.graph.read(graphData);

    // Perform any other configuration or interactions with your graph here

    // Example: Center the graph
    s.refresh();
    s.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 1 });
  }, []);

  return (
    <div>
      <div id="graph-container"></div>
    </div>
  );
}

export default RandomGraphPage;
