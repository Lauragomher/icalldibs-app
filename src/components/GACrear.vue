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
          add_location_alt
          </span>                  
          <h1>Nueva zona común</h1>
        </div>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <h3>Datos de la zona común</h3>
            <div class="container-int">
              <div class="container-int2" id="column1">
                <label>ID comunidad:</label>
                <select v-model="id_comunidad">
                  <option v-for="item in comunidad" :key="item.id">{{item.id_comunidad}}</option>
                </select>
              </div>
              <div class="container-int2" id="column2">
                <label>Nombre:</label>
                <input type="text" v-model="this.tipo"/>
              </div>
            </div>
            <label>Descripción:</label>
            <textarea v-model="this.descripcion"/>
            <div id="imgZona">
              <div v-if="!image">
                  <h3>Seleccionar imagen</h3>
                  <input type="file" @change="onFileChange">
              </div>
              <div id="imgSubida" v-else>
                  <img :src="image" />
                  <button @click="removeImage">Eliminar imagen</button>
              </div>
            </div> 
            <div class="container-intb">
              <div class="container-int2" id="column1">
                <label>Disponibilidad:</label>
                <select v-model="this.activa">
                  <option>0</option>
                  <option>1</option>
                </select>  
              </div>
              <div class="container-int2" id="column2">
                <label>Aforo:</label>
                <input type="text" v-model="this.aforo"/>
              </div>
            </div>
            <button class="btnAsig" v-on:click="newZona()">Crear zona común</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Gestion-areas-crear",
  data (){
    return {
      idComunidadNow:"",
      idZona:"",
      id_usuario:"",
      id_admin:"",
      nombre: "",
      id_zona:"",
      comunidad:[],
      image:"",
    }
  },
  components: {
  },
  methods: {
    async newZona() {
    let result = await axios.post (
      `http://localhost/api/?servicio=alta_zona_comun`, {
        "id": null, 
        "id_comunidad": this.id_comunidad,
        "tipo": this.tipo,
        "activa": this.activa,
        "descripcion": this.descripcion,
        "aforo": this.aforo,
        "imagen": this.image,                
    });
    const asignarOk = result.data.data.resultado;
      if(asignarOk=="ok"){
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
      this.image = '';
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
    console.log(usuario);
    console.log(this.id_usuario);
        //le enviamos a la api la id de la comunidad y que la zona esté activa
        //para obtener las zonas comunes disponibles de esa comunidad
//////////////////////Obtenemos los administradores/////////////////////
    axios.get(`http://localhost/api/?servicio=obtener_comunidades`)
    .then(response => {
      let datosCom= response.data.data.datos;
      this.comunidad = datosCom;
      console.log(response);
      console.log(this.comunidad)
    })
    .catch(e => {
      console.log(e);
    });
  }
}
</script>

<style scoped>
img {
  width: 280px;
  margin-bottom: 10px;
  border-radius: 14px;
  border: 0 solid;
}
#imgZona {
  margin-top: 16px;
  display: flex;
  flex-flow: column wrap;
}
#imgSubida {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
}
#imgSubida > img {
  margin: 14px 0;
}
#imgSubida > button {
  font-size: 1em;
  border-radius: 6px;
  padding: 6px 0;
  border: 0 solid;
  background-color: var(--rojo);
  color: white;
}
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
  margin-bottom: 3em;
  padding: 20px 40px;
  position: absolute;
  z-index: 2;
}
.container-bg {
  background: var(--degradado2inv);
  margin-top: 1.2em;
  padding: 2em 9em 37em 9em;
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
  margin: 38px 0 20px 0px;
  padding: 10px 30px;
  cursor: pointer;
  z-index: 1;
}
.btnAsig:hover {
  color: var(--verde);
}
</style>