import { Stack, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Top = () => {
	return (
		<Stack className={'navbar'}>
			<Stack className={'navbar-main'}>
				<Stack className={'container'}>
					<Box component={'div'} className={'logo-box'}>
						<Link href={'/'} className={'logo'}>
							<img src="/img/logo/icon.png" alt="logo" />
							<span>DriveX</span>
						</Link>
					</Box>
					<Box component={'div'} className={'router-box'}>
						<Link href={'/'}>
							<div>Home</div>
						</Link>
						<Link href={'/brand'}>
							<div>Brands</div>
						</Link>
						<Link href={'/cars'}>
							<div>All Cars</div>
						</Link>
						<Link href={'/community?articleCategory=NEWS'}>
							<div>Community</div>
						</Link>
						<Link href={'/cs'}>
							<div>CS</div>
						</Link>
					</Box>
					<Box component={'div'} className={'user-box'}>
						<>
							<div className={'login-user'}>
								<img src={'/img/profile/defaultUser.png'} alt="" />
							</div>

							<Menu id="basic-menu" sx={{ mt: '5px' }} open={false}>
								<MenuItem>
									<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
									Logout
								</MenuItem>
							</Menu>
						</>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

// export default withRouter(Top);
export default Top;
