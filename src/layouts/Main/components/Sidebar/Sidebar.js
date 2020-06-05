import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReportIcon from '@material-ui/icons/Report';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PetsIcon from '@material-ui/icons/Pets';
import PanToolIcon from '@material-ui/icons/PanTool';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, user, ...rest } = props;

  const classes = useStyles();
  const pages = [
    {
      title: 'Inicio',
      href: '/',
      icon: <DashboardIcon />
    },
    {
      title: 'Animales',
      href: '/animales',
      icon: <PetsIcon />
    },
    {
      title: 'Perfil',
      href: '/perfil',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Colaborar',
      href: '/colaborar',
      icon: <PanToolIcon />
    },
    {
      title: 'Donar',
      href: '/donacion',
      icon: <AttachMoneyIcon />
    },
    {
      title: 'Denuncia',
      href: '/denuncia',
      icon: <ReportIcon />
    }
    

  ];

  const pagesGuest = [
    {
      title: 'Animales',
      href: '/animales',
      icon: <DashboardIcon />
    }
  ];

  const pageSelector = () => user.googleId ? pages : pagesGuest

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile user={user} />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pageSelector()}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
