import {
	Stack,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Typography,
	Box,
	Modal,
	CircularProgress,
} from '@mui/material';
import { NextPage } from 'next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import {
	ArrowForwardIos as ArrowForwardIosIcon,
	ArrowDownward as ArrowDownwardIcon,
	Share as ShareIcon,
	CompareArrows as CompareArrowsIcon,
	FavoriteBorder as FavoriteBorderIcon,
	CheckCircle as CheckCircleIcon,
	Star as StarIcon,
	ThumbUpAltOutlined as ThumbUpAltOutlinedIcon,
	ThumbDownAltOutlined as ThumbDownAltOutlinedIcon,
	Chat as ChatIcon,
	Call as CallIcon,
	LocationOn as LocationOnIcon,
	OutlinedFlag as OutlinedFlagIcon,
	Verified as VerifiedIcon,
	Map as MapIcon,
	DirectionsCar as DirectionsCarIcon,
	EmojiTransportation as EmojiTransportationIcon,
	LocalGasStation as LocalGasStationIcon,
	SettingsSuggest as SettingsSuggestIcon,
	Palette as PaletteIcon,
	EventAvailable as EventAvailableIcon,
	AirlineSeatReclineNormal as AirlineSeatReclineNormalIcon,
	LocationCity as LocationCityIcon,
	AddRoad as AddRoadIcon,
	Speed as SpeedIcon,
	DoorFront as DoorFrontIcon,
	FormatListNumbered as FormatListNumberedIcon,
	NoCrash as NoCrashIcon,
} from '@mui/icons-material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Car } from '../../libs/types/car/car';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { CREATE_COMMENT, LIKE_TARGET_CAR } from '../../apollo/user/mutation';
import { GET_CAR, GET_CARS } from '../../apollo/user/query';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { GET_COMMENTS } from '../../apollo/admin/query';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import CarCard from '../../libs/components/car/CarCard';
import { REACT_APP_API_URL } from '../../libs/config';
import CompareModalContent from './../../pages/car/compare';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CarVideoPlayer from '../../libs/components/car/CarVideo';
import { Member } from '../../libs/types/member/member';
import { CarType } from '../../libs/enums/car.enum';
import { Comment } from '../../libs/types/comment/comment';

const tabs = ['Overview', 'Features', 'Location', 'Video', 'Reviews'];

const baseFeatures = [
	'Touch Screen',
	'Anti Lock Braking System',
	'Power Windows Rear',
	'Power Windows Front',
	'Air Conditioner',
	'Multi-function Wheel',
	'Engine Start Stop Button',
	'Passenger Airbag',
	'Driver Airbag',
	'Power Steering',
];

const carTypeFeaturesMap: Record<CarType, string[]> = {
	SEDAN: ['Automatic Climate Control', 'Leather Upholstery', 'Cruise Control', 'Fog Lights - Front'],
	SUV: ['All-Wheel Drive', 'Roof Rails', 'Fog Lights - Front', 'Adaptive Suspension', 'Heated Seats'],
	HATCHBACK: ['Rear Wiper', 'Split Folding Seats', 'Compact Design'],
	CROSSOVER: ['All-Wheel Drive', 'Roof Rails', 'Fog Lights - Front'],
	COUPE: ['Sport Seats', 'Sport Steering Wheel', 'LED Headlights'],
	CONVERTIBLE: ['Retractable Roof', 'Wind Deflector', 'Heated Seats'],
};

const CarDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	const [openCompare, setOpenCompare] = useState(false);
	const [openCall, setOpenCall] = useState(false);
	const [openMessage, setOpenMessage] = useState(false);
	const [nearestCar, setNearestCar] = useState<Car | null>(null);

	const [carId, setCarId] = useState<string | null>(null);
	const [car, setCar] = useState<Car | null>(null);
	const [popularCars, setPopularCars] = useState<Car[]>([]);

	const [slideImage, setSlideImage] = useState<string>('');
	const imagePath = car?.memberData?.memberImage
		? `${REACT_APP_API_URL}/${car.memberData?.memberImage}`
		: '/img/logo/default.png';

	const [activeTab, setActiveTab] = useState<string>('Overview');
	const [liked, setLiked] = useState(car?.meLiked && car?.meLiked[0]?.myFavorite);
	const features = [...baseFeatures, ...(car?.carType ? carTypeFeaturesMap[car.carType] || [] : [])];

	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>({
		...initialComment,
		limit: initialComment?.limit ?? 5,
		page: initialComment?.page ?? 1,
		search: {
			commentRefId: initialComment?.search?.commentRefId ?? '',
		},
	});
	const [carComments, setCarComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.CAR,
		commentContent: '',
		commentRefId: '',
	});

	const [helpful, setHelpful] = useState<Record<string, boolean | undefined>>({});
	const [replyForm, setReplyForm] = useState({
		name: '',
		email: '',
		message: '',
		remember: false,
	});

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);
	const [createComment] = useMutation(CREATE_COMMENT);

	// Chosen Car Detail
	const {
		loading: getCarLoading,
		data: getCarData,
		error: getCarError,
		refetch: getCarRefetch,
	} = useQuery(GET_CAR, {
		fetchPolicy: 'network-only',
		variables: { input: carId },
		skip: !carId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getCar) setCar(data?.getCar);
			if (data?.getCar) setSlideImage(data?.getCar?.carImages[0]);
		},
	});

	// Popular Cars
	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch,
	} = useQuery(GET_CARS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: 'carViews',
				direction: Direction.DESC,
				search: {
					brandList: car?.carBrand ? [car?.carBrand] : [],
				},
			},
		},
		skip: !carId && !car,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getCars?.list && Array.isArray(data.getCars.list)) {
				setPopularCars(data.getCars.list);
			} else {
				setPopularCars([]);
			}
		},
	});

	// Comments
	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialComment },
		skip: !commentInquiry?.search?.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) => {
			if (data?.getComments?.list) {
				setCarComments(data.getComments.list);
			}
			setCommentTotal(data?.getComments?.metaCounter?.[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.id) {
			const carId = router.query.id as string;
			setCarId(carId);
			setCommentInquiry((prev) => ({
				...prev,
				search: {
					...prev.search,
					commentRefId: carId,
				},
			}));
			setInsertCommentData((prev) => ({
				...prev,
				commentRefId: carId,
			}));
		}
	}, [router.query.id]);

	useEffect(() => {
		if (commentInquiry.search.commentRefId) {
			getCommentsRefetch({ input: commentInquiry });
		}
	}, [commentInquiry]);

	useEffect(() => {
		setLiked(car?.meLiked && car?.meLiked[0]?.myFavorite);
	}, [car]);

	/** HANDLERS **/
	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const handleShare = () => {
		const carUrl = window.location.href;
		navigator.clipboard.writeText(carUrl).then(() => {
			alert('🔗 Link copied to clipboard!');
		});
	};

	// Modal Logics
	const getNearestPriceCar = (currentCar: Car | null, cars: Car[]): Car | null => {
		if (!currentCar || !cars.length) return null;

		let nearest: Car | null = null;
		let minDiff = Infinity;

		cars.forEach((c) => {
			if (c._id === currentCar._id) return; // skip current car
			const diff = Math.abs(c.carPrice - currentCar.carPrice);
			if (diff < minDiff) {
				minDiff = diff;
				nearest = c;
			}
		});

		return nearest;
	};

	const handleCompare = () => {
		if (!car || !popularCars.length) return;

		const nearest = getNearestPriceCar(car, popularCars);
		setNearestCar(nearest);
		setOpenCompare(true);
	};

	const handleCompareClose = () => setOpenCompare(false);

	const handlePhoneNumber = (status: boolean) => {
		setOpenCall(status);
	};

	const handleMessage = (status: boolean) => {
		setOpenMessage(status);
	};

	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetCar({ variables: { input: id } });
			setLiked((prev) => !prev);

			// Refetch GET_CARS with the correct input object (prevents $input error)
			await getCarsRefetch({
				input: {
					page: 1,
					limit: 4,
					sort: 'carViews',
					direction: Direction.DESC,
					search: {
						brandList: car?.carBrand ? [car.carBrand] : [],
					},
				},
			});

			await sweetTopSmallSuccessAlert('Success!', 800);
		} catch (err: any) {
			console.log('ERROR, likeCarHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const pushBrandPageHandler = async (brandSlug?: string) => {
		if (!brandSlug) return;
		await router.push(`/brand/${brandSlug}`);
	};

	const createCommentHandler = async () => {
		try {
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await createComment({ variables: { input: insertCommentData } });

			setInsertCommentData({ ...insertCommentData, commentContent: '' });

			await getCommentsRefetch({ input: commentInquiry });

			sweetTopSmallSuccessAlert('Your review was submitted successfully!');
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const commentPaginationChangeHandler = async () => {
		const updatedInquiry = {
			...commentInquiry,
			limit: 15,
		};

		setCommentInquiry(updatedInquiry);

		await getCommentsRefetch({ input: updatedInquiry });
	};

	if (getCarLoading) {
		return (
			<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
				<CircularProgress size={'4rem'} />
			</Stack>
		);
	}

	const handleHelpful = (id: string, isHelpful: boolean) => {
		setHelpful((prev) => ({ ...prev, [id]: isHelpful }));
	};

	const viewCarsHandler = async () => {
		await router.push({
			pathname: '/car',
		});
	};

	if (device === 'mobile') {
		return <Stack>CAR DETAIL MOBILE</Stack>;
	} else {
		return (
			<>
				<div id="car-detail-page">
					<Stack className={'container'}>
						{/* Sub-Header */}
						<Stack className={'sub-header'}>
							<Link href={'/'} className={'link'}>
								Home
							</Link>
							<ArrowForwardIosIcon className={'arrow'} />
							<span>Car Detail</span>
						</Stack>

						{/* Title */}
						<Stack className={'car-detail-title'}>
							<Box className={'content'}>
								<Box className={'heading'}>
									<h1>{car?.carBrand && car?.carModel ? `${car.carBrand} ${car.carModel}` : car?.carModel}</h1>
									<div className={'car-category'}>
										{car?.carFuelType && (
											<div className={'category'}>
												<img src="/img/icons/fuel.png" alt="fuel" />
												<span>{car.carFuelType}</span>
											</div>
										)}
										{car?.carTransmission && (
											<div className={'category'}>
												<img src="/img/icons/auto.png" alt="transmission" />
												<span>{car.carTransmission}</span>
											</div>
										)}
										{car?.carEngineSize && (
											<div className={'category'}>
												<img src="/img/icons/speed.png" alt="engine" />
												<span>{Number(car.carEngineSize).toFixed(1)}</span>
											</div>
										)}
									</div>
								</Box>
								{car?.carPrice && <span>W{Number(car.carPrice).toLocaleString()}</span>}
							</Box>

							{/* ACTION BOX: Like, Share, Compare */}
							<Box className="action-box">
								<div
									className="action like-btn"
									// @ts-ignore
									onClick={() => likeCarHandler(user, car?._id)}
								>
									{liked ? (
										<FavoriteIcon className={`heart-icon ${liked ? 'liked' : ''}`} />
									) : (
										<FavoriteBorderIcon className="heart-icon" />
									)}
								</div>

								<div className="action" onClick={handleShare}>
									<ShareIcon className="icon" />
								</div>

								<div className="action" onClick={handleCompare}>
									<CompareArrowsIcon className="icon" />
								</div>
							</Box>
						</Stack>

						{/* Main */}
						<Stack className={'main-list'}>
							{/* Filter */}
							<Stack className={'left-box'}>
								<Stack className={'img-box'}>
									<Stack className={'main-img'}>
										<img
											src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
											alt="main-car"
										/>
									</Stack>

									<Stack className={'sub-img'}>
										{car?.carImages.map((subImg: string) => {
											const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
											return (
												<Stack className={'sub-img-box'} onClick={() => changeImageHandler(subImg)} key={subImg}>
													<img src={imagePath} alt={'sub-image'} />
												</Stack>
											);
										})}
									</Stack>
								</Stack>

								<Stack className={'tab-box'}>
									{/* TO-DO LATER */}
									{tabs.map((tab) => (
										<Button
											key={tab}
											onClick={() => {
												setActiveTab(tab);

												const section = document.getElementById(tab.toLowerCase());
												if (section) {
													section.scrollIntoView({ behavior: 'smooth' });
												}
											}}
											className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
										>
											{tab}
										</Button>
									))}
								</Stack>
								{/* Description */}
								<Stack id="overview" className={'desc'}>
									<h2>Description</h2>
									<span>
										{car?.carDescription &&
											(() => {
												const sentences = car.carDescription
													.split('.')
													.map((s) => s.trim())
													.filter(Boolean);

												const first = sentences[0] || '';
												const second = sentences.slice(1, 4).join('. ') || '';
												const third = sentences.slice(4).join('. ') || '';

												return (
													<>
														<p>{first}.</p>
														{second && <p>{second}.</p>}
														{third && <p>{third}.</p>}
													</>
												);
											})()}
									</span>
								</Stack>
								<div className={'divider'}></div>

								{/* Features */}
								<Stack id="feature" className={'feat'}>
									<h2>Specs & Features</h2>
									<Box className={'main-feat'}>
										{features.map((feature) => (
											<Box className={'feature-item'} key={feature}>
												<CheckCircleIcon className={'check-icon'} />
												<span>{feature}</span>
											</Box>
										))}
									</Box>
								</Stack>
								<div className={'divider'}></div>

								<Stack className={'address-config'}>
									<Typography className={'title'}>Location</Typography>
									<div className={'locate'}>
										<MapIcon className={'icon'} />
										<p>{car?.memberData?.memberAddress}</p>
									</div>
									<Stack className={'map-box'}>
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.701601938205!2d126.9784!3d37.5665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3cce1d4c9b7%3A0x89a6179113e2d0a!2sSeoul!5e0!3m2!1sen!2skr!4v1696111111111!5m2!1sen!2skr"
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen={true}
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										></iframe>
									</Stack>
								</Stack>
								<div className={'divider'}></div>

								{/* Video */}
								<CarVideoPlayer videoUrl={car?.carVideoUrl} />
								<div className={'divider'}></div>

								{/* Reviews */}
								<Stack id="review" className="reviews">
									<h2>Reviews & Rating</h2>
									<Box className="rating-box">
										<Box className="star-box">
											<StarIcon className="main-star" />
										</Box>
										<Typography className="score">4.8</Typography>
										<Box className="total">
											<Typography className="rating-label">Overall Rating</Typography>
											<Typography className="total-reviews">
												Based on <strong>{commentTotal} Reviews</strong>
											</Typography>
										</Box>
									</Box>

									<Typography className="section-title">{commentTotal} Ratings and Reviews</Typography>

									{carComments.length === 0 && <Typography>No reviews yet. Be the first to leave one!</Typography>}

									{carComments.map((r, idx) => (
										<Box key={r._id ?? idx} className="review">
											<Box className="avatar-name-wrapper">
												<Box className="avatar">
													{r.memberData?.memberImage?.[0] ? (
														<img src={imagePath} alt="user-avatar" className="avatar-img" />
													) : (
														<span>{r.memberData?.memberNick?.[0] ?? 'U'}</span>
													)}
												</Box>
												<Box className="avatar-name">
													<Typography className="user-name">{r.memberData?.memberFullName ?? 'User'}</Typography>
													<Box className="stars">
														{Array(5)
															.fill(0)
															.map((_, i) => (
																<StarIcon key={i} className="filled-star" />
															))}
													</Box>
												</Box>
												<Typography className="date">{new Date(r.createdAt).toLocaleDateString()}</Typography>
											</Box>

											<Box className="content">
												<Typography className="comment">{r.commentContent}</Typography>
												<Box className="footer">
													<Typography className="helpful-label">Is this review helpful?</Typography>
													<Button
														className={`helpful-btn ${helpful[r._id] === true ? 'selected' : ''}`}
														onClick={() => handleHelpful(r._id, true)}
													>
														<ThumbUpAltOutlinedIcon fontSize="small" />
														Yes
													</Button>
													<Button
														className={`helpful-btn ${helpful[r._id] === false ? 'selected' : ''}`}
														onClick={() => handleHelpful(r._id, false)}
													>
														<ThumbDownAltOutlinedIcon fontSize="small" />
														No
													</Button>
												</Box>
											</Box>
										</Box>
									))}

									{commentTotal > (commentInquiry.limit ?? 5) && commentInquiry.limit !== 15 && (
										<Box className="show-more" onClick={commentPaginationChangeHandler}>
											<Typography className="more-link">View more reviews</Typography>
											<Box className="arrow">
												<ArrowDownwardIcon className="icon" />
											</Box>
										</Box>
									)}
								</Stack>

								{/* Post Comment */}
								{user?._id ? (
									<Stack className={'leave-comment'}>
										<Typography className={'main-title'}>Leave A Review</Typography>
										{/* <Typography className={'review-title'}>Review</Typography> */}

										<textarea
											value={insertCommentData.commentContent}
											onChange={({ target: { value } }) =>
												setInsertCommentData((prev) => ({ ...prev, commentContent: value }))
											}
										/>

										<Box className={'submit-btn'} component={'div'}>
											<Button
												className={'submit-review'}
												disabled={!insertCommentData.commentContent.trim()}
												onClick={createCommentHandler}
											>
												<Typography className={'title'}>Submit Review</Typography>
												<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
													<g clipPath="url(#clip0_6975_3642)">
														<path
															d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
															fill="#fff"
															stroke="#fff"
															strokeWidth="1.5"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6975_3642">
															<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
														</clipPath>
													</defs>
												</svg>
											</Button>
										</Box>
									</Stack>
								) : (
									<Stack className={'leave-comment'}>
										<Typography className={'main-title'}>Leave A Review</Typography>
										<Typography className={'review-title'}>
											You must <strong>log in</strong> to leave a comment.
										</Typography>
										<Button variant="outlined" href="/account/join" sx={{ mt: 2 }}>
											Login to Comment
										</Button>
									</Stack>
								)}
							</Stack>

							{/* Car List */}
							<Stack className={'right-box'}>
								{/* Contact Dealer */}
								<Stack className={'seller-contact'}>
									<Stack className={'main'}>
										<Box className={'info'} onClick={() => pushBrandPageHandler(car?.memberData?.brandSlug)}>
											<img src={imagePath} />
											<Box className={'content'}>
												<h4>{car?.carBrand ?? 'Unknown Dealer'}</h4>
												<div className={'verify'}>
													<VerifiedIcon className={'icon'} />
													<p>Verified dealer</p>
												</div>
											</Box>
										</Box>

										<Box className={'businees-hours'}>
											<p>Business hours</p>
											<Box className={'schedule'}>
												<Box className={'tab'}>
													<p>Monday - Friday:</p>
													<span>9:00 - 18:00</span>
												</Box>
												<Box className={'tab'}>
													<p>Saturday:</p>
													<span>10:00 - 16:00</span>
												</Box>
												<Box className={'tab'}>
													<p>Sunday & Holidays</p>
													<span>Close</span>
												</Box>
											</Box>
										</Box>

										<div className={'dvr'}></div>

										<Box className={'rate'}>
											<p>1000+ Reviews</p>
											<Box className={'stars'}>
												{Array(5)
													.fill(0)
													.map((_, i) => (
														<StarIcon key={i} className={'filled-star'} />
													))}
											</Box>
										</Box>

										<Box className={'contact-box'}>
											<p>Contact Dealer</p>
											<div className={'contact'}>
												<Box className={'call'} onClick={() => handlePhoneNumber(true)}>
													<CallIcon className={'icon'} />
													<span>Call to Dealer</span>
												</Box>
												<Box className={'message'} onClick={() => handleMessage(true)}>
													<ChatIcon className={'icon'} />
													<span>Chat</span>
												</Box>
											</div>
										</Box>
									</Stack>
								</Stack>

								{/* Car Overview */}
								<Stack className={'car-overview'}>
									<h3>Car Overview</h3>
									<Stack className={'main'}>
										{/* Car Brand */}
										<Box className={'over-box'}>
											<EmojiTransportationIcon className={'icon'} />
											<div className={'content'}>
												<span>Car Make</span>
												<p>{car?.carBrand}</p>
											</div>
										</Box>
										{/* Car Type */}
										<Box className={'over-box'}>
											<DirectionsCarIcon className={'icon'} />
											<div className={'content'}>
												<span>Car Type</span>
												<p>{car?.carType}</p>
											</div>
										</Box>
										{/* VIN Number */}
										<Box className={'over-box'}>
											<FormatListNumberedIcon className={'icon'} />
											<div className={'content'}>
												<span>VIN Number</span>
												<p>{car?.carVinNumber}</p>
											</div>
										</Box>
										{/* Condition */}
										<Box className={'over-box'}>
											<NoCrashIcon className={'icon'} />
											<div className={'content'}>
												<span>Condition</span>
												<p>New</p>
											</div>
										</Box>
										{/* Car Year */}
										<Box className={'over-box'}>
											<EventAvailableIcon className={'icon'} />
											<div className={'content'}>
												<span>Year</span>
												<p>{car?.carYear}</p>
											</div>
										</Box>
										{/* Car Fuel Type */}
										<Box className={'over-box'}>
											<LocalGasStationIcon className={'icon'} />
											<div className={'content'}>
												<span>Fuel Type</span>
												<p>{car?.carFuelType}</p>
											</div>
										</Box>
										{/* Car Transmission */}
										<Box className={'over-box'}>
											<img src="/img/icons/transmission.png" alt="" className={'img1'} />
											<div className={'content'}>
												<span>Transmission</span>
												<p>{car?.carTransmission}</p>
											</div>
										</Box>
										{/* Car Color */}
										<Box className={'over-box'}>
											<PaletteIcon className={'icon'} />
											<div className={'content'}>
												<span>Color</span>
												<p>{car?.carColor}</p>
											</div>
										</Box>
										{/* Engine Size */}
										<Box className={'over-box'}>
											<img src="/img/icons/engine.png" alt="" />
											<div className={'content'}>
												<span>Engine Size</span>
												<p>{car?.carEngineSize}</p>
											</div>
										</Box>
										{/* Maximum Speed */}
										<Box className={'over-box'}>
											<SpeedIcon className={'icon'} />
											<div className={'content'}>
												<span>Speed</span>
												<p>{car?.carMaxSpeed}</p>
											</div>
										</Box>
										{/* Car Seats */}
										<Box className={'over-box'}>
											<AirlineSeatReclineNormalIcon className={'icon'} />
											<div className={'content'}>
												<span>Seats</span>
												<p>{car?.carSeats}</p>
											</div>
										</Box>
										{/* Doors */}
										<Box className={'over-box'}>
											<DoorFrontIcon className={'icon'} />
											<div className={'content'}>
												<span>Doors</span>
												<p>{car?.carDoors}</p>
											</div>
										</Box>
										{/* City MPG */}
										<Box className={'over-box'}>
											<LocationCityIcon className={'icon'} />
											<div className={'content'}>
												<span>City MPG</span>
												<p>{car?.carCityMpg}</p>
											</div>
										</Box>
										{/* Highway MPG */}
										<Box className={'over-box'}>
											<AddRoadIcon className={'icon'} />
											<div className={'content'}>
												<span>Highway MPG</span>
												<p>{car?.carHighwayMpg}</p>
											</div>
										</Box>
										{/* Cylinders */}
										<Box className={'over-box'}>
											<img src="/img/icons/cylinders.jpg" alt="" />
											<div className={'content'}>
												<span>Cylinders</span>
												<p>{car?.carCylinders}</p>
											</div>
										</Box>
										{/* Drive Type */}
										<Box className={'over-box'}>
											<img src="/img/icons/wheel.png" alt="" className={'img1'} />
											<div className={'content'}>
												<span>Drive Type</span>
												<p>{car?.carDriveType}</p>
											</div>
										</Box>
									</Stack>
								</Stack>

								{/* Popular Cars */}
								<Stack className={'popular-cars'}>
									<Box className={'title'}>
										<h3>Popular Cars</h3>
										<span>Explore 32 more cars you might like</span>
									</Box>
									<Box className="listing">
										{popularCars.map((car: Car) => (
											<Box className="car-box" key={car._id} onClick={() => router.push(`/car/detail?id=${car._id}`)}>
												<img
													src={`${REACT_APP_API_URL}/${car?.carImages?.[0] ?? 'img/default-car.png'}`}
													alt={car?.carModel}
													loading="lazy"
												/>
												<div className="text">
													<p>{car?.carBrand && car?.carModel ? `${car.carBrand} ${car.carModel}` : car?.carModel}</p>
													<span>₩{Number(car.carPrice).toLocaleString()}</span>
												</div>
											</Box>
										))}
									</Box>
									<Box className={'show-more'}>
										<Typography
											className={'more-link'}
											onClick={() => {
												viewCarsHandler();
											}}
										>
											View more cars
										</Typography>
										<Box className={'arrow'}>
											<ArrowDownwardIcon className={'icon'} />
										</Box>
									</Box>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
				</div>

				<Modal
					open={openCompare}
					onClose={handleCompareClose}
					aria-labelledby="compare-modal-title"
					aria-describedby="compare-modal-description"
				>
					<Box
						className={'compare-car-box'}
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							bgcolor: 'background.paper',
							borderRadius: '12px',
							boxShadow: 24,
							p: 3,
							width: 1120,
							maxHeight: '650px',
							overflowY: 'auto',
						}}
					>
						{car && nearestCar ? (
							<CompareModalContent car1={car} car2={nearestCar} />
						) : (
							<Typography>No similar car found for comparison.</Typography>
						)}
					</Box>
				</Modal>

				{/* Phone Number Modal */}
				<Modal open={openCall} onClose={() => setOpenCall(false)}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							bgcolor: '#fff',
							borderRadius: '16px',
							boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
							p: 4,
							width: 380,
							textAlign: 'center',
						}}
					>
						<Typography variant="h5" fontWeight={700} color="#333" mb={2}>
							📞 Dealer Phone
						</Typography>

						<Typography variant="h4" fontWeight={600} color="#ff7101" mb={3}>
							{car?.memberData?.memberPhone ?? 'Not Available'}
						</Typography>

						<Button
							variant="contained"
							fullWidth
							sx={{ backgroundColor: '#ff7101', color: '#fff', fontWeight: 600, borderRadius: 2 }}
							onClick={() => {
								if (car?.memberData?.memberPhone) {
									navigator.clipboard.writeText(car.memberData.memberPhone);
									alert('Phone number copied!');
								}
							}}
						>
							Copy Phone Number
						</Button>
					</Box>
				</Modal>

				{/* Message Modal */}
				<Modal open={openMessage} onClose={() => setOpenMessage(false)}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							bgcolor: '#fff',
							borderRadius: '16px',
							boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
							p: 4,
							width: 520,
							maxHeight: '90vh',
							overflowY: 'auto',
						}}
					>
						<Typography variant="h5" fontWeight={700} color="#333" mb={2}>
							✉️ Send Message to Dealer
						</Typography>

						<Stack spacing={2}>
							<TextField
								label="Your Email"
								type="email"
								variant="outlined"
								fullWidth
								size="small"
								value={replyForm.email}
								onChange={(e) => setReplyForm({ ...replyForm, email: e.target.value })}
							/>

							<TextField
								label="Title"
								variant="outlined"
								fullWidth
								size="small"
								value={replyForm.name}
								onChange={(e) => setReplyForm({ ...replyForm, name: e.target.value })}
							/>

							<TextField
								label="Message"
								variant="outlined"
								fullWidth
								multiline
								minRows={4}
								size="small"
								value={replyForm.message}
								onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
								InputProps={{
									sx: {
										alignItems: 'flex-start',
										paddingTop: '12px',
									},
								}}
							/>

							<Button
								variant="contained"
								sx={{
									width: '200px',
									backgroundColor: '#7ed321',
									color: '#fff',
									fontWeight: 600,
									borderRadius: 2,
									alignSelf: 'center',
									':hover': { backgroundColor: '#6bc01c' },
								}}
								onClick={async () => {
									try {
										if (!replyForm.message) return;

										await createComment({
											variables: {
												input: {
													...insertCommentData,
													commentContent: replyForm.message,
												},
											},
										});

										setOpenMessage(false);
										setReplyForm({ name: '', email: '', message: '', remember: false });
										getCommentsRefetch({ input: commentInquiry });
										sweetTopSmallSuccessAlert('Message sent!');
									} catch (err) {
										await sweetErrorHandling(err);
									}
								}}
							>
								Send Message
							</Button>
						</Stack>
					</Box>
				</Modal>
			</>
		);
	}
};

export default withLayoutFull(CarDetail);
