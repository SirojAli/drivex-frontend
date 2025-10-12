import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Top from '../Top';
import Footer from '../Footer';
import { getJwtToken, updateUserInfo } from '../../auth';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import Chat from '../Chat';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		const router = useRouter();
		const device = useDeviceDetect();
		const user = useReactiveVar(userVar);

		/** LIFECYCLES **/
		useEffect(() => {
			const jwt = getJwtToken();
			if (jwt) updateUserInfo(jwt);
		}, []);

		/** HANDLERS **/

		if (device == 'mobile') {
			return (
				<>
					<Head>
						<title>Drivex</title>
						<meta name={'title'} content={`Drivex`} />
					</Head>
					<Stack id="mobile-wrap">
						<Stack id="top">
							<Top />
						</Stack>
						<Stack id="main">
							<Component {...props} />
						</Stack>
						<Stack id="footer">
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		} else {
			return (
				<>
					<Head>
						<title>Drivex</title>
						<meta name={'title'} content={`Drivex`} />
					</Head>
					<Stack id="pc-wrap">
						<Stack id="top">
							<Top />
						</Stack>

						<Stack
							className={`header-basic`}
							style={{
								// backgroundImage: `/img/cars/Z.jpg`,
								backgroundSize: 'cover',
								boxShadow: 'inset 10px 40px 150px 40px rgb(24 22 36)',
							}}
						>
							{/* <Stack className={'container'}>
								<strong>DriveX Platform</strong>
								<span>We are glad to serve you!</span>
							</Stack> */}
						</Stack>

						<Stack id="main">
							<Component {...props} />
						</Stack>

						{/* {user?._id && <Chat />} */}
						<Chat />

						<Stack id="footer">
							<Footer />
						</Stack>
					</Stack>
				</>
			);
		}
	};
};

export default withLayoutBasic;
