const popups = document.querySelectorAll('.popup');

const profileInfo = document.querySelector('.profile-info');
const editPopupButton = profileInfo.querySelector('.profile-info__edit-button');
const userName = profileInfo.querySelector('.profile-info__name');
const userDescription = profileInfo.querySelector('.profile-info__description');

const popupProfile = document.querySelector('.popup_profile-edit');
const submitButtonProfile = popupProfile.querySelector('.popup__submit-button');
const formElementPopup = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_description');

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const submitButtonAddCard = popupAddCard.querySelector('.popup__submit-button');
const formElementAddCard = popupAddCard.querySelector('.popup__form');
const titleInput = popupAddCard.querySelector('.popup__input_type_title');
const imageLinkInput = popupAddCard.querySelector('.popup__input_type_link');

const popupPicture = document.querySelector('.popup_picture');
const popupCaption = popupPicture.querySelector('.popup__caption');
const popupImage = popupPicture.querySelector('.popup__image');

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

function setInfo() {
  jobInput.value = userDescription.textContent;
  nameInput.value = userName.textContent;
}

function openPopup(popupWindow) {
  popupWindow.classList.add('popup_opened');
}

function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_opened');
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
    document.removeEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    });
  });
});

formElementPopup.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userDescription.textContent = jobInput.value;
  userName.textContent = nameInput.value;
  closePopup(popupProfile);
});

editPopupButton.addEventListener('click', function () {
  setInfo();
  submitButtonProfile.classList.remove('popup__submit-button_inactive');
  submitButtonProfile.disabled = false;
  openPopup(popupProfile);
});

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDescription = cardElement.querySelector('.card__text');
  const cardImage = cardElement.querySelector('.card__image');
  cardDescription.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', function () {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;

    openPopup(popupPicture);
  });

  return cardElement;
}

function renderCards() {
  const cardInfo = initialCards.map(({ name, link }) => {
    const newCard = createCard({ name, link });

    return newCard;
  });

  cardsContainer.append(...cardInfo);
}

cardAddButton.addEventListener('click', () => {
  submitButtonAddCard.classList.add('popup__submit-button_inactive');
  submitButtonAddCard.disabled = true;
  openPopup(popupAddCard);
});

formElementAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const newCard = createCard({
    name: titleInput.value,
    link: imageLinkInput.value,
  });

  formElementAddCard.reset();

  cardsContainer.prepend(newCard);

  closePopup(popupAddCard);
});

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_active');
  }
  
  if (evt.target.classList.contains('card__delete-button')) {
    evt.target.closest('.card').remove();
  }
});

renderCards();
