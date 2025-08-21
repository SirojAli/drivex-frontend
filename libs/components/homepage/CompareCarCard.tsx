import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Car } from '../../types/car/car';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';

interface CompareCarCardProps {
	car1: Car;
	car2: Car;
}

const fields = [
	{ key: 'carBrand', label: 'Brand' },
	{ key: 'carPrice', label: 'Price' },
	{ key: 'carType', label: 'Type' },
	{ key: 'carYear', label: 'Year' },
	{ key: 'carFuelType', label: 'Fuel Type' },
	{ key: 'carTransmission', label: 'Transmission' },
	{ key: 'carEngineSize', label: 'Engine Size' },
	{ key: 'carDriveType', label: 'Drive Type' },
	{ key: 'carSeats', label: 'Seats' },
	{ key: 'carDoors', label: 'Doors' },
];

const CompareCarCard: React.FC<CompareCarCardProps> = ({ car1, car2 }) => {
	const router = useRouter();
	const cars = [car1, car2];

	const pushDetailHandler = (carId: string) => {
		router.push({
			pathname: '/car/detail',
			query: { id: carId },
		});
	};

	return (
		<Box sx={{ p: 1, maxWidth: '1200px', mx: 'auto', fontFamily: 'Poppins, sans-serif' }}>
			<Typography variant="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
				Car Comparison
			</Typography>

			{/* Car Cards */}
			<Box display="flex" gap={4} mb={4} justifyContent="center">
				{cars.map((car) => (
					<Box
						key={car._id}
						width={340}
						borderRadius="20px"
						overflow="hidden"
						boxShadow="0 6px 18px rgba(0,0,0,0.12)"
						bgcolor="#fff"
					>
						{/* Car Image */}
						<Box height={220} overflow="hidden" sx={{ cursor: 'pointer' }} onClick={() => pushDetailHandler(car._id)}>
							<img
								src={`${REACT_APP_API_URL}/${car.carImages[0]}`}
								alt={car.carModel}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									transition: 'transform 0.4s ease',
								}}
							/>
						</Box>

						{/* Car Info */}
						<Box p={2}>
							<Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
								{car.carYear} {car.carBrand} {car.carModel}
							</Typography>
							<Typography variant="h5" color="#FF7101" fontWeight={600} sx={{ mt: 1 }}>
								₩ {Number(car.carPrice).toLocaleString('ko-KR')}
							</Typography>
						</Box>
					</Box>
				))}
			</Box>

			{/* Car Overview */}
			<Box
				sx={{
					border: '1px solid #e0e0e0',
					borderRadius: '20px',
					overflow: 'hidden',
					bgcolor: '#fff',
					boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
				}}
			>
				{/* Header */}
				<Typography
					variant="h6"
					sx={{
						p: 2.5,
						borderBottom: '1px solid #eee',
						fontSize: '22px',
						fontWeight: 700,
						background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
						textAlign: 'center',
						color: '#0d47a1',
						letterSpacing: '0.5px',
					}}
				>
					Car Overview
				</Typography>

				{/* Rows */}
				{fields.map((field, index) => (
					<Grid
						container
						key={field.key}
						sx={{
							borderBottom: '1px solid #ccc',
							'&:last-of-type': { borderBottom: 'none' },
							backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
						}}
					>
						{/* Field Label */}
						<Grid
							item
							xs={12}
							md={3}
							sx={{
								px: 3,
								py: 2,
								fontWeight: 600,
								fontSize: '1rem',
								display: 'flex',
								alignItems: 'center',
								gap: 1.2,
								background: 'linear-gradient(90deg, #f9f9f9 0%, #f1f1f1 100%)',
								borderRight: '1px solid #eee',
								color: '#37474f',
							}}
						>
							{field.label}
						</Grid>

						{/* Car values */}
						{cars.map((car) => (
							<Grid
								item
								xs={12}
								md={4.5}
								key={car._id + field.key}
								sx={{
									px: 3,
									py: 2,
									fontSize: '1rem',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: field.key === 'carPrice' ? 600 : 400,
									color: 'text.primary',
								}}
							>
								{field.key === 'carPrice'
									? `₩ ${Number((car as any)[field.key]).toLocaleString('ko-KR')}`
									: (car as any)[field.key]}
							</Grid>
						))}
					</Grid>
				))}
			</Box>
		</Box>
	);
};

export default CompareCarCard;
