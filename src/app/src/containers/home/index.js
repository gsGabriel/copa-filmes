import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getInitalData,
  contestChampioship,
} from '../../modules/championship'

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const headCells = [
  { id: 'check', numeric: false, disablePadding: true, label: '' },
  { id: 'titulo', numeric: false, disablePadding: true, label: 'Título' },
  { id: 'ano', numeric: true, disablePadding: true, label: 'Ano de lançamento' },
  { id: 'nota', numeric: true, disablePadding: true, label: 'Nota' },
];

function EnhancedTableHead(props) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, contest } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selecionados
        </Typography>
      ) : (
        <div>
          
        </div>
      )}

      {numSelected === 8 ? (
        <Tooltip title="Gerar campeonato">
          <Button variant="contained" className={classes.button} onClick={contest}>
            Gerar
          </Button>
        </Tooltip>
      ) : (
        <div></div>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  contest: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const EnhancedTable = props => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const { movies, contestChampioship, changePage } = props;

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    if(newSelected.length > 8)
      return;

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const contest = async ()  =>  {
    await contestChampioship(selected);
    changePage();
  }

  return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} contest={contest}/>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              rowCount={movies.length}
            />
            <TableBody>
              {movies
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.titulo}
                      </TableCell>
                      <TableCell align="right">{row.ano}</TableCell>
                      <TableCell align="right">{row.nota}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
  );
}


class Home extends React.Component {

  async componentWillMount() {
    await this.props.getInitalData()
  }

  render() {
    const classes = useStyles();

    return(
      <div className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Copa de filmes
        </Typography>
        <Typography id="tableSubTitle">
          selecione 8 filmes que você deseja que entre na competição e clique em gerar
        </Typography>
        <EnhancedTable movies={this.props.movies} contestChampioship={this.props.contestChampioship} changePage={this.props.changePage} ></EnhancedTable>
      </div>)
  }
}

const mapStateToProps = ({ championship }) => ({
  movies: championship.movies,
  isDataInitialized: championship.isDataInitialized
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInitalData,
      contestChampioship,
      changePage: () => push('/results')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
