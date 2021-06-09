import { CircularProgress, Paper, RootRef, Typography } from '@material-ui/core';
import React, { forwardRef, useCallback, useEffect } from 'react';
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
import FlipMove from 'react-flip-move';
import { BASE_URL } from '../../../../api/utils';
import { NumberCircularProgress } from './NumberCircularProgress';
import Cookies from 'js-cookie'

const axios = require('axios').default;


export default function ImageDropZone(props) {

    const { onListChanged, list, type } = { ...props }
    var classes = useStyles();

    const [state, setState] = React.useState({
        files: [...list],
        uploadProgress: 0,
        isUploading: false,
        uploadError: false,
    });

    useEffect(() => {
        setState({
            files: [...list], uploadProgress: 20, isUploading: false,
        })
    }, [list]);

    // console.log("STATE IZ IN DROP, ", state)




    // console.log("state files is", state)
    function uploadFile(file) {

        const formData = new FormData();
        formData.append("type", type);
        formData.append("file", file);
        formData.append("id", uuid())


        axios({
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `${Cookies.get('token')}`
            },
            method: "POST",
            data: formData,
            url: BASE_URL + "/upload", // route name
            // baseURL: "http://localhost:5000/upload_image", //local url
            onUploadProgress: progress => {
                console.log(`upload progress ${progress}`)
                const { total, loaded } = progress;
                const totalSizeInMB = total / 1000000;
                const loadedSizeInMB = loaded / 1000000;
                const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;

                setState({ ...state, isUploading: true, uploadProgress: Math.round(uploadPercentage) })

                // setState({ uploadProgress: uploadPercentage, ...state })
                console.log("total size in MB ==> ", totalSizeInMB);
                console.log("uploaded size in MB ==> ", loadedSizeInMB);
            },
            encType: "multipart/form-data",
        }).then(res => {


            console.log("file uploaded")

            onAddAnFile({ ...res.data, order: state.files.length })
            // console.log("upload res is", res.data)
            // var nList = [...state.files, ];
            // onListChanged(nList)

            // setState({ ...state, files: nList })

        }).catch(e => {
            console.log("error ", e)

            setState({ ...state, isUploading: false })

        });

        // fetch("http://localhost:5000/upload_image", {
        //     method: 'post',
        //     body: formData
        // })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log("Error occured", err));
    }

    const onAddAnFile = (file) => {
        // console.log("on Add an file , ", state)
        state.files.push(file)
        setState({ ...state, files: state.files, isUploading: false })
        onListChanged(state.files)
        // console.log("after Add an file , ", state)

    }

    const onSwapUp = (file) => {


        state.files[file.order - 1].order++
        state.files[file.order].order--
        state.files.sort((i, j) => i.order - j.order)
        setState({ ...state, files: state.files })
        onListChanged(state.files)

    }


    const onSwapDown = (file) => {

        state.files[file.order + 1].order--
        state.files[file.order].order++
        state.files.sort((i, j) => i.order - j.order)
        setState({ ...state, files: state.files })
        onListChanged(state.files)

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
        onListChanged(newList)

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
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: `${type}/*` })
    const { ref, ...rootProps } = getRootProps()

    // console.log("DropZone Render, state ", state)

    return (
        <RootRef rootRef={ref}>
            <Paper {...rootProps} className={classes.container}>
                <input {...getInputProps()} name={type}></input>
                <p><Trans>Drag 'n' drop some files here, or click to select files</Trans></p>

                {/* <FileView fileName={"test"} /> */}

                {
                    state.isUploading &&
                    <Paper style={{
                        marginTop: 20,
                        minWidth: 300, maxWidth: 600, minHeight: 100, maxHeight: 200,

                        border: "solid", borderRadius: 4, borderWidth: 2,
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "start",

                    }} >

                        <Typography style={{ marginTop: 20 }}> <Trans>Uploading...</Trans>  </Typography>



                        <NumberCircularProgress
                            style={{
                                marginTop: 20
                            }}
                            value={state.uploadProgress}
                        />


                    </Paper>
                }

                {state.files.map(file => {

                    return (

                        <FileView key={file.id} file={file} fileCount={state.files.length} onDelete={onDelete} onSwapDown={onSwapDown} onSwapUp={onSwapUp}
                            type={type}
                        />
                    )
                })}

                {/* < img src={"http://localhost:5000/b04cb420ab9974b2abad1478f986d0854e3771f67932bf270d625cbbb693d5bb/1614560400528-134994402.jpg"} style={{ width: 200, height: 200 }} ></img>
                < img src={"http://localhost:5000/b04cb420ab9974b2abad1478f986d0854e3771f67932bf270d625cbbb693d5bb/1614560400528-134994402.jpg"} style={{ width: 200, height: 200 }} ></img>
                < img src={"http://localhost:5000/b04cb420ab9974b2abad1478f986d0854e3771f67932bf270d625cbbb693d5bb/1614560400528-134994402.jpg"} style={{ width: 200, height: 200 }} ></img> */}


            </Paper>
        </RootRef >

    )
}