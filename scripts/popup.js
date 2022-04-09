const profileInfo = document.querySelector('.profile-info');
const editPopupButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

let userName = profileInfo.querySelector('.profile-info__name');
let userDescription = profileInfo.querySelector('.profile-info__description')
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input-name');
let jobInput = popup.querySelector('.popup__input-description');


function userInfo() {
    jobInput.value = userDescription.innerText;
    nameInput.value = userName.innerText;
}


function popupOpenToggle() {
    userInfo();
    popup.classList.toggle('popup_opened');
}

function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupOpenToggle();
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userDescription.textContent = jobInput.value;
    userName.textContent = nameInput.value;
    popupOpenToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

editPopupButton.addEventListener('click', popupOpenToggle);

closePopupButton.addEventListener('click', popupOpenToggle);

popup.addEventListener('click', popupOverlayClickHandler);

