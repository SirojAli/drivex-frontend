import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Head from 'next/head';
// import Top from '../Top';
// import Footer from '../Footer';
// import { getJwtToken, updateUserInfo } from '../../auth';
// import Chat from '../Chat';
// import { useReactiveVar } from '@apollo/client';
// import { userVar } from '../../../apollo/store';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const withLayoutFull = (Component: any) => {
	return (props: any) => {
		<>
			<Head>
				<title>Drivex</title>
				<meta name={'title'} content={`Drivex`} />
			</Head>
			<Stack id="pc-wrap">
				<Stack id="top">HEADER</Stack>
				{/* <Stack id='top'><Top /></Stack> */}

				<Stack id="main">
					<Component {...props} />
				</Stack>

				{/* {user?._id && <Chat />} */}
				{/* <Chat /> */}

				<Stack id="footer">FOOTER</Stack>
				{/* <Stack id='footer'><Footer /></Stack> */}
			</Stack>
		</>;
	};
};

export default withLayoutFull;
