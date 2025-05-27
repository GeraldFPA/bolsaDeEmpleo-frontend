<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/buscar-empleos" />
        </ion-buttons>
        <ion-title>Nueva Oferta Laboral</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Crear Oferta</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Puesto de trabajo</ion-label>
            <ion-input v-model="puesto" placeholder="Ej: Desarrollador Web" class="input-pequeno" />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Nombre de la empresa</ion-label>
            <ion-input v-model="empresa" type="text" class="input-pequeno" />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Categoria del puesto</ion-label>
            <ion-input v-model="categoria" placeholder="Ej: TI, Marketing, etc." type="text" class="input-pequeno" />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Horario</ion-label>
            <ion-select v-model="horario" interface="popover" class="input-pequeno">
              <ion-select-option value="Tiempo Completo">Tiempo Completo</ion-select-option>
              <ion-select-option value="Medio Tiempo">Medio Tiempo</ion-select-option>
              <ion-select-option value="Por Horas">Por Horas</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Sueldo (₡)</ion-label>
            <ion-input v-model.number="sueldo" type="number" class="input-pequeno" />
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Tipo de Contrato</ion-label>
            <ion-select v-model="contrato" interface="popover" class="input-pequeno">
              <ion-select-option value="Indefinido">Indefinido</ion-select-option>
              <ion-select-option value="Definido">Definido</ion-select-option>
              <ion-select-option value="Temporal">Temporal</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="custom-item">
            <ion-label position="stacked" class="label-grande">Descripción</ion-label>
            <ion-textarea v-model="descripcion" rows="4" class="input-pequeno" />
          </ion-item>

          <ion-button expand="block" color="success" class="ion-margin-top" @click="crearOferta">
            Publicar Oferta
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption,
  IonButton, IonBackButton, IonButtons
} from '@ionic/vue';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const puesto = ref('');
const empresa = ref('');
const categoria = ref('');
const horario = ref('');
const sueldo = ref(null);
const contrato = ref('');
const descripcion = ref('');



async function crearOferta() {
  try {

    const token = userStore.token; // obtener el token del store de usuario
    if (!puesto.value || !horario.value || !sueldo.value || !contrato.value || !descripcion.value) {
      alert('Por favor completa todos los campos.');
      return;
    }

    console.log('Nueva oferta creada:', {
      puesto: puesto.value,
      horario: horario.value,
      sueldo: sueldo.value,
      contrato: contrato.value,
      descripcion: descripcion.value
    });

    const API_URL = import.meta.env.VITE_API_URL; // importar la URL de la API desde el archivo .env

    const response = await axios.post(`${API_URL}/oferta`, {
      puesto: puesto.value,
      categoria: categoria.value,
      empresa: empresa.value,
      horario: horario.value,
      sueldo: sueldo.value,
      contrato: contrato.value,
      descripcion: descripcion.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });


    console.log('Oferta creada con éxito:', response.data);
    clearValues(); 
    alert('¡Oferta publicada con éxito!');

  } catch (error) {
    console.error('Error al crear la oferta:', error);
    alert('Hubo un error al publicar la oferta. Por favor, inténtalo de nuevo más tarde.');
    return;
  }

};
function clearValues() {
  puesto.value = '';
  empresa.value = '';
  categoria.value = '';
  horario.value = '';
  sueldo.value = null;
  contrato.value = '';
  descripcion.value = '';
} 
</script>

<style scoped>
.custom-item {
  margin-bottom: 16px;
}

.label-grande {
  font-size: 1.05rem;
  font-weight: 500;
}

.input-pequeno {
  font-size: 0.9rem;
}
</style>