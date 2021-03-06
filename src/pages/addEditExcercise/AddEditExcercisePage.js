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
    InputLabel,
    FormControlLabel,
    Checkbox,
    InputAdornment
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
import ParameterView from "./components/ParameterView/ParameterView";


export default function AddEditExcercise(props) {
    var classes = useStyles();
    var theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [state, setState] = React.useState({
        title: '',
        type: "Excercise",
        images: [],
        videos: [],
        state: PageState.NOT_COMPLETED,
        parameters: {
            sets: {
                enabled: true,
                value: 1,
                valueType: "rep",
                title: t`Number of sets`,
                name: "sets"
            },
            reps: {
                enabled: true,
                value: 1,
                valueType: "rep",
                title: t`Number of reps`,
                name: "reps"
            },
            repPerDay: {
                enabled: true,
                value: 1,
                valueType: "rep",
                title: t`Number of reps per day`,
                name: "repPerDay"
            },
            hold: {
                enabled: true,
                value: 1,
                secondValue: 0,
                valueType: "time",
                title: t`Holding time`,
                name: "hold"
            },
            restPerSet: {
                enabled: true,
                value: 30,
                secondValue: 0,
                valueType: "time",
                title: t`Rest time between sets`,
                name: "restPerSet"
            },
            totalDuration: {
                enabled: true,
                value: 30,
                secondValue: 0,
                valueType: "time",
                title: t`Total duration`,
                name: "totalDuration"
            }
        }
    });

    const createOptions = () => {
        var options = []
        var i = 0
        for (; i < 20; i++)
            options.push({
                value: i, text: `${i}`
            }
            )
        return options
    }
    const options = createOptions()
    const handleParameterEnableSwap = (event) => {
        const name = event.target.name;
        const value = event.target.checked
        setState({
            ...state, parameters: {
                ...state.parameters,
                [name]: {
                    ...state.parameters[name],
                    enabled: value
                }
            }
        })

    }

    const handleParameterChange = (event, value, isFirstValueAssign = true) => {
        const name = event.target.name;
        console.log("handlePar", value)
        console.log("handlePar", event.target.name)
        // const isFirstValueAssign = event.target.isFirst
        console.log("handlePar", isFirstValueAssign)

        if (isFirstValueAssign)
            setState({
                ...state, parameters: {
                    ...state.parameters,
                    [name]: {
                        ...state.parameters[name],
                        value: value
                    }
                }
            })
        else
            setState({
                ...state, parameters: {
                    ...state.parameters,
                    [name]: {
                        ...state.parameters[name],
                        secondValue: value
                    }
                }
            })

    }
    const handleChange = (event) => {
        // setValue(newValue);
        const name = event.target.name;
        const value = event.target.value

        console.log("handleChange", event.target.value)
        setState({ ...state, [name]: value })

        // setState({
        //     ...state,
        //     [name]: event.target.value,
        // });
    };
    console.log("in page state is ", state)

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
                            onChange={handleChange}
                            value={state.title}
                            name="title"

                            // inputProps={{ style: { fontSize: 20 } }} // font size of input text
                            InputLabelProps={{ style: { fontWeight: "bold" } }} // font size of input label
                        />
                    </div>

                    <TextField className={classes.shortDescription} multiline rows={2} rowsMax={4} id="outlined-basic"
                        label={t`Short Description`} variant="outlined"
                        value={state.shortDescription}
                        onChange={handleChange}
                        name="shortDescription"
                    />

                    <TextField className={classes.longDescription} multiline rows={5} rowsMax={20} id="outlined-basic"
                        label={t`Long Description`} variant="outlined"
                        value={state.longDescription}
                        onChange={handleChange}
                        name="longDescription"
                    />

                    <Typography style={{ marginTop: 20 }} variant="h2" >
                        <Trans>Parameters</Trans>
                    </Typography>

                    <div className={classes.parametersContainer}>


                        {

                            Object.keys(state.parameters).map(key =>
                                <ParameterView parameter={state.parameters[key]} handleParameterChange={handleParameterChange}
                                    handleParameterEnableSwap={handleParameterEnableSwap}
                                />)


                        }



                    </div>



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