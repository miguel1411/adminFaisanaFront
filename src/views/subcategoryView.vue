<template>
  <div class="container-category">
    <navigatorVue />
    <h1 class="text-center text-2xl">Subcategorías</h1>
    <subcategories />
  </div>
</template>

<script setup>
import navigatorVue from '../components/navigator.vue';
import subcategories from '../components/forms/subcategories/subcategoryForm.vue'
</script>