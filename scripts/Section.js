export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._renderedItems = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Публичный метод для добавления элементов в контейнер

  addItem(card) {
    this._container.append(card);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
