import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const BrandList: NextPage = () => {
	return (
		<div className={'brand-list'}>
			<Stack className={'container'}>BRAND LIST</Stack>
		</div>
	);
};

export default withLayoutBasic(BrandList);
