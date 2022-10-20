import { Controller } from '../controller/Controller';
import { View } from '../view/View';
import * as noUiSlider from 'nouislider';

export class App {
  controller: Controller;
  view: View;

  constructor() {
    this.controller = new Controller(),
    this.view = new View();
    this.onSidebarClickHandler = this.onSidebarClickHandler.bind(this);
    this.onSortingChangeHandler = this.onSortingChangeHandler.bind(this);
    this.onCardsClickHandler = this.onCardsClickHandler.bind(this);
    this.onPopularClickHandler = this.onPopularClickHandler.bind(this);
    this.onQuantitySliderChangeHandler = this.onQuantitySliderChangeHandler.bind(this);
    this.onPriceSliderChangeHandler = this.onPriceSliderChangeHandler.bind(this);
    this.onFiltersClickResetHandler = this.onFiltersClickResetHandler.bind(this);
    this.onLSClickResetHandler = this.onLSClickResetHandler.bind(this);
    this.onSearchBoxSubmitHandler = this.onSearchBoxSubmitHandler.bind(this);
    this.onSearchBoxInputHandler = this.onSearchBoxInputHandler.bind(this);
  }

  onSidebarClickHandler(e: Event) {
    this.controller.defineCategories(e);
    this.render();
  }

  onSortingChangeHandler() {
    this.controller.changeSort();
    this.render();
  }

  onCardsClickHandler(e: Event) {
    this.controller.changeCart(e);
    this.render();
  }

  onPopularClickHandler() {
    this.controller.changePopular();
    this.render();
  }

  onQuantitySliderChangeHandler(values: Array<string | number>) {
    this.controller.changeRange("quantitySlider", values);
    this.render();
  }

  onPriceSliderChangeHandler(values: Array<string | number>) {
    this.controller.changeRange("priceSlider", values);
    this.render();
  }

  onFiltersClickResetHandler() {
    this.controller.resetFilters();
    this.render();
  }

  onLSClickResetHandler() {
    this.controller.resetLS();
    this.render();
  }

  onSearchBoxSubmitHandler(e: Event) {
    e.preventDefault();
  }

  onSearchBoxInputHandler() {
    this.render();
  }

  attachEvents() {
    (document.querySelector('.sidebar') as HTMLElement).addEventListener('click', this.onSidebarClickHandler);
    (document.querySelector('.sorting') as HTMLElement).addEventListener('change', this.onSortingChangeHandler);
    (document.querySelector(".cards") as HTMLElement).addEventListener('click', this.onCardsClickHandler);
    (document.querySelector('.popular__checkbox') as HTMLElement).addEventListener('click', this.onPopularClickHandler);

    ((document.querySelector('#quantitySlider') as noUiSlider.target).noUiSlider as noUiSlider.API)
      .on('change', this.onQuantitySliderChangeHandler);
    ((document.querySelector('#priceSlider') as noUiSlider.target).noUiSlider as noUiSlider.API)
      .on('change', this.onPriceSliderChangeHandler);

    (document.querySelector(".filter-reset") as HTMLElement).addEventListener("click", this.onFiltersClickResetHandler);
    (document.querySelector(".ls-reset") as HTMLElement).addEventListener("click", this.onLSClickResetHandler);

    (document.querySelector(".search-box") as HTMLElement).addEventListener("submit", this.onSearchBoxSubmitHandler);
    (document.querySelector(".search-box") as HTMLElement).addEventListener("input", this.onSearchBoxInputHandler);
  }

  detachEvents() {
    (document.querySelector('.sidebar') as HTMLElement).removeEventListener('click', this.onSidebarClickHandler);
    (document.querySelector('.sorting') as HTMLElement).removeEventListener('change', this.onSortingChangeHandler);
    (document.querySelector(".cards") as HTMLElement).removeEventListener('click', this.onCardsClickHandler);
    (document.querySelector('.popular__checkbox') as HTMLElement).removeEventListener('click', this.onPopularClickHandler);

    if (document.querySelector('.noUi-target')) {
      ((document.querySelector('#quantitySlider') as noUiSlider.target).noUiSlider as noUiSlider.API).off('change');
      ((document.querySelector('#priceSlider') as noUiSlider.target).noUiSlider as noUiSlider.API).off('change');
    }
    
    (document.querySelector(".filter-reset") as HTMLElement).removeEventListener("click", this.onFiltersClickResetHandler);
    (document.querySelector(".ls-reset") as HTMLElement).removeEventListener("click", this.onLSClickResetHandler);

    (document.querySelector(".search-box") as HTMLElement).removeEventListener("input", this.onSearchBoxInputHandler);
  }

  render() {
    this.detachEvents();
    this.controller.getData(this.view.draw);
    this.attachEvents();
  }
}
