import { Button } from "react-bootstrap";
import "../CSS/PageStyle.css"
import { useEffect, useState } from "react";
import { useAppContext } from "../App";
import Example_ImageComponent from "../Components/Example_ImageComponent";


interface Page_Error_Image_Props {
    given_state_TestText: string;
    given_SetPage(givenPageName: string): void;
}


export default function Page_Error_Image(props: Page_Error_Image_Props) {

    const [state_ImageFileName, state_SetImageFileName] = useState("nightstar.gif");
    const [inputValue, setInputValue] = useState(""); // temporary input state


    return (
        <div
            style={{
                backgroundColor: "darkcyan"
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
            <Example_ImageComponent
                given_FileName={state_ImageFileName}
                given_CallLocation="Page Error Image.tsx at line 31"
            />
            <div style={{ width: "100%", color: "lightgray", display: "flex", justifyContent: "center", alignItems: "start", flexDirection: "column" }}>
                <span style={{ fontWeight: "bold" }}> Valid file names include: </span>
                <span>atlas.gif</span>
                <span>kingCrab.gif</span>
                <span>madCatII.gif</span>
                <span>marauder.gif</span>
                <span>nightstar.gif</span>
                <span>shades.gif</span>
            </div>
            <div style={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px"
            }}>

                <input
                    type="text"
                    value={inputValue}
                    style={{ width: "50%", height: "100%" }}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type valid or invalid file names here"
                    className="p-2 border rounded w-full"
                />
                <Button
                    onClick={() => { state_SetImageFileName(inputValue) }}
                    style={{
                        backgroundColor: "lightgreen", color: "black",
                        width: "50%", height: "100%",
                    }}>
                    Confirm Image Name
                </Button>


            </div>



        </div>
    )
}