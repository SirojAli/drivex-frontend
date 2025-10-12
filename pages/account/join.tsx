import React, { useCallback, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';

import { useRouter } from 'next/router';
import { logIn, signUp } from '../../libs/auth';
import { sweetMixinErrorAlert } from '../../libs/sweetAlert';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Join: NextPage = () => {
	const router = useRouter();
	const device = useDeviceDetect();
	const [input, setInput] = useState({ nick: '', password: '', email: '' });
	const [loginView, setLoginView] = useState<boolean>(true);

	const viewChangeHandler = (state: boolean) => setLoginView(state);

	const handleInput = useCallback((name: any, value: any) => {
		setInput((prev) => ({ ...prev, [name]: value }));
	}, []);

	const doLogin = useCallback(async () => {
		try {
			await logIn(input.nick, input.password);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	const doSignUp = useCallback(async () => {
		try {
			await signUp(input.nick, input.password, input.email);
			await router.push(`${router.query.referrer ?? '/'}`);
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message);
		}
	}, [input]);

	console.log('+input: ', input);

	if (device === 'mobile') {
		return <div>LOGIN MOBILE</div>;
	} else {
		return (
			<Stack id="join-page">
				<Stack className={'container'}>
					{/* Sub-Header */}
					<Stack className={'sub-header'}>
						<Link href={'/'} className={'link'}>
							Home
						</Link>
						<ArrowForwardIosIcon className={'arrow'} />
						<span>Login / Sign-up</span>
					</Stack>
					<Stack className={'main'}>
						<Stack className={'left'}>
							<img src="/img/cars/i8.png" alt="" />
						</Stack>
						<Stack className={'right'}>
							<Box className={'info'}>
								<span>{loginView ? 'login' : 'signup'}</span>
							</Box>
							<Box className={'input-wrap'}>
								<div className={'input-box'}>
									<span>User Name</span>
									<input
										type="text"
										placeholder={'User name'}
										onChange={(e: any) => handleInput('nick', e.target.value)}
										required
										onKeyDown={(e) => {
											if (e.key === 'Enter') loginView ? doLogin() : doSignUp();
										}}
									/>
								</div>
								{!loginView && (
									<div className={'input-box'}>
										<span>Email Address</span>
										<input
											type="email"
											placeholder={'Email address'}
											onChange={(e: any) => handleInput('email', e.target.value)}
											required
											onKeyDown={(e) => {
												if (e.key === 'Enter') doSignUp();
											}}
										/>
									</div>
								)}
								<div className={'input-box'}>
									<span>Password</span>
									<input
										type="text"
										placeholder={'Your Password'}
										onChange={(e: any) => handleInput('password', e.target.value)}
										required
										onKeyDown={(e) => {
											if (e.key === 'Enter') loginView ? doLogin() : doSignUp();
										}}
									/>
								</div>
							</Box>
							<Box className={'register'}>
								{loginView ? (
									<Button variant="contained" disabled={input.nick == '' || input.password == ''} onClick={doLogin}>
										LOGIN
									</Button>
								) : (
									<Button
										variant="contained"
										disabled={input.nick == '' || input.password == '' || input.email == ''}
										onClick={doSignUp}
									>
										SIGN-UP
									</Button>
								)}
							</Box>
							<Box className={'ask-info'}>
								{loginView ? (
									<p>
										Do not you have an account?
										<b onClick={() => viewChangeHandler(false)}>Sign-up</b>
									</p>
								) : (
									<p>
										Already have an account?
										<b onClick={() => viewChangeHandler(true)}>Login</b>
									</p>
								)}
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withLayoutFull(Join);
