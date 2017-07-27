webpackJsonp([8],{

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__language_settings__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageSettingsModule", function() { return LanguageSettingsModule; });
/* harmony export (immutable) */ __webpack_exports__["createTranslateLoader"] = createTranslateLoader;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var LanguageSettingsModule = (function () {
    function LanguageSettingsModule() {
    }
    return LanguageSettingsModule;
}());
LanguageSettingsModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__language_settings__["a" /* LanguageSettings */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__language_settings__["a" /* LanguageSettings */]),
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateModule */].forChild({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["Http"]]
                }
            })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__language_settings__["a" /* LanguageSettings */]
        ]
    })
], LanguageSettingsModule);

// required for ng translate, tells it to look in assets folder for trans files
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, 'assets/i18n/', '.json');
}
//# sourceMappingURL=language-settings.module.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(115);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageSettings; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LanguageSettings = (function () {
    function LanguageSettings(storage, viewCtrl, toastCtrl, translate) {
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
    }
    LanguageSettings.prototype.ionViewWillEnter = function () {
        this.getLanguages();
    };
    // first get existing checked segments
    LanguageSettings.prototype.getLanguages = function () {
        var _this = this;
        this.languages = null;
        // Get languages, these are sent from WP site through postMessage in main component
        this.storage.get('available_languages').then(function (langs) {
            if (langs) {
                // this.languages = langs
                _this.checkCurrent(langs);
            }
        });
    };
    LanguageSettings.prototype.checkCurrent = function (langs) {
        var _this = this;
        this.storage.get('app_language').then(function (lang) {
            if (lang) {
                // we have an existing language, check it and return languages
                for (var i = langs.length - 1; i >= 0; i--) {
                    // if language codes match, save as checked
                    if (langs[i].code === lang)
                        langs[i].checked = true;
                }
            }
            _this.languages = langs;
        });
    };
    LanguageSettings.prototype.toggleLanguage = function (event, language) {
        this.translate.use(language.code);
        this.storage.set('app_language', language.code);
        this.presentToast('Language changed');
    };
    LanguageSettings.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
    };
    LanguageSettings.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return LanguageSettings;
}());
LanguageSettings = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/scottopolis/Graphic Art/git tower/ap3/src/pages/language-settings/language-settings.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{ \'Language Settings\' | translate }}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="dismiss()">\n        <ion-icon name="close"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n<ion-list radio-group [(ngModel)]="language">\n<ion-item *ngFor="let language of languages">\n  <ion-label>{{language.name}}</ion-label>\n  <ion-radio (ionSelect)="toggleLanguage($event, language)" value="{{language.code}}" [checked]="language.checked"></ion-radio>\n</ion-item>\n<ion-item *ngIf="!languages">{{ \'No languages available\' | translate }}</ion-item>\n</ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/scottopolis/Graphic Art/git tower/ap3/src/pages/language-settings/language-settings.html"*/,
        selector: 'language-settings'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["d" /* TranslateService */]])
], LanguageSettings);

//# sourceMappingURL=language-settings.js.map

/***/ })

});
//# sourceMappingURL=8.main.js.map