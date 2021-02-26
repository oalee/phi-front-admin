import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    mainContainer: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        top: 0,
        left: 0,
    },
    typeContainer: {
        display: "flex",
        marginTop: theme.spacing(5),
        justifyContent: "space-between",
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

    }
}))