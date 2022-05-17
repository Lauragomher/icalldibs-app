<template>
  <div>
    <div class="nav-atras">
      <router-link to="/gestion-usuarios">
        <span class="material-icons" id="backIcon">arrow_circle_left</span>
      </router-link>
    </div>
    <div class="nav-border">
    </div>
    <div class="container-areas">
      <div class="container-bg">
        <div class="container-title">
          <span class="material-icons" id="iconGU">
          manage_accounts
          </span>                  
          <h1>Editar usuario</h1>
        </div>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Usuario seleccionado</h3>
            <p>ID usuario: {{this.idUsuarioCom}}</p>
            <h3>Datos a modificar</h3>
            <label>Nombre:</label>
            <input type="text" v-model="this.user.nombre_usuario"/>
            <label>Apellidos:</label>
            <input type="text" v-model="this.user.apellidos_usuario"/>
            <label>Rol: </label>
            <input type="text" v-model="this.user.rol_usuario"/>
            <button class="btnAsig" v-on:click="editUserCom()">Modificar datos</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gestion-usuarios-modificar",
  data (){
    return {
      idComunidadNow:"",
      idUsuarioCom:"",
      comunidadSelect:"",
      id_usuario:"",
      nombre: "",
      id_reserva:"",
      id_zona:"",
      user:[],
    }
  },
  components: {
  },
  methods: {
    async editUserCom() {
      let result = await axios.post (
        `https://icalldibs.000webhostapp.com/?servicio=modificar_usuario`, {
          "id_usuario": this.idUsuarioCom, 
          "id_administrador": this.id_usuario,
          "nombre_usuario": this.user.nombre_usuario,
          "apellidos_usuario": this.user.apellidos_usuario,
          "rol_usuario": this.user.rol_usuario                      
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
    this.idUsuarioCom = this.$route.params.id;
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
//////////////////////Obtenemos los datos del usuario para el prefill del formulario//////////////////////
    const dataUser = {
      id_usuario: this.idUsuarioCom
    };
    axios.post(`https://icalldibs.000webhostapp.com/?servicio=obtener_datos_usuario`, dataUser)
    .then(response => {
      let datosUser = response.data.data.datos[0];
      this.user = datosUser;
      console.log(response);
      console.log(this.user)
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
  padding: 2em 7em 26em 7em;
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