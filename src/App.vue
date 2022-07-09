<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navigatorVue from './components/navigator.vue';
</script>

<template>
  <div style="color: #fff; text-align:center">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/jmlogo.png" width="125" height="125" />
    </header>
    <h3>
      Sistema de gestión de contenido 
    </h3>
  </div>
  <!-- <navigatorVue /> -->
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

.logo {
  align-self: center;
}

.wrapper {
  margin-bottom: 50px;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  max-height: 100vh;
  justify-content: center;
}

a,
.green {
  text-decoration: none;
  color: rgb(247, 247, 247);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(0, 0%, 100%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
