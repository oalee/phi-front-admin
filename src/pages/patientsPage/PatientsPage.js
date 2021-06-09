import React, { useEffect, useState } from "react";
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
    Card,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
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
import { useLocation } from "react-router";
import { useAPIContext } from "../../context/APIContext";
import PatientCardView from "./components/PatientCardView";

export default function PatientsPage(props) {
    var classes = useStyles();
    var theme = useTheme();
    const [userInput, setUserInput] = React.useState({ type: "Patient", patient: {} })
    const [value, setValue] = React.useState(1);

    const [createUser, createUserRes] = useMutation(CreatePatient, {
        onError: (err) => {

        }
    });

    // const myPatientsRes = useQuery(GetMyPatients)

    const [myPatients, setMyPatients] = React.useState([])

    const [openDialog, setOpenDialog] = React.useState(false);

    const location = useLocation()

    const APIContext = useAPIContext()

    console.log("api context in patiest page: ", APIContext)

    // if (myPatientsRes.data && myPatients.length === 0) {

    //     setMyPatients(myPatientsRes?.data.myPatients)
    // }
    console.log("my patients", myPatients)

    if (createUserRes.data?.addUser) {

        var allreadyAdded = myPatients.some(patient => patient.id === createUserRes.data?.addUser.id)
        console.log('alreadyAdded?', allreadyAdded)
        if (!allreadyAdded) {

            setMyPatients([...myPatients, createUserRes.data?.addUser])

            setOpenDialog(false)
        }

    }
    // const [getAllExercises, getAllExercisesState] = useLazyQuery(GetAllExercises)

    // const apiContext = useAPIContext()


    useEffect(() => {
        setMyPatients(APIContext.state.patients)

    }, [APIContext.state.patients])




    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handeAddPatientClick = () => {
        sendCreatePatientReq()
    }
    const handleUserInput = (e) => {
        const param = e.target.id
        const value = e.target.value
        userInput[param] = value

        // console.log(userInput)
    }

    const handlePatientInfo = (e) => {
        const param = e.target.id
        const value = e.target.value
        userInput.patient[param] = value

        if (param === "age" || param === "weight")
            try {
                userInput.patient[param] = parseInt(value)

            } catch (error) {
                userInput.patient[param] = value

            }
        console.log(userInput)

    }

    const sendCreatePatientReq = () => {

        createUser({
            variables: {
                userInput: userInput
            }
        })
    }


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
            <PageTitle title={t`Patients`}

                button={<Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{
                        width: 300,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "large"
                    }}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => {
                        setOpenDialog(true)
                        // console.log(`clicked, ${props.history}`)

                        // props.history.push('/app/addExercise')
                    }

                    }


                >

                    <Trans>Add an Patient</Trans>

                </Button>} />

            <div className={classes.container}>



                {
                    (myPatients.length > 0) &&

                    <Card className={classes.patientsContainer} key={"patients"} >

                        {
                            (myPatients.length === 0) &&
                            <Typography variant="h2" style={{ margin: 20 }}>
                                <Trans>Nothing found with the filter, change the filter</Trans>
                            </Typography>
                        }


                        {

                            myPatients.map((patient) =>

                                // <Typography> {patient.username} </Typography>
                                <PatientCardView patient={patient}
                                    key={patient.patient.id}

                                    onClick={() => {
                                        console.log("clicked")
                                        props.history.push('/app/schedule', {
                                            patient: patient
                                        })

                                    }} />
                            )
                        }

                    </Card>
                }


            </div>

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


                    {
                        createUserRes.loading &&

                        <LinearProgress style={{ marginTop: 20 }} />
                    }

                    {
                        createUserRes.error &&
                        <Typography>Error - try another Username</Typography>
                    }
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