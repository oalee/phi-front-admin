

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

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 225,
        minWidth: 170,
        // maxHeight: 225,
        margin: theme.spacing(4)
    },
    media: {
        height: 120,
        width: 120,
        margin: 5
    },
}))

export default function ExerciseView(props) {
    const { exercise, onClick } = { ...props }
    const classes = useStyles();

    return (
        <Card className={classes.root}
            onClick={onClick}
            raised={true}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={exercise.pictures[0].url}
                // title={exercise.title}

                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {exercise.title}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        {exercise.shortDescription}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" color="primary">
                    <Trans>Edit</Trans>
                </Button>
                {/* <Button size="small" color="primary">
                    Learn More
        </Button> */}
            </CardActions>
        </Card>
    );
}
