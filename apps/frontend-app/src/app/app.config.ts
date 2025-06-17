import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideStore } from '@ngrx/store';
import { reducer as authReducer } from './reducers/auth/auth.reducer';

// ⬅️ أضف هذي
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './effects/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    provideStore({ auth: authReducer }),
    provideEffects(AuthEffects), // ✅ تفعيل الإيفكتات

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
