

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: 225,
        // maxHeight: 225,
        margin: theme.spacing(4)
    },
    media: {
        minHeight: 100,
        maxHeight: 100,
        minWidth: 100
    },
}))

export default function ExerciseView(props) {
    const { exercise, onClick } = { ...props }
    const classes = useStyles();

    return (
        <Card className={classes.root}
            onClick={onClick}
        >
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={exercise.pictures[0].url}
                    title={exercise.title}

                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {exercise.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {exercise.shortDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
    );
}
