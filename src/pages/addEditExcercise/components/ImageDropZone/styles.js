import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        borderStyle: "dashed",
        justifyContent: "start",
        alignItems: "center",
        minHeight: 240,
        paddingBottom: 20
    },
    cardsContainer: {
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