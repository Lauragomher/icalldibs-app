<template>
  <div>
    <div class="nav-atras">
      <router-link to="/mis-reservas">
        <span class="material-icons" id="backIcon">arrow_circle_left</span>
      </router-link>
    </div>
    <div class="nav-border">
    </div>
    <div class="container-areas">
      <div class="container-title">                  
        <h1>Estás a punto de cancelar tu reserva</h1>
        <span class="material-icons">
        event_busy
        </span>
      </div>
      <h3>Recuerda que una vez que la canceles si quieres volver a realizarla tendrás que hacerlo desde zonas comunes</h3>
      <div class="container" id="fichaServicios" v-for="item in reserva" :key="item.id">
        <div class="container-ficha">
          <div class="texto-areas">
            <p><b>Zona reservada:</b> {{item.nombre_zona}}</p>
            <p><b>Descripcion:</b> {{item.descripcion_zona}}</p>
            <p id="hidden"><b>ID reserva:</b> {{item.id_reserva}}</p>
            <p><b>Inicio reserva:</b> {{item.inicio_reserva}}</p>
             <p id="hidden">ID zona: {{item.id_zona}}</p>
            <p><b>Fin reserva:</b> {{item.fin_reserva}}</p>
          </div>
        <span class="material-icons">event</span>
        </div>
       <router-link :to="`/mis-reservas/`+item.id_reserva"><button class="btnCancel" v-on:click="eliminarReserva()">Cancelar</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Mis-reservas-cancel",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      nombre: "",
      id_reserva:"",
      id_zona:"",
      reserva:[],
      zona:[],
    }
  },
  components: {
  },
  methods: {
    async eliminarReserva() {
      let result = await axios.post (
        `http://localhost/api/?servicio=eliminar_reserva`, {
          "id_reserva": this.id_reserva            
        });
        const eliminarOk = result.data.data.resultado;
          if(eliminarOk=="ok"){
            this.$router.push({name:"Success-borrar-reserva"})
          }
          console.warn(result);
    }
  },
  mounted(){
    console.log(this.$route.params.id)
    this.id_reserva = this.$route.params.id;
    /////mostrar datos usuario
    let usuario = localStorage.getItem("user-info");
    //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    console.log(usuario);
    console.log(this.id_usuario);
    //le enviamos a la api la id de la reserva
////////////////////////////////////////////
    const data = {
      "id_reserva": this.id_reserva
    }
    axios.post(`http://localhost/api/?servicio=obtener_reserva_especifica`, data)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.reserva = datosZona;
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
       ////////////////////Obtener datos de la zona
    const dataZona = {
      "id_zona": this.id_zona
    }
    axios.post(`http://localhost/api/?servicio=obtener_datos_zona_reserva`, dataZona)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.zona = datosZona;
      this.nombre_zona = JSON.parse(this.zona).tipo_zona;
      console.log(this.nombre_zona)
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
#backIcon {
  color: black;
  font-size: 3.4em;
  padding-left: .6em;
  padding-top: 6px;
  background: none;
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
  align-content: center;
  margin-top: 40px;
}
.container-title {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.container-title > .material-icons {
  background: none;
  color: black;
}
h1 {
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
}
p {
  font-size: 1.1em;
}
.btnCancel {
  background-color: var(--rojo);
  color:black;
  border-radius: 10px;
  font-weight: bold;
  font-size: 28px;
  border: 0 solid;
  margin: 10px 0 20px 0px;
  padding: 10px 30px;
  cursor: pointer;
  z-index: 1;
}
.btnCancel:hover {
  color: #fff;
}
#hidden {
  display: none;
}
</style>