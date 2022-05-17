<template>
    <div class="background-color-1">
        <div class="container">
            <img class="logo" src="../assets/logo-icalldibs-web.svg" alt="Logo ICallDibs" srcset="">
            <h1 class="titEntrar">Registro</h1>
            <p class="instrucciones">Regístrate para poder reservar espacios en tu comunidad</p>
            <div class="registro">
                <input type="text" v-model="nombre" maxlength="30" placeholder="Introducir nombre" required/>
                <input type="text" v-model="apellidos" maxlength="60" placeholder="Introducir apellidos" required/>
                <input type="text" v-model="login" placeholder="Introducir nombre de usuario" required/>
                <div class="input-wrapper">
                    <input :type="show === true ? 'text' : 'password'" id="password" v-model="password" placeholder="Introducir contraseña" required/>
                    <span class="material-icons" id="showPassword" v-if="show" @click="show = !show">visibility</span>
                    <span class="material-icons" id="showPassword" v-else @click="show = !show">visibility_off</span>
                </div>        
                <button class="btnDeg" v-on:click="signUp">Registrarse</button>
                <p>¿Ya tienes cuenta?<br><span id="destacadoGris"><router-link to="/login">Inicia sesión</router-link></span></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "Sign-up",
    data()
    {
        return {
            login:"",
            password:"",
            nombre:"",
            apellidos:"",
            show: false,
        }
    },
    methods: {
        async signUp() {
            let result = await axios.post (
                `https://icalldibs.000webhostapp.com/?servicio=alta_usuario`, {
                "id": null,
                "login": `${this.login}`,
                "password": `${this.password}`,
                "nombre": `${this.nombre}`,
                "apellidos": `${this.apellidos}`,
                "id_rol": `1`
            });
            const loginOk = result.data.data.resultado;
            if(loginOk=="ok"){
                this.$router.push({name:"Login-usuario"})
            }
            console.warn(result);
            console.warn(loginOk);
        }
    },
}
</script>

<style scoped>
#app {
    margin: -10px;
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
p {
  font-weight: bold;
  color: #4F4F4F;
  line-height: 1.5em;
  text-align: center;
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
    padding: 40px 0 0 0;
    width: 100vw;
    height: 100%;
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
.container {
    margin-bottom: 60px;
}
</style> 