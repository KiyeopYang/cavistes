import React, {Fragment} from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    zIndex: 1000,
  },
  flex: {
    flex: 1,
  },
  title: {
    padding: 8,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      fontSize: 32,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    maxWidth: 1000,
    minHeight: 32,
    width: '100%',
    margin: 'auto',
    padding: 0,
  },
  dummyDiv: {
    height: 112,
    [theme.breakpoints.down('md')]: {
      height: 92,
    },
  },
  user: {
    display: 'flex',
    cursor: 'pointer',
  },
});
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnchorEl: null,
      menuAnchorEl: null,
    };
  }
  handleMenuOpen = anchorEl => e => {
    this.setState({ [anchorEl]: e.currentTarget });
  };
  handleMenuClose = anchorEl => () => {
    this.setState({ [anchorEl]: null });
  };
  render() {
    const {
      classes,
      user,
      onClick,
      onClickUserMenu,
      onClickLogin,
      onClickSignUp,
    } = this.props;
    const { userAnchorEl, menuAnchorEl } = this.state;
    const open = {
      user: Boolean(userAnchorEl),
      menu: Boolean(menuAnchorEl),
    };
    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar classes={{ root: classes.toolbar}}>
              <div className={classes.flex} />
              {
                !user ?
                  <React.Fragment>
                    <Button
                      color="inherit"
                      onClick={onClickLogin}
                    >
                      로그인
                    </Button>
                    <Button
                      color="inherit"
                      onClick={onClickSignUp}
                    >
                      회원가입
                    </Button>
                  </React.Fragment> :
                  <div
                    className={classes.user}
                    aria-owns={open.user? 'menu-user' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenuOpen('userAnchorEl')}
                  >
                    <Typography color="inherit">
                      {user.email}
                    </Typography>
                    <MoreIcon color="inherit"/>
                  </div>
              }
              {
                user ?
                  <Menu
                    id="menu-user"
                    anchorEl={userAnchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open.user}
                    onClose={this.handleMenuClose('userAnchorEl')}
                  >
                    <MenuItem onClick={() => {
                      this.handleMenuClose('userAnchorEl')();
                      onClickUserMenu('myInfo');
                    }}>
                      내 정보
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        this.handleMenuClose('userAnchorEl')();
                        onClickUserMenu('logout');
                      }}
                    >
                      로그아웃
                    </MenuItem>
                    {
                      user.type === 'default' ?
                        <MenuItem
                          onClick={this.handleMenuClose('userAnchorEl')}
                        >
                          참여내역
                        </MenuItem> :
                        user.type === 'manager' ?
                          <Fragment>
                            <MenuItem
                              onClick={() => {
                                this.handleMenuClose('userAnchorEl')();
                                onClickUserMenu('accountManager');
                              }}
                            >
                              계정 관리
                            </MenuItem>
                          </Fragment> : null
                    }
                  </Menu> : null
              }
            </Toolbar>
          </AppBar>
          <AppBar position="static" color="default">
            <Toolbar classes={{ root: classes.toolbar}}>
              <Typography
                color="inherit"
                className={classNames(classes.flex, classes.title)}
                onClick={() => onClick('about')}
              >
                CAVISTES
              </Typography>
              <Hidden smDown>
                <Button
                  size="large"
                  onClick={() => onClick('about')}
                >
                  ABOUT
                </Button>
                <Button
                  size="large"
                  onClick={() => onClick('event')}
                >
                  EVENT
                </Button>
                <Button
                  size="large"
                  onClick={() => onClick('contact')}
                >
                  CONTACT
                </Button>
              </Hidden>
              <Hidden mdUp>
                <IconButton
                  aria-owns={open.menu ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenuOpen('menuAnchorEl')}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={menuAnchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open.menu}
                  onClose={this.handleMenuClose('menuAnchorEl')}
                >
                  <MenuItem
                    onClick={() => {
                      this.handleMenuClose('menuAnchorEl');
                      onClick('about');
                    }}
                  >
                    ABOUT
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.handleMenuClose('menuAnchorEl');
                      onClick('event');
                    }}
                  >
                    EVENT
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      this.handleMenuClose('menuAnchorEl');
                      onClick('contact');
                    }}
                  >
                    CONTACT
                  </MenuItem>
                </Menu>
              </Hidden>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.dummyDiv}/>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(Header);
