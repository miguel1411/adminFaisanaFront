import { defineStore } from 'pinia'
import { httpAxios } from '../main';
import router from '../router';

export const useAuth = defineStore({
  id: 'auth',
  state: () => ({
    isLoged: false,
  }),
  actions: {
    async loginStore(emailStore, passwStore) {
      const isCorrect = await httpAxios.post('/auth/login', {
        email: emailStore,
        password: passwStore,
      });
      if (isCorrect.data) {
        const { data } = isCorrect;
        this.isLoged = true;
        await localStorage.setItem('isloged', JSON.stringify(this.isLoged));
        await localStorage.setItem('faisanaInfo', JSON.stringify(data));
        router.push('/');
      }
    }
  }
})
