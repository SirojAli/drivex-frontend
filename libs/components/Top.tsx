import { Stack, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AccountCircle, Logout } from '@mui/icons-material';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Top = () => {
	/*INITIALIZATIONS*/
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const scrollHandler = () => {
			setScrollPosition(window.pageYOffset);
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);

	const isScrolled = scrollPosition >= 100;

	return (
		<Stack className={`navbar ${isScrolled ? 'active_scroll' : ''}`}>
			<Stack className={'navbar-main'}>
				<Stack className={'container'}>
					<Box component={'div'} className={'logo-box'}>
						<Link href={'/'} className={'logo'}>
							<img src="/img/logo/icon.png" alt="logo" />
							<span>DriveX</span>
						</Link>
					</Box>
					<Box component={'div'} className={'router-box'}>
						<Link href={'/'}>
							<div>Home</div>
						</Link>
						<Link href={'/brand'}>
							<div>Brands</div>
						</Link>
						<Link href={'/car'}>
							<div>All Cars</div>
						</Link>
						<Link href={'/community?articleCategory=NEWS'}>
							<div>Community</div>
						</Link>
						<Link href={'/cs'}>
							<div>CS</div>
						</Link>
					</Box>
					<Box component={'div'} className={'user-box'}>
						<FavoriteBorderIcon className={'like'} />
						<div className={'divider'}></div>
						<Link href={'/account/join'}>
							<div className={'login-user'}>
								<AccountCircle className={'user'} />
								<span>Login</span>
							</div>
						</Link>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

// export default withRouter(Top);
export default Top;
