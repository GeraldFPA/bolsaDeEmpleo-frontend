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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonTextarea, IonButton,
    IonBackButton, IonButtons
  } from '@ionic/vue';
  
  const router = useRouter();
  const nombre = ref('');
  const email = ref('');
  const telefono = ref('');
  const comentario = ref('');
  const cvFile = ref(null);
  
  const handleFileUpload = (event) => {
    cvFile.value = event.target.files[0];
  };
  
  const enviarPostulacion = () => {
    if (!nombre.value || !email.value || !telefono.value) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
  
    console.log('Postulación enviada:', {
      nombre: nombre.value,
      email: email.value,
      telefono: telefono.value,
      comentario: comentario.value,
      cvFile: cvFile.value,
    });
  
    router.push('/BuscarEmpleos');
  };
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
  