import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { StorageKeys } from '../constants/storage-keys';

export interface Locale {
  lang: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: any = [];
  private readonly supportedLangs = ['en', 'ar'];

  CurrentLangInfo: { Currentlang: string; CurrentLangImage: string } = {
    Currentlang: `${StorageKeys.DefaultLang}`,
    CurrentLangImage: '',
  };

  subject = new Subject<string>();
  myObservable = this.subject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(this.supportedLangs);

    const savedLang = localStorage.getItem(StorageKeys.LANGUAGE)!;
    const savedDir = localStorage.getItem(StorageKeys.DIR);

    // ✅ Validate saved lang, fallback to default if invalid or missing
    const lang = this.supportedLangs.includes(savedLang)
      ? savedLang
      : StorageKeys.DefaultLang;

    const dir = savedDir || StorageKeys.DefaultDir;

    // ✅ Persist validated values back to storage
    localStorage.setItem(StorageKeys.LANGUAGE, lang);
    localStorage.setItem(StorageKeys.DIR, dir);

    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  loadTranslations(...args: Locale[]): void {
    args.forEach((locale) => {
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
  }

  changeLang(lang: 'ar' | 'en') {
    this.setLanguage(lang);
    this.translate.use(lang);
    location.reload();
  }

  getCurrentLangInfo() {
    const lang = this.getSelectedLanguage();
    this.CurrentLangInfo.Currentlang =
      lang === 'ar' ? StorageKeys['AR'] : StorageKeys['EN'];
    this.CurrentLangInfo.CurrentLangImage =
      lang === 'ar'
        ? 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg'
        : 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg';
    return this.CurrentLangInfo;
  }

  getHtmlDirection() {
    const lang = this.getSelectedLanguage();
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(StorageKeys.DIR, dir);
    this.subject.next(dir);
    return dir;
  }

  getPosition(): 'left' | 'right' {
    return this.getHtmlDirection() === 'rtl' ? 'right' : 'left';
  }

  setLanguage(lang: string) {
    localStorage.setItem(StorageKeys.LANGUAGE, lang);
  }

  // ✅ Always returns a validated, supported language
  getSelectedLanguage = (): string => {
    const saved = localStorage.getItem(StorageKeys.LANGUAGE)!;
    return this.supportedLangs.includes(saved)
      ? saved
      : StorageKeys.DefaultLang;
  };
}
