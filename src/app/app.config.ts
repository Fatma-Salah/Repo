// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeng/themes/aura';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { networkInterceptor } from './core/interceptors/network.interceptor';
// import { authInterceptor } from './core/interceptors/auth.interceptor';
// import { langInterceptor } from './core/interceptors/language.interceptor';
// import { errorInterceptor } from './core/interceptors/error.interceptor';
// import { HttpClient } from '@angular/common/http';
// import { provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core'

// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }
// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }),
//   provideAnimationsAsync(),
//    provideTranslateService({
//     loader: {
//       provide: TranslateLoader,
//       useFactory: HttpLoaderFactory,
//       deps: [HttpClient],
//     },
//   }),
//   providePrimeNG({
//     theme: {
//       preset: Aura
//     }
//   }),
//   provideHttpClient(
//     withInterceptors([
//       networkInterceptor,
//       authInterceptor,
//       langInterceptor,
//       errorInterceptor
//     ]))
//     ,
//   provideRouter(routes)
//   ]
// };



import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { networkInterceptor } from './core/interceptors/network.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { langInterceptor } from './core/interceptors/language.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'; // ✅ new import

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        networkInterceptor,
        authInterceptor,
        langInterceptor,
        errorInterceptor,
      ])
    ),
    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: provideTranslateHttpLoader({   // ✅ replaces HttpLoaderFactory
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideRouter(routes),
  ],
};
