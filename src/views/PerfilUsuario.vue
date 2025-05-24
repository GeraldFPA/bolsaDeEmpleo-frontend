<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>Editar Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="profile-image-container">
        <ion-avatar class="profile-avatar">
          <img :src="fotoPerfil" alt="Foto de perfil" />
        </ion-avatar>
        <ion-button size="small" class="camera-button" @click="cambiarFoto">
          <ion-icon :icon="cameraOutline" />
        </ion-button>
      </div>

      <ion-list>
        <ion-item>
          <ion-label position="stacked">Nombre</ion-label>
          <ion-input v-model="nombre" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Apellidos</ion-label>
          <ion-input v-model="apellidos" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Sobre mí</ion-label>
          <ion-textarea v-model="sobreMi" placeholder="Escribe algo sobre ti" />
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Teléfono</ion-label>
          <ion-input v-model="telefono" type="tel" />
        </ion-item>
      </ion-list>

      <ion-button expand="block" fill="outline" class="action-button" @click="showConfirm = true">
        Cerrar Sesión
      </ion-button>

      <ion-alert
        :is-open="showConfirm"
        header="Confirmar"
        message="¿Estás seguro de que deseas cerrar sesión?"
        :buttons="[
          { text: 'Cancelar', role: 'cancel', handler: () => (showConfirm = false) },
          { text: 'Sí', handler: cerrarSesion }
        ]"
        @didDismiss="showConfirm = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonTextarea, IonAvatar,
  IonButton, IonBackButton, IonButtons, IonIcon, IonAlert
} from '@ionic/vue';
import { cameraOutline } from 'ionicons/icons';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();


const nombre = ref('Miguel');
const apellidos = ref('Santos');
const sobreMi = ref('IMBox');
const telefono = ref('+34 12345678');
const fotoPerfil = ref('https://via.placeholder.com/150'); // Imagen temporal

const showConfirm = ref(false);

const cambiarFoto = () => {
  alert('Función de cambiar foto no implementada.');
};

async function cerrarSesion() {
  try {
    const token = userStore.token;
    const API_URL = import.meta.env.VITE_API_URL; 

    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    userStore.clearUserData();
   
    router.push('/login');
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    alert('Hubo un error al cerrar sesión. Intenta nuevamente.');
  }
}
</script>

<style scoped>
.profile-image-container {
  display: flex;
  justify-content: center;
  position: relative;
  margin: 20px 0;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border: 2px solid var(--ion-color-primary);
}

.camera-button {
  position: absolute;
  bottom: 0;
  right: calc(50% - 30px);
  transform: translateX(50%);
  --border-radius: 50%;
  --padding-start: 4px;
  --padding-end: 4px;
}
</style>
