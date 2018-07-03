import React, {Fragment} from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
  },
  verticalLine: {
    width: 1,
    height: 15,
    background: 'grey',
  },
  flex: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 1000,
    width: '100%',
    margin: 'auto',
    padding: 0,
  },
  toolbar1: {
    minHeight: 30,
    height: 30,
  },
  toolbar2: {
    minHeight: 45,
    height: 45,
  },
  dummyDiv: {
    minHeight: 170,
    [theme.breakpoints.down('sm')]: {
      minHeight: 75,
    },
  },
  user: {
    display: 'flex',
    cursor: 'pointer',
  },
  titleImgWrapper: {
    background: 'white',
    height: 95,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    width: 200,
  },
  titleMobileImg: {
    height: 35,
    marginLeft: 16,
  },
  menuButton: {
    color: 'white',
  },
  menuButtonSelected: {
    color: 'yellow',
  },
  menu: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    background: 'rgb(48,48,48,0.8)',
    textAlign: 'center',
    zIndex: 1000,
  },
  menuItems: {
    marginTop: 100,
  },
  menuItem: {
    fontSize: 20,
    marginBottom: 8,
    cursor: 'pointer',
  },
});
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnchorEl: null,
      menuOn: false,
    };
  }
  handleMenuOpen = anchorEl => e => {
    this.setState({ [anchorEl]: e.currentTarget });
  };
  handleMenuClose = anchorEl => () => {
    this.setState({ [anchorEl]: null });
  };
  closeMobileMenu = (label) => {
    this.props.onClick(label);
    this.setState({ menuOn: false });
  };
  pathIncluded = path => {
    const { pathname } = this.props.location;
    if (path === '/' && pathname !== '/') return false;
    return pathname.indexOf(path) > -1
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
    const { userAnchorEl, menuOn } = this.state;
    const open = {
      user: Boolean(userAnchorEl),
    };
    return (
      <React.Fragment>
        {
          menuOn ?
            <div className={classes.menu}>
              <div className={classes.menuItems}>
                <Typography
                  className={
                    classNames(classes.menuItem, this.pathIncluded('notice') ?
                      classes.menuButtonSelected:classes.menuButton
                    )
                  }
                  onClick={() => this.closeMobileMenu('notice')}
                >
                  공지사항
                </Typography>
                <Typography
                  className={
                    classNames(classes.menuItem, this.pathIncluded('location') ?
                      classes.menuButtonSelected:classes.menuButton
                    )
                  }
                  onClick={() => this.closeMobileMenu('location')}
                >
                  장소안내
                </Typography>
                <Typography
                  className={
                    classNames(classes.menuItem, this.pathIncluded('sponsor') ?
                      classes.menuButtonSelected:classes.menuButton
                    )
                  }
                  onClick={() => this.closeMobileMenu('sponsor')}
                >
                  주최자안내
                </Typography>
                <Typography
                  className={
                    classNames(classes.menuItem, this.pathIncluded('/') ?
                      classes.menuButtonSelected:classes.menuButton
                    )
                  }
                  onClick={() => this.closeMobileMenu('event')}
                >
                  참가신청
                </Typography>
              </div>
            </div> : null
        }
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Toolbar classes={{
              root: classNames(classes.toolbar, classes.toolbar1),
            }}>
              <div className={classes.flex} />
              {
                !user ?
                  <React.Fragment>
                    <Button
                      size="small"
                      color="inherit"
                      onClick={onClickLogin}
                    >
                      로그인
                    </Button>
                    <div className={classes.verticalLine}/>
                    <Button
                      size="small"
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
                    {user.type === 'sponsor' && !user.confirmed ?
                      <Typography color="inherit" style={{ paddingRight: 8 }}>
                        모임 생성 미승인 - 관리자에게 문의하십시요.
                      </Typography> : null
                    }
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
                          onClick={() => {
                            this.handleMenuClose('userAnchorEl')();
                            onClickUserMenu('accountAttendance');
                          }}
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
                            <MenuItem
                              onClick={() => {
                                this.handleMenuClose('userAnchorEl')();
                                onClickUserMenu('serviceManager');
                              }}
                            >
                              서비스 관리
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.handleMenuClose('userAnchorEl')();
                                onClickUserMenu('paymentManager');
                              }}
                            >
                              결제 내역
                            </MenuItem>
                          </Fragment> : null
                    }
                  </Menu> : null
              }
            </Toolbar>
          </AppBar>
          <AppBar position="static">
            <Hidden smDown>
              <div className={classes.titleImgWrapper}>
                <img className={classes.titleImg} src="/title.PNG"/>
              </div>
            </Hidden>
            <Toolbar classes={{
                root: classNames(classes.toolbar, classes.toolbar2),
              }}
            >
              <Hidden mdUp>
                <div className={classes.flex}>
                  <img className={classes.titleMobileImg} src="/titleMobile.PNG"/>
                </div>
              </Hidden>
              <Hidden smDown>
                <Button
                  className={
                    this.pathIncluded('notice') ?
                      classes.menuButtonSelected:classes.menuButton
                  }
                  size="large"
                  onClick={() => {
                    onClick('notice');
                  }}
                >
                  공지사항
                </Button>
                <Button
                  className={
                    this.pathIncluded('location') ?
                      classes.menuButtonSelected:classes.menuButton
                  }
                  size="large"
                  onClick={() => {
                    onClick('location');
                  }}
                >
                  장소 안내
                </Button>
                <Button
                  className={
                    this.pathIncluded('sponsor') ?
                      classes.menuButtonSelected:classes.menuButton
                  }
                  size="large"
                  onClick={() => {
                    onClick('sponsor');
                  }}
                >
                  주최자 안내
                </Button>
                <Button
                  className={
                    this.pathIncluded('/') ?
                      classes.menuButtonSelected:classes.menuButton
                  }
                  size="large"
                  onClick={() => {
                    onClick('event');
                  }}
                >
                  참가 신청
                </Button>
              </Hidden>
              <Hidden mdUp>
                <IconButton
                  aria-owns={open.menu ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={() => this.setState({ menuOn: !this.state.menuOn })}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
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
