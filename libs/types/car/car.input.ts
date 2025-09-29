import {
  CarStatus,
  CarBrand,
  CarType,
  CarFuelType,
  CarTransmission,
  CarDriveType,
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

// 2. RANGES
export interface PriceRange {
  min: number;
  max: number;
}

export interface YearRange {
  min: Date | number;
  max: Date | number;
}

// 3. SEARCH FILTERS (Car Inquiry Search)
export interface CarISearch {
  memberId?: string;
  carStatus?: CarStatus[];
  brandList?: CarBrand[];
  carModel?: string;
  typeList?: CarType[];
  fuelTypeList?: CarFuelType[];
  transmissionList?: CarTransmission[];
  driveTypeList?: CarDriveType[];
  colorList?: CarColor[];
  carPrice?: PriceRange;
  carYear?: YearRange;
  carIsNew?: boolean;
  seatsList?: Number[];
  doorsList?: Number[];
  engineSizeList?: Number[];
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
  carType?: CarType[];
  carFuelType?: CarFuelType[];
  carTransmission?: CarTransmission[];
  carColor?: CarColor[];
  carIsNew?: boolean;
  carPrice?: PriceRange;
  carYear?: YearRange;
  text?: string;
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
