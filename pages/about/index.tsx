import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const AboutList: NextPage = () => {
	return (
		<div className={'cs-list'}>
			<Stack className={'container'}>ABOUT LIST</Stack>
		</div>
	);
};

export default withLayoutBasic(AboutList);
