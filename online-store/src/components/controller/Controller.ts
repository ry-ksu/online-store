import { json, IJsonItem, IJson } from "../../data/json";
import * as noUiSlider from 'nouislider';

interface IController {
  getData(callback: (a: ICallBackItem, b: IJson) => void): void;
  filterItems(localStorageData: IlSData, json: IJson, searchBoxValue: string): IJsonItem[];
  transferSliderFromStrToNumb(localStorageData: IlSData ): IlSData
  defineCategories(e: Event): void;
  addArrayToLS(
    LSvalue: string[],
    targetValue: string,
    elem: HTMLElement,
    category: string
    ): void;
  changePopular(): void;
  changeSort(): void;
  changeRange(name: string, values: number[]): void;
  changeCart(e: Event): void;
  changeCategories(e: Event, category: string): void;
  resetFilters(): void;
  resetLS(): void;
}

type IlSData = {
  type?: Array<string>;
  brand?: Array<string>;
  color?: Array<string>;
  size?: Array<string>;
  quantitySlider?: Array<string | number>;
  priceSlider?: Array<string | number>;
  popular?: boolean;
  cart?: Array<string>;
  sort?: string;
}

export type ICallBackItem = {
  items: IJsonItem[],
  categories: {
    type?: Array<string>;
    brand?: Array<string>;
    color?: Array<string>;
    size?: Array<string>;
  },
  cart?: Array<string | number>;
  range: {
    quantitySlider?: Array<string | number>;
    priceSlider?: Array<string | number>;
  },
  popular?: boolean;
  sort?: string;
}

export class Controller implements IController{
  getData( callback: (a: ICallBackItem, b: IJson) => void ): void {

    let localStorageData: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});

    localStorageData = this.transferSliderFromStrToNumb(localStorageData);

    const searchBoxValue: string = (document.querySelector(".search-box__field") as HTMLInputElement).value.toLowerCase();
    const items: IJsonItem[] = this.filterItems(localStorageData, json, searchBoxValue);

    function byField(field: string) {
      return (a: IJsonItem, b: IJsonItem) => a[field as keyof IJsonItem] > b[field as keyof IJsonItem] ? 1 : -1;
    }

    if (localStorageData === null || localStorageData.sort === null) {
      //
    } else if (localStorageData.sort === "Сортировать по имени, от А до Я") {
      items.sort(byField("name"));
    } else if (localStorageData.sort === "Сортировать по имени, от Я до А") {
      items.sort(byField("name")).reverse();
    } else if (localStorageData.sort === "Сортировать по цене, по возрастанию") {
      items.sort(byField("price"));
    } else if (localStorageData.sort === "Сортировать по цене, по убыванию") {
      items.sort(byField("price")).reverse();
    }

    if (localStorageData === null) {
      callback({
        items: items,
        categories: {},
        range: {},
      }, json)
    } else {
      callback({
        items: items,
        categories: {
          type: localStorageData.type,
          brand: localStorageData.brand,
          color: localStorageData.color,
          size: localStorageData.size,
        },
        cart: localStorageData.cart,
        range: {
          quantitySlider: localStorageData.quantitySlider,
          priceSlider: localStorageData.priceSlider,
        },
        popular: localStorageData.popular,
        sort: localStorageData.sort
      }, json)
    }
    
  }

  filterItems(localStorageData: IlSData, json: IJson, searchBoxValue: string): IJsonItem[] {
    const items: IJsonItem[] = [];

    for (let i = 0; i < json.items.length; i++) {
      if (localStorageData === undefined) {
        items.push(json.items[i])
      } else if (
        (localStorageData.type && localStorageData.type.includes(json.items[i].type))
        || localStorageData.type === undefined) {
          if (
            (localStorageData.brand && localStorageData.brand.includes(json.items[i].brand))
            || localStorageData.brand === undefined) {
              if (
                (localStorageData.color && localStorageData.color.includes(json.items[i].color))
                || localStorageData.color === undefined) {
                  if (
                    (localStorageData.size && localStorageData.size.includes((json.items[i].size)))
                    || localStorageData.size === undefined) {
                      if (
                        (localStorageData.quantitySlider 
                        && localStorageData.quantitySlider[0] <= json.items[i].quantity
                        && localStorageData.quantitySlider[1] >= json.items[i].quantity)
                        || localStorageData.quantitySlider === undefined) {
                          if (
                            (localStorageData.priceSlider 
                            && localStorageData.priceSlider[0] <= json.items[i].price
                            && localStorageData.priceSlider[1] >= json.items[i].price)
                            || localStorageData.priceSlider === undefined) {
                              if (
                                (localStorageData.popular 
                                && localStorageData.popular === json.items[i].isPopular)
                                || !localStorageData.popular) {
                                  if (json.items[i].name.toLowerCase().includes(searchBoxValue)) {
                                    items.push(json.items[i])
                                  }
                                }
                            }
                        }
                    }
                }
          }
      } 
    }
    return items;
  }

  transferSliderFromStrToNumb(localStorageData: IlSData ): IlSData {
    if (localStorageData && localStorageData.quantitySlider) {
      localStorageData.quantitySlider = localStorageData.quantitySlider.map(i => Number(i));
    }
    if (localStorageData && localStorageData.priceSlider) {
      localStorageData.priceSlider = localStorageData.priceSlider.map(i => Number(i));
    }
    return localStorageData;
  }

  defineCategories(e: Event): void {
    if ((e.target as HTMLElement).matches('label')) {
      if ((e.target as HTMLElement).className === 'type') {
        this.changeCategories(e, 'type');
      } else if ((e.target as HTMLElement).className === 'brand') {
        this.changeCategories(e, 'brand');
      } else if ((e.target as HTMLElement).className === 'color') {
        this.changeCategories(e, 'color');
      } else if ((e.target as HTMLElement).className === 'size') {
        this.changeCategories(e, 'size');
      }
    }
  }

  addArrayToLS(
    LSvalue: string[] | undefined,
    targetValue: string,
    elem: HTMLElement | null,
    category: "type" | "brand" | "color" | "size" | "cart"
    ): void {

    const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});

    if ((elem as HTMLElement).getAttribute('checked') === 'false') {
  
      if (!LSvalue) {
        LS[category] = [targetValue];
      } else if(category === 'cart' && LSvalue.length === 20) {
        alert('Извините, все слоты заполнены');
        return;
      } else {
        LSvalue.push(targetValue);
        LS[category] = LSvalue;
      }

      localStorage.setItem("onlineStore", JSON.stringify(LS));
      (elem as HTMLElement).setAttribute('checked', 'true');

    } else {
      if (LSvalue!.length === 1) {
        delete LS[category];
      } else {
        const index: number = LSvalue!.indexOf(targetValue);
        LSvalue!.splice(index, 1);
        LS[category] = LSvalue;
      }
      localStorage.setItem("onlineStore", JSON.stringify(LS));
      (elem as HTMLElement).setAttribute('checked', 'false');
    }
  }
  
  changePopular(): void {
    const elem = document.querySelector('.popular') as HTMLElement;
    const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});

    if (elem.getAttribute('checked') !== 'true') {
      LS.popular = true;
      localStorage.setItem('onlineStore', JSON.stringify(LS));
      elem.setAttribute('checked', 'true')
    } else {
      LS.popular = false;
      localStorage.setItem('onlineStore', JSON.stringify(LS));
      elem.setAttribute('checked', 'false')
    }
  }

  changeSort(): void {
    const getValue = (document.querySelector(".sorting") as HTMLSelectElement).value;
    const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});
    LS.sort = getValue;
    localStorage.setItem('onlineStore', JSON.stringify(LS));
  }

  changeRange(name: "priceSlider" | "quantitySlider", values: (string |number)[]): void {
    const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});
    LS[name] = values;
    localStorage.setItem('onlineStore', JSON.stringify(LS));
  }

  changeCart(e: Event): void {
    if ((e.target as HTMLElement).closest('.card__item')) {
      const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});
      const targetValue: string | null = ((e.target as HTMLElement).closest('.card__item') as HTMLElement).className.split(' ')[1];
      const elem: HTMLElement | null = (e.target as HTMLElement).closest('.card__item');

      if (!LS.cart) {
        LS.cart = [targetValue];
        localStorage.setItem("onlineStore", JSON.stringify(LS));
        (elem as HTMLElement).setAttribute('checked', 'true');
      } else {
        this.addArrayToLS(LS.cart, targetValue, elem, 'cart');
      }
    }
  }

  changeCategories(e: Event, category: "type" | "brand" | "color" | "size"): void {
    const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});
    const targetValue: string | null= ((e.target as HTMLElement).textContent as string).substring(1);
    const elem = e.target as HTMLElement ;

    this.addArrayToLS(LS[category], targetValue, elem, category);
  }

  resetFilters(): void {
    const LS: IlSData = (JSON.parse(localStorage.getItem('onlineStore') as string) || {});
    const newLS: { cart?: string[], sort?: string} = {};

    if (LS.cart) newLS.cart = LS.cart;
    if (LS.sort) newLS.sort = LS.sort;

    localStorage.setItem('onlineStore', JSON.stringify(newLS));

    ((document.querySelector('#quantitySlider') as noUiSlider.target).noUiSlider as noUiSlider.API).reset();
    ((document.querySelector('#priceSlider') as noUiSlider.target).noUiSlider as noUiSlider.API).reset();
  }

  resetLS(): void {
    localStorage.clear();
    ((document.querySelector('#quantitySlider') as noUiSlider.target).noUiSlider as noUiSlider.API).reset();
    ((document.querySelector('#priceSlider') as noUiSlider.target).noUiSlider as noUiSlider.API).reset();
  }
}
