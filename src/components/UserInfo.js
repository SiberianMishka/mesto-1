export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.name);
    this._userDescription = document.querySelector(userSelectors.description);
  }

  // Публичный метод получения данных из блока с информацией профиля

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return this._userInfo;
  }

  // Публичный метод подставления значений инпутов в блок с информацией профиля

  setUserInfo(jobInput, nameInput) {
    this._userDescription.textContent = jobInput.value;
    this._userName.textContent = nameInput.value;
  }
}
