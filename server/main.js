import Tareas from "../imports/api/tareas";
import Grupos from "../imports/api/grupos";
import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

Meteor.startup(() => {
  WebApp.addHtmlAttributeHook(() => ({ lang: "en" }));
});