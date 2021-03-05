import React, { useState } from "react";
import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
    Button,
    Paper,
    Tabs,
    Tab,
    TextField,
    FormControl,
    InputLabel
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from "@material-ui/styles";

// import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";

import useStyles from "./styles";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { t } from '@lingui/macro';
import PageTitle from "../../components/PageTitle/PageTitle";
import ReactDropzone from "react-dropzone";
import ImageDropZone from "./components/ImageDropZone/ImageDropZone"
import { PageState } from "./Constants"
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';
import clsx from 'clsx';
import { Pages } from "@material-ui/icons";
import StyledButton from "./components/StyledButton/StyledButton";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Prompt } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default function AddEditExcercise(props) {
    var classes = useStyles();
    var theme = useTheme();

    const [state, setState] = React.useState({
        title: '',
        type: t`Excercise`,
        images: [],
        videos: [],
        state: PageState.NOT_COMPLETED
    });


    const handleChange = (event, newValue) => {
        // setValue(newValue);
        console.log(`handeChange ${newValue}`)

        const name = event.target.name;
        // setState({
        //     ...state,
        //     [name]: event.target.value,
        // });
    };

    function onImagesChanged(images) {


        // console.log("on changed, state is, bef ", state)
        setState({ ...state, images: images })
        // console.log("images changed, after state is, af ", state)

    }

    function onVideosChanged(videos) {
        // console.log("on changed, state is, bef", state)

        setState({ ...state, videos: videos })
        // console.log("images changed, after state is, af ", state)

    }

    const stateToSecondButtonProps = () => {
        var props = {
            className: classes.button,
            icon: <RestoreIcon />,
            label: t`Restore`,
            disabled: false
        }

        if (state.state === PageState.SENT)
            props = { ...props, icon: <ArrowBackIcon />, label: t`Back` }

        return props
    }

    const stateToButtonProps = () => {

        var props = {
            className: classes.button,
            icon: <SaveIcon />,
            label: t`Save`,
            disabled: false
        }
        switch (state.state) {
            case PageState.NOT_COMPLETED:
                props = {
                    ...props,
                    disabled: true,
                    label: t`Form is incomplete`
                }
                break

            case PageState.COMPLETED_NOT_SENT:
                break

            case PageState.EDITED:
                break

            case PageState.SENDING:
                props = {
                    ...props,
                    icon: <SaveIcon />,
                    label: t`Sending`,
                    disabled: true,
                    loading: true
                }
                break

            case PageState.SENT:
                props = {
                    ...props,
                    className: classes.buttonSuccess,
                    icon: <CheckCircleOutlineIcon />,
                    label: t`Sent`,
                    disabled: false
                }

                break
            default:
                break;
        }

        return props

    }

    return (
        <div style={{
            position: "relative"
        }}>

            {
                <Prompt
                    when={PageState.SENT === state.state}
                    message={location =>
                        t`Are you sure? information change would be lost.`
                    }
                />
            }
            {
                console.log("on render page , with state ", state)
            }

            <div style={{ position: "absolute", display: "flex", justifyContent: "flex-end", width: "90%", flexDirection: "column", alignItems: "end" }}>

                <StyledButton props={stateToButtonProps(state.state)} />
                {/* <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={state.state === PageState.NOT_COMPLETED || state.state === PageState.SENDING}
                    className={classes.buttonSuccess}
                    startIcon={<SaveIcon />}
                >
                    Save
             </Button> */}

                {(state.state === PageState.EDITED || state.state === PageState.SENT) && <StyledButton props={stateToSecondButtonProps(state.state)} />
                }

            </div>

            <div>


                <PageTitle title={t`Add an Excercise`} />

                <div className={classes.mainContainer}>

                    <div className={classes.typeContainer}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel variant="outlined" htmlFor="outlined-age-native-simple">{t`Type`}</InputLabel>
                            <Select
                                native
                                value={state.type}
                                onChange={handleChange}
                                label="Type"
                                inputProps={{
                                    name: 'type',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value="Excercise">{t`Excercise`}</option>
                                <option value="Eductional">{t`Eductional`}</option>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={classes.titleContainer} >

                        <TextField id="outlined-basic" label={t`Title`} multiline variant="outlined"

                            // inputProps={{ style: { fontSize: 20 } }} // font size of input text
                            InputLabelProps={{ style: { fontWeight: "bold" } }} // font size of input label
                        />
                    </div>

                    <TextField className={classes.shortDescription} multiline rows={2} rowsMax={4} id="outlined-basic" label={t`Short Description`} variant="outlined" />

                    <TextField className={classes.longDescription} multiline rows={5} rowsMax={20} id="outlined-basic" label={t`Long Description`} variant="outlined" />


                    <Typography style={{ marginTop: 20 }} variant="h2" >
                        <Trans>Pictures</Trans>
                    </Typography>

                    <div className={classes.imageDropBoxContainer}>

                        <ImageDropZone key={state.images} className={classes.dropzone} list={state.images} onListChanged={onImagesChanged}
                            type="image"
                        ></ImageDropZone>
                    </div>
                    <Typography style={{ marginTop: theme.spacing(10) }} variant="h2" >
                        <Trans>Videos</Trans>
                    </Typography>

                    <div className={classes.imageDropBoxContainer}>

                        <ImageDropZone key={state.videos} className={classes.dropzone} list={state.videos} onListChanged={onVideosChanged}
                            type="video"
                        ></ImageDropZone>
                    </div>

                </div>
            </div>
        </div >
    );

}