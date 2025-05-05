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
  
        <ion-button expand="block" color="danger" @click="cerrarSesion">
          Cerrar Sesión
        </ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonTextarea, IonAvatar,
    IonButton, IonBackButton, IonButtons, IonIcon
  } from '@ionic/vue';
  import { cameraOutline } from 'ionicons/icons';
  
  const nombre = ref('Miguel');
  const apellidos = ref('Santos');
  const sobreMi = ref('IMBox');
  const telefono = ref('+34 12345678');
  const fotoPerfil = ref('https://via.placeholder.com/150'); // Imagen temporal
  
  const cambiarFoto = () => {
    // Lógica para cambiar foto (puede integrarse con File input o Camera plugin)
    alert('Función de cambiar foto no implementada.');
  };
  
  const cerrarSesion = () => {
    // Aquí va la lógica real de cerrar sesión
    alert('Sesión cerrada');
  };
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
  