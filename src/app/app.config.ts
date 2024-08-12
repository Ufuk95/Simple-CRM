import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-34f98","appId":"1:694543936605:web:a8e2feed9f8d08fcf471b4","storageBucket":"simple-crm-34f98.appspot.com","apiKey":"AIzaSyBRbUHQo_pUCP005Fi5kuJUZB-9B6a5yo0","authDomain":"simple-crm-34f98.firebaseapp.com","messagingSenderId":"694543936605"})), provideFirestore(() => getFirestore())]
};
