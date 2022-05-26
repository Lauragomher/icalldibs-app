<template>
    <div>
        <div class="nav-atras">
            <router-link to="/areas-comunes">
                <span class="material-icons" id="backIcon">arrow_circle_left</span>
            </router-link>
        </div>
        <div class="instrucciones-horarios">
            <div class="container-int-horarios">
                <span id="cuadrado1">&#9724;</span>
                <p>Disponible</p>
            </div>
            <div class="container-int-horarios">
                <span id="cuadrado2">&#9724;</span>
                <p>Seleccionado</p>
            </div>
        </div>      
        <div class="img-reserva">
                    <div id="infoZona" v-for="item in servicios" :key="item">
                        <p id="nombreZona">{{item.tipo_zona}}</p>
                        <p id="descZona"> {{item.descripcion_zona}}</p>
                        <p id="comunidad">{{item.nombre_comunidad}}</p>
                    </div>
            <img :src="this.reserva.imagen_zona">
            <div class="container-instrucciones">
                <span class="material-icons" id="infoIcon">info</span>
                <p>Si en la fecha seleccionada se completa el aforo en alguna hora  esta desaparece y no puede ser seleccionada</p>    
            </div> 
        </div> 
           
        <div class="fondo">
            <div class="container">
                <div class="fecha-reserva">
                    <!-- Fecha -->
                    <h3>1. Seleccionar fecha</h3>
                    <input @input="saveValue()" @change="isShowing = true" type="date" name="fecha1" v-model="fechaInicio">
                    <input id="hidden" @input="saveValue2()" type="date" name="fecha1" v-model="fechaInicio">
                </div>
                <div class="reserva" v-show="isShowing ^= false">
                    <h3>2. Seleccionar horas</h3>
                    <div class="container-horas">
                        <div class="container-columna-horas">
                            <h4>Hora de inicio</h4>
                            <!-- Hora inicio -->
                            <div class="int-hora">
                                <label class="style-checkbox" v-for='hora in horasdata' :key="hora">
                                    <input type='checkbox' :value='hora' v-model='horas' @change='saveValue()'>
                                        <p>{{ hora }}</p>
                                        <span class="check-new"></span>
                                </label>
                            </div>
                        </div>
                        <div class="container-columna-horas"> 
                            <h4>Hora de fin</h4>
                            <!-- Hora fin -->
                            <div class="int-hora">
                                <label class="style-checkbox" v-for='horaFin in horasfindata' :key="horaFin">
                                    <input type='checkbox' :value='horaFin' v-model='horasFin' @change='saveValue2()'>
                                        <p>{{ horaFin }}</p>
                                        <span class="check-new"></span>
                                </label>
                            </div>
                        </div>    
                    </div>    
                </div>
                <button class="btnDeg" v-on:click="setReserva">Reservar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "Formulario-reserva",
    data()
    {
        return {
            isShowing: "",
            id_usuario:"",
            idComunidadNow:"",
            nombre:"",
            servicios: [],
            reserva: [],
            zona_id:"",
            horasdata: ["09:00","10:00","11:00","12:00","13:00","16:00","17:00","18:00","19:00","20:00","21:00"],
            horas: [],
            horasfindata: ["10:00","11:00","12:00","13:00","14:00","17:00","18:00","19:00","20:00","21:00","22:00"],
            horasFin: [],
            selectedhora: "",
            selectedhora2: "",
            fechaInicio:"",
            fechafinal1:"",
            fechafinal2:"",
            aforoReserva:[],
            aforoReservas: [],
            aforoMax:"",
            selectedInicio:[],
            selectedFin:[],
            checkDateInicio: "",
            checkDateFinal:"",
            fechaInteres1:"",
            fechaInteres2:"",
        }
    },
    methods : {
        async setReserva() {
            let result = await axios.post (
                `http://localhost/api/?servicio=alta_reserva`, {
                "id": null,
                "id_usuario": `${this.id_usuario}`,
                "id_zona_comun": `${this.zona_id}`,
                "fecha_hora_inicio": `${this.fechafinal1}`,
                "fecha_hora_fin": `${this.fechafinal2}`
            });
            console.log(this.fechafinal1);
            const reservaOk = result.data.data.resultado;
            if (reservaOk=="ok") {
                this.$router.push({name:"Success-reserva"})
            }
            console.warn(result);
        },
        updateCheckall: function(){
            if (this.horas.length == this.horasdata.length) {
                this.isCheckAll = true;
            }else{
                this.isCheckAll = false;
            }
        }, 
        updateCheckall2: function(){
            if (this.horasFin.length == this.horasfindata.length) {
                this.isCheckAll = true;
            }else{
                this.isCheckAll = false;
            }
        },
        saveValue () {
            this.checkReservas();
            for (var key in this.horas) {
                this.selectedhora = this.horas[key];
                this.fechafinal1 = this.fechaInicio + " " + this.selectedhora;
                console.log(this.fechafinal1);
            }
        },
        saveValue2 () {
            for (var key in this.horasFin) {
                this.selectedhora2 = this.horasFin[key];
                this.fechafinal2 = this.fechaInicio + " " + this.selectedhora2;
                console.log(this.fechafinal2);
            }  
        },
        arrayCount (args){
            alert(args.lenght);
        },
        async checkReservas () {
        const arrayExt = this.horasfindata;
        const arrayInicioExt = this.horasdata;
        const datosReservas = {
          id_zona: this.zona_id,
          inicio_reserva: this.fechaInicio
        };
        console.warn(this.fechaInicio)
       //Obtenemos las reservas de esa zona para revisar el aforo
        let response = await axios.post(`http://localhost/api/?servicio=obtener_reservas_zona`, datosReservas)
            const historicoReservas = response.data.data.datos;
            console.log(response);
            historicoReservas.map(({inicio_reserva, fin_reserva, aforo_zona})=>{
                //Obtenemos fechas de reservas de la bd
                let bdInicioReserva = `${inicio_reserva}`;
                let bdFinReserva =  `${fin_reserva}`;
                let bdAforo =  `${aforo_zona}`;
                console.log(bdInicioReserva);
                console.log(bdFinReserva);
                console.log(bdAforo);
                //Extraemos las horas del array de horas de inicio
                arrayInicioExt.map((hora)=>{ 
                    //Le añadimos :00 a cada hora para igualarlas a las de la bd
                    let horaIndInicio = hora + `:00`;
                    //console.log(horaIndInicio)
                    //creamos fecha + hora igual a bd
                    let fechaIndInicio = this.fechaInicio + " " + horaIndInicio; 
                    //console.log(fechaIndInicio)
                    // console.log(bdInicioReserva)
                    if (fechaIndInicio == bdInicioReserva) {
                        console.warn ("fechas inicio coinciden"); 
                        let coinciden = "1";
                        this.fechaInteres1 = fechaIndInicio;
                        console.warn(this.fechaInteres1)
                        this.checkDateInicio += coinciden;
                        return this.checkDateInicio, this.fechaInteres1;
                    }

                });
                //Extraemos las horas del array de horas de fin
                arrayExt.map((horaFin)=>{ 
                    //Le añadimos :00 a cada hora para igualarlas a las de la bd
                    let horaIndFin = horaFin + `:00`;
                    //console.log(horaIndFin)
                    //creamos fecha + hora igual a bd
                    let fechaIndFin = this.fechaInicio + " " + horaIndFin; 
                    //console.warn(fechaIndFin)
                    if (fechaIndFin == bdFinReserva) {
                        console.warn ("fechas fin coinciden");
                        let coinciden = "1";
                        this.fechaInteres2 = fechaIndFin;
                        this.checkDateFinal += coinciden;
                        return this.checkDateFinal, this.fechaInteres2;
                    }
 
                });
            });
            console.log(this.checkDateFinal);
            let arrFinal1 = Array.from(this.checkDateInicio);
            let usarFinal1 = arrFinal1;
            let arrFinal2 = Array.from(this.checkDateFinal);
            console.log(arrFinal2);
            let usarFinal2 = arrFinal2;
            console.log(this.aforoMax);
            //HORARIO INICIO DE RESERVA - 1
            //revisamos aforo vs hora y fecha reserva - inicio
            if (this.aforoMax > usarFinal1.length || this.aforoMax > usarFinal2.length){
                console.log("Se puede reservar");
                console.log(usarFinal1.length, usarFinal2.length);
            }
            //limitamos el horario de reserva para que no se sobrepase el aforo de la sala
            if (this.aforoMax <= usarFinal1.length || this.aforoMax <= usarFinal2.length) {
                console.log("No se puede reservar");
                console.log(this.fechaInteres1);
                //Cortamos la fecha para devolver la hora que ve el usuario
                let hora1 = this.fechaInteres1.slice(11, 16);
                //console.log(hora1);
                console.log("No se puede reservar");
                console.log(this.fechaInteres2);
                //Cortamos la fecha para devolver la hora que ve el usuario
                let hora2 = this.fechaInteres2.slice(11, 16);
                console.log(hora2);
                //Le quitamos al array de horarios la hora que ya no se puede reservar
                const index = this.horasdata.indexOf(hora1);
                const index2 = this.horasfindata.indexOf(hora2);
                if (index > -1 || index2 > -1) {
                    this.horasdata.splice(index, 1); 
                    console.log(this.horasdata);
                    this.horasfindata.splice(index2, 1); 
                    console.log(this.horasfindata);
                    return this.horasdata, this.horasfindata;
                }
            }
        },
    },
    mounted () {
        //////Obtenemos la id de la zona de la URL////
        console.log(this.$route.params.id)
        this.zona_id = this.$route.params.id;
        /////mostrar datos usuario
        let usuario = localStorage.getItem("user-info");
        //recogemos el nombre del usuario para mostrarlo en pantalla
        this.idComunidadNow = JSON.parse(usuario).id_comunidad;
        this.id_usuario = JSON.parse(usuario).id_usuario;
        console.log(usuario);
        console.log(this.id_usuario);
        //le enviamos a la api la id de la comunidad y que la zona esté activa
        //para obtener las zonas comunes disponibles de esa comunidad
        const datos = {
          id_zona: this.zona_id,
        };
        //Obtenemos las zonas comunes para mostrar datos de la zona
        axios.post(`http://localhost/api/?servicio=obtener_datos_zona_reserva`, datos)
        .then(response => {
            let datosZona = response.data.data.datos;
            let datosReserva= response.data.data.datos[0];
            this.reserva = datosReserva;
            this.servicios = datosZona;
            this.aforoMax = datosReserva.aforo_zona;
            console.warn(this.aforoMax);
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });

    },
}
</script>

<style scoped>
.style-checkbox {
    display: block;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 18px;
}
/* ocultar checkbox default */
input[type=checkbox] {
    visibility: hidden;
}
/* crear nueva checkbox */
.check-new {
    position: absolute;
    height: 25px;
    width: 25px;
    background-color: var(--verde);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.style-checkbox input:active ~ .check-new {
    background-color: var(--verde);
}
.style-checkbox input:checked ~ .check-new {
    background-color: var(--morado);
}
.style-checkbox input:checked ~ p {
    color: var(--morado);
}
#backIcon {
    color: black;
    font-size: 3.4em;
    padding-left: .6em;
    padding-top: 18px;
    border: none;
}
#backIcon:hover {
    color: var(--morado);
}
.nav-atras {
    padding: 10px 0;
    background-color: #F2F2F2;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
}
.img-reserva {
    display: flex;
    justify-content: center;
    margin: 30 0px;
    background: var(--degradado1);
}
.img-reserva img {
    height: 340px;
    -webkit-clip-path: polygon(8% 0, 100% 0%, 92% 100%, 0% 100%);
    clip-path: polygon(8% 0, 100% 0%, 92% 100%, 0% 100%);
}
.container-horas {
    display: flex;
    flex-flow: row wrap;
    column-gap: 60px;
}
.container-columna-horas {
    display: flex;
    flex-flow: column wrap;
    padding: 0 66px;
    width: 164px;
}
#infoZona {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
}
#descZona {
    width: 80%;
    line-height: 1.2em;
    font-size: 1em;
    font-style: italic;
    margin-bottom: 1.3em;
}
#nombreZona {
    font-size: 1.9em;
    font-weight: bold;
    margin-bottom: .4em;
    color: white;
    background-color: black;
    padding: 4px 10px;
}
#comunidad {
    font-size: 1em;
    line-height: 1.2em;
    font-weight: bold;
    margin-bottom: .4em;
    color: grey;
    background: white;
    padding: 4px 10px;
    text-transform: uppercase;
}
h1 {
    margin-top: 1em;
    margin-bottom: .8em;
    text-align: center;
}
h3 {
    text-align: center;
}
p {
    text-align: center;
}
.reserva input {
    height: 30px;
    width: 50px;
    display: inline-flex;
    align-content: center;
    justify-content: center;
}
h4 {
    font-size: 1.3em;
    margin-right: -16px;
    padding-bottom: 10px;
}
.reserva h3,
.fecha-reserva h3 {
    font-size: 1.4em;
    background: white;
    padding: 6px 10px;
    margin: .6em 0;
}
.fecha-reserva input:focus-within {
    color: var(--morado);
}
.int-hora {
    display: flex;
    align-content: center;
    flex-flow: column
}
.int-hora label {
    display: flex;
}
.int-hora label p {
    margin-top: -1px;
    font-size: 1em;
    font-weight: 600;
    padding-bottom: 10px;
}
.fecha-reserva input {
    width: 250px;
    height: 40px;
    padding: 6px 20px;
    text-align: center;
    display: block;
    margin: 24px 0 40px 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1em;
    font-weight: 600;
    border: 1px solid #CCCCCC;
    border-radius: 12px;
}
.reserva {
    align-items: center;
}
.container-columna-horas > label {
    font-size: 1.2em;
    font-weight: 600;
    padding-bottom: 10px;
}
.container-columna-horas {
    display: block;
    overflow-y: scroll;
    height: 310px;
    margin-bottom: 30px;
    margin-top: 20px;
    padding: 0 50px;
    border: 4px solid white;
    border-radius: 12px;
}
.container-columna-horas::-webkit-scrollbar {
    width: 1em;
    margin-left: 10px;
}
.container-columna-horas::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
.container-columna-horas::-webkit-scrollbar-thumb {
    background: var(--degradado1);
    outline: 2px solid white;
    border-radius: 12px;
}
.container-instrucciones {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    background: white;
    top: 20px;
    right: 6%;
    position: absolute;
    padding: 10px 0;
    border-radius: 12px;
    align-content: center;
    box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
}
.container-instrucciones:hover {
    background: grey;
}
.container-instrucciones p:hover {
    color:white;
}
.container-instrucciones > p {
    max-width: 200px;
    padding: 0 30px;
    margin-top: 8px;
    font-size: .9em;
    line-height: 1.4em;
}
.container-instrucciones > #infoIcon {
    color: var(--verde);
    font-size: 3em;
    padding: 14px 0 0 0;
    text-align: center;
}
.instrucciones-horarios {
    display: flex;
    justify-content: center;
    margin-top: -80px;
    background-color: #F2F2F2;
    padding-bottom: .6em;
}
.container-int-horarios {
    display: flex;
    text-align: center;
    flex-flow: column wrap;
}
.container-int-horarios:nth-child(2) {
    padding: 0 2.1em;
}
.container-int-horarios span {
    font-size: 2.6em;
    border: 1 solid black;
    margin-bottom: 0;
}
.container-int-horarios p {
    margin-top: -4px;
}
#cuadrado1 {
    color: var(--verde);
}
#cuadrado2 {
    color: var(--morado);
}
#cuadrado3 {
    color: var(--rojo);
}
.fondo {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: center;
}
select {
    font-weight: 600;
    font-size: 1em;
    width: 334px;
}
select option {
    font-weight: 600;
}
#date {
    font-weight: 600;
    font-size: 1.2em;
    padding-right: 10px;
    width: 300px;
}
.horarios {
    display: flex;
    flex-flow: column wrap;
    align-content: center;
}
.horarios input {
    display: none;
}
.horarios label {
    cursor: pointer;
    margin-top: 20px;
    padding-left: 38px;
    font-size: 1.1em;
    font-weight: 600;
}
.horarios label:before {
    width: 20px;
    height: 20px;
    content: "";
    margin-left: -3em;
    margin-top: 1px;
    position: absolute;
    background: var(--verde);
}
.horarios input:checked + label:after {
    transform: scale(1);
    opacity: 1;
}
.horarios label:after {
    background: var(--morado);
    transition: 0.3s;
    transform: scale(3.4);
    opacity: 0;
    width: 20px;
    height: 20px;
    content: "";
    z-index: 3;
    position: absolute;
    margin-left: -9.98em;
    margin-top: 1px;
}
.btnDeg {
    margin-top: 1.2em;
}
.container {
    margin-bottom: 3em;
    margin-top: -26px;
    z-index: 3;
}
label {
    text-align: center;
}
#hidden {
    display: none;
}
@media only screen and (max-width: 1000px){
    #infoZona {
        justify-content: flex-start;
        margin-top: 2em;
    }
    .container-instrucciones {
        position: relative;
        right: 0;
        top: 0;
        z-index: 3;
        padding-top: 0;
        margin-top: -40px;
        margin-bottom: 70px;
        clip-path: polygon(8% 0, 100% 0%, 92% 100%, 0% 100%);
        border: 3px solid var(--verde);
    }
    .container-instrucciones > p {
        max-width: 540px;
    }
    .container {
        margin-top: -40px;
    }
    .img-reserva {
        flex-flow: row wrap;
    }
}
@media only screen and (min-width: 560px) and (max-width: 700px){
    .container-horas {
        flex-flow: column wrap;
        column-gap: 0;
    }
    .container-columna-horas {
        height: 348px;
        width: 200px;
        margin-bottom: 30px;
        margin-top: 20px;
        padding: 0 60px;
        border: 3px solid white;
        border-radius: 12px;
    }
    #nombreZona {
        margin-top: 10px;
    }
    #comunidad {
        margin-top: 2px;
    }
    .img-reserva img {
        margin-top: 20px;
        width: 370px;
        height: 220px;
    }
    .container {
        padding: 1.6em 5.4em;
        margin: -40px;
    }
    .container-instrucciones {
        margin: 0 40px 80px 40px;
        z-index: 4;
    }
    .container-instrucciones > p {
        padding: 0 4em;
    }    
}

@media only screen and (min-width: 340px) and (max-width: 560px){
    #nombreZona {
        margin-top: 10px;
    }
    #comunidad {
        margin-top: 2px;
    }
    #backIcon {
        font-size: 3em;
        margin: 0;
    }
    .instrucciones-horarios{
        margin-top: 0px;
        padding: 0 0 4px 0;
    }
    .container-instrucciones {
        margin: -40px 30px 50px 30px;
        clip-path: inset(0 0 0 0);
    }
    .nav-atras {
        padding: 0 0 10px 0;
        background-color: white;
        box-shadow: rgba(117, 242, 174, 0.8) 0px 2px 4px,
         rgba(117, 242, 174, 0.4) 0px 7px 13px -3px,
         rgba(117, 242, 174, 0.6) 0px -3px 0px inset;
    }
    h1 {
        font-size: 1.6em;
    }
    h4 {
        font-size: 1.2em;
        line-height: 1.4em;
        background: var(--degradado1);
        padding: 10px 8px 10px 8px;
        margin: 0 12px 20px 12px;
        border-radius: 4% 4% 60% 60%;
        text-align: center;
    }
    .container {
        width: 68vw;
        margin-top: -38px;
    }
    .container-instrucciones > p {
        padding: 0 4em;
        margin-top: 6px;
        font-size: .9em;
    }    
    .img-reserva {
        flex-flow: column wrap;
        align-items: center;
        padding-bottom: 2em;
    }
    .img-reserva img {
        padding-top: 1em;
        width: 100vw;
        height: 100%;
        clip-path: inset(0 0 0 0);
    }
    .container-horas {
        flex-flow: column wrap;
    }
    .container-columna-horas {
        width: 150px;
        padding: 0 60px;
    }
    .container-columna-horas::-webkit-scrollbar {
        width: .8em;
        margin-left: 12px;
    }
    .container-columna-horas::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }
    .int-hora label p {
        font-size: 1.2em;
        margin-top: 2px;
    }
    .check-new {
        width: 30px;
        height: 30px;
    }
}
@media only screen and (min-width: 200px) and (max-width: 340px){
    .instrucciones-horarios {
        flex-flow: wrap column;
        margin-top: 0;
        padding-bottom: 0;
    }
    .container-int-horarios:nth-child(1) > p {
        margin-bottom: 6px;
    }
    #nombreZona {
        font-size: 1.4em;
        margin: 0 28px;
    }
    #comunidad {
        margin: 0 30px 20px 30px;
        font-size: .9em;
    }
    .container-instrucciones {
        clip-path: inset(0 0 0 0);
        margin: -30px 20px 80px 20px;
    }
    .img-reserva img {
        width: 100vw;
        height: 100%;
        clip-path: inset(0 0 0 0);
    }
    .nav-atras {
        background: var(--degradado1);
        box-shadow: none;
    }
    #backIcon {
        padding-top: 4px;
    }
    .container {
        width: 70vw;
    }
    .fecha-reserva h3,
    .reserva h3 {
        width: 70vw;
        font-size: 1.2em;
    }
    .fecha-reserva input {
        width: 64vw;
    }
    h4 {
        text-align: center;
    }
    .container-columna-horas {
        width: 135px;
        height: 276px;;
    }
    .container-columna-horas h4 {
        margin-top: 8px;
        margin-bottom: 16px;
    }
    .btnDeg {
        margin: 4px 0 12px 0;
        font-size: 1.7em;
        padding: .6em 1.2em;
    }
}
</style>