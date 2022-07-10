<script setup>
import navigatorVue from '../components/navigator.vue';
import productForm from '../components/forms/products/productsForm.vue'
</script>

<template>
  <div class="container-product">
    <navigatorVue />
      <h1 class="text-center text-2xl">Productos</h1>
      <div class="about">
        <productForm />
      </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
