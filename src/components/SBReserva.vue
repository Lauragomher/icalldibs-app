<template>
  <div class="bg-color">
    <div class="container-ty-page">                 
      <h1>Tu reserva se ha <span id="destacar">eliminado</span> con éxito</h1>
      <span class="material-icons" id="checkmark">
      delete_forever
      </span>
      <h3>Puedes hacer una nueva reserva en <b>mis reservas</b></h3>
      <div class="container-btn">
        <router-link to="/mis-reservas">
          <button class="btnDeg">Ir a mis reservas
            <span class="material-icons">
            event_available
            </span>          
          </button>
        </router-link>
        <router-link to="/areas-comunes">
          <button class="btnDeg">Volver a zonas comunes
            <span class="material-icons">
            maps_home_work
            </span>
          </button>
        </router-link>
        <router-link to="/dashboard">
          <button class="btnDeg">Ir a dashboard
            <span class="material-icons">
            mode_of_travel
            </span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success-borrar-reserva",
}
</script>

<style scoped>
.container-ty-page {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  margin-top: 40px;
  align-items: center;
  padding: 0 5em;
}
h1 {
  text-align: center;
  line-height: 1.6em;
}
#destacar {
  background-color: white;
  padding: 4px 8px;
}
h3 {
  font-weight: 400;
  font-size: 1.5em;
  line-height: 1.6em;
  margin-bottom: 1.2em;
  text-align: center;
}
.bg-color {
  margin-top: -40px;
  padding-top: 30px;
  background: var(--degradado2);
  height: 100%;
}
.container-btn {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.material-icons {
  font-size: 1.6em;
  color: black;
  margin-left: 10px;
}
.material-icons:hover {
  color: var(--verde);
}
#checkmark {
  font-size: 4em;
  background-color: var(--rojo);
  border-radius: 50%;
  padding: 14px;
  margin: 10px 0 10px 0;
}
#checkmark:hover {
  color: black;
}
a {
  text-decoration: none;
}
p {
  font-size: 1.1em;
}
.btnDeg {
  padding: 16px 30px;
  display: flex;
  background: white;
  align-items: center;
  margin: .6em .8em;
  font-size: 1.5em;
}
.btnDeg:hover {
  background: var(--morado);
}
@media  only screen and (max-width: 900px) {
  .bg-color {
    height: fit-content;
  }
}
@media  only screen and (max-width: 600px) {
  .btnDeg {
    margin: .4em 0 1.6em 0;
  }
}
</style>