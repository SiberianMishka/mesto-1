import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Наследованный публичный метод открытия с подставлением данных 

  open(data) {
    super.open();
    this._popupCaption = this._popup.querySelector('.popup__caption');
    this._popupImage = this._popup.querySelector('.popup__image');

    this._popupCaption.textContent = data.name;
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
  }
}
