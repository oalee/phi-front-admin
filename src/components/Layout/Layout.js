import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import ExersicePage from "../../pages/exercises/ExercisePage";
import AddEditExercisePage from "../../pages/addEditExcercise/AddEditExercisePage";
import ExercisePage from "../../pages/exercises/ExercisePage";
import { APIProvider } from "../../context/APIContext";
import PatientsPage from "../../pages/patientsPage/PatientsPage";
import SchedulePage from "../../pages/schedulePage/SchedulePage";
import EvaluationPage from "../../pages/evaluationPage/EvaluationPage";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <APIProvider>

      <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/exercises" component={ExercisePage} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/addExercise" component={AddEditExercisePage} />
              <Route path="/app/evaluation" component={EvaluationPage} />

              <Route path="/app/patients" component={PatientsPage} />
              <Route path="/app/schedule" component={SchedulePage} />

              <Route path="/app/editExercise" component={AddEditExercisePage} />

              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            {/* <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
            style={{ display: "hidden" }}
          >
            <div>
              <Link
                color={'primary'}
                href={'https://flatlogic.com/'}
                target={'_blank'}
                className={classes.link}
              >
                Flatlogic
                </Link>
              <Link
                color={'primary'}
                href={'https://flatlogic.com/about'}
                target={'_blank'}
                className={classes.link}
              >
                About Us
                </Link>
              <Link
                color={'primary'}
                href={'https://flatlogic.com/blog'}
                target={'_blank'}
                className={classes.link}
              >
                Blog
                </Link>
            </div>
            <div>
              <Link
                href={'https://www.facebook.com/flatlogic'}
                target={'_blank'}
              >
                <IconButton aria-label="facebook">
                  <Icon
                    path={FacebookIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://twitter.com/flatlogic'}
                target={'_blank'}
              >
                <IconButton aria-label="twitter">
                  <Icon
                    path={TwitterIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
              <Link
                href={'https://github.com/flatlogic'}
                target={'_blank'}
              >
                <IconButton
                  aria-label="github"
                  style={{ marginRight: -12 }}
                >
                  <Icon
                    path={GithubIcon}
                    size={1}
                    color="#6E6E6E99"
                  />
                </IconButton>
              </Link>
            </div>
          </Box> */}
          </div>
        </>
      </div>
    </APIProvider>

  );
}

export default withRouter(Layout);
