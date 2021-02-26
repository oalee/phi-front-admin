import React, { useState } from "react";
import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
    Button,
    Paper,
    Tabs,
    Tab,
    TextField,
    FormControl,
    InputLabel
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from "@material-ui/styles";

// import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";

import useStyles from "./styles";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { t } from '@lingui/macro';
import PageTitle from "../../components/PageTitle/PageTitle";

export default function AddEditExcercise(props) {
    var classes = useStyles();
    var theme = useTheme();

    const [state, setState] = React.useState({
        title: '',
        type: t`Excercise`,
    });
    const handleChange = (event, newValue) => {
        // setValue(newValue);
        console.log(`handeChange ${newValue}`)

        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };


    return (
        <>
            <PageTitle title={t`Add an Excercise`} />

            <div className={classes.mainContainer}>

                <div className={classes.typeContainer} dir="rtl">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel variant="outlined" htmlFor="outlined-age-native-simple">{t`Type`}</InputLabel>
                        <Select
                            native
                            value={state.type}
                            onChange={handleChange}
                            label="Type"
                            inputProps={{
                                name: 'type',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option value="Excercise">{t`Excercise`}</option>
                            <option value="Eductional">{t`Eductional`}</option>
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.titleContainer} >

                    <TextField style={{
                        direction: "rtl"

                    }} id="outlined-basic" label={t`Title`} multiline variant="outlined" />
                </div>

                <TextField className={classes.shortDescription} multiline rows={2} rowsMax={4} id="outlined-basic" label={t`Short Description`} variant="outlined" />

                <TextField className={classes.longDescription} multiline rows={5} rowsMax={20} id="outlined-basic" label={t`Long Description`} variant="outlined" />

            </div>

        </>
    );

}