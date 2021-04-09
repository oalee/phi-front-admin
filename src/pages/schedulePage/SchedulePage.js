


import React, { useEffect, useState } from "react";
import {
    Grid,
    LinearProgress,
    OutlinedInput,
    MenuItem,
    Button,
    Paper,
    Tabs,
    Tab,
    Card,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from "@material-ui/styles";

import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";

import useStyles from "./styles";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { t } from '@lingui/macro';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CreatePatient, GetAllExercises, GetMyPatients } from "../../api/queries";
import { Prompt, useLocation } from "react-router";
import { useAPIContext } from "../../context/APIContext";
import StyledButton from "../addEditExcercise/components/StyledButton/StyledButton";
import { PageState } from "../addEditExcercise/Constants";

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Select from 'react-select'
import { Calendar, DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import JalaliUtils from "@date-io/jalaali";
import moment from "moment";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function SchedulePage(props) {

    var classes = useStyles();

    const { history, location } = { ...props }

    console.log(location)
    const [selectedDate, handleDateChange] = useState(moment());

    var theme = useTheme();
    var patient = { ...location.state.patient.patient, username: location.state.patient.username }

    const [value, setValue] = React.useState(1);
    const [state, setState] = React.useState({ state: PageState.NOT_COMPLETED })
    const apiContext = useAPIContext()

    const exercises = apiContext.state.exercises
    // const [createUser, createUserRes] = useMutation(CreatePatient)

    // const myPatientsRes = useQuery(GetMyPatients)

    // const [myPatients, setMyPatients] = React.useState([])

    const [openDialog, setOpenDialog] = React.useState(false);

    // const location = useLocation()


    // const [getAllExercises, getAllExercisesState] = useLazyQuery(GetAllExercises)

    // const apiContext = useAPIContext()





    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handeAddPatientClick = () => {
        // sendCreatePatientReq()
    }
    const handleUserInput = (e) => {
        const param = e.target.id
        const value = e.target.value
        // userInput[param] = value

        // console.log(userInput)
    }

    const handlePatientInfo = (e) => {
        // const param = e.target.id
        // const value = e.target.value
        // userInput.patient[param] = value

        // if (param === "age" || param === "weight")
        //     try {
        //         userInput.patient[param] = parseInt(value)

        //     } catch (error) {
        //         userInput.patient[param] = value

        //     }
        // console.log(userInput)

    }
    const stateToButtonProps = () => {

        var props = {
            className: classes.buttonSuccess,
            icon: <SendIcon />,
            label: (state.state === PageState.COMPLETED_NOT_SENT) ? t`Submit` : t`Sumbit Edit`,
            disabled: false,
            onClick: () => {
                console.log("clicked, send update")

            }
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
                        // doAddExcercise({
                        //     variables: {
                        //         addExerciseInput: state
                        //     }
                        // })
                        // setState({ ...state, state: PageState.SENDING })
                    }

                }
                break

            case PageState.EDITED:
                props = {
                    ...props,
                    onClick: () => {
                        // updateExercise({
                        //     variables: {
                        //         updateInput: getUpdateDiff(prevExcercise, state)
                        //     }
                        // })
                        // setState({ ...state, state: PageState.SENDING })

                    }
                }
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
    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ];

    const exerciseOptions = exercises.map(exercise => { return { value: exercise.title, label: exercise.title } })



    const selectStyle = {
        control: base => ({
            ...base,
            fontSize: 25
        }),
        menu: base => ({
            ...base,

            fontSize: 25
        })
    };



    // const filterFunction = (e) => {
    //     var query = e.target.value
    //     console.log('query is', query)
    //     if (query === "") {
    //         setExercises(apiContext.state.exercises)
    //     } else {
    //         setExercises(apiContext.state.exercises.filter(exercise => exercise.title.includes(query)))
    //     }
    // }

    return (
        <>
            <div style={{
                position: "relative"
            }}>

                {
                    // <Prompt
                    //     when={PageState.SENT !== state.state}
                    //     message={location =>
                    //         t`Are you sure? information change would be lost.`
                    //     }
                    // />
                }

                <div style={{ position: "absolute", display: "flex", justifyContent: "flex-end", width: "90%", flexDirection: "column", alignItems: "end" }}>

                    <StyledButton props={stateToButtonProps(state.state)} />
                    {/* {(state.state === PageState.EDITED || state.state === PageState.SENT) && <StyledButton props={stateToSecondButtonProps(state.state)} />} */}

                </div>

                <div>


                    <PageTitle title={t`Therapy Schedule`} />

                    <div className={classes.mainContainer}>

                        <div style={{ display: "flex", flexWrap: "wrap" }}>

                            <Paper style={{ width: 300, margin: 20, padding: 20 }}>
                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Name</Trans> : {patient.name}
                                </Typography>


                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Username</Trans> : {patient.username}
                                </Typography>


                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Age</Trans> : {patient.age}
                                </Typography>
                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Weight</Trans> : {patient.weight}
                                </Typography>
                                <Button size="large" color="primary" style={{ marginTop: 15 }}>
                                    <Trans>Edit Information</Trans>
                                </Button>

                            </Paper>
                            <Paper style={{ width: 300, margin: 20, padding: 20 }}>
                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Done Assesments</Trans> : 22
                                </Typography>



                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Unread Assesments</Trans> : 5
                                </Typography>

                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Sessions Done</Trans> : 5
                                </Typography>

                                <Typography style={{ marginTop: 25 }} variant="h5" >
                                    <Trans>Sessions</Trans> : 5
                                </Typography>

                                <Button size="large" color="primary" style={{ marginTop: 15 }}>
                                    <Trans>Read Assesments</Trans>
                                </Button>

                            </Paper>

                        </div>


                        <div style={{ display: "flex" }}>

                            <Typography style={{ marginTop: 25 }} variant="h2" >
                                <Trans>Exercises</Trans>
                            </Typography>
                            {/* <IconButton color="primary" aria-label="add an exercise" >
                                <AddCircleOutlineIcon style={{ width: 50, height: 50, margin: 8 }} />
                            </IconButton> */}

                        </div>
                        <div style={{ marginTop: 20, padding: 25 }}>

                            <Select
                                defaultValue={[colourOptions[2], colourOptions[3]]}
                                isMulti
                                name="colors"
                                options={exerciseOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={selectStyle}
                            />
                        </div>

                        <div className={classes.imageDropBoxContainer}>


                        </div>
                        <Typography style={{ marginTop: theme.spacing(1) }} variant="h2" >
                            <Trans>Schedule</Trans>
                        </Typography>
                        {/* */}
                        <div style={{ display: "flex" }}>
                            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa"   >
                                <DatePicker
                                    okLabel="تأیید"
                                    cancelLabel="لغو"
                                    labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                                <DatePicker
                                    variant="static"
                                    labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                                {/* <Calendar date={selectedDate} /> */}
                            </MuiPickersUtilsProvider>

                        </div>
                    </div>
                </div>
            </div >

            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><Trans>Add an Patient</Trans></DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label={t`Username`}
                        type="text"
                        fullWidth
                        onChange={handleUserInput}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label={t`Password`}
                        type="password"
                        onChange={handleUserInput}

                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={t`Name`}
                        type="text"
                        fullWidth
                        onChange={handlePatientInfo}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="age"
                        label={t`Age`}
                        type="number"
                        fullWidth
                        onChange={handlePatientInfo}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="weight"
                        label={t`Weight`}
                        type="number"
                        fullWidth
                        onChange={handlePatientInfo}

                    />



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <Trans>Cancel</Trans>
                    </Button>
                    <Button onClick={handeAddPatientClick} color="primary">
                        <Trans>Add</Trans>
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );

}