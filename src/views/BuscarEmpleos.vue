<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button @click="$router.push('/home')" />
        </ion-buttons>
        <ion-title>Buscar Empleos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar placeholder="Buscar por tipo, categoría, nombre..." v-model="searchQuery" />

      <ion-list>
        <ion-card v-for="(empleo, index) in filteredEmpleos" :key="empleo.id">
          <ion-card-header>
            <ion-card-title>{{ empleo.tipo }} - {{ empleo.categoria }}</ion-card-title>
            <ion-card-subtitle>Ofertado por: {{ empleo.nombre }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <p><strong>Horario:</strong> {{ empleo.horario }}</p>
            <p><strong>Sueldo:</strong> ₡{{ empleo.sueldo }}</p>
            <p><strong>Contrato:</strong> 
              <ion-badge :color="empleo.contrato === 'Indefinido' ? 'success' : 'warning'">
                {{ empleo.contrato }}
              </ion-badge>
            </p>
            <p><strong>Descripción:</strong> {{ empleo.descripcion }}</p>
            <ion-button color="secondary" size="small" @click="$router.push('/postularme')">Postularme</ion-button>
          </ion-card-content>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonBadge, IonButton,
  IonButtons, IonBackButton
} from '@ionic/vue';

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
ion-card-title {
  font-size: 1.1rem;
  color: var(--ion-color-primary);
}

ion-card-subtitle {
  font-size: 0.9rem;
  color: #666;
}

ion-card-content p {
  margin: 6px 0;
}

ion-badge {
  font-size: 0.8rem;
  vertical-align: middle;
}
</style>

