import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"
import { useEffect } from "react";

interface Page_NavError_Props {
    given_state_TestText: string;
    given_LogButtonPress(givenString: string): void;
    given_SetPage(givenPageName: string): void;
}


export default function Page_NavError(props: Page_NavError_Props) {
    var errorLock: number = 0;

    useEffect(() => {
        if (errorLock < 1) {
            errorLock += 1;
            console.error("Test Nav Error to Console!");
        }


    }, [])

    return (

        <div
            style={{
                backgroundColor: "darkolivegreen"
            }}
            className="page-default"
        >
            <h1 style={{ color: "lightgray" }}>Page Nav Error Sim</h1>

            <h4 style={{ color: "lightgray" }}>Given text: {props.given_state_TestText}</h4>
            <img

                style={{ height: "auto", width: "50%", maxWidth: "350px" }}
                src={"/assets/nightstar.gif"} >

            </img>
            <Button
                onClick={() => { props.given_SetPage("page1") }}
                style={{ backgroundColor: "pink", color: "black", width: "85%", }}>
                Press to Return to Previous Page
            </Button>


        </div>
    )
}