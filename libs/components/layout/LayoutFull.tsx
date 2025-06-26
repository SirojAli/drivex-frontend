import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import Footer from '../Footer';
import TopFull from '../TopFull';

import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
// import { getJwtToken, updateUserInfo } from '../../auth';
// import Chat from '../Chat';
// import { useReactiveVar } from '@apollo/client';
// import { userVar } from '../../../apollo/store';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const withLayoutFull = (Component: any) => {
	return (props: any) => {
		return (
			<>
				<Head>
					<title>Drivex</title>
					<meta name="title" content="Drivex" />
				</Head>
				<Stack id="pc-wrap">
					<Stack id="top-full">
						<TopFull />
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
	};
};

export default withLayoutFull;
