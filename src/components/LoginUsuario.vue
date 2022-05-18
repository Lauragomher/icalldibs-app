<template>
  <div class="background-color-1">
    <div class="container">
      <img class="logo" src="../assets/logo-icalldibs-web.svg" alt="Logo ICallDibs">
      <h1 class="titEntrar">Inicio de sesión</h1>
      <p class="instrucciones">Entra en tu comunidad y reserva las zonas que necesites</p>
      <div class="login">
        <input type="text" v-model="login" placeholder="Introducir login" required/>
        <div class="input-wrapper">
          <input :type="show === true ? 'text' : 'password'" id="password" v-model="password" placeholder="Introducir contraseña" required/>
          <span class="material-icons" id="showPassword" v-if="show" @click="show = !show">visibility</span>
          <span class="material-icons" id="showPassword" v-else @click="show = !show">visibility_off</span>
        </div>
        <button class="btnDeg" v-on:click="loginSet">Entrar</button>
        <p>¿No tienes cuenta?<br>Aquí puedes <span id="destacadoGris"><router-link to="/sign-up">registrarte</router-link></span></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "Login-usuario",
    data()
    {
      return {
        login:"",
        password:"",
        nombre:"",
        apellidos:"",
        id_rol:"",
        id:"",
        show: false
      }
    },
    methods: 
    {
      async loginSet() {
        const datos = {
          login: this.login,
          password: this.password
          };
          let result = await axios.post (
          `http://localhost/api/?servicio=login`, datos);
          //obtenemos resultado de login y rol para delimitar el acceso de
          //administradores y propietarios
          const loginOk = result.data.data.resultado;
          this.id_rol = result.data.data.id_rol;
          //guardamos datos del usuario de interés para usarlos en localStorage
          this.id = result.data.data.id;
          this.nombre = result.data.data.nombre;
          this.apellidos = result.data.data.apellidos;
          //si el login está ok cada usuario accede a su propia área privada
          if(loginOk=="ok"){
            this.loginStorage();
          }
          console.warn(result);
          console.warn(loginOk);
          console.warn(this.id_rol);
     },
     //Si el usuario es correcto lo creamos también en el cliente
     //para que recuerde la sesión sin que tenga que volver a hacer login
    async loginStorage() {
      const person = {	
        nombre: this.nombre,
        apellidos: this.apellidos,
        id_usuario: this.id,
        id_rol: this.id_rol
      }
      let result = Object.create(person);
	console.log(result.nombre);
        localStorage.setItem("user-info",JSON.stringify({
          nombre: result.nombre,
          apellidos: result.apellidos,
          id_rol: result.id_rol,
          id_usuario: result.id_usuario
        }));
      if (this.id_rol==1) {
        this.$router.push({name:"Dashboard-vecino"});
      }
      if (this.id_rol==2) {
        this.$router.push({name:"Dashboard-admin"});
      }
      console.warn(result);
    },

    //funciones para mostrar/ocultar contraseña en login
    showPassword() {
      this.visibility = "text";
    },
    hidePasssword() {
      this.visibility = "password";
    },
  }, 
};
</script>

<style scoped>
#app {
  margin: -10px;
}
p {
  font-weight: bold;
  color: #4F4F4F;
  line-height: 1.6em;
  text-align: center;
}
.input-wrapper {
	position: relative;
}
#showPassword {
    position: absolute;
    height: 0;
    right: 0;
    font-size: 1.8em;
    top: 14%;
    padding-right: 14px;
    transform: translateY(-50%);
    cursor: pointer;
}
#destacadoGris > a {
  background-color: #4F4F4F;
  color: var(--verde);
  text-decoration: none;
  padding: 2px 3px;
}
.logo {
  width: 100px;
  margin-top: -85px;
}
.background-color-1 {
    padding: 40px 0;
    width: 100vw;
}
.instrucciones {
    width: 50%;
    margin-bottom: 24px;
}
.titEntrar {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    font-size: 40px;
    letter-spacing: 2px;
    margin-bottom: 0;
}
</style> 