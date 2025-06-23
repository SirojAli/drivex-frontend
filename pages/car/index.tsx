import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CarFilter from '../../libs/components/car/Filter';

const CarList: NextPage = () => {
	return (
		<div id="car-list-page">
			<Stack className={'container'}>
				{/* 1. Title */}
				<Stack className={'car-list-title'}>
					<h2>1,000+ Get The Best Deals On Brand New Cars</h2>
					<p>
						Explore our selection of high-quality, brand new vehicles. Our inventory includes top brands like BMW,
						Mercedes, Kia, and more. Find the perfect new car for your needs.
					</p>
				</Stack>

				{/* 2. Main */}
				<Stack className={'main-list'}>
					{/* 2.1. Filter */}
					<Stack className={'filter-box'}>
						<CarFilter />
					</Stack>

					{/* 2.2. Car List */}
					<Stack className={'car-list-box'}></Stack>
				</Stack>
			</Stack>
		</div>
	);
};

export default withLayoutBasic(CarList);
