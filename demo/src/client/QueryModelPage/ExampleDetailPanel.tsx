import React, { PureComponent } from 'react';
import { DetailPanelWithModel, QueryConfig, SchemaQuery } from '@labkey/components';
import { getServerContext } from '@labkey/api';

interface Props {
    asPanel?: boolean
}

export class ExampleDetailPanel extends PureComponent<Props> {
    // This function will return the QueryConfig definition for the LabKey schema/query to use for the API call
    // to get data from the LabKey server about the given container (i.e. keyValue).
    getQueryConfig(): QueryConfig {
        return {
            schemaQuery: new SchemaQuery('core', 'Containers'),
            keyValue: getServerContext().container.id
        };
    }

    // The render function of this component just passes along the QueryConfig to the @labkey/component's
    // DetailPanelWithModel component. That component will make the API call to get the data and render the results.
    render() {
        return (
            <DetailPanelWithModel
                asPanel={this.props.asPanel}
                queryConfig={this.getQueryConfig()}
            />
        )
    }
}
