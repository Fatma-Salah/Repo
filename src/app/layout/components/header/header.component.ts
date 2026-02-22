import { Component } from '@angular/core';
import { StorageKeys } from '../../../core/constants/storage-keys';
import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
languages: ('en' | 'ar')[] = ['en', 'ar'];
  selectedLang =localStorage.getItem(StorageKeys.LANGUAGE)||StorageKeys.DefaultLang;

  constructor(private translate: TranslationService) {}
    changeLanguage(lang: 'en'|'ar') {
    this.selectedLang = lang;
    this.translate.changeLang(lang);
  }

}
