import { Stack, TextField, Button, Checkbox, FormControlLabel, Typography, Box, Avatar } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import VerifiedIcon from '@mui/icons-material/Verified';
import MapIcon from '@mui/icons-material/Map';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import PaletteIcon from '@mui/icons-material/Palette';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import SpeedIcon from '@mui/icons-material/Speed';
import DoorFrontIcon from '@mui/icons-material/DoorFront';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

const carImages = [
	'/img/cars/header1.jpg',
	'/img/logo/kia2.png',
	'/img/cars/header1.jpg',
	'/img/logo/kia2.png',
	'/img/cars/header1.jpg',
];

const tabs = ['Overview', 'Specs & Features', 'Video', 'Reviews', 'Recommended cars'];

const description =
	'Lorem ipsum dolor sit amet, Nunc id viverra erat, quis viverra elit consectetur adipiscing elit Nunc id viverra erat, quis viverra elit. Morbi lacinia sit amet elit sed molestie. Sed neque enim, iaculis id viverra in, scelerisque vitae nulla. Nulla egestas augue vitae mollis semper. Phasellus congue neque et pulvinar gravida. Nam placerat, massa a consequat scelerisque, lacus enim mattis felis, pellentesque volutpat risus nisl et sapien. Proin ac elit vitae velit iaculis varius non quis massa. Nunc fringilla nulla sit amet mattis viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut hendrerit non nisl auctor sollicitudin. Nunc id viverra erat, quis viverra elit.';

const mainFeatures = [
	'Touch Screen',
	'Anti Lock Braking System',
	'Power Windows Rear',
	'Power Windows Front',
	'Air Conditioner',
	'Alloy Wheels',
	'Multi-function Steering Wheel',
	'Engine Start Stop Button',
	'Passenger Airbag',
	'Fog Lights - Front',
	'Automatic Climate Control',
	'Adjustable Exterior View Mirror',
	'Power Steering',
	'Driver Airbag',
];

const otherFeatureGroups = ['Comfort & Convenience', 'Interior', 'Exterior', 'Safety', 'Entertainment & Communication'];

const reviews = [
	{
		id: 1,
		name: 'Leslie Alexander',
		date: 'August 13, 2025',
		comment:
			"It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
	},
	{
		id: 2,
		name: 'Arlene McCoy',
		date: 'August 13, 2025',
		comment:
			"It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
	},
	{
		id: 3,
		name: 'Jane Cooper',
		date: 'August 13, 2025',
		comment:
			"It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.",
	},
];

const CarDetail: NextPage = () => {
	const device = useDeviceDetect();

	const [slideImage, setSlideImage] = useState<string>(carImages[0]);
	const [activeTab, setActiveTab] = useState<string>('Overview');

	const [firstSentence, ...rest] = description.split('.');
	const restText = rest.join('.').trim();

	const renderContent = () => {
		switch (activeTab) {
			case 'Specs & features':
				return <p>Here are the specs and features...</p>;
			case 'Recommended cars':
				return <p>Here are some recommended cars...</p>;
			case 'Loan calculator':
				return <p>Loan calculator section...</p>;
			case 'New car reviews':
				return <p>Latest car reviews and expert opinions...</p>;
			default:
				return <p>This is the overview of the car.</p>;
		}
	};

	const [helpful, setHelpful] = useState<{ [key: number]: boolean | null }>({});
	const handleHelpful = (id: number, value: boolean) => {
		setHelpful((prev) => ({ ...prev, [id]: value }));
	};

	const [replyForm, setReplyForm] = useState({
		name: '',
		email: '',
		message: '',
		remember: false,
	});

	const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setReplyForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReplyForm((prev) => ({ ...prev, remember: e.target.checked }));
	};

	const handlePostComment = () => {
		console.log('Reply submitted:', replyForm);
		// Add real submission logic here if needed
	};

	if (device === 'mobile') {
		return <Stack>CAR DETAIL MOBILE</Stack>;
	} else {
		return (
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
								<h1>BMW X7 2020 Super Turbo</h1>
								<div className={'car-category'}>
									<div className={'category'}>
										<img src="/img/icons/fuel.png" alt="fuel" />
										<span>Petrol</span>
									</div>
									<div className={'category'}>
										<img src="/img/icons/auto.png" alt="transmission" />
										<span>Auto</span>
									</div>
									<div className={'category'}>
										<img src="/img/icons/speed.png" alt="engine" />
										<span>3.0 L</span>
									</div>
								</div>
							</Box>
							<span>$73,000</span>
							{/* <Box className={'sub-content'}>
							<div className={'price'}>
								<p>Monthly installment payment:</p>
								<span>$4,000</span>
							</div>
							<span>New car price: $100.000</span>
						</Box> */}
						</Box>
						<Box className={'action-box'}>
							<div className={'action'}>
								<FavoriteBorderIcon className={'icon'} />
							</div>
							<div className={'action'}>
								<ShareIcon className={'icon'} />
							</div>
							<div className={'action'}>
								<CompareArrowsIcon className={'icon'} />
							</div>
						</Box>
					</Stack>

					{/* Main */}
					<Stack className={'main-list'}>
						{/* Filter */}
						<Stack className={'left-box'}>
							<Stack className={'img-box'}>
								<Stack className={'main-img'}>
									<img src={slideImage} alt="main-car" />
								</Stack>

								<Stack className={'sub-img'}>
									{carImages.map((img, index) => (
										<Stack
											className={`sub-img-box ${img === slideImage ? 'active' : ''}`}
											onClick={() => setSlideImage(img)}
											key={index}
										>
											<img src={img} alt="sub-car" />
										</Stack>
									))}
								</Stack>
							</Stack>
							<Stack className={'tab-box'}>
								{tabs.map((tab) => (
									<Button
										key={tab}
										onClick={() => setActiveTab(tab)}
										className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
									>
										{tab}
									</Button>
								))}
							</Stack>
							<Stack className={'desc'}>
								<h2>Description</h2>
								<span>
									<p>{firstSentence}.</p>
									<p>{restText}</p>
								</span>
							</Stack>
							<div className={'divider'}></div>
							<Stack className={'feat'}>
								<h2>Features</h2>
								<Box className={'main-feat'}>
									{mainFeatures.map((feature) => (
										<Box className={'feature-item'} key={feature}>
											<CheckCircleIcon className={'check-icon'} />
											<span>{feature}</span>
										</Box>
									))}
								</Box>
								<Box className={'other-feat'}>
									{otherFeatureGroups.map((group) => (
										<Box className={'feat-group'} key={group}>
											<Typography className={'group-title'}>{group}</Typography>
											<ArrowForwardIosIcon className={'arrow-icon'} />
										</Box>
									))}
								</Box>
							</Stack>
							<Stack className={'address-config'}>
								<Typography className={'title'}>Location</Typography>
								<div className={'locate'}>
									<MapIcon className={'icon'} />
									<p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
								</div>
								<Stack className={'map-box'}>
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25867.098915951767!2d128.68632810247993!3d35.86402299180927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bba427bf179%3A0x1fc02da732b9072f!2sGeumhogangbyeon-ro%2C%20Dong-gu%2C%20Daegu!5e0!3m2!1suz!2skr!4v1695537640704!5m2!1suz!2skr"
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
							<Stack className={'reviews'}>
								<h2>Reviews & Rating</h2>
								<Box className={'rating-box'}>
									<Box className={'star-box'}>
										<StarIcon className={'main-star'} />
									</Box>
									<Typography className={'score'}>4.8</Typography>
									<Box className={'total'}>
										<Typography className={'rating-label'}>Overall Rating</Typography>
										<Typography className={'total-reviews'}>
											Based on <strong>372 Reviews</strong>
										</Typography>
									</Box>
								</Box>
								<Typography className={'section-title'}>372 Ratings and Reviews</Typography>
								{reviews.map((r) => (
									<Box key={r.id} className={'review'}>
										<Box className={'avatar-name-wrapper'}>
											<Box className={'avatar'}>{r.name[0]}</Box>
											<Box className={'avatar-name'}>
												<Typography className={'user-name'}>{r.name}</Typography>
												<Box className={'stars'}>
													{Array(5)
														.fill(0)
														.map((_, i) => (
															<StarIcon key={i} className={'filled-star'} />
														))}
												</Box>
											</Box>
											<Typography className={'date'}>{r.date}</Typography>
										</Box>
										<Box className={'content'}>
											<Typography className={'comment'}>{r.comment}</Typography>
											<Box className={'footer'}>
												<Typography className={'helpful-label'}>Is this review helpful?</Typography>
												<Button
													className={`helpful-btn ${helpful[r.id] === true ? 'selected' : ''}`}
													onClick={() => handleHelpful(r.id, true)}
												>
													<ThumbUpAltOutlinedIcon fontSize="small" />
													Yes
												</Button>
												<Button
													className={`helpful-btn ${helpful[r.id] === false ? 'selected' : ''}`}
													onClick={() => handleHelpful(r.id, false)}
												>
													<ThumbDownAltOutlinedIcon fontSize="small" />
													No
												</Button>
											</Box>
										</Box>
									</Box>
								))}
								<Box className={'show-more'}>
									<Typography className={'more-link'}>View more reviews</Typography>
									<Box className={'arrow'}>
										<ArrowDownwardIcon className={'icon'} />
									</Box>
								</Box>
							</Stack>
							<Stack className={'comment'}>
								<Typography className={'reply-title'}>Leave a Comment</Typography>
								<Typography className={'reply-note'}>Your email address will not be published</Typography>

								<Box className={'input-row'}>
									<TextField
										label="Your name"
										name="name"
										value={replyForm.name}
										onChange={handleReplyChange}
										className={'text-field'}
									/>
									<TextField
										label="Your email"
										name="email"
										value={replyForm.email}
										onChange={handleReplyChange}
										className={'text-field'}
									/>
								</Box>

								<FormControlLabel
									control={<Checkbox checked={replyForm.remember} onChange={handleRememberChange} name="remember" />}
									label="Save your name, email for the next time review"
								/>

								<Box className={'input-text'}>
									<TextField
										label="Your Message"
										name="message"
										value={replyForm.message}
										onChange={handleReplyChange}
										multiline
										fullWidth
										InputProps={{
											sx: {
												height: '130px', // Total height of the TextField
												alignItems: 'flex-start', // Align text to top
											},
										}}
										InputLabelProps={{
											shrink: true, // Keeps the label up
										}}
										sx={{
											'& .MuiInputBase-root': {
												height: '130px',
												alignItems: 'flex-start',
											},
											'& .MuiInputBase-inputMultiline': {
												padding: '12px',
												height: '100% !important',
												boxSizing: 'border-box',
												resize: 'none',
											},
										}}
									/>
								</Box>

								<Button onClick={handlePostComment} className={'submit-btn'}>
									<span>Post Comment</span>
								</Button>
							</Stack>
						</Stack>

						{/* Car List */}
						<Stack className={'right-box'}>
							{/* Contact Dealer */}
							<Stack className={'seller-contact'}>
								<Stack className={'main'}>
									<Box className={'info'}>
										<img src="/img/logo/BMW.png" alt="brand-logo" />
										<Box className={'content'}>
											<h4>Mercedes-Benz</h4>
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
											<Box className={'call'}>
												<CallIcon className={'icon'} />
												<span>Call to Dealer</span>
											</Box>
											<Box className={'message'}>
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
											<p>BMW</p>
										</div>
									</Box>
									{/* Car Type */}
									<Box className={'over-box'}>
										<DirectionsCarIcon className={'icon'} />
										<div className={'content'}>
											<span>Car Type</span>
											<p>Sedan</p>
										</div>
									</Box>
									{/* VIN Number */}
									<Box className={'over-box'}>
										<FormatListNumberedIcon className={'icon'} />
										<div className={'content'}>
											<span>VIN Number</span>
											<p>66516518732132</p>
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
											<p>2024</p>
										</div>
									</Box>
									{/* Car Fuel Type */}
									<Box className={'over-box'}>
										<LocalGasStationIcon className={'icon'} />
										<div className={'content'}>
											<span>Fuel Type</span>
											<p>Petrol</p>
										</div>
									</Box>
									{/* Car Transmission */}
									<Box className={'over-box'}>
										<img src="/img/icons/transmission.png" alt="" className={'img1'} />
										<div className={'content'}>
											<span>Transmission</span>
											<p>Manual</p>
										</div>
									</Box>
									{/* Car Color */}
									<Box className={'over-box'}>
										<PaletteIcon className={'icon'} />
										<div className={'content'}>
											<span>Color</span>
											<p>Black</p>
										</div>
									</Box>
									{/* Engine Size */}
									<Box className={'over-box'}>
										<img src="/img/icons/engine.png" alt="" />
										<div className={'content'}>
											<span>Engine Size</span>
											<p>3.0</p>
										</div>
									</Box>
									{/* Maximum Speed */}
									<Box className={'over-box'}>
										<SpeedIcon className={'icon'} />
										<div className={'content'}>
											<span>Speed</span>
											<p>240</p>
										</div>
									</Box>
									{/* Car Seats */}
									<Box className={'over-box'}>
										<AirlineSeatReclineNormalIcon className={'icon'} />
										<div className={'content'}>
											<span>Seats</span>
											<p>4</p>
										</div>
									</Box>
									{/* City MPG */}
									<Box className={'over-box'}>
										<LocationCityIcon className={'icon'} />
										<div className={'content'}>
											<span>City MPG</span>
											<p>20</p>
										</div>
									</Box>
									{/* Highway MPG */}
									<Box className={'over-box'}>
										<AddRoadIcon className={'icon'} />
										<div className={'content'}>
											<span>Highway MPG</span>
											<p>24</p>
										</div>
									</Box>
									{/* Doors */}
									<Box className={'over-box'}>
										<DoorFrontIcon className={'icon'} />
										<div className={'content'}>
											<span>Doors</span>
											<p>4</p>
										</div>
									</Box>
									{/* Cylinders */}
									<Box className={'over-box'}>
										<img src="/img/icons/cylinders.jpg" alt="" />
										<div className={'content'}>
											<span>Cylinders</span>
											<p>6</p>
										</div>
									</Box>
									{/* Drive Type */}
									<Box className={'over-box'}>
										<img src="/img/icons/wheel.png" alt="" className={'img1'} />
										<div className={'content'}>
											<span>Drive Type</span>
											<p>AWD - All-wheel drive</p>
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
								<Box className={'listing'}>
									<Box className={'car-box'}>
										<img src={'/img/cars/header1.jpg'} alt={'Car'} />
										<div className={'text'}>
											<p>2012 Mercedes-Benz E-Class 2009-2013 E 200 CGI Avantgarde</p>
											<span>$73,000</span>
										</div>
									</Box>
									<Box className={'car-box'}>
										<img src={'/img/cars/header1.jpg'} alt={'Car'} />
										<div className={'text'}>
											<p>2012 Mercedes-Benz E-Class 2009-2013 E 200 CGI Avantgarde</p>
											<span>$73,000</span>
										</div>
									</Box>
									<Box className={'car-box'}>
										<img src={'/img/cars/header1.jpg'} alt={'Car'} />
										<div className={'text'}>
											<p>2012 Mercedes-Benz E-Class 2009-2013 E 200 CGI Avantgarde</p>
											<span>$73,000</span>
										</div>
									</Box>
									<Box className={'car-box'}>
										<img src={'/img/cars/header1.jpg'} alt={'Car'} />
										<div className={'text'}>
											<p>2012 Mercedes-Benz E-Class 2009-2013 E 200 CGI Avantgarde</p>
											<span>$73,000</span>
										</div>
									</Box>
								</Box>
								<Box className={'show-more'}>
									<Typography className={'more-link'}>View more cars</Typography>
									<Box className={'arrow'}>
										<ArrowDownwardIcon className={'icon'} />
									</Box>
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</div>
		);
	}
};

export default withLayoutFull(CarDetail);
