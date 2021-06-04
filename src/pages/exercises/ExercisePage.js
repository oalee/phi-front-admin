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
    TextField
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

    const [excercises, setExercises] = React.useState()
    const location = useLocation()

    // const [getAllExercises, getAllExercisesState] = useLazyQuery(GetAllExercises)

    const apiContext = useAPIContext()

    console.log(apiContext)
    // if (apiContext.state.exercises.data === undefined && apiContext.state.loading === false)
    //     apiContext.state.getAllExercises()
    // var excercises = apiContext.state.exercises
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

    useEffect(() => {
        setExercises(apiContext.state.exercises)

    }, [apiContext.state.exercises])



    const filterFunction = (e) => {
        var query = e.target.value
        console.log('query is', query)
        if (query === "") {
            setExercises(apiContext.state.exercises)
        } else {
            setExercises(apiContext.state.exercises.filter(exercise => exercise.title.includes(query)))
        }
    }

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

                <div className={classes.filtersContainer}>

                    {/* <Typography variant="h2" style={{ margin: 20 }}>
                        <Trans>Filters</Trans>
                    </Typography> */}

                    <TextField id="outlined-basic" label={t`Search`} variant="outlined"
                        style={{ marginTop: 20 }}
                        onChange={filterFunction}
                    />
                </div>

                {
                    (excercises != null) &&

                    <Card className={classes.excerciseContainer} >

                        {
                            (excercises.length === 0) &&
                            <Typography variant="h2" style={{ margin: 20 }}>
                                <Trans>Nothing found with the filter, change the filter</Trans>
                            </Typography>
                        }


                        {

                            excercises.map((exercise) =>
                                <ExerciseView exercise={exercise}
                                    key={exercise.id}
                                    onClick={() => {
                                        console.log("clicked")
                                        props.history.push('/app/editExercise', {
                                            exercise: exercise
                                        })
                                    }} />
                            )
                        }

                    </Card>
                }


            </div>

        </>
    );

}