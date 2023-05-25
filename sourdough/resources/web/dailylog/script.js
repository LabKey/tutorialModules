const init = () => {
    // Renders QueryWebPart
    const qwp = new LABKEY.QueryWebPart({
        renderTo: 'myQWP',
        title: 'My Loaves',
        schemaName: 'lists',
        queryName: 'DailyLog',
        sort: 'Date',
        frame: 'portal',
        showDetailsColumn: false,
        showRecordSelectors: false,
        showExportButtons: false,
        showUpdateColumn: false,
        buttonBar: {
            position: 'none',
        },
    });

    // Renders Datepicker
    const dateInput = document.querySelector('input[id="date"]');
    const datepicker = new Datepicker(dateInput, {});
};

const onUpload = () => {
    document.getElementById('daily-log-upload-indicator').innerHTML = 'uploaded';
};

const onSubmit = () => {
    const Date = document.getElementById('date').value;
    const Comment = document.getElementById('comment').value;
    const Picture = document.getElementById('picture').files[0];

    LABKEY.Query.insertRows({
        schemaName: 'lists',
        queryName: 'DailyLog',
        autoFormFileData: true,
        rows: [
            {
                Date,
                Comment,
                Picture,
            },
        ],
        success: () => {
            const regionNames = Object.keys(LABKEY.DataRegions);
            regionNames.forEach(e => {
                LABKEY.DataRegions[e].refresh();
            });
        },
    });
};

$(document).ready(function(){
    console.log("We can use jQuery too! Current version:", $().jquery);
});
