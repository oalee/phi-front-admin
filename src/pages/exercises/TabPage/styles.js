import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        height: "100vh",
        // width: "100vw",
        display: "flex",
        flexDirection: "column",

        top: 0,
        left: 0,
    },
    tabContainer: {
        display: "flex",
        justifyContent: "center"


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