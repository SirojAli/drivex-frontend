import {
	CarStatus, //
	CarBrand,
	CarType,
	CarFuelType,
	CarTransmission,
	CarColor,
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
	carColor?: CarColor;
	carImages?: string[];
	carDescription?: string;
	soldAt?: Date;
	deletedAt?: Date;
}
