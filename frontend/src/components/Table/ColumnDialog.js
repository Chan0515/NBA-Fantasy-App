import React from 'react'
import Dialog from '@mui/material/Dialog';
export default function ColumnDialog(props){
    return(
      <Dialog maxWidth = 'lg' onClose={props.onClose} open = {props.open}>
        {props.children}
      </Dialog>
    )
  }