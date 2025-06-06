import React, { useEffect, useMemo, useState } from 'react';
import { Stack } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useDeviceDetect from '../../hooks/useDeviceDetect';
// import Top from '../Top';
// import Footer from '../Footer';
// import { getJwtToken, updateUserInfo } from '../../auth';
// import Chat from '../Chat';
// import { useReactiveVar } from '@apollo/client';
// import { userVar } from '../../../apollo/store';
// import { useTranslation } from 'next-i18next';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const withLayoutBasic = (Component: any) => {
	return (props: any) => {
		return (
			<>
				<Head>
					<title>Drivex</title>
					<meta name={'title'} content={`Drivex`} />
				</Head>
				<Stack id="pc-wrap">
					<Stack id={'top'} sx={{ background: '#81c784' }}>
						HEADER
					</Stack>
					{/* <Stack id={'top'}><Top /></Stack> */}

					{/* <Stack
						className={`header-basic ${authHeader && 'auth'}`}
						style={{
							backgroundImage: `url(${memoizedValues.bgImage})`,
							backgroundSize: 'cover',
							boxShadow: 'inset 10px 40px 150px 40px rgb(24 22 36)',
						}}
					>
						<Stack className={'container'}>
							<strong>{t(memoizedValues.title)}</strong>
								<span>{t(memoizedValues.desc)}</span>
						</Stack>
					</Stack> */}

					<Stack id={'main'}>
						<Component {...props} />
					</Stack>

					{/* {user?._id && <Chat />} */}
					{/* <Chat /> */}

					<Stack id={'footer'} sx={{ background: '#a18871' }}>
						FOOTER
					</Stack>
					{/* <Stack id={'footer'}><Footer /></Stack> */}
				</Stack>
			</>
		);
	};
};

export default withLayoutBasic;
