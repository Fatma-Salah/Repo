import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageKeys } from '../constants/storage-keys';

@Injectable({ providedIn: 'root' })
export class AuthService {

  getAccessToken(): string | null {
    return localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  } 

  setTokens(access: string) {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, access);
  }

  clearTokens() {
    localStorage.clear();
  }

}
