export class Card {
  constructor(name, link, cardSelector, openPopup, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopup = openPopup;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _setEventListeners() {
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._cardImage = this._card.querySelector('.card__image');

    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._cardDescription = this._card.querySelector('.card__text');
    this._cardDescription.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._card;
  }
}