import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
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
