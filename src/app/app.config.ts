import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    // importProvidersFrom(
    //   EffectsModule.forFeature(AgentEffect)
    // ),
    ConfirmationService,
    MessageService,
    provideAnimationsAsync(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    // provideState({ name: reducerKey, reducer: agentListReducer }),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    })
  ]
};
