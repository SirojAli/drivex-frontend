import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Stack, Box, CircularProgress, Modal, Typography } from '@mui/material';
import { REACT_APP_API_URL } from '../../config';
import { GET_CAR } from '../../../apollo/user/query';
import { Car } from '../../types/car/car';
import CompareCarCard from './CompareCarCard';

const comparePairs = [
	{
		car1Id: '68aef8bd65f8de2d81627b01', // bmw 3-series
		car2Id: '68afaf18dad6c5df3f7ac79f', // merc cla
	},
	{
		car1Id: '68ae844b65f8de2d816279b3', // kia ev4
		car2Id: '68aeb95d65f8de2d81627a3f', // hyundai ioniq6
	},
	{
		car1Id: '68b03df2dad6c5df3f7ac84f', // toyota grand high
		car2Id: '68b15bfe92a765155f7ce23f', // audi q5 sport
	},
];

interface CarCompareBoxProps {
	car1Id: string;
	car2Id: string;
	onOpenCompare: (cars: Car[]) => void;
}

const CarCompareBox: React.FC<CarCompareBoxProps> = ({ car1Id, car2Id, onOpenCompare }) => {
	const {
		data: car1Data,
		loading: loading1,
		error: error1,
	} = useQuery<{ getCar: Car }>(GET_CAR, { variables: { input: car1Id } });

	const {
		data: car2Data,
		loading: loading2,
		error: error2,
	} = useQuery<{ getCar: Car }>(GET_CAR, { variables: { input: car2Id } });

	if (loading1 || loading2) return <CircularProgress />;
	if (error1 || error2) return <p>Error loading car data</p>;

	const car1 = car1Data?.getCar;
	const car2 = car2Data?.getCar;

	if (!car1 || !car2) return null;

	return (
		<Stack className="compare-box">
			{/* Images */}
			<Box className="all-img">
				<img src={`${REACT_APP_API_URL}/${car1?.carImages[0]}`} alt={'Car'} loading="lazy" className="img-1" />
				<img src={`${REACT_APP_API_URL}/${car2?.carImages[0]}`} alt={'Car'} loading="lazy" className="img-2" />
				<div className="icon">
					<span>VS</span>
				</div>
			</Box>

			{/* Summary content */}
			<Stack className="main-box">
				<Box className="content">
					<Box className="left">
						<Box className="title">
							<span>{car1.carBrand}</span>
							<p>{car1.carModel}</p>
						</Box>
						<p>${car1.carPrice.toLocaleString()}</p>
					</Box>
					<Box className="right">
						<Box className="title">
							<span>{car2.carBrand}</span>
							<p>{car2.carModel}</p>
						</Box>
						<p>${car2.carPrice.toLocaleString()}</p>
					</Box>
				</Box>

				{/* Compare button */}
				<Box className="compare-btn" onClick={() => onOpenCompare([car1, car2])} sx={{ cursor: 'pointer' }}>
					<p>
						{car1.carModel} vs {car2.carModel}
					</p>
				</Box>
			</Stack>
		</Stack>
	);
};

const CompareCars: React.FC = () => {
	const [openCompare, setOpenCompare] = useState(false);
	const [selectedCars, setSelectedCars] = useState<Car[]>([]);

	const handleOpenCompare = (cars: Car[]) => {
		setSelectedCars(cars);
		setOpenCompare(true);
	};

	const handleCloseCompare = () => {
		setOpenCompare(false);
		setSelectedCars([]);
	};

	return (
		<Stack className="compare-cars">
			<Stack className="container">
				<Box className="compare-text">
					<h2>Compare to buy the right car</h2>
				</Box>

				<Stack className="compare-car-box">
					{comparePairs.map((pair, idx) => (
						<CarCompareBox key={idx} car1Id={pair.car1Id} car2Id={pair.car2Id} onOpenCompare={handleOpenCompare} />
					))}
				</Stack>
			</Stack>

			{/* Compare Cars Modal */}
			<Modal open={openCompare} onClose={handleCloseCompare}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						borderRadius: '12px',
						boxShadow: 24,
						p: 3,
						width: 1120,
						maxHeight: '650px',
						overflowY: 'auto',
					}}
				>
					{selectedCars.length === 2 && <CompareCarCard car1={selectedCars[0]} car2={selectedCars[1]} />}
				</Box>
			</Modal>
		</Stack>
	);
};

export default CompareCars;
