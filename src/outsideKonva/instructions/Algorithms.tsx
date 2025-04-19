import React from 'react';
import { Typography, Box } from '@mui/material';

// Props for the AlgorithmComponent


const AlgorithmComponent: React.FC = () => {
  const algorithms = [
    {
      title: "Kruskal's Minimum Spanning Tree (MST)",
      discussion: "Kruskal's algorithm builds a minimum spanning tree by sorting all edges and continuously adding the smallest edge that doesn’t form a cycle. It uses a disjoint-set data structure to manage components efficiently."
    },
    {
      title: "Prim's Minimum Spanning Tree (MST)",
      discussion: "Prim's algorithm grows a minimum spanning tree from a starting vertex by always choosing the smallest edge that connects a visited node to an unvisited one."
    },
    {
      title: "Breadth-First Search (BFS)",
      discussion: "BFS explores the graph layer by layer, visiting all neighbors at the current depth before moving on to the next level. It's useful for finding the shortest path in unweighted graphs."
    },
    {
      title: "Depth-First Search (DFS)",
      discussion: "DFS explores a graph branch by branch, going as deep as possible before backtracking. It's useful for pathfinding, cycle detection, and topological sorting."
    },
    {
      title: "Dijkstra's Shortest Path Algorithm",
      discussion: "Dijkstra's algorithm finds the shortest path from a source node to all other nodes in a weighted graph with non-negative edge weights, using a priority queue."
    },
    {
      title: "Fleury's Algorithm for Eulerian Trail",
      discussion: "Fleury's algorithm constructs an Eulerian trail by choosing edges that don't disconnect the graph unless necessary, ensuring each edge is visited exactly once."
    },
    {
      title: "BHK Hamiltonian Path Algorithm",
      discussion: "The BHK algorithm attempts to find a Hamiltonian path — a path visiting each vertex exactly once. It typically uses backtracking strategies."
    },
    {
      title: "BHK Traveling Salesman Problem (TSP)",
      discussion: "A variation of the BHK approach is used to find a Hamiltonian cycle with the minimum weight, addressing the classic TSP challenge through combinatorial optimization."
    },
    {
      title: "TSP – Nearest Neighbor Heuristic",
      discussion: "This greedy heuristic builds a TSP tour by always visiting the closest unvisited city. It's fast but does not guarantee optimal solutions."
    },
    {
      title: "TSP – Nearest Insertion Heuristic",
      discussion: "Nearest Insertion adds the closest unvisited city into the tour at the position that causes the least increase in total path length."
    },
    {
      title: "TSP – Cheapest Insertion Heuristic",
      discussion: "Cheapest Insertion considers all insertion points and adds the node where the increase in total tour length is minimized, improving over greedy methods."
    },
    {
      title: "TSP – MST-Based Approximation",
      discussion: "This method approximates a TSP solution using a Minimum Spanning Tree and a pre-order traversal of the resulting structure, offering a 2-approximation."
    },
    {
      title: "Articulation Points Detection",
      discussion: "Articulation points are vertices whose removal increases the number of connected components. They're critical for understanding graph vulnerability and connectivity."
    },
    {
      title: "Edmonds-Karp Maximum Flow Algorithm",
      discussion: "An implementation of the Ford-Fulkerson method using BFS to find augmenting paths. It computes the maximum flow from a source to a sink in a flow network."
    },
    {
      title: "TSP – Christofides' Algorithm",
      discussion: "Christofides' algorithm offers a 1.5-approximation for TSP on metric graphs by combining MSTs, matchings, and Eulerian circuits."
    },
    {
      title: "Minimum Graph Coloring Algorithm",
      discussion: "This algorithm assigns colors to graph vertices such that no two adjacent vertices share the same color, using as few colors as possible."
    }
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Algorithms
      </Typography>
      {algorithms.map((algo, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            {algo.title}:
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {algo.discussion}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AlgorithmComponent;
