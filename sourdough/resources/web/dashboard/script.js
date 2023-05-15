const init = () => {
    LABKEY.Report.execute({
        reportName: 'risesgraph',
        schemaName: 'lists',
        queryName: 'Rises',
        success: r => {
            // Create image
            const img = document.createElement('img');
            if (r.errors.length > 0) {
                alert(r.errors[0]);
            }
            img.src = r.outputParams[0].value;
            img.className = 'dashboard__image';
            const src = document.getElementById('dashboard');
            src.appendChild(img);

            // Create output
            const div = document.createElement('div');
            div.innerHTML = r.console[0];
            div.className = 'dashboard__output';
            src.appendChild(div);

            // Remove loading text
            document.getElementById('loading').remove();

            const qwp1 = new LABKEY.QueryWebPart({
                renderTo: 'myQWP1',
                schemaName: 'lists',
                queryName: 'Rises',
                title: 'Using Raw Data',
                frame: 'dialog',
                showDetailsColumn: false,
                showRecordSelectors: false,
                showExportButtons: false,
                showUpdateColumn: false,
                buttonBar: {
                    position: 'none',
                },
            });

            const qwp2 = new LABKEY.QueryWebPart({
                renderTo: 'myQWP2',
                schemaName: 'lists',
                queryName: 'RisesQuery',
                title: 'Using Module Query',
                frame: 'dialog',
                showDetailsColumn: false,
                showRecordSelectors: false,
                showExportButtons: false,
                showUpdateColumn: false,
                buttonBar: {
                    position: 'none',
                },
            });
        },
    });
};
