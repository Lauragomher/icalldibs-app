<template>
  <div>
    <div class="nav-atras">
      <router-link to="/gestion-comunidades">
        <span class="material-icons" id="backIcon">arrow_circle_left</span>
      </router-link>
    </div>
    <div class="nav-border">
    </div>
    <div class="container-areas">
      <div class="container-bg">
        <div class="container-title">
          <span class="material-icons" id="iconGU">
          add_home_work
          </span>                  
          <h1>Nueva comunidad</h1>
        </div>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Datos de la comunidad</h3>
            <div class="container-int">
              <div class="container-int2" id="column1">
                <label>ID administrador:</label>
                <select v-model="id_admin">
                  <option v-for="item in admin" :key="item.id">{{item.id_usuario}}</option>
                </select>
              </div>
              <div class="container-int2" id="column2">
                <label>Nombre de la comunidad:</label>
                <input type="text" v-model="this.nombre_comunidad"/>
              </div>
            </div>
            <label>Provincia:</label>
            <input type="text" v-model="this.provincia_comunidad"/>
            <div class="container-intb">
              <div class="container-int2" id="column1">
                <label>Código postal:</label>
                <input type="text" v-model="this.codigo_postal"/>
              </div>
              <div class="container-int2" id="column2">
                <label>Calle:</label>
                <input type="text" v-model="this.calle_comunidad"/>
              </div>
            </div>
            <label>Total vecinos:</label>
            <input type="text" v-model="this.total_vecinos"/>
            <button class="btnAsig" v-on:click="newCom()">Crear comunidad</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gestion-comunidades-crear",
  data (){
    return {
      idComunidadNow:"",
      idComunidad:"",
      id_usuario:"",
      id_admin:"",
      id_rol:"",
      rol_usuario:"",
      nombre: "",
      id_reserva:"",
      id_zona:"",
      admin:[],
    }
  },
  methods: {
    async newCom() {
      let result = await axios.post (
        `http://localhost/api/?servicio=alta_comunidad`, {
          "id": null, 
          "nombre_comunidad": this.nombre_comunidad,
          "provincia_comunidad": this.provincia_comunidad,                
          "codigo_postal": this.codigo_postal,
          "calle_comunidad": this.calle_comunidad,
          "total_vecinos": this.total_vecinos,
          "id_administrador": this.id_admin,                
        });
        const asignarOk = result.data.data.resultado;
          if(asignarOk=="ok"){
            this.$router.push({name:"Success-gestion"})
          }
        console.warn(result);
    }
  },
  mounted(){
    console.log(this.$route.params.id)
    this.idComunidad = this.$route.params.id;
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
        //le enviamos a la api la id de la comunidad y que la zona esté activa
        //para obtener las zonas comunes disponibles de esa comunidad
//////////////////////Obtenemos los administradores/////////////////////
    axios.get(`http://localhost/api/?servicio=obtener_administradores`)
    .then(response => {
      let datosAdmin= response.data.data.datos;
      this.admin = datosAdmin;
      console.log(response);
      console.log(this.admin);
      //control de acceso por rol de usuario
      if (this.rol_usuario==1||this.id_rol==1) {
        this.$router.push({name:"Areas-comunes"})
      }
    })
    .catch(e => {
      console.log(e);
    });
  }
}
</script>

<style scoped>
#backIcon {
  color: black;
  font-size: 3.4em;
  padding-left: .6em;
  padding-top: 6px;
}
#backIcon:hover {
  color: var(--morado);
}
.nav-atras {
  padding: 8px 0;
  background-color: #F2F2F2;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
}
.nav-border {
  background-color: var(--verde);
  padding: 3px;
  animation: gradientAnim 14s ease infinite alternate;
}
@keyframes gradientAnim {
  10% {
    background-color: var(--azul);
  }
  40% {
    background-color: var(--verde);
  }
  70% {
    background-color: var(--amarillo);
  }
  100% {
    background-color: var(--morado);
  }
}
.container-areas {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  align-content: center;
  margin-top: 26px;
}
h1 {
  margin-top: 6px;  
}
.container {
  background-color: rgb(244, 244, 244);
  margin-top: 12em;
  position: absolute;
  margin-bottom: 4em;
  padding: 20px 40px;
  z-index: 2;
}
.container-bg {
  background: var(--degradado2inv);
  margin-top: 1em;
  padding: 1.4em 9.6em 30em 9.6em;
  margin-bottom: 8em;
  border-radius: 30px;
  box-shadow: rgb(0 0 0 / 18%) 0px 3px 8px;
}
.container-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container-int {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, [col] 90px ) ;
}
.container-intb {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, [col] 80px) ;
}
#column1 {
  grid-column: col / span  2;
  grid-row: row ;
}
#column2 {
  grid-column: col3 / span  3;
  grid-row: row ;
}
.container-int2 {
  display: flex;
  flex-flow: wrap column;
}
.material-icons{
  font-size: 4.4em;
  color: black;
  border-radius: 50%;
  padding: 0px;
}
#iconGU {
  background: var(--degradado1);
  box-shadow: rgb(0 0 0 / 18%) 0px 3px 8px;
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
}
input {
  font-size: 1.1em;
  border: solid 0px;
  padding: 10px 8px;
  border-radius: 10px;
}
select {
  font-size: 1.1em;
  border: solid 0px;
  margin-bottom: 15px;
  padding: 10px 8px;
  border-radius: 10px;
}
label {
  margin-top: 16px;
}
a {
  text-decoration: none;
}
p {
  font-size: 1.1em;
}
.texto-areas > p {
  margin-top: 0;
}
h3 {
  margin-bottom: 10px;
}
.btnAsig {
  background-color: var(--morado);
  color:white;
  border-radius: 10px;
  font-weight: bold;
  font-size: 28px;
  border: 0 solid;
  margin: 38px 0 20px 0px;
  padding: 10px 30px;
  cursor: pointer;
  z-index: 1;
}
.btnAsig:hover {
  color: var(--verde);
}
@media screen and (max-width: 650px) {
  .container-bg {
    padding: 1.4em 9.6em 40em 9.6em;
  }
  h1 {
    font-size: 1.8em;
    text-align: center;
  }
  .container {
    margin-top: 12.4em;
    padding: 14px 30px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .texto-areas {
    padding: 0;
  }
  .btnAsig {
    font-size: 1.4em;
  }
}
@media screen and (max-width: 560px) {
  .container-int,
  .container-intb {
    display: flex;
    flex-flow: column wrap;
    grid-gap: 0;
  }
  .container-bg {
    padding: 1.4em 6em 38em 6em;
  }
}
</style>