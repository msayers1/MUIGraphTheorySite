import * as React from 'react';
import { styled } from '@mui/material/styles';
interface InputFileUploadProps {
    openGraph: (fileList: FileList) => void;
}
 
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    opacity: 0,
    width: 1,
    cursor: "pointer",
    zindex:1
  });

const InputFileUpload: React.FC<InputFileUploadProps> = ({ openGraph }) => {


    return(
        <VisuallyHiddenInput
            type="file"
            onChange={(event)=>{openGraph(event.target.files);}}
            aria-label="Upload file"
            accept='.json'
        />
    )

};
export default InputFileUpload;