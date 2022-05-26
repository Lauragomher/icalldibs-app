<template>
  <div class="background-color-1" id="content">
    <h1 id="titular">ICallDibs</h1>
    <img class="logo" src="../assets/logo-icalldibs-web.svg" alt="Logo ICallDibs">
    <h2>Que <span class="destacado">no</span><br>te quiten<br>el sitio</h2>
    <router-link to="/login">
      <button class="boton">ENTRAR</button>
    </router-link>
  </div>
</template>

<script>
export default {
 name: "Home-page"
}
</script>

<style>
#app {
    margin: -10px;
    height: 100vh;
}
.background-color-1 {
    height: 100%;
    background-image: linear-gradient( rgba(117, 242, 175, 0.9), rgba(117, 246, 247, 0.9));
    background-color: var(--verde);
    animation: gradientAnim 16s ease infinite alternate;
    padding: 0 0 0 0;
}
@keyframes gradientAnim {
  10% {
    background: var(--degradado1);
  }
  40% {
    background: var(--degradado2);
  }
  70% {
    background: linear-gradient(to bottom, #75F2AF, #FFF2AE);
  }
  100% {
    background: var(--degradado1);
  }
}
.logo {
    width: 124px;
}
#titular {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
  font-size: 70px;
  -webkit-text-stroke:3px black;
  -webkit-text-fill-color:transparent;
  line-height: 0px;
  padding: 1em 0 0 0;
  margin: 0px 0px 46px 0px;
  letter-spacing: 2px;
}
h2 {
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  font-size: 32px;
  line-height: 42px;
  margin-top: .5em;
  text-align: center;
}
.destacado {
  background-color: black;
  padding: .1px 4px;
}
.boton {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  font-size: 1.4em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.boton:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    var(--amarillo),
    var(--verde),
    var(--azul),
    #002bff,
    var(--morado),
    #ff00c8,
    var(--rojo)
  );
  position: absolute;
  top: -4px;
  left: -4px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  animation: glowing-button 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px;
}
@keyframes glowing-button {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.boton:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}
</style>