import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Darkmode Configuration
  getDarkmodeEnabledValue(): boolean {
    return this.retrieveItem(LocalStorageAccessKeys.darkmodeEnabled, false);
  }

  setDarkmodeEnabledValue(isEnabled: boolean) {
    this.setItem(LocalStorageAccessKeys.darkmodeEnabled, isEnabled);
  }

  // Extended Security Configuration
  isExtendedSecurityAvailable(): boolean {
    return this.retrieveItem(LocalStorageAccessKeys.extendedSecurityAvailable, false);
  }

  setExtendedSecurityAvailableValue(isEnabled: boolean) {
    this.setItem(LocalStorageAccessKeys.extendedSecurityAvailable, isEnabled);
  }

  // Extended Security Configuration
  isExtendedSecurityEnabled(): boolean {
    return this.retrieveItem(LocalStorageAccessKeys.extendedSecurityEnabled, false);
  }

  setExtendedSecurityEnabledValue(isEnabled: boolean) {
    this.setItem(LocalStorageAccessKeys.extendedSecurityEnabled, isEnabled);
  }

  // Custom Locale Configuration
  getCustomLocaleValue(): string {
    return localStorage.getItem(LocalStorageAccessKeys[LocalStorageAccessKeys.customLocale]) || 'en';
  }

  setCustomLocaleValue(locale: string) {
    localStorage.setItem(LocalStorageAccessKeys[LocalStorageAccessKeys.customLocale], locale);
  }

  private retrieveItem(key: LocalStorageAccessKeys, defaultValue: boolean) {
    return JSON.parse(localStorage.getItem(LocalStorageAccessKeys[key]) || JSON.stringify(defaultValue));
  }

  private setItem(key: LocalStorageAccessKeys, value: boolean) {
    localStorage.setItem(LocalStorageAccessKeys[key], JSON.stringify(value));
  }
}

enum LocalStorageAccessKeys {
  darkmodeEnabled = 'darkmodeEnabled',
  extendedSecurityEnabled = 'extendedSecurityEnabled',
  extendedSecurityAvailable = 'extendedSecurityAvailable',
  customLocale = 'customLocale'
}
