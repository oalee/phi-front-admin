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
    Tab
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTheme } from "@material-ui/styles";

import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

import useStyles from "./styles";
import { Trans } from "@lingui/macro";
import { Fragment } from "react";
import { t } from '@lingui/macro';

export default function TabPage(props) {
    var classes = useStyles();
    var theme = useTheme();

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <PageTitle title={t`Excercises`}

                button={<Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    style={{
                        width: 300,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "large"
                    }}
                    startIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={() => {
                        console.log(`clicked, ${props.history}`)

                        props.history.push('/app/addExcercise')
                    }

                    }


                >

                    <Trans>Add an Exercise</Trans>

                </Button>} />

            <div className={classes.container}>

                <div className={classes.tabContainer}>
                    <Paper square elevation={2} className={classes.tab} >
                        <Tabs
                            value={value}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                        >

                            <Tab label={t`Public Excercises`} style={
                                {
                                    textTransform: "none",
                                    fontSize: 22
                                }
                            } />

                            <Tab label={t`My Excercises`} style={
                                {
                                    textTransform: "none",
                                    fontSize: 22
                                }
                            } />
                        </Tabs>
                    </Paper>
                </div>

                <div className={classes.pageContainer}>
                    {value === 0 && <Fragment>
                        <Typography>
                            <Trans>Nothing here yet, and an excercise</Trans>
                        </Typography>
                    </Fragment>
                    }

                    {value === 1 && <Fragment>
                        <Typography>
                            <Trans>Nothing here yet, and an excercise</Trans>
                        </Typography>
                    </Fragment>
                    }
                </div>





            </div>

        </>
    );

}