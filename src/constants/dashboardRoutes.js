import React from "react";
import Dashboard from "../views/Dashboard/Dashboard";
import { i18n } from "../utils/i18n";
import CreateUser from "../views/CreateUser/CreateUser";
import License from "../views/License/License";
import AssignLicense from "../views/AssignLicense/AssignLicense";
import ShowUser from "../views/User/ShowUser";

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
    name: i18n._("Assign a License"),
    title: i18n._("Assign a License"),
    path: "/assign-license",
    component: <AssignLicense />
  },
  {
    show:false,
    name: i18n._("Show user"),
    title: i18n._("Show user"),
    path: "/show-user/:id",
    component: <ShowUser />
  },
];

export default dashboardRoutes;