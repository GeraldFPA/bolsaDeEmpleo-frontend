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
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const router = useRouter();
const email = ref('');
const password = ref('');

async function login() {
  try {
  const API_URL = import.meta.env.VITE_API_URL; // importar la URL de la API desde el archivo .env


    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Para ver el error crudo
      console.error('Código:', response.status, 'Detalle:', errorBody);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('Código de respuesta:', response.status);
    console.log('Respuesta del backend:', data);
   
    userStore.setUserData({
      token: data.access_token,
      role: data.role,
      id: data.id,
    });
  

    router.push('/home');
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    alert('Correo o contraseña incorrectos.');
  }
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