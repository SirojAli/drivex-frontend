import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Article, Car, ChatCircleText, Gauge, Heart, Pen, SignOut, Star, User, UserSquare } from 'phosphor-react';
import cookies from 'js-cookie';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const SellerMenuList = (props: any) => {
	const router = useRouter();
	const device = useDeviceDetect();
	const [openMenu, setOpenMenu] = useState(typeof window === 'object' ? cookies.get('seller_menu') === 'true' : false);
	const [activeMenu, setActiveMenu] = useState('');

	const {
		router: { pathname },
	} = props;
	const pathnames = pathname.split('/').filter((x: any) => x);

	useEffect(() => {
		switch (pathnames[1]) {
			case 'myListing':
				setActiveMenu('My Listing');
				break;
			case 'addListing':
				setActiveMenu('Add Listing');
				break;
			case 'myFavorites':
				setActiveMenu('My Favorites');
				break;
			case 'myBlogs':
				setActiveMenu('My Blogs');
				break;
			case 'addBlog':
				setActiveMenu('Add Blog');
				break;
			case 'messages':
				setActiveMenu('Messages');
				break;
			case 'reviews':
				setActiveMenu('Reviews');
				break;
			case 'myProfile':
				setActiveMenu('My Profile');
				break;
			case 'logout':
				setActiveMenu('Logout');
				break;
			default:
				setActiveMenu('Dashboard');
				break;
		}
	}, []);

	const menu_set = [
		{ title: 'Dashboard', icon: <Gauge size={20} color="#bdbdbd" weight="fill" />, url: '/seller/dashboard' },
		{ title: 'My Listing', icon: <Car size={20} color="#bdbdbd" weight="fill" />, url: '/seller/myListing' },
		{ title: 'Add Listing', icon: <UserSquare size={20} color="#bdbdbd" weight="fill" />, url: '/seller/addListing' },
		{ title: 'My Favorites', icon: <Heart size={20} color="#bdbdbd" weight="fill" />, url: '/seller/myFavorites' },
		{ title: 'My Blogs', icon: <Article size={20} color="#bdbdbd" weight="fill" />, url: '/seller/myBlogs' },
		{ title: 'Add Blog', icon: <Pen size={20} color="#bdbdbd" weight="fill" />, url: '/seller/addBlog/write' },
		{ title: 'Messages', icon: <ChatCircleText size={20} color="#bdbdbd" weight="fill" />, url: '/seller/messages' },
		{ title: 'Reviews', icon: <Star size={20} color="#bdbdbd" weight="fill" />, url: '/seller/reviews' },
		{ title: 'My Profile', icon: <User size={20} color="#bdbdbd" weight="fill" />, url: '/seller/myProfile' },
		{ title: 'Logout', icon: <SignOut size={20} color="#bdbdbd" weight="fill" />, url: '/seller/logout' },
	];

	return (
		<>
			{menu_set.map((item, index) => (
				<List key={index} disablePadding className="menu_wrap">
					<Link href={item.url} passHref legacyBehavior>
						<ListItemButton
							component="a"
							className={activeMenu === item.title ? 'menu on' : 'menu'}
							sx={{
								minHeight: 48,
								justifyContent: openMenu ? 'initial' : 'center',
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openMenu ? 3 : 'auto',
									justifyContent: 'center',
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</Link>
				</List>
			))}
		</>
	);
};

export default withRouter(SellerMenuList);
