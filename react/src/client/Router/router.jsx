import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createHashRouter, createRoutesFromElements, Link, Outlet, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ActionURL, getServerContext, Query } from '@labkey/api';

const AppCrumbTrail = memo(() => {
    const location = useLocation();

    const crumbs = useMemo(() => {
        const { pathname } = location;
        const parts = pathname.split('/');
        const crumbs_ = [];

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            // home
            if (i === 0) {
                crumbs_.push({ key: '/', label: 'Home', to: '/' });
            } else if (part !== '') {
                const path = parts.slice(0, i + 1).join('/');
                if (path === pathname) {
                    crumbs_.push({ key: path, label: parts[i] });
                } else {
                    crumbs_.push({ key: path, label: parts[i], to: path });
                }
            }
        }

        return crumbs_;
    }, [location.pathname]);

    return (
        <div className="app-crumb-trail">
            {crumbs.map(crumb => (
                <span key={crumb.key}>
                    {crumb.to && <Link to={crumb.to}>{crumb.label}</Link>}
                    {!crumb.to && <span>{crumb.label}</span>}
                    {crumb.to && <>&nbsp;/&nbsp;</>}
                </span>
            ))}
        </div>
    )
});

const App = memo(() => {
    return (
        <div className="app-class">
            <Outlet />
        </div>
    );
});

const HomePage = memo(() => {
    return (
        <Page title="Welcome to the react router app.">
            <ul>
                <li><Link to="/first">First</Link></li>
                <li><Link to="/form">Form</Link></li>
                <li><Link to="/lists">LabKey Lists</Link></li>
                <li><Link to="/somePage">404</Link></li>
            </ul>
        </Page>
    );
});

const Page = memo(props => {
    const { children, title } = props;

    return (
        <div className="app-page">
            <AppCrumbTrail />
            <h4>{title}</h4>
            {children}
        </div>
    )
});

const FormPage = memo(() => {
    const [name, setName] = useState();
    const navigate = useNavigate();

    const onNameChange = useCallback(event => {
        setName(event.target.value);
    }, []);

    const onSubmit = useCallback(event => {
        event.preventDefault();
        navigate(`/summary?name=${name}`);
    }, [name, navigate]);

    return (
        <Page title="Form Page">
            <form onSubmit={onSubmit}>
                <input name="name" onChange={onNameChange} placeholder="Type in a name" required type="text" />
                <button type="submit">Submit</button>
            </form>
        </Page>
    );
});

const SummaryPage = memo(() => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');

    return (
        <Page title="Summary Page">
            <div>
                <span style={{ marginRight: '8px' }}>The name is "{name}".</span>
                <Link to="/form">Another name?</Link>
            </div>
        </Page>
    );
});

const ListsPage = memo(() => {
    const { container } = getServerContext();
    const [loading, setLoading] = useState(true);
    const [numLists, setNumLists] = useState(0);

    useEffect(() => {
        setLoading(true);

        Query.selectRows({
            schemaName: 'ListManager',
            queryName: 'ListManager',
            requiredVersion: 17.1,
            success: data => {
                setNumLists(data.rowCount);
                setLoading(false);
            },
            failure: errorInfo => {
                console.error(errorInfo);
                setNumLists(0);
                setLoading(false);
            },
        });
    }, []);

    return (
        <Page title="LabKey Lists">
            {loading && <div>Loading...</div>}
            {!loading && (
                <div>
                    There are <a href={ActionURL.buildURL('list', 'begin')}>{numLists} lists</a>{' '}
                    defined in the {container.path} folder.
                </div>
            )}
        </Page>
    );
});

const NotFound = memo(() => {
    return (
        <div>
            <h4>404: Page Not Found</h4>
        </div>
    );
});

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/first" element={<Page title="First Page" />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/summary">
                <Route index element={<SummaryPage />} />
            </Route>
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/*" element={<NotFound />} />
        </Route>
    )
);