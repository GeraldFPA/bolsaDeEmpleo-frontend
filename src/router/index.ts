import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import BuscarEmpleos from "../views/BuscarEmpleos.vue";
import Postularme from "@/views/Postularme.vue";
import CrearOferta from "@/views/CrearOferta.vue";
import PerfilUsuario from "@/views/PerfilUsuario.vue";
import RegistrarUsuario from "@/views/RegistrarUsuario.vue";
import HistorialUsuario from "@/views/HistorialUsuario.vue";
import Postulaciones from "@/views/Postulaciones.vue";
import Login from "@/views/Login.vue";
import MisNotificaciones from "@/views/MisNotificaciones.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/Login",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/BuscarEmpleos",
    name: "BuscarEmpleos",
    component: BuscarEmpleos,
  },
  {
    path: "/Postularme",
    name: "Postularme",
    component: Postularme,
  },
  {
    path: "/CrearOferta",
    name: "crearOferta",
    component: CrearOferta,
  },
  {
    path: "/PerfilUsuario",
    name: "PerfilUsuario",
    component: PerfilUsuario,
  },
  {
    path: "/RegistrarUsuario",
    name: "RegistrarUsuario",
    component: RegistrarUsuario,
  },
  {
    path: "/HistorialUsuario",
    name: "HistorialUsuario",
    component: HistorialUsuario,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Postulaciones",
    name: "Postulaciones",
    component: Postulaciones,
  },
  {
    path: "/MisNotificaciones",
    name: "MisNotificaciones",
    component: MisNotificaciones,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
