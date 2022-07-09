<script setup>
import { httpAxios } from '../../../main';
import { reactive, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'

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

const formSize = ref('default');

const imgSelected = ref();
const imgUrl = ref();

const onFileSelect = (event) => {
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
});

const rules = reactive({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 55, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  price: [
    {
      required: true,
      message: 'Ingresar el precio',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: 'Ingresar la descripcion',
      trigger: 'blur',
    },
  ],
  ingredient: [
    {
      required: true,
      message: 'Ingresar los ingredientes',
      trigger: 'blur',
    },
  ],
});

const form = reactive({
  name: '',
  price: null,
  description: '',
  ingredient: '',
  image: null,
  gallery: null,
})


const createProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('file', form.image);
    formData.append('files', form.gallery);
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('ingredient', form.ingredient);
    const request = await httpAxios.post(`/product/addProductFinal/${productProp.restaurant}/${productProp.category}/${productProp.subcategory}`, formData);
    if(request.status == 201) {
      success();
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="form-add-restaurant">
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
        <el-input v-model="form.name" id="nombre" />
      </el-form-item>
      <el-form-item>
        <label for="precio"> Precio</label>
        <el-input v-model="form.price" id="nombre" />
      </el-form-item>
      <el-form-item>
        <label for="precio"> Ingredientes</label>
        <el-input v-model="form.ingredient" id="nombre" />
      </el-form-item>
      <el-form-item>
        <label for="descripcion"> Descripcion </label>
        <el-input v-model="form.description" id="nombre" />
      </el-form-item>
      <h4>Imagen de portada</h4>
      <el-form-item class="flex flex-col">
        <div class="file-container">
          <div class="h-92 w-96">            
            <img :src="imgUrl" v-if="imgUrl" class="rounded-md"/>
          </div>          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            @input="onFileSelect"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="createProduct()">Crear producto</el-button>
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
  gap: 
  20px;
}

.file-container-multiple {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 
  20px;
}
.image-container {
  /* height: 200px;
  width: 200px; */
  /* border-radius: 15px; */
  background-size: contain;
  background-repeat: no-repeat;
}
</style>