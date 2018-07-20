import React, { Fragment } from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Text from '@material-ui/core/Typography';

const columnData = [
  { id: 'title', numeric: false, disablePadding: true, label: '' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow style={{ height: 10 }}>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title=""
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    // onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    cursor: 'pointer',
  },
  cell: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit,
    },
  },
  imgWrapper: {
    height: 0,
    paddingTop: '56.25%',
  },
  flexBox: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  flex: {
    maxWidth: '33%',
    flex: '1 0 33%',
    [theme.breakpoints.down('sm')]: {
      flex: '1 0 100%',
      maxWidth: '100%',
    },
    padding: 8,
  },
  card: {
    borderRadius: 0,
    cursor: 'pointer',
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    height: 1,
    background: 'lightgrey',
  },
  textWrapper: {
    marginTop: 14,
    marginBottom: 10,
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'type',
      selected: [],
      data: this.props.rows,
      page: 0,
      rowsPerPage: 6,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.rows) !== JSON.stringify(nextProps.rows)) {
      this.setState({
        data: nextProps.rows,
      });
    }
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };
  handleClick = (event, id) => {
    this.props.handleRowClick(id);
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    const { classes, handleClick } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <React.Fragment>
        <div className={classes.flexBox}>
          {
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => (
              <div
                key={n.id}
                className={classes.flex}
                onClick={() => this.props.handleClick(n.id)}
              >
                <Card className={classes.card} elevation={0}>
                  <CardMedia
                    className={classes.imgWrapper}
                    image={n.images[0].path}
                  />
                  <div className={classes.textWrapper}>
                    <Text>
                      {n.title}
                    </Text>
                    <Text>
                      {n.datetime}
                    </Text>
                  </div>
                </Card>
                <div className={classes.divider}/>
              </div>
            ))
          }
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[6, 12, 24]}
          labelRowsPerPage="페이지당 개수"
          labelDisplayedRows={({ from, to, count }) => (
            `${count}개 중 ${from}부터 ${to}`
          )}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </React.Fragment>
    );
    return (
      <Fragment>
        <div className={classes.tableWrapper}>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                  <TableRow
                    hover
                    onClick={() => this.props.handleClick(n.id)}
                    tabIndex={-1}
                    key={n.id}
                    className={classes.row}
                  >
                    <div className={classes.cell}>
                      <Card className={classes.card} elevation={0}>
                        <CardMedia
                          className={classes.imgWrapper}
                          image={n.images[0].path}
                        />
                        <ListItem button>
                          <ListItemText
                            primary={n.title}
                            secondary={n.datetime}
                          />
                        </ListItem>
                      </Card>
                    </div>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="행 개수"
          labelDisplayedRows={({ from, to, count }) => (
            `${count}개 중 ${from}부터 ${to}`
          )}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(EnhancedTable);