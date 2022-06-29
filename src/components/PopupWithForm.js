import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._callback = submitCallback;
    this._popupForm = this._popup.querySelector('.popup__form');

    this._popupButton = this._popupForm.querySelector('.popup__submit-button');
    this._popupButtonText = this._popupButton.textContent;
  }

  // Приватный метод для получения значений инпутов

  _getInputValues() {
    this._popupFormInputs = this._popupForm.querySelectorAll('.popup__input');
    this._newValues = {};
    this._popupFormInputs.forEach((inputElement) => {
      this._newValues[inputElement.name] = inputElement.value;
    });
    return this._newValues;
  }

  // Обработчики событий

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._callback(this._getInputValues());
      this.close();
    });
  }

  // Наследованный публичный метод закрытия с добавлением сброса формы

  close() {
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...';
    } else {
      this._popupButton.textContent = this._popupButtonText;
    }
  }
}
