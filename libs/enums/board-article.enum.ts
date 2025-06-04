/**************************
 *     ARTICLE ENUMS      *
 *************************/

export enum BoardArticleCategory {
	NEWS = 'NEWS',
	REVIEWS = 'REVIEWS',
	EVENT = 'EVENT',
	GUIDE = 'GUIDE',
	PROMOTION = 'PROMOTION',
	ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export enum BoardArticleStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}

/**************************
 *  ARTICLE LABEL ENUMS   *
 *************************/

export const articleCategoryLabels: Record<BoardArticleCategory, string> = {
	NEWS: 'News',
	REVIEWS: 'Reviews',
	EVENT: 'Event',
	GUIDE: 'Buying Guide',
	PROMOTION: 'Sales Promotion',
	ANNOUNCEMENT: 'Car Announcement',
};
