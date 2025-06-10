import {
	CarStatus, //
	CarBrand,
	CarType,
	CarFuelType,
	CarTransmission,
	CarColor,
} from '../../enums/car.enum';
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
	carColor: CarColor;
	carImages: string[];
	carDescription?: string;
	memberId?: string;
}

// 2. RANGE TYPES
interface Range {
	start: number;
	end: number;
}

// 3. SEARCH FILTERS (Car Inquiry Search)
export interface CarISearch {
	memberId?: string;
	brandList?: CarBrand[];
	typeList?: CarType[];
	fuelList?: CarFuelType[];
	transmissionList?: CarTransmission[];
	colorList?: CarColor[];
	pricesRange?: Range;
	yearRange?: Range;
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
	carBrandList?: CarBrand[];
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
