import * as React from 'react';
import { Stage, Layer, Star, Line, Text, KonvaNodeComponent } from 'react-konva';
import { GraphHolder } from '../graph_core/graph';
import { GraphDrawing, EuclideanGraphDrawing } from "../drawing/graphdrawing";
import { EuclideanGraph } from "../graph_core/euclidean_graph";
import { Size } from "../commontypes";
import { Tools } from '../ui_handlers/tools';
// Props for the TabPanel component
interface GraphAreaProps {
  graphHolder: GraphHolder;
}

// export default function LeftSide(addGraph) {
const GraphArea: React.FC<GraphAreaProps> = ({ graphHolder }) => {
  const stage = React.useRef(null);
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const isDrawing = React.useRef(false);

  const INITIAL_STATE_GRAPHDRAWING = (graphHolder.graph instanceof EuclideanGraph) ? new EuclideanGraphDrawing(graphHolder.graph) : GraphDrawing.create(graphHolder.graph);
  const [graphDrawing, setDrawing] = React.useState(INITIAL_STATE_GRAPHDRAWING);

  React.useEffect(() => {
    const tools = new Tools(stage.current);
    graphDrawing.attachStage(stage.current,tools);
    console.log(stage.current);
  });
 
    // };
      return (
        <Stage 
          width={window.innerWidth} 
          height={window.innerHeight}
          draggable={true}
          ref={stage}
          >
            <Layer> 
            
            </Layer>
            
          </Stage>
      )
    
  }
  
  export default GraphArea;