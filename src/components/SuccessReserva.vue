<template>
  <div class="bg-color">
    <div class="container-ty-page">                 
      <h1>Enhorabuena, tu reserva se ha realizado con éxito</h1>
      <span class="material-icons" id="checkmark">
      done
      </span>
      <h3>Puedes revisarla o cancelarla en <b>mis reservas</b></h3>
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
  name: "Success-reserva",
}
</script>

<style scoped>
.container-ty-page {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  margin-top: 20px;
  align-items: center;
  padding: 0 5em;
}
h1 {
  text-align: center;
  line-height: 1.6em;
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
  font-size: 4.4em;
  background-image: var(--degradado1);
  border-radius: 50%;
  padding: 14px;
  margin: 4px 0 10px 0;
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
@media  only screen and (max-width: 950px) {
  .bg-color {
    height: fit-content;
  }
}
@media  only screen and (max-width: 600px) {
  h1 {
    font-size: 1.6em;
    line-height: 1.4em;
  }
  .container-btn {
    gap: 1em;
    flex-flow: wrap column;
  }
  .btnDeg {
    margin: .6em .4em .6em .4em;
    font-size: 1.2em;
    max-width: 8em;
    flex-flow: column wrap;
    align-content: center;
    gap: 10px;
  }
  #checkmark {
    font-size: 3em;
    margin: 2px 0 16px 0;
  }
}
</style>