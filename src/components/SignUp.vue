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
                `http://localhost/api/?servicio=alta_usuario`, {
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
    padding: 30px 0 30px 0;
    width: 100vw;
    height: fit-content;
}
.instrucciones {
    width: 66%;
    margin-bottom: 24px;
}
.titEntrar {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    font-size: 44px;
    letter-spacing: 3px;
    margin: 10px 0 0 0;
}
.container {
  margin: 30px 30px 0 30px;
  padding: 30px 20px 30px 20px;
}
.login p {
  margin: 0 0 8px 0;
}
.btnDeg {
  font-size: 25px;
  margin-top: 4px;
  margin-bottom: 10px;
}
@media only screen and (min-width: 280px) and (max-width: 460px){
  input {
    width: 20em;
  }
  .titEntrar {
    text-align: center;
    font-size: 32px;
    line-height: 42px;
    margin-top: 16px;
  }
  .instrucciones {
    width: 76%;
    font-size: 1em;
    margin-bottom: 14px;
  }
  .btnDeg {
    margin: 4px 0 10px 0;
    font-size: 22px;
  }
  .login p {
    font-size: 0.96em;
    margin-bottom: 0;
  }
}

</style> 