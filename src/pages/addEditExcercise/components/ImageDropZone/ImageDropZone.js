import { Paper, RootRef } from '@material-ui/core';
import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { useDropzone } from 'react-dropzone';
import UploadCard from '../UploadCard/UploadCard';
import useStyles from "./styles";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function ImageDropZone({ props }) {

    var classes = useStyles();

    const [state, setState] = React.useState({
        files: []
    });
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    const { ref, ...rootProps } = getRootProps()
    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps} className={classes.container}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                {/* <DragDropContext>

                    <Droppable className={classes.cardsContainer} droppableId={"imgDrop"} >
                        {
                            (provided) => (
                                <div>

                                    <Draggable key={1}><UploadCard text={"test"}></UploadCard></Draggable>
                                    <Draggable key={2}><UploadCard text={"test"}></UploadCard></Draggable>
                                </div>

                            )
                        }
                    </Droppable>
                </DragDropContext> */}

            </Paper>
        </RootRef >

    )
}