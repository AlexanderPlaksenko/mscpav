ymaps.ready(function () {
    var myMap = new ymaps.Map('map-yandex', {center: [55.781545, 37.579556], zoom: 16, controls: []}),
        MyBalloonLayoutMob = ymaps.templateLayoutFactory.createClass('<div class="popover bottom">' + '<div class="arrow"></div>' + '<div class="popover-inner">' + '$[[options.contentLayout observeSize minWidth=340 maxWidth=340 maxHeight=350]]' + '</div>' + '</div>', {
            build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.popover', this.getParentElement());
                this.applyElementOffset();
            }, onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                if (!this._isElement(this._$element)) {
                    return;
                }
                this.applyElementOffset();
                this.events.fire('shapechange');
            }, applyElementOffset: function () {
                this._$element.css({
                    left: -(this._$element[0].offsetWidth / 2),
                    top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                });
            }, getShape: function () {
                if (!this._isElement(this._$element)) {
                    return MyBalloonLayout.superclass.getShape.call(this);
                }
                var position = this._$element.position();
                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[position.left, position.top], [position.left + this._$element[0].offsetWidth, position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight]]));
            }, _isElement: function (element) {
                return element && element[0] && element.find('.arrow')[0];
            }
        }),
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass('<div class="popover right">' + '<div class="arrow"></div>' + '<div class="popover-inner">' + '$[[options.contentLayout observeSize minWidth=340 maxWidth=340 maxHeight=350]]' + '</div>' + '</div>', {
            build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.popover', this.getParentElement());
                this.applyElementOffset();
            }, onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                if (!this._isElement(this._$element)) {
                    return;
                }
                this.applyElementOffset();
                this.events.fire('shapechange');
            }, applyElementOffset: function () {
                this._$element.css({
                    left: -(this._$element[0].offsetWidth / 2),
                    top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                });
            }, getShape: function () {
                if (!this._isElement(this._$element)) {
                    return MyBalloonLayout.superclass.getShape.call(this);
                }
                var position = this._$element.position();
                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([[position.left, position.top], [position.left + this._$element[0].offsetWidth, position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight]]));
            }, _isElement: function (element) {
                return element && element[0] && element.find('.arrow')[0];
            }
        }),
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass('<h3 class="popover-title">$[properties.balloonHeader]</h3>' + '<div class="popover-content">$[properties.balloonContent]</div>' + '<a href="/contacts" class="map-btn">подробнее о том, как с нами связаться</a>'),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Студия татуажа Ирины Павловой',
            balloonHeader: 'Москва',
            balloonContent: 'Ленинградсий проспект 14/4'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './yandex-icon.png',
            iconImageSize: [53, 76],
            balloonShadow: false,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: MyBalloonContentLayout,
            hideIconOnBalloonOpen: false,
            iconImageOffset: [-25, -82],
            balloonPanelMaxMapArea: 0,
            balloonOffset: [220, 50]
        });
    if (isMobile.any) {
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Студия татуажа Ирины Павловой',
            balloonHeader: 'Москва',
            balloonContent: 'Ленинградсий проспект 14/4'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './yandex-icon.png',
            iconImageSize: [53, 76],
            balloonShadow: false,
            balloonLayout: MyBalloonLayoutMob,
            balloonContentLayout: MyBalloonContentLayout,
            hideIconOnBalloonOpen: false,
            iconImageOffset: [-25, -82],
            balloonPanelMaxMapArea: 0,
            balloonOffset: [0, 180]
        });
    }
    if (isMobile.android.device) {
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Студия татуажа Ирины Павловой',
            balloonHeader: 'Москва',
            balloonContent: 'Ленинградсий проспект 14/4'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './yandex-icon.png',
            iconImageSize: [53, 76],
            balloonShadow: false,
            balloonLayout: MyBalloonLayoutMob,
            balloonContentLayout: MyBalloonContentLayout,
            hideIconOnBalloonOpen: false,
            iconImageOffset: [-25, -82],
            balloonPanelMaxMapArea: 0,
            balloonOffset: [0, 180]
        });
    }
    myMap.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();
    if (isMobile.any) {
        myMap.behaviors.disable('drag');
        myMap.behaviors.disable('scrollZoom');
    }
    if (isMobile.android.device) {
        myMap.behaviors.disable('drag');
        myMap.behaviors.disable('scrollZoom');
    }
});
