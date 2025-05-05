<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>JobConnect</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="personCircle" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2 class="dashboard-title">¿Qué deseas hacer?</h2>

      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-card @click="navigateTo('BuscarEmpleos')">
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="search" size="large" />
                <ion-card-title>Buscar Empleos</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card @click="navigateTo('ofertar')">
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="briefcase" size="large" />
                <ion-card-title>Ofertar un empleo</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6">
            <ion-card @click="navigateTo('historial')">
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="time" size="large" />
                <ion-card-title>Mi Historial</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card @click="navigateTo('perfil')">
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="person" size="large" />
                <ion-card-title>Mi Perfil</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-footer>
      <ion-toolbar color="primary">
        <ion-title size="small" class="footer-text">
          <div>Teléfono: +52 123 456 7890</div>
          <div>Correo: contacto@jobconnect.com</div>
          <div>
            Redes: 
            <a href="#" class="footer-link">Facebook</a> | 
            <a href="#" class="footer-link">Twitter</a> | 
            <a href="#" class="footer-link">LinkedIn</a>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';
import { personCircle, search, briefcase, time, person } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(page) {
  router.push(`/${page}`);
}
</script>

<style scoped>
.dashboard-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.4rem;
  color: var(--ion-color-primary);
}

ion-card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

ion-card:hover {
  transform: scale(1.05);
}

ion-icon {
  color: var(--ion-color-primary);
  margin-bottom: 10px;
}

ion-card-title {
  font-size: 1rem;
  color: #333;
}

.footer-text {
  text-align: center;
  font-size: 0.8rem;
  color: white;
  line-height: 1.4;
}

.footer-link {
  color: #cce6ff;
  text-decoration: underline;
}
</style>

