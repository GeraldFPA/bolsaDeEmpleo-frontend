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
          <ion-card-title>Mis ofertas</ion-card-title>
        </ion-card-header>

        <ion-list>
          <ion-card v-for="ofertas in misOfertas" :key="ofertas.id" color="light">
            <ion-card-header>
              <ion-card-title>{{ ofertas.puesto }} - {{ ofertas.categoria }}</ion-card-title>
              <ion-card-subtitle>
                Oferta creada el: {{ new Date(ofertas.created_at).toLocaleDateString('es-CR') }}
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Sueldo:</strong> {{ ofertas.sueldo }}</p>
              <p><strong>Contrato:</strong> {{ ofertas.contrato }}</p>
              <p><strong>Descripción:</strong> {{ ofertas.descripcion }}</p>
              <ion-button color="secondary" size="small"
                @click="$router.push({ name: 'Postulaciones', query: { ofertaId: ofertas.id } })">
                Ver Postulaciones
              </ion-button>
            </ion-card-content>
          </ion-card>
        </ion-list>
      </ion-card>

      <ion-card v-if="!esOfertante">
        <ion-card-header>
          <ion-card-title>Mis postulaciones</ion-card-title>
        </ion-card-header>

        <ion-list>
          <ion-card v-for="postulacion in misPostulaciones" :key="postulacion.id" color="secondary">
            <ion-card-header>
              <ion-card-title>{{ postulacion.oferta.puesto }} - {{ postulacion.oferta.empresa }}</ion-card-title>
              <ion-card-subtitle>
                Postulado el: {{ new Date(postulacion.created_at).toLocaleDateString('es-CR') }}

              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Estado:</strong> {{ postulacion.estado }}</p>
              <p><strong>Mensaje:</strong> {{ postulacion.comentario || 'Sin mensaje adicional' }}</p>
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
import { ref, onMounted } from 'vue';
import axiosInstance from '@/lib/axiosInstance';
import { useUserStore } from '@/stores/user';
import { car } from 'ionicons/icons';


const userStore = useUserStore();
const esOfertante = userStore.role === 'company';
const idUsuario = userStore.id;
const misOfertas = ref([]);
const misPostulaciones = ref([]);


const cargarOfertas = async () => {
  try {
    const response = await axiosInstance.get(`/ofertas/${idUsuario}`);
    console.log('Ofertas cargadas:', response.data);
    console.log('Código de respuesta:', response.status);
    console.log('Headers de la respuesta:', response.headers);
    misOfertas.value = response.data;


  } catch (error) {
    console.error('Error al obtener ofertas:', error);
  }
};
const cargarPostulaciones = async () => {
  try {
    const response = await axiosInstance.get(`/postulaciones/hechas/${idUsuario}`);
    console.log('Postulaciones cargadas:', response.data);
    console.log('Código de respuesta:', response.status);
    console.log('Headers de la respuesta:', response.headers);
    misPostulaciones.value = response.data;
  } catch (error) {
    console.error('Error al obtener postulaciones:', error);
  }
};

onMounted(() => {
  if (esOfertante) {
    cargarOfertas();
  } else {
    cargarPostulaciones();
  }
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