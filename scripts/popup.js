const profileInfo = document.querySelector('.profile-info');
const editPopupButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = popup.querySelector('.popup__close-button');

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

