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
                    <ion-input v-model="nombre" type="text" />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Número de teléfono</ion-label>
                    <ion-input 
                        v-model="numero" 
                        type="tel" 
                        @ionInput="validarNumero($event)"
                        :class="{ 'invalid': numeroInvalido }"
                    />
                    <ion-note slot="error" v-if="numeroInvalido">Solo se permiten números</ion-note>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Correo electrónico</ion-label>
                    <ion-input v-model="correo" type="email" />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Contraseña</ion-label>
                    <ion-input v-model="contrasena" type="password" />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Confirmar contraseña</ion-label>
                    <ion-input v-model="confirmarContrasena" type="password" />
                </ion-item>
            </ion-list>

            <ion-button expand="block" color="primary" @click="registrar">
                Registrarse
            </ion-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton,
    IonBackButton, IonButtons, IonNote
} from '@ionic/vue';

const nombre = ref('');
const numero = ref('');
const correo = ref('');
const contrasena = ref('');
const confirmarContrasena = ref('');
const numeroInvalido = ref(false);

const validarNumero = (event) => {
    numero.value = event.target.value.replace(/[^0-9]/g, '');
    numeroInvalido.value = event.target.value !== numero.value;
};

const registrar = () => {
    if (
        !nombre.value || !numero.value || !correo.value ||
        !contrasena.value || !confirmarContrasena.value
    ) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (numeroInvalido.value) {
        alert('Por favor, ingresa solo números en el campo de teléfono.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo.value)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    if (contrasena.value !== confirmarContrasena.value) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    alert('Usuario registrado exitosamente');
};
</script>

<style scoped>
ion-label {
    font-size: 1rem;
}

ion-input {
    font-size: 0.9rem;
}

.invalid {
    --highlight-color: red;
}
</style>