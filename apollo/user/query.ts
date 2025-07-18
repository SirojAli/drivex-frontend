import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_SELLERS = gql`
	query GetSellers($input: SellersInquiry!) {
		getSellers(input: $input) {
			list {
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
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_MEMBER = gql`
	query GetMember($input: String!) {
		getMember(memberId: $input) {
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
			meFollowed {
				followingId
				followerId
				myFollowing
			}
		}
	}
`;

/**************************
 *        CAR        *
 *************************/

export const GET_CAR = gql`
	query GetCar($input: String!) {
		getCar(carId: $input) {
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
			memberData {
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
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

export const GET_CARS = gql`
	query GetCars($input: CarsInquiry!) {
		getCars(input: $input) {
			list {
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
				memberData {
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
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_SELLERS_CAR = gql`
	query GetSellerCars($input: SellerCarsInquiry!) {
		getSellerCars(input: $input) {
			list {
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
			metaCounter {
				total
			}
		}
	}
`;

export const GET_FAVORITES = gql`
	query GetFavorites($input: OrdinaryInquiry!) {
		getFavorites(input: $input) {
			list {
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
				memberData {
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
			metaCounter {
				total
			}
		}
	}
`;

export const GET_VISITED = gql`
	query GetVisited($input: OrdinaryInquiry!) {
		getVisited(input: $input) {
			list {
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
				memberData {
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
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
	query GetBoardArticle($input: String!) {
		getBoardArticle(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleComments
			articleSlug
			memberId
			createdAt
			updatedAt
			memberData {
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
			}
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

export const GET_BOARD_ARTICLES = gql`
	query GetBoardArticles($input: BoardArticlesInquiry!) {
		getBoardArticles(input: $input) {
			list {
				_id
				articleCategory
				articleStatus
				articleTitle
				articleContent
				articleImage
				articleViews
				articleLikes
				articleComments
				articleSlug
				memberId
				createdAt
				updatedAt
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				memberData {
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
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
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
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
	query GetMemberFollowers($input: FollowInquiry!) {
		getMemberFollowers(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
				followerData {
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
					deletedAt
					createdAt
					updatedAt
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_MEMBER_FOLLOWINGS = gql`
	query GetMemberFollowings($input: FollowInquiry!) {
		getMemberFollowings(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				followingData {
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
					deletedAt
					createdAt
					updatedAt
					accessToken
				}
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
			metaCounter {
				total
			}
		}
	}
`;
