import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"

interface Page_5_Props {
    given_state_TestText: string;
    given_LogButtonPress(givenString: string): void;
    given_SetPage(givenPageName: string): void;
    given_AddObject(data: object): void;
}


export default function Page_5(props: Page_5_Props) {


    return (
        <div
            style={{
                backgroundColor: "indigo",
            }}
            className="page-default"
        >
            <h1 style={{ color: "lightgray" }}>Page 5</h1>
            <h4 style={{ color: "lightgray" }}>Given text: {props.given_state_TestText}</h4>
            <img

                style={{ height: "auto", width: "50%", maxWidth: "350px" }}
                src={"/assets/kingCrab.gif"} >

            </img>
            <Button
                onClick={() => { props.given_SetPage("page6"), props.given_LogButtonPress("event-4"); props.given_AddObject( {"message" : "Error4"})}}
                style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 4 and Continue</Button>
            <Button
                onClick={() => { props.given_SetPage("page6") }}
                style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>
            <Button
                onClick={() => { props.given_SetPage("page4") }}
                style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
        </div>

    )
}