import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function NavBar() {
    const [anchorGraph, setAnchorGraph] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorGraph);
    const handleGraphClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("fred");
        setAnchorGraph(event.currentTarget);
    };
    const handleGraphClose = () => {
        setAnchorGraph(null);
    };
  return (

        <AppBar position="static">
            <Toolbar>
                {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Graph Theory Site
                </Typography>
                <Button color="inherit" onClick={handleGraphClick} >
                Graph
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorGraph}
                    open={open}
                    onClose={handleGraphClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleGraphClose}>Save</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Open</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Bookmark</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Generate</MenuItem>
                </Menu>
                <Button color="inherit" onClick={handleGraphClick} >Algorithms</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorGraph}
                    open={open}
                    onClose={handleGraphClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleGraphClose}>Kruskal's Minimum Spanning Tree</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Prim's Minimum Spanning Tree</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Breadth First Search</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Depth First Search</MenuItem>
                    <MenuItem onClick={handleGraphClose}>Dijkstra's Shortest Path</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
  );
}


// static readonly algorithms: MenuEntry<any>[][] = [
//     [
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: KruskalMST,
//             menuText: "Kruskal's Minimum Spanning Tree",
//         },
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: PrimMST,
//             menuText: "Prim's Minimum Spanning Tree",
//         },
//     ],
//     [
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: BreadthFirstSearch,
//             menuText: "Breadth First Search",
//         },
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: DepthFirstSearch,
//             menuText: "Depth First Search",
//         },
//     ],
//     [
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: DijkstrasShortestPath,
//             menuText: "Dijkstra's Shortest Path",
//         },
//     ],
//     [
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: FleuryEulerTrail,
//             menuText: "Fleury's Euler Trail",
//         },
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: BHKHamiltonPath,
//             menuText: "Bellman-Held-Karp Hamilton Path",
//         },
//     ],
//     [
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: ArticulationPoints,
//             menuText: "Articulation Points",
//         },
//     ],
//     [
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: BHK_TSP,
//             menuText: "Bellman-Held-Karp TSP",
//         },
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: TSPApproxNearestNeighbor,
//             menuText: "Nearest Neighbor TSP (Approximation)",
//         },
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: TSPApproxNearestInsert,
//             menuText: "Nearest Insert TSP (Approximation)",
//         },
//         {
//             controlsClass: VertexInputControls,
//             algorithmClass: TSPApproxCheapestInsert,
//             menuText: "Cheapest Insert TSP (Approximation)",
//         },
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: TSPApproxMSTBased,
//             menuText: "MST-Based TSP (Approximation)",
//         },
//         {
//             controlsClass: InputlessControls,
//             algorithmClass: TSPApproxChristofides,
//             menuText: "Christofides TSP (Approximation)",
//         },
//     ],
//     [
//         {
//             controlsClass: SourceSinkInputControls,
//             algorithmClass: EdmondsKarpAlgorithm,
//             menuText: "Edmonds-Karp Network Flow",
//         },
//     ],
//     //[
//         //{
//             //controlsClass: InputlessControls,
//             //algorithmClass: CountComponents,
//             //menuText: "Component Count",
//         //},

//     //]
// ];