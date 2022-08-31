import { createRouter, createWebHashHistory } from "vue-router";
import MyHome from "../views/MyHome.vue";
import MyLogin from "../views/MyLogin.vue";
import MyRegistration from "../views/MyRegistration.vue";
import MyMeetings from "../views/MyMeetings.vue";
import CheckIn from "../views/CheckIn.vue";
import Atendees from "../views/Atendees.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MyHome,
  },
  {
    path: "/login",
    name: "login",
    component: MyLogin,
  },
  {
    path: "/meetings",
    name: "meetings",
    component: MyMeetings,
  },
  {
    path: "/register",
    name: "register",
    component: MyRegistration,
  },
  {
    path: "/checkin/:userID/:meetingID",
    name: "checkin",
    component: CheckIn,
  },
  {
    path: "/atendees/:userID/:meetingID",
    name: "Atendees",
    component: Atendees,
  },

  {
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
