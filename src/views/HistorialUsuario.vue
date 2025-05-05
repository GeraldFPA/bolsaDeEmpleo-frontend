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
        <ion-card>
          <ion-card-header>
            <ion-card-title>Mis Ofertas Publicadas</ion-card-title>
          </ion-card-header>
  
          <ion-list>
            <ion-card v-for="oferta in misOfertas" :key="oferta.id" color="light">
              <ion-card-header>
                <ion-card-title>{{ oferta.puesto }} - {{ oferta.categoria }}</ion-card-title>
                <ion-card-subtitle>Horario: {{ oferta.horario }}</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <p><strong>Sueldo:</strong> ${{ oferta.sueldo }}</p>
                <p><strong>Contrato:</strong> {{ oferta.contrato }}</p>
                <p><strong>Descripción:</strong> {{ oferta.descripcion }}</p>
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
  import { ref } from 'vue';
  
  const misOfertas = ref([
    {
      id: 1,
      puesto: 'Desarrollador Web',
      categoria: 'TI',
      horario: 'Tiempo Completo',
      sueldo: 25000,
      contrato: 'Indefinido',
      descripcion: 'Desarrollar aplicaciones web modernas.'
    },
    {
      id: 2,
      puesto: 'Diseñador UX/UI',
      categoria: 'Diseño',
      horario: 'Medio Tiempo',
      sueldo: 15000,
      contrato: 'Definido',
      descripcion: 'Diseño de interfaces y experiencia de usuario.'
    }
  ]);
  
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
  