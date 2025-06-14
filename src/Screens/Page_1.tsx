import { Button } from "react-bootstrap"
import "../CSS/PageStyle.css"
import "../CSS/Button-Custom.css"
import Text_PageTitle from "../Components/Text_PageTitle";

interface Page_1_Props {
    given_state_TestText: string;
    given_handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
    given_SetPage(givenPageName: string): void;
}


export default function Page_1(props: Page_1_Props) {


    return (
        <div
            className="page-default">
            {/*         <h1 style={{ color: "lightgray" }}>Page 1</h1> */}
            <Text_PageTitle

                textToRender="Page 1"

            />
            <img

                style={{ height: "auto", width: "50%", maxWidth: "350px" }}
                src={"/bigTimby.gif"} >

            </img>
            <div style={{
                background: "gray",
                padding: "15px",
                gap: "15px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>

                <h3 style={{ color: "lightgray" }}>Testing Event Funnels</h3>
                <input
                    type="text"
                    value={props.given_state_TestText}
                    style={{ width: "100%" }}
                    onChange={props.given_handleInputChange}
                    placeholder="Enter your name or any text (OPTIONAL)"
                    className="p-2 border rounded w-full"
                />
                <Button
                    onClick={() => { props.given_SetPage("page2") }}
                    style={{ backgroundColor: "lightgreen", color: "black", width: "100%" }}>
                    Press to Start the Test
                </Button>

            </div>

            <div style={{
                background: "gray",
                padding: "15px",
                gap: "15px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}>


                <h3 style={{ color: "lightgray" }}>Testing Firebase Error Reporting</h3>

                <Button
                    onClick={() => { props.given_SetPage("page_that_doesn't_exist!") }}
                    className={"eddies-custom-button"}

                    style={{ backgroundColor: "maroon" }}
                >
                    Press to Simulate a Nav Error!
                </Button>
                <Button
                    onClick={() => { props.given_SetPage("page-Error-Image") }}
                    className={"eddies-custom-button"}
                >
                    Press to Simulate an Asset Load Error!
                </Button>
                <Button
                    onClick={() => { props.given_SetPage("page-Example-ReportViewer") }}
                    className={"eddies-custom-button"}

                >
                    Press to see some Reports!!
                </Button>


            </div>

        </div>

    )
}