export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Публичный метод для добавления элементов в контейнер

  addItem(card) {
    this._container.prepend(card);
  }

  // Публичный метод очистки контейнера

  clear() {
    this._container.innerHTML = '';
  }

  // Публичный метод отрисовки элементов

  renderItems() {
    this.clear();

    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
