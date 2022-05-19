<template>
  <div>
    <Header />
    <div class="titulares">
      <h1>Perfil de usuario</h1>
      <div class="datos-usuario">
        <h3>Nombre: {{this.nombre}}</h3>
        <h3>Apellidos: {{this.apellidos}}</h3>
        <div v-for="item in comunidadData" :key="item">
          <h4>{{this.comunidad}}</h4>
          <p>{{item.provincia_comunidad}}</p>
          <p>{{item.codigo_postal_comunidad}}</p>
          <p>{{item.calle_comunidad}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Header from "./Header.vue"
export default {
  name: "Perfil-vecino",
  data (){
    return {
      nombre:"",
      idComunidadNow:"",
      id_usuario:"",
      apellidos:"",
      comunidad:"",
      comunidadData:[],
    }
  },
  components: {
    Header
  },
  async mounted(){
    let usuario = localStorage.getItem("user-info");
    //recogemos el nombre del usuario para mostrarlo en pantalla
    this.idComunidadNow = JSON.parse(usuario).id_comunidad;
    this.id_usuario = JSON.parse(usuario).id_usuario;
    this.nombre = JSON.parse(usuario).nombre_usuario;
    this.apellidos = JSON.parse(usuario).apellidos_usuario;
    this.comunidad = JSON.parse(usuario).comunidad_de_vecinos;
    console.log(usuario);
        /////////////////Obtener datos comunidad///////////////////////////
    const dataCom = {
      "id_comunidad": this.idComunidadNow
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
  },
}
</script>

<style>
.titulares {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
h1 {
  margin-bottom: 30px;
  margin-top: 40px;
  text-align: center;
}
.datos-usuario {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
</style>