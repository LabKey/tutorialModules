import React, { PureComponent } from 'react';
import { Query } from '@labkey/api';
import { SchemaQuery } from '@labkey/components';

import { ExampleDetailPanel } from "./ExampleDetailPanel";
import { ExampleGridPanel } from "./ExampleGridPanel";

import './queryModelExample.scss';

export class App extends PureComponent {
    render() {
        const queryConfigs = {
            containersModel: {
                schemaQuery: SchemaQuery.create('core', 'Containers'),
                containerFilter: Query.containerFilter.allFolders,
                omittedColumns: ['SortOrder','Searchable','Type','Title','ContainerType','Workbook','IdPrefixedName']
            }
        };

        return (
            <>
                <p>
                    This page contains two example usages of the <b>QueryModel API</b>. The first panel uses
                    the <b>DetailPanelWithModel</b> to show a details view of some information about the current
                    LabKey container. The second panel uses the <b>GridPanel</b> and <b>withQueryModels</b> to show a
                    grid panel view of LabKey container information for all Labkey containers that the current,
                    logged-in user has permissions to access. This component has options for sorting, filtering, paging,
                    and exporting the data shown in the grid.
                </p>
                <p>
                    Further details on these components and examples can be found in the&nbsp;
                    <a href={'https://github.com/LabKey/labkey-ui-components/blob/master/packages/components/docs/public.md'} target={'_blank'}>Public API Docs</a>&nbsp;
                    page for the <b>@labkey/components</b> package.
                </p>
                <ExampleDetailPanel
                    asPanel={true}
                />
                <ExampleGridPanel
                    title="LabKey Server Containers"
                    queryConfigs={queryConfigs}
                    asPanel={true}
                    autoLoad
                />
            </>
        )
    }
}