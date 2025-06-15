import { Box, Stack } from '@mui/material';
import moment from 'moment';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
	return (
		<Stack className={'footer-container'}>
			{/* Footer Top */}
			<Stack className={'footer-top'}>
				<Stack className={'top'}>
					<Box className={'icon'}>
						<img src="/img/icons/cup.png" alt="icon" />
					</Box>
					<Box className={'text'}>
						<h5>Korean Number 1</h5>
						<span>Largest Auto Portal</span>
					</Box>
				</Stack>
				<Stack className={'top'}>
					<Box className={'icon'}>
						<img src="/img/icons/sold.png" alt="icon" />
					</Box>
					<Box className={'text'}>
						<h5>Car Sold</h5>
						<span>Every 15 minutes</span>
					</Box>
				</Stack>
				<Stack className={'top'}>
					<Box className={'icon'}>
						<img src="/img/icons/offer.png" alt="icon" />
					</Box>
					<Box className={'text'}>
						<h5>Offers</h5>
						<span>Stay Updated, Pay less</span>
					</Box>
				</Stack>
				<Stack className={'top'}>
					<Box className={'icon'}>
						<img src="/img/icons/compare.png" alt="icon" />
					</Box>
					<Box className={'text'}>
						<h5>Compare</h5>
						<span>Choose the right car</span>
					</Box>
				</Stack>
			</Stack>
			<div className={'divider'}></div>

			{/* Footer Main */}
			<Stack className={'footer-main'}>
				<Stack className={'main'}>
					<h3>About DriveX</h3>
					<Box className={'info'}>
						<span>About us</span>
						<span>Careers With Us</span>
						<span>Terms & Conditions</span>
						<span>Privacy Policy</span>
						<span>Corporate Policies</span>
						<span>Investors</span>
						<span>FAQs</span>
					</Box>
				</Stack>
				<Stack className={'main'}>
					<h3>Popular Cars</h3>
					<Box className={'info'}>
						<span>BMW</span>
						<span>Mercedes-Benz</span>
						<span>Kia</span>
						<span>Hyundai</span>
						<span>Lamborghini</span>
						<span>Bugatti</span>
						<span>Ferrari</span>
					</Box>
				</Stack>
				<Stack className={'main'}>
					<h3>Other</h3>
					<Box className={'info'}>
						<span>Terms and Conditions</span>
						<span>Privacy Policy</span>
						<span>Copyrights</span>
						<span>Help center</span>
						<span>How it work</span>
						<span>Car sale trends</span>
						<span>Personal loan</span>
					</Box>
				</Stack>
				<Stack className={'main'}>
					<h3>Newsletter</h3>
					<Box className={'email'}>
						<p>Stay on top of the latest car trends, tips, and tricks</p>
						<form className="form">
							<input type="email" placeholder="Your email address" required />
							<button type="submit">
								<p>Send</p>
							</button>
						</form>
					</Box>
				</Stack>
			</Stack>
			<div className={'divider'}></div>

			{/* Footer End */}
			<Stack className={'footer-end'}>
				<Box className={'logo-box'}>
					<img src="/img/logo/icon.png" alt="logo" />
					<span>DriveX</span>
				</Box>
				<Box className={'info-social'}>
					<span>© 2025 Drivex. All rights reserved</span>
					<div className={'media-box'}>
						<FacebookOutlinedIcon className={'icon'} />
						<TelegramIcon className={'icon'} />
						<InstagramIcon className={'icon'} />
						<TwitterIcon className={'icon'} />
						<YouTubeIcon className={'icon'} />
					</div>
				</Box>
			</Stack>
		</Stack>
	);
};

export default Footer;
