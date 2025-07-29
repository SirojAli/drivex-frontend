import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import { MeFollowed } from '../follow/follow';
import { MeLiked } from '../like/meLiked';

export interface Member {
	_id: string;
	memberType: MemberType;
	memberStatus: MemberStatus;
	memberAuthType: MemberAuthType;
	memberEmail: string;
	memberPhone?: string;
	memberNick: string;
	memberPassword?: string;
	memberFullName?: string;
	memberImage: string;
	memberVideoUrl?: string;
	memberAddress?: string;
	memberDescription?: string;
	memberCars: number;
	memberArticles: number;
	memberFollowers: number;
	memberFollowings: number;
	memberPoints: number;
	memberLikes: number;
	memberViews: number;
	memberComments: number;
	memberRank: number;
	memberWarnings: number;
	memberBlocks: number;
	brandSlug?: string;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	accessToken?: string;

	/** from aggregation **/
	meLiked?: MeLiked[];
	meFollowed?: MeFollowed[];
}

export interface TotalCounter {
	total: number;
}

export interface Members {
	list: Member[];
	metaCounter: TotalCounter[];
}
