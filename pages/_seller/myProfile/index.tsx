import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Box, Stack, Typography } from '@mui/material';
import { Messages, REACT_APP_API_URL } from '../../../libs/config';
import axios from 'axios';
import { userVar } from '../../../apollo/store';
import { MemberUpdate } from '../../../libs/types/member/member.update';
import { useMutation, useReactiveVar } from '@apollo/client';
import { getJwtToken, updateStorage, updateUserInfo } from '../../../libs/auth/index';
import { sweetErrorHandling, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { UPDATE_MEMBER } from '../../../apollo/user/mutation';

const EditProfile: NextPage = ({ initialValues, ...props }: any) => {
	const token = getJwtToken();
	const user = useReactiveVar(userVar);
	const [updateData, setUpdateData] = useState<MemberUpdate>(initialValues);

	/** APOLLO REQUESTS **/
	const [updateMember] = useMutation(UPDATE_MEMBER);

	/** LIFECYCLES **/
	useEffect(() => {
		setUpdateData({
			...updateData,
			memberImage: user.memberImage,
			memberNick: user.memberNick,
			memberEmail: user.memberEmail,
			memberPhone: user.memberPhone,
			memberAddress: user.memberAddress,
			memberDescription: user.memberDescription,
		});
	}, [user]);

	/** HANDLERS **/
	const uploadImage = async (e: any) => {
		try {
			const image = e.target.files[0];
			console.log('+image:', image);

			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImageUploader($file: Upload!, $target: String!) {
              imageUploader(file: $file, target: $target) 
            }`,
					variables: {
						file: null,
						target: 'member',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.file'],
				}),
			);
			formData.append('0', image);

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImage = response.data.data.imageUploader;
			console.log('+responseImage: ', responseImage);
			updateData.memberImage = responseImage;
			setUpdateData({ ...updateData });

			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.log('ERROR, uploadImage:', err);
		}
	};

	const updateProfileHandler = useCallback(async () => {
		try {
			if (!user._id) throw new Error(Messages.error2);

			updateData._id = user._id;
			const result = await updateMember({
				variables: { input: updateData },
			});

			// @ts-ignore
			const jwtToken = result.data.updateMember?.accessToken;
			await updateStorage({ jwtToken });
			updateUserInfo(result.data.updateMember?.accessToken);
			await sweetMixinSuccessAlert('Information updated successfully!');
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [updateData]);

	const doDisabledCheck = () => {
		if (
			updateData.memberImage === '' ||
			updateData.memberNick === '' ||
			updateData.memberEmail === '' ||
			updateData.memberPhone === '' ||
			updateData.memberAddress === '' ||
			updateData.memberDescription === ''
		) {
			return true;
		}
	};

	console.log('+updateData', updateData);

	return (
		<div className={'my-profile'}>
			<h2 className={'dash-title'} style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}>
				Edit Profile
			</h2>
			<Stack className={'profile-boxes'}>
				{/* Avatar Section */}
				<Stack className={'avatar-section'}>
					<Typography className={'avatar-title'}>Avatar</Typography>
					<Stack className={'avatar-info'}>
						<Stack className={'image-box'}>
							<img
								src={
									updateData?.memberImage
										? `${REACT_APP_API_URL}/${updateData?.memberImage}`
										: `/img/profile/defaultUser.png`
								}
								alt=""
							/>
						</Stack>
						<div className={'upload-control'}>
							<p>Upload a new avatar*</p>
							<Box className={'upload-button'}>
								<label className={'button'}>
									<input type="file" accept="image/*" />
									<span>Choose file</span>
								</label>
							</Box>
							<span>(Only JPG, JPEG and PNG format)</span>
						</div>
					</Stack>
				</Stack>

				{/* Information Form */}
				<Stack className={'info-section'}>
					<Typography className={'section-title'}>Information</Typography>

					<Stack className={'section-content'}>
						<Stack className={'input-box'}>
							<Typography className={'title'}>Brand Name</Typography>
							<input
								type="text"
								placeholder="Name"
								className={'input-form'}
								value={updateData.memberNick}
								onChange={({ target: { value } }) => setUpdateData({ ...updateData, memberNick: value })}
							/>
						</Stack>
						<Stack className={'input-box2'}>
							<Stack className={'input2'}>
								<Typography className={'title'}>Brand Email</Typography>
								<input
									type="text"
									placeholder="Address"
									className={'input2-form'}
									value={updateData.memberEmail}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, memberEmail: value })}
								/>
							</Stack>
							<Stack className={'input2'}>
								<Typography className={'title'}>Brand Phone</Typography>
								<input
									type="text"
									placeholder="Address"
									className={'input2-form'}
									value={updateData.memberPhone}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, memberPhone: value })}
								/>
							</Stack>
						</Stack>
						<Stack className={'input-box'}>
							<Typography className={'title'}>Brand Address</Typography>
							<input
								type="text"
								placeholder="Address"
								className={'input-form'}
								value={updateData.memberAddress}
								onChange={({ target: { value } }) => setUpdateData({ ...updateData, memberAddress: value })}
							/>
						</Stack>
						<Stack className={'input-box'}>
							<Typography className={'title'}>Brand Description</Typography>
							<Stack className={'input-desc'}>
								<textarea
									name=""
									id=""
									placeholder="Type here..."
									className={'description-text'}
									value={updateData.memberDescription}
									onChange={({ target: { value } }) => setUpdateData({ ...updateData, memberDescription: value })}
								></textarea>
							</Stack>
						</Stack>
					</Stack>
				</Stack>

				{/* Update button */}
				<Stack className={'save-button'}>
					<button
						type="button"
						className={'save-listing-btn'}
						onClick={updateProfileHandler}
						disabled={doDisabledCheck()}
					>
						Save & Update
					</button>
				</Stack>
			</Stack>
		</div>
	);
};

EditProfile.defaultProps = {
	initialValues: {
		_id: '',
		memberImage: '',
		memberNick: '',
		memberEmail: '',
		memberPhone: '',
		memberAddress: '',
		memberDescription: '',
	},
};

export default withSellerLayout(EditProfile);
