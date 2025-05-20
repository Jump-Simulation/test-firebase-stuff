import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"

interface Page_2_Props {
    given_state_TestText: string;
    given_LogButtonPress(givenString: string): void;
    given_SetPage(givenPageName: string): void;
}


export default function Page_2(props: Page_2_Props) {


    return (

        <div
            style={{
                backgroundColor: "darkolivegreen"
            }}
            className="page-default"
        >
            <h1 style={{ color: "lightgray" }}>Page 2</h1>
            <h4 style={{ color: "lightgray" }}>Given text: {props.given_state_TestText}</h4>
            <Button
                onClick={() => { props.given_SetPage("page3"), props.given_LogButtonPress("event-1"); }}
                style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 1 and Continue</Button>
            <Button
                onClick={() => { props.given_SetPage("page3") }}
                style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>

            <Button
                onClick={() => { props.given_SetPage("page1") }}
                style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
        </div>
    )
}