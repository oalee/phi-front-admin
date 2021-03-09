import { green, purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        height: "100%",
        width: "100%",
        // width: "100vw",
        display: "flex",
        flexDirection: "row",

        top: 0,
        left: 0,
    },
    excerciseContainer: {

        display: "flex",
        justifyContent: "center",
        width: "60%",
        minHeight: 400,
        backgroundColor: purple[400]

    },
    filtersContainer: {

        display: "flex",
        justifyContent: "center",
        width: "40%",

        minHeight: 400,
        backgroundColor: green[400]

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