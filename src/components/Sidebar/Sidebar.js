import React, { useState, useEffect } from "react";
import { Avatar, Divider, Drawer, IconButton, List, Typography } from "@material-ui/core";

import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

import { getText } from "../../utils/textUtils"
import {
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { useAppContext } from "../../context/AppContext";

import avatarPlaceholder from "../../static/images/avatar_placeholder.svg"

function Sidebar({ location }) {

  //global context
  const appContext = useAppContext()


  const menu = appContext.menu

  const anchor = appContext.dir === "rtl" ? "right" : "left"

  console.log(`testing ${appContext.dir}`)


  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });


  return (
    <Drawer
      anchor={anchor}
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>


      <List className={classes.sidebarList}>
        <div>
          <div className={classes.avatarContainer}>
            <img alt="Remy Sharp" src={avatarPlaceholder} className={classNames(classes.avatar, {
              [classes.avatar]: isSidebarOpened,
              [classes.avatarCollapsed]: !isSidebarOpened,
            })} />
            {
              isSidebarOpened && <Typography
                className={classNames(classes.linkText, {
                  [classes.linkTextHidden]: !isSidebarOpened,
                })}
              >
                Username
            </Typography>

            }

            {
              isSidebarOpened && <Typography
                className={classNames(classes.linkText, {
                  [classes.linkTextHidden]: !isSidebarOpened,
                })}
              >
                Type
            </Typography>

            }
          </div>

          {menu.map(link => (
            <div>
              <SidebarLink
                key={link.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                {...link}
              />
              {/* <Divider></Divider> */}

            </div>

          ))
          }
        </div>

      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
