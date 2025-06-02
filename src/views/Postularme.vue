<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/BuscarEmpleos"></ion-back-button>
        </ion-buttons>
        <ion-title>Postularme</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Formulario de Postulación</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Nombre completo</ion-label>
            <ion-input v-model="nombre" type="text" class="input-pequeno" required />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Correo electrónico</ion-label>
            <ion-input v-model="email" type="email" class="input-pequeno" required />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Teléfono</ion-label>
            <ion-input v-model="telefono" type="tel" class="input-pequeno" required />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Currículum (PDF)</ion-label>
            <input type="file" accept="application/pdf" @change="handleFileUpload" class="file-input input-pequeno" />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Comentario / Motivación</ion-label>
            <ion-textarea v-model="comentario" rows="4" class="input-pequeno" />
          </ion-item>

          <ion-button expand="block" color="secondary" class="ion-margin-top" @click="enviarPostulacion">
            Enviar Postulación
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref , onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonTextarea, IonButton,
  IonBackButton, IonButtons
} from '@ionic/vue';
import axiosInstance from '@/lib/axiosInstance';
import { useUserStore } from '@/stores/user';


const router = useRouter();
const route = useRoute();
const nombre = ref('');
const email = ref('');
const telefono = ref('');
const comentario = ref('');
const cvFile = ref(null);
const idOferta = ref(null);

const handleFileUpload = (event) => {
  cvFile.value = event.target.files[0];
};

const enviarPostulacion = async () => {
  if (!nombre.value || !email.value || !telefono.value) {
    alert('Por favor completa los campos obligatorios.');
    return;
  }

  const formData = new FormData();
  formData.append('nombre', nombre.value);
  formData.append('email', email.value);
  formData.append('telefono', telefono.value);
  formData.append('comentario', comentario.value);
  formData.append('cv', cvFile.value);
  formData.append('oferta_id', idOferta.value); // debes obtener el ID de la oferta

  try {
    await axiosInstance.post('/postular', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    alert('¡Postulación enviada con éxito!');
    router.push('/BuscarEmpleos');
  } catch (error) {
    console.error('Error al enviar postulación:', error);
    alert('Hubo un error al enviar tu postulación.');
  }
};
onMounted(() => {
  idOferta.value = route.query.ofertaId ?? null;

  if (!idOferta.value) {
    console.warn('⚠️ No se recibió el ID de la oferta. Redireccionando o mostrando error...');
    // Puedes redirigir o mostrar una alerta
  }
  console.log('ID de oferta recibido:', idOferta.value);
});
</script>

<style scoped>
ion-card-title {
  font-size: 1.1rem;
  color: var(--ion-color-primary);
}

.custom-item {
  margin-bottom: 16px;
}

.label-grande {
  font-size: 1.50rem;
  font-weight: 500;
}

.input-pequeno {
  font-size: 0.9rem;
}

.file-input {
  padding: 12px 8px;
  font-size: 0.9rem;
  width: 100%;
}
</style>