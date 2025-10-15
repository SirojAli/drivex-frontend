import { Stack, Box, Tooltip, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';
import { AccountCircle, Logout } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { REACT_APP_API_URL } from '../config';
import FavoriteIcon from '@mui/icons-material/Favorite';

const TopFull = () => {
	/*INITIALIZATIONS*/
	const [scrollPosition, setScrollPosition] = useState(0);
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);

	/** LIFECYCLES **/
	useEffect(() => {
		const scrollHandler = () => {
			setScrollPosition(window.pageYOffset);
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);
	const isScrolled = scrollPosition >= 100;

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	/** HANDLERS **/

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href="/">
					<span>Home</span>
				</Link>
				<Link href="/brand">
					<span>Brands</span>
				</Link>
				<Link href="/car">
					<span>All Cars</span>
				</Link>
				<Link href="/community">
					<span>Community</span>
				</Link>
				<Link href="/cs">
					<span>CS</span>
				</Link>
				{user?._id && (
					<Link href="/mypage">
						<span>My Page</span>
					</Link>
				)}
			</Stack>
		);
	} else {
		return (
			<Stack className={`navbar ${isScrolled ? 'active_scroll' : ''}`}>
				<Stack className={'navbar-main'}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'} className={'logo'}>
								<img src="/img/logo/logo2.png" alt="logo" loading="lazy" />
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href="/">
								<span>Home</span>
							</Link>
							<Link href="/brand">
								<span>Brands</span>
							</Link>
							<Link href="/car">
								<span>All Cars</span>
							</Link>
							<Link href="/community">
								<span>Community</span>
							</Link>
							<Link href="/cs">
								<span>CS</span>
							</Link>
							{user?._id && (
								<Link href="/mypage">
									<span>My Page</span>
								</Link>
							)}
						</Box>
						<Box component="div" className={'user-box'}>
							{user?._id ? (
								<>
									<Tooltip title="Notifications">
										<IconButton>
											<NotificationsIcon className={'icon-not'} />
										</IconButton>
									</Tooltip>
									<div className={'divider'} />
									<Tooltip title="Favorites">
										<IconButton component="a" href="/mypage?category=myFavorites">
											<FavoriteIcon className={'icon-fav'} />
										</IconButton>
									</Tooltip>
									<div className={'divider'} />
									<div
										className={'profile-img'}
										onClick={(e) => setLogoutAnchor(e.currentTarget)}
										style={{ cursor: 'pointer' }}
									>
										<img
											src={
												user.memberImage ? `${REACT_APP_API_URL}/${user.memberImage}` : '/img/profile/defaultUser.png'
											}
											alt="user"
											loading="lazy"
										/>
									</div>

									<Menu
										id="logout-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => setLogoutAnchor(null)}
										sx={{ mt: '5px' }}
									>
										<MenuItem
											onClick={() => {
												setLogoutAnchor(null);
												logOut();
											}}
										>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href="/account/join">
									<div className={'login-user'}>
										<AccountCircle className={'icon'} />
										<span>Login / Sign-up</span>
									</div>
								</Link>
							)}
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(TopFull);
