<script setup>
  import { onMounted, ref } from 'vue'
  import addProduct  from './addProduct.vue';
  import updateProduct  from './updateProduct.vue';
  import { restaurantFunc, categoryFunc, subcategoryFunc } from '../../../routes/restaurant/functionsRestaurants'


  const actionsValue = ref();
  const restaurantValue = ref();
  const categoryValue = ref();
  const subcategorieValue = ref();
  const actions = ref([
    {
      value: 'agregar',
      label: 'Agregar',
    },
    {
      value: 'editar',
      label: 'Editar',
    },
  ]);
  
  let restaurants = ref([]);
  let categories = ref([]);
  let subcategories = ref([]);

  const getRestaurants = async() => {
    categories.value = [];
    subcategories.value = [];
    const request =  await restaurantFunc.getRestaurant();
    restaurants.value = [];
    restaurants.value.push(...request);
  };

  const getCategories = async() => {
    try {
      categories.value = [];
      categoryValue.value = null;
      subcategorieValue.value = null;
      const request =  await categoryFunc.getCategory(restaurantValue.value);
      const { data, status } = request;
      if (status === 200) {
        for (let i = 0; i < data.length; i++) {
          categories.value.push(data[i].Category);
        }
      }
      console.log('res', categories.value);
    } catch (error) {
      console.log('valor nulo desde category', error);
    }
  };

  const getSubcategories = async() => {
    try {
      subcategories.value = [];
      const request =  await subcategoryFunc.getSubategory(restaurantValue.value, categoryValue.value);
      const { data, status } = request;
      if (status === 200) {
        for (let i = 0; i < data.length; i++) {
          subcategories.value.push(data[i].Subcategory);
        }
      }
    } catch (error) {
      console.log('valor nulo desde category', error);
    }
  };
</script>

<style>
.container-options-products {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>

<template>
  <div>
    <form action="POST">
      <div class="container-options-products">
        <div class="container-product-action">
          <label> Acción a realizar</label><br>
          <el-select
            v-model="actionsValue" 
            class="m-2"
            placeholder="Seleccionar"
            size="large"
            @change="getRestaurants()"
          >
            <el-option
              v-for="item in actions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="container-product-action" v-if="actionsValue != null">
          <label> Restaurante</label><br>
          <el-select
            v-model="restaurantValue"
            class="m-2"
            placeholder="Seleccionar"
            size="large"
            @change="getCategories()"
          >
            <el-option
              v-for="item in restaurants"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="container-product-action" v-if="restaurantValue != null">
        <label for="categoria">Categoría</label><br>
          <el-select
            v-model="categoryValue"
            class="m-2" placeholder="Select"
            size="large"
            @change="getSubcategories()"
          >
            <el-option v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="container-product-action" v-if="categoryValue != null">
          <label> Subcategoría</label><br>
          <el-select
            v-model="subcategorieValue"
            class="m-2"
            placeholder="Select"
            size="large"
          >
            <el-option
              v-for="item in subcategories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
    </form>
    <div class="agregar" v-if="actionsValue == 'agregar' && restaurantValue != null && categoryValue != null && subcategorieValue != null">
      <addProduct
        :restaurant = 'restaurantValue'
        :category="categoryValue"
        :subcategory="subcategorieValue"
      />
    </div>
    <div class="editar" v-if="actionsValue == 'editar' && restaurantValue != null && categoryValue != null && subcategorieValue != null">
      <updateProduct
        :restaurant = 'restaurantValue'
        :category="categoryValue"
        :subcategory="subcategorieValue"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
