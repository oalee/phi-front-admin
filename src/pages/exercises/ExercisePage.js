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
    Tab
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from "@material-ui/styles";

import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";

import useStyles from "./styles";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { t } from '@lingui/macro';
import { useLazyQuery } from "@apollo/client";
import { GetAllExercises } from "../../api/queries";
import ExerciseView from "./components/ExerciseView"
import { useLocation } from "react-router";
import { useAPIContext } from "../../context/APIContext";

export default function ExercisePage(props) {
    var classes = useStyles();
    var theme = useTheme();

    const [value, setValue] = React.useState(1);
    const location = useLocation()

    // const [getAllExercises, getAllExercisesState] = useLazyQuery(GetAllExercises)

    const apiContext = useAPIContext()

    console.log(apiContext)
    // if (apiContext.state.exercises.data === undefined && apiContext.state.loading === false)
    //     apiContext.state.getAllExercises()
    var excercises = apiContext.state.exercises
    // console.log("exercises are ", getAllExercisesState)
    // if (getAllExercisesState.data != null) {
    //     console.log("data is ", getAllExercisesState.data.allExercises)
    //     excercises = [...getAllExercisesState.data.allExercises]

    // }

    console.log("location in exercise page is ", location)

    // if (excercises && location.state && location.state.addedExercise) {
    //     excercises.push(location.state.addedExercise)
    // }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // useEffect(() => {
    //     if (!getAllExercisesState.loading)
    //         getAllExercises()
    // }, [])




    return (
        <>
            <PageTitle title={t`Excercises`}

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
                        console.log(`clicked, ${props.history}`)

                        props.history.push('/app/addExercise')
                    }

                    }


                >

                    <Trans>Add an Exercise</Trans>

                </Button>} />

            <div className={classes.container}>

                <div className={classes.filtersContainer}> </div>

                {
                    (excercises != null) &&

                    <div className={classes.excerciseContainer}>


                        {

                            excercises.map((exercise) =>
                                <ExerciseView exercise={exercise} onClick={() => {
                                    console.log("clicked")
                                    props.history.push('/app/editExercise', {
                                        exercise: exercise
                                    })
                                }} />
                            )
                        }

                    </div>
                }


            </div>

        </>
    );

}