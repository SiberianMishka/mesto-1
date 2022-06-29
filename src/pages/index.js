// Импорт CSS-файла

import './index.css';

// Импорт классов
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// Импорт переменных

import {
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
} from '../utils/constants.js';

// Создание экземпляров валидаторов для форм

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidation(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// Экземпляр API

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: '79b08422-294b-4a24-81fb-90326f802f37',
    'Content-Type': 'application/json',
  },
});

// Экземпляр для создания карточки

const createCard = (item) => {
  const card = new Card(
    {
      item: item,
      handleCardClick: () => {
        popupPicture.open(item);
      },
      handleLikeClick: () => {
        card.handleLikeCard();
      },
    },
    cardTemplateSelector,
    api,
    userId
  );
  return card;
};

// Экземпляр для попапа с картинкой

const popupPicture = new PopupWithImage(popupPictureSelector);
popupPicture.setEventListeners();

// Рендер карточек из массива

const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

// Экземпляр с данными пользователя

const userInfo = new UserInfo({
  name: userNameSelector,
  description: userDescriptionSelector,
  avatar: userAvatarSelector,
});

// Экземпляр попапа с формами для редактирования профиля и обработчик на кнопку вызова попапа

const popupProfileEdit = new PopupWithForm(popupProfileSelector, () => {
  userInfo.setUserInfo(jobInput, nameInput);
});

popupProfileEdit.setEventListeners();

popupEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  formValidators['popup-profile'].resetValidation();
  popupProfileEdit.open();
});

// Экземпляр попапа с формами для добавления карточки и обработчик на кнопку вызова попапа

const popupCardAdd = new PopupWithForm(popupAddCardSelector, (items) => {
  const card = createCard(items);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
});

popupCardAdd.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupCardAdd.open();
});

// Экземпляр попапа с формами для изменения аватара

const popupAvatarEdit = new PopupWithForm(popupAvatarEditSelector, (items) => {
  popupAvatarEdit.renderLoading(true);
  api
    .editUserAvatar(items)
    .then((item) => {
      userInfo.setUserAvatar(item);
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatarEdit.renderLoading(false));
});

popupAvatarEdit.setEventListeners();
avatarEditButton.addEventListener('click', () => {
  formValidators['popup-avatar-edit'].resetValidation();
  popupAvatarEdit.open();
});

let userId;

api
  .getData()
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;

    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

// Вызовы функций
enableValidation(validatorSelectors);
