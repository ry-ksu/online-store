import { Sidebar } from "./sidebar/sidebar";
import { Card } from "./card/card";
import { IJson } from "../../data/json";
import { ICallBackItem } from "../controller/Controller";

interface IView {
	draw(data: ICallBackItem, json: IJson): void;
}

export class View implements IView{
	draw(data: ICallBackItem, json: IJson): void {
		const sidebar: Sidebar = new Sidebar;
		(document.querySelector(".categories") as HTMLElement).innerHTML = '';
		sidebar.addFilters(data.categories, data.range, data.popular, data.sort, json);
		
		const card: Card = new Card;
		(document.querySelector('.cards') as HTMLElement).innerHTML = '';
		(document.querySelector(".shopping-bag__count") as HTMLElement).innerHTML = "";
		card.addCard(data.items, data.cart);
	}
}
