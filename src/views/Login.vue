<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Iniciar Sesión</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-container">
        <h2 class="login-title">Bienvenido a JobConnect</h2>
        <ion-item>
          <ion-label position="stacked">Correo Electrónico</ion-label>
          <ion-input type="email" v-model="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Contraseña</ion-label>
          <ion-input type="password" v-model="password"></ion-input>
        </ion-item>


        <ion-button expand="block" class="action-button" @click="login">Iniciar Sesión</ion-button>
        <ion-button expand="block" fill="outline" class="action-button" @click="register">Registrarse</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/lib/axiosInstance';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const email = ref('');
const password = ref('');

async function login() {
  try {


    const response = await axiosInstance.post('/login', {
        email: email.value,
        password: password.value
      });


    console.log('Código de respuesta:', response.status);

    console.log('Respuesta del backend:', response.data);

    userStore.setUserData({
      token: response.data.access_token,
      role: response.data.role,
      id: response.data.id,
    });

   clearValues();

    router.push('/home');
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    alert('Correo o contraseña incorrectos.',error.message);
  }

}
function clearValues() {
  email.value = '';
  password.value = '';
}

function register() {
  router.push('/RegistrarUsuario');
}


</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: var(--ion-color-light);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 1.6rem;
  color: var(--ion-color-primary);
}

ion-item {
  font-size: 1.2rem;
  margin-bottom: 16px;
}

ion-input {
  font-size: 0.8rem;
}

.action-button {
  margin-top: 12px;
}

@media (max-width: 480px) {
  .login-container {
    margin: 20px;
    padding: 16px;
  }
}
</style>