<template>
  <div>
    <Header2admin />
    <h1>Gestión de usuarios</h1>
    <div class="container-areas">                
      <div class="usuarios-sin-com">
        <h3>Usuarios <span id="dest1">sin</span> comunidad</h3>
        <div class="container" v-for="item in usuariosSin" :key="item.id">
            <div class="texto-areas">
              <div class="texto-interior">
                <p><b>ID:</b> {{item.id_usuario}}</p>
                <p><b>Rol:</b> {{item.id_rol}}</p>
              </div>
              <p><b>Nombre:</b> {{item.nombre_usuario}}</p>
              <p><b>Apellidos:</b> {{item.apellidos_usuario}}</p>
            </div>
          <div class="container-btn">
            <router-link :to="`/gestion-usuarios/asignar/`+item.id_usuario"><button class="btnDeg">Asignar <br>comunidad</button></router-link>
            <router-link :to="`/gestion-usuarios/editar/`+item.id_usuario"><button class="btnDeg">Modificar <br>datos</button></router-link>
            <router-link :to="`/gestion-usuarios/borrar/`+item.id_usuario"><button class="btnDel">Eliminar</button></router-link>
          </div>
        </div>
      </div>
      <div class="usuarios-con-com">
        <h3>Usuarios <span id="dest2">con</span> comunidad</h3>
        <div class="container" v-for="item in usuariosCom" :key="item.id">
          <div class="texto-areas">
              <div class="texto-interior">
                <p><b>ID:</b> {{item.id_usuario}}</p>
                <p><b>Rol:</b> {{item.id_rol}}</p>
              </div>
              <p class="name"><b>Nombre:</b> {{item.nombre_usuario}}</p>
              <p><b>Apellidos:</b> {{item.apellidos_usuario}}</p>
              <p><b>Nombre comunidad:</b> {{item.nombre_comunidad}}</p>
              <p><b>ID comunidad:</b> {{item.id_comunidad}}</p>
              <p><b>Total vecinos:</b> {{item.total_vecinos_comunidad}}</p>
          </div>
          <div class="container-btn">
            <router-link :to="`/gestion-usuarios/editar/`+item.id_usuario"><button class="btnDeg">Modificar datos</button></router-link>
            <router-link :to="`/gestion-usuarios/borrar/`+item.id_usuario"><button class="btnDel">Eliminar</button></router-link>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import Header2admin from "./Header2admin.vue"
import axios from "axios";
export default {
  name: "Gestion-usuarios",
  data (){
    return {
      idComunidadNow:"",
      id_usuario:"",
      id_zona:"",
      tipo_zona:"",
      nombre: "",
      descripcion: "",
      aforo:"",
      usuariosCom:[],
      usuariosSin:[],
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
    console.log(usuario);
    console.log(this.id_usuario);
/////Obtenemos los usuarios registrados sin comunidad///////
    axios.get(`http://localhost/api/?servicio=obtener_usuarios_sin_comunidad`)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.usuariosSin = datosZona;
      console.log(response);
    })
    .catch(e => {
      console.log(e);
    });
//Obtenemos los usuarios con comunidad de las comunidades
//que administra el admin////////////////////////////////
    const dataAdmin = {
      id_administrador: this.id_usuario
    }
    axios.post (`http://localhost/api/?servicio=obtener_usuarios_comunidad`, dataAdmin)
    .then(response => {
      let datosZona = response.data.data.datos;
      this.usuariosCom = datosZona;
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
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin-top: 40px;
}
h1 {
  text-align: center;
}
h3 {
  text-align: center;
  font-size: 1.5em;
  margin: 10px 0 10px 0 ;
}
#dest1{
  padding: 2px 6px;
  background-color: var(--verde);
}
#dest2 {
  padding: 2px 6px;
  background-color: var(--violeta);
}
.usuarios-sin-com {
  display: flex;
  flex-flow: column wrap;
}
.container {
  position: relative;
  border: 6px solid transparent;
  border-radius: 20px;
  margin: 1.8em 0;
  background-color: whitesmoke;
  background-clip: padding-box;
  padding: 1em 1.6em 2.2em 1.6em;
  box-shadow: 0 3px 9px gray, inset 0 0 9px white;
}
.usuarios-sin-com > .container::after {
  position: absolute;
  top: -6px; bottom: -6px;
  left: -6px; right: -6px;
  background: var(--degradado1);
  content: '';
  z-index: -1;
  border-radius: 20px;
}
.usuarios-con-com {
  display: flex;
  flex-flow: column wrap;
}
.usuarios-con-com > .container::after {
  position: absolute;
  top: -6px; bottom: -6px;
  left: -6px; right: -6px;
  background: var(--degradado2);
  content: '';
  z-index: -1;
  border-radius: 20px;
}
.container-btn {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}
.material-icons{
  font-size: 4.4em;
  color: white;
  background-image: var(--degradado1);
  border-radius: 50%;
  padding: 20px;
}
.texto-areas {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  min-width: 280px;
  padding: 1% 0 3% 0;
}
.texto-interior {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
p {
  font-size: 1.1em;
}
.btnDeg {
  padding: 10px 10px;
  margin: 0 20px 0 0;
  font-size: 1.2em;
}
.btnDel {
    background: var(--rojo);
    color:black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.2em;
    border: 0 solid;
    margin: 0;
    padding: 10px 10px;
    cursor: pointer;
    z-index: 1;
}
.btnDel:hover {
  color: white;
  background: var(--rojo);
}
@media screen and (max-width: 650px) {
  .container-btn {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  }
  .btnDeg {
    margin: 14px 0;
  }
  .btnDel {
    margin: 14px 0;
  }
  .texto-areas {
    min-width: 240px;
  }
}
</style>