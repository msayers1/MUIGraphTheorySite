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
import { useThemeMode } from "../ThemeContent";

// Props for the TabPanel component
interface NavBarProps {
  handleNavBarAction: (buttonId: string) => void;
}


// export default function NavBar() {
const NavBar: React.FC<NavBarProps> = ({ handleNavBarAction }) => {
    const { mode, toggleTheme } = useThemeMode();
    const [anchorGraph, setAnchorGraph] = React.useState<null | HTMLElement>(null);
    const openGraph = Boolean(anchorGraph);
    const handleGraphClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorGraph(event.currentTarget);
    };
    const handleGraphClose = (buttonId: string) => {
        if (buttonId == undefined){
            return;
        }

        handleNavBarAction(buttonId);
        // switch(buttonId) {
        //     case "Save":
        //     break;
        //     case "Open":
        //     break;
        //     case "Bookmark":

        //     break;
        //     case "Generate":
        //     break;
        // }
        // console.log(buttonId);
                
        setAnchorGraph(null);
    };
    const [anchorAlgrorithm, setAnchorAlgrorithm] = React.useState<null | HTMLElement>(null);
    const openAlgorithm = Boolean(anchorAlgrorithm);
    const handleAlgrorithmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorAlgrorithm(event.currentTarget);
    };
    const handleAlgrorithmClose = (buttonId: string) => {
        // switch(buttonId) {
        //     case "Kruskal":
                
        // }
        // console.log(buttonId);
        setAnchorAlgrorithm(null);
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={toggleTheme}>
                Graph Theory Site
                </Typography>
                <Button color="inherit" onClick={handleGraphClick} >
                Graph
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorGraph}
                    open={openGraph}
                    onClose={handleGraphClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {handleGraphClose("Save")}}>Save</MenuItem>
                    <MenuItem onClick={() => {handleGraphClose("Open")}}>Open</MenuItem>
                    <MenuItem onClick={() => {handleGraphClose("Bookmark")}}>Bookmark</MenuItem>
                    <MenuItem onClick={() => {handleGraphClose("Generate")}}>Generate</MenuItem>
                </Menu>
                <Button color="inherit" onClick={handleAlgrorithmClick} >Algorithms</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorAlgrorithm}
                    open={openAlgorithm}
                    onClose={handleAlgrorithmClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {handleAlgrorithmClose("Kruskal")}}>Kruskal's Minimum Spanning Tree</MenuItem>
                    <MenuItem onClick={() => {handleAlgrorithmClose("Prim")}}>Prim's Minimum Spanning Tree</MenuItem>
                    <MenuItem onClick={() => {handleAlgrorithmClose("BFS")}}>Breadth First Search</MenuItem>
                    <MenuItem onClick={() => {handleAlgrorithmClose("DFS")}}>Depth First Search</MenuItem>
                    <MenuItem onClick={() => {handleAlgrorithmClose("Dijkstra")}}>Dijkstra's Shortest Path</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
  );
}

export default NavBar;

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