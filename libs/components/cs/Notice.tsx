import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const Notice = () => {
	const device = useDeviceDetect();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	const data = [
		{ no: 1, event: true, title: 'Register to use and get discounts', date: '01.08.2025' },
		{ no: 2, title: "It's absolutely free to upload and trade cars", date: '02.08.2025' },
		{ no: 3, event: true, title: 'New feature: Advanced search filters', date: '05.08.2025' },
		{ no: 4, title: 'Customer support now available 24/7', date: '08.08.2025' },
		{ no: 5, title: 'Mobile app launching soon', date: '10.08.2025' },
		{ no: 6, event: true, title: 'Exclusive discounts for early sellers', date: '12.08.2025' },
		{ no: 7, title: 'Tips for better car listings', date: '13.08.2025' },
		{ no: 8, title: 'How to avoid scams on our platform', date: '15.08.2025' },
		{ no: 9, event: true, title: 'Join our loyalty program', date: '17.08.2025' },
		{ no: 10, title: 'FAQ updated with latest info', date: '18.08.2025' },
		{ no: 11, title: 'Scheduled maintenance on 20th August', date: '20.08.2025' },
		{ no: 12, event: true, title: 'Refer a friend and get rewards', date: '22.08.2025' },
		{ no: 13, title: 'How to improve your car’s photos', date: '25.08.2025' },
		{ no: 14, title: 'Payment options expanded', date: '27.08.2025' },
		{ no: 15, event: true, title: 'Upcoming webinar on car trading', date: '29.08.2025' },
	];

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<Stack className={'notice-content'}>
				{/* <span className={'title'}>Notice</span> */}
				<Stack className={'main'}>
					<Box component={'div'} className={'top'}>
						<span>number</span>
						<span>title</span>
						<span>date</span>
					</Box>
					<Stack className={'bottom'}>
						{data.map((ele: any) => (
							<div className={`notice-card ${ele?.event && 'event'}`} key={ele.title}>
								{ele?.event ? <div>event</div> : <span className={'notice-number'}>{ele.no}</span>}
								<span className={'notice-title'}>{ele.title}</span>
								<span className={'notice-date'}>{ele.date}</span>
							</div>
						))}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Notice;
