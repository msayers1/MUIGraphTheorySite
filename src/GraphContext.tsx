import React, { createContext, useState, useContext } from "react";
import Konva from 'konva';
import GraphTabs from "./ui_handlers/graphtabs";
import { Tools } from './ui_handlers/tools';

interface GraphTabsContextType {
    graphTabs: GraphTabs;
}
// Create a Context
export const GraphContext = createContext<GraphTabsContextType|undefined>(undefined);

export const GraphProvider = ({ children }) => {
    const [noGraph, setNoGraph] = React.useState(true);
    const [clickToAddText, setClickToAddText] = React.useState(false);
    const [correctControlPanel, setCorrectControlPanel] = React.useState(0);
    const stage = new Konva.Stage({
        container: 'container',
        width: 1250,
        height: 700,
        draggable: true
    });
    // const tools = new Tools(stage);
    //   const graphTabs = new GraphTabs(stage.current, setClickToAddText, setNoGraph, setCorrectControlPanel);
    //   setGraphTabs(graphTabs);
    //   // console.log(graphTabs);
    const [graphTabs, setGraphTabs] = useState(new GraphTabs(stage,  setClickToAddText, setNoGraph, setCorrectControlPanel));

  return (
    <GraphContext.Provider value={{ graphTabs }}>
      {children}
    </GraphContext.Provider>
  );
};