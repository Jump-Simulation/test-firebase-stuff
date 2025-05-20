import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"

interface Page_4_Props {
    given_state_TestText: string;
    given_LogButtonPress(givenString: string): void;
    given_SetPage(givenPageName: string): void;
}


export default function Page_4(props: Page_4_Props) {


    return (
        <div
            style={{
                backgroundColor: "darkblue",
            }}
            className="page-default"
        >
            <h1 style={{ color: "lightgray" }}>Page 4</h1>
            <h4 style={{ color: "lightgray" }}>Given text: {props.given_state_TestText}</h4>
            <img

                style={{ height: "auto", width: "50%", maxWidth: "350px" }}
                src={"/assets/madCatII.gif"} >

            </img>
            <Button
                onClick={() => { props.given_SetPage("page5"), props.given_LogButtonPress("event-3"); }}
                style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 3 and Continue</Button>
            <Button
                onClick={() => { props.given_SetPage("page5") }}
                style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>
            <Button
                onClick={() => { props.given_SetPage("page3") }}
                style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
        </div>

    )
}