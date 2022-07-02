// Переменные

const popupEditButton = document.querySelector('.profile-info__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile-info__avatar-button');

// Селекторы

const userNameSelector = '.profile-info__name';
const userDescriptionSelector = '.profile-info__description';
const userAvatarSelector = '.profile-info__image';
const popupProfileSelector = '.popup_profile-edit';
const popupAvatarEditSelector = '.popup_avatar-edit';
const popupDeleteConfirmSelector = '.popup_delete-confirm';
const cardTemplateSelector = '#card-template';
const cardsContainerSelector = '.cards';
const popupAddCardSelector = '.popup_add-card';
const popupPictureSelector = '.popup_picture';

// Объекты

const validatorSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_active',
};

export {
  popupEditButton,
  nameInput,
  jobInput,
  cardAddButton,
  userNameSelector,
  userDescriptionSelector,
  popupProfileSelector,
  cardTemplateSelector,
  cardsContainerSelector,
  popupAddCardSelector,
  popupPictureSelector,
  validatorSelectors,
  userAvatarSelector,
  popupAvatarEditSelector,
  avatarEditButton,
  popupDeleteConfirmSelector,
};
