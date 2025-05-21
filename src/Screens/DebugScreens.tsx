import { useEffect, useState } from "react";
import { DeviceInfo } from "../types";


interface DebugScreens_Props {

    given_LogsToPrint: string[];
    given_DebugButtonPressedNumber: number;
    given_SetDebugButtonPressedNumber(givenNumber: number): void;

    given_deviceInfo: DeviceInfo;


    given_BuildNumber: string;

}



export default function DebugScreens(props: DebugScreens_Props) {


    function renderDebugScreens() {

        return (
            <>


                <div style={{
                    backgroundColor: "darkgoldenrod",
                    color: "white",
                    height: "100%",
                    width: "15%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    padding: "15px",
                    overflow: "auto",
                    fontSize: "var(--spacing-lg-mobile)",
                    fontWeight: "bold",
                    textWrap: "pretty",
                    position: "absolute",
                    left: "0%",
                    top: "0%"
                }}>

                    Console Log:

                    <br></br>

                    <div style={{
                        textAlign: "start", fontSize: "var(--spacing-lg-mobile)",
                        fontWeight: "normal",
                    }}>
                        {props.given_LogsToPrint.map((log, index) => (
                            <div key={index}>
                                <div>{log}</div>
                                <br />
                            </div>


                        ))}
                    </div>
                </div>




                <div style={{
                    backgroundColor: "darkblue",
                    position: "absolute",
                    right: "0", top: "0%",
                    color: "white", height:
                        "100%", width: "15%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "15px",
                    textAlign: "start",
                }}>
                    Current Build: {props.given_BuildNumber}
                    <br></br>
                    Device Type: {props.given_deviceInfo.type}
                    <br></br>
                    Device Model: {props.given_deviceInfo.model}
                    <br></br>
                    Device Vendor: {props.given_deviceInfo.vendor}
                    <br></br>
                    Browser Used: {props.given_deviceInfo.browser.name} Version: {props.given_deviceInfo.browser.version}


                </div>
            </>
        )




    }




    return (<>{renderDebugScreens()}</>)

}