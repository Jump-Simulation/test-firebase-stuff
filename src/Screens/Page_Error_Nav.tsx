import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"
import { useEffect } from "react";
import { Global_Props } from "../Global_Props";
import { useAppContext } from "../App";


interface Page_Error_Nav_Props {
    given_state_TestText: string;
    given_LogButtonPress(givenString: string): void;
    given_SetPage(givenPageName: string): void;
}


export default function Page_Error_Nav(props: Page_Error_Nav_Props) {
    const given_Context = useAppContext();



    return (
        <div
            style={{
                backgroundColor: "maroon"
            }}
            className="page-default"
        >
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                alignItems: "center"
            }}>
                <Button
                    onClick={() => { props.given_SetPage("page1") }}
                    style={{ backgroundColor: "pink", color: "black", width: "auto", }}>
                    Press to Return to Previous Page
                </Button>
            </div>
            <h1 style={{ color: "lightgray" }}>Page Nav Error Sim</h1>

            <h4 style={{ color: "lightgray" }}>Given text: {props.given_state_TestText}</h4>
            <img

                style={{ height: "auto", width: "50%", maxWidth: "350px" }}
                src={"/assets/nightstar.gif"} >

            </img>

            <Button
                onClick={() => { given_Context.SendErrorReport("Nav Error", "Test Message for Nav Error Sim", "PageNavError.tsx line 22") }}
                style={{ backgroundColor: "green", color: "black", width: "auto", }}>
                Simulate Nav Error
            </Button>
        </div>
    )
}