<template>
  <div>
    <div class="nav-atras">
      <router-link to="/gestion-zonas-comunes">
        <span class="material-icons" id="backIcon">arrow_circle_left</span>
      </router-link>
    </div>
    <div class="nav-border">
    </div>
    <div class="container-areas">
      <div class="container-bg">
        <div class="container-title">
          <span class="material-icons" id="iconGU">
          edit_location_alt
          </span>                  
          <h1>Editar zona común</h1>
        </div>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Zona seleccionada</h3>
            <div class="texto-estatico">
              <p>ID zona: {{this.idZona}}</p>
              <p>ID comunidad: {{this.zonas.id_comunidad}}</p>
            </div>
            <h3>Datos a modificar</h3>
            <label>Nombre:</label>
            <input type="text" v-model="this.zonas.tipo_zona"/>
            <label>Descripción:</label>
            <textarea v-model="this.zonas.descripcion_zona"/>
            <div class="texto-corto">
              <div>
                <label>Disponibilidad: </label>
                <input type="text" v-model="this.zonas.zona_activa"/>
              </div>
              <div>
                <label>Aforo: </label>
                <input type="text" v-model="this.zonas.aforo_zona"/>
              </div>
            </div>
            <h3>Imagen actual</h3>
            <img id="imgActual" :src="this.zonas.imagen_zona">
            <h3>Cambiar imagen</h3>
            <p id="destacar">Subir PNG o SVG menor a 600KB</p>
            <div v-if="!image">
                <input type="file" @change="onFileChange">
              </div>
              <div class="subir-imagen" v-else>
                <img :src="image" />
                <button @click="removeImage">Eliminar imagen</button>
            </div>
            <button class="btnAsig" v-on:click="editZona()">Modificar datos</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gestion-areas-modificar",
  data (){
    return {
      idComunidadNow:"",
      idZona:"",
      comunidadSelect:"",
      id_usuario:"",
      rol_usuario:"",
      id_rol:"",
      nombre: "",
      id_reserva:"",
      id_zona:"",
      zonas:[],
      image:"",
    }
  },
  methods: {
    async editZona() {
      let result = await axios.post (
        `http://localhost/api/?servicio=modificar_zona_comun`, {
          "id_zona": this.idZona,
          "id_comunidad": this.zonas.id_comunidad, 
          "nombre_zona": this.zonas.tipo_zona,
          "zona_descripcion": this.zonas.descripcion_zona,                
          "zona_activa": this.zonas.zona_activa,
          "zona_aforo": this.zonas.aforo_zona,
          "imagen_zona": this.image || this.zonas.imagen_zona        
        });
        const modificarOk = result.data.data.resultado;
          if(modificarOk=="ok"){
            this.$router.push({name:"Success-gestion"})
          }
        console.warn(result);
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
    },
    createImage(file) {
      this.image = new Image();
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.image = "";
    }
  },
  mounted(){
    console.log(this.$route.params.id)
    this.idZona = this.$route.params.id;
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
//////////////////////Obtenemos los datos de la comunidad//////////////////////
    const dataZona = {
      id_zona: this.idZona
    };
    axios.post(`http://localhost/api/?servicio=obtener_datos_zona_reserva`, dataZona)
    .then(response => {
      let datosZona= response.data.data.datos[0];
      this.zonas = datosZona;
      console.log(response);
      console.log(this.zonas);
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
.texto-estatico {
  display: flex;
  justify-content: space-between;
}
.texto-corto {
  display: flex;
  justify-content: space-between;
  margin: 14px 0 10px 0;
}
.texto-corto > div > input {
  width: 46px;
}
#imgActual {
  width: 300px;
  border-radius: 14px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.subir-imagen > img {
  width: 300px;
  border-radius: 14px;
  border: 2px solid var(--rojo);
}
.subir-imagen >  button{
  margin-top: 18px;
  margin-bottom: 10px;
  font-size: 1.1em;
  font-weight: 400;
  border: 0 solid;
  color: white;
  padding: 6px 0;
  border-radius: 8px;
  background-color: var(--rojo);
}
.subir-imagen {
  display: flex;
  flex-flow: column wrap;
}
#destacar {
  color: var(--rojo);
  font-weight: 600;
  font-size: 1em;
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
  padding: 1.4em 7em 58em 7em;
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
  margin-top: 6px;
  font-size: 1.1em;
  border: solid 0px;
  padding: 10px 8px;
  border-radius: 10px;
}
textarea {
  margin-top: 6px;
  font-size: 1.1em;
  border: solid 0px;
  padding: 10px 8px;
  border-radius: 10px;
  max-height: 200px;
  height: 70px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
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
@media screen and (max-width: 555px) {
  .container-bg {
    padding: 1.4em 5em 40em 5em;
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
@media screen and (max-width: 448px) {
  .texto-estatico,
  .texto-corto {
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .texto-estatico p {
    margin-top: 6px;
    font-size: .9em;
  }
  .texto-areas input {
    width: 90%;
  }
  input {
    font-size: 1em;
  }
  .texto-areas textarea {
    width: 88%;
    font-size: 1em;
  }
  .texto-estatico p:first-child {
    margin-right: 20px;
  }
  .texto-corto div:first-child {
    margin-right: 20px;  
  }
  .container {
    width: 89%;
  }
  .btnAsig {
    font-size: 1.2em;
  }
}
@media screen and (max-width: 360px) {
  .container {
    margin-top: 14.4em;
  }
}
</style>