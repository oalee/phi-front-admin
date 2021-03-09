import { Button, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";


export default function StyledButton(props) {
    var classes = useStyles();


    var { className, icon, disabled, label, loading, onClick } = { ...props.props }

    if (loading === undefined)
        loading = false




    return (
        <div className={classes.wrapper}>

            <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={disabled}
                className={className}
                startIcon={icon}
                onClick={onClick}
            >
                {label}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>

    )
}