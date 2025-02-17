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
import InputFileUpload from './importExport/importInput';
import { algorithms, MenuEntry } from '../ui_handlers/algorithm_control';
// Props for the TabPanel component
interface NavBarProps {
  handleNavBarAction: (buttonId: string, algorithm: MenuEntry<any>) => void;
  importGraph: (filelist: FileList) => void;
}


// export default function NavBar() {
const NavBar: React.FC<NavBarProps> = ({ handleNavBarAction, importGraph}) => {
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

        handleNavBarAction(buttonId, null);
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
    const [anchorAlgorithm, setAnchorAlgorithm] = React.useState<null | HTMLElement>(null);
    const openAlgorithm = Boolean(anchorAlgorithm);
    const handleAlgorithmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorAlgorithm(event.currentTarget);
    };
    const handleAlgorithmClose = (buttonId: string, algorithm: MenuEntry<any>) => {
        handleNavBarAction(buttonId, algorithm);
        setAnchorAlgorithm(null);
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
                    <MenuItem component="label" tabIndex={-1}>Open
                        <InputFileUpload openGraph={(filelist) => {handleGraphClose("Open");importGraph(filelist);}} />
                    </MenuItem>
                    <MenuItem onClick={() => {handleGraphClose("Bookmark")}}>Bookmark</MenuItem>
                    <MenuItem onClick={() => {handleGraphClose("Generate")}}>Generate</MenuItem>
                </Menu>
                <Button color="inherit" onClick={handleAlgorithmClick} >Algorithms</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorAlgorithm}
                    open={openAlgorithm}
                    onClose={() => setAnchorAlgorithm(null)}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {algorithms.map((category, index) => ( category.map((entry) => (
                                <MenuItem 
                                    key={entry.menuText} 
                                    onClick={() => handleAlgorithmClose(entry.menuText, entry)}
                                >
                                    {entry.menuText}
                                </MenuItem>
                            ))
                    ))}
                    {/* <MenuItem onClick={() => {handleAlgorithmClose("Kruskal")}}>Kruskal's Minimum Spanning Tree</MenuItem>
                    <MenuItem onClick={() => {handleAlgorithmClose("Prim")}}>Prim's Minimum Spanning Tree</MenuItem>
                    <MenuItem onClick={() => {handleAlgorithmClose("BFS")}}>Breadth First Search</MenuItem>
                    <MenuItem onClick={() => {handleAlgorithmClose("DFS")}}>Depth First Search</MenuItem>
                    <MenuItem onClick={() => {handleAlgorithmClose("Dijkstra")}}>Dijkstra's Shortest Path</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("Fleury") }}>Fleury's Euler Trail</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("Hamilton") }}>Bellman-Held-Karp Hamilton Path</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("Articulation") }}>Articulation Points</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("BHK_TSP") }}>Bellman-Held-Karp TSP</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("TSP_NearestNeighbor") }}>Nearest Neighbor TSP (Approximation)</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("TSP_NearestInsert") }}>Nearest Insert TSP (Approximation)</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("TSP_CheapestInsert") }}>Cheapest Insert TSP (Approximation)</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("TSP_MSTBased") }}>MST-Based TSP (Approximation)</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("TSP_Christofides") }}>Christofides TSP (Approximation)</MenuItem>
                    <MenuItem onClick={() => { handleAlgorithmClose("EdmondsKarp") }}>Edmonds-Karp Network Flow</MenuItem> */}
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