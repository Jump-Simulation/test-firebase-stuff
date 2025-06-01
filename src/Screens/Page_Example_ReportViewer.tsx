import React, { useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import "../CSS/PageStyle.css"
import { Button } from 'react-bootstrap';
import Example_HealthReport from '../Components/Example_HealthReport';
import { HealthReportObject } from '../types';

interface HealthReport {
  id: string;
  Report: string;
}


interface Page_Example_ReportViewer_Props {
  given_SetPage(givenPageName: string): void;
  given_state_SetCurrentOpenReport(givenReport: HealthReportObject): void;
  given_state_SetShowCurrentReport(givenBool: boolean): void;
}


export default function Page_Example_ReportViewer(props: Page_Example_ReportViewer_Props) {

  const [reports, setReports] = useState<HealthReport[]>([]);
  const [loading, setLoading] = useState(false);

  const [structuredReports, setStructuredReports] = useState<HealthReportObject[]>([]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const firestore = getFirestore();
      const reportsCollection = collection(firestore, 'HealthReports/organizations/osf-sfmc');
      const snapshot = await getDocs(reportsCollection);

      const structured: HealthReportObject[] = snapshot.docs
        .map(doc => {
          const raw = doc.data() as { Report?: string };

          if (!raw.Report) {
            console.warn(`Skipping document ${doc.id}: missing Report field.`);
            return null; // Skip if Report field is missing
          }

          const fields = raw.Report.split('||');
          const reportObj: Partial<HealthReportObject> = {};

          fields.forEach(field => {
            const [key, value] = field.split('_');
            switch (key.trim()) {
              case "Project Name":
                reportObj.projectName = value;
                break;
              case "Report Type":
                reportObj.reportType = value;
                break;
              case "Report Date":
                reportObj.reportDate = value;
                break;
              case "Report Message":
                reportObj.reportMessage = value;
                break;
              case "Report Code Location":
                reportObj.reportCodeLocation = value;
                break;
              case "User ID":
                reportObj.userID = value;
                break;
              case "Device Info":
                reportObj.deviceInfo = value;
                break;
              case "Browser Name":
                reportObj.browserName = value;
                break;
              case "Browser Version":
                reportObj.browserVersion = value;
                break;
              default:
                break;
            }
          });

          return reportObj as HealthReportObject;
        })
        .filter((r): r is HealthReportObject => r !== null); // filter out skipped ones
      setStructuredReports(structured);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedReports = structuredReports.reduce((groups: Record<string, HealthReportObject[]>, report) => {
    const type = report.reportType || "Unknown";
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(report);
    return groups;
  }, {});


  return (
    <div
      className="page-default"
      style={{ backgroundColor: "dodgerblue" }}
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

      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "start",
        width: "100%"
      }}>
        {Object.entries(groupedReports).map(([reportType, reports]) => (
          <div key={reportType} style={{ marginBottom: '2rem', border: '2px solid white', padding: '1rem', width: "100%" }}>
            <h3 style={{ color: 'white' }}>{reportType}s</h3>
            <ul style={{
              listStyle: 'none',
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 0
            }}>
              {reports.map((report, index) => (

                <Example_HealthReport
                  key={index + "_" + report}
                  given_Report={report}
                  given_state_SetCurrentOpenReport={props.given_state_SetCurrentOpenReport}
                  given_state_SetShowCurrentReport={props.given_state_SetShowCurrentReport}

                />

              ))}
            </ul>
          </div>
        ))}
      </div>

      <Button onClick={fetchReports} disabled={loading} style={{ backgroundColor: "green" }}>
        {loading ? 'Loading...' : 'Fetch Health Reports'}
      </Button>
    </div>
  )





}