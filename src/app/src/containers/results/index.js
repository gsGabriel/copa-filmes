import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  card: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
}));

const Results = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Resultados
      </Typography>
      <Typography id="tableSubTitle">
        Confira o resultado final da copa de filmes :D
      </Typography>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.result.campeao}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Campeão
            </Typography>
          </CardContent>
        </div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.result.viceCampeao}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Vice-Campeão
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  )}

const mapStateToProps = ({ championship }) => ({
  result: championship.result,
  isDataInitialized: championship.isDataInitialized
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)