import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdate!) {
		updateMemberByAdmin(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberEmail
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberVideoUrl
			memberAddress
			memberDescription
			memberCars
			memberArticles
			memberFollowers
			memberFollowings
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberWarnings
			memberBlocks
			brandSlug
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        CAR        *
 *************************/

export const UPDATE_CAR_BY_ADMIN = gql`
	mutation UpdateCarByAdmin($input: CarUpdate!) {
		updateCarByAdmin(input: $input) {
			_id
			carStatus
			carBrand
			carModel
			carType
			carYear
			carPrice
			carFuelType
			carTransmission
			carColor
			carImages
			carVideoUrl
			carDescription
			carComments
			carRank
			carLikes
			carViews
			carVinNumber
			carIsNew
			carEngineSize
			carMaxSpeed
			carSeats
			carDoors
			carCityMpg
			carHighwayMpg
			carCylinders
			carDriveType
			carSlug
			memberId
			soldAt
			deletedAt
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_CAR_BY_ADMIN = gql`
	mutation RemoveCarByAdmin($input: String!) {
		removeCarByAdmin(carId: $input) {
			_id
			carStatus
			carBrand
			carModel
			carType
			carYear
			carPrice
			carFuelType
			carTransmission
			carColor
			carImages
			carVideoUrl
			carDescription
			carComments
			carRank
			carLikes
			carViews
			carVinNumber
			carIsNew
			carEngineSize
			carMaxSpeed
			carSeats
			carDoors
			carCityMpg
			carHighwayMpg
			carCylinders
			carDriveType
			carSlug
			memberId
			soldAt
			deletedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleSlug
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleSlug
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;
