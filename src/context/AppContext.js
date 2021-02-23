import React from "react";


var AppContext = React.createContext();


function AppProvider({ children }) {


    const context = {
        "locale" : "fa",
        "dir": "rtl"
    }

    return (
        <AppContext.Provider value={ context}>
            {children}
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

  export {AppProvider, useAppContext}