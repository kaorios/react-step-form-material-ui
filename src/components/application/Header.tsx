import AppBar from '@material-ui/core/AppBar';
import {WithStyles, withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {commonStyle} from '../../assets/styles';

function Header(props: WithStyles<typeof commonStyle>) {
  const {classes} = props;
  return (
      <div className={classes.root}>
        <AppBar position="static" classes={{colorPrimary: classes.appBarColorDefault}}>
          <Toolbar variant="dense">
            <Typography variant="subtitle1" color="inherit">
              Step Form Sample
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default withStyles(commonStyle)(Header);
