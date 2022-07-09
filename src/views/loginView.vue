<script setup>
import { reactive } from 'vue'
import { httpAxios } from '../main';
import { useAuth } from '../stores/auth';
import router from '../router'

const authStore = useAuth();

// do not use same name with ref
const form = reactive({
  email: '',
  password: '',
});

// const login = async () => {
//   const isCorrect = await httpAxios.post('/auth/login', {
//     email: form.email,
//     password: form.password,
//   });
//   if (isCorrect.data) {
//     const { data } = isCorrect;
//     localStorage.setItem('faisanaInfo', JSON.stringify(data));
//     router.push('/');
//   }
// }

const login = async () => {
  await authStore.loginStore(form.email, form.password);
}
</script>

<template>
  <div class="login-container">
    <el-form class="formulario-login">
      <el-form-item>
        <label for="email">Correo</label>
        <el-input
          v-model="form.email"
          id="email"
          placeholder="Ingresar Correo"
        />
      </el-form-item>
      <el-form-item>
        <label for="password">Contraseña</label>
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Ingresar Contraseña"
          show-password
          id="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="login()">Iniciar sessión</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-direction: column;
  }
  .formulario-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  label {
    color: #fff;
  }
</style>