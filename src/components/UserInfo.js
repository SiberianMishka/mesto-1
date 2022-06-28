export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.name);
    this._userDescription = document.querySelector(userSelectors.description);

    this._userAvatar = document.querySelector(userSelectors.avatar);
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

  setUserInfo(item) {
    this._userDescription.textContent = item.about;
    this._userName.textContent = item.name;

    this.setUserAvatar(item);
  }

  setUserAvatar(item) {
    this._userAvatar.src = item.avatar;
  }
}
