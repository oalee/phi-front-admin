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
import { Prompt, useLocation } from "react-router";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ParameterView from "./components/ParameterView/ParameterView";
import { isNonEmptyArray } from "@apollo/client/utilities";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AddExcercise } from "../../api/queries";
import SendIcon from '@material-ui/icons/Send';

export default function AddEditExercisePage(props) {
    var classes = useStyles();
    var theme = useTheme();

    const [state, setState] = React.useState({
        title: '',
        type: "Exercise",
        pictures: [],
        videos: [],
        state: PageState.NOT_COMPLETED,
        shortDescription: '',
        longDescription: '',
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
        },
        assesments: {
            tiredness: {
                enabled: true,
                title: t`Tiredness`,
                name: "tiredness"
            },
            dificulty: {

                enabled: true,
                title: t`Exercise Dificulty`,
                name: "dificulty"
            },
            shortnessOfBreath: {

                enabled: true,
                title: t`Shortness of Breath`,
                name: "shortnessOfBreath"
            },
            pain: {

                enabled: true,
                title: t`Pain`,
                name: "pain"
            }
        }
    });

    const [doAddExcercise, addExcerciseQuery] = useMutation(AddExcercise);
    const [prevExcercise, setPrevExcercise] = useState(null)
    // const location = useLocation()

    const { history, location } = { ...props }

    console.log("location is", location)
    if (location.state && location.state.exercise != null && state.state === PageState.NOT_COMPLETED) {
        const mergedParams = {}
        const exercise = location.state.exercise
        console.log(exercise.parameters)
        Object.keys(state.parameters).forEach(key => {
            console.log("key is", key)
            console.log("value is", state.parameters[key])
            mergedParams[key] = { ...state.parameters[key], ...exercise.parameters[key] }

        })
        console.log("mergedParames", mergedParams)

        const mergedAssesments = {}
        Object.keys(state.assesments).forEach(key => {
            console.log("key is", key)
            console.log("value is", state.assesments[key])
            mergedAssesments[key] = { ...state.assesments[key], ...exercise.assesments[key] }

        })
        console.log("mergedAssesments", mergedAssesments)

        setState({ ...exercise, parameters: mergedParams, assesments: mergedAssesments, state: PageState.SENT, type: "Exercise" })
        setPrevExcercise({ ...exercise, parameters: mergedParams, assesments: mergedAssesments })
    }

    // console.log("the res is ", addExcerciseQuery)

    if (prevExcercise != null) {
        console.log("prev is", prevExcercise)

        if (state.title !== prevExcercise.title && state.state !== PageState.EDITED) {
            setState({ ...state, state: PageState.EDITED })
        }
    }

    if (addExcerciseQuery.data != null) {
        // console.log("data is not null", addExcerciseQuery.data.addexercise)
        if (prevExcercise !== addExcerciseQuery.data.addexercise) {
            // console.log("sett it")
            setPrevExcercise(addExcerciseQuery.data.addexercise)
        }


        if (state.state === PageState.SENDING) {
            setState({ ...state, state: PageState.SENT })
        }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const isComplete = Object.keys(state).reduce((acc, key) => {
        const val = state[key]
        const isNonEmptyArray = Array.isArray(val) ? val.length > 0 : true
        console.log("val is ", val)
        console.log("is not empty array ", isNonEmptyArray)
        return val != null && val !== "" && isNonEmptyArray && acc


    }, true)


    if (state.state === PageState.NOT_COMPLETED) {


        // console.log("isCOplete?", isComplete)

        if (isComplete)
            setState({ ...state, state: PageState.COMPLETED_NOT_SENT })
    }

    if (state.state === PageState.COMPLETED_NOT_SENT) {

        if (!isComplete)
            setState({ ...state, state: PageState.NOT_COMPLETED })

    }

    const handleAssemstersEnableSwap = (event) => {
        const name = event.target.name;
        const value = event.target.checked
        setState({
            ...state, assesments: {
                ...state.assesments,
                [name]: {
                    ...state.assesments[name],
                    enabled: value
                }
            }
        })
    }

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
                        value: value.toInt()
                    }
                }
            })
        else
            setState({
                ...state, parameters: {
                    ...state.parameters,
                    [name]: {
                        ...state.parameters[name],
                        secondValue: value.toInt()
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


        console.log("on changed, state is, bef ", state)
        // setState( (prevState) =>  { ...prevState, images: images })
        setState(prevState => {
            return {
                ...prevState,
                pictures: images
            }
        });

        console.log("images changed, after state is, af ", state)

    }

    function onVideosChanged(videos) {
        // console.log("on changed, state is, bef", state)

        // setState({ ...state, videos: videos })
        setState(prevState => {
            return {
                ...prevState,
                videos: videos
            }
        });
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
            props = {
                ...props, icon: <ArrowBackIcon />, label: t`Back`,
                onClick: (e) => {

                    history.replace('/app/exercises', { addedExercise: state })
                }
            }

        return props
    }

    const stateToButtonProps = () => {

        var props = {
            className: classes.buttonSuccess,
            icon: <SendIcon />,
            label: (state.state === PageState.COMPLETED_NOT_SENT) ? t`Submit` : t`Sumbit Edit`,
            disabled: false,
            onClick: () => { console.log("clicked") }
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
                props = {
                    ...props,
                    onClick: (e) => {
                        console.log("doAddExcercise")
                        doAddExcercise({
                            variables: {
                                addExerciseInput: state
                            }
                        })
                        setState({ ...state, state: PageState.SENDING })
                    }

                }
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
                    disabled: false,
                    onClick: () => { history.goBack() }
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
                    when={PageState.SENT !== state.state}
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


                <PageTitle title={t`Add an Exercise`} />

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
                                <option value="Exercise">{t`Exercise`}</option>
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
                    {state.type === "Exercise" &&
                        <Typography style={{ marginTop: 30 }} variant="h2" >
                            <Trans>Parameters</Trans>
                        </Typography>

                    }
                    {state.type === "Exercise" &&

                        <div className={classes.parametersContainer}>


                            {

                                Object.keys(state.parameters).map(key =>
                                    <ParameterView parameter={state.parameters[key]} handleParameterChange={handleParameterChange}
                                        key={state.parameters[key].name}
                                        handleParameterEnableSwap={handleParameterEnableSwap}
                                    />)


                            }



                        </div>
                    }

                    <Typography style={{ marginTop: 20 }} variant="h2" >
                        <Trans>Assesments</Trans>
                    </Typography>
                    <div className={classes.parametersContainer}>

                        {
                            Object.values(state.assesments).map(value =>

                                <FormControlLabel
                                    key={value.name}
                                    control={
                                        <Checkbox
                                            checked={value.enabled}
                                            onChange={handleAssemstersEnableSwap}
                                            name={value.name}
                                            color="primary"
                                        />
                                    }
                                    label={value.title}
                                />

                            )

                        }

                    </div>




                    <Typography style={{ marginTop: 25 }} variant="h2" >
                        <Trans>Pictures</Trans>
                    </Typography>

                    <div className={classes.imageDropBoxContainer}>

                        <ImageDropZone key={state.images} className={classes.dropzone} list={state.pictures} onListChanged={onImagesChanged}
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