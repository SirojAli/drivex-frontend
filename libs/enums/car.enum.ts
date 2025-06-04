/**************************
 *         CAR ENUMS      *
 *************************/

export enum CarStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}

export enum CarBrand {
	KIA = 'KIA',
	HYUNDAI = 'HYUNDAI',
	GENESIS = 'GENESIS',
	BMW = 'BMW',
	MERCEDES = 'MERCEDES',
	TOYOTA = 'TOYOTA',
	AUDI = 'AUDI',
	PORSCHE = 'PORSCHE',
	TESLA = 'TESLA',
	BYD = 'BYD',
	LEXUS = 'LEXUS',
	ROLLS_ROYCE = 'ROLLS_ROYCE',
	FERRARI = 'FERRARI',
	LAMBORGHINI = 'LAMBORGHINI',
	BUGATTI = 'BUGATTI',
}

export enum CarType {
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	TRUCK = 'TRUCK',
	COUPE = 'COUPE',
	CONVERTIBLE = 'CONVERTIBLE',
	HATCHBACK = 'HATCHBACK',
	MINIVAN = 'MINIVAN',
	PICKUP = 'PICKUP',
	CROSSOVER = 'CROSSOVER',
	WAGON = 'WAGON',
	MPV = 'MPV',
}

export enum CarFuelType {
	PETROL = 'PETROL',
	ELECTRIC = 'ELECTRIC',
	HYBRID = 'HYBRID',
	LPG = 'LPG',
	DIESEL = 'DIESEL',
}

export enum CarTransmission {
	MANUAL = 'MANUAL',
	AUTO = 'AUTO',
	SEMI_AUTO = 'SEMI_AUTO',
}

export enum CarColor {
	BLACK = 'BLACK',
	WHITE = 'WHITE',
	SILVER = 'SILVER',
	GREY = 'GREY',
	BLUE = 'BLUE',
	RED = 'RED',
	GREEN = 'GREEN',
	YELLOW = 'YELLOW',
	ORANGE = 'ORANGE',
	BROWN = 'BROWN',
	GOLD = 'GOLD',
	PURPLE = 'PURPLE',
}

/**************************
 *    CAR LABEL ENUMS     *
 *************************/

export const carStatusLabels: Record<CarStatus, string> = {
	ACTIVE: 'Active',
	SOLD: 'Sold',
	DELETE: 'Deleted',
};

export const carBrandLabels: Record<CarBrand, string> = {
	KIA: 'Kia',
	HYUNDAI: 'Hyundai',
	GENESIS: 'Genesis',
	BMW: 'BMW',
	MERCEDES: 'Mercedes-Benz',
	TOYOTA: 'Toyota',
	AUDI: 'Audi',
	PORSCHE: 'Porsche',
	TESLA: 'Tesla',
	BYD: 'BYD',
	LEXUS: 'Lexus',
	ROLLS_ROYCE: 'Rolls-Royce',
	FERRARI: 'Ferrari',
	LAMBORGHINI: 'Lamborghini',
	BUGATTI: 'Bugatti',
};

export const carTypeLabels: Record<CarType, string> = {
	SEDAN: 'Sedan',
	SUV: 'SUV',
	TRUCK: 'Truck',
	COUPE: 'Coupe',
	CONVERTIBLE: 'Convertible',
	HATCHBACK: 'Hatchback',
	MINIVAN: 'Minivan',
	PICKUP: 'Pickup Truck',
	CROSSOVER: 'Crossover',
	WAGON: 'Station Wagon',
	MPV: 'Multi-Purpose Vehicle',
};

export const carFuelTypeLabels: Record<CarFuelType, string> = {
	PETROL: 'Petrol',
	ELECTRIC: 'Electric',
	HYBRID: 'Hybrid',
	LPG: 'LPG (Gas)',
	DIESEL: 'Diesel',
};

export const carTransmissionLabels: Record<CarTransmission, string> = {
	MANUAL: 'Manual',
	AUTO: 'Automatic',
	SEMI_AUTO: 'Semi-Automatic',
};

export const carColorLabels: Record<CarColor, string> = {
	BLACK: 'Black',
	WHITE: 'White',
	SILVER: 'Silver',
	GREY: 'Grey',
	BLUE: 'Blue',
	RED: 'Red',
	GREEN: 'Green',
	YELLOW: 'Yellow',
	ORANGE: 'Orange',
	BROWN: 'Brown',
	GOLD: 'Gold',
	PURPLE: 'Purple',
};
