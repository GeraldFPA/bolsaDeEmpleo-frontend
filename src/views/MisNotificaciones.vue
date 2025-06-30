<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Notificaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card >
        <ion-card-header>
          <ion-card-title>Mis notificaciones</ion-card-title>
        </ion-card-header>

        <ion-list>
          <ion-card v-for="notificaciones in misNotificaciones" :key="notificaciones.id" color="success">
            <ion-card-header>
              <ion-card-title>{{ notificaciones.tipo }} </ion-card-title>
              <ion-card-subtitle>
                Aceptada el: {{ new Date(notificaciones.created_at).toLocaleDateString('es-CR') }}
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Mensaje:</strong> {{ notificaciones.mensaje }}</p>
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
  IonCardContent, IonList, IonButton, onIonViewDidEnter
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axiosInstance from '@/lib/axiosInstance';
import { useUserStore } from '@/stores/user';
import { car } from 'ionicons/icons';


const userStore = useUserStore();
const esOfertante = userStore.role === 'company';
const idUsuario = userStore.id;
const misNotificaciones = ref([]);


const cargarNotificaciones = async () => {
  try {
    const response = await axiosInstance.get(`/notificaciones/misnotificaciones`);
    console.log('Ofertas cargadas:', response.data);
    console.log('Código de respuesta:', response.status);
    console.log('Headers de la respuesta:', response.headers);
    misNotificaciones.value = response.data;


  } catch (error) {
    console.error('Error al obtener ofertas:', error);
  }
};


onIonViewDidEnter(async () => {

  await cargarNotificaciones();

}); 


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