import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ChatsCircle, Headset, User, UserCircleGear } from 'phosphor-react';
import cookies from 'js-cookie';
import useDeviceDetect from '../../hooks/useDeviceDetect';

/* ================= STYLES ================= */
const styles = `
  .menu_wrap {
    background: #1e293b; /* sidebar background */
    border-radius: 12px;
    margin: 6px 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .menu {
    color: #e5e7eb; /* light gray text */
    font-size: 15px;
    font-weight: 500;
    transition: background 0.3s, color 0.3s;
  }

  .menu:hover {
    background: #2563eb; /* blue hover */
    color: #ffffff;
  }

  .menu.on {
    background: #2563eb; /* blue active */
    color: #ffffff;
  }

  .menu .MuiListItemIcon-root {
    color: inherit;
    transition: color 0.3s;
  }

  .menu-list {
    background: #1e293b; /* same sidebar color for submenu */
    padding-left: 12px;
  }

  .menu-list .li {
    color: #e5e7eb;
    font-size: 14px;
    border-radius: 8px;
    margin: 4px 6px;
    transition: background 0.3s, color 0.3s;
  }

  .menu-list .li:hover {
    background: #2563eb; /* blue hover */
    color: #fff;
  }

  .menu-list .li.on {
    background: #2563eb; /* blue active */
    color: #fff;
    font-weight: 600;
  }

  .menu-list .li span {
    font-size: 14px;
    padding-left: 4px;
  }

  /* Optional: overall background */
  body {
    background: #f9fafb; /* main dashboard background */
  }
`;

const AdminMenuList = (props: any) => {
  const router = useRouter();
  const device = useDeviceDetect();
  const [mobileLayout, setMobileLayout] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState('Users');
  const [openMenu, setOpenMenu] = useState(
    typeof window === 'object' ? cookies.get('admin_menu') === 'true' : false,
  );
  const [clickMenu, setClickMenu] = useState<any>([]);
  const [clickSubMenu, setClickSubMenu] = useState('');

  const {
    router: { pathname },
  } = props;
  const pathnames = pathname.split('/').filter((x: any) => x);

  /** LIFECYCLES **/
  useEffect(() => {
    if (device === 'mobile') setMobileLayout(true);

    switch (pathnames[1]) {
      case 'cars':
        setClickMenu(['Cars']);
        break;
      case 'community':
        setClickMenu(['Community']);
        break;
      case 'cs':
        setClickMenu(['Cs']);
        break;
      default:
        setClickMenu(['Users']);
        break;
    }

    switch (pathnames[2]) {
      case 'logs':
        setClickSubMenu('Logs');
        break;
      case 'inquiry':
        setClickSubMenu('1:1 Inquiry');
        break;
      case 'notice':
        setClickSubMenu('Notice');
        break;
      case 'faq':
        setClickSubMenu('FAQ');
        break;
      case 'board_create':
        setClickSubMenu('Board Create');
        break;
      default:
        setClickSubMenu('List');
        break;
    }
  }, []);

  /** HANDLERS **/
  const subMenuChangeHandler = (target: string) => {
    if (clickMenu.find((item: string) => item === target)) {
      setClickMenu(clickMenu.filter((menu: string) => target !== menu));
    } else {
      setClickMenu([...clickMenu, target]);
    }
  };

  const menu_set = [
    {
      title: 'Users',
      icon: <User size={20} color="#e5e7eb" weight="fill" />,
      on_click: () => subMenuChangeHandler('Users'),
    },
    {
      title: 'Cars',
      icon: <UserCircleGear size={20} color="#e5e7eb" weight="fill" />,
      on_click: () => subMenuChangeHandler('Cars'),
    },
    {
      title: 'Community',
      icon: <ChatsCircle size={20} color="#e5e7eb" weight="fill" />,
      on_click: () => subMenuChangeHandler('Community'),
    },
    {
      title: 'Cs',
      icon: <Headset size={20} color="#e5e7eb" weight="fill" />,
      on_click: () => subMenuChangeHandler('Cs'),
    },
  ];

  const sub_menu_set: any = {
    Users: [{ title: 'List', url: '/_admin/users' }],
    Cars: [{ title: 'List', url: '/_admin/cars' }],
    Community: [{ title: 'List', url: '/_admin/community' }],
    Cs: [
      { title: 'FAQ', url: '/_admin/cs/faq' },
      { title: 'Notice', url: '/_admin/cs/notice' },
    ],
  };

  return (
    <>
      <style jsx>{styles}</style>
      {menu_set.map((item, index) => (
        <List className={'menu_wrap'} key={index} disablePadding>
          <ListItemButton
            onClick={item.on_click}
            component={'li'}
            className={clickMenu[0] === item.title ? 'menu on' : 'menu'}
            sx={{
              minHeight: 48,
              justifyContent: openMenu ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openMenu ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
            {clickMenu.find((menu: string) => item.title === menu) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          <Collapse
            in={!!clickMenu.find((menu: string) => menu === item.title)}
            className={'menu'}
            timeout="auto"
            component="li"
            unmountOnExit
          >
            <List className={'menu-list'} disablePadding>
              {sub_menu_set[item.title] &&
                sub_menu_set[item.title].map((sub: any, i: number) => (
                  <Link href={sub.url} shallow={true} replace={true} key={i}>
                    <ListItemButton
                      component="li"
                      className={
                        clickMenu[0] === item.title && clickSubMenu === sub.title ? 'li on' : 'li'
                      }
                    >
                      <Typography variant={'body2'} component={'span'}>
                        {sub.title}
                      </Typography>
                    </ListItemButton>
                  </Link>
                ))}
            </List>
          </Collapse>
        </List>
      ))}
    </>
  );
};

export default withRouter(AdminMenuList);
