webpackJsonp([1],{

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_dynamic_component_index__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_dynamic_component_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_dynamic_component_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__custom_page__ = __webpack_require__(373);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomPageModule", function() { return CustomPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var CustomPageModule = (function () {
    function CustomPageModule() {
    }
    return CustomPageModule;
}());
CustomPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__custom_page__["a" /* CustomPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__custom_page__["a" /* CustomPage */]),
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */].forChild(),
            __WEBPACK_IMPORTED_MODULE_3_angular2_dynamic_component_index__["DynamicComponentModule"]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__custom_page__["a" /* CustomPage */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_4__custom_page__["a" /* CustomPage */]
        ]
    })
], CustomPageModule);

//# sourceMappingURL=custom-page.module.js.map

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(44);
var http_1 = __webpack_require__(14);
var index_1 = __webpack_require__(639);
var Utils_1 = __webpack_require__(384);
var DYNAMIC_SELECTOR = 'DynamicComponent';
var DynamicComponentMetadata = (function () {
    function DynamicComponentMetadata(selector, template) {
        if (selector === void 0) { selector = DYNAMIC_SELECTOR; }
        if (template === void 0) { template = ''; }
        this.selector = selector;
        this.template = template;
    }
    return DynamicComponentMetadata;
}());
exports.DynamicComponentMetadata = DynamicComponentMetadata;
var DynamicComponent = (function () {
    function DynamicComponent(element, viewContainer, compiler, http) {
        this.element = element;
        this.viewContainer = viewContainer;
        this.compiler = compiler;
        this.http = http;
        this.destroyWrapper = false;
    }
    /**
     * @override
     */
    DynamicComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.getComponentTypePromise().then(function (module) {
            _this.compiler.compileModuleAndAllComponentsAsync(module)
                .then(function (moduleWithComponentFactories) {
                if (_this.componentInstance) {
                    _this.componentInstance.destroy();
                }
                _this.componentInstance = _this.viewContainer.createComponent(
                // dynamicComponentClass factory is presented here
                moduleWithComponentFactories.componentFactories.find(function (componentFactory) {
                    return componentFactory.selector === DYNAMIC_SELECTOR
                        || componentFactory.componentType === _this.componentType;
                }));
                _this.applyPropertiesToDynamicComponent(_this.componentInstance.instance);
                // Remove wrapper after render the component
                if (_this.destroyWrapper) {
                    var el = _this.element.nativeElement;
                    if (Utils_1.Utils.isPresent(el.parentNode)) {
                        el.parentNode.removeChild(el);
                    }
                }
            });
        });
    };
    DynamicComponent.prototype.getComponentTypePromise = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (Utils_1.Utils.isPresent(_this.componentTemplate)) {
                resolve(_this.makeComponentModule(_this.componentTemplate));
            }
            else if (Utils_1.Utils.isPresent(_this.componentTemplateUrl)) {
                _this.loadRemoteTemplate(_this.componentTemplateUrl, resolve);
            }
            else {
                resolve(_this.makeComponentModule(null, _this.componentType));
            }
        });
    };
    DynamicComponent.prototype.loadRemoteTemplate = function (url, resolve) {
        var _this = this;
        var requestArgs = { withCredentials: true };
        if (Utils_1.Utils.isPresent(this.componentRemoteTemplateFactory)) {
            requestArgs = this.componentRemoteTemplateFactory.buildRequestOptions();
        }
        this.http.get(url, requestArgs)
            .subscribe(function (response) {
            if (response.status === 301 || response.status === 302) {
                var chainedUrl = response.headers.get('Location');
                console.info('[$DynamicComponent][loadRemoteTemplate] The URL into the chain is:', chainedUrl);
                if (Utils_1.Utils.isPresent(chainedUrl)) {
                    _this.loadRemoteTemplate(chainedUrl, resolve);
                }
                else {
                    console.warn('[$DynamicComponent][loadRemoteTemplate] The URL into the chain is empty. The process of redirect has stopped.');
                }
            }
            else {
                resolve(_this.makeComponentModule(Utils_1.Utils.isPresent(_this.componentRemoteTemplateFactory)
                    ? _this.componentRemoteTemplateFactory.parseResponse(response)
                    : response.text()));
            }
        }, function (response) {
            console.error('[$DynamicComponent][loadRemoteTemplate] Error response:', response);
            resolve(_this.makeComponentModule(''));
        });
    };
    DynamicComponent.prototype.makeComponentModule = function (template, componentType) {
        componentType = this.makeComponent(template, componentType);
        var componentModules = this.componentModules;
        var dynamicComponentModule = (function () {
            function dynamicComponentModule() {
            }
            dynamicComponentModule.decorators = [
                { type: core_1.NgModule, args: [{
                            declarations: [componentType],
                            imports: [common_1.CommonModule].concat(componentModules || [])
                        },] },
            ];
            /** @nocollapse */
            dynamicComponentModule.ctorParameters = [];
            return dynamicComponentModule;
        }());
        return dynamicComponentModule;
    };
    DynamicComponent.prototype.makeComponent = function (template, componentType) {
        var annotationsArray, componentDecorator;
        if (Utils_1.Utils.isPresent(componentType)) {
            annotationsArray = index_1.MetadataHelper.findAnnotationsMetaData(componentType, core_1.Component);
            if (annotationsArray.length) {
                componentDecorator = annotationsArray[0];
                Reflect.set(componentDecorator, 'selector', DYNAMIC_SELECTOR);
            }
        }
        var dynamicComponentClass = (function () {
            function dynamicComponentClass() {
            }
            dynamicComponentClass.decorators = [
                { type: core_1.Component, args: [componentDecorator || { selector: DYNAMIC_SELECTOR, template: template },] },
            ];
            /** @nocollapse */
            dynamicComponentClass.ctorParameters = [];
            return dynamicComponentClass;
        }());
        return dynamicComponentClass;
    };
    DynamicComponent.prototype.applyPropertiesToDynamicComponent = function (instance) {
        var _this = this;
        var metadataHolder = index_1.MetadataHelper.findPropertyMetadata(this, core_1.Input);
        for (var _i = 0, _a = Object.keys(this); _i < _a.length; _i++) {
            var property = _a[_i];
            if (Reflect.has(metadataHolder, property)) {
                if (Reflect.has(instance, property)) {
                    console.warn('[$DynamicComponent][applyPropertiesToDynamicComponent] The property', property, 'will be overwritten for the component', instance);
                }
                Reflect.set(instance, property, Reflect.get(this, property));
            }
        }
        if (Utils_1.Utils.isPresent(this.componentInputData)) {
            var _loop_1 = function(property) {
                if (Reflect.has(instance, property)) {
                    console.warn('[$DynamicComponent][applyPropertiesToDynamicComponent] The property', property, 'will be overwritten for the component', instance);
                }
                var propValue = Reflect.get(this_1.componentInputData, property);
                var attributes = {};
                if (!Utils_1.Utils.isFunction(propValue)) {
                    attributes.set = function (v) { return Reflect.set(_this.componentInputData, property, v); };
                }
                attributes.get = function () { return Reflect.get(_this.componentInputData, property); };
                Reflect.defineProperty(instance, property, attributes);
            };
            var this_1 = this;
            for (var property in this.componentInputData) {
                _loop_1(property);
            }
        }
    };
    DynamicComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: DYNAMIC_SELECTOR,
                    template: ''
                },] },
    ];
    /** @nocollapse */
    DynamicComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.Compiler, },
        { type: http_1.Http, },
    ];
    DynamicComponent.propDecorators = {
        'componentType': [{ type: core_1.Input },],
        'componentTemplate': [{ type: core_1.Input },],
        'componentInputData': [{ type: core_1.Input },],
        'componentTemplateUrl': [{ type: core_1.Input },],
        'componentRemoteTemplateFactory': [{ type: core_1.Input },],
        'componentModules': [{ type: core_1.Input },],
    };
    return DynamicComponent;
}());
exports.DynamicComponent = DynamicComponent;
//# sourceMappingURL=DynamicComponent.js.map

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.PROP_METADATA = 'propMetadata';
exports.ANNOTATIONS_METADATA = 'annotations';
function PropertyAnnotationFactory(annotationMetadata) {
    var Decorator = function (config) {
        return function (target, propertyKey) {
            var meta = Reflect.getOwnMetadata(exports.PROP_METADATA, target.constructor) || {};
            meta[propertyKey] = meta[propertyKey] || [];
            meta[propertyKey].push(Reflect.construct(annotationMetadata, [config]));
            Reflect.defineMetadata(exports.PROP_METADATA, meta, target.constructor);
        };
    };
    var Annotation = Decorator;
    Annotation.annotationMetadata = annotationMetadata;
    return Annotation;
}
exports.PropertyAnnotationFactory = PropertyAnnotationFactory;
//# sourceMappingURL=MetadataFactory.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_header_logo_header_logo__ = __webpack_require__(236);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DynamicContext = (function () {
    function DynamicContext() {
    }
    DynamicContext.prototype.onChange = function () {
        //console.log(this.value)
    };
    return DynamicContext;
}());
/*
 * Uses dynamic component creation, see https://github.com/apoterenko/angular2-dynamic-component
 */
var CustomPage = (function () {
    function CustomPage(navParams, nav, modalCtrl, renderer, elementRef, viewCtrl, platform, translate, storage, events, toastCtrl, headerLogoService) {
        var _this = this;
        this.navParams = navParams;
        this.nav = nav;
        this.modalCtrl = modalCtrl;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.translate = translate;
        this.storage = storage;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.headerLogoService = headerLogoService;
        this.rtlBack = false;
        this.extraModules = [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* IonicModule */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["a" /* TranslateModule */]];
        this.showSegments = false;
        this.show_header_logo = false;
        this.inputData = {
            // anything that the template needs access to goes here
            pages: JSON.parse(window.localStorage.getItem('myappp')),
            segments: JSON.parse(window.localStorage.getItem('segments')),
            pushPage: function (page) {
                if (page.target === '_blank' && page.extra_classes.indexOf('system') >= 0) {
                    window.open(page.url, '_system', null);
                    return;
                }
                else if (page.target === '_blank') {
                    window.open(page.url, page.target, null);
                    return;
                }
                var opt = {};
                if (_this.platform.isRTL && _this.platform.is('ios'))
                    opt = { direction: 'back' };
                if (page.type === 'apppages' && page.page_type === 'list') {
                    _this.nav.push('PostList', page, opt);
                }
                else if (page.type === 'apppages') {
                    _this.nav.push('CustomPage', page, opt);
                }
                else if (page.url) {
                    _this.nav.push('Iframe', page, opt);
                }
                else {
                    _this.nav.push(page.component, page.navparams, opt);
                }
            },
            openPage: function (page) {
                if (page.target === '_blank' && page.extra_classes.indexOf('system') >= 0) {
                    window.open(page.url, '_system', null);
                    return;
                }
                else if (page.target === '_blank') {
                    window.open(page.url, page.target, null);
                    return;
                }
                if (page.type === 'apppages' && page.page_type === 'list') {
                    _this.nav.setRoot('PostList', page);
                }
                else if (page.type === 'apppages') {
                    _this.nav.setRoot('CustomPage', page);
                }
                else if (page.url) {
                    _this.nav.setRoot('Iframe', page);
                }
                else {
                    _this.nav.setRoot(page.component, page.navparams);
                }
            },
            back: function () {
                _this.nav.pop();
            },
            mediaModal: function (src, img) {
                if (img === void 0) { img = null; }
                var modal = _this.modalCtrl.create('MediaPlayer', { source: src, image: img });
                modal.present();
            },
            updateData: function () {
                window.localStorage.removeItem('myappp');
                _this.storage.remove('segments');
                _this.events.publish('data:update', true);
            },
            changeRTL: function (event, rtl) {
                if (rtl) {
                    _this.platform.setDir('rtl', true);
                }
                else {
                    _this.platform.setDir('ltr', true);
                }
                _this.storage.set('is_rtl', rtl);
            },
            showSegments: function () {
                var modal = _this.modalCtrl.create('PushSettings');
                modal.present();
            },
            showLanguages: function () {
                var modal = _this.modalCtrl.create('LanguageSettings');
                modal.present();
            },
            loginModal: function () {
                _this.loginModal = _this.modalCtrl.create('LoginModal');
                _this.loginModal.present();
            }
        };
        this.pagetitle = navParams.data.title;
        if (navParams.data.is_home == true) {
            this.doLogo();
        }
        // kill vids on android
        if (platform.is('android')) {
            this.killVideos();
        }
    }
    CustomPage.prototype.ngOnInit = function () {
        // console.log(this.navParams);
        // set our custom template url
        var slug = this.navParams.data.slug;
        this.slug = slug;
        // this.templateUrl = 'custom.html'
        this.templateUrl = 'build/' + slug + '.html?' + this.random(1, 999);
        this.customClasses = 'custom-page page-' + this.slug;
        this.listener();
    };
    CustomPage.prototype.ionViewWillEnter = function () {
        if (this.platform.isRTL && this.viewCtrl.enableBack()) {
            this.viewCtrl.showBackButton(false);
            this.rtlBack = true;
        }
    };
    CustomPage.prototype.listener = function () {
        // Listen for link clicks, open in in app browser
        this.listenFunc = this.renderer.listen(this.elementRef.nativeElement, 'click', function (event) {
            if (event.target.href && event.target.href.indexOf('http') >= 0) {
                event.preventDefault();
                window.open(event.target.href, '_blank');
            }
        });
    };
    // changes the back button transition direction if app is RTL
    CustomPage.prototype.backRtlTransition = function () {
        var obj = {};
        if (this.platform.is('ios'))
            obj = { direction: 'forward' };
        this.nav.pop(obj);
    };
    CustomPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: 'bottom'
        });
        toast.present();
    };
    // stop videos from playing when app is exited, required by Google
    CustomPage.prototype.killVideos = function () {
        var _this = this;
        this.platform.pause.subscribe(function () {
            var frames = _this.elementRef.nativeElement.getElementsByTagName('iframe');
            var Vidsrc;
            var _loop_1 = function (i) {
                if (/youtube|wistia|vimeo/.test(frames[i].src)) {
                    Vidsrc = frames[i].src;
                    frames[i].src = '';
                    setTimeout(function () {
                        frames[i].src = Vidsrc;
                    }, 500);
                }
            };
            for (var i in frames) {
                _loop_1(i);
            }
        });
    };
    CustomPage.prototype.random = function (min, max) {
        if (min == null && max == null) {
            max = 1;
        }
        min = +min || 0;
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * ((+max || 0) - min + 1));
    };
    CustomPage.prototype.doLogo = function () {
        var _this = this;
        // check if logo file exists. If so, show it
        this.headerLogoService.checkLogo().then(function (data) {
            _this.show_header_logo = true;
            _this.header_logo_url = data;
        }).catch(function (e) {
            // no logo, do nothing
            //console.log(e)
        });
    };
    return CustomPage;
}());
CustomPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])({
        priority: 'high'
    }),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/scottopolis/Graphic Art/git tower/ap3/src/pages/custom-pages/custom-page.html"*/'<ion-header>\n\n  <ion-navbar>\n\n	<ion-buttons start>\n		<button *ngIf="rtlBack" (click)="backRtlTransition()" ion-button class="custom-back-button">\n			<ion-icon name="arrow-back"></ion-icon>\n			{{\'Back\' | translate }}\n		</button>\n		<button ion-button menuToggle>\n			<ion-icon name="menu"></ion-icon>\n		</button>\n\n	</ion-buttons>\n\n	<img class="header-logo" *ngIf="show_header_logo" [src]="header_logo_url" />\n\n    <ion-title *ngIf="!show_header_logo">{{pagetitle | translate}}</ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content [ngClass]="customClasses">\n\n<DynamicComponent \n    [componentTemplateUrl]="templateUrl" \n    [componentModules]="extraModules"\n    [componentInputData]="inputData"></DynamicComponent>\n\n</ion-content>\n'/*ion-inline-end:"/Users/scottopolis/Graphic Art/git tower/ap3/src/pages/custom-pages/custom-page.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Nav */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["d" /* TranslateService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Events */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_header_logo_header_logo__["a" /* HeaderLogo */]])
], CustomPage);

//# sourceMappingURL=custom-page.js.map

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(0);
var DynamicComponent_1 = __webpack_require__(346);
var DynamicComponentModule = (function () {
    function DynamicComponentModule() {
    }
    DynamicComponentModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        DynamicComponent_1.DynamicComponent
                    ],
                    exports: [
                        DynamicComponent_1.DynamicComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    DynamicComponentModule.ctorParameters = [];
    return DynamicComponentModule;
}());
exports.DynamicComponentModule = DynamicComponentModule;
//# sourceMappingURL=DynamicComponentModule.js.map

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Utils = (function () {
    function Utils() {
    }
    Utils.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    Utils.isUndefined = function (obj) {
        return obj === undefined;
    };
    Utils.isString = function (obj) {
        return typeof obj === 'string';
    };
    Utils.isFunction = function (obj) {
        return typeof obj === 'function';
    };
    Utils.isArray = function (obj) {
        return Array.isArray(obj);
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DynamicComponent_1 = __webpack_require__(346);
exports.DynamicComponent = DynamicComponent_1.DynamicComponent;
exports.DynamicComponentMetadata = DynamicComponent_1.DynamicComponentMetadata;
var DynamicComponentModule_1 = __webpack_require__(383);
exports.DynamicComponentModule = DynamicComponentModule_1.DynamicComponentModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Utils_1 = __webpack_require__(638);
var MetadataFactory_1 = __webpack_require__(369);
var MetadataHelper = (function () {
    function MetadataHelper() {
    }
    MetadataHelper.findAnnotationsMetaData = function (target, annotation) {
        return MetadataHelper.findMetadata(target, annotation, MetadataFactory_1.ANNOTATIONS_METADATA);
    };
    MetadataHelper.findPropertyMetadata = function (target, annotation) {
        return MetadataHelper.findMetadata(target, annotation, MetadataFactory_1.PROP_METADATA);
    };
    MetadataHelper.findMetadata = function (target, annotation, metadataName) {
        var annotationsSearch = target.constructor === Function;
        var metadataDefinition = Reflect.getMetadata(metadataName, annotationsSearch ? target : target.constructor);
        if (annotationsSearch) {
            return (metadataDefinition || []);
        }
        else {
            var annotationMetadataInstance_1;
            var annotationMetadataHolder_1 = {};
            if (Utils_1.Utils.isPresent(metadataDefinition)) {
                Reflect.ownKeys(metadataDefinition).forEach(function (propertyKey) {
                    var predicate = function (annotationInstance) {
                        var annotationMetadata = annotation.annotationMetadata;
                        return annotationInstance instanceof annotation // Angular2 annotations support
                            || (Utils_1.Utils.isPresent(annotationMetadata) && annotationInstance instanceof annotationMetadata);
                    };
                    if (annotationMetadataInstance_1 = metadataDefinition[propertyKey].find(predicate)) {
                        Reflect.set(annotationMetadataHolder_1, propertyKey, annotationMetadataInstance_1);
                    }
                });
            }
            return annotationMetadataHolder_1;
        }
    };
    return MetadataHelper;
}());
exports.MetadataHelper = MetadataHelper;
//# sourceMappingURL=MetadataHelper.js.map

/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Utils = (function () {
    function Utils() {
    }
    Utils.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    Utils.isUndefined = function (obj) {
        return obj === undefined;
    };
    Utils.isString = function (obj) {
        return typeof obj === 'string';
    };
    Utils.isFunction = function (obj) {
        return typeof obj === 'function';
    };
    Utils.isArray = function (obj) {
        return Array.isArray(obj);
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var MetadataHelper_1 = __webpack_require__(637);
exports.MetadataHelper = MetadataHelper_1.MetadataHelper;
var MetadataFactory_1 = __webpack_require__(369);
exports.PropertyAnnotationFactory = MetadataFactory_1.PropertyAnnotationFactory;
//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=1.main.js.map