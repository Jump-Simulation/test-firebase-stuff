import { DeviceInfo } from "../types";


interface DebugScreens_Mobile_Props {



    given_LogsToPrint: string[];
    given_DebugButtonPressedNumber: number;
    given_SetDebugButtonPressedNumber(givenNumber: number): void;

    given_deviceInfo: DeviceInfo;


    given_BuildNumber: string;


}

export default function DebugScreens_Mobile(props: DebugScreens_Mobile_Props) {


    function RenderDebugMobileScreen() {

        if (props.given_DebugButtonPressedNumber >= 1) {
            return (<div
                style={{
                    position: "absolute",
                    height: "100%",
                    width: "85%",
                    backgroundColor: "darkorchid",
                    color: "black", zIndex: "999999999",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 0px 35px 0px black"

                }}>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "10%",
                    }}>

                    <div
                        onClick={() => {
                            props.given_SetDebugButtonPressedNumber(0);
                        }}
                        style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "10px",
                            marginRight: "10px",
                            /*     height: "10%", */
                            width: "40%",
                            backgroundColor: "darkred",
                            color: "white",
                            zIndex: "99999999999",
                            fontSize: "var(--spacing-lg-mobile)",
                            fontWeight: "bold",
                            padding: "var(--spacing-sm-mobile)",
                            borderRadius: "100px",
                            boxShadow: "0px 0px 10px 1px black",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        Hide Debug Menu Button
                    </div>

                </div>


                <div style={{
                    backgroundColor: "darkblue",


                    color: "white",
                    height: "45%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    flexDirection: "column",
                    padding: "15px",
                    textAlign: "start",
                    overflow: "auto",
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

                <div

                    style={{

                        height: "45%",
                        width: "100%",
                        backgroundColor: "darkgoldenrod",
                        color: "white",
                        zIndex: "99999999999",
                        fontSize: "var(--spacing-2xl-mobile)",
                        fontWeight: "bold",
                        overflow: "auto",
                        padding: "var(--spacing-md-mobile)"
                    }}>
                    Console Log

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


            </div>)
        }
        else {
            return (<></>)
        }

    }


    return (<>
        {RenderDebugMobileScreen()}
    </>)

}