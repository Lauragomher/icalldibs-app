<template>
  <div>
    <Header2admin />
    <div class="nav-atras">
    </div>
    <div class="container-areas">                
      <h1>Gestión de comunidades</h1>
      <router-link :to="`/gestion-comunidades/nueva/`"><button class="boton" id="btnCrear">Crear nueva comunidad</button></router-link>
      <h3>Comunidades existentes</h3>
      <div class="comunidades">
        <table class="tabla-comunidades">
          <thead>
            <tr>
              <th>Comunidad</th>
              <th>ID</th>
              <th>Administrador</th>
              <th>ID</th>
           </tr>
          </thead>
          <tbody>
            <tr v-for="item in comunidades" :key="item.id">
              <td>{{item.nombre_comunidad}}</td>
              <td>{{item.id_comunidad}}</td>
              <td>{{item.nombre_administrador}}</td>
              <td>{{item.id_administrador}}</td>
              <td><router-link :to="`/gestion-comunidades/editar/`+item.id_comunidad"><button class="btnDeg">Modificar datos</button></router-link></td>
              <td><router-link :to="`/gestion-comunidades/borrar/`+item.id_comunidad"><button class="btnDel">Eliminar</button></router-link></td>
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
  name: "Gestion-comunidades",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      id_zona:"",
      tipo_zona:"",
      rol_usuario:"",
      id_rol:"",
      nombre: "",
      descripcion: "",
      comunidades:[],
    }
  },
  components: {
    Header2admin
  },
  mounted(){
    /////mostrar datos usuario
    let usuario = localStorage.getItem("user-info");
      //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    this.rol_usuario = JSON.parse(usuario).rol_usuario;
    //usuarios sin comunidad
    this.id_rol = JSON.parse(usuario).id_rol;
    console.log(usuario);
    console.log(this.id_usuario);
///////////////////Obtener comunidades/////////////////////////
    const dataAdmin = {
            "id_administrador": this.id_usuario
    };
    axios.post(`http://localhost/api/?servicio=obtener_comunidades_de_admin`, dataAdmin)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.comunidades = datosZona;
      console.log(response);
      //control de acceso por rol de usuario
      if (this.rol_usuario==1||this.id_rol==1) {
        this.$router.push({name:"Areas-comunes"})
      }
      console.log(this.rol_usuario);
    })
    .catch(e => {
      console.log(e);
    });
  }
}
</script>

<style scoped>
.container-areas {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  margin-top: 40px;
}
h1 {
  margin: 8px 0 8px 0;
  text-align: center;
}
h3 {
  margin-top: 1.8em;
  font-size: 1.5em;
  text-align: center;
}
.container {
  background-color: rgb(244, 244, 244);
  margin-top: 3.8em;
  margin-bottom: 3em;
}
.material-icons{
  font-size: 4.4em;
  color: white;
  background-image: var(--degradado1);
  border-radius: 50%;
  padding: 20px;
}
.container-ficha {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.texto-areas {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  padding: 3% 0%;
  width: 74%;
}
a {
  text-decoration: none;
  color: black;
  text-align: center;
}
p {
  font-size: 1.1em;
}
.btnDeg {
  padding: 8px 18px;
  font-size: 1.1em;
}
#btnCrear {
  margin: 10px 0 20px 0;
  padding: .6em 5.6em;
  font-size: 1.3em;
}
.btnDel {
  background: var(--rojo);
  color:black;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.1em;
  border: 0 solid;
  margin: 10px 0 20px 0px;
  padding: 8px 18px;
  cursor: pointer;
  z-index: 1;
}
.btnDel:hover {
  color: white;
}
.container-areas > button {
  font-size: 1.5em;
}
#hidden {
  display: none;
}
.tabla-comunidades {
  border-collapse: collapse;
  margin: .6em 0 3em 0;
  font-size: 1.2em;
  min-width: 140px;
  border: 0 solid transparent;
  border-radius: 14px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.tabla-comunidades thead tr {
  background: var(--degradado1);
  color: black;
  border-radius: 12px;
}
.tabla-comunidades th,
.tabla-comunidades td {
  padding: 12px 15px;
  text-align: center;
}
.tabla-comunidades tbody tr {
  border-bottom: thin solid #dddddd;
}

.tabla-comunidades tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.tabla-comunidades tbody tr:last-of-type {
  border-bottom: 2px solid var(--verde);
}
.boton {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  font-size: 1.6em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.boton:before {
  content: "";
  background: linear-gradient(
    45deg,
    var(--amarillo),
    var(--verde),
    var(--azul),
    var(--morado),
    var(--rojo)
  );
  position: absolute;
  top: -4px;
  left: -4px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  animation: glowing-button 36s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px;
}
@keyframes glowing-button {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.boton:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
@media screen and (max-width: 1100px) {
  table, tr, td {
    display: block;
  }
  th, thead {
    display: none;
  }
  .tabla-comunidades {
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
    content: "     ";
    font-size: 1em;
  }
  td:nth-child(2):before {
    content: "ID: ";
  }
  .btnDeg {
    margin: 4px 0 0 0;
  }
 .btnDel {
    margin: 0 0 18px 0;
  }
  td:nth-child(3):before {
    content: "Admin: ";
  }
  td:nth-child(4):before {
    content: "ID Admin: ";
  }
  td:first-child {
    background: var(--degradado1);
    font-size: 1.3em;
    font-weight: 600;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
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
  }
  .comunidades {
    border: none;
    box-shadow: none;
    overflow: visible;
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
  .btnDeg {
    font-size: .9em;
  }
  .btnDel {
    font-size: .9em;
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
  #btnCrear {
    font-size: 1.2em;
    margin: 10px 1em 20px 1em;
    padding: .6em 1.4em;
  }
}
@media screen and (max-width: 480px) {
  tr {
    min-width: 300px;
    max-width: 420px;
  }
  h1 {
    font-size: 1.6em;
  }
  h3 {
    font-size: 1.2em;
  }
  td:first-child {
    font-size: .9em;
  }
  td:not(:first-child) {
    font-size: .9em;
    margin-top: .2em;
  }
  #btnCrear {
    margin: 10px 2em 20px 2em;
    padding: .6em .8em;
  }
}
</style>