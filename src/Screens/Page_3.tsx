import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"

interface Page_3_Props {
    given_state_TestText: string;
    given_LogButtonPress(givenString: string): void;
    given_SetPage(givenPageName: string): void;
    given_AddObject(data: object): void;
}


export default function Page_3(props: Page_3_Props) {


    return (
        <div
            style={{
                backgroundColor: "darkslateblue"
            }}
            className="page-default"
        >
            <h1 style={{ color: "lightgray" }}>Page 3</h1>
            <h4 style={{ color: "lightgray" }}>Given text: {props.given_state_TestText}</h4>
            <img

                style={{ height: "auto", width: "50%", maxWidth: "350px" }}
                src={"/assets/marauder.gif"} >

            </img>
            <Button
                onClick={() => {
                    props.given_SetPage("page4"), props.given_LogButtonPress("event-2");
                    // props.given_AddObject( {"message" : "Error2"})
                }}
                style={{ backgroundColor: "lightgreen", color: "black", width: "85%", }}>Press to Log Event 2 and Continue</Button>
            <Button
                onClick={() => { props.given_SetPage("page4") }}
                style={{ backgroundColor: "lightblue", color: "black", width: "85%", }}>Press to Continue with No Event Logged</Button>
            <Button
                onClick={() => { props.given_SetPage("page2") }}
                style={{ backgroundColor: "pink", color: "black", width: "85%", }}>Press to Return to Previous Page</Button>
        </div>

    )
}