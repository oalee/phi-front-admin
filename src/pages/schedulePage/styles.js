import { green, purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        // height: "100%",
        width: "100%",
        // width: "100vw",
        display: "flex",
        flexDirection: "row",

        top: 0,
        left: 0,
    },
    parametersContainer: {

        display: "flex",
        flexDirection: "row",
        width: "100%",
        // marginTop: theme.spacing(1),
        flexWrap: "wrap"
    },
    patientsContainer: {

        display: "flex",
        flexWrap: "wrap",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "row",

        width: "100%",
        minHeight: 400,
        // backgroundColor: purple[400],


    },
    filtersContainer: {

        display: "flex",
        justifyContent: "center",
        width: "30%",

        minHeight: 400,
        // backgroundColor: green[400]

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

    dayWrapper: {
        position: "relative",
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.light,
        color: theme.palette.common.white,
        margin: 2,
        borderRadius: "50%"

    },
    selectedDateHighlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,

        borderRadius: "50%"
    },

    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
}))