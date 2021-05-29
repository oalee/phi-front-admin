import { t } from "@lingui/macro";
import { Trans } from "@lingui/react";
import { Typography } from "@material-ui/core";
import useStyles from "./styles";


export default function ExerciseEvaluation(props) {

    var classes = useStyles();

    const { exercise, evaluation, parameters } = { ...props }

    const assesments = evaluation.assesments.filter((item) => item.enabled === true)
    const doneParameters = evaluation.parameters.filter((item) => item.enabled === true)
    const filteredParams = parameters.parameters.filter((item) => item.enabled === true)

    return (
        <div
            className={classes.container}
        >
            <Typography style={{ margin: 20 }} variant="h3" >
                {t`Exercise`} : {exercise.title}
            </Typography>

            <div
                className={classes.parametersContainer}
            >
                {
                    assesments.map(assesment => {
                        return (
                            <Typography style={{ margin: 20 }} variant="h5" >
                                {assesment.title} : {assesment.value}
                            </Typography>
                        )
                    })
                }

            </div>



            <Typography style={{ margin: 20 }} variant="h4" >
                {t`Parameters set for day`} :
</Typography>


            <div
                className={classes.parametersContainer}
            >


                {
                    filteredParams.map(assesment => {
                        return (
                            <Typography style={{ margin: 20 }} variant="h5" >
                                {assesment.title} : {assesment.value}
                            </Typography>
                        )
                    })
                }


            </div>

            <Typography style={{ margin: 20 }} variant="h4" >
                {t`Parameters done for day`} :
                </Typography>


            <div
                className={classes.parametersContainer}
            >



                {
                    doneParameters.map(assesment => {
                        return (
                            <Typography style={{ margin: 20 }} variant="h5" >
                                {assesment.title} : {assesment.value}
                            </Typography>
                        )
                    })
                }



            </div>

            {
                (evaluation.feedback && evaluation.feedback !== "") &&

                <Typography style={{ margin: 20 }} variant="h4" >
                    {t`Feedback`} :
                </Typography>
            }
            {
                (evaluation.feedback && evaluation.feedback !== "") &&

                <Typography style={{ margin: 20 }} variant="h4" >
                    {evaluation.feedback}
                </Typography>
            }

        </div>
    )
}