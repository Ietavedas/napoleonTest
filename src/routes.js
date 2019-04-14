
import React from "react";
import { MakeRouteWitheSubRoutes } from './util/helper';

import Main from './containers/Main';

const routerList = [
    {
        name: 'Main',
        path: '/',
        exact: true,
        component: Main
    },
];

export const routes = (
    <div>
        { routerList.map((route, index) => <MakeRouteWitheSubRoutes key={index} {...route} />) }
    </div>
);
