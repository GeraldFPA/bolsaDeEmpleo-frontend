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
            <ion-button  v-if="!postulacionesHechas[empleo.id]" color="secondary" size="small"
              @click="$router.push({ name: 'Postularme', query: { ofertaId: empleo.id } })">
              Postularme
            </ion-button>
            <ion-text color="success" v-else>
              Ya te postulaste a esta oferta
            </ion-text>
          </ion-card-content>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonList, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonBadge, IonButton,
  IonButtons, IonBackButton, onIonViewWillEnter, IonText
} from '@ionic/vue';
import axiosInstance from '@/lib/axiosInstance';

const searchQuery = ref('');

const empleos = ref([]);

async function cargarEmpleos() {
  try {

    const response = await axiosInstance.get('/ofertas');

    empleos.value = response.data.map(oferta => ({
      id: oferta.id,
      tipo: oferta.puesto,
      categoria: oferta.categoria,
      horario: oferta.horario,
      sueldo: oferta.sueldo,
      contrato: oferta.contrato,
      descripcion: oferta.descripcion,
      nombre: oferta.user?.name || 'Desconocido'
    }));

  } catch (error) {
    console.error('Error al cargar ofertas:', {
      message: error.message,
      stack: error.stack
    });
    // Opcional: Mostrar notificación al usuario
  }
}


onIonViewWillEnter(async () => {
  await cargarEmpleos();
  await verificarPostulaciones();
});

const postulacionesHechas = ref({});


const verificarPostulaciones = async () => {
  for (const empleo of empleos.value) {
    try {
      const res = await axiosInstance.get(`/postulacion/existe/${empleo.id}`);
      postulacionesHechas.value[empleo.id] = res.data.ya_postulado;
    } catch (err) {
      console.error(`Error al verificar postulación para oferta ${empleo.id}:`, err);
      postulacionesHechas.value[empleo.id] = false; // por defecto
    }
  }
};



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
