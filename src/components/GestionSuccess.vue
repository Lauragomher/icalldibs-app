<template>
  <div class="bg-color">
    <div class="container-ty-page">                 
      <h1>Enhorabuena, operación realizada con éxito</h1>
      <span class="material-icons" id="checkmark">
      done
      </span>
      <div class="container-btn">
        <router-link to="/dashboard-admin">
          <button class="btnDeg">Ir al dashboard
            <span class="material-icons">
            mode_of_travel
            </span>
          </button>
        </router-link>
        <router-link to="/gestion-zonas-comunes">
          <button class="btnDeg">Gestionar zonas comunes
            <span class="material-icons">
            event_available
            </span>          
          </button>
        </router-link>
        <router-link to="/gestion-usuarios">
          <button class="btnDeg">Gestionar usuarios
            <span class="material-icons">
            maps_home_work
            </span>
          </button>
        </router-link>
        <router-link to="/gestion-comunidades">
          <button class="btnDeg">Gestionar comunidades
            <span class="material-icons">
            maps_home_work
            </span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success-gestion",
}
</script>

<style scoped>
.container-ty-page {
  display: flex;
  flex-flow: column wrap;
  align-content: center;
  margin-top: 30px;
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
  height: 100vh;
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
  font-size: 5em;
  background-image: var(--degradado1);
  border-radius: 50%;
  padding: 14px;
  margin: 8px 0 30px 0;
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