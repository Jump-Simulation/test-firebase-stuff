import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"

interface Page_6_Props {
    given_state_TestText: string;
    given_SetPage(givenPageName: string): void;
}


export default function Page_6(props: Page_6_Props) {


    return (
        <div
            style={{
                backgroundColor: "navy",
            }}
            className="page-default"
        >
            <h1 style={{ color: "#e7ded6" }}>Page 6</h1>
            <h4 style={{ color: "#e7ded6" }}>Sensor sweep came back negative, MechWarrior!</h4>
            <h4 style={{ color: "#e7ded6" }}>Given text: {props.given_state_TestText}</h4>
            <img

                style={{ height: "auto", width: "50%" }}
                src={"/9266d9e80b133d6b24e901c4da29ab4f.gif"} >

            </img>
            <h5 style={{ color: "#e7ded6" }}>Return to base...</h5>
            <Button
                onClick={() => { props.given_SetPage("page5") }}
                style={{ backgroundColor: "darkred", color: "white", width: "85%", }}>Press to Return to Previous Page</Button>
        </div>

    )
}