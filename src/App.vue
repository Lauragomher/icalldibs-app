<template>
  <router-view />
</template>

<script>
export default {
 name: "App",
 components: {

 }
}
</script>

<style>
:root {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  --verde: #75F2AE;
  --azul: #75F6F7;
  --amarillo: #FFF2AE;
  --morado: #976EFF;
  --violeta: #CAB9FC;
  --rojo: #FF7A6E;
  --degradado1: linear-gradient(to bottom, var(--verde), var(--azul));
  --degradado2: linear-gradient(to bottom, var(--violeta), var(--verde));
  --degradado3: linear-gradient(to right, var(--amarillo), var(--verde));
  --degradado2inv: linear-gradient(to top, var(--violeta), var(--verde));
  --degradado1b: linear-gradient(45deg, black 0% 40%, var(--verde) 100%);
  --degradado1w: linear-gradient(45deg, black 0% 60%, var(--verde) 100%);
}
#app {
  margin: 0;
  padding: 0;
}
.logo {
  width: 100px;
}
.login, .registro, .add-servicio, .reserva {
  display: flex;
  flex-direction: column;
}
.login input, .registro input, .add-servicio input, .reserva input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 15px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
}
.reserva select {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 15px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #CCCCCC;
  border-radius: 10px;
}
.background-color-1 {
  background: var(--degradado1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  border: 0 solid;
  border-radius: 30px;
  padding: 30px 50px 30px 50px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 3px 8px;
}
.btnDeg {
    background: var(--degradado1);
    color:black;
    border-radius: 10px;
    font-weight: bold;
    font-size: 28px;
    border: 0 solid;
    margin: 10px 0 20px 0px;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
}
.btnDeg:hover {
  color: #fff;
  background: var(--violeta);
}
.material-icons {
    font-family: "Material Icons";
    font-size: 3.6em;
}
</style>
