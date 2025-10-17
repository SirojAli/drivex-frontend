import { makeVar } from '@apollo/client';
import { CustomJwtPayload } from '../libs/types/customJwtPayload';

export const themeVar = makeVar<Record<string, any>>({});

export const userVar = makeVar<CustomJwtPayload>({
	_id: '',
	memberType: '',
	memberStatus: '',
	memberAuthType: '',
	memberEmail: '',
	memberPhone: '',
	memberNick: '',
	memberFullName: '',
	memberImage: '',
	memberVideoUrl: '',
	memberAddress: '',
	memberDescription: '',
	memberRank: 0,
	memberArticles: 0,
	memberPoints: 0,
	memberCars: 0,
	memberLikes: 0,
	memberViews: 0,
	memberWarnings: 0,
	memberBlocks: 0,
	brandSlug: '',
});

// @ts-ignore
export const socketVar = makeVar<WebSocket>();
