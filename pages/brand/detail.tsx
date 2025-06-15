import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const BrandDetail: NextPage = () => {
	return (
		<div className={'brand-list'}>
			<Stack className={'container'}>BRAND DETAIL LIST</Stack>
		</div>
	);
};

export default withLayoutBasic(BrandDetail);
