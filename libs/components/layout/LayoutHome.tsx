import React, { useEffect } from 'react';
import Head from 'next/head';
import { Stack } from '@mui/material';

// import useDeviceDetect from '../../hooks/useDeviceDetect';
// import Top from '../Top';
// import Footer from '../Footer';
// import { Stack } from '@mui/material';
// import FiberContainer from '../common/FiberContainer';
// import HeaderFilter from '../homepage/HeaderFilter';
// import { userVar } from '../../../apollo/store';
// import { useReactiveVar } from '@apollo/client';
// import { getJwtToken, updateUserInfo } from '../../auth';
// import Chat from '../Chat';

// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// const withLayoutMain = (Component: any) => {
// 	return (props: any) => {
// 		const device = useDeviceDetect();
// 		const user = useReactiveVar(userVar);

// 		/** LIFECYCLES **/
// 		useEffect(() => {
// 			const jwt = getJwtToken();
// 			if (jwt) updateUserInfo(jwt);
// 		}, []);

// 		/** HANDLERS **/

// 		if (device == 'mobile') {
// 			return (
// 				<>
// 					<Head>
// 						<title>Nestar</title>
// 						<meta name={'title'} content={`Nestar`} />
// 					</Head>
// 					<Stack id="mobile-wrap">
// 						<Stack id={'top'}>
// 							<Top />
// 						</Stack>

// 						<Stack id={'main'}>
// 							<Component {...props} />
// 						</Stack>

// 						<Stack id={'footer'}>
// 							<Footer />
// 						</Stack>
// 					</Stack>
// 				</>
// 			);
// 		} else {
// 			return (
// 				<>
// 					<Head>
// 						<title>Nestar</title>
// 						<meta name={'title'} content={`Nestar`} />
// 					</Head>
// 					<Stack id="pc-wrap">
// 						<Stack id={'top'}>
// 							<Top />
// 						</Stack>

// 						<Stack className={'header-main'}>
// 							<FiberContainer />
// 							<Stack className={'container'}>
// 								<HeaderFilter />
// 							</Stack>
// 						</Stack>

// 						<Stack id={'main'}>
// 							<Component {...props} />
// 						</Stack>

// 						{/* {user?._id && <Chat />} */}
// 						<Chat />

// 						<Stack id={'footer'}>
// 							<Footer />
// 						</Stack>
// 					</Stack>
// 				</>
// 			);
// 		}
// 	};
// };

// export default withLayoutMain;

const withLayoutMain = (Component: any) => {
	return (props: any) => {
		<>
			<Head>
				<title>DRIVEX</title>
			</Head>

			<Stack id="pc-wrap">
				<Stack sx={{ background: '#81c784' }}>Header</Stack>

				<Stack id={'main'}>
					<Component {...props} />
				</Stack>

				<Stack sx={{ background: '#a1887f' }}>Footer</Stack>
			</Stack>
		</>;
	};
};

export default withLayoutMain;
