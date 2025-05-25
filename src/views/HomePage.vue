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
          <ion-col v-for="card in filteredCards" :key="card.title" size="12" size-sm="6" size-md="4">
            <ion-card @click="navigateTo(card.route)">
              <ion-card-header class="ion-text-center">
                <ion-icon :icon="card.icon" size="large" />
                <ion-card-title>{{ card.title }}</ion-card-title>
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
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();
const router = useRouter();
const role = computed(() => userStore.role);


const cards = [
  {
    title: 'Buscar Empleos',
    icon: search,
    route: 'BuscarEmpleos',
    visibleFor: ['employee'],
  },
  {
    title: 'Ofertar un empleo',
    icon: briefcase,
    route: 'CrearOferta',
    visibleFor: ['company'],
  },
  {
    title: 'Mi Historial',
    icon: time,
    route: 'HistorialUsuario',
    visibleFor: ['employee', 'company'],
  },
  {
    title: 'Mi Perfil',
    icon: person,
    route: 'PerfilUsuario',
    visibleFor: ['employee', 'company'],
  },
];

const filteredCards = computed(() =>
  cards.filter((card) => card.visibleFor.includes(role.value))
);

function navigateTo(page) {
  router.push(`/${page}`);
}
</script>

<style scoped>
.dashboard-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: var(--ion-color-primary);
  font-weight: 600;
}

ion-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 16px;
  cursor: pointer;
}

ion-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

ion-icon {
  color: var(--ion-color-primary);
  margin-bottom: 10px;
  font-size: 40px;
}

ion-card-title {
  font-size: 1rem;
  color: #333;
  margin-top: 6px;
}

@media (max-width: 768px) {
  ion-icon {
    font-size: 32px;
  }

  ion-card-title {
    font-size: 0.9rem;
  }

  .dashboard-title {
    font-size: 1.3rem;
  }
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
