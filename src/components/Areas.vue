<template>
  <div>
    <Header />
    <div class="container-areas" v-show="this.idComunidadNow">                  
      <h1>Áreas comunes disponibles</h1>
      <div class="container" id="fichaServicios" v-for="item in servicios" :key="item.id">
        <div class="container-ficha">
          <div class="texto-areas">
            <h4>Nombre</h4>
            <p>{{item.tipo_zona}}</p>
            <p id="hidden"><b>ID:</b> {{item.id_zona}}</p>
            <h4>Descripción</h4>
            <p>{{item.descripcion_zona}}</p>
            <p id="aforoText">Aforo máximo de {{item.aforo_zona}}</p>
          </div>
          <img id=imgAreas :src="item.imagen_zona">
        </div>
        <router-link :to="`/reserva/`+item.id_zona"><button class="btnDeg">Reservar</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import axios from "axios";
export default {
  name: "Areas-comunes",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      id_zona:"",
      tipo_zona:"",
      nombre: "",
      descripcion: "",
      aforo:"",
      servicios:[],
    }
  },
  components: {
    Header
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
    //le enviamos a la api la id de la comunidad y que la zona esté activa
    //para obtener las zonas comunes disponibles de esa comunidad
    const datos = {
      id_comunidad: this.idComunidadNow,
      zona_activa: 1,
    };
//////////////////////Obtenemos zonas del usuario//////////////////////
      axios.post(`http://localhost/api/?servicio=obtener_zonas_usuario`, datos)
      .then(response => {
        let datosZona = response.data.data.datos;
        this.servicios = datosZona;
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
  align-content: center;
  margin-top: 40px;
}
h1 {
  text-align: center;
}
h4 {
  margin: 0;
  font-size: 1.1em;
}
p {
  margin: 10px 0 30px 0;
  width: 82%;
  font-size: 1.2em;
  line-height: 1.4em;
}
.container {
  background-color: rgb(244, 244, 244);
  margin-top: 3.8em;
  padding-top: 2.8em;
  margin-bottom: 3em;
}
#imgAreas {
  width: 350px;
  height: 290px;
  margin-left: 1em;
  margin-bottom: 1.4em;
  border-radius: 16px;
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
  padding: 3% 0% 3% 3%;
  width: 74%;
  max-width: 360px;
}
a {
  text-decoration: none;
}
#aforoText {
  background-color: white;
  text-align: center;
  color: grey;
  font-size: 1em;
  padding: 4px 0;
  width: 240px;
  font-weight: 600;
  margin: 0;
}
.btnDeg {
  margin-top: .9em;
  padding: 10px 30px;
}
#hidden {
  display: none;
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
    padding: 6px 0 30px 0;
  }
  .btnDeg {
    margin: 4px 0 0 0;
    z-index: 3;
  }
  #imgAreas {
    width: 22em;
    height: 18em;
  }
}
@media screen and (max-width: 460px) {
    #imgAreas {
    width: 16em;
    height: 12em;
  }
}
</style>