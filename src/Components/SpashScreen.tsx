import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";

import { useEffect, useState } from "react";

import logoTitleSVG from "/assets/logo-title-1.svg";
import logoIconSVG from "/assets/logo-icon-1.svg";
import svgOSFLogo from "/assets/osf-logo.svg";
import "../CSS/SplashScreen.css"

interface Screen_SplashScreen_Props {
  nextPageString: string;
  GoToNextPage(givenPageName: string): void;
  givenOrigin: string;

}
var splashScreenBool: boolean = false;
var intLock = 0;

export default function Screen_SplashScreen(props: Screen_SplashScreen_Props) {


  function renderSplashScreen() {
    function setSplashScreenClicked(givenBool: boolean) {
      splashScreenBool = givenBool;
      console.log("splashScreenClicked set to: " + splashScreenBool);
    }
    intLock += 1;
    if (intLock <= 1) {
      var splashAutoTimer: NodeJS.Timeout;




      let dummyFunction = function (givenBool: boolean) {
        console.log("intLock = " + intLock);
        clearTimeout(splashAutoTimer);
        console.log("GIVEN BOOL WAS: " + givenBool)
        if (givenBool === true) {

          console.log("attempted to call  timeout function with : " + splashScreenBool);
        }
        else if (givenBool === false) {
          console.log("calling timeout function with : " + splashScreenBool);
          props.GoToNextPage("page1");
        }

      }

      if (intLock <= 1) {

        splashAutoTimer = setTimeout(() => { dummyFunction(splashScreenBool) }, 5000);
      }

    }


    return (
      <div>

        <div
          //className={'splashGradient'}
          style={{
            position: "absolute",
            left: "0px", top: "0px",
            width: "100vw", height: "100vh"
          }}

          onClick={() => {
            setSplashScreenClicked(true),
              props.GoToNextPage("page1");

          }}
        >
          <div
            style={{
              position: "absolute",
              left: "0px", top: "0px",
              width: "100vw", height: "100vh",
              backgroundImage: "linear-gradient(#7DA245,#259D61,#2F9E7C)",

              opacity: 1.0,
              animationName: "splash-gradient-fade-out",
              animationDuration: "1s",
              animationDelay: "5s"
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              left: "0px", top: "0px",
              width: "100%", height: "100%",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "10vh"
            }}
          >
            <img
              src={logoIconSVG}
              alt=""
              style={{
                position: "relative",
                opacity: "0.0",
                animationName: "splash-jump-in-out-top",
                animationDuration: "2s",
                width: "35cqw",
                height: "auto",
                maxHeight: "200px",
              }}
            ></img>

            <img
              src={logoTitleSVG}
              alt=""
              style={{
                position: "relative",
                opacity: "0.0",
                animationName: "splash-jump-in-out-bottom",
                animationDuration: "2s",
                width: "75cqw",
                height: "auto",
                maxHeight: "200px",
              }}
            ></img>
          </div>

          <div
            style={{
              position: "absolute",
              left: "0px", top: "0px",
              width: "100%", height: "100%",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "10vh"
            }}
          >
            <img
              src={svgOSFLogo}
              alt=""
              style={{
                position: "relative",
                width: "75cqw",
                height: "auto",
                maxHeight: "200px",
                opacity: "0.0",
                animationName: "splash-fade-in-out",
                animationDuration: "2s",
                animationDelay: "2.2s"
              }}
            ></img>

            <p
              style={{
                color: "#ffffff",
                position: "relative",
                fontSize: "72px",
                fontStyle: "oblique",

                opacity: "0.0",
                animationName: "splash-fade-in-out",
                animationDuration: "2s",
                animationDelay: "2.4s"
              }}
            >
              +
            </p>

            {/*             <img
              src={svgUICLogo}
              alt=""
              style={{
                position: "relative",
                width: "75cqw",
                height: "auto",
                maxHeight: "200px",
                opacity: "0.0",
                animationName: "splash-fade-in-out",
                animationDuration: "2s",
                animationDelay: "2.6s"
              }}
            ></img> */}
          </div>

        </div>

      </div>
    );
  }

  return <> {renderSplashScreen()}</>;
}
