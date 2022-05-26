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
        <h1>Nuevo anuncio</h1>
      </div>
      <div class="container">
        <div class="container-ficha">
          <div class="texto-areas">
            <div class="container-int">
              <div id="column1">
                <label>Nombre de usuario:</label>
                <p>{{this.nombre_usuario}} {{this.apellidos_usuario}}</p>
              </div>
              <div id="column2">
                <label>Fecha de publicación:</label>
                <div v-show="this.id_rol==1||this.rol_usuario==1">
                  <p v-show="date">{{date}}</p>
                </div>
                <div v-show="this.id_rol==2||this.rol_usuario==2">
                  <input type="date" v-model="this.date_admin"/>
                </div>
              </div>
            </div>
            <label>Título:</label>
            <input type="text" v-model="this.titulo_anuncio"/>
            <label>Mensaje:</label>
            <textarea type="text" v-model="this.mensaje_anuncio"/>
            <button class="btnAsig" v-on:click="newAnuncio()">Publicar anuncio</button>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Tablon-anuncios-crear",
  data (){
    return {
      idComunidadNow:"",
      idComunidad:"",
      id_usuario:"",
      id_rol:"",
      rol_usuario:"",
      nombre_usuario:"",
      apellidos_usuario:"",
      id_admin:"",
      nombre: "",
      id_reserva:"",
      date_admin:"",
      id_zona:"",
      admin:[],
      date: "",
      date2: "",
    }
  },
  methods: {
    async newAnuncio() {
      // Para vecinos - Los vecinos no pueden seleccionar la fecha
      if(this.id_rol==1||this.rol_usuario==1){
        let result = await axios.post (
          `http://localhost/api/?servicio=alta_mensaje_tablon`, {
            "id_usuario": this.id_usuario,                
            "id_comunidad": this.idComunidad,
            "titulo": this.titulo_anuncio,
            "mensaje": this.mensaje_anuncio,
            "fecha_publicacion": this.date,              
          });
          const asignarOk = result.data.data.resultado;
            if(asignarOk=="ok"){
              this.$router.push({name:"Tablon-anuncios"})
            }
          console.warn(result); 
      }
      //Si el usuario es admin - Los administradores pueden usar la fecha que deseen
      if(this.id_rol==2||this.rol_usuario==2){
          let result = await axios.post (
            `http://localhost/api/?servicio=alta_mensaje_tablon`, {
              "id_usuario": this.id_usuario,                
              "id_comunidad": this.idComunidad,
              "titulo": this.titulo_anuncio,
              "mensaje": this.mensaje_anuncio,
              "fecha_publicacion": this.date_admin,              
            });
            const asignarOk = result.data.data.resultado;
              if(asignarOk=="ok"){
                this.$router.push({name:"Tablon-anuncios"})
              }
            console.warn(result); 
        }
    },
    getDate: function () {
      return new Date().toLocaleDateString('en-CA',{ year: 'numeric', month: '2-digit', day: '2-digit' });
    },

  },
  mounted(){
    console.log(this.$route.params.com)
    this.idComunidad = this.$route.params.com;
    /////mostrar datos usuario
    let usuario = localStorage.getItem("user-info");
    //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    this.rol_usuario = JSON.parse(usuario).rol_usuario;
    this.id_rol = JSON.parse(usuario).rol_usuario;
    this.nombre_usuario = JSON.parse(usuario).nombre_usuario;
    this.apellidos_usuario = JSON.parse(usuario).apellidos_usuario;
    console.log(usuario);
    console.log(this.id_usuario);
    //obtener fecha actual
    this.date = this.getDate();
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
  margin-bottom: 0; 
}
.container {
  background-color: rgb(244, 244, 244);
  margin-bottom: 4em;
  padding: 20px 40px;
  z-index: 2;
}
.container-bg {
  background: var(--degradado2inv);
  margin-top: 1.2em;
  padding: 2em 9.6em 30em 9.6em;
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
  grid-gap: 2em;
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
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
input #nombreAdmin {
  width: 20px;
}
textarea {
  font-size: 1.1em;
  border: solid 0px;
  padding: 10px 8px;
  min-height: 160px;
  max-height: 300px;
  border-radius: 10px;
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