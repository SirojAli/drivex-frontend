import { MemberType, MemberAuthType, MemberStatus } from '../../enums/member.enum';
import { Direction } from '../../enums/common.enum';

// 1. Registration input
export interface MemberInput {
	memberNick: string;
	memberPassword: string;
	memberEmail: string;
	memberPhone?: string;
	memberType?: MemberType;
	memberAuthType?: MemberAuthType;
}

// 2. Login input
export interface LoginInput {
	memberNick: string;
	memberPassword: string;
}

// 3. Search input for Sellers
export interface SISearch {
	text?: string;
	brandSlug?: string;
}

// 4. Seller Inquiry
export interface SellersInquiry {
	page: number;
	limit: number;
	sort?: string; // availableSellerSorts
	direction?: Direction;
	search: SISearch;
}

// 5. Search input for Members
export interface MISearch {
	memberStatus?: MemberStatus;
	memberType?: MemberType;
	text?: string;
}

// 6. Member Inquiry
export interface MembersInquiry {
	page: number;
	limit: number;
	sort?: string; // availableMemberSorts
	direction?: Direction;
	search: MISearch;
}
