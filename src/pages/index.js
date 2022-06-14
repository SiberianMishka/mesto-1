// Импорт классов
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
  initialCards,
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
  const cardElement = card.generateCard();
  cardArr.addItem(cardElement);
});

popupCardAdd.setEventListeners();

cardAddButton.addEventListener('click', () => {
  formValidators['popup-add-card'].resetValidation();
  popupCardAdd.open();
});

// Вызовы функций
enableValidation(validatorSelectors);
