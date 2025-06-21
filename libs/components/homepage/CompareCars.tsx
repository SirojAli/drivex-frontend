import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';

const CompareCars = () => {
	return (
		<Stack className={'compare-cars'}>
			<Stack className={'container'}>
				<Box className={'compare-text'}>
					<h2>Compare to buy the right car</h2>
				</Box>
				<Stack className={'compare-car-box'}>
					<Stack className={'compare-box'}>
						<Box className={'all-img'}>
							<img src="/img/cars/header1.jpg" alt="" className={'img-1'} />
							<img src="/img/cars/header1.jpg" alt="" className={'img-2'} />
							<div className={'icon'}>
								<span>VS</span>
							</div>
						</Box>

						<Stack className={'main-box'}>
							<Box className={'content'}>
								<Box className={'left'}>
									<Box className={'title'}>
										<span>Kia</span>
										<p>XUV-700</p>
									</Box>
									<p>$73,000</p>
								</Box>
								<Box className={'right'}>
									<Box className={'title'}>
										<span>Hyundai</span>
										<p>Creta</p>
									</Box>
									<p>$97,000</p>
								</Box>
							</Box>
							<Box className={'compare-btn'}>
								<p>Kia XUV-700 vs Hyundai Creta</p>
							</Box>
						</Stack>
					</Stack>

					<Stack className={'compare-box'}>
						<Box className={'all-img'}>
							<img src="/img/cars/header1.jpg" alt="" className={'img-1'} />
							<img src="/img/cars/header1.jpg" alt="" className={'img-2'} />
							<div className={'icon'}>
								<span>VS</span>
							</div>
						</Box>

						<Stack className={'main-box'}>
							<Box className={'content'}>
								<Box className={'left'}>
									<Box className={'title'}>
										<span>Kia</span>
										<p>XUV-700</p>
									</Box>
									<p>$73,000</p>
								</Box>
								<Box className={'right'}>
									<Box className={'title'}>
										<span>Hyundai</span>
										<p>Creta</p>
									</Box>
									<p>$97,000</p>
								</Box>
							</Box>
							<Box className={'compare-btn'}>
								<p>Kia XUV-700 vs Hyundai Creta</p>
							</Box>
						</Stack>
					</Stack>

					<Stack className={'compare-box'}>
						<Box className={'all-img'}>
							<img src="/img/cars/header1.jpg" alt="" className={'img-1'} />
							<img src="/img/cars/header1.jpg" alt="" className={'img-2'} />
							<div className={'icon'}>
								<span>VS</span>
							</div>
						</Box>

						<Stack className={'main-box'}>
							<Box className={'content'}>
								<Box className={'left'}>
									<Box className={'title'}>
										<span>Kia</span>
										<p>XUV-700</p>
									</Box>
									<p>$73,000</p>
								</Box>
								<Box className={'right'}>
									<Box className={'title'}>
										<span>Hyundai</span>
										<p>Creta</p>
									</Box>
									<p>$97,000</p>
								</Box>
							</Box>
							<Box className={'compare-btn'}>
								<p>Kia XUV-700 vs Hyundai Creta</p>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CompareCars;
