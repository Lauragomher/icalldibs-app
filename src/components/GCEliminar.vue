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
          location_city
          </span>                  
          <h1>Eliminar comunidad<br>de vecinos</h1>
        </div>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Comunidad seleccionada</h3>
            <p>ID comunidad: {{this.idComunidad}}</p>
            <p>Nombre: {{this.comunidad.nombre_comunidad}}</p>
            <p>ID admin: {{this.comunidad.id_admin}}</p>
            <p>Provincia: {{this.comunidad.provincia_comunidad}}</p>
            <p>Código postal: {{this.comunidad.codigo_postal_comunidad}}</p>
            <p>Calle: {{this.comunidad.calle_comunidad}}</p>
            <p>Total de vecinos: {{this.comunidad.total_vecinos}}</p>
            <button class="btnDel" v-on:click="borrarCom()">Eliminar comunidad</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gestion-comunidades-eliminar",
  data (){
    return {
      idComunidadNow:"",
      idUsuarioCom:"",
      comunidadSelect:"",
      idComunidad:"",
      id_usuario:"",
      rol_usuario:"",
      id_rol:"",
      comunidad:[],
    }
  },
  methods: {
    async borrarCom() {
      let result = await axios.post (
        `http://localhost/api/?servicio=eliminar_comunidad`, {
          "id_comunidad": this.idComunidad,                     
        });
        const borrarOk = result.data.data.resultado;
          if(borrarOk=="ok"){
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
//////////////////////Obtenemos los datos del usuario para el prefill del formulario//////////////////////
    const dataCom = {
      id_comunidad: this.idComunidad
    };
    axios.post(`http://localhost/api/?servicio=obtener_datos_comunidad`, dataCom)
    .then(response => {
      let datosCom = response.data.data.datos[0];
      this.comunidad = datosCom;
      console.log(response);
      console.log(this.comunidad);
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
  margin-top: 14.4em;
  position: absolute;
  margin-bottom: 4em;
  padding: 20px 40px;
  z-index: 2;
}
.container-bg {
  background: var(--degradado2inv);
  margin-top: 1em;
  padding: 1.4em 7em 22em 7em;
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
  margin-bottom: 20px;
}
.btnDel {
  background: var(--rojo);
  color:black;
  border-radius: 10px;
  font-weight: bold;
  font-size: 28px;
  border: 0 solid;
  margin: 18px 0 20px 0px;
  padding: 10px 30px;
  cursor: pointer;
  z-index: 1;
}
.btnDel:hover {
  color: white;
  background: var(--rojo);
}
@media screen and (max-width: 555px) {
  .container-bg {
    padding: 1.4em 5em 24em 5em;
  }
  h1 {
    font-size: 1.8em;
    text-align: center;
  }
  .container {
    margin-top: 15em;
    padding: 14px 30px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .texto-areas {
    padding: 0;
  }
  .btnDel {
    font-size: 1.4em;
  }
}
</style>