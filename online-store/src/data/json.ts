export type IJsonItem = {
  id: number;
  name: string;
  type: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  img: string;
  isPopular: boolean;
}

export type IJson = {
  items: IJsonItem [],
  sort: never[],
  quantity: {
    min: number;
    max: number;
  },
  price: {
    min: number;
    max: number;
  },
  type: string[],
  brand: string[],
  color: string[],
  size: string[],
  isPopular: boolean,
}

export const json: IJson = {
  "items": [
    {
      "id": 1,
      "name": "Розовое летнее платье",
      "type": "платье" ,
      "brand": "LaLaLa" ,
      "color": "розовый" ,
      "size": "46",
      "quantity": 15,
      "price": 2500,
      "img": "dress1",
      "isPopular": true
    },
    {
      "id": 2,
      "name": "Легкая футболка",
      "type": "футболка" ,
      "brand": "BomBey" ,
      "color": "белый" ,
      "size": "44",
      "quantity": 34,
      "price": 800,
      "img": "shirt3",
      "isPopular": false
    },
    {
      "id": 3,
      "name": "Кардиган модника",
      "type": "кардиган" ,
      "brand": "LaLaLa" ,
      "color": "зеленый" ,
      "size": "46",
      "quantity": 3,
      "price": 4800,
      "img": "cardigan3",
      "isPopular": true
    },
    {
      "id": 4,
      "name": "Костюм для занятий спортом",
      "type": "костюм" ,
      "brand": "Dolly&Gabby" ,
      "color": "зеленый" ,
      "size": "50",
      "quantity": 9,
      "price": 3800,
      "img": "suit3",
      "isPopular": false
    },
    {
      "id": 5,
      "name": "Костюм с розовой полоской",
      "type": "костюм" ,
      "brand": "Belckasiaga" ,
      "color": "розовый" ,
      "size": "48",
      "quantity": 7,
      "price": 2400,
      "img": "suit1",
      "isPopular": true
    },
    {
      "id": 6,
      "name": "Свободное зеленое платье",
      "type": "платье" ,
      "brand": "BomBey" ,
      "color": "зеленый" ,
      "size": "52",
      "quantity": 4,
      "price": 1900,
      "img": "dress2",
      "isPopular": false
    },
    {
      "id": 7,
      "name": "Длинная футболка",
      "type": "футболка" ,
      "brand": "LaLaLa" ,
      "color": "зеленый" ,
      "size": "46",
      "quantity": 8,
      "price": 2100,
      "img": "shirt2",
      "isPopular": false
    },
    {
      "id": 8,
      "name": "Платье для вечеринки",
      "type": "платье" ,
      "brand": "BomBey" ,
      "color": "желтый" ,
      "size": "48",
      "quantity": 1,
      "price": 4700,
      "img": "dress3",
      "isPopular": true
    },
    {
      "id": 9,
      "name": "Кардиган в клетку",
      "type": "кардиган" ,
      "brand": "Dolly&Gabby" ,
      "color": "розовый" ,
      "size": "56",
      "quantity": 21,
      "price": 3400,
      "img": "cardigan1",
      "isPopular": false
    },
    {
      "id": 10,
      "name": "Костюм в офис",
      "type": "костюм" ,
      "brand": "LaLaLa" ,
      "color": "белый" ,
      "size": "46",
      "quantity": 12,
      "price": 4000,
      "img": "suit2",
      "isPopular": true
    },
    {
      "id": 11,
      "name": "Кардиган с цветами",
      "type": "кардиган" ,
      "brand": "Belckasiaga" ,
      "color": "зеленый" ,
      "size": "50",
      "quantity": 19,
      "price": 2600,
      "img": "cardigan2",
      "isPopular": false
    },
    {
      "id": 12,
      "name": "Футболка розовая",
      "type": "футболка" ,
      "brand": "Dolly&Gabby" ,
      "color": "розовый" ,
      "size": "50",
      "quantity": 27,
      "price": 1400,
      "img": "shirt1",
      "isPopular": false
    },
    {
      "id": 13,
      "name": "Солнечный кардиган",
      "type": "кардиган" ,
      "brand": "Belckasiaga" ,
      "color": "желтый" ,
      "size": "48",
      "quantity": 7,
      "price": 4100,
      "img": "cardigan4",
      "isPopular": false
    },
    {
      "id": 14,
      "name": "Футболка с розой",
      "type": "футболка" ,
      "brand": "LaLaLa" ,
      "color": "белый" ,
      "size": "44",
      "quantity": 14,
      "price": 990,
      "img": "shirt4",
      "isPopular": false
    },
    {
      "id": 15,
      "name": "Летнее платье",
      "type": "платье" ,
      "brand": "LaLaLa" ,
      "color": "желтый" ,
      "size": "50",
      "quantity": 37,
      "price": 3600,
      "img": "dress4",
      "isPopular": false
    },
    {
      "id": 16,
      "name": "Легкий костюм",
      "type": "костюм" ,
      "brand": "BomBey" ,
      "color": "розовый" ,
      "size": "44",
      "quantity": 11,
      "price": 2700,
      "img": "suit4",
      "isPopular": true
    },
    {
      "id": 17,
      "name": "Лицо акварелью",
      "type": "футболка" ,
      "brand": "BomBey" ,
      "color": "белый" ,
      "size": "52",
      "quantity": 9,
      "price": 1400,
      "img": "shirt5",
      "isPopular": false
    },
    {
      "id": 18,
      "name": "Ромб на кардигане",
      "type": "кардиган" ,
      "brand": "Dolly&Gabby" ,
      "color": "розовый" ,
      "size": "44",
      "quantity": 4,
      "price": 4900,
      "img": "cardigan5",
      "isPopular": false
    },
    {
      "id": 19,
      "name": "Зеленый костюм в офис",
      "type": "костюм" ,
      "brand": "LaLaLa" ,
      "color": "зеленый" ,
      "size": "44",
      "quantity": 18,
      "price": 2600,
      "img": "suit5",
      "isPopular": false
    },
    {
      "id": 20,
      "name": "Платье-халат",
      "type": "платье" ,
      "brand": "Belckasiaga" ,
      "color": "белый" ,
      "size": "50",
      "quantity": 8,
      "price": 3300,
      "img": "dress6",
      "isPopular": false
    },
    {
      "id": 21,
      "name": "Яркая футболка",
      "type": "футболка" ,
      "brand": "LaLaLa" ,
      "color": "желтый" ,
      "size": "48",
      "quantity": 22,
      "price": 1100,
      "img": "shirt6",
      "isPopular": true
    },
    {
      "id": 22,
      "name": "Платье-разлетайка",
      "type": "платье" ,
      "brand": "Belckasiaga" ,
      "color": "белый" ,
      "size": "44",
      "quantity": 19,
      "price": 3900,
      "img": "dress5",
      "isPopular": false
    }
    ],
  "sort": [
  ],
  "quantity": {
    "min": 1,
    "max": 37
  },
  "price": {
		"min": 800,
    "max": 4900
	},
	"type": ["платье", "футболка", "кардиган", "костюм"],
	"brand": ["LaLaLa", "BomBey", "Belckasiaga", "Dolly&Gabby"],
  "color": ["розовый", "белый", "зеленый", "желтый"],
  "size": ["44", "46", "48", "50", "52", "56"],
	"isPopular": false
};