var projectName: string = "OSF-Test-Firebase";
var BuildVersion: string = `0.13`;
var debugMode = false;







import { useEffect, useState, createContext, useContext, useMemo } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "./CSS/CurrentReportModal.css"

import { DeviceInfo, HealthReportObject } from './types';
import { logEvent } from "firebase/analytics";
import Screen_SplashScreen from './Screens/SpashScreen'
import Page_1 from './Screens/Page_1';
import Page_2 from './Screens/Page_2';
import Page_3 from './Screens/Page_3';
import Page_4 from './Screens/Page_4';
import Page_5 from './Screens/Page_5';
import Page_6 from './Screens/Page_6';
import { UAParser } from 'ua-parser-js';
import DebugScreens_Mobile from './Screens/DebugScreens_Mobile';
import Page_NavError from './Screens/Page_Error_Nav';
import DebugScreens from './Screens/DebugScreens';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { analytics, firestore } from './Firebase';
import Page_Error_Image from './Screens/Page_Error_Image';
import { getAuth, signInAnonymously } from "firebase/auth";
import Page_Example_ReportViewer from './Screens/Page_Example_ReportViewer';
const auth = getAuth();
//import { getToken } from 'firebase/app-check';

var isMobileString: string = "-mobile";
const isMobile =
  /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

if (!isMobile) {
  isMobileString = "-desktop";
}

const originalLog = console.log;
const originalError = console.error;

export type AppContextType = {

  SendErrorReport(givenErrorType: string, givenErrorMessage?: string, givenErrorLocation?: string): void;

};
export const AppContext = createContext<AppContextType | undefined>(undefined);
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContext.Provider");
  }
  return context;
};

const getOrCreateUserID = (): string => {
  let userID = localStorage.getItem("userIDActual");
  if (!userID) {
    userID = crypto.randomUUID(); // Generate unique UUID
    localStorage.setItem("userIDActual", userID);
  }
  return userID;
};


var projectHealthReportString: string = "";
var authLock = true;


function App() {


  useEffect(() => {

    if (authLock) {
      authLock = false; // preventing double auth
      signInAnonymously(auth);
    }


  }, [])


  const contextValue: AppContextType = {
    SendErrorReport: SendProjectHealthReport,
  };

  const [state_CurrentOpenReport, state_SetCurrentOpenReport] = useState<HealthReportObject>({
    userID: "temp",
    reportDate: "temp",
    reportCodeLocation: "temp",
    reportMessage: "temp",
    reportType: "temp",
    browserName: "temp",
    browserVersion: "temp",
    deviceInfo: "whatever",
    projectName: "temp",
  });
  const [state_ShowCurrentReport, state_SetShowCurrentReport] = useState(false);

  const deviceInfo = useMemo(() => {
    const ua = navigator.userAgent;
    const parser = new UAParser();
    const result = parser.getResult();

    // Device type fallback
    let deviceType = result.device.type || '';

    // Manual user-agent overrides
    if (/Android/i.test(ua)) {
      deviceType = 'Android';
    } else if (/iPhone/i.test(ua)) {
      deviceType = 'iPhone';
    } else if (/iPad/i.test(ua)) {
      deviceType = 'iPad';
    } else if (/iPod/i.test(ua)) {
      deviceType = 'iPod';
    } else if (/BlackBerry/i.test(ua)) {
      deviceType = 'BlackBerry';
    } else if (/IEMobile/i.test(ua)) {
      deviceType = 'Windows Phone';
    } else if (/Opera Mini/i.test(ua)) {
      deviceType = 'Opera Mini';
    } else if (/Kindle|Silk/i.test(ua)) {
      deviceType = 'Amazon Kindle';
    } else if (/PlayBook/i.test(ua)) {
      deviceType = 'BlackBerry PlayBook';
    } else if (/webOS/i.test(ua)) {
      deviceType = 'Palm webOS';
    } else if (/Tizen/i.test(ua)) {
      deviceType = 'Samsung Tizen';
    } else if (/CrOS/i.test(ua)) {
      deviceType = 'Chromebook';
    } else if (/Macintosh|Mac OS X/i.test(ua)) {
      deviceType = 'Mac';
    } else if (/Windows NT/i.test(ua)) {
      deviceType = 'Windows PC';
    } else if (/Linux/i.test(ua)) {
      deviceType = 'Linux';
    } else {
      deviceType = 'Desktop';
    }

    // Device and OS details
    const deviceVendor = result.device.vendor || 'Unknown Vendor';
    const deviceModel = result.device.model || deviceType;
    const osName = result.os.name || 'Unknown OS';
    const osVersion = result.os.version || '';
    const browserName = result.browser.name || 'Unknown Browser';
    const browserVersion = result.browser.version || '';

    // Formatted display string
    const formatted = `${deviceModel} (${osName}${osVersion ? ` ${osVersion}` : ''})`;

    return {
      type: deviceType,
      vendor: deviceVendor,
      model: deviceModel,
      os: `${osName} ${osVersion}`.trim(),
      browser: {
        name: browserName,
        version: browserVersion,
      },
      formatted,
      isMobileString,
    };
  }, []);



  const [state_PageName, state_SetPageName] = useState("splashScreen");
  const [state_TestText, state_SetTestText] = useState<string>("");
  const [state_DebugMobileLogs, state_SetDebugMobileLogsLogs] = useState<string[]>([]);
  const [state_DebugMobileButtonTapped, state_SetDebugMobileButtonTapped] = useState(0)



  async function SendProjectHealthReport(givenReportType: string, givenReportMessage?: string, givenReportCodeLocation?: string) {

    const now = new Date();
    const day = now.toLocaleDateString('en-US', { day: 'numeric' });   // <- No leading zero
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.toLocaleDateString('en-US', { year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }); // e.g., "4:14:23 PM"
    const customFormattedDate = `${year}-${month}-${day}-${time}`;




    projectHealthReportString =
      "Project Name_" + projectName +
      "||" +
      "Report Type_" + givenReportType +
      "||" +
      "Report Date_" + customFormattedDate +
      "||" +
      "Report Message_" + givenReportMessage +
      "||" +
      "Report Code Location_" + givenReportCodeLocation +
      "||" +
      "User ID_" + getOrCreateUserID() +
      "||" +
      "Device Info_" + deviceInfo.formatted +
      "||" +
      "Browser Name_" + deviceInfo.browser.name +
      "||" +
      "Browser Version_" + deviceInfo.browser.version

    //Keep this console.log here so that devs can see the report in the dev debug consoles!
    originalLog("REPORT STRING: " + projectHealthReportString);

    try {
      const userId = await getOrCreateUserID(); // Must return a string

      const docId = `${userId}_${customFormattedDate}`;

      const docRef = doc(firestore, 'HealthReports/organizations/osf-sfmc', docId);

      await setDoc(docRef, {
        Report: projectHealthReportString
      });

      originalLog('Report written successfully');
    } catch (error) {
      originalLog('Error writing report:', error);
    }

  }

  //Use Effect that takes the console logs and converts them to text objects
  useEffect(() => {

    if (debugMode === false) {


      let isReporting = false; // <-- prevents recursion

      const handleLog = (type: string, shouldWriteReport: boolean, ...args: any[]) => {

        if (isReporting) {
          originalLog("REPORTING WAS TRUE, ABORTING")
          return;
        }
        const message = args.map(arg => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" ");



        // Capture stack trace
        const err = new Error();
        const stackLines = err.stack?.split("\n") || [];
        let locationInfo = "";

        // Stack line format varies, but we typically want the third line
        // (first is 'Error', second is this function, third is caller)
        if (stackLines.length >= 3) {
          const relevantLine = stackLines[3]; // Index 2 = caller of console.* 
          const match = relevantLine.match(/\(?([^\s]+:\d+:\d+)\)?$/); // Capture file:line:col

          if (match) {
            locationInfo = `\n@ ${match[1]}`; // Append to log message
          }
        }




        state_SetDebugMobileLogsLogs(prevLogs => [...prevLogs, `[${type}] ${message}${locationInfo}`]);
        originalLog.apply(console, args);
        if (shouldWriteReport) {
          try {
            isReporting = true;
            SendProjectHealthReport("UncaughtLog", message, locationInfo);
          } finally {
            isReporting = false;
          }
        } else {

        };
      }



      console.log = (...args) => handleLog("LOG", false, ...args);
      //  console.warn = (...args) => handleLog("WARN", ...args);
      console.error = (...args) => handleLog("ERROR", true, ...args);

      return () => {
        console.log = originalLog;
        // console.warn = originalWarn;
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


  async function AddObject(data: object) {
    try {
      const docRef = await addDoc(collection(firestore, 'userErrors'), data);
      console.log('Document Sent: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Document Send Failed: ', error);
      throw error;
    }
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
          given_AddObject={AddObject}
        />
      )
    }
    else if (state_PageName === "page3") {
      return (
        <Page_3
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
          given_AddObject={AddObject}
        />
      )
    }
    else if (state_PageName === "page4") {
      return (
        <Page_4
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
          given_AddObject={AddObject}
        />
      )
    }
    else if (state_PageName === "page5") {
      return (
        <Page_5
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
          given_AddObject={AddObject}
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
    else if (state_PageName === "page-Error-Image") {
      return (
        <Page_Error_Image
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
        />
      )
    }
    else if (state_PageName === "page-Example-ReportViewer") {
      return (
        <Page_Example_ReportViewer
          given_SetPage={state_SetPageName}
          given_state_SetCurrentOpenReport={state_SetCurrentOpenReport}
          given_state_SetShowCurrentReport={state_SetShowCurrentReport}
        />
      )
    }
    else {
      //insert Navigation Error Report Here!

      return (
        <Page_NavError
          given_state_TestText={state_TestText}
          given_SetPage={state_SetPageName}
          given_LogButtonPress={LogButtonPress}
        />
      )
    }
  }

  function RenderDebugScreens() {
    if (isMobile) {
      return (<>
        <img src='/assets/settings-icon.png' className='settings-icon'
          onClick={() => { state_SetDebugMobileButtonTapped(1) }}
        />

        <DebugScreens_Mobile
          given_LogsToPrint={state_DebugMobileLogs}
          given_DebugButtonPressedNumber={state_DebugMobileButtonTapped}
          given_SetDebugButtonPressedNumber={state_SetDebugMobileButtonTapped}
          given_deviceInfoFormatted={deviceInfo.formatted}
          given_deviceInfoBrowserName={deviceInfo.browser.name}
          given_deviceInfoBrowserVersion={deviceInfo.browser.version}
          given_ProjectName={projectName}
          given_BuildNumber={BuildVersion}
        />
      </>)
    }
    else {
      return (<>
        <DebugScreens
          given_LogsToPrint={state_DebugMobileLogs}
          given_DebugButtonPressedNumber={state_DebugMobileButtonTapped}
          given_SetDebugButtonPressedNumber={state_SetDebugMobileButtonTapped}

          given_deviceInfoFormatted={deviceInfo.formatted}
          given_deviceInfoBrowserName={deviceInfo.browser.name}
          given_deviceInfoBrowserVersion={deviceInfo.browser.version}
          given_ProjectName={projectName}
          given_BuildNumber={BuildVersion}
        />

      </>)
    }
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`main-container${isMobileString}`}>

        {state_ShowCurrentReport && (
          <div
            className='current-report-modal'
          >
            <button
              onClick={() => state_SetShowCurrentReport(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'crimson',
                color: 'white',
                border: 'none',
                padding: '0.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
            <h3 style={{ marginBottom: '1rem' }}>Full Report</h3>
            <ul style={{ listStyle: 'none', padding: 0, width: "100%" }}>
              <li style={{ width: "100%" }}><strong>Project Name:</strong> {state_CurrentOpenReport.projectName}</li>
              <li style={{ width: "100%" }}><strong>Report Type:</strong> {state_CurrentOpenReport.reportType}</li>
              <li style={{ width: "100%" }}><strong>Report Date:</strong> {state_CurrentOpenReport.reportDate}</li>
              <li style={{ width: "100%" }}><strong>Report Message:</strong> {state_CurrentOpenReport.reportMessage}</li>
              <li style={{ width: "100%" }}><strong>Code Location:</strong> {state_CurrentOpenReport.reportCodeLocation}</li>
              <li style={{ width: "100%" }}><strong>User ID:</strong> {state_CurrentOpenReport.userID}</li>
              <li style={{ width: "100%" }}><strong>Device Info:</strong> {state_CurrentOpenReport.deviceInfo}</li>
              <li style={{ width: "100%" }}><strong>Browser:</strong> {state_CurrentOpenReport.browserName} ({state_CurrentOpenReport.browserVersion})</li>
            </ul>
          </div>
        )}

        {RenderDebugScreens()}

        <h6 style={{
          color: "white",
          marginTop: "10px",
          backgroundColor: "darkgray",
          padding: "5px"
        }}>
          Current Build: {BuildVersion}
        </h6>
        {RenderPages()}


      </div>
    </AppContext.Provider>
  )
}

export default App
