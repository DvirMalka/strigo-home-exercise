import { FunctionComponent } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "../services/history";
import WorkspacesTable from "./WorkspacesTable";
import EventsTable from "./EventsTable";

const FullPage: FunctionComponent<{}> = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/events" />
        </Route>
        <Route path="/workspaces">
          <WorkspacesTable />
        </Route>
        <Route path="/events" exact>
          <EventsTable />
        </Route>
        <Route path="/events/:eventId">
          <WorkspacesTable />
        </Route>
      </Switch>
    </Router>
  );
};

export default FullPage;
