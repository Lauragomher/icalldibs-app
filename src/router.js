import { createRouter, createWebHistory } from "vue-router";
//////*//*//*//*/Antes de entrar/*//*//*//*//*////
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import LoginUsuario from "./components/LoginUsuario.vue";
//////*//*//*//*/Dentro de la plataforma/*//*//*//*//*////
//////./COMPARTIDO/.////////
//Tablón de anuncios
import TablonAnuncios from "./components/TablonAnuncios.vue"
import TablonAnunciosCrear from "./components/TablonAnunciosCrear.vue"
import TablonAnunciosEliminar from "./components/TablonAnunciosEliminar.vue"
//////./PARTE DE VECINOS/.////////
import Dashboard from "./components/Dashboard.vue";
import Areas from "./components/Areas.vue"
//Reserva
import formularioReserva from "./components/formularioReserva.vue";
import SuccessReserva from "./components/SuccessReserva.vue";
import SBReserva from "./components/SBReserva.vue";
//Histórico de reservas
import MisReservas from "./components/MisReservas.vue";
import MisReservasCancel from "./components/MisReservasCancel.vue";
//////./PARTE DE ADMIN/.////////
import Dashboard2admin from "./components/Dashboard2admin.vue";
//Gestión usuarios
import GestionUsuarios from "./components/GestionUsuarios.vue";
import GUAsignar from "./components/GUAsignar.vue";
import GUModificar from "./components/GUModificar.vue";
import GUEliminar from "./components/GUEliminar.vue";
//Gestión comunidades
import GestionComunidades from "./components/GestionComunidades.vue";
import GCModificar from "./components/GCModificar.vue";
import GCCrear from "./components/GCCrear.vue";
import GCEliminar from "./components/GCEliminar.vue";
//Gestión áreas/zonas comunes
import GestionAreas from "./components/GestionAreas.vue";
import GACrear from "./components/GACrear.vue";
import GAModificar from "./components/GAModificar.vue";
import GAEliminar from "./components/GAEliminar.vue";
//Landing de "thank you page" - Feedback para el usuario
import GestionSuccess from "./components/GestionSuccess.vue";

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login-usuario",
      component: LoginUsuario,
    },
    {
      path: "/sign-up",
      name: "Sign-up",
      component: SignUp,
    },
    {
      path: "/dashboard",
      name: "Dashboard-vecino",
      component: Dashboard,
    },
    {
      path: "/dashboard-admin",
      name: "Dashboard-admin",
      component: Dashboard2admin,
    },
    {
      path: "/areas-comunes",
      name: "Areas-comunes",
      component: Areas,
    },
    {
      path: "/reserva/:id",
      name: "Formulario-reserva",
      component: formularioReserva,
    },
    {
      path: "/reserva-realizada",
      name: "Success-reserva",
      component: SuccessReserva,
    },
    {
      path: "/completado",
      name: "Success-gestion",
      component: GestionSuccess,
    },
    {
      path: "/reserva-borrada",
      name: "Success-borrar-reserva",
      component: SBReserva,
    },
    {
      path: "/mis-reservas",  
      name: "Mis-reservas",
      component: MisReservas,
    },
    {
      path: "/mis-reservas/:id",  
      name: "Mis-reservas-cancel",
      component: MisReservasCancel,
    },
    {
      path: "/gestion-usuarios",  
      name: "Gestion-usuarios",
      component: GestionUsuarios,
    },      
    {
      path: "/gestion-usuarios/asignar/:id",  
      name: "Gestion-usuarios-asignar",
      component: GUAsignar,
    },
    {
      path: "/gestion-usuarios/editar/:id",  
      name: "Gestion-usuarios-modificar",
      component: GUModificar,
    },
    {
      path: "/gestion-usuarios/borrar/:id",  
      name: "Gestion-usuarios-eliminar",
      component: GUEliminar,
    },
    {
      path: "/gestion-comunidades",  
      name: "Gestion-comunidades",
      component: GestionComunidades,
    },
    {
      path: "/gestion-comunidades/editar/:id",  
      name: "Gestion-comunidades-modificar",
      component: GCModificar,
    },
    {
      path: "/gestion-comunidades/nueva/",  
      name: "Gestion-comunidades-crear",
      component: GCCrear,
    },
    {
      path: "/gestion-comunidades/borrar/:id",  
      name: "Gestion-comunidades-eliminar",
      component: GCEliminar,
    },
    {
      path: "/gestion-zonas-comunes",  
      name: "Gestion-zonas-comunes",
      component: GestionAreas,
    },
    {
      path: "/gestion-zonas-comunes/nueva/",  
      name: "Gestion-areas-crear",
      component: GACrear,
    },
    {
      path: "/gestion-zonas-comunes/editar/:id",  
      name: "Gestion-areas-modificar",
      component: GAModificar,
    },
    {
      path: "/gestion-zonas-comunes/borrar/:id",  
      name: "Gestion-areas-eliminar",
      component: GAEliminar,
    },
    {
      path: "/tablon-anuncios/:com",  
      name: "Tablon-anuncios",
      component: TablonAnuncios,
    },
    {
      path: "/tablon-anuncios/:com/nuevo",  
      name: "Tablon-anuncios-crear",
      component: TablonAnunciosCrear,
    },
    {
      path: "/tablon-anuncios/:com/eliminar/:id",  
      name: "Tablon-anuncios-eliminar",
      component: TablonAnunciosEliminar,
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;  
