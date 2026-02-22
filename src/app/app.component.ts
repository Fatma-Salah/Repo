import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/i18n';
import { StorageKeys } from './core/constants/storage-keys';
import { Subscription } from 'rxjs';
import { OfflineBannerComponent } from "./shared/components/offline-banner/offline-banner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OfflineBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Repo';

  private translate = inject(TranslationService);
  private dirSubscription!: Subscription;

  dir: 'ltr' | 'rtl' =
    (localStorage.getItem(StorageKeys.DIR) as 'ltr' | 'rtl') ||
    StorageKeys.DefaultDir;

  lang: string =
    localStorage.getItem(StorageKeys.LANGUAGE) || StorageKeys.DefaultLang;

  ngOnInit(): void {
    // ✅ Set initial direction and lang on startup
    this.applyLangAndDir();

    // ✅ Listen for language changes and update document dynamically
    this.dirSubscription = this.translate.myObservable.subscribe((dir: string) => {
      this.dir = dir as 'ltr' | 'rtl';
      this.lang = this.translate.getSelectedLanguage();
      this.applyLangAndDir();
    });
  }

  private applyLangAndDir(): void {
    this.dir = this.translate.getHtmlDirection();
    this.lang = this.translate.getSelectedLanguage();

    document.body.dir = this.dir;
    document.documentElement.lang = this.lang;
    document.documentElement.dir = this.dir;

    localStorage.setItem(StorageKeys.DIR, this.dir);
  }

  ngOnDestroy(): void {
    this.dirSubscription?.unsubscribe();
  }
}
