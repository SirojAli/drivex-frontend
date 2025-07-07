import { Stack, TextField, Button, Checkbox, FormControlLabel, Typography, Box, Avatar } from '@mui/material';
import { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';

import withLayoutFull from '../../libs/components/layout/LayoutFull';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryBox from '../../libs/components/community/CategoryBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

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

const context =
	'Lorem ipsum dolor sit amet, Nunc id viverra erat, quis viverra elit consectetur adipiscing elit Nunc id viverra erat, quis viverra elit. Morbi lacinia sit amet elit sed molestie. Sed neque enim, iaculis id viverra in, scelerisque vitae nulla. Nulla egestas augue vitae mollis semper. Phasellus congue neque et pulvinar gravida. Nam placerat, massa a consequat scelerisque, lacus enim mattis felis, pellentesque volutpat risus nisl et sapien. Proin ac elit vitae velit iaculis varius non quis massa. Nunc fringilla nulla sit amet mattis viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut hendrerit non nisl auctor sollicitudin. Nunc id viverra erat, quis viverra elit.Lorem ipsum dolor sit amet, Nunc id viverra erat, quis viverra elit consectetur adipiscing elit Nunc id viverra erat, quis viverra elit. Morbi lacinia sit amet elit sed molestie. Sed neque enim, iaculis id viverra in, scelerisque vitae nulla. Nulla egestas augue vitae mollis semper. Phasellus congue neque et pulvinar gravida. Nam placerat, massa a consequat scelerisque, lacus enim mattis felis, pellentesque volutpat risus nisl et sapien. Proin ac elit vitae velit iaculis varius non quis massa. Nunc fringilla nulla sit amet mattis viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut hendrerit non nisl auctor sollicitudin. Nunc id viverra erat, quis viverra elit.';

const ArticleDetail: NextPage = () => {
	const device = useDeviceDetect();

	const [firstSentence, ...rest] = context.split('.');
	const restText = rest.join('.').trim();

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
		return <Stack>ARTICLE DETAIL PAGE MOBILE</Stack>;
	} else {
		return (
			<div id="community-detail-page">
				<Stack className={'container'}>
					{/* Sub-Header */}
					<Stack className={'sub-header'}>
						<Link href={'/'} className={'link'}>
							Home
						</Link>
						<ArrowForwardIosIcon className={'arrow'} />
						<span>Blog Detail</span>
					</Stack>
					{/* Title */}
					<Stack className={'car-list-title'}>
						<Stack className={'blog-title'}>
							<h1>The BMW skytop could go into production after all</h1>
							<Stack className={'title-box'}>
								<Box className={'t-box'}>
									<AccountCircleIcon className={'icon'} />
									<p>Sam William</p>
								</Box>
								<Box className={'t-box'}>
									<FolderOpenIcon className={'icon'} />
									<p>News</p>
								</Box>
								<Box className={'t-box'}>
									<ChatIcon className={'icon2'} />
									<span>0 comments</span>
								</Box>
								<Box className={'t-box'}>
									<CalendarTodayIcon className={'icon2'} />
									<span>February 16, 2024</span>
								</Box>
							</Stack>
						</Stack>
						<div className={'divider'}></div>
					</Stack>

					{/* Main */}
					<Stack className={'main-box'}>
						{/* Left Box */}
						<Stack className={'left-box'}>
							<Stack className={'blog-content'}>
								{/* Blog Img */}
								<Stack className={'img-box'}>
									<img src="/img/cars/header1.jpg" alt="" />
								</Stack>
								{/* Blog Content */}
								<Stack className={'content-box'}>
									<span>
										<p>{firstSentence}.</p>
										<p>{restText}</p>
									</span>
								</Stack>
								<div className={'divider'}></div>
								{/* Tag & Share */}
								<Stack className={'tag-share'}>
									<Box className={'tags'}>
										<p>Tags:</p>
										<Box className={'tag'}>
											<span>DriveX</span>
										</Box>
										<Box className={'tag'}>
											<span>News</span>
										</Box>
										<Box className={'tag'}>
											<span>BMW</span>
										</Box>
									</Box>
									<Box className={'share'}>
										<p>Share this post:</p>
										<Box className={'social'}>
											<FacebookIcon className={'icon'} />
										</Box>
										<Box className={'social'}>
											<LinkedInIcon className={'icon'} />
										</Box>
										<Box className={'social'}>
											<XIcon className={'icon'} />
										</Box>
										<Box className={'social'}>
											<InstagramIcon className={'icon'} />
										</Box>
									</Box>
								</Stack>
								{/* Reviews */}
								<Stack className={'reviews'}>
									<h2>Comments (4)</h2>
									{reviews.map((r) => (
										<Box key={r.id} className={'review'}>
											<Box className={'avatar-name-wrapper'}>
												<Box className={'avatar'}>{r.name[0]}</Box>
												<Box className={'avatar-name'}>
													<Typography className={'user-name'}>{r.name}</Typography>
													<Typography className={'date'}>{r.date}</Typography>
												</Box>
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
								{/* Leave a Comment */}
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

									<Box className="input-text">
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
						</Stack>

						{/* Right Box */}
						<Stack className={'right-box'}>
							<Stack className={'category-box'}>
								<CategoryBox />
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</div>
		);
	}
};

export default withLayoutFull(ArticleDetail);
