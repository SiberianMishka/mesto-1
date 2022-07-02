export default class Section {
  constructor({ renderer }, containerSelector) {
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

  renderItems(items) {
    this.clear();

    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
