<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/login" />
                </ion-buttons>
                <ion-title>Registrar Usuario</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label position="stacked">Nombre completo</ion-label>
                    <ion-input v-model="name" type="text" />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Número de teléfono</ion-label>
                    <ion-input v-model="phone_number" type="tel" @ionInput="validarNumero($event)"
                        :class="{ 'invalid': numeroInvalido }" />
                    <ion-note slot="error" v-if="numeroInvalido">Solo se permiten números</ion-note>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Correo electrónico</ion-label>
                    <ion-input v-model="email" type="email" />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Contraseña</ion-label>
                    <ion-input v-model="password" type="password" />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Confirmar contraseña</ion-label>
                    <ion-input v-model="password_confirmation" type="password" />
                </ion-item>

                <ion-item>
                    <ion-label>Deseas registrarte como:</ion-label>
                </ion-item>

                <ion-radio-group v-model="role">
                    <ion-item>
                        <ion-radio value="employee">Empleado</ion-radio>
                    </ion-item>

                    <ion-item>
                        <ion-radio value="company">Empresa</ion-radio>
                    </ion-item>
                </ion-radio-group>

            </ion-list>


            <ion-button expand="block" color="primary" @click="registrar">
                Registrarse
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton,
    IonBackButton, IonButtons, IonNote, IonRadioGroup, IonRadio
} from '@ionic/vue';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const userStore = useUserStore();



const router = useRouter();

const name = ref('');
const phone_number = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const role = ref('');
const numeroInvalido = ref(false);

const validarNumero = (event) => {
    phone_number.value = event.target.value.replace(/[^0-9]/g, '');
    numeroInvalido.value = event.target.value !== phone_number.value;
};

async function registrar() {
    try {
        const API_URL = import.meta.env.VITE_API_URL; // importar la URL de la API desde el archivo .env



        if (
            !name.value || !phone_number.value || !email.value ||
            !password.value || !password_confirmation.value
        ) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        if (!role.value) {
            alert('Por favor, selecciona si deseas registrarte como Estudiante o Empresa.');
            return;
        }


        if (numeroInvalido.value) {
            alert('Por favor, ingresa solo números en el campo de teléfono.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (password.value !== password_confirmation.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }


        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                phone_number: phone_number.value,
                email: email.value,
                password: password.value,
                role: role.value,
                password_confirmation: password_confirmation.value
            })
        });
        if (!response.ok) {
            const errorBody = await response.text(); // Para ver el error crudo
            console.error('Código:', response.status, 'Detalle:', errorBody);
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        userStore.setUserData({
            token: data.access_token,
            role: data.role,
            id: data.id,
        });
        clearValues();
        router.push('/home');

    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        alert('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');

    }

};
function clearValues() {
    name.value = '';
    phone_number.value = '';
    email.value = '';
    password.value = '';
    password_confirmation.value = '';
    role.value = '';
    numeroInvalido.value = false;
};
</script>

<style scoped>
ion-label {
    font-size: 1.2rem;
}

ion-input {
    font-size: 0.8rem;
}

.invalid {
    --highlight-color: red;
}
</style>