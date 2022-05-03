import React from 'react';
import Button from '@mui/material/Button';
export function ZButton(props) {
    function butSwitch(){
        if (props.z===""){
            props.getZ("z")
        }
        else{
            props.getZ("")
        }
    }
    return( 
    <Button color = {props.z ==="" ? "primary" : "success"} variant = {props.z==="" ? "outlined": "contained"} size = "small" onClick={butSwitch}>Z-Score</Button> 
    )
}