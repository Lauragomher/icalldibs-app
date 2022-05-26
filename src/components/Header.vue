<template>
    <div class="nav-app">
        <router-link to="#" id="tipografia">
            <img id="logoTypo" src="../assets/logo-typo-icalldibs.png" alt="Logo tipográfico ICallDibs">
        </router-link>
        <router-link to="/dashboard">
            <img id="iconoNav" src="../assets/icono-home.svg" alt="Icono de home">
        </router-link>
        <router-link to="/areas-comunes">
            <img id="iconoNav" src="../assets/icono-reserva.svg" alt="Icono de zonas comunes">
        </router-link>
        <router-link to="/mis-reservas">
            <img id="iconoNav" src="../assets/icono-misreservas.svg" alt="Icono de mis reservas">
        </router-link>
        <router-link to="/" v-on:click="logout">
            <img id="iconoNav" src="../assets/icono-salir.svg" alt="Icono de salir o cerrar sesión">
        </router-link>
    </div>
</template>

<script>
export default {
    name: "Header-app",
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({name:"Home-page"});
        },
    },
}
</script>

<style scoped>
.nav-app {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    padding: 10px;
    background: var(--degradado1);
}
.nav-app > router-link {
    cursor: pointer;
}
.nav-app a:hover {
    background-color: rgb(117,246,247,.8);
    border-radius: 15px;
}
#logoTypo {
    margin-top: 10px;
    width: 9.4em;
}
#iconoNav {
    width: 3.8em;
}
@media screen and (max-width: 460px) {
    #tipografia {
        display: none;
    }
}
@media screen and (max-width: 360px) {
    #iconoNav {
        width: 3.4em;
    }
}
</style>