import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "./api/apollo-client";
import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { AppProvider } from "./context/AppContext";
import RTL from "./themes/RtlProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DialogProvider from "./context/DialogProvider";



ReactDOM.render(
  <div dir="auto">
    <ApolloProvider client={client}>
      <LayoutProvider>
        <UserProvider>
          <AppProvider>
            <RTL>
              <ThemeProvider theme={Themes.default}>

                <DialogProvider>
                  <CssBaseline />

                  <App />

                </DialogProvider>

              </ThemeProvider>
            </RTL>
          </AppProvider>
        </UserProvider>

      </LayoutProvider>
    </ApolloProvider>
  </div>
  ,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
