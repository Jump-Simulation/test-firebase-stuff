import { HealthReportObject } from "../types";
import React, { useState } from 'react';

interface Example_HealthReport_Props {
    given_Report: HealthReportObject;
    given_state_SetCurrentOpenReport(givenReport: HealthReportObject): void;
    given_state_SetShowCurrentReport(givenBool: boolean): void;
}

export default function Example_HealthReport(props: Example_HealthReport_Props) {

    return (

        <div
            onClick={() => {
                props.given_state_SetCurrentOpenReport(props.given_Report)
                props.given_state_SetShowCurrentReport(true);

            }}
            style={{
                cursor: 'pointer',
                backgroundColor: 'white',
                border: '2px solid black',
                borderRadius: '8px',
                padding: '1rem',
                margin: '0.5rem',
                width: "100%",
                boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
            }}
        >
            <strong>{props.given_Report.reportDate}</strong>
        </div>



    );

}