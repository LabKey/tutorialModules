import React, { PureComponent } from 'react';
import { GridPanel, InjectedQueryModels, withQueryModels } from '@labkey/components';

// First define the properties of the component you're going to wrap with withQueryModels.
interface OwnProps {
    title: string;
    asPanel: boolean;
}

// Here we create a type that includes InjectedQueryModels because
// we're wrapping the component with withQueryModels which will inject
// queryModels and actions objects.
type Props = OwnProps & InjectedQueryModels;

// Here we use the name ExampleGridPanelImpl, users will not use this
// component directly, only the wrapped version below which we expose
// to users as ExampleGridPanel.
class ExampleGridPanelImpl extends PureComponent<Props> {
    onRefreshGrid = () => {
        const { queryModels, actions } = this.props;
        const { containersModel } = queryModels;

        actions.loadModel(containersModel.id);
    };

    // This is an example of a custom button bar element in your GridPanel that can interact with the QueryModel.
    renderGridButtons = () => {
        return (
            <button className={'labkey-button'} onClick={this.onRefreshGrid}>
                Refresh Grid
            </button>
        )
    };

    render() {
        // Note that queryModels and actions come from InjectedQueryModels via withQueryModels
        const { queryModels, actions, title, asPanel } = this.props;
        const { containersModel } = queryModels;

        return (
            <GridPanel
                model={containersModel}
                ButtonsComponent={this.renderGridButtons}
                actions={actions}
                title={title}
                asPanel={asPanel}
                hideEmptyChartMenu={true}
                hideEmptyViewMenu={true}
            />
        );
    }
}

// Next wrap your component with withQueryModels, here we set the type
// to OwnProps so the returned component, ExampleGridPanel, can
// be used in a type-safe manner. In this case, if the user forgets to
// pass in a title or the asPanel property, we'll get a compiler error as intended.
export const ExampleGridPanel = withQueryModels<OwnProps>(ExampleGridPanelImpl);