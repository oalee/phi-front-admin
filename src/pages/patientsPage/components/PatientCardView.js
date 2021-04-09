

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Trans } from '@lingui/macro';
import avatarPlaceholder from "../../../static/images/avatar_placeholder.svg"

const useStyles = makeStyles(theme => ({
    root: {
        display: "flexDirection",
        flexDirection: "column",
        justifySelf: "center",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        maxWidth: 225,
        minWidth: 190,
        // maxHeight: 305,
        margin: theme.spacing(4)
    },
    media: {
        height: 160,
        width: 160,
        display: "flex",
        // alignSelf: "center"
        justifySelf: "center"
        // minHeight: 180,
        // maxHeight: 180,
        // minWidth: 100
    },
}))

export default function PatientCardView(props) {
    const { patient, onClick } = { ...props }
    const { name } = { ...patient.patient }
    const classes = useStyles();

    console.log(patient)

    return (
        <Card className={classes.root}
            onClick={onClick}
            raised={true}
        >

            <CardActionArea

            >
                <div
                    style={{ display: "flex", justifyContent: "center" }}

                >
                    <CardMedia
                        className={classes.media}
                        image={avatarPlaceholder}
                        title={name}


                    />

                </div>

                <CardContent>
                    <div
                        style={{ display: "flex", justifyContent: "center", marginTop: 20 }}

                    >
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        {/* <Typography variant="body2" color="textSecondary" component="p">
                        {exercise.shortDescription}
                    </Typography> */}

                    </div>

                </CardContent>

            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary">
                    <Trans>Therapy Schedule</Trans>
                </Button>
                {/* <Button size="small" color="primary">
                    Learn More
        </Button> */}


            </CardActions>


        </Card>
    );
}
