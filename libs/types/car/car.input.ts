import { CarStatus, CarBrand, CarType, CarFuelType, CarTransmission, CarDriveType } from '../../enums/car.enum';
import { Direction } from '../../enums/common.enum';

// 1. CAR INPUT (Create Car)
export interface CarInput {
	carBrand: CarBrand;
	carModel: string;
	carType: CarType;
	carYear: number;
	carPrice: number;
	carFuelType: CarFuelType;
	carTransmission: CarTransmission;
	carColor: string;
	carImages: string[];
	carVideoUrl?: string;
	carDescription?: string;
	carVinNumber: string;
	carIsNew: boolean;
	carEngineSize: number;
	carMaxSpeed: number;
	carSeats: number;
	carDoors: number;
	carCityMpg: number;
	carHighwayMpg: number;
	carCylinders: number;
	carDriveType: CarDriveType;
	memberId?: string;
}

// 2. RANGE TYPES
export interface PriceRange {
	start: number;
	end: number;
}

export interface YearRange {
	start: number;
	end: number;
}

// 3. SEARCH FILTERS (Car Inquiry Search)
export interface CarISearch {
	memberId?: string;
	carBrand?: CarBrand[];
	carModel?: string;
	carType?: CarType[];
	carFuelType?: CarFuelType[];
	carTransmission?: CarTransmission[];
	carDriveType?: CarDriveType[];
	carColor?: string[];
	carPrice?: PriceRange;
	carYearRange?: YearRange;
	carYear?: number;
	carIsNew?: boolean;
	carSeats?: number;
	carDoors?: number;
	carCylinders?: number;
	carEngineSize?: number;
	carCityMpg?: number;
	carHighwayMpg?: number;
	carMaxSpeed?: number;
	text?: string;
}

// 4. CAR LISTING QUERY (Cars Inquiry)
export interface CarsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: CarISearch;
}

// 5. SELLER CARS INQUIRY
interface SCISearch {
	carStatus?: CarStatus;
	carBrand?: CarBrand[];
	carYear?: number;
}

export interface SellerCarsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: SCISearch;
}

// 6. ALL CARS INQUIRY
interface ALCISearch {
	carStatus?: CarStatus;
	carBrand?: CarBrand[];
	carYear?: number;
}

export interface AllCarsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALCISearch;
}

// 7. FAVORITE / SIMPLE PAGINATION INQUIRY
export interface OrdinaryInquiry {
	page: number;
	limit: number;
}
