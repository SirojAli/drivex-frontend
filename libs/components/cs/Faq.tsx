import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<string>('cars');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/

	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		cars: [
			{
				id: '00f5a45ed8897f8090116a01',
				subject: 'Are the cars listed on your site reliable?',
				content: 'Yes, all cars listed are thoroughly inspected and verified for quality and reliability.',
			},
			{
				id: '00f5a45ed8897f8090116a22',
				subject: 'What types of cars do you offer?',
				content:
					'We offer a wide range of vehicles including sedans, SUVs, hatchbacks, and luxury cars from the top 8 popular brands in South Korea.',
			},
			{
				id: '00f5a45ed8897f8090116a21',
				subject: 'How can I search for cars on your website?',
				content:
					'Use our advanced search filters to select brand, model, price range, year, mileage, and fuel type to find the perfect car.',
			},
			{
				id: '00f5a45ed8897f8090116a23',
				subject: 'Do you offer assistance for first-time car buyers?',
				content:
					'Yes, our team provides guidance throughout the buying process including financing options and vehicle selection advice.',
			},
			{
				id: '00f5a45ed8897f8090116a24',
				subject: 'What should I consider when buying a car?',
				content:
					'Consider factors such as the car’s condition, mileage, maintenance history, warranty, and resale value.',
			},
			{
				id: '00f5a45ed8897f8090116a25',
				subject: 'How long does the car buying process usually take?',
				content: 'Typically, it takes between 3 to 7 days from choosing your car to completing paperwork and payment.',
			},
			{
				id: '00f5a45ed8897f8090116a29',
				subject: 'What if I face issues with the car after purchase?',
				content: 'We offer post-purchase support and warranty services to help resolve any problems promptly.',
			},
			{
				id: '00f5a45ed8897f8090116a28',
				subject: 'Are the cars available in specific regions or cities?',
				content:
					'Yes, we have listings available across major cities and regions in South Korea, tailored to your location preference.',
			},
			{
				id: '00f5a45ed8897f8090116a27',
				subject: 'Can I sell my car through your platform?',
				content:
					'Absolutely! Our platform allows you to list your car for sale easily and reach potential buyers nationwide.',
			},
			{
				id: '00f5a45ed8897f8090116b99',
				subject: 'Can you help me understand the legal requirements for buying a car?',
				content:
					'Yes, we provide basic legal guidance and can connect you with trusted professionals for detailed assistance.',
			},
		],

		payment: [
			{
				id: '00f5a45ed8897f8090116a02',
				subject: 'How can I make the payment?',
				content: 'Payments can be made through authorized dealers or via our secure online payment portal.',
			},
			{
				id: '00f5a45ed8897f8090116a91',
				subject: 'Are there any additional fees for using your services?',
				content: 'Our services are free for buyers. Sellers pay a commission only upon successful sale.',
			},
			{
				id: '00f5a45ed8897f8090116a92',
				subject: 'Is there an option for installment payments?',
				content: 'Yes, installment plans are available for selected cars. Please contact us for detailed options.',
			},
			{
				id: '00f5a45ed8897f8090116a93',
				subject: 'Is my payment information secure on your website?',
				content: 'Absolutely. We use industry-standard encryption and security protocols to protect your payment data.',
			},
			{
				id: '00f5a45ed8897f8090116a94',
				subject: 'Can I make payments online through your website?',
				content: 'Yes, our website features a secure online payment system for your convenience.',
			},
			{
				id: '00f5a45ed8897f8090116a95',
				subject: "What happens if there's an issue with my payment?",
				content: 'If you encounter any payment issues, please contact our customer support immediately for assistance.',
			},
			{
				id: '00f5a45ed8897f8090116a96',
				subject: 'Do you offer refunds for payments made?',
				content:
					'Refunds are handled case-by-case based on our refund policy. Please refer to it or contact support for help.',
			},
			{
				id: '00f5a45ed8897f8090116a97',
				subject: 'Are there any discounts or incentives for early payments?',
				content:
					'We sometimes offer discounts or incentives for early payments. Check current promotions or ask us directly.',
			},
			{
				id: '00f5a45ed8897f8090116a99',
				subject: 'How long does it take for payments to be processed?',
				content: 'Processing time depends on the payment method; credit/debit card payments are usually instant.',
			},
			{
				id: '00f5a45ed8897f8090116a98',
				subject: 'Are there penalties for late payments?',
				content:
					'Late payment penalties may apply as per your purchase agreement. Please review your contract or contact us.',
			},
		],

		buyers: [
			{
				id: '00f5a45ed8897f8090116a03',
				subject: 'What should buyers pay attention to?',
				content:
					'Buyers should carefully assess whether the car fits their needs, budget, and usage before making a decision.',
			},
			{
				id: '00f5a45ed8897f8090116a85',
				subject: 'How can I determine if a car is within my budget?',
				content:
					'Consider your income, down payment, and monthly expenses. Our dealers can help you find cars that fit your budget.',
			},
			{
				id: '00f5a45ed8897f8090116a84',
				subject: 'What documents do I need when purchasing a car?',
				content:
					'Typically, you’ll need identification, proof of income, bank statements, and any loan-related documents. We guide you through the process.',
			},
			{
				id: '00f5a45ed8897f8090116a83',
				subject: 'What factors should I consider when choosing a car?',
				content:
					'Consider your driving needs, fuel efficiency, maintenance costs, brand reliability, and available features.',
			},
			{
				id: '00f5a45ed8897f8090116a82',
				subject: 'Can I negotiate the price of a car?',
				content:
					'Yes, price negotiation is common. Our dealers assist you in making competitive offers and negotiating with sellers.',
			},
			{
				id: '00f5a45ed8897f8090116a81',
				subject: 'What are some red flags to watch out for when inspecting a car?',
				content: 'Watch for signs of accidents, rust, engine issues, unusual noises, and unclear vehicle history.',
			},
			{
				id: '00f5a45ed8897f8090116a80',
				subject: 'Do you provide assistance with car inspections?',
				content:
					'Yes, we recommend trusted inspectors and can accompany you during inspections to identify potential problems.',
			},
			{
				id: '00f5a45ed8897f8090116a79',
				subject: 'How long does it typically take to find the right car?',
				content:
					'Finding the right car varies by preferences and market availability. Our dealers strive to find the best match quickly.',
			},
			{
				id: '00f5a45ed8897f8090116a78',
				subject: 'What are the advantages of using a dealer when buying a car?',
				content:
					'Dealers provide expertise, negotiate on your behalf, and guide you through paperwork, saving time and effort.',
			},
			{
				id: '00f5a45ed8897f8090116a77',
				subject: 'What happens if I change my mind after making an offer?',
				content:
					'Depending on the offer terms and transaction stage, you may have options to withdraw or renegotiate. Contact us promptly.',
			},
		],

		dealers: [
			{
				id: '00f5a45ed8897f8090116a04',
				subject: 'How can I become a registered car dealer on your platform?',
				content:
					'To become a dealer, please review our terms and conditions and contact the admin team to start the registration process.',
			},
			{
				id: '00f5a45ed8897f8090116a62',
				subject: 'What qualifications do I need to become a car dealer?',
				content:
					'You must meet South Korean licensing requirements, including completing any necessary courses and passing dealer exams.',
			},
			{
				id: '00f5a45ed8897f8090116a63',
				subject: 'How can I attract clients as a new dealer?',
				content:
					'Build your network by leveraging online marketing, social media, attending car shows, and joining local dealer associations.',
			},
			{
				id: '00f5a45ed8897f8090116a64',
				subject: 'What marketing strategies work best for selling cars?',
				content:
					'Utilize social media campaigns, online marketplaces, hosting test-drive events, and direct outreach to potential buyers.',
			},
			{
				id: '00f5a45ed8897f8090116a65',
				subject: 'How do I effectively negotiate with buyers and sellers?',
				content:
					'Develop strong communication and negotiation skills, understand current market trends, and always prioritize client interests.',
			},
			{
				id: '00f5a45ed8897f8090116a66',
				subject: 'How can I stay updated with the latest car market trends?',
				content:
					'Attend industry events, follow automotive news, participate in dealer workshops, and engage with industry forums.',
			},
			{
				id: '00f5a45ed8897f8090116a67',
				subject: 'How should I handle difficult clients or challenging situations?',
				content:
					'Maintain professionalism and patience, listen actively, and work collaboratively to find satisfactory solutions.',
			},
			{
				id: '00f5a45ed8897f8090116a68',
				subject: 'What tools and technologies should I use as a dealer?',
				content:
					'Use CRM systems, digital marketing tools, online inventory management, and mobile apps to streamline your business.',
			},
			{
				id: '00f5a45ed8897f8090116a69',
				subject: 'How do I ensure compliance with dealer laws and regulations?',
				content:
					'Stay informed about relevant regulations, attend compliance training, and consult legal experts when necessary.',
			},
			{
				id: '00f5a45ed8897f8090116a70',
				subject: 'What strategies can help me grow my car dealership business?',
				content:
					'Focus on building strong customer relationships, providing excellent service, seeking referrals, and continuously improving your skills.',
			},
		],

		membership: [
			{
				id: '00f5a45ed8897f8090116a05',
				subject: 'Do you offer a membership service on your site?',
				content: 'At the moment, we do not have a membership service available on our platform.',
			},
			{
				id: '00f5a45ed8897f8090116a60',
				subject: 'What are the benefits of becoming a member?',
				content:
					'Currently, we do not offer any membership benefits, but we are exploring options to introduce valuable features in the future.',
			},
			{
				id: '00f5a45ed8897f8090116a59',
				subject: 'Is there a fee to become a member?',
				content: 'Since membership services are not yet available, there are no fees associated at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a58',
				subject: 'Will membership provide access to exclusive content or features?',
				content: 'We do not currently offer any membership-exclusive content or features.',
			},
			{
				id: '00f5a45ed8897f8090116a57',
				subject: 'How can I sign up for membership?',
				content:
					'There is no membership sign-up process at this time, but we will announce any updates as soon as they become available.',
			},
			{
				id: '00f5a45ed8897f8090116a56',
				subject: 'Do members receive discounts on car listings or services?',
				content: 'Membership discounts are not currently offered, but this may change in the future.',
			},
			{
				id: '00f5a45ed8897f8090116a55',
				subject: 'Are there plans to introduce a membership program?',
				content:
					'While we have no confirmed plans yet, we are continually evaluating ways to enhance our services, including potential membership options.',
			},
			{
				id: '00f5a45ed8897f8090116a54',
				subject: 'What benefits can members expect if a membership program is introduced?',
				content:
					'We are considering various benefits and features, but no specific details are available at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Is there a premium membership option?',
				content: 'Currently, we do not offer a premium membership tier.',
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Will membership include access to exclusive deals or discounts?',
				content:
					'Membership perks such as exclusive deals or discounts are not available currently but may be introduced in the future.',
			},
		],

		community: [
			{
				id: '00f5a45ed8897f8090116a06',
				subject: 'What should I do if I encounter abusive or criminal behavior in the community?',
				content:
					'If you notice any abusive or criminal behavior, please report it immediately to our admin team for swift action.',
			},
			{
				id: '00f5a45ed8897f8090116a44',
				subject: 'How can I participate in the community section?',
				content: 'Simply create an account and join the discussions to share your thoughts and connect with others.',
			},
			{
				id: '00f5a45ed8897f8090116a45',
				subject: 'Are there guidelines for posting in the community?',
				content:
					'Yes, please follow our community guidelines to ensure a respectful and positive environment for all members.',
			},
			{
				id: '00f5a45ed8897f8090116a46',
				subject: 'What should I do if I come across spam or irrelevant posts?',
				content:
					'Please report any spam or irrelevant content to the admin so we can keep the community clean and useful.',
			},
			{
				id: '00f5a45ed8897f8090116a47',
				subject: 'Can I connect with other members outside the community section?',
				content: 'Currently, our platform does not support direct connections outside the community forums.',
			},
			{
				id: '00f5a45ed8897f8090116a48',
				subject: 'Can I share personal experiences or recommendations?',
				content:
					'Absolutely! Feel free to share your personal experiences and recommendations as long as they are relevant to the discussion.',
			},
			{
				id: '00f5a45ed8897f8090116a49',
				subject: 'How can I protect my privacy in the community?',
				content: 'Avoid sharing sensitive personal information to keep your privacy intact while participating.',
			},
			{
				id: '00f5a45ed8897f8090116a50',
				subject: 'How can I contribute positively to the community?',
				content:
					'Be respectful, constructive, and supportive in your interactions to help foster a welcoming environment.',
			},
			{
				id: '00f5a45ed8897f8090116a51',
				subject: 'What should I do if I notice misinformation?',
				content: 'You can either provide correct information yourself or report the post to the admin for review.',
			},
			{
				id: '00f5a45ed8897f8090116a52',
				subject: 'Are there moderators overseeing the community?',
				content:
					'Yes, our dedicated moderators monitor the community to ensure rules are followed and to assist members.',
			},
		],

		other: [
			{
				id: '00f5a45ed8897f8090116a40',
				subject: 'Who should I contact if I want to buy your site?',
				content: 'We currently have no plans to sell the site.',
			},
			{
				id: '00f5a45ed8897f8090116a39',
				subject: 'Can I advertise my services on your website?',
				content: 'At this time, we do not offer advertising opportunities on our platform.',
			},
			{
				id: '00f5a45ed8897f8090116a38',
				subject: 'Are sponsorship opportunities available?',
				content: 'We do not have sponsorship opportunities available currently.',
			},
			{
				id: '00f5a45ed8897f8090116a36',
				subject: 'Can I contribute guest posts or articles?',
				content: "We're not accepting guest posts or articles at the moment.",
			},
			{
				id: '00f5a45ed8897f8090116a35',
				subject: 'Is there a referral program for recommending your website?',
				content: "We don't have a referral program in place currently.",
			},
			{
				id: '00f5a45ed8897f8090116a34',
				subject: 'Do you offer affiliate partnerships?',
				content: 'Affiliate partnerships are not available at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Can I purchase merchandise related to your website?',
				content: "We don't offer merchandise for purchase.",
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Are there job openings or opportunities to work with your team?',
				content: 'Currently, there are no job openings or collaboration opportunities available.',
			},
			{
				id: '00f5a45ed8897f8090116a31',
				subject: 'Do you host events or webinars related to car sales?',
				content: 'We are not hosting any events or webinars at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a30',
				subject: 'Can I request custom features or functionalities for the website?',
				content: 'We are not accepting requests for custom features at this moment.',
			},
		],
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'cars' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('cars');
						}}
					>
						Car
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'buyers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('buyers');
						}}
					>
						Foy Buyers
					</div>
					<div
						className={category === 'dealers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('dealers');
						}}
					>
						For Dealers
					</div>
					<div
						className={category === 'membership' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('membership');
						}}
					>
						Membership
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className={'question'} aria-controls="panel1d-content">
									<Typography className={'badge'} variant={'h3'}>
										Q
									</Typography>
									<Typography> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className={'badge'} variant={'h3'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;
