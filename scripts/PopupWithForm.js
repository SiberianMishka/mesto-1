import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._callback = submitCallback;

    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupFormInputs = this._popupForm.querySelectorAll('.popup__input');
  }

  _getInputValues = () => {
    this._newValues = {};
    this._popupFormInputs.forEach((inputElement) => {
      this._newValues[inputElement.name] = inputElement.value;
    });
    return this._newValues;
  };

  setEventListeners = () => {
    super.setEventListeners();

    this.popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._callback(this._getInputValues());
      this.close();
    });
  };

  close = () => {
    super.close();
    this._popupForm.reset();
  };
}
