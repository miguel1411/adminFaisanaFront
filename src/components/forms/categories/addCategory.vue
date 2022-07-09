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
})
const rules = reactive({
  name: [
    {
      required: true,
      message: 'Ingresar la descripcion',
      trigger: 'blur',
    },
  ],
});

const form = reactive({
  name: null,
  image: null,
});


const createProduct = async () => {
  try {
    const formData = new FormData();
    formData.append('file', form.image);
    formData.append('name', form.name);
    const request = await httpAxios.post(`/category/addcategory/${productProp.restaurant}`, formData);
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
        <label for="nombre" class="text-xl"> Nombre </label>
        <el-input v-model="form.name" id="nombew" />
      </el-form-item>
      <el-form-item>
        <div class="file-container">
          <div class="h-92 w-96">            
            <img :src="imgUrl" v-if="imgUrl" class="rounded-md"/>
          </div>
          <input
            type="file"
            id="avatar" name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            @input="onFileSelect"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <div  class="">
          <el-button type="warning" @click="createProduct()" v-if="form.name !== null && form.image !== null">Crear categoría</el-button>
        </div>
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
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
