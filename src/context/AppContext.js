import React from "react";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";

import Dot from "../components/Sidebar/components/Dot";
import { t } from "@lingui/macro";
import { useUserDispatch } from "./UserContext";

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from '../locales/en/messages.js'
import { messages as faMessages } from '../locales/fa/messages.js'



var AppContext = React.createContext();



i18n.load('en', messages)
i18n.load('fa', faMessages)
i18n.activate('fa')


function AppProvider({ children }) {

  const user = useUserDispatch()

  console.log(`userContext is ${user}`)


  const usersLabel = user && user.type === "Admin" ? t`Users` : t`Patients`
  const usersLink = user && user.type === "Admin" ? '/app/notifications' : '/app/patients'

  const menu = [
    // { id: 0, label: t`Dashboard`, link: '/app/dashboard', icon: <HomeIcon /> },
    { id: 1, label: t`Exercises and Eductional`, link: '/app/exercises', icon: <TypographyIcon /> },
    // { id: 2, label: t`Exercises`, link: '/app/tables', icon: <TableIcon /> },
    { id: 3, label: usersLabel, link: usersLink, icon: <NotificationsIcon /> },
    // {
    //   id: 4,
    //   label: t`UI Elements`,
    //   link: '/app/ui',
    //   icon: <UIElementsIcon />,
    //   children: [
    //     { label: t`Icons`, link: '/app/ui/icons' },
    //     { label: t`Charts`, link: '/app/ui/charts' },
    //     { label: t`Maps`, link: '/app/ui/maps' },
    //   ],
    // },
    { id: 5, type: 'divider' },
    { id: 6, type: 'title', label: t`Help` },
    { id: 7, label: t`Library`, link: '', icon: <LibraryIcon /> },
    { id: 8, label: t`About us`, link: '', icon: <SupportIcon /> },
    { id: 9, label: t`FAQ`, link: '', icon: <FAQIcon /> },
    { id: 10, label: t`Privacy Policy`, link: '', icon: <FAQIcon /> },

    // { id: 10, type: 'divider' },
    // { id: 11, type: 'title', label: t`PROJECTS` },
    // { id: 12, label: 'My recent', link: '', icon: <Dot size="small" color="secondary" /> },
    // { id: 13, label: 'Starred', link: '', icon: <Dot size="small" color="primary" /> },
    // { id: 14, label: 'Background', link: '', icon: <Dot size="small" color="secondary" /> },
  ];


  const context = {
    "locale": "fa",
    "dir": "rtl",
    menu: menu,
    user: user
  }

  return (

    <AppContext.Provider value={context}>
      <I18nProvider i18n={i18n}>

        {children}
      </I18nProvider>

    </AppContext.Provider>
  );
}


function useAppContext() {
  var context = React.useContext(AppContext);
  // if (context === undefined) {
  //   throw new Error("useUserDispatch must be used within a UserProvider");
  // }
  return context;
}

export { AppProvider, useAppContext }