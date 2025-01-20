import * as React from 'react';
import { GraphHolder } from '../graph_core/graph';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GraphArea from '../drawing/GraphArea';
// Props for the TabPanel component
interface TabPanelProps {
    children: React.ReactNode;
    value: number;
    index: number;
}

// A functional component to display TabPanels
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    >
    {value === index && (
        <Box sx={{ p: 3 }}>
        {children}
        </Box>
    )}
    </div>
);
};

// Props for the TabPanel component
interface GraphTabsProps {
graphs: GraphHolder[];
}


const GraphTabs: React.FC<GraphTabsProps> = ({ graphs }) => {
    const [tab, setTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <React.Fragment>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                {graphs.map((graph, index) => (
                    <Tab key={graph.id} label={graph.name} id={`tab-${index}`} />
                ))}
                </Tabs>
            </Box>
            {graphs.map((graphHolder, index) => (
                <TabPanel key={graphHolder.id} value={tab} index={index}>
                    <GraphArea
                        graphHolder={graphHolder}
                        />
                </TabPanel>
            ))}
        </React.Fragment>
    );

}

export default GraphTabs;