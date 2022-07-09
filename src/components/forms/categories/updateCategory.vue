<script setup>
import axios from 'axios';
import { httpAxios } from '../../../main';
import { reactive, ref, onMounted, watch } from 'vue'
import { ElNotification } from 'element-plus'

const imgSelected = ref();
const imgUrl = ref();

const success = () => {
  ElNotification({
    title: 'Producto',
    message: 'Producto agregado con éxito',
    type: 'success',
  });
};

const productProp = defineProps({
  restaurant: {
    type: Number,
  },
  category : {
    type: Number,
  },
  subcategory : {
    type: Number,
  },
});

const onFileSelect = (event) => {
  console.log('file', event.target.files[0]);
  if (event.target.files.length === 0) {
    imgSelected.value = "";
    imgUrl.value = "";
    return;
  }
  form.image = event.target.files[0];
  imgSelected.value = event.target.files[0];
}

watch(imgSelected, (imgSelected) => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(imgSelected);
  fileReader.addEventListener("load", () => {
    imgUrl.value = fileReader.result;
  });
})

const form = reactive({
  name: 'miguel',
  price: 60,
  description: 'mayonesa',
  ingredient: 'mayonesa',
  image: null,
})

const createProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('file', form.image);
    formData.append('name', form.name);
    formData.append('price', form.price.toFixed());
    formData.append('description', form.description);
    formData.append('ingredient', form.ingredient);
    const request = await httpAxios.post(`/product/addProductFinal/${productProp.restaurant}/${productProp.category}/${productProp.subcategory}`, formData);
    if(request.status == 204) {
      success();
    }
  } catch (error) {
    console.log(error);
  }
}

const products = async() => {
  try {
    const request = httpAxios.get('');
    
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="form-add-restaurant">
    <div class="buscador-producto">
      <el-row>
        <el-col
          v-for="(o, index) in 2"
          :key="o"
          :span="8"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>Yummy hamburger</span>
              <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">Operating</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-form
      action="POST"
      ref="ruleFormRef"
      enctype="multipart/form-data"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item>
        <label for="nombre"> Nombre </label>
        <el-input v-model="form.name" id="nombew" />
      </el-form-item>
      <el-form-item>
        <label for="precio"> Precio</label>
        <el-input v-model="form.price" id="nombew" />
      </el-form-item>
      <el-form-item>
        <label for="precio"> Ingredientes</label>
        <el-input v-model="form.ingredient" id="nombew" />
      </el-form-item>
      <el-form-item>
        <label for="descripcion"> Descripcion </label>
        <el-input v-model="form.description" id="nombew" />
      </el-form-item>
      <el-form-item>
        <div class="file-container">
          <div class="image-container" :style="`background-image: url(${imgUrl})`" v-show="imgUrl" />
          <input
            type="file"
            id="avatar" name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            @input="onFileSelect"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="createProduct()">Editar producto</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style  scoped>
.form-add-restaurant {
  margin-top: 30px;
}
.file-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
.image-container {
  /* height: 200px;
  width: 200px; */
  /* border-radius: 15px; */
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
