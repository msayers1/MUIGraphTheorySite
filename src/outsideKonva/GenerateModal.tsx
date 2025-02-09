import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Select,
  FormGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  InputLabel,
  Radio
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Grid from '@mui/material/Grid2';
import { GenerateGraphPackage } from "../ui_handlers/graphgenerate";

interface GenerateGraphModalProps {
  onClose: () => void;
  open: boolean;
  onGenerate: (generateGraphPackage: GenerateGraphPackage) => void;
}

const GenerateGraphModal: React.FC<GenerateGraphModalProps> = ({ onClose, open, onGenerate }) => {
    const [formData, setFormData] = useState<GenerateGraphPackage>({
        graphType: "Complete-Graph",
        numVertices: 5,
        secondNumVertices: 5,
        weighted: false,
        directed: false,
      });
//   const [graphType, setGraphType] = useState<string>();
//   const [numVertices, setNumVertices] = useState<number>(5);
//   const [secondNumVertices, setSecondNumVertices] = useState<number>(5);
//   const [weighted, setWeighted] = useState<number>(5);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => {
            switch (name) {
                case "numVertices":
                return { ...prev, numVertices: Number(value) };
        
                case "secondNumVertices":
                return { ...prev, secondNumVertices: Number(value) };

                default:
                return prev;
            }
        });
    };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setFormData((prev) => {
        return { ...prev, graphType: value };
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { name } = event.target;
    
    // const newValue = value == 'on'; 
    setFormData((prev) => {
        switch (name) {
            case "weighted":
            console.log(prev.weighted?false:true);
            return { ...prev, weighted: prev.weighted?false:true };
    
            case "directed":
            return { ...prev, directed: prev.directed?false:true };

            default:
            return prev;
        }
    });
  }
  // Handle generate action
  const handleGenerate = () => {
    onGenerate(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Generate Graph</DialogTitle>
      <DialogContent>
        <FormGroup>   
            <Grid container spacing={1} >
                <Grid size={{md: 12}}>
                    <InputLabel id="graph-type-label">Graph Type</InputLabel>
                    <Select
                    fullWidth
                    labelId="graph-type-label"
                    id="graph-type"
                    value={formData.graphType}
                    label="Graph Type:"
                    onChange={handleSelectChange}
                    >
                        <MenuItem value={"Complete-Graph"}>Complete Graph</MenuItem>
                        <MenuItem value={"Complete-Bipartite-Graph"}>Complete Bipartite Graph</MenuItem>
                        {/*<MenuItem value={"Walk-Path"}>Walk/Path</MenuItem>
                        <MenuItem value={"Null Graph"}>Null Graph</MenuItem>*/}
                    </Select>
                </Grid>
                <Grid size={{md: (formData.graphType == "Complete-Bipartite-Graph")?6:12}}>
                    {/* Number of Vertices Input */}
                    <TextField
                        label="Number of vertices:"
                        variant="outlined"
                        fullWidth={(formData.graphType == "Complete-Bipartite-Graph")?false:true}
                        sx={{ mt: 2 }}
                        type="number"
                        name="numVertices"
                        value={formData.numVertices}
                        onChange={handleChange}
                    />
                </Grid>
                {(formData.graphType == "Complete-Bipartite-Graph")? 
                    <Grid size={{md: 6}}>
                        <TextField
                            variant="outlined"
                            sx={{ mt: 2 }}
                            type="number"
                            name="secondNumVertices"
                            value={formData.secondNumVertices}
                            onChange={handleChange}
                        />
                    </Grid>
                :<div/>
                }
                <Grid size={{md:6}}>
                    <FormControlLabel control={<Checkbox
                            name = "weighted"
                            checked={formData.weighted}
                            onChange={handleCheckboxChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Weighted" />
                </Grid>
                <Grid size={{md:6}}>
                    <FormControlLabel control={<Checkbox
                            name = "directed"
                            checked={formData.directed}
                            onChange={handleCheckboxChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />} label="Directed" />
                </Grid>
            </Grid>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleGenerate} variant="contained" >
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateGraphModal;
