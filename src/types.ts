export type DeviceInfo = {
    type: string;
    vendor: string;
    model: string;
    browser: {
        name: string;
        version: string;
    };
};

export type HealthReportObject = {
    projectName: string;
    reportType: string;
    reportDate: string;
    reportMessage: string;
    reportCodeLocation: string;
    userID: string;
    deviceInfo: string;
    browserName: string;
    browserVersion: string;
}