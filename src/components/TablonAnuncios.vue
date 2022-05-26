<template>
  <div>
    <Header />
    <div class="container-areas" v-show="this.idComunidad"  v-for="item in comunidadData" :key="item">                 
      <h1>Tablón de anuncios</h1>
      <h2>{{item.nombre_comunidad}}</h2>
      <!--Para vecinos-->
      <div class="info" v-show="this.id_rol==1||this.rol_usuario==1">
        <p id="intro">Zona de anuncios compartidos de tu comunidad.</p>
        <p id="intro">Crea, visualiza y elimina anuncios con otros miembros aquí.</p>
        <p id="intro">Recuerda que <b>sólo podrás eliminar los anuncios creados por tí</b>.</p>
      </div>
      <!--Para admins-->
      <div class="info" v-show="this.id_rol==2||this.rol_usuario==2">
        <p id="intro">Aquí podrás gestionar los anuncios de la comunidad seleccionada</p>
      </div>
      <router-link :to="`/tablon-anuncios/`+this.idComunidad+`/nuevo`"><button class="btnDeg"><span class="text">Nuevo anuncio</span><span class="material-icons" id="btnIcon">post_add</span></button></router-link>
      <div class="container-sticky">
        <div class="sticky" v-for="item in anuncio" :key="item.id">
          <div class="container-ficha">
            <div class="texto-areas">
              <!--Para vecinos-->
              <div v-show="this.id_rol==1||this.rol_usuario==1">
                <router-link v-show="this.id_usuario == item.id_usuario" :to="`/tablon-anuncios/`+this.idComunidad+`/eliminar/`+item.id_anuncio"><button class="btnX"><span class="text">x</span></button></router-link>
              </div>
              <!--Para admins-->
              <div v-show="this.id_rol==2||this.rol_usuario==2">
                <router-link :to="`/tablon-anuncios/`+this.idComunidad+`/eliminar/`+item.id_anuncio"><button class="btnX"><span class="text">x</span></button></router-link>
              </div>
              <p id="hidden"><b>Id anuncio:</b> {{item.id_anuncio}}</p>
              <p id="hidden"><b>Id usuario:</b> {{item.id_usuario}}</p>
              <p id="hidden"><b>Rol usuario:</b> {{item.rol_usuario}}</p>
              <h4 v-show="item.rol_usuario==2"><span>Anuncio de admin</span></h4>
              <h3 id="titulo">{{item.titulo_anuncio}}</h3>
              <div class="container-int">
              <p id="nombre">De: {{item.nombre_usuario}} {{item.apellidos_usuario}}</p>
              <p id="fecha">En: {{item.fecha_anuncio}}</p>
              </div>
              <p>{{item.mensaje_anuncio}}</p>
            </div>
          </div>
        </div>
       </div> 
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import axios from "axios";
export default {
  name: "Tablon-anuncios",
  data (){
    return {
      idComunidadNow:"",
      idComunidad:"",
      id_usuario:"",
      nombre: "",
      id_reserva:"",
      rol_usuario: "",
      id_rol:"",
      anuncio:[],
      id_anuncio:"",
      comunidadData: [],
    }
  },
  components: {
    Header
  },
  mounted(){
    console.log(this.$route.params.com)
    this.idComunidad = this.$route.params.com;
        /////mostrar datos usuario
    let usuario = localStorage.getItem("user-info");
    //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    //rol en vecinos
    this.rol_usuario = JSON.parse(usuario).rol_usuario;
    //rol en admins
    this.id_rol = JSON.parse(usuario).id_rol;
    console.log(usuario);
    console.log(this.id_usuario);
    //le enviamos a la api la id de la comunidad y que la zona esté activa
    //para obtener las zonas comunes disponibles de esa comunidad
////////////////////////////////////////////
    const data = {
      "id_comunidad": this.idComunidad
    }
    axios.post(`http://localhost/api/?servicio=obtener_anuncios_comunidad`, data)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.anuncio = datosZona;
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
    
   /////////////////Obtener datos comunidad///////////////////////////
    const dataCom = {
      "id_comunidad": this.idComunidad
    }
    axios.post(`http://localhost/api/?servicio=obtener_datos_comunidad`, dataCom)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.comunidadData = datosZona;
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
  }
}
</script>

<style scoped>
#btnIcon {
  color: black;
  font-size: 2.4em;
  margin: 0 0 0 10px;
  background-image: none;
  padding: 0;
}
h2 {
  background-color: black;
  font-size: 1.6em;
  margin: 0 0 20px 0;
  padding: 2px 10px;
}
.info {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  margin: 14px 0 36px 0;
}
#intro {
  text-align: center;
  margin: 0 0 10px 0 ;
}
.container-areas {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  align-items: center;
  margin-top: 40px;
}
.container-int {
  display: flex;
  justify-content: center;
}
.container-int p{
  width: 100%;
  font-size: 1.1em;
  margin: 8px 0 0 0;
}
#fecha {
  padding-right: 0;
}
.container-sticky {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  border: solid 0px black;
  padding: 1em 3em;
}
h1 {
  text-align: center;
  margin: 20px 0 26px 0;
}
.sticky {
  margin: 2em;
  padding: 1em;
  background: linear-gradient(45deg, rgb(244, 244, 244), var(--azul),
   rgb(244, 244, 244), rgb(244, 244, 244));
  width: 25.4em;
  min-height: 23em;
  border-radius: 0;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  color: black;
}
div.sticky::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #309dab;
  position: absolute;
  bottom: 8px;
  right: 0;
  -moz-transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  -webkit-transform: rotate(330deg);
  transform: rotate(330deg);
  box-shadow: 0 13px 0 3px white;
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
  margin-top: -8px;
  width: 400px;
}
a {
  text-decoration: none;
}
h4 {
  padding-left: 8px;
  font-size: 1.2em;
  color: white;
  margin: -22px 0 16px 0;
}
h4 span {
  background: #309dab;
  padding: 4px 8px;
}

p {
  margin: 10px 0 30px 0;
  width: 82%;
  padding: 0 .3em;
  font-size: 1.2em;
  line-height: 1.4em;
}
.btnDeg {
  display: flex;
  padding: 10px 22px 10px 26px;
  flex-flow: wrap;
  justify-content: center;
}
.text {
  padding-top: 16px;
}
#titulo {
  margin-top: 0px;
  font-weight: bold;
  padding-left: 8px;
  font-size: 1.4em;
  max-width: 92%;
  margin-bottom: 14px;
}
.btnX {
  align-items: center;
  background: rgb(244, 244, 244);
  border: 0;
  border-radius: 0;
  top: -18px;
  left: 26.5em;
  position: relative;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}
.btnX span {
  font-size: 2.6em;
  font-weight: bold;
  color: #309dab;
}
.btnX span:hover {
  color: var(--rojo);
}

#hidden {
  display: none;
}
@media screen and (max-width: 1050px) {
  .container-sticky {
    flex-direction: column;
  }

}
@media screen and (max-width: 760px){
  .container-ficha {
    flex-flow: column wrap;
  }
  .texto-areas {
    max-width: 600px;
    align-content: center;
  }
  h1 {
    margin: 14px 0 24px 0;
  }
  #titulo {
    padding-right: 20px;
  }
  .btnDeg {
    margin-bottom: 0;
  }
  .btnX {
    margin-top: 2px;
    left: 26.3em;
  }
}
@media screen and (max-width: 460px) {
    .sticky {
    max-width: 20em;
    min-height: 18em;
  }
  .btnX {
    left: 18em;
  }
  .texto-areas {
    width: 250px;
  }
}
</style>