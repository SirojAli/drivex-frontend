import type { ComponentType } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MenuList from '../admin/AdminMenuList';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Menu, MenuItem } from '@mui/material';
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

const drawerWidth = 280;

/* ========== STYLES ========== */
const styles = `
  body {
    background: #f9fafb; /* main dashboard background */
    font-family: 'Inter', sans-serif;
  }

  .admin .MuiAppBar-root {
    background: #ffffff !important; /* clean white appbar */
    color: #1f2937;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    border-bottom: 1px solid #e5e7eb;
  }

  .aside .MuiDrawer-paper {
    background: #1e293b !important; /* navy sidebar */
    color: #e5e7eb !important;
    border-right: none;
    box-shadow: 2px 0 6px rgba(0,0,0,0.2);
  }

  .logo-box img {
    width: 160px;
    margin: 16px auto;
    display: block;
  }

  .user {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    margin-top: 12px;
    color: #e5e7eb;
  }

  .user .MuiAvatar-root {
    border: 2px solid #2563eb;
  }

  .user p {
    font-size: 13px;
    line-height: 1.4;
    color: #cbd5e1;
  }

  .pop-menu {
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }

  #bunker {
    background: #f9fafb;
    min-height: 100vh;
    padding: 24px;
  }
`;

const withAdminLayout = (Component: ComponentType) => {
  return (props: object) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const [settingsState, setSettingsStateState] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [title, setTitle] = useState('admin');
    const [loading, setLoading] = useState(true);

    /** LIFECYCLES **/
    useEffect(() => {
      const jwt = getJwtToken();
      if (jwt) updateUserInfo(jwt);
      setLoading(false);
    }, []);

    useEffect(() => {
      if (!loading && user.memberType !== MemberType.ADMIN) {
        router.push('/').then();
      }
    }, [loading, user, router]);

    /** HANDLERS **/
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const logoutHandler = () => {
      logOut();
      router.push('/').then();
    };

    if (!user || user?.memberType !== MemberType.ADMIN) return null;

    return (
      <main id="pc-wrap" className={'admin'}>
        <style jsx>{styles}</style>
        <Box component={'div'} sx={{ display: 'flex' }}>
          {/* TOP BAR */}
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`,
            }}
          >
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={
                      user?.memberImage
                        ? `${REACT_APP_API_URL}/${user?.memberImage}`
                        : '/img/profile/defaultUser.svg'
                    }
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                className={'pop-menu'}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box
                  component={'div'}
                  onClick={handleCloseUserMenu}
                  sx={{
                    width: '200px',
                  }}
                >
                  <Stack sx={{ px: '20px', my: '12px' }}>
                    <Typography variant={'h6'} component={'h6'} sx={{ mb: '4px' }}>
                      {user?.memberNick}
                    </Typography>
                    <Typography variant={'subtitle1'} component={'p'} color={'#757575'}>
                      {user?.memberPhone}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Box component={'div'} sx={{ p: 1, py: '6px' }} onClick={logoutHandler}>
                    <MenuItem sx={{ px: '16px', py: '6px' }}>
                      <Typography variant={'subtitle1'} component={'span'}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Box>
                </Box>
              </Menu>
            </Toolbar>
          </AppBar>

          {/* SIDEBAR */}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
            className={'aside'}
          >
            <Toolbar sx={{ flexDirection: 'column', alignItems: 'flexStart', width: '100%' }}>
              <Stack className={'logo-box'}>
                <img
                  style={{ width: '80px', height: '80px' }}
                  src={'/img/logo/icon.png'}
                  alt={'logo'}
                  loading="lazy"
                />
              </Stack>

              <div
                className={'user'}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: '#2c3e50',
                  gap: '12px',
                }}
              >
                <Box sx={{ width: '40px', height: '40px' }}>
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={
                      user.memberImage
                        ? `${REACT_APP_API_URL}/${user.memberImage}`
                        : '/img/profile/defaultUser.png'
                    }
                    alt="user"
                    loading="lazy"
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p>{user?.memberNick} </p>
                  <span>{user?.memberPhone}</span>
                </Box>
              </div>
            </Toolbar>

            <Divider sx={{ borderColor: '#334155' }} />

            <MenuList />
          </Drawer>

          {/* MAIN CONTENT */}
          <Box component={'div'} id="bunker" sx={{ flexGrow: 1 }}>
            {/*@ts-ignore*/}
            <Component {...props} setSnackbar={setSnackbar} setTitle={setTitle} />
          </Box>
        </Box>
      </main>
    );
  };
};

export default withAdminLayout;
