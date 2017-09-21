import { Component, Renderer2, Pipe, PipeTransform } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { KnowledgeBaseService } from 'app/entry/knowledge-base/knowledge-base.service';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  online = window.navigator.onLine;

  constructor(private _renderer: Renderer2,
              private _http: Http,
              private _knowledgeBaseService: KnowledgeBaseService,
              private _translateService: TranslateService) {
    this._knowledgeBaseService.loadData(this._http);
    const increaseContrast = localStorage.getItem('increaseContrast');
    if (increaseContrast === 'true') {
      this._renderer.addClass(document.body, 'pia-contrast');
    } else {
      this._renderer.removeClass(document.body, 'pia-contrast');
    }

    // Translations system
    this._translateService.addLangs(['en', 'fr']);
    this._translateService.setDefaultLang('fr');
    const language = localStorage.getItem('userLanguage');
    if (language && language.length > 0) {
      this._translateService.use(language);
    } else {
      const browserLang = this._translateService.getBrowserLang();
      /* browerLang = 'en' even when FR ? Weird */
      this._translateService.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    }
  }
}
