import {
	CarStatus, //
	CarBrand,
	CarType,
	CarFuelType,
	CarTransmission,
	CarDriveType,
	CarColor,
} from '../../enums/car.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Car {
	_id: string;
	carStatus: CarStatus;
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
	carComments: number;
	carRank: number;
	carLikes: number;
	carViews: number;
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
	carSlug: string;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;

	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Cars {
	list: Car[];
	metaCounter: TotalCounter[];
}
