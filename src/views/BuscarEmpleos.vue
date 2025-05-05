<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Buscar Empleos</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-searchbar placeholder="Buscar por tipo, categoría, nombre..." v-model="searchQuery" />
  
        <ion-grid>
          <ion-row class="table-header">
            <ion-col size="1">#</ion-col>
            <ion-col size="2">Tipo</ion-col>
            <ion-col size="2">Categoría</ion-col>
            <ion-col size="2">Ofertante</ion-col>
            <ion-col size="1">Horario</ion-col>
            <ion-col size="1">Sueldo</ion-col>
            <ion-col size="1">Contrato</ion-col>
            <ion-col size="2">Descripción</ion-col>
            <ion-col size="1">Acción</ion-col>
          </ion-row>
  
          <ion-row v-for="(empleo, index) in filteredEmpleos" :key="empleo.id" class="table-row">
            <ion-col size="1">{{ index + 1 }}</ion-col>
            <ion-col size="2">{{ empleo.tipo }}</ion-col>
            <ion-col size="2">{{ empleo.categoria }}</ion-col>
            <ion-col size="2">{{ empleo.nombre }}</ion-col>
            <ion-col size="1">{{ empleo.horario }}</ion-col>
            <ion-col size="1">${{ empleo.sueldo }}</ion-col>
            <ion-col size="1">
              <ion-badge :color="empleo.contrato === 'Indefinido' ? 'success' : 'warning'">{{ empleo.contrato }}</ion-badge>
            </ion-col>
            <ion-col size="2">{{ empleo.descripcion }}</ion-col>
            <ion-col size="1">
              <ion-button color="secondary" size="small">Postularme</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonSearchbar, IonBadge, IonButton } from '@ionic/vue';
  
  const searchQuery = ref('');
  
  const empleos = ref([
    { id: 1, tipo: 'Desarrollador', categoria: 'TI', nombre: 'Paola Rossi', horario: 'Tiempo Completo', sueldo: 25000, contrato: 'Indefinido', descripcion: 'Desarrollo frontend y backend.' },
    { id: 2, tipo: 'Diseñador', categoria: 'Creativo', nombre: 'Diego Campanella', horario: 'Medio Tiempo', sueldo: 15000, contrato: 'Definido', descripcion: 'Diseño gráfico y UX/UI.' },
    { id: 3, tipo: 'Analista', categoria: 'Datos', nombre: 'Salvatore Bianchi', horario: 'Tiempo Completo', sueldo: 28000, contrato: 'Indefinido', descripcion: 'Análisis de datos y reportes.' }
  ]);
  
  const filteredEmpleos = computed(() => {
    if (!searchQuery.value) return empleos.value;
    return empleos.value.filter(e =>
      e.tipo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.categoria.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  </script>
  
  <style scoped>
  .table-header {
    background-color: var(--ion-color-primary);
    color: white;
    font-weight: bold;
    text-align: center;
  }
  
  .table-row {
    background-color: white;
    border-bottom: 1px solid #ddd;
    align-items: center;
    text-align: center;
  }
  
  ion-badge {
    font-size: 0.7rem;
  }
  
  ion-button {
    --border-radius: 12px;
    --padding-start: 8px;
    --padding-end: 8px;
  }
  </style>
  