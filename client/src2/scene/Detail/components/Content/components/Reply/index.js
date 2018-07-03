import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconEvent from '@material-ui/icons/Event';
import IconPrice from '@material-ui/icons/AttachMoney';
import IconMap from '@material-ui/icons/Map';
import IconGroup from '@material-ui/icons/Group';
import IconComment from '@material-ui/icons/Comment';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Block from '../Block';
import Input from './components/Input';
import Text from './components/Text';

const styles = theme => ({
  root: {
    width: '100%',
  },
  reply: {
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});
class Reply extends React.Component {
  render() {
    const {
      classes,
      handleSubmit,
      handleRemove,
      reply,
      account,
    } = this.props;
    return (
      <div className={classes.root}>
        <Block title="댓글"/>
        <div className={classes.reply}>
          {
            account ?
              <Input handleSubmit={handleSubmit}/> : null
          }
          {
            reply.length > 0 ?
              <List>
                {
                  reply.map(o => (
                    <Text
                      key={o.id}
                      name={o.name}
                      email={o.email}
                      text={o.text}
                      datetime={o.datetime}
                      handleRemove={account && account.id === o.accountId ?
                        () => handleRemove(o.id) : null
                      }
                    />
                  ))
                }
              </List> : null
          }
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(Reply);
