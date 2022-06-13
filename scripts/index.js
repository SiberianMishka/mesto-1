// Импорт классов
import Card from './Card.js';
import FormValidation from './FormValidation.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// Переменные

const profileInfo = document.querySelector('.profile-info');
const popupEditButton = profileInfo.querySelector('.profile-info__edit-button');
const userNameSelector = '.profile-info__name';
const userDescriptionSelector = '.profile-info__description';

const popupProfileSelector = '.popup_profile-edit';
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const cardTemplateSelector = '#card-template';
const cardsContainerSelector = '.cards';
const cardAddButton = document.querySelector('.profile__add-button');
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

const initialCards = [
  {
    name: 'Рязань',
    link: 'https://images.unsplash.com/photo-1613411278232-e29e3506f4fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1011&q=80',
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1559029881-7cfd01ac1f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1563941433-b6a094653ed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=733&q=80',
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1554844344-c34ea04258c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

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

// Экземпляр для создания карточки

const createCard = (item) => {
  return new Card(
    {
      item: item,
      handleCardClick: () => {
        popupPicture.open(item);
      },
    },
    cardTemplateSelector
  );
};

const popupPicture = new PopupWithImage(popupPictureSelector);
popupPicture.setEventListeners();

const cardArr = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.generateCard();
      cardArr.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardArr.renderItems();

const userInfo = new UserInfo({
  name: userNameSelector,
  description: userDescriptionSelector,
});

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

const popupCardAdd = new PopupWithForm(popupAddCardSelector, (items) => {
  const card = createCard(items);
  console.log(card);
  const cardElement = card.generateCard();
  console.log(cardElement);
  cardArr.addItem(cardElement);
  console.log(popupCardAdd);
});

popupCardAdd.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupCardAdd.open();
});

// Вызовы функций
enableValidation(validatorSelectors);
