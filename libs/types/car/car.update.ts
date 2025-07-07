import {
	CarStatus, //
	CarBrand,
	CarType,
	CarFuelType,
	CarTransmission,
	CarDriveType,
} from '../../enums/car.enum';

export interface CarUpdate {
	_id: string;
	carStatus?: CarStatus;
	carBrand?: CarBrand;
	carModel?: string;
	carType?: CarType;
	carYear?: number;
	carPrice?: number;
	carFuelType?: CarFuelType;
	carTransmission?: CarTransmission;
	carColor?: string;
	carImages?: string[];
	carDescription?: string;
	carVinNumber?: string;
	carIsNew?: boolean;
	carEngineSize?: number;
	carMaxSpeed?: number;
	carSeats?: number;
	carDoors?: number;
	carCityMpg?: number;
	carHighwayMpg?: number;
	carCylinders?: number;
	carDriveType?: CarDriveType;
	soldAt?: Date;
	deletedAt?: Date;
}
