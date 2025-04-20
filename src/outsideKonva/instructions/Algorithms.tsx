import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { algorithms } from '../../ui_handlers/algorithm_control';


type TextFragment = string | {
  href: string;
  bib: string;
  index: string;
};

type ContentItem = {
  title: string;
  discussion: string|TextFragment[];
}[];

const AlgorithmComponent: React.FC = () => {
  const BibList = {
    1:  {
      href: "https://digitalcommons.uri.edu/theses/1982/",
      bib: "Adhikari, Neeraj. Graph Playground: A Pedagogic Tool for Graph Theory and Algorithms. University of Rhode Island, 2021.",
      index: '1'
    },
    2: {
      href:'https://dl.acm.org/doi/10.1145/362248.362272',
      bib: 'Hopcroft, John, and Robert Tarjan. "Algorithm 447: efficient algorithms for graph manipulation." Communications of the ACM 16.6 (1973): 372-378.',
      index: '2'
    }
  }

  const algorithms:ContentItem = [
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
      title: "Bellman-Held-Karp  Hamiltonian Path Algorithm",
      discussion: ["The BHK algorithm attempts to find a Hamiltonian path — a path visiting each vertex exactly once. It typically uses backtracking strategies. The algorithm implemented is a modified version of Bellman-Held-Karp algorithm",
            BibList[1],
            " The author of the algorithm modified the algorithm to solve a speical case of Traveling Salesman."]
    },
    {
      title: "Bellman-Held-Karp  Traveling Salesman Problem (TSP)",
      discussion: "A variation of the Bellman-Held-Karp approach is used to find a Hamiltonian cycle with the minimum weight, addressing the classic TSP challenge through combinatorial optimization."
    },
    {
      title: "Traveling Salesman Problem (TSP) – Nearest Neighbor Heuristic",
      discussion: "This greedy heuristic builds a TSP tour by always visiting the closest unvisited city. It's fast but does not guarantee optimal solutions."
    },
    {
      title: "Traveling Salesman Problem (TSP) – Nearest Insertion Heuristic",
      discussion: "Nearest Insertion adds the closest unvisited city into the tour at the position that causes the least increase in total path length."
    },
    {
      title: "Traveling Salesman Problem (TSP) – Cheapest Insertion Heuristic",
      discussion: "Cheapest Insertion considers all insertion points and adds the node where the increase in total tour length is minimized, improving over greedy methods."
    },
    {
      title: "Traveling Salesman Problem (TSP) – MST-Based Approximation",
      discussion: "This method approximates a TSP solution using a Minimum Spanning Tree and a pre-order traversal of the resulting structure, offering a 2-approximation."
    },
    {
      title: "Articulation Points Detection",
      discussion: ["Articulation points are vertices whose removal increases the number of connected components. They're critical for understanding graph vulnerability and connectivity.",
           BibList[2]]
    },
    {
      title: "Edmonds-Karp Maximum Flow Algorithm",
      discussion: "An implementation of the Ford-Fulkerson method using BFS to find augmenting paths. It computes the maximum flow from a source to a sink in a flow network."
    },
    {
      title: "Traveling Salesman Problem (TSP) – Christofides' Algorithm",
      discussion: "Christofides' algorithm offers a 1.5-approximation for TSP on metric graphs by combining MSTs, matchings, and Eulerian circuits."
    },
    {
      title: "Minimum Graph Coloring Algorithm",
      discussion: "This algorithm assigns colors to graph vertices such that no two adjacent vertices share the same color, using as few colors as possible."
    }
  ];

  


  let linkCounter = 1;

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
          {typeof(algo.discussion) != 'string' ?(
            <Typography>
              {algo.discussion.map((piece, i) => {
                if (typeof piece === "string") {
                  return <React.Fragment key={i}>{piece}</React.Fragment>;
                }
              return (
                <Link target="_blank" rel="noopener noreferrer" href={piece.href}>
                  [{piece.index}]
                </Link>
              )
              })}
            </Typography>
          ):(
            <Typography variant="body1" color="text.secondary">
              {algo.discussion}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default AlgorithmComponent;
