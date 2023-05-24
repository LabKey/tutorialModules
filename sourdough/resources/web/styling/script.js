// The following calls are for illustrative demoing purposes. Note that calling the below endpoints directly is not
// usual practice.

const setHeaderFooter = (on) => {
    const module = on ? 'sourdough' : 'Core';

    if (LABKEY.moduleContext.api.moduleNames.includes("premium")) {
        LABKEY.Ajax.request({
            method: 'POST',
            url: LABKEY.ActionURL.buildURL('premium', 'adminConsoleConfigurePageElements.view', '/', {
                headerModule: module,
                bannerModule: 'none',
                footerModule: module,
            }),
            success: () => { location.reload() },
        });
    } else {
        alert("Error: Premium module is required but absent")
    }
};

const setLogin = (on) => {
    LABKEY.Ajax.request({
        method: 'POST',
        url: LABKEY.ActionURL.buildURL('admin', 'lookAndFeelSettings.view', '/', {
            systemShortName: "LabKey Server",
            themeName: "Seattle",
            folderDisplayMode: "ALWAYS",
            applicationMenuDisplayMode: "ALWAYS",
            helpMenuEnabled: "on",
            discussionEnabled: "on",
            logoHref: "${contextPath}/home/project-start.view",
            reportAProblemPath: "${contextPath}/home/support/project-begin.view",
            systemEmailAddress: "rosalinep@labkey.com",
            companyName: "Demo Installation",
            defaultDateFormat: "yyyy-MM-dd",
            defaultDateTimeFormat: "yyyy-MM-dd HH:mm",
            dateParsingMode: "US",
            customLogin: on ? "sourdough-login" : "login-login"
        }),
        success: () => { alert("Success!") },
        failure: (e) => { alert("Error!") },
    });
}
