import React from "react";
import { i18n } from "../utils/i18n";
import License from "../views/License/License";
import AssignLicense from "../views/AssignLicense/AssignLicense";
import ShowUser from "../views/User/ShowUser";
import Statistics from "../views/Statistics/Statistics";

const dashboardRoutes = [
  // {
  //   name: i18n._("Create a User"),
  //   title: i18n._("Create a User"),
  //   path: "/create-user",
  //   component: <CreateUser />
  // },
  {
    show:true,
    name: i18n._("Licenses"),
    title: i18n._("Licenses"),
    path: "/licenses",
    component: <License />
  },
  {
    show:true,
    name: i18n._("Users"),
    title: i18n._("Users"),
    path: "/users",
    component: <AssignLicense />
  },
  {
    show:false,
    name: i18n._("Show user"),
    title: i18n._("Show user"),
    path: "/show-user/:id",
    component: <ShowUser />
  },
  {
    show:true,
    name: i18n._("Dashboard"),
    title: i18n._("Dashboard"),
    path: "/dashboard",
    component: <Statistics />
  },
];

export default dashboardRoutes;