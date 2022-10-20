import noUiSlider from 'nouislider';
import './nouislider.css';
import './sidebar.css';
import { IJson } from '../../../data/json';

interface ISidebar {
  addFilters(
    LScategories: ILScategories,
    LSrange: ILSrange,
    LSpopular: boolean,
    LSsort: string,
    json: IJson): void,
  addCategory(
    clone: HTMLElement,
    catJson: string,
    catName: string,
    valueJson: string[] | number[],
    LScategories: ILScategories): HTMLElement,
  addCategories(LScategories: ILScategories, json: IJson): void,
  addRange(LSrange: ILSrange, json: IJson): void,
  addPopular(LSpopular: boolean): void,
  addSort(LSsort: string): void
}

type ILScategories = {
  type?: string[],
  brand?: string[],
  color?: string[],
  size?: string[]
};

type ILSrange = {
  quantitySlider?: (string | number)[],
  priceSlider?: (string | number)[]
}

export class Sidebar implements ISidebar {

  addFilters(
    LScategories: ILScategories,
    LSrange: ILSrange,
    LSpopular: boolean | undefined,
    LSsort: string | undefined,
    json: IJson
    ): void {
    this.addCategories(LScategories, json);
    if ((document.getElementById('quantitySlider') as HTMLElement).innerHTML === '') {
      this.addRange(LSrange, json);
    }
    this.addPopular(LSpopular!);
    this.addSort(LSsort!);
  }

  addCategory(
    clone: HTMLElement,
    catJson: string,
    catName: string,
    valueJson: string[],
    LScategories: ILScategories): HTMLElement {

    for (let i = 0; i < valueJson.length; i++) {
      const elem = document.createElement('label') as HTMLLabelElement;
      elem.className = `${catJson}`;

      if (LScategories[`${catJson}` as keyof ILScategories]
        && LScategories[`${catJson}` as keyof ILScategories]!.includes(valueJson[i])) {
        elem.setAttribute('checked', 'true');
      } else {
        elem.setAttribute('checked', 'false');
      }

      elem.innerHTML = `<input type='checkbox'></input> ${valueJson[i]}`;
      (clone.querySelector('.category__items') as HTMLElement).append(elem);
    }
    (clone.querySelector('.category__title') as HTMLElement).textContent = catName;
    return clone;
  }         

  addCategories(LScategories: ILScategories, json: IJson): void {
    const template = document.querySelector(".category__template") as HTMLTemplateElement;
    let clone = template.content.cloneNode(true) as HTMLElement;
    const fragment = document.createDocumentFragment() as DocumentFragment;

    fragment.append(this.addCategory(clone, "type", "Категория", json.type, LScategories));
    clone = template.content.cloneNode(true) as HTMLElement;
    fragment.append(this.addCategory(clone, "brand", "Бренд", json.brand, LScategories));
    clone = template.content.cloneNode(true) as HTMLElement;
    fragment.append(this.addCategory(clone, "color", "Цвет", json.color, LScategories));
    clone = template.content.cloneNode(true) as HTMLElement;
    fragment.append(this.addCategory(clone, "size", "Размер", json.size, LScategories));
    (document.querySelector('.categories') as HTMLElement).append(fragment);
  }

  addRange(LSrange: ILSrange, json: IJson): void {
    const quantitySlider = document.getElementById('quantitySlider') as HTMLElement;

    if (LSrange.quantitySlider) {
      noUiSlider.create(quantitySlider, {
        start: [
          Number(LSrange.quantitySlider[0]),
          Number(LSrange.quantitySlider[1])
        ],
        tooltips: true,
        connect: true,
        step: 1,
        range: {
          min: json.quantity.min,
          max: json.quantity.max
        }
      })
    } else {
      noUiSlider.create(quantitySlider, {
        start: [
          json.quantity.min,
          json.quantity.max
        ],
        tooltips: true,
        connect: true,
        step: 1,
        range: {
          min: json.quantity.min,
          max: json.quantity.max
        }
      })
    }
    
    const priceSlider = document.getElementById('priceSlider') as HTMLElement;
    if (LSrange.priceSlider) {
      noUiSlider.create(priceSlider, {
        start: [
          Number(LSrange.priceSlider[0]),
          Number(LSrange.priceSlider[1])
        ],
        tooltips: true,
        connect: true,
        step: 1,
        range: {
          min: json.price.min,
          max: json.price.max
        }
      })
    } else {
      noUiSlider.create(priceSlider, {
        start: [
          json.price.min,
          json.price.max
        ],
        tooltips: true,
        connect: true,
        step: 1,
        range: {
          min: json.price.min,
          max: json.price.max
        }
      })
    } 
  }
  
  addPopular(LSpopular: boolean | null): void {
    if (LSpopular === true) {
      (document.querySelector(".popular") as HTMLElement).setAttribute('checked', 'true');
    } else {
      (document.querySelector(".popular") as HTMLElement).setAttribute('checked', 'false');
    }
  }

  addSort(LSsort: string | null): void {
    if (LSsort === "Сортировать по имени, от А до Я") {
      (document.querySelector(".sorting__item_2") as HTMLElement).setAttribute("selected", "");
    } else if (LSsort === "Сортировать по имени, от Я до А") {
      (document.querySelector(".sorting__item_3") as HTMLElement).setAttribute("selected", "");
    } else if (LSsort === "Сортировать по цене, по возрастанию") {
      (document.querySelector(".sorting__item_4") as HTMLElement).setAttribute("selected", "");
    }else if (LSsort === "Сортировать по цене, по убыванию") {
      (document.querySelector(".sorting__item_5") as HTMLElement).setAttribute("selected", "");
    }
  }
}
