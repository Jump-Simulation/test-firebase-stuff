import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import "bootstrap/dist/css/bootstrap.css"

import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Button } from 'react-bootstrap'
import Screen_SplashScreen from './Components/SpashScreen'


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


function App() {
  //const [pageCount, setPageCount] = useState(-1)
  const [state_pageName, state_SetPageName] = useState("splashScreen");
  const [text, setText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };


  function LogButtonPress(givenString: string) {
    logEvent(analytics, "page_view", { page_title: + "testEvent-" + text + "-" + givenString })
    console.log("WE SHOULD BE SEEING EVENT: " + "testEvent-" + text + "-" + givenString);
  }

  function SetPage(givenPageName: string) {
    state_SetPageName(givenPageName);
  }




  function RenderPages() {
    if (state_pageName === "splashScreen") {
      return (
        <Screen_SplashScreen
          nextPageString={"landingScreen"}
          givenOrigin="Splash Screen Click"
          GoToNextPage={state_SetPageName}></Screen_SplashScreen>
      )
    }
    if (state_pageName === "page1") {
      return Page_1();
    }
    else if (state_pageName === "page2") {
      return Page_2();
    }
    else if (state_pageName === "page3") {
      return Page_3();
    }
    else if (state_pageName === "page4") {
      return Page_4();
    }
    else if (state_pageName === "page5") {
      return Page_5();
    }
    else if (state_pageName === "page6") {
      return Page_6();
    }
    else {
      //insert Navigation Error Report Here!
    }
  }

  function Page_1() {
    return (<div style={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
    }}>
      <img

        style={{ height: "50%" }}
        src={"/bigTimby.gif"} >

      </img>
      <h1 style={{ color: "lightgray" }}>Testing Event Funnels</h1>
      <input
        type="text"
        value={text}
        style={{ width: "85%" }}
        onChange={handleInputChange}
        placeholder="Enter your name (OPTIONAL)"
        className="p-2 border rounded w-full"
      />
      <Button
        onClick={() => { SetPage("page2") }}
        style={{ backgroundColor: "lightgreen", color: "black", width: "85%" }}>Press to Start the Test</Button>
    </div>)
  }

  function Page_2() {
    return (<div style={{
      backgroundColor: "darkred",
      height: "85vh",
      width: "50cqw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
    }}>
      <h1 style={{ color: "lightgray" }}>Page 2</h1>
      <Button
        onClick={() => { SetPage("page3"), LogButtonPress("event-1"); }}
        style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 1 and Continue</Button>
      <Button
        onClick={() => { SetPage("page3") }}
        style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>

      <Button
        onClick={() => { SetPage("page1") }}
        style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
    </div>)
  }
  function Page_3() {
    return (<div style={{
      backgroundColor: "darkgreen",
      height: "85vh",
      width: "50cqw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
    }}>
      <h1 style={{ color: "lightgray" }}>Page 3</h1>
      <Button
        onClick={() => { SetPage("page4"), LogButtonPress("event-2"); }}
        style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 2 and Continue</Button>
      <Button
        onClick={() => { SetPage("page4") }}
        style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>
      <Button
        onClick={() => { SetPage("page2") }}
        style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
    </div>)
  }

  function Page_4() {
    return (<div style={{
      backgroundColor: "darkblue",
      height: "85vh",
      width: "50cqw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
    }}>
      <h1 style={{ color: "lightgray" }}>Page 4</h1>
      <Button
        onClick={() => { SetPage("page5"), LogButtonPress("event-3"); }}
        style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 3 and Continue</Button>
      <Button
        onClick={() => { SetPage("page5") }}
        style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>
      <Button
        onClick={() => { SetPage("page3") }}
        style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
    </div>)
  }

  function Page_5() {
    return (<div style={{
      backgroundColor: "darkgoldenrod",
      height: "85vh",
      width: "50cqw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
    }}>
      <h1 style={{ color: "lightgray" }}>Page 5</h1>
      <Button
        onClick={() => { SetPage("page6"), LogButtonPress("event-4"); }}
        style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 4 and Continue</Button>
      <Button
        onClick={() => { SetPage("page6") }}
        style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>
      <Button
        onClick={() => { SetPage("page4") }}
        style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
    </div>)
  }

  function Page_6() {
    return (<div style={{
      backgroundColor: "#e7ded6",
      height: "85vh",
      width: "50cqw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
    }}>
      <h1 style={{ color: "black" }}>Page 6</h1>
      <h3 style={{ color: "black" }}>Sensor sweep came back negative, MechWarrior!</h3>

      <img

        style={{ height: "50%" }}
        src={"/9266d9e80b133d6b24e901c4da29ab4f.gif"} >

      </img>
      <h5 style={{ color: "black" }}>Return to base...</h5>
      <Button
        onClick={() => { SetPage("page5") }}
        style={{ backgroundColor: "darkred", color: "white", width: "85%", }}>Press to Return to Previous Page</Button>
    </div>)
  }

  return (
    RenderPages()
  )
}

export default App
