import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    mainContainer: {
        height: "87%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",

        top: 0,
        left: 0,
    },
    typeContainer: {
        display: "flex",
        marginTop: theme.spacing(5),
        justifyContent: "start",
        textAlign: "right"

    },
    titleContainer: {
        display: "flex",
        marginTop: theme.spacing(5),

        // width: 400


    },
    shortDescription: {

        marginTop: theme.spacing(5),
        width: "50%"

    },
    imageDropBoxContainer: {
        marginTop: theme.spacing(5),

        width: "90%",
        // minHeight: 400

    },
    longDescription: {

        width: "90%",
        marginTop: theme.spacing(5)

    },
    tab: {
        width: 400,
        display: "flex",
        alignItems: "center",
        textTransform: "none",
        justifyContent: "center",

    },
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(10),

    },

    dropzone: {

        minHeight: 300,
        height: 400
    },

    button: {
        margin: theme.spacing(1),
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
    },
    parametersContainer: {

        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: theme.spacing(5),
        flexWrap: "wrap"
    }
}))