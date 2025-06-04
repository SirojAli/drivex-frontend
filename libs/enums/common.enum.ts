export enum Message {
	SOMETHING_WENT_WRONG = 'Something went wrong!',
	NO_DATA_FOUND = 'No data found!',
	CREATE_FAILED = 'Create failed!',
	UPDATE_FAILED = 'Update failed!',
	REMOVE_FAILED = 'Remove failed!',

	USED_NICK_PHONE = 'You are inserting already used Nick or Phone!',
	TOKEN_CREATION_FAILED = 'Token creation error!',
	NO_MEMBER_NICK = 'No member with that Member Nick!',
	BLOCKED_USER = 'You have been blocked!',
	WRONG_PASSWORD = 'Wrong password, Try again!',
	NOT_AUTHENTICATED = 'Please, Login first!',
	TOKEN_NOT_EXIST = 'Bearer Token is not provided!',
	ONLY_SPECIFIC_ROLES_ALLOWED = 'Allowed only for members with Specific roles!',
	NOT_ALLOWED_REQUEST = 'Not Allowed Request!',
	INSERT_ALL_INPUTS = 'Please, Provide all inputs',
}

export enum Direction {
	ASC = 'ASC',
	DESC = 'DESC',
}
