var BuildVersion: string = `0.05`;



import { useEffect, useState } from 'react'

import './App.css'

import "bootstrap/dist/css/bootstrap.css"
import { DeviceInfo } from './types';

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import Screen_SplashScreen from './Components/SpashScreen'
import Page_1 from './Components/Page_1';
import Page_2 from './Components/Page_2';
import Page_3 from './Components/Page_3';
import Page_4 from './Components/Page_4';
import Page_5 from './Components/Page_5';
import Page_6 from './Components/Page_6';

import { UAParser } from 'ua-parser-js';
import DebugScreens_Mobile from './Components/DebugScreens_Mobile';


const firebaseConfig = {
  apiKey: "AIzaSyAdvU9v4X8LF8y1E8-QWLOfqK5NWZv7rJU",
  authDomain: "test-project-2d71d.firebaseapp.com",
  projectId: "test-project-2d71d",
  storageBucket: "test-project-2d71d.firebasestorage.app",
  messagingSenderId: "645583960307",
  appId: "1:645583960307:web:39f2780443225c82099f86",
  measurementId: "G-FMKT6KY0WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var isMobileString: string = "mobile";
const isMobile =
  /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

if (!isMobile) {
  isMobileString = "desktop";
}


const parser = new UAParser();
const result = parser.getResult();

// Device info
const deviceType = result.device.type || 'Desktop';
const deviceVendor = result.device.vendor || 'Unknown';
const deviceModel = result.device.model || 'Unknown';

// Browser info
const browserName = result.browser.name || 'Unknown';
const browserVersion = result.browser.version || 'Unknown';

const deviceInfo: DeviceInfo = {
  type: deviceType,
  vendor: deviceVendor,
  model: deviceModel,
  browser: {
    name: browserName,
    version: browserVersion,
  },
};

const getOrCreateUserID = (): string => {
  let userID = localStorage.getItem("userIDActual");
  if (!userID) {
    userID = crypto.randomUUID(); // Generate unique UUID
    localStorage.setItem("userIDActual", userID);
  }
  return userID;
};

function App() {

  const [state_PageName, state_SetPageName] = useState("splashScreen");
  const [state_TestText, state_SetTestText] = useState<string>("");

  const [state_DebugMobileLogs, state_SetDebugMobileLogsLogs] = useState<string[]>([]);
  const [state_DebugMobileButtonTapped, state_SetDebugMobileButtonTapped] = useState(0)



  useEffect(() => {

    console.log("User ID: " + getOrCreateUserID())
    console.log("Device Info:")
    console.log(deviceInfo)

  }, [])

  var debugMode = false;
  useEffect(() => {

    if (debugMode === true) {
      const originalLog = console.log;
      const originalWarn = console.warn;
      const originalError = console.error;


      const handleLog = (type: string, ...args: any[]) => {

        const message = args.map(arg => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" ");
        state_SetDebugMobileLogsLogs(prevLogs => [...prevLogs, `[${type}] ${message}`]);
        originalLog.apply(console, args);


      };

      console.log = (...args) => handleLog("LOG", ...args);
      console.warn = (...args) => handleLog("WARN", ...args);
      console.error = (...args) => handleLog("ERROR", ...args);

      return () => {
        console.log = originalLog;
        console.warn = originalWarn;
        console.error = originalError;
      };
    }
  }, []);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    state_SetTestText(event.target.value);
  };


  function LogButtonPress(givenString: string) {
    logEvent(analytics, "page_view", { page_title: + "testEvent-" + state_TestText + "-" + givenString })
    console.log("WE SHOULD BE SEEING EVENT: " + "testEvent-" + state_TestText + "-" + givenString);
  }

  function SetPage(givenPageName: string) {
    state_SetPageName(givenPageName);
  }




  function RenderPages() {
    if (state_PageName === "splashScreen") {
      return (
        <Screen_SplashScreen
          nextPageString={"landingScreen"}
          givenOrigin="Splash Screen Click"
          GoToNextPage={state_SetPageName}></Screen_SplashScreen>
      )
    }
    if (state_PageName === "page1") {
      return (
        <Page_1
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_handleInputChange={handleInputChange}

        />
      )
    }
    else if (state_PageName === "page2") {
      return (
        <Page_2
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
        />
      )
    }
    else if (state_PageName === "page3") {
      return (
        <Page_3
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
        />
      )
    }
    else if (state_PageName === "page4") {
      return (
        <Page_4
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
        />
      )
    }
    else if (state_PageName === "page5") {
      return (
        <Page_5
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
        />
      )
    }
    else if (state_PageName === "page6") {
      return (
        <Page_6
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
        />
      )
    }
    else {
      //insert Navigation Error Report Here!
    }
  }

  return (
    <div className={`main-container-${isMobileString}`}>

      <DebugScreens_Mobile
        given_LogsToPrint={state_DebugMobileLogs}
        given_DebugButtonPressedNumber={state_DebugMobileButtonTapped}
        given_SetDebugButtonPressedNumber={state_SetDebugMobileButtonTapped}
        given_deviceInfo={deviceInfo}
        given_BuildNumber={BuildVersion}
      />
      <img src='/assets/settings-icon.png' className='settings-icon'
        onClick={() => { state_SetDebugMobileButtonTapped(1) }}
      />

      {RenderPages()}

      <h6 style={{ color: "white", marginTop: "10px", backgroundColor: "darkgray", padding: "5px" }}>Current Build: {BuildVersion}</h6>
    </div>

  )
}

export default App
