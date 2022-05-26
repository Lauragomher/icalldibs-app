<template>
  <div>
    <div class="nav-atras">
      <router-link :to="`/tablon-anuncios/`+this.idComunidad">
        <span class="material-icons" id="backIcon">arrow_circle_left</span>
      </router-link>
    </div>
    <div class="nav-border">
    </div>
    <div class="container-areas">
      <div class="container-title">                
        <h1>Eliminar anuncio</h1>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Anuncio seleccionado</h3>
            <p id="hidden">ID anuncio: {{this.idAnuncio}}</p>
            <p id="hidden">ID user: {{this.anuncio.id_usuario}}</p>
            <div class="container-int">
              <p>Autor/a: {{this.anuncio.nombre_usuario}} {{this.anuncio.apellidos_usuario}}</p>
              <p>Fecha de publicación: {{this.anuncio.fecha_anuncio}}</p>
            </div>
            <p>Título: {{this.anuncio.titulo_anuncio}}</p>
            <p id="mensaje">Mensaje:</p>
            <p>{{this.anuncio.mensaje_anuncio}}</p>
            <button class="btnDel" v-on:click="borrarAd()">Borrar anuncio</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tablon-anuncios-eliminar",
  data (){
    return {
      idComunidadNow:"",
      idComunidad:"",
      idUsuarioCom:"",
      idAnuncio:"",
      id_usuario:"",
      anuncio:[],
      usersCoinciden:"",
    }
  },
  methods: {
    async borrarAd() {
      let result = await axios.post (
        `http://localhost/api/?servicio=eliminar_anuncio`, {
          "id_anuncio": this.idAnuncio,                     
        });
        const borrarOk = result.data.data.resultado;
        console.log(borrarOk);
          if(borrarOk=="ok"){
            this.$router.push({name:"Tablon-anuncios"})
          }
          console.warn(result);
    }
  },
  mounted(){
    //obtener id de anuncio
    console.log(this.$route.params.id)
    //obtener id de comunidad
    console.log(this.$route.params.com)
    this.idAnuncio = this.$route.params.id;
    this.idComunidad = this.$route.params.com;
    console.log(this.idAnuncio)
    /////mostrar datos usuario
    let usuario = localStorage.getItem("user-info");
    //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    this.rol_usuario = JSON.parse(usuario).rol_usuario;
    console.log(usuario);
    console.log(this.id_usuario);
//////////////////////Obtenemos los datos del usuario para el prefill del formulario//////////////////////
    const dataAds = {
      id_anuncio: this.idAnuncio
    };
    axios.post(`http://localhost/api/?servicio=obtener_datos_anuncio`, dataAds)
    .then(response => {
      let datosAd = response.data.data.datos[0];
      this.anuncio = datosAd;
      console.log(response);
      console.log(this.anuncio)
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
  margin-top: 20px;
  margin-bottom: 10px; 
}
#hidden {
  display: none;
}
.container {
  background-color: rgb(244, 244, 244);
  margin-bottom: 4em;
  padding: 20px 40px;
  z-index: 2;
}
.container-alert {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  background-color: var(--rojo);
  margin-top: 1.4em;
  margin-bottom: 4em;
  padding: 40px 50px;
  border-radius: 12px;
  z-index: 2;
}
.container-alert p{
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
}
#warningIcon {
  color: var(--rojo);
  background: black;
  border-radius: 50%;
  padding: 8px 20px 20px 20px;
  font-size: 4.2em;
  margin-bottom: .2em;
}
#warningIcon:hover {
  background: var(--amarillo);
}
.container-bg {
  background: var(--degradado2inv);
  margin-top: 1.2em;
  padding: 2em 7em 22em 7em;
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
.container-int {
  display: flex;
  flex-flow: row wrap;
  gap: 2em;
}
.texto-areas {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  padding: 3% 0%;
}
#mensaje {
  margin-top: 20px;
  font-weight: 600;
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
  margin-top: 0;
  text-align: center;
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
@media screen and (max-width: 650px) {
  .container-int {
    gap: 1px;
    flex-flow: column wrap;
  }
  .texto-areas p {
    margin-top: 20px;
  }
}
</style>