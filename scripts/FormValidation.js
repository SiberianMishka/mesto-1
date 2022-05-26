export class FormValidation {
  constructor(obj,formElement) {
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.popup__error-${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.popup__error-${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disabledPopupSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };
  
  enablePopupSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disabledPopupSubmitButton();
    } else {
      this.enablePopupSubmitButton();
    }
  };

  enableValidation = () => {
      this._setEventListeners();
  };
}