import {
  popupPicture,
  popupCaption,
  popupImage,
  pictureCloseButton,
} from './index.js';

class Card {
  constructor(name, link, cardSelector, openPopup, closePopup) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._closePopup = closePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _deleteCardHandler(evt) {
    evt.target.closest('.card').remove();
  }

  _likeCardHandler(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _addButtonsOnCard() {
    const cardDeleteButton = this._card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', (evt) => {
      this._deleteCardHandler(evt);
    });

    const cardLikeButton = this._card.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', (evt) => {
      this._likeCardHandler(evt);
    });
  }

  _setEventListeners() {
    this._addButtonsOnCard();
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._setPopupImage();
    });
    pictureCloseButton.addEventListener('click', () => {
      this._closePopup(popupPicture);
    });
  }

  _setPopupImage() {
    this._openPopup(popupPicture);
    popupCaption.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    const cardDescription = this._card.querySelector('.card__text');
    const cardImage = this._card.querySelector('.card__image');
    cardDescription.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._card;
  }
}

export { Card };
