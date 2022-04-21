const profileInfo = document.querySelector('.profile-info');
const editPopupButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');
const cardLikeButton = document.querySelector('.card__like-button');

let userName = profileInfo.querySelector('.profile-info__name');
let userDescription = profileInfo.querySelector('.profile-info__description');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let jobInput = popup.querySelector('.popup__input_type_description');


function userInfo() {
    jobInput.value = userDescription.innerText;
    nameInput.value = userName.innerText;
}


function popupOpen() {
    userInfo();
    popup.classList.add('popup_opened');
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupClose();
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userDescription.textContent = jobInput.value;
    userName.textContent = nameInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);

editPopupButton.addEventListener('click', popupOpen);

closePopupButton.addEventListener('click', popupClose);

popup.addEventListener('click', popupOverlayClickHandler);

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
let cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
let cardInfo = initialCards.map(item => ({name: item.name, link: item.link}));

function render() {
    cardInfo.forEach(renderCards);
}

function renderCards({ name, link }) {
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__text').textContent = name;
    cardElement.querySelector('.card__image').src = link;
  
    cardsContainer.prepend(cardElement);
  }
  
render();




