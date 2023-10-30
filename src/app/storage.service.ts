import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));

  }

  get<T>(key: string): T | undefined {
    const jsonData = window.localStorage.getItem(key);
    if(!jsonData) return undefined;
    return JSON.parse(jsonData ?? "");
  }
}
