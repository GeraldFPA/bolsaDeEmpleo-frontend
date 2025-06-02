<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Historial</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card v-if="esOfertante">
        <ion-card-header>
          <ion-card-title>Postulaciones Recibidas</ion-card-title>
        </ion-card-header>

        <ion-list>
          <ion-card v-for="postulacion in postulacionesRecibidas" :key="postulacion.id" color="light">
            <ion-card-header>
              <ion-card-title>{{ postulacion.user.name }} - {{ postulacion.oferta.puesto }}</ion-card-title>
              <ion-card-subtitle>{{ postulacion.created_at }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Email:</strong> {{ postulacion.user.email }}</p>
              <p><strong>Teléfono:</strong> {{ postulacion.telefono }}</p>
              <p><strong>Comentario:</strong> {{ postulacion.comentario }}</p>
              <ion-button :href="getCvUrl(postulacion)" download>
                Descargar CV
              </ion-button>
            </ion-card-content>
          </ion-card>
        </ion-list>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Mis Postulaciones</ion-card-title>
        </ion-card-header>

        <ion-list>
          <ion-card v-for="postulacion in misPostulaciones" :key="postulacion.id" color="secondary">
            <ion-card-header>
              <ion-card-title>{{ postulacion.puesto }} - {{ postulacion.empresa }}</ion-card-title>
              <ion-card-subtitle>Postulado el: {{ postulacion.fecha }}</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Estado:</strong> {{ postulacion.estado }}</p>
              <p><strong>Mensaje:</strong> {{ postulacion.mensaje || 'Sin mensaje adicional' }}</p>
            </ion-card-content>
          </ion-card>
        </ion-list>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonList
} from '@ionic/vue';
import { ref , onMounted} from 'vue';
import axiosInstance from '@/lib/axiosInstance';
import { useUserStore } from '@/stores/user';


const userStore = useUserStore();
const esOfertante = userStore.role === 'company';

const postulacionesRecibidas = ref([]);
const getCvUrl = (postulacion) => {
  return `${import.meta.env.VITE_API_URL}/cv/${postulacion.id}`; // Asume ruta para descargar
};
const cargarPostulacionesRecibidas = async () => {
  try {
    const response = await axiosInstance.get('/postulaciones/recibidas');
    console.log('Postulaciones cargadas:', response.data);
    console.log('Código de respuesta:', response.status);
    console.log('Headers de la respuesta:', response.headers);
    
    postulacionesRecibidas.value = response.data;
  } catch (error) {
    console.error('Error al obtener postulaciones:', error);
  }
};
onMounted(() => {
  if (esOfertante) {
    cargarPostulacionesRecibidas();
  }
});

const misPostulaciones = ref([
  {
    id: 1,
    puesto: 'Analista de Datos',
    empresa: 'DataCorp',
    fecha: '2025-04-30',
    estado: 'En revisión',
    mensaje: 'Estoy muy interesado en el puesto.'
  },
  {
    id: 2,
    puesto: 'Tester QA',
    empresa: 'SoftTech',
    fecha: '2025-04-28',
    estado: 'Aceptado',
    mensaje: null
  }
]);
</script>

<style scoped>
ion-card-title {
  font-size: 1.1rem;
}

ion-card-subtitle {
  font-size: 0.9rem;
  color: #666;
}

ion-card-content p {
  margin: 6px 0;
}
</style>