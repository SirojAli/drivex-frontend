import type { ComponentType } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SellerMenuList from '../seller/SellerMenuList';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Menu, MenuItem, MenuList } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { getJwtToken, logOut, updateUserInfo } from '../../auth';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import { MemberType } from '../../enums/member.enum';
import TopFull from '../TopFull';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Logout } from '@mui/icons-material';

const drawerWidth = 280;

const withSellerLayout = (Component: ComponentType) => {
  return (props: object) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const [settingsState, setSettingsStateState] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [title, setTitle] = useState('seller');
    const [loading, setLoading] = useState(true);
    const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
    const logoutOpen = Boolean(logoutAnchor);

    /** LIFECYCLES **/
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
      setLoading(false);
    }, []);

    useEffect(() => {
      if (!loading && user.memberType !== MemberType.SELLER) {
        router.push('/').then();
      }
    }, [loading, user, router]);

    /** HANDLERS **/
    const handleLogoutMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setLogoutAnchor(event.currentTarget);
    };

    const handleLogoutMenuClose = () => {
      setLogoutAnchor(null);
    };

    const logoutHandler = () => {
      setLogoutAnchor(null);
      logOut();
      router.push('/').then();
    };

    if (!user || user?.memberType !== MemberType.SELLER) return null;

    return (
      <main id="pc-wrap" className={'seller'}>
        <Box component={'div'} sx={{ display: 'flex', width: '100%' }}>
          {/* SELLER NAVBAR */}
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
              boxShadow: 'rgb(100 116 139 / 12%) 0px 1px 4px',
              backgroundColor: '#fff',
              zIndex: 1100,
            }}
          >
            <Box className={'seller-header'}>
              <Box className={'nav-links'}>
                <Link href="/" className={'link'}>
                  Home
                </Link>
                <Link href="/brand" className={'link'}>
                  Brands
                </Link>
                <Link href="/car" className={'link'}>
                  All Cars
                </Link>
                <Link href="/community" className={'link'}>
                  Community
                </Link>
                <Link href="/cs" className={'link'}>
                  CS
                </Link>
                <Link href="/mypage" className={'link'}>
                  My Page
                </Link>
              </Box>

              <Box className={'profile-area'}>
                <Box
                  className={'avatar-button'}
                  onClick={handleLogoutMenuOpen}
                  aria-controls={logoutOpen ? 'logout-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={logoutOpen ? 'true' : undefined}
                >
                  <Avatar
                    src={
                      user?.memberImage
                        ? `${REACT_APP_API_URL}/${user.memberImage}`
                        : '/img/profile/defaultUser.svg'
                    }
                    alt="Seller"
                  />
                </Box>

                <Menu
                  id="logout-menu"
                  anchorEl={logoutAnchor}
                  open={logoutOpen}
                  onClose={handleLogoutMenuClose}
                >
                  <MenuItem
                    onClick={logoutHandler}
                    style={{ display: 'flex', marginTop: '16px', marginRight: '10px' }}
                  >
                    <Logout fontSize="small" />
                    Logout
                  </MenuItem>
                </Menu>

                <Box className={'add-list'} onClick={() => router.push('/_seller/addListing')}>
                  <AddCircleOutlineIcon />
                  <p>Add Listing</p>
                </Box>
              </Box>
            </Box>
          </AppBar>

          {/* SELLER MENU LIST */}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: '#24272c',
              },
            }}
            variant="permanent"
            anchor="left"
            className={'aside'}
          >
            <Stack sx={{ flexDirection: 'column', alignItems: 'flexStart' }}>
              <Stack className={'logo-box'}>
                <img src={'/img/logo/logo.png'} alt={'logo'} loading="lazy" />
                <span>DriveX</span>
              </Stack>
              <Stack className={'user'} direction={'column'}>
                <p>Profile</p>
                <Box className={'avatar-info'}>
                  <Avatar
                    src={
                      user?.memberImage
                        ? `${REACT_APP_API_URL}/${user?.memberImage}`
                        : '/img/profile/defaultUser.svg'
                    }
                    sx={{ width: '50px', height: '50px' }}
                  />
                  <Box className={'user-info'}>
                    <p>{user?.memberNick} </p>
                    <span>{user?.memberEmail}</span>
                  </Box>
                </Box>
              </Stack>
            </Stack>
            <Divider />
            <SellerMenuList />
          </Drawer>

          {/* SELLER COMPONENTS */}
          <Box component={'div'} id="seller-dashboard" sx={{ flexGrow: 1, minWidth: 0 }}>
            {/*@ts-ignore*/}
            <Component {...props} setSnackbar={setSnackbar} setTitle={setTitle} />
          </Box>
        </Box>
      </main>
    );
  };
};

export default withSellerLayout;
