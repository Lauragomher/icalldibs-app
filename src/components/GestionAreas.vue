<template>
  <div>
    <Header2admin />
    <div class="nav-atras">
    </div>
    <div class="container-areas">                
      <h1>Gestión de zonas comunes</h1>
      <router-link :to="`/gestion-zonas-comunes/nueva/`"><button class="btnDeg" id="btnCrear">Nueva zona común</button></router-link>
      <h3>Zonas comunes existentes</h3>
      <div class="container" id="fichaServicios" v-for="item in zonas" :key="item.id">
        <div class="container-ficha">
          <div class="texto-areas">
            <p><b>ID zona común:</b> {{item.id_zona}}</p>
            <p><b>ID comunidad:</b> {{item.id_comunidad}}</p>
            <p><b>Nombre zona común: </b> {{item.tipo_zona}}</p>
            <p><b>Disponibilidad:</b> {{item.zona_activa}}</p>
            <p><b>Descripción:</b> {{item.descripcion_zona}}</p>
            <p><b>Aforo:</b> {{item.aforo_zona}}</p>
          </div>
        <img id=imgAreas :src="item.imagen_zona">
        </div>
       <router-link :to="`/gestion-zonas-comunes/editar/`+item.id_zona"><button class="btnDeg">Modificar datos</button></router-link>
       <router-link :to="`/gestion-zonas-comunes/borrar/`+item.id_zona"><button class="btnDel">Eliminar</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header2admin from "./Header2admin.vue"
import axios from "axios";
export default {
  name: "Gestion-zonas-comunes",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      id_zona:"",
      tipo_zona:"",
      rol_usuario:"",
      id_rol:"",
      nombre: "",
      descripcion: "",
      zonas:[],
    }
  },
  components: {
    Header2admin
  },
  methods : {
  },
  mounted(){
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
///////////////////Obtener comunidades/////////////////////////
    const dataAdmin = {
      "id_administrador": this.id_usuario
    };
    axios.post(`http://localhost/api/?servicio=obtener_zonas_admin`, dataAdmin)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.zonas = datosZona;
      console.log(response);
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
.container-areas {
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  align-content: center;
  margin-top: 40px;
}
h1 {
  text-align: center;
  margin-top: 20px;
}
h3 {
  font-size: 1.8em;
  text-align: center;
  margin: 2em 0 0 0;
}
.container {
  background-color: rgb(244, 244, 244);
  margin-top: 2em;
  margin-bottom: 3em;
}
#imgAreas {
  width: 350px;
  max-height: 400px;
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
  color: black;
}
p {
  font-size: 1.1em;
}
.btnDeg {
  padding: 10px 30px;
}
#btnCrear {
  margin: 0px 0 20px 0;
  padding: .6em 5.6em;
  font-size: 1.3em;
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
}
#hidden {
  display: none;
}
@media screen and (max-width: 890px){
  .container {
    margin: 22px 26px;
    padding: 14px 20px;
  }
  p {
    margin: 10px 0;
    font-size: 1em;
  }
  h3 {
    margin: 2em 0 16px 0;
  }
}
@media screen and (max-width: 760px){
  .container-ficha {
    flex-flow: column wrap;
  }
  .texto-areas {
    max-width: 600px;
    width: 88%;
  }
  .btnDel,
  .btnDeg {
    font-size: 1.4em;
  }
  .btnDeg {
    margin: 8px 0 10px 0;
  }
}
@media screen and (max-width: 490px){
  #btnCrear {
    padding: .6em 1em;
  }
  h1 {
    font-size: 1.8em;
  }
  h3 {
    font-size: 1.6em;
  }
  .text-areas {
    width: 92%;
  }
  .btnDeg {
    font-size: 1.3em;
    margin-top: 0;
    margin-bottom: 0;
  }
  .btnDel {
    font-size: 1.3em;
  }
  #imgAreas {
    width: 250px;
    height: 200px;
    margin: 8px 0 30px 0;
  }
}
</style>