import React from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Box, Stack, Typography } from '@mui/material';

const Message: NextPage = () => {
	return (
		<div className={'message-blog'}>
			<h3>Messages</h3>
			<Stack className={'message-container'}>
				<Stack className={'message-sidebar'}>
					<Box className={'search-bar'}>
						<input type="text" placeholder="Search..." />
					</Box>
					<Box className={'message-list'}>
						{[
							'Leslie Alexander',
							'Arlene McCoy',
							'Kristin Watson',
							'Cody Fisher',
							'Bessie Cooper',
							'Savannah Nguyen',
						].map((name, idx) => (
							<Box className={'message-preview'} key={idx}>
								<Box className={'avatar'}>{name[0]}</Box>
								<div className={'preview-text'}>
									<p>{name}</p>
									<span>Lorem ipsum dolor sit amet...</span>
								</div>
								<span className={'preview-date'}>Aug 13, 2023</span>
							</Box>
						))}
					</Box>
				</Stack>
				<Stack className={'message-chat'}>
					<Stack className={'message-header'}>
						<div className={'avatar'}></div>
						<Box className={'profile'}>
							<p>Arlene McCoy</p>
							<span>Online</span>
						</Box>
					</Stack>

					<Stack className={'message-body'}>
						<div className={'message-bubble right'}>
							<p>
								Dear Mr Williamson,
								<br />
								I would like to send you the quotation for the Toyota Fortuner
								<br />
								Srp:
								<br />
								Downpayment:
								<br />
								Monthly payment:
								<br />
								If you have more questions, don’t hesitate to contact me via this number: 09012345678.
								<br />
								I’m happy to assist!
							</p>
							<span className={'time'}>2:30 PM - Aug 17, 2025</span>
						</div>

						<div className={'message-bubble left'}>
							<p>Yes</p>
							<span className={'time'}>2:46 PM - Aug 17, 2025</span>
						</div>

						<div className={'message-bubble right'}>
							<p>
								Dear Mr Williamson,
								<br />
								Thank you for inquiring Toyota Fortuner. My name is Adam, Sales Consultant at Toyota Cubao. If you are
								still interested in Toyota Fortuner, kindly answer “Yes” for the quotation. For any further assistance,
								please do not hesitate to contact me via 09012345678 or dvg.ap.ngpmt1@gmail.com.
								<br />
								Have a great day ahead!
							</p>
							<span className={'time'}>3:30 PM - Aug 17, 2025</span>
						</div>
					</Stack>

					<Stack className={'message-input'}>
						<input type="text" placeholder="Type your message..." />
						<button>Send</button>
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
};

export default withSellerLayout(Message);
