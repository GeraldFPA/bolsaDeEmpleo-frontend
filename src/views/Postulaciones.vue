<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/HistorialUsuario"></ion-back-button>
                </ion-buttons>
                <ion-title>Postulantes</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-card v-for="postulacion in postulacionesRecibidas" :key="postulacion.id" color="light">
                    <ion-card-header>
                        <ion-card-title>{{ postulacion.nombre }} - {{ postulacion.oferta.puesto }}</ion-card-title>
                        <ion-card-subtitle>
                            Postulado el: {{ new Date(postulacion.created_at).toLocaleDateString('es-CR') }}
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <p><strong>Email:</strong> {{ postulacion.email }}</p>
                        <p><strong>Teléfono:</strong> {{ postulacion.telefono }}</p>
                        <p><strong>Comentario:</strong> {{ postulacion.comentario || 'Sin comentario' }}</p>

                        <div class="acciones">
                            <ion-button :href="getCvUrl(postulacion)" download>
                                Descargar CV
                            </ion-button>
                            <ion-button color="success" @click="aceptarPostulante(postulacion.id)"
                                :disabled="postulacion.estado === 'aceptada'">
                                {{ postulacion.estado === 'aceptada' ? 'Postulante Aceptado' : 'Aceptar postulante' }}
                            </ion-button>
                            <p v-if="postulacion.estado === 'aceptada'" class="mensaje-aceptado">
                                Este postulante ya fue aceptado.
                            </p>
                        </div>
                    </ion-card-content>
                </ion-card>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script setup>
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonList,
    onIonViewDidEnter, IonButton
} from '@ionic/vue';
import { useRoute } from 'vue-router';
const route = useRoute();
import { ref, onMounted } from 'vue';
import axiosInstance from '@/lib/axiosInstance';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const esOfertante = userStore.role === 'company';
const idOferta = ref(null);
idOferta.value = route.query.ofertaId;


const postulacionesRecibidas = ref([]);
const getCvUrl = (postulacion) => {
    return `${import.meta.env.VITE_API_URL}/cv/${postulacion.id}`;
};
const cargarPostulacionesRecibidas = async () => {
    try {
        const response = await axiosInstance.get(`/postulaciones/recibidas/${idOferta.value}`);
        console.log('Postulaciones cargadas:', response.data);
        console.log('Código de respuesta:', response.status);
        console.log('Headers de la respuesta:', response.headers);

        postulacionesRecibidas.value = response.data;
    } catch (error) {
        console.error('Error al obtener postulaciones:', error);
    }
};
const aceptarPostulante = async (idPostulacion) => {
    try {
        const response = await axiosInstance.post(
            `/postulaciones/aceptar/${idPostulacion}/${idOferta.value}`
        );

        console.log('Postulante aceptado:', response.data);

        await cargarPostulacionesRecibidas();

        alert('Postulante aceptado correctamente.');

    } catch (error) {
        console.error('Error al aceptar postulante:', error);
        alert('Hubo un error al aceptar al postulante.');
    }
};
onIonViewDidEnter(() => {
    if (esOfertante) {
        cargarPostulacionesRecibidas();
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

.acciones {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}
.mensaje-aceptado {
  color: green;
  font-weight: 500;
  margin-top: 6px;
}
</style>