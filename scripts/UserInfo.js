export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  getUserInfo = () => {
    this._userInfo = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return this._userInfo;
  };

  setUserInfo = (jobInput, nameInput) => {
    this._userDescription.textContent = jobInput.value;
    this._userName.textContent = nameInput.value;
  };
}
