import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { CacheService } from "../Services/cache.service";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      this.cacheService.clearCache();

      return next.handle(req);
    }

    const cachedResponse = this.cacheService.getItem(req.url.toString());

    if (cachedResponse != undefined) {
      return of(cachedResponse);
    } else
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this.cacheService.addItem(req.url, event);
          }
        })
      );
  }
}
