import './card.css';
import { IJsonItem } from '../../../data/json'

interface ICard {
  addItem(clone: HTMLElement, name: string, value1: string, value2?: string): void;
  addCard(data: IJsonItem [], cart: string[]): void;
  addCart(LScart: number[]): void
}

export class Card implements ICard {
  addCard(data: IJsonItem [], cart?: (string | number)[]): void {

    if (cart) {
      cart = cart.map(i => Number(i));
    }

    if(!data.length) {
      const warning = document.createElement('div') as HTMLElement;
      warning.classList.add("warning");
      warning.innerHTML = "Извините, совпадений не обнаружено";
      (document.querySelector('.cards') as HTMLElement).append(warning);
    }

    const template = document.querySelector('.card__template') as HTMLTemplateElement;
    let clone = template.content.cloneNode(true) as HTMLElement;
    const fragment = document.createDocumentFragment() as DocumentFragment;

    for (let i = 0; i < data.length; i++) {
      (clone.querySelector('.card__img') as HTMLElement).classList.add(`card__img_${data[i].img}`);

      this.addItem(clone, data[i].name, '', '');
      this.addItem(clone, 'Категория: ', data[i].type);
      this.addItem(clone, 'Бренд: ', data[i].brand);
      this.addItem(clone, 'Цвет: ', data[i].color);
      this.addItem(clone, 'Размер: ', data[i].size);
      this.addItem(clone, 'Количество: ', data[i].quantity, ' шт.');
      this.addItem(clone, 'Цена: ', data[i].price, ' у.е.');
      this.addItem(clone, 'Популярно: ', data[i].isPopular);

      (clone.querySelector('.card__item') as HTMLElement).classList.add(`${data[i].id}`);

      if (cart && cart.includes(data[i].id)) {
        (clone.querySelector('.card__item') as HTMLElement).setAttribute('checked', 'true');
        (clone.querySelector(".card__btn") as HTMLElement).innerHTML = "Добавлено в корзину";
      } else {
        (clone.querySelector('.card__item') as HTMLElement).setAttribute('checked', 'false');
      }
      
      fragment.append(clone);
      clone = template.content.cloneNode(true) as HTMLElement;
    }
    (document.querySelector('.cards') as HTMLElement).append(fragment);

    this.addCart(cart!);
  }

  addItem<T>(clone: HTMLElement, name: string, value1: T, value2?: string): void {
    const elem = document.createElement('p') as HTMLElement;

    if (value2 === undefined) {
      elem.innerHTML = `<b>${name}</b>${value1}`;
    } else {
      elem.innerHTML = `<b>${name}</b>${value1}${value2}`;
    }
    (clone.querySelector('.card__info') as HTMLElement).append(elem);
  }

  addCart(LScart: (string | number)[] | null): void {
    if (LScart) {
      const length: number = LScart.length;
      (document.querySelector(".shopping-bag__count") as HTMLElement).innerHTML = `${length}`;
    }
  }
}
