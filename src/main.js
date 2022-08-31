import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faTrash,
  faLink,
  faListUl,
  faRandom,
  faUndo,
  faStar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faLink, faListUl, faRandom, faUndo, faStar, faEnvelope);

createApp(App).use(router).mount("#app");
