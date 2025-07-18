import { MemberStatus, MemberType } from '../../enums/member.enum';

export interface MemberUpdate {
	_id: string;
	memberType?: MemberType;
	memberStatus?: MemberStatus;
	memberEmail?: string;
	memberPhone?: string;
	memberNick?: string;
	memberPassword?: string;
	memberFullName?: string;
	memberImage?: string;
	memberVideoUrl?: string;
	memberAddress?: string;
	memberDescription?: string;
	deletedAt?: Date;
}

export interface AdminMemberUpdate {
	_id: string;
	memberType?: MemberType;
	memberStatus?: MemberStatus;
	memberEmail?: string;
	memberPhone?: string;
	memberNick?: string;
	memberFullName?: string;
	memberImage?: string;
	memberVideoUrl?: string;
	memberAddress?: string;
	memberDescription?: string;
	deletedAt?: Date;
}
