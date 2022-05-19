<template>
  <div class="nav-container">
    <div class="nav-toggle"></div>
    <router-link to="#">
      <img id="logoAdmin" src="../assets/icalldibs-admin-logo-tipo.png" alt="Logo tipográfico ICallDibs Admin">
    </router-link>  
    <nav class="nav-items">
      <router-link class="nav-item" to="/dashboard-admin">
        <img id="iconoNavAdmin" src="../assets/icono-home.svg" alt="Icono de home">
        <p>Dashboard</p>
      </router-link>
      <router-link class="nav-item" to="/gestion-usuarios">
        <img id="iconoNavAdmin" src="../assets/icono-usuario.svg" alt="Icono de usuario">
        <p>Gestión <br>de usuarios</p>
      </router-link>
      <router-link class="nav-item" to="/gestion-comunidades">
        <img id="iconoNavAdmin" src="../assets/icono-comunidades.svg" alt="Icono de comunidades">
        <p>Gestión <br>de comunidades</p>
      </router-link>
      <router-link class="nav-item" to="/gestion-zonas-comunes">
        <img id="iconoNavAdmin" src="../assets/icono-reserva.svg" alt="Icono de zona comun">
        <p>Gestión <br>de zonas comunes</p>
      </router-link>
      <router-link to="/" class="nav-item" v-on:click="logout">
        <img id="iconoNavAdmin" src="../assets/icono-salir.svg" alt="Icono de salir o cerrar sesión">
        <p>Cerrar sesión</p>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header-admin2",
  methods: {
    logout() {
      localStorage.clear();
    },     
  },
    mounted () {
      const nav = document.querySelector(".nav-container");
      if (nav) {
        const toggle = nav.querySelector(".nav-toggle");
        if (toggle) {
          toggle.addEventListener("click", () => {
            if (nav.classList.contains("is-active")) {
              nav.classList.remove("is-active");
            }
            else {
              nav.classList.add("is-active");
            }
          });
          nav.addEventListener("blur", () => {
            nav.classList.remove("is-active");
          });
        }
      }
  },
}
</script>

<style scoped>
router-link {
    cursor: pointer;
}
#logoAdmin {
  width: 14.6em;
  padding: 2px 16px 0 0;
}
p {
  text-align: center;
  margin: 0;
  padding: 0 0 0 10px;
}
#iconoNavAdmin {
  width: 2.8em;
}
.nav-container {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    overflow: visible;
    outline: none;
    background: var(--degradado1);
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav-container.is-active .nav-toggle:before, .nav-container.is-active .nav-toggle:after {
  box-shadow: none;
}
.nav-container.is-active .nav-toggle:before {
  transform: rotate(-45deg);
}
.nav-container.is-active .nav-toggle:after {
  transform: rotate(45deg);
}
.nav-container.is-active .nav-items {
  transform: translate(0, 0);
}
.nav-container .nav-toggle {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0px 1px 6px 14px;
  z-index: 2;
}
.nav-container .nav-toggle:hover {
  cursor: pointer;
}
.nav-container .nav-toggle:before, .nav-container .nav-toggle:after {
  content: "";
  position: absolute;
  top: 18px;
  left: 0;
  transform: translate(0, 0);
  width: 100%;
  height: 4px;
  background: black;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.nav-container .nav-toggle:before {
  box-shadow: 0 13.3333333333px 0 0 black;
}
.nav-container .nav-toggle:after {
  box-shadow: 0 -13.3333333333px 0 0 black;
}
.nav-container .nav-items {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 250px;
  max-width: 18vw;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  font-size: 1em;
  padding: 60px 14px 20px 10px;
  transition: transform 0.3s ease;
  transform: translate(calc(-100% - 50px), 0);
  background: rgba(255,255,255);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4px 0;
  align-content: start;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
}
.nav-container .nav-items .nav-item {
  padding: 10px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.nav-container .nav-items .nav-item:hover {
  cursor: pointer;
  background: rgba(130,130,130, .8);
  color: whitesmoke;
  text-decoration: none;
}
</style>