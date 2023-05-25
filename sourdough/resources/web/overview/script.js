const uploadDailyLogData = async () => {
    const urlToFile = async imageName => {
        const response = await fetch(LABKEY.ActionURL.getContextPath() + '/images/' + imageName);
        const blob = await response.blob();
        return new File([blob], 'image.jpg', { type: blob.type });
    };

    LABKEY.Query.insertRows({
        schemaName: 'lists',
        queryName: 'DailyLog',
        autoFormFileData: true,
        rows: [
            {
                Date: '04/03/2023',
                Comment:
                    'Pretty tasty, a little dry though. I wonder what would happen if I adjusted the oven humidity?',
                Picture: await urlToFile('sourdough1.jpeg'),
            },
            {
                Date: '04/04/2023',
                Comment: 'This one was pretty good, no notes!',
                Picture: await urlToFile('sourdough2.jpeg'),
            },
            {
                Date: '04/05/2023',
                Comment:
                    'I think this one was a particular success. The rise was excellent and the crust was very snappy.',
                Picture: await urlToFile('sourdough3.jpeg'),
            },
        ],
        success: () => {
            const text = document.getElementById('overview__text');
            text.className = 'overview__success-text';
        },
    });
};

const onInit = () => {
    const text = document.getElementById('overview__text');
    text.className = 'overview__loading-text';

    LABKEY.Ajax.request({
        method: 'POST',
        url: LABKEY.ActionURL.buildURL('premium', 'adminConsoleConfigurePageElements.view', '/', {
            headerModule: 'sourdough',
            bannerModule: 'none',
            footerModule: 'Core',
        }),
    });

    LABKEY.Domain.create({
        domainGroup: 'starterdomains',
        importData: true,
        success: uploadDailyLogData,
    });
};
