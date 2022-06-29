export default class Card {
  constructor(
    { item, handleCardClick, handleLikeClick, handleDeleteConfirm },
    cardSelector,
    userId,
    api
  ) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteConfirm = handleDeleteConfirm;

    this._api = api;
    this._id = item._id;
    this._ownerId = item.owner._id;
    this._userId = userId;
  }

  // Приватный метод для получения копии темплейта

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // Публичный метод для удаления карточки

  handleDeleteCard() {
    this._card.closest('.card').remove();
  }

  // Публичный метод для лайка карточки

  handleLikeCard() {
    const cardLikeCount = this._card.querySelector('.card__like-counter');
    if (!this._cardLikeButton.classList.contains('card__like-button_active')) {
      this._api
        .like(this._id)
        .then((item) => {
          this._cardLikeButton.classList.add('card__like-button_active');
          cardLikeCount.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .notLike(this._id)
        .then((item) => {
          this._cardLikeButton.classList.remove('card__like-button_active');
          cardLikeCount.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Обработчики событий на карточку

  _setEventListeners() {
    this._cardLikeButton = this._card.querySelector('.card__like-button');
    this._cardDeleteButton = this._card.querySelector('.card__delete-button');
    this._cardImage = this._card.querySelector('.card__image');

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Публичный метод для рендера карточки с подставлением данных

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._cardDescription = this._card.querySelector('.card__text');
    this._cardDescription.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (!(this._ownerId === this._userId)) {
      this._cardDeleteButton.style.display = 'none';
    }

    if (this._likes.find((item) => this._userId === item._id)) {
      this._cardLikeButton.classList.add('card__like-button_active');
    }

    return this._card;
  }
}
