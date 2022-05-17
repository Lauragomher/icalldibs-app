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
          settings_suggest
          </span>                  
          <h1>Editar comunidad</h1>
        </div>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Comunidad seleccionada</h3>
            <p>ID comunidad: {{this.idComunidad}}</p>
            <h3>Datos a modificar</h3>
             <label>ID administrador:</label>
            <input type="text" v-model="this.comunidad.id_admin"/>
            <label>Nombre:</label>
            <input type="text" v-model="this.comunidad.nombre_comunidad"/>
            <label>Provincia:</label>
            <input type="text" v-model="this.comunidad.provincia_comunidad"/>
            <label>Código postal: </label>
            <input type="text" v-model="this.comunidad.codigo_postal_comunidad"/>
            <label>Calle: </label>
            <input type="text" v-model="this.comunidad.calle_comunidad"/>
            <label>Total de vecinos: </label>
            <input type="text" v-model="this.comunidad.total_vecinos"/>
            <button class="btnAsig" v-on:click="editCom()">Modificar datos</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gestion-comunidades-modificar",
  data (){
    return {
      idComunidadNow:"",
      idComunidad:"",
      comunidadSelect:"",
      id_usuario:"",
      nombre: "",
      id_reserva:"",
      id_zona:"",
      comunidad:[],
    }
  },
  methods: {
    async editCom() {
      let result = await axios.post (
        `https://icalldibs.000webhostapp.com/?servicio=modificar_comunidad`, {
          "id_comunidad": this.idComunidad, 
          "nombre_comunidad": this.comunidad.nombre_comunidad,
          "provincia_comunidad": this.comunidad.provincia_comunidad,                
          "codigo_postal_comunidad": this.comunidad.codigo_postal_comunidad,
          "calle_comunidad": this.comunidad.calle_comunidad,
          "total_vecinos": this.comunidad.total_vecinos,
          "id_administrador": this.comunidad.id_admin,                
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
    console.log(usuario);
    console.log(this.id_usuario);
      //le enviamos a la api la id de la comunidad y que la zona esté activa
      //para obtener las zonas comunes disponibles de esa comunidad
//////////////////////Obtenemos los datos de la comunidad//////////////////////
    const dataComunidad = {
      id_comunidad: this.idComunidad
    };
    axios.post(`https://icalldibs.000webhostapp.com/?servicio=obtener_datos_comunidad`, dataComunidad)
    .then(response => {
      let datosComunidad= response.data.data.datos[0];
      this.comunidad = datosComunidad;
      console.log(response);
      console.log(this.comunidad)
    })
    .catch(e => {
      console.log(e);
    });
        /*
        let user = localStorage.getItem("user-info");
        //si el usuario no está registrado vuelve al login
        if (!user) {
            this.$router.push({name:"Login-vecino"})
        }*/
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
  margin-top: 1.2em;
  padding: 2em 7em 40em 7em;
  margin-bottom: 8em;
  border-radius: 30px;
  box-shadow: rgb(0 0 0 / 18%) 0px 3px 8px;
}
.container-title {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin: 18px 0 20px 0px;
    padding: 10px 30px;
    cursor: pointer;
    z-index: 1;
}
.btnAsig:hover {
  color: var(--verde);
}
</style>