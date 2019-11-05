import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getInitalData,
} from '../../modules/champioship'

class Home extends React.Component {

  async componentWillMount() {
    await this.props.getInitalData()
  }

  render() {

    return(<div>
      <h1>Home</h1>
    
      <p>
        <button onClick={() => this.props.changePage()}>
          Gerar resultados do campeonato
        </button>
      </p>
    </div>)
  }
}

const mapStateToProps = ({ champioship }) => ({
  movies: champioship.movies,
  isDataInitialized: champioship.isDataInitialized
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getInitalData,
      changePage: () => push('/results')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
