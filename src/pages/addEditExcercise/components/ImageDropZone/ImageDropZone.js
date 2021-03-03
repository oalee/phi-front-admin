import { Paper, RootRef } from '@material-ui/core';
import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { useDropzone } from 'react-dropzone';
import UploadCard from '../UploadCard/UploadCard';
import useStyles from "./styles";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FileView from '../FileView/FileView';
import { v4 as uuid } from "uuid"
import { Trans } from '@lingui/macro';
import DraggableFileList from '../DraggableFileList/DraggableFileList';
const axios = require('axios').default;


export default function ImageDropZone(props) {

    const { onImagesChanged, images } = { ...props }
    var classes = useStyles();

    const [state, setState] = React.useState({
        files: images,
        uploadProgress: 0
    });

    const [uploadProgress, setUploadProgress] = React.useState({

        progress: 0,
        id: null,
    })


    console.log("state files is", state)
    function uploadFile(file) {

        const formData = new FormData();
        formData.append("name", "image");
        formData.append("image", file);
        formData.append("id", uuid())
        axios({
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `${localStorage.getItem('token')}`
            },
            method: "POST",
            data: formData,
            url: "http://localhost:5000/upload_image", // route name
            // baseURL: "http://localhost:5000/upload-image", //local url
            onUploadProgress: progress => {
                console.log(`upload progress ${progress}`)
                const { total, loaded } = progress;
                const totalSizeInMB = total / 1000000;
                const loadedSizeInMB = loaded / 1000000;
                const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
                // setState({ uploadProgress: uploadPercentage, ...state })
                console.log("total size in MB ==> ", totalSizeInMB);
                console.log("uploaded size in MB ==> ", loadedSizeInMB);
            },
            encType: "multipart/form-data",
        }).then(res => {

            console.log("upload res is", res.data)
            state.files = [...state.files, { ...res.data, order: state.files.length }];
            setState({ files: state.files, ...state })
            onImagesChanged(state.files)

        }).catch(e => { console.log("error ", e) });

        // fetch("http://localhost:5000/upload_image", {
        //     method: 'post',
        //     body: formData
        // })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log("Error occured", err));
    }

    const onSwapUp = (file) => {


        state.files[file.order - 1].order++
        state.files[file.order].order--
        state.files.sort((i, j) => i.order - j.order)
        setState({ ...state, files: state.files })
        onImagesChanged(state.files)

    }


    const onSwapDown = (file) => {

        state.files[file.order + 1].order--
        state.files[file.order].order++
        state.files.sort((i, j) => i.order - j.order)
        setState({ ...state, files: state.files })
        onImagesChanged(state.files)

    }

    const onDelete = (file) => {

        var newList = state.files.filter(item => item.order !== file.order).map((i) => {
            if (file.order < i.order)
                i.order--
            return i
        })
        newList.sort((i, j) => i.order - j.order)

        // newList

        setState({ ...state, files: newList })
        onImagesChanged(newList)

    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log(`file is ${file}`)
            uploadFile(file)

            // const reader = new FileReader()

            // reader.onabort = () => console.log('file reading was aborted')
            // reader.onerror = () => console.log('file reading has failed')
            // reader.onload = () => {
            //     // Do whatever you want with the file contents
            //     const binaryStr = reader.result
            //     console.log(binaryStr)

            // }

        })

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    const { ref, ...rootProps } = getRootProps()
    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps} className={classes.container}>
                <input {...getInputProps()} name="Image" />
                <p><Trans>Drag 'n' drop some files here, or click to select files</Trans></p>

                {/* <FileView fileName={"test"} /> */}

                {state.files.map(file => {

                    console.log(`for each file ${file.url}`)
                    return (

                        <FileView key={file.id} file={file} fileCount={state.files.length} onDelete={onDelete} onSwapDown={onSwapDown} onSwapUp={onSwapUp} />
                    )
                })}

                {/* < img src={"http://localhost:5000/b04cb420ab9974b2abad1478f986d0854e3771f67932bf270d625cbbb693d5bb/1614560400528-134994402.jpg"} style={{ width: 200, height: 200 }} ></img>
                < img src={"http://localhost:5000/b04cb420ab9974b2abad1478f986d0854e3771f67932bf270d625cbbb693d5bb/1614560400528-134994402.jpg"} style={{ width: 200, height: 200 }} ></img>
                < img src={"http://localhost:5000/b04cb420ab9974b2abad1478f986d0854e3771f67932bf270d625cbbb693d5bb/1614560400528-134994402.jpg"} style={{ width: 200, height: 200 }} ></img> */}


            </Paper>
        </RootRef >

    )
}