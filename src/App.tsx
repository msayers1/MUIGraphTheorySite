import * as React from 'react';
import {Stage, Layer } from 'react-konva';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavBar from './outsideKonva/NavBar';
import LeftSide from './outsideKonva/LeftSide';
import RightSide from './outsideKonva/RightSide';
import Grid from '@mui/material/Grid2';
import GraphTabs from "./ui_handlers/graphtabs";
// import AutoLabelOptions from "./ui_handlers/autolabel_options";
// import AutoLayout from "./ui_handlers/autolayout";
import ImportExport from "./ui_handlers/importexport";
import GraphGenerate from './ui_handlers/graphgenerate';
import DisplayCustomizer from './ui_handlers/display_customizer';
import AlgorithmMenu from './ui_handlers/algorithm_menu';
import BookmarkedGraphs from './ui_handlers/bookmarked';
import { Tools } from './ui_handlers/tools';
// Double-imports seemingly necessary
import './components/tabbar';   // Executes the module, to register custom element
import * as TabBar from './components/tabbar';  // Actually does the import
import './components/algorithm_controls';
import { LayoutName } from "./drawing/layouts";
import { AutoLabelScheme } from './drawing/graphdrawing';
import HighlightOff from '@mui/icons-material/HighlightOff';
import { IconButton, Box } from '@mui/material';
import {tabObject} from './components/tabbar';
import SaveAs from '@mui/icons-material/SaveAs';
import { StoredDrawingInfo } from './store/graphstore';
import SaveModal from './outsideKonva/importExport/saveModal';
import GenerateGraphModal from './outsideKonva/GenerateModal';
import {GenerateGraphPackage} from './ui_handlers/graphgenerate';

export default function App() {
  const stage = React.useRef(null);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [tabName, setTabName] = React.useState("");
  const [tabEdit, setTabEdit] = React.useState(false);
  const [graphTabs, setGraphTabs] = React.useState<GraphTabs>();
  const [bookmarks, setBookmarks] = React.useState<StoredDrawingInfo[]>();
  const [tabArray, setTabArray] = React.useState<[tabObject]>();
  const [noGraph, setNoGraph] = React.useState(true);
  const [clickToAddText, setClickToAddText] = React.useState(false);
  const [correctControlPanel, setCorrectControlPanel] = React.useState(0);
  const [saveModal, setSaveModal] = React.useState(false);
  const [saveModalDefaultName, setSaveModalDefault] = React.useState('');
  const [generateModal, setGenerateModal] = React.useState(false);
  const updateTool = (tool: string) => {
    // console.log(tool);
    graphTabs.tools.clickTool(tool);
  };

  const updateAutoLayoutOption = (option: LayoutName) => {
    graphTabs.autoLayout.setLayout(option);
  }
  const updateAutoLabelOptions = (option: AutoLabelScheme) => {
    graphTabs.getActiveGraphDrawing()?.setAutoLabelScheme(option as AutoLabelScheme);
  }
  const updateGraphDisplayOptions = (vertexSize:number, weightFontSize:number) => {
    // console.log(`The vertex Size or Vertex Radius value is ${vertexSize}, and the weight font size is ${weightFontSize}.`);
    graphTabs.displayCustomizer.updateGraphDisplayOptions(vertexSize, weightFontSize);
  }

  const addGraph = (tabType: TabBar.TabType) => {
    displayNewGraph(tabType);
    setNoGraph(false);
    setClickToAddText(true);
    setTabArray(graphTabs.tabBar.tabArray);
    // console.log(tabArray);
    // setGraphs([...graphs, newGraph]); // Create a new array with existing graphs and the new graph
  };
  function displayNewGraph(tabType: TabBar.TabType) {
    // const tabbar: TabBar.TabBar = document.querySelector("tab-bar");
    const newId = graphTabs.tabBar.addTabElement("New Graph", tabType);
    graphTabs.tabBar.setActiveById(newId);
    setTabIndex(newId);
    // console.log(graphTabs);
  }
  React.useEffect(() => {
    const tools = new Tools(stage.current);
    const graphTabs = new GraphTabs(stage.current, setClickToAddText, setNoGraph, setCorrectControlPanel);
    const bookmarks = graphTabs.bookmarkedGraphs.getBookmarks();
    graphTabs.bookmarkedGraphs.setBookmarkActionCallback((newBookmarks)=>{setBookmarks(newBookmarks);});
    setGraphTabs(graphTabs);
    setBookmarks(bookmarks);
    // console.log(graphTabs);
  }, [stage.current]);

  const handleRemoveBookmark = (id: number) => {
    graphTabs.bookmarkedGraphs.removeBookmark(id);
  }

  const handleRemoveTab = (tabId: number) => {
    const newTabArray = graphTabs.tabBar.removeById(tabId);
    setTabArray(newTabArray);
    // graphTabs.tabBar.setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    // if (selectedTab === tabId && tabs.length > 1) {
    //   const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
    //   setSelectedTab(remainingTabs[0].id);
    // }
  };
  const saveNewLabel = (tabId: number) => {
    const updatedTabObject = {id:tabId, name:tabName, editable:false};
    const tabIndex = tabArray.findIndex((tab:tabObject) => tab.id === tabId);
    // console.log(tabArray);
    const newTabArray = tabArray;
    newTabArray[tabIndex] = updatedTabObject;
    setTabArray(newTabArray);
    setTabEdit(false);
    // setTabArray(([prevTabs]) => prevTabs.map((tab) => {
    //   if (tab.id === tabId) {
    //     return { ...tab, name: tabName };
    //   } else {
    //     return tab;
    //   }
    // }));
  }

  const turnOnTabEdit = (name:string) => {
    if(tabEdit == false){
      setTabEdit(true);
      setTabName(name);
    }
  }
    
  
  const handleNavBarAction = (buttonId: string) => {
        switch(buttonId) {
            case "Save":
              const saveModalDefaultName = graphTabs.importExport.exportCurrent();
              setSaveModalDefault(saveModalDefaultName);
              setSaveModal(true);
            break;
            case "Open":
              //Handled by a InputFileUpload (VisuallyHiddenInput) in importExport/importinput.tsx
            break;
            case "Bookmark":
              const bookmarks = graphTabs.bookmarkedGraphs.bookmark(graphTabs);
            break;
            case "Generate":
              setGenerateModal(true);
            break;
        }
        // console.log(buttonId);
  }

  const openBookmark = (item: StoredDrawingInfo) => {
    const newId = graphTabs.bookmarkedGraphs.retrieveBookmark(item);
    setTabArray(graphTabs.tabBar.tabArray);
    setTabIndex(newId);
    //GraphTabs.bookmarkedGraphs.retrieveBookmark(item);
  }

  const importGraph = (fileList: FileList) => {
    const newId = graphTabs.importExport.importNew(fileList);
    setTabArray(graphTabs.tabBar.tabArray);
    if(typeof(newId) == 'number') setTabIndex(newId);
  }
  const handleTabChange = (newValue: number) => {
    const newTabArray = graphTabs.tabBar.changeTab(newValue);
    setTabArray(newTabArray);
    setTabIndex(newValue);
    // console.log(graphTabs);
  };

  const saveGraph = (fileName: string) => {
    graphTabs.importExport.saveGraph(fileName);
  }

  const generateGraph = (formSubmission: GenerateGraphPackage) => {
    // console.log(formSubmission);
    const newId = graphTabs.graphGenerate.GraphGenerate(formSubmission);
    // const newTabArray = graphTabs.tabBar.changeTab(newId);
    setTabArray(graphTabs.tabBar.tabArray);
    setTabIndex(newId);
    setGenerateModal(false);
  }

  return (
    <React.Fragment>
      <NavBar 
        handleNavBarAction={handleNavBarAction}
        importGraph={importGraph}
      />
      <Grid container spacing={1} >
        <Grid size={{md: 2}}>
          <LeftSide
            addGraph={addGraph}
            updateTool={updateTool}
            updateAutoLayoutOption={updateAutoLayoutOption}
            updateAutoLabelOptions={updateAutoLabelOptions}
            updateGraphDisplayOptions={updateGraphDisplayOptions}
            bookmarks={bookmarks}
            openBookmark={openBookmark}
            handleRemoveBookmark={handleRemoveBookmark}
            importGraph={importGraph}
             />
        </Grid>
        <Grid size={{md: 8}}>
          {(typeof(graphTabs) != "undefined")?
          <React.Fragment>
            {graphTabs.tabBar.tabArray.map((tab) => (
              (tabEdit && tabIndex == tab.id)?
                <Button
                          variant="contained"
                          key={tab.id}
                          value={tab.id}
                          onClick={()=>{(tabIndex == tab.id )?turnOnTabEdit(tab.name):handleTabChange(tab.id)}}
                          endIcon={<div
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent triggering the tab change
                              saveNewLabel(tab.id);
                            }}
                          >
                            <SaveAs fontSize="small" />
                          </div>} 
                        >
                            <TextField  
                              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                if (event.key === 'Enter') {
                                  // console.log('Enter key pressed with value:', event);
                                  saveNewLabel(tab.id);
                                  // Add your logic here, e.g., submitting the form or calling a function
                                }
                              }} 
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTabName(event.target.value);
                              }} 
                              label="label" 
                              value={tabName} 
                              variant="standard" 
                            />
                          </Button>
                          :<Button
                              variant={(tabIndex == tab.id)? "contained":"outlined"}
                              key={tab.id}
                              value={tab.id}
                              onClick={()=>{(tabIndex == tab.id )?turnOnTabEdit(tab.name):handleTabChange(tab.id)}}
                              endIcon={<div
                                onClick={(event) => {
                                  event.stopPropagation(); // Prevent triggering the tab change
                                  handleRemoveTab(tab.id);
                                }}
                          >
                            <HighlightOff fontSize="small" />
                          </div>} 
                        >{tab.name}
                          </Button>
            ))}


            {/* {graphTabs.tabBar.tabArray.map((tab, index) => (
              // <Tab key={tab.id} label={tab.name} id={`tab-${index}`}  ><Button><HighlightOff/></Button></Tab>
              <Button
                          variant="contained"
                          key={tab.id}
                          value={tab.id}
                          onClick={()=>{(tabIndex == tab.id )?turnOnTabEdit(tab.name):handleTabChange(tab.id)}}
                          endIcon={(tabEdit && tabIndex == tab.id)?<div
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent triggering the tab change
                              saveNewLabel(tab.id);
                            }}
                            />
                            :<div
                            onClick={(event) => {
                              event.stopPropagation(); // Prevent triggering the tab change
                              handleRemoveTab(tab.id);
                            }}
                          >
                            {(tabEdit && tabIndex == tab.id)?<SaveAs fontSize="small" />:<HighlightOff fontSize="small" />}
                          </div>} 
                        >{(tabEdit && tabIndex == tab.id)?<TextField   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setTabName(event.target.value);
                        }} label="label" value={tabName} variant="standard" />:tab.name}
                          </Button>
              ))} */}
          </React.Fragment>
          :<div/>
          }
            <Stage 
                    width={window.innerWidth} 
                    height={window.innerHeight}
                    draggable={true}
                    ref={stage}
                    >
            <Layer> 
            
            </Layer>
            
          </Stage>
        </Grid>
          <SaveModal
            onClose={()=>{setSaveModal(false)}}
            saveModalDefaultName={saveModalDefaultName}
            open={saveModal}
            onSave={saveGraph}

          /> 
          <GenerateGraphModal
          onClose={()=>{setGenerateModal(false)}}
          open={generateModal}
          onGenerate={generateGraph}

        />
      </Grid>

    </React.Fragment>
  );
}