export default class UserInfo {
  constructor(userSelectors) {
    this._userName = document.querySelector(userSelectors.name);
    this._userDescription = document.querySelector(userSelectors.description);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(jobInput, nameInput) {
    this._userDescription.textContent = jobInput.value;
    this._userName.textContent = nameInput.value;
  }
}
