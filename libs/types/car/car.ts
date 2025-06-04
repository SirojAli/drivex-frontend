import {
	CarStatus, //
	CarBrand,
	CarType,
	CarFuelType,
	CarTransmission,
	CarColor,
} from '../../enums/car.enum';
import { MeLiked } from '../like/meLiked';
import { Member } from '../member/member';

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
	carDescription?: string;
	carComments: number;
	carRank: number;
	carLikes: number;
	carViews: number;
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
