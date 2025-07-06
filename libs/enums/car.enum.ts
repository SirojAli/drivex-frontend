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
	TESLA = 'TESLA',
}

export enum CarType {
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	HATCHBACK = 'HATCHBACK',
	CROSSOVER = 'CROSSOVER',
	COUPE = 'COUPE',
	CONVERTIBLE = 'CONVERTIBLE',
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
}

export enum CarColor {
	BLACK = 'BLACK',
	WHITE = 'WHITE',
	SILVER = 'SILVER',
	GREY = 'GREY',
	BLUE = 'BLUE',
	RED = 'RED',
	GREEN = 'GREEN', // optional
	YELLOW = 'YELLOW', // optional
	ORANGE = 'ORANGE', // optional
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
	TESLA: 'Tesla',
};

export const carTypeLabels: Record<CarType, string> = {
	SEDAN: 'Sedan',
	SUV: 'SUV',
	HATCHBACK: 'Hatchback',
	CROSSOVER: 'Crossover',
	COUPE: 'Coupe',
	CONVERTIBLE: 'Convertible',
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
};

export const carColorLabels: Record<CarColor, string> = {
	BLACK: 'Black',
	WHITE: 'White',
	SILVER: 'Silver',
	GREY: 'Grey',
	BLUE: 'Blue',
	RED: 'Red',
	GREEN: 'Green', // optional
	YELLOW: 'Yellow', // optional
	ORANGE: 'Orange', // optional
};
