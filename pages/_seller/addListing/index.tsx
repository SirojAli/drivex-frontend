import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { useRouter } from 'next/router';
import { Button, Stack, Typography, Box } from '@mui/material';
import { REACT_APP_API_URL } from '../../../libs/config';
import axios from 'axios';
import { getJwtToken } from '../../../libs/auth/index';
import { userVar } from '../../../apollo/store';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { CREATE_CAR, UPDATE_CAR } from '../../../apollo/user/mutation';
import { CarInput } from '../../../libs/types/car/car.input';
import { CarBrand, CarColor, CarDriveType, CarFuelType, CarTransmission, CarType } from '../../../libs/enums/car.enum';
import { GET_CAR } from '../../../apollo/user/query';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AddListing: NextPage = ({ initialValues, ...props }: any) => {
	const router = useRouter();
	const inputRef = useRef<any>(null);
	const token = getJwtToken();
	const user = useReactiveVar(userVar);

	const [insertCarData, setInsertCarData] = useState<CarInput>(initialValues);
	const [carBrand, setCarBrand] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carType, setCarType] = useState<CarType[]>(Object.values(CarType));
	const [carFuelType, setCarFuelType] = useState<CarFuelType[]>(Object.values(CarFuelType));
	const [carTransmission, setCarTransmission] = useState<CarTransmission[]>(Object.values(CarTransmission));
	const [carDriveType, setCarDriveType] = useState<CarDriveType[]>(Object.values(CarDriveType));
	const [carColor, setCarColor] = useState<CarColor[]>(Object.values(CarColor));

	/** APOLLO REQUESTS **/
	const [createCar] = useMutation(CREATE_CAR);
	const [updateCar] = useMutation(UPDATE_CAR);

	const {
		loading: getCarLoading,
		data: getCarData,
		error: getCarError,
		refetch: getCarRefetch,
	} = useQuery(GET_CAR, {
		fetchPolicy: 'network-only',
		variables: { input: router.query.carId },
	});

	/** LIFECYCLES **/
	useEffect(() => {
		setInsertCarData({
			...insertCarData,
			carBrand: getCarData?.getCar ? getCarData?.getCar?.carBrand : '',
			carModel: getCarData?.getCar ? getCarData?.getCar?.carModel : '',
			carType: getCarData?.getCar ? getCarData?.getCar?.carType : '',
			carYear: getCarData?.getCar ? getCarData?.getCar?.carYear : 0,
			carPrice: getCarData?.getCar ? getCarData?.getCar?.carPrice : 0,
			carFuelType: getCarData?.getCar ? getCarData?.getCar?.carFuelType : '',
			carTransmission: getCarData?.getCar ? getCarData?.getCar?.carTransmission : '',
			carColor: getCarData?.getCar ? getCarData?.getCar?.carColor : '',
			carImages: getCarData?.getCar ? getCarData?.getCar?.carImages : [],
			carDescription: getCarData?.getCar ? getCarData?.getCar?.carDescription : '',
			carVinNumber: getCarData?.getCar ? getCarData?.getCar?.carVinNumber : '',
			carIsNew: getCarData?.getCar ? getCarData?.getCar?.carIsNew : false,
			carEngineSize: getCarData?.getCar ? getCarData?.getCar?.carEngineSize : 0,
			carMaxSpeed: getCarData?.getCar ? getCarData?.getCar?.carMaxSpeed : 0,
			carSeats: getCarData?.getCar ? getCarData?.getCar?.carSeats : 0,
			carDoors: getCarData?.getCar ? getCarData?.getCar?.carDoors : 0,
			carCityMpg: getCarData?.getCar ? getCarData?.getCar?.carCityMpg : 0,
			carHighwayMpg: getCarData?.getCar ? getCarData?.getCar?.carHighwayMpg : 0,
			carCylinders: getCarData?.getCar ? getCarData?.getCar?.carCylinders : 0,
			carDriveType: getCarData?.getCar ? getCarData?.getCar?.carDriveType : '',
		});
	}, [getCarLoading, getCarData]);

	/** HANDLERS **/
	async function uploadImages() {
		try {
			const formData = new FormData();
			const selectedFiles = inputRef.current.files;

			if (selectedFiles.length == 0) return false;
			if (selectedFiles.length > 5) throw new Error('Cannot upload more than 5 images!');

			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
						imagesUploader(files: $files, target: $target)
				  }`,
					variables: {
						files: [null, null, null, null, null],
						target: 'car',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.files.0'],
					'1': ['variables.files.1'],
					'2': ['variables.files.2'],
					'3': ['variables.files.3'],
					'4': ['variables.files.4'],
				}),
			);
			for (const key in selectedFiles) {
				if (/^\d+$/.test(key)) formData.append(`${key}`, selectedFiles[key]);
			}

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImages = response.data.data.imagesUploader;

			console.log('+responseImages: ', responseImages);
			setInsertCarData({ ...insertCarData, carImages: responseImages });
		} catch (err: any) {
			console.log('err: ', err.message);
			await sweetMixinErrorAlert(err.message);
		}
	}

	const doDisabledCheck = () => {
		if (
			insertCarData.carYear === 0 || // @ts-ignore
			insertCarData.carBrand === '' || // @ts-ignore
			insertCarData.carModel === '' || // @ts-ignore
			insertCarData.carType === '' || // @ts-ignore
			insertCarData.carPrice === 0 || // @ts-ignore
			insertCarData.carFuelType === '' || // @ts-ignore
			insertCarData.carTransmission === '' || // @ts-ignore
			insertCarData.carColor === '' ||
			insertCarData.carImages.length === 0 ||
			insertCarData.carDescription === '' ||
			insertCarData.carVinNumber === '' || // @ts-ignore
			insertCarData.carIsNew === '' ||
			insertCarData.carEngineSize === 0 ||
			insertCarData.carMaxSpeed === 0 ||
			insertCarData.carSeats === 0 ||
			insertCarData.carDoors === 0 ||
			insertCarData.carCityMpg === 0 ||
			insertCarData.carHighwayMpg === 0 ||
			insertCarData.carCylinders === 0 || // @ts-ignore
			insertCarData.carDriveType === ''
		) {
			return true;
		}
	};

	const createCarHandler = useCallback(async () => {
		try {
			const result = await createCar({
				variables: { input: insertCarData },
			});
			await sweetMixinSuccessAlert('This car has been created successfully!');
			await router.push({
				pathname: '/_seller/myListing',
				query: { category: 'myListing' },
			});
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertCarData]);

	const updateCarHandler = useCallback(async () => {
		try {
			// @ts-ignore
			insertCarData._id = getCarData?.getCar?._id;
			const result = await updateCar({
				variables: { input: insertCarData },
			});

			await sweetMixinSuccessAlert('This Car has been updated successfully!');
			await router.push({
				pathname: '/_seller/myListing',
				query: { category: 'myListing' },
			});
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	}, [insertCarData]);

	if (user?.memberType !== 'SELLER') {
		router.back();
	}

	console.log('+insertCarData', insertCarData);

	return (
		<div className={'add-listing'}>
			<h3>Add Listing</h3>
			<Stack className={'adding-boxes'}>
				{/* UPLOAD IMAGE */}
				<Stack className={'upload-photos'}>
					<p>Upload Photos</p>
					<Stack className={'images-box'}>
						<Stack className={'upload-box'}>
							<Button
								className={'browse-button'}
								onClick={() => {
									inputRef.current.click();
								}}
							>
								<InsertPhotoIcon className={'icon'} />
								<Typography className={'text'}>Select Photos</Typography>
								<input
									ref={inputRef}
									type="file"
									hidden={true}
									onChange={uploadImages}
									multiple={true}
									accept="image/jpg, image/jpeg, image/png"
								/>
							</Button>
							<Stack className={'text-box'}>
								<Typography className={'drag-title'}>Photos must be JPG, JPEG or PNG format</Typography>
								<Typography className={'format-title'}>(Up to 5 photos)</Typography>
							</Stack>
						</Stack>
						<Stack className={'gallery-box'}>
							{insertCarData?.carImages.map((image: string) => {
								const imagePath: string = `${REACT_APP_API_URL}/${image}`;
								return (
									<Stack className={'image-box'}>
										<img src={imagePath} alt="" />
									</Stack>
								);
							})}
						</Stack>
					</Stack>
				</Stack>

				{/* CAR DETAILS */}
				<Stack className={'car-details'}>
					<p>Car details</p>
					<Stack className={'car-configs'}>
						{/* Brand Name, Model, Car Type */}
						<Box className={'config'}>
							{/* brand-name */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Brand</Typography>
								<div className={'select-wrapper'}>
									<select
										className={'select-box'}
										defaultValue={insertCarData.carBrand || 'select'}
										value={insertCarData.carBrand || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carBrand: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												Select
											</option>
											{carBrand.map((brand: any) => (
												<option value={`${brand}`} key={brand}>
													{brand}
												</option>
											))}
										</>
									</select>
									<KeyboardArrowDownIcon className={'arrow-down'} />
								</div>
							</Stack>

							{/* Car Type */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Type</Typography>
								<div className={'select-wrapper'}>
									<select
										className={'select-box'}
										defaultValue={insertCarData.carType || 'select'}
										value={insertCarData.carType || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carType: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												Select
											</option>
											{carType.map((type: any) => (
												<option value={`${type}`} key={type}>
													{type}
												</option>
											))}
										</>
									</select>
									<KeyboardArrowDownIcon className={'arrow-down'} />
								</div>
							</Stack>

							{/* Car Model */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Model</Typography>
								<input
									type="text"
									className={'input-box'}
									placeholder={'Model'}
									value={insertCarData.carModel}
									onChange={({ target: { value } }) => setInsertCarData({ ...insertCarData, carModel: value })}
								/>
							</Stack>
						</Box>

						{/* Price, Year, FuelType */}
						<Box className={'config'}>
							{/* Car Price */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Price</Typography>
								<input
									type="text"
									className={'input-box'}
									placeholder={'Price'}
									value={insertCarData.carPrice ? insertCarData.carPrice.toLocaleString('ko-KR') + ' KRW' : ''}
									onChange={({ target: { value } }) => {
										const cleanedValue = value.replace(/[,\sKRW]/g, '');
										const numberValue = parseFloat(cleanedValue);

										if (!isNaN(numberValue)) {
											setInsertCarData({ ...insertCarData, carPrice: numberValue });
										} else {
											setInsertCarData({ ...insertCarData, carPrice: 0 });
										}
									}}
								/>
							</Stack>

							{/* Car Year */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Year</Typography>
								<input
									type="text"
									className={'input-box'}
									placeholder={'Year'}
									value={insertCarData.carYear}
									onChange={({ target: { value } }) => setInsertCarData({ ...insertCarData, carYear: parseInt(value) })}
								/>
							</Stack>

							{/* Car Fuel Type */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Fuel Type</Typography>
								<div className={'select-wrapper'}>
									<select
										className={'select-box'}
										defaultValue={insertCarData.carFuelType || 'select'}
										value={insertCarData.carFuelType || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carFuelType: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												Select
											</option>
											{carFuelType.map((fuelType: any) => (
												<option value={`${fuelType}`} key={fuelType}>
													{fuelType}
												</option>
											))}
										</>
									</select>
									<KeyboardArrowDownIcon className={'arrow-down'} />
								</div>
							</Stack>
						</Box>

						{/* Transmissions, Color, VIN Number */}
						<Box className={'config'}>
							{/* Car Transmissions */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Transmission</Typography>
								<div className={'select-wrapper'}>
									<select
										className={'select-box'}
										defaultValue={insertCarData.carTransmission || 'select'}
										value={insertCarData.carTransmission || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carTransmission: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												Select
											</option>
											{carTransmission.map((type: any) => (
												<option value={`${type}`} key={type}>
													{type}
												</option>
											))}
										</>
									</select>
									<KeyboardArrowDownIcon className={'arrow-down'} />
								</div>
							</Stack>

							{/* Car Colors */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car Color</Typography>
								<input
									type="text"
									className={'input-box'}
									placeholder={'Color'}
									value={insertCarData.carColor}
									onChange={({ target: { value } }) => setInsertCarData({ ...insertCarData, carColor: value })}
								/>
							</Stack>

							{/* Car VIN Number */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Car VIN Number</Typography>
								<input
									type="text"
									className={'input-box'}
									placeholder={'Enter VIN'}
									value={insertCarData.carVinNumber}
									maxLength={17}
									onChange={({ target: { value } }) => {
										const cleaned = value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/g, '');
										setInsertCarData({ ...insertCarData, carVinNumber: cleaned });
									}}
								/>
							</Stack>
						</Box>

						{/* isNew, Engine Size, Speed */}
						<Box className={'config'}>
							{/* Is New */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Is New</Typography>
								<div style={{ display: 'flex', gap: '1rem', marginTop: '4px' }}>
									<label>
										<input
											type="radio"
											name="isNew"
											value="yes"
											checked={insertCarData.carIsNew === true}
											onChange={() => setInsertCarData({ ...insertCarData, carIsNew: true })}
										/>
										Yes
									</label>
									<label>
										<input
											type="radio"
											name="isNew"
											value="no"
											checked={insertCarData.carIsNew === false}
											onChange={() => setInsertCarData({ ...insertCarData, carIsNew: false })}
										/>
										No
									</label>
								</div>
							</Stack>

							{/* Engine Size (L) */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Engine Size (L)</Typography>
								<input
									type="number"
									step="0.1"
									min="0"
									className={'input-box'}
									placeholder={'e.g., 2.0'}
									value={insertCarData.carEngineSize}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carEngineSize: parseFloat(value) })
									}
								/>
							</Stack>

							{/* Max Speed (km/h) */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Max Speed (km/h)</Typography>
								<input
									type="number"
									min="0"
									className={'input-box'}
									placeholder={'e.g., 240'}
									value={insertCarData.carMaxSpeed}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carMaxSpeed: parseInt(value) })
									}
								/>
							</Stack>
						</Box>

						{/* Seats, Doors, Cylinders */}
						<Box className={'config'}>
							{/* Seats */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Seats</Typography>
								<input
									type="number"
									className={'input-box'}
									placeholder="Number of Seats"
									value={insertCarData.carSeats}
									min={1}
									max={9}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carSeats: parseInt(value) })
									}
								/>
							</Stack>

							{/* Doors */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Doors</Typography>
								<input
									type="number"
									className={'input-box'}
									placeholder="Number of Doors"
									value={insertCarData.carDoors}
									min={2}
									max={5}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carDoors: parseInt(value) })
									}
								/>
							</Stack>

							{/* Cylinders */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Cylinders</Typography>
								<input
									type="number"
									className={'input-box'}
									placeholder="Engine Cylinders"
									value={insertCarData.carCylinders}
									min={2}
									max={16}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carCylinders: parseInt(value) })
									}
								/>
							</Stack>
						</Box>

						{/* City MPG, Highway MPG, Drive Type */}
						<Box className={'config'}>
							{/* City MPG */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>City MPG</Typography>
								<input
									type="number"
									className={'input-box'}
									placeholder="City MPG"
									value={insertCarData.carCityMpg}
									min={1}
									max={100}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carCityMpg: parseInt(value) })
									}
								/>
							</Stack>

							{/* Highway MPG */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Highway MPG</Typography>
								<input
									type="number"
									className={'input-box'}
									placeholder="Highway MPG"
									value={insertCarData.carHighwayMpg}
									min={1}
									max={100}
									onChange={({ target: { value } }) =>
										setInsertCarData({ ...insertCarData, carHighwayMpg: parseInt(value) })
									}
								/>
							</Stack>

							{/* Drive Type */}
							<Stack className={'input-config'}>
								<Typography className={'title'}>Drive Type</Typography>
								<div className={'select-wrapper'}>
									<select
										className={'select-box'}
										defaultValue={insertCarData.carDriveType || 'select'}
										value={insertCarData.carDriveType || 'select'}
										onChange={({ target: { value } }) =>
											// @ts-ignore
											setInsertCarData({ ...insertCarData, carDriveType: value })
										}
									>
										<>
											<option selected={true} disabled={true} value={'select'}>
												Select
											</option>
											{carDriveType.map((driveType: any) => (
												<option value={`${driveType}`} key={driveType}>
													{driveType}
												</option>
											))}
										</>
									</select>
									<KeyboardArrowDownIcon className={'arrow-down'} />
								</div>
							</Stack>
						</Box>
					</Stack>
				</Stack>

				{/* CAR DESCRIPTION */}
				<Stack className={'car-desc'}>
					<p>Car Description</p>
					<Stack className={'config-column'}>
						<textarea
							name=""
							id=""
							className={'description-text'}
							value={insertCarData.carDescription}
							onChange={({ target: { value } }) => setInsertCarData({ ...insertCarData, carDescription: value })}
						></textarea>
					</Stack>
				</Stack>

				{/* SAVE LISTING */}
				<Stack className={'save-button'}>
					<button type="button" className={'save-listing-btn'} onClick={createCarHandler} disabled={doDisabledCheck()}>
						Save Listing
					</button>
				</Stack>
			</Stack>
		</div>
	);
};

AddListing.defaultProps = {
	initialValues: {
		carBrand: '',
		carModel: '',
		carType: '',
		carYear: 0,
		carPrice: 0,
		carFuelType: '',
		carTransmission: '',
		carColor: '',
		carImages: [],
		carDescription: '',
		carVinNumber: '',
		carIsNew: false,
		carEngineSize: 0,
		carMaxSpeed: 0,
		carSeats: 0,
		carDoors: 0,
		carCityMpg: 0,
		carHighwayMpg: 0,
		carCylinders: 0,
		carDriveType: '',
	},
};

export default withSellerLayout(AddListing);
