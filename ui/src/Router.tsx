import React, { FC } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "./App";

export interface AppRouteParams {
    roomId: string;
}

export const Router: FC<{}> = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/:roomId" children={<App />} />
          <Route path="/">
            <App />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}
