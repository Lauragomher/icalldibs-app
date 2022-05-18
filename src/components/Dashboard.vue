<template>
    <div class="container-dashboard">
        <Header />
        <div class="container-titulo">
                <h1>Hola {{this.usernameNow}}</h1>
                <div class="container-perfil">
                    <div class="column">
                        <h3 v-show="this.usernameNow"><span id="destPalabra">Mi</span><br>comunidad</h3>
                        <div class="interior-column">
                            <div id="sinComunidad" v-show="!this.usernameNow">
                                <p id="destaSin">Todavía no tienes una comunidad de vecinos asignada.</p>
                                <p>Cuando tu administrador te dé acceso a tu comunidad podrás visualizar las zonas de reserva disponibles y realizar reservas.</p>
                            </div> 
                            <div id="comunidadCol" v-for="item in comunidadData" :key="item">
                                <img id="icono" src="../assets/icono-comunidades.svg" alt="Icono de comunidades">
                                <p id="titleCom">{{item.nombre_comunidad}}</p>
                                <p>{{item.calle_comunidad}}. {{item.codigo_postal_comunidad}}, {{item.provincia_comunidad}}</p>
                                <router-link :to="`/tablon-anuncios/`+item.id_comunidad"><button class="btnDeg"><span class="text">Tablón de anuncios</span></button></router-link>
                            </div>
                        </div> 
                    </div>
                </div>
            <h3 v-show="this.usernameNow">Mis reservas</h3>
            <div class="back-destacados">
                <div class="container-destacados" v-for="item in reservas" :key="item.id">
                    <div class="column">
                        <div id="destacar">
                            <p id="hidden"><b>Id zona:</b> {{item.id_zona}}</p>
                            <p><b>Zona:</b><br> {{item.nombre_zona}}</p>
                            <p><b>Inicio reserva:</b><br> {{item.inicio_reserva}}</p>
                            <p><b>Fin reserva:</b><br> {{item.fin_reserva}}</p>
                            <p id="hidden">Id reserva: {{item.id_reserva}}</p>
                            <router-link :to="`/mis-reservas/`+item.id_reserva">
                                <p>Cancelar</p>
                            </router-link> 
                        </div>
                    </div>
                </div>    
            </div>
            <h3 v-show="this.usernameNow">Mis zonas comunes</h3>
            <div class="back-destacados">
                <div class="container-destacados2" v-for="item in servicios" :key="item.id">
                    <div class="column">
                        <div id="destacar2">
                            <h4>{{item.tipo_zona}}</h4>
                            <p id="hidden">{{item.id_zona}}</p>
                            <div>
                                <img id=imgAreas :src="item.imagen_zona">
                            </div>    
                            <router-link :to="`/reserva/`+item.id_zona">
                                <p id="reservaBtn">Reservar</p>
                            </router-link> 
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
</template>

<script>
import Header from "./Header.vue"
import axios from "axios"
export default {
    name: "Dashboard-vecino",
    data()
    {
        return {
            nombre:"",
            rol:"",
            user:[],
            id_usuario:"",
            rol_usuario:"",
            comunidadNow:"",
            usernameNow:"",
            rolUsuarioNow:"",
            idComunidadNow:"",
            comunidadData:[],
            reservas: [],
            servicios: [],
        }
    },
    components: {
        Header,
    },   
    mounted() 
    {   
        /////mostrar datos usuario
        let usuario = localStorage.getItem("user-info");
        //recogemos el nombre del usuario para mostrarlo en pantalla
        this.nombre = JSON.parse(usuario).nombre;
        this.id_usuario = JSON.parse(usuario).id_usuario;
        console.log(usuario);
        console.log(this.id_usuario);
        const userCom = {
        "id_usuario": this.id_usuario,
        }
        //recogemos datos de la bd para ser utilizados - users con comunidad asignada
        axios.post(`http://localhost/api/?servicio=obtener_datos_usuarios_comunidad`, userCom)
        .then(response => {
            console.log(response);
            let datosUser = response.data.data.datos;
            this.user = datosUser;
            console.log(datosUser);
            for(let i=0; i<datosUser.length; i++){
                console.log(datosUser[i]);
                console.log(datosUser);
                //extraemos los datos de interés de cada objeto
                this.id_comunidad = datosUser[i].id_comunidad;
                this.nombre_comunidad = datosUser[i].nombre_comunidad;
                this.nombre_usuario = datosUser[i].nombre_usuario;
                this.id_usuario2 = datosUser[i].id_usuario;
                this.apellidos_usuario = datosUser[i].apellidos_usuario;
                this.rol_usuario = datosUser[i].id_rol;
                console.log(this.id_usuario2);
                //buscamos el objeto que coincida con nuestro usuario
                //extraemos los datos que se guardarán en localStorage
                if (this.id_usuario2 == this.id_usuario) {
                    this.usernameNow = this.nombre_usuario;
                    this.apellidosNow = this.apellidos_usuario;
                    this.idUsuarioNow = this.id_usuario2;
                    this.rolUsuarioNow = this.rol_usuario;
                    this.idComunidadNow = this.id_comunidad;
                    this.comunidadNow = this.nombre_comunidad;
                    //Definimos sustituir en user-info
                    let datosComunidad = {
                        id_usuario: this.idUsuarioNow,
                        rol_usuario: this.rolUsuarioNow,
                        nombre_usuario: this.usernameNow,
                        apellidos_usuario: this.apellidosNow,
                        comunidad_de_vecinos: this.comunidadNow,
                        id_comunidad: this.idComunidadNow,
                    }
                    //Volvemos a enviar los datos a user-info y se actualizan en el storage
                    let result = Object.create(datosComunidad);
                    console.log(result);
                    console.log(datosComunidad)
                    localStorage.setItem("user-info",JSON.stringify(datosComunidad));
                    /////////////////Obtener datos comunidad///////////////////////////
                    const dataCom = {
                        "id_comunidad": this.idComunidadNow
                    }
                    axios.post(`https://icalldibs.000webhostapp.com/?servicio=obtener_datos_comunidad`, dataCom)
                    .then(response => {
                        let datosZona = response.data.data.datos;
                        this.comunidadData = datosZona;
                            console.log(response);
                    })
                    .catch(e => {
                        console.log(e);
                    });    
                    const data = {
                        "id_usuario": this.id_usuario
                    }
                    axios.post(`https://icalldibs.000webhostapp.com/?servicio=obtener_reservas_usuario`, data)
                    .then(response => {
                        let datosZona = response.data.data.datos;
                        this.reservas = datosZona;
                        console.log(response);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                    const datos = {
                        id_comunidad: this.idComunidadNow,
                        zona_activa: 1,
                    };
                    axios.post(`https://icalldibs.000webhostapp.com/?servicio=obtener_zonas_usuario`, datos)
                    .then(response => {
                        let datosZona = response.data.data.datos;
                        this.servicios = datosZona;
                   //si el usuario no es vecino va al dashboard de admin
                        if (this.rol_usuario==2||this.rolUsuarioNow==2) {
                            this.$router.push({name:"Dashboard-admin"})
                        }
                        console.log(this.rol_usuario);
                        console.log(this.rolUsuarioNow);
                    })
                    .catch(e => {
                    console.log(e);
                    });
                }  
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
}
</script>

<style scoped>
.comunidad-texto {
    background-color: black;
    font-size: 1.8em;
}
.comunidad-texto:hover {
    color: var(--verde);
}
.background-color-1 {
    height: 100vh;
    width: 100vw;
}
#content {
    justify-content: center;
}
#sinComunidad {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
}
#sinComunidad p {
    text-align: center;
    line-height: 1.6em;
}
#destaSin {
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 1.4em;
    font-weight: 600;
    padding: .4em .8em;
}
.logo {
    width: 150px;
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
    padding: 2.7em 1.2em 1.8em 1.2em;
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
    padding: .6em .4em 0 .4em;
    margin: 2.4em 2.6em;
    background: var(--degradado1);
	box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
	0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}
.container-destacados:hover {
    background: black;
    color: white;
}
.container-destacados > h3:hover {
    background: var(--degradado1w);
    color: black;
}
.back-destacados {
    display: flex;
    flex-flow: row wrap;
    align-content: center;
    justify-content: center;
}
.container-destacados2 {
    display: flex;
    flex-flow: wrap row;
    justify-content: space-evenly;
    align-content: center;
    width: 18.6em;
    min-height: 13em;
    border-radius: 14px;
    border: 0px solid;
    padding: .6em .4em 0 .4em;
    margin: 2.4em 2.6em;
    background: rgb(244, 244, 244);
	box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.3),
	0 0.0625rem 0.125rem rgba(0, 0, 0, 0.2);
}
.container-destacados2:hover {
    background: black;
    color: white;
}
.container-destacados2 > h3:hover {
    background: var(--degradado1w);
    color: black;
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
    margin: 0 0 0.8em 0;
    font-size: 1.1em;
}
#comunidadCol > a > button.btnDeg {
    margin: 4px 0 1.2em 0;
}
#titleCom {
    font-size: 1.4em;
    font-weight: 600;
}
#destacar {
    border-radius: 2px;
    margin: 0 0 14px 0;
    padding: .2em .9em;
}
#destacar2 {
    border-radius: 2px;
    padding: .2em .9em;
}
#imgAreas {
  width: 200px;
  height: 200px;
  max-height: 300px;
  margin-bottom: 0;
  border-radius: 12% 3% 12% 3%;
}
.logo {
    width: 150px;
}
h1 {
	position: relative;
	max-width: 8em;
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
    margin:  1.4em 0 0 0;
    line-height: 1.2em;
    font-size: 1.4em;
    text-align: center;
}
.container-titulo > h3 {
    font-size: 2em;
    margin: 2em 0 .6em 0;
}
h4 {
    text-align: center;
    font-size: 1.2em;
}
#destacar > a {
    text-decoration: none;
    color: var(--rojo);
    font-weight: 600;
    font-size: 1.3em;
    text-align: center;
}

#destacar > a:hover {
    color: var(--amarillo);
    text-shadow: none;
}
#icono {
    width: 100px;
    margin: 0;
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
}
#hidden {
  display: none;
}

#destacar2 > a {
    text-decoration: none;    
    color: var(--azul);
    font-size: 1.4em;
    font-weight: 600;
    text-align: center;
}
#reservaBtn {
    background-color: black;
    border-radius: 12px;
    padding: 4px 0;
}
</style>