<template>
  <div>
    <Header />
    <div class="container-areas" v-show="this.idComunidadNow">                 
      <h1>Mis reservas</h1>
      <div class="container" id="fichaServicios" v-for="item in reservas" :key="item.id">
        <div class="container-ficha">
          <div class="texto-areas">
            <p id="hidden"><b>Id zona:</b> {{item.id_zona}}</p>
            <h4 id="titleReserva">{{item.nombre_zona}}</h4>
            <p>{{item.descripcion_zona}}</p>
            <h4>Inicio reserva</h4>
            <p>{{item.inicio_reserva}}</p>
            <h4>Fin reserva</h4>
            <p>{{item.fin_reserva}}</p>
            <p id="hidden">Id reserva: {{item.id_reserva}}</p>
          </div>
          <img id=imgAreas :src="item.imagen_zona">
        </div>
       <router-link :to="`/mis-reservas/`+item.id_reserva"><button class="btnDeg"><span class="text">Cancelar</span></button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import axios from "axios";
export default {
  name: "Mis-reservas",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      rol_usuario:"",
      nombre: "",
      id_reserva:"",
      reservas:[],
      id_zona:"",
      servicios: [],
      nombre_area_comun:"",
    }
  },
  components: {
    Header
  },
  mounted(){
    console.log(this.$route.params.id)
    this.id_reserva = this.$route.params.id;
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
////////////////////////////////////////////
    const data = {
      "id_usuario": this.id_usuario
    }
    axios.post(`http://localhost/api/?servicio=obtener_reservas_usuario`, data)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.reservas = datosZona;
      console.log(response);
      //control de acceso por rol de usuario
      if (this.rol_usuario==2) {
        this.$router.push({name:"Geston-zonas-comunes"})
      }
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
  text-align: center;
  margin: 20px 0 0 0;
}
.container {
  background-color: rgb(244, 244, 244);
  margin-top: 2.2em;
  margin-bottom: 2.6em;
  padding-right: 15em;
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
  width: 400px;
}
a {
  text-decoration: none;
}
h4 {
  margin: 0;
  font-size: 1.1em;
}
#titleReserva {
  font-size: 1.4em;
  margin-bottom: 8px;
}
p {
  margin: 10px 0 30px 0;
  width: 82%;
  font-size: 1.2em;
  line-height: 1.4em;
}
.btnDeg {
  align-items: center;
  background-image: var(--degradado1);
  border: 0;
  border-radius: 12px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}
.btnDeg:active,
.btnDeg:hover {
  outline: 0;
}
.btnDeg span {
  background-color: #222;
  padding: 16px 24px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}
.btnDeg:hover span {
  background: none;
  color: black;
}
#hidden {
  display: none;
}
#imgAreas {
  width: 350px;
  height: 290px;
  margin-left: 22em;
  position: absolute;
  margin-bottom: 1.4em;
  border-radius: 34% 7% 7% 7%;
  box-shadow: rgb(117,242,174, 0.4) 5px 5px, 
  rgb(117,242,174, 0.3) 10px 10px, 
  rgb(117,246,247, 0.2) 15px 15px, 
  rgb(117,246,247, 0.1) 20px 20px, 
  rgb(117,246,247, 0.05) 25px 25px;
}
@media screen and (max-width: 760px){
  .container-ficha {
    flex-flow: column wrap;
  }
  .texto-areas {
    max-width: 600px;
    align-content: center;
  }
  p, h4 {
    text-align: center;
  }
  #aforoText {
    text-align: center;
  }
  h1 {
    margin: 14px 0 0 0;
  }
  .container {
    padding: 16px 22px 30px 22px;
  }
  .btnDeg {
    font-size: 24px;
    margin: 10px 0 8px 0;
    font-size: 24px;
    z-index: 3;
  }
  #imgAreas {
    width: 22em;
    height: 18em;
    margin-left: 0;
    position: relative;
    box-shadow: none;
    border-radius: 34% 7% 34% 7%;
    box-shadow: rgba(117,242,174, 0.4) 5px 0px,
     rgba(117,242,174, 0.3) 10px 0px,
      rgb(117,246,247, 0.25) 15px 0px,
     rgb(117,246,247, 0.18) 20px 0px,
      rgb(117,246,247, 0.05) 25px 0px;
  }
}
@media screen and (max-width: 460px) {
    #imgAreas {
    width: 16em;
    height: 12em;
  }
  .container {
    margin-left: 2em;
    margin-right: 2em;
    padding: 12px 10px 20px 10px;
  }
}
</style>