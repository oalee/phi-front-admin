import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    wrapper: {
        position: 'relative',
    },
    saveButton: {
        // width: theme.spacing(20),
        display: "flex",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "none",
        // fontWeight: "bold",
        fontSize: "large"
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    }, buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    restoreButton: {
        marginTop: theme.spacing(1),
        // width: theme.spacing(20),
        display: "flex",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "none",
        // fontWeight: "bold",
        fontSize: "large"
    }
}))