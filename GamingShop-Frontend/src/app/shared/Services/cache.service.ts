import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

@Injectable()
export class CacheService {
  private cache: any = {};

  addItem(url: string, value: HttpResponse<any>) {
    this.cache[url] = value;
  }

  getItem(url: string): HttpResponse<any> | undefined {
    return this.cache[url];
  }

  clearCache(): void {
    this.cache = {};
  }
}
