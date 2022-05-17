<template>
  <div>
    <Header2admin />
    <h1>Gestión de usuarios</h1>
    <div class="container-areas">

      <div class="usuarios">
        <h3>Usuarios <span id="dest1">sin</span> comunidad</h3>
        <table class="tabla-usuarios-sin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rol</th>
              <th>Nombre</th>
              <th>Apellidos</th>
           </tr>
          </thead>
          <tbody>
            <tr v-for="item in usuariosSin" :key="item.id">
              <td>{{item.id_usuario}}</td>
              <td>{{item.id_rol}}</td>
              <td>{{item.nombre_usuario}}</td>
              <td>{{item.apellidos_usuario}}</td>
              <td><router-link :to="`/gestion-usuarios/asignar/`+item.id_usuario"><button class="btnDeg">Asignar <br>comunidad</button></router-link></td>
              <td><router-link :to="`/gestion-usuarios/editar/`+item.id_usuario"><button class="btnDeg">Modificar <br>datos</button></router-link></td>
              <td><router-link :to="`/gestion-usuarios/borrar/`+item.id_usuario"><button class="btnDel">Eliminar</button></router-link></td>           
            </tr>
          </tbody>
        </table>
      </div>

      <div class="usuarios">
        <h3>Usuarios <span id="dest2">con</span> comunidad</h3>
        <table class="tabla-usuarios-com">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rol</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Comunidad</th>
              <th>ID</th>
              <th>Nº vecinos</th>
           </tr>
          </thead>
          <tbody>
            <tr v-for="item in usuariosCom" :key="item.id">
              <td>{{item.id_usuario}}</td>
              <td>{{item.id_rol}}</td>
              <td>{{item.nombre_usuario}}</td>
              <td>{{item.apellidos_usuario}}</td>
              <td>{{item.nombre_comunidad}}</td>
              <td>{{item.id_comunidad}}</td>
              <td>{{item.total_vecinos_comunidad}}</td>
              <td><router-link :to="`/gestion-usuarios/editar/`+item.id_usuario"><button class="btnDeg2">Modificar <br>datos</button></router-link></td>
              <td><router-link :to="`/gestion-usuarios/borrar/`+item.id_usuario"><button class="btnDel">Eliminar</button></router-link></td>           
            </tr>
          </tbody>
        </table>
      </div> 
    </div>
  </div>
</template>

<script>
import Header2admin from "./Header2admin.vue"
import axios from "axios";
export default {
  name: "Gestion-usuarios",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      id_zona:"",
      tipo_zona:"",
      nombre: "",
      descripcion: "",
      aforo:"",
      usuariosCom:[],
      usuariosSin:[],
    }
  },
  components: {
    Header2admin
  },
  methods : {

  },
  mounted(){
    
    /////mostrar datos usuario
    let usuario = localStorage.getItem("user-info");
    //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    console.log(usuario);
    console.log(this.id_usuario);
/////Obtenemos los usuarios registrados sin comunidad///////
    axios.get(`https://icalldibs.000webhostapp.com/?servicio=obtener_usuarios_sin_comunidad`)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.usuariosSin = datosZona;
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
//Obtenemos los usuarios con comunidad de las comunidades
//que administra el admin////////////////////////////////
    const dataAdmin = {
      id_administrador: this.id_usuario
    }
    axios.post (`https://icalldibs.000webhostapp.com/?servicio=obtener_usuarios_comunidad`, dataAdmin)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.usuariosCom = datosZona;
      console.log(response);
    })
    .catch(e => {
       console.log(e);
    });
        /*
        let user = localStorage.getItem("user-info");
        //recogemos el nombre del usuario para mostrarlo en pantalla
        this.name = JSON.parse(user).name;
        //si el usuario no está registrado vuelve al login
        if (!user) {
            this.$router.push({name:"Login-vecino"})
        }*/
  }
}
</script>

<style scoped>
.container-areas {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-top: 40px;
}
h1 {
  text-align: center;
}
h3 {
  text-align: center;
  font-size: 1.4em;
  margin: 4px 0 0 0 ;
}
.tabla-usuarios-sin,
.tabla-usuarios-com {
  border-collapse: collapse;
  margin: 1.6em 0 3em 0;
  font-size: 1.2em;
  min-width: 140px;
  border: 0 solid transparent;
  border-radius: 14px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.tabla-usuarios-sin thead tr {
  background: var(--degradado1);
  color: black;
  border-radius: 12px;
}
.tabla-usuarios-com thead tr {
  background: linear-gradient(to right, var(--violeta), var(--verde));
  color: black;
  border-radius: 12px;
}
.tabla-usuarios-sin th,
.tabla-usuarios-sin td,
.tabla-usuarios-com th,
.tabla-usuarios-com td {
  padding: 12px 15px;
  text-align: center;
}
.tabla-usuarios-sin tbody tr,
.tabla-usuarios-com tbody tr {
  border-bottom: thin solid #dddddd;
}

.tabla-usuarios-sin tbody tr:nth-of-type(even),
.tabla-usuarios-com tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.tabla-usuarios-sin tbody tr:last-of-type {
  border-bottom: 2px solid var(--verde);
}
.tabla-usuarios-com tbody tr:last-of-type {
  border-bottom: 2px solid var(--morado);
}
#dest1{
  padding: 2px 6px;
  background-color: var(--verde);
}
#dest2 {
  padding: 2px 6px;
  background-color: var(--violeta);
}
.material-icons{
  font-size: 4.4em;
  color: white;
  background-image: var(--degradado1);
  border-radius: 50%;
  padding: 20px;
}
.texto-areas {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  min-width: 280px;
  padding: 1% 0 3% 0;
}
a {
  text-decoration: none;
}
p {
  font-size: 1.1em;
}
.btnDeg {
  padding: 10px 10px;
  margin: 0;
  font-size: 1em;
}
.btnDeg2 {
    background: linear-gradient(125deg, var(--violeta)28%, var(--verde));
    color:black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1em;
    border: 0 solid;
    margin: 0;
    padding: 10px 10px;
    cursor: pointer;
    z-index: 1;
}
.btnDeg2:hover {
  background: var(--verde);
}
.btnDel {
    background: var(--rojo);
    color:black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1em;
    border: 0 solid;
    margin: 0;
    padding: 10px 10px;
    cursor: pointer;
    z-index: 1;
}
.btnDel:hover {
  color: white;
  background: var(--rojo);
}
td {
  max-width: 180px;
}
@media screen and (max-width: 1145px) {
  table, tr, td {
    display: block;
  }
  td {
  max-width: 100%;
  }
  th, thead {
    display: none;
  }
  .tabla-usuarios-com,
  .tabla-usuarios-sin {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: center;
    box-shadow: none;
    border: none;
  }
  td:not(:first-child) {
    font-size: 1.2em;
    text-align: center;
  }
  td:not(:first-child):before {
    color: black;
    content: "  ";
    font-size: 1em;
  }
  td:nth-child(1):before {
    content: "ID usuario: ";
  }
  td:nth-child(2):before {
    content: "Rol: ";
  }
  .btnDeg,
  .btnDeg2 {
    margin: 4px 0 0 0;
  }
 .btnDel {
    margin: 0 0 18px 0;
  }
  td:nth-child(3):before {
    content: "Nombre: ";
  }
  td:nth-child(4):before {
    content: "Apellidos: ";
  }
  .tabla-usuarios-com td:nth-child(5):before {
    content: "Comunidad: ";
  }
.tabla-usuarios-com td:nth-child(6):before {
    content: "ID comunidad: ";
  }
  .tabla-usuarios-com td:nth-child(7):before {
    content: "Nº vecinos: ";
  }
  td:first-child {
    font-size: 1.2em;
    font-weight: 600;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
  }
  td:first-child {
    width: inherit;
  }
  .tabla-usuarios-sin td:first-child {
    background: var(--degradado1);
  }
  .tabla-usuarios-com td:first-child {
    background: linear-gradient(to right, var(--violeta)70%, var(--verde));
  } 
  td:not(:first-child) {
    margin-top: .6em;
  }
  tr {
    background-color: white;
    border: 1px solid rgb(212, 212, 212);
    min-width: 700px;
    max-width: 900px;
    border-radius: 10px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
    margin: 0 0 2.6em 0;
    padding: 0;
    display: flex;
    flex-flow: wrap column;
    align-items: center;
    justify-content: center;
  }
}
@media screen and (max-width: 900px) {
  tr {
    min-width: 600px;
    max-width: 800px;
  }
  td:first-child {
    font-size: 1.2em;
  }
  .btnDeg,
  .btnDeg2,
  .btnDel {
    font-size: .8em;
  }
  td:nth-child(2):before,
  td:nth-child(3):before,
  td:nth-child(4):before {
    font-size: 1em;
  }
}
@media screen and (max-width: 680px) {
  tr {
    min-width: 450px;
    max-width: 600px;
  }
  td:not(:first-child) {
    font-size: 1em;
  }
}
@media screen and (max-width: 480px) {
    tr {
    min-width: 300px;
    max-width: 420px;
  }
}
</style>