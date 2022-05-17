<template>
<div class="container-dashboard">
    <Header2admin />
    <div class="container-titulo">
        <h1>Holi {{this.nombre}}{{this.nombreAfter}}</h1>
        <div class="container-perfil">
            <div class="column">
                <h3><span id="destPalabra">Comunidades</span><br>que administras</h3>
                <div class="interior-column">
                    <div id="comunidadCol" v-for="item in comunidadesAdmin" :key="item">
                        <p>{{item.nombre_comunidad}}</p>
                        <router-link :to="`/gestion-comunidades/editar/`+item.id_comunidad"><button class="btnDeg">Editar</button></router-link>
                        <router-link :to="`/tablon-anuncios/`+item.id_comunidad"><button class="btnDeg"><span class="text">Tablón de anuncios</span></button></router-link>
                    </div>
                </div> 
            </div>
        </div>
        <h3>Destacados</h3>
        <div class="back-destacados">
            <div class="container-destacados">
                <div class="column">
                    <div id="destacar">
                        <h3><span id="destPalabra">Tu</span><br>dashboard</h3>
                        <div v-for="item in comunidadData" :key="item">
                        <p>{{item.calle_comunidad}}.</p>
                        <p>{{item.codigo_postal_comunidad}}. {{item.provincia_comunidad}}.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-destacados">
                <div class="column">
                    <div id="destacar">
                        <router-link to="/gestion-comunidades">
                            <h3>
                                <span id="destPalabra">Gestionar</span><br>comunidadades
                            </h3>
                        </router-link> 
                    </div>
                </div>
            </div>
            <div class="container-destacados">
                <div class="column">
                    <div id="destacar">
                        <router-link to="/gestion-zonas-comunes">
                            <h3>
                                <span id="destPalabra">Gestionar</span><br>zonas comunes
                            </h3>
                        </router-link> 
                    </div>
                </div>
            </div>
            <div class="container-destacados">
                <div class="column">
                    <div id="destacar">
                        <router-link to="/gestion-usuarios">
                            <h3>
                                <span id="destPalabra">Gestionar</span><br>usuarios
                            </h3>
                        </router-link> 
                    </div>
                </div>
            </div>
        </div>      
    </div>
</div>
</template>

<script>
import axios from "axios"
import Header2admin from "./Header2admin.vue"
export default {
    name: "Dashboard-admin",
    data(){
        return {
            nombre:"",
            nombreAfer:"",
            idUsuarioNow:"",
            comunidadNow:"",
            idComunidadNow:"",
            user: [],
            comunidadesAdmin: [],
            id_usuario:"",
            rol:"",
            rol_usuario:"",
            rolUsuarioNow:"",
        }
    },
    components: {
        Header2admin
    },
     mounted() 
    {
        /////mostrar datos usuario
        let usuario = localStorage.getItem("user-info");
        //recogemos el nombre del usuario para mostrarlo en pantalla
        this.nombre = JSON.parse(usuario).nombre_usuario;
        this.nombreAfter = JSON.parse(usuario).nombre;
        this.id_usuario = JSON.parse(usuario).id_usuario;
        this.rol_usuario = JSON.parse(usuario).id_rol;
        console.log(usuario);
        console.log(this.id_usuario);
        //si el usuario es vecino vuelve a su dashboard
        if (this.rol_usuario==1) {
            this.$router.push({name:"Dashboard-vecino"})
        }
        const dataAdmin = {
            "id_administrador": this.id_usuario
        };
        axios.post(`http://localhost/api/?servicio=obtener_comunidades_de_admin`, dataAdmin)
        .then(response => {
            let datosAdmin = response.data.data.datos;
            this.comunidadesAdmin = datosAdmin;
            console.log(response);                   
        })
        .catch(e => {
            console.log(e);
        });

        //si el usuario no está registrado vuelve al login
        /*if (!usuario) {
            this.$router.push({name:"Login-usuario"})
        }*/
    }
}
</script>

<style scoped>
.background-color-1 {
    height: 100vh;
    width: 100vw;
}
#content {
    justify-content: center;
}
.container-titulo {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1.6em;
}
.container-perfil {
    display: flex;
    flex-flow: wrap row;
    justify-content: space-evenly;
    align-content: center;
    border-radius: 14px;
    border: 0px solid;
    margin: -2.4em 0 1em 0;
    padding: 2.7em 0em .8em .5em;
	box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
	0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}
.container-destacados {
    display: flex;
    flex-flow: wrap row;
    justify-content: space-evenly;
    align-content: center;
    width: 15.6em;
    min-height: 13em;
    border-radius: 14px;
    border: 0px solid;
    padding: .6em 0em .3em 0em;
    margin: 1.2em 1.4em;
    background: var(--degradado1);
	box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
	0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}
.container-destacados:first-child {
    background: black;
    color: var(--amarillo);
}
.container-destacados:not(:first-child):hover {
    background: black;
    color: white;
}
.container-destacados:not(:first-child) > h3:hover {
    background: var(--degradado1w);
    color: black;
}
.back-destacados {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
}
.column {
    display: flex;
    flex-flow: wrap column;
    justify-content: center;
    padding: 0 .8em;
    align-items: center;
}
.interior-column {
    display: flex;
    flex-flow: wrap row;
    justify-content: space-evenly;
    padding: 0 1em;
    align-items: center;
}
#destPalabra {
    font-size: 120%;
}
#comunidadCol {
    padding: 0 1.6em 0 1.2em;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
}
#comunidadCol > p {
    margin: 1.4em 1em .6em 1em;
    line-height: 1.2em;
    font-size: 1.2em;
    text-align: center;
}
#comunidadCol > a > button.btnDeg {
    margin: 4px 0 1.2em 0;
}
#destacar {
    border-radius: 2px;
    margin: 0 0 14px 0;
    padding: .2em .9em;
    text-align: center;
}
.logo {
    width: 150px;
}
h1 {
	position: relative;
	max-width: 30em;
	background: var(--degradado1);
	padding: 1.125em 1.5em;
	border-radius: .4em;
    margin: 34px 0 0 0;
	box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
		0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}

h1::before {
	content: "";
	position: absolute;
	width: 0;
	height: 0;
	bottom: 100%;
	left: 1.1em; 
	border: .7em solid transparent;
	border-top: none;
	border-bottom-color: var(--verde);
	filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
}
h3 {
    margin:  1.4em 0 .4em 0;
    line-height: 1.2em;
    font-size: 1.4em;
    text-align: center;
}
.container-titulo > h3 {
    font-size: 2em;
    margin: 2em 0 .6em 0;
}
#destacar > a {
    text-decoration: none;
    color: white;
    text-shadow: 1px 2px 2px grey;
}
#destacar > a:hover {
    color: var(--amarillo);
    text-shadow: none;
}
h2 {
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  font-size: 36px;
  line-height: 50px;
  margin-top: .5em;
  text-align: center;
}
.btnDeg {
    font-size: 1.4em;
    padding: .56em 1em;
}
</style>