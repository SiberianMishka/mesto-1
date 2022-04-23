const profileInfo = document.querySelector('.profile-info');
const editPopupButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');
const cardLikeButton = document.querySelector('.card__like-button');

const userName = profileInfo.querySelector('.profile-info__name');
const userDescription = profileInfo.querySelector('.profile-info__description');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_description');


function userInfo() {
    jobInput.value = userDescription.innerText;
    nameInput.value = userName.innerText;
}

function popupOpen(popupWindow) {
  popupWindow.classList.add('popup_opened');
}

function popupClose(popupWindow) {
  popupWindow.classList.remove('popup_opened');
}

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userDescription.textContent = jobInput.value;
  userName.textContent = nameInput.value;
  popupClose(popup);
});

editPopupButton.addEventListener('click', function () {
  userInfo();
  popupOpen(popup);
});

closePopupButton.addEventListener('click', () =>  popupClose(popup));

popup.addEventListener('click', function (evt) {
  if (evt.target === evt.currentTarget) {
      popupClose(popup);
  }
});

const initialCards = [
    {
      name: 'Рязань',
      link: 'https://images.unsplash.com/photo-1613411278232-e29e3506f4fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1011&q=80'
    },
    {
      name: 'Карелия',
      link: 'https://images.unsplash.com/photo-1559029881-7cfd01ac1f18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://images.unsplash.com/photo-1563941433-b6a094653ed2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=733&q=80'
    },
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1554844344-c34ea04258c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    },
    {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ];

let cardInfo = initialCards.map(item => ({name: item.name, link: item.link}));

function render() {
    cardInfo.forEach(renderCards);
}

function renderCards({ name, link }) {
    let cardsContainer = document.querySelector('.cards');
    const cardTemplate = document.querySelector('#card-template').content;
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__text').textContent = name;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like-button_active');
    });
    
    cardElement.querySelector('.card__image').addEventListener('click', function() {
      popupPictureZoom(name, link);
      popupOpen(popupPicture);
    });
    
    let deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      const listItem = deleteButton.closest('.card');
      listItem.remove();
    });
  
    cardsContainer.prepend(cardElement);
  }
  
render();

const cardAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const formElementAddCard = popupAddCard.querySelector('.popup__form_add-card');
const closePopupAddCardButton = popupAddCard.querySelector('.popup__close-button_add-card');

cardAddButton.addEventListener('click', () => popupOpen(popupAddCard));

closePopupAddCardButton.addEventListener('click', () =>  popupClose(popupAddCard));

popupAddCard.addEventListener('click', function (evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(popupAddCard);
  }
});


formElementAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const titleInput = popupAddCard.querySelector('.popup__input_type_title');
  const imageLinkInput = popupAddCard.querySelector('.popup__input_type_link');
  
  renderCards({name: titleInput.value, link: imageLinkInput.value});
  titleInput.value = '';
  imageLinkInput.value = '';
  popupClose(popupAddCard);
});

const popupPicture = document.querySelector('.popup_picture');
const closePopupPictureButton = popupPicture.querySelector('.popup__close-button_picture');

closePopupPictureButton.addEventListener('click', () => popupClose(popupPicture));

function popupPictureZoom(name, link) {
  const popupCaption = document.querySelector('.popup__caption');
  popupCaption.textContent = name;

  const popupImage = document.querySelector('.card__image_picture-popup');
  popupImage.src = link;
}

popupPicture.addEventListener('click', function (evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(popupPicture);
  }
});