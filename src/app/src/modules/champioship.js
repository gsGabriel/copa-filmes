import axios from "axios";

export const DATA_INITIALIZED = 'movies/DATA_INITIALIZED'
export const CONTEST_CHAMPIONSHIP = 'movies/CONTEST_CHAMPIONSHIP'
export const CONTEST_CHAMPIONSHIP_REQUESTED = 'movies/CONTEST_CHAMPIONSHIP_REQUESTED'

const initialState = {
  movies: [],
  result: {},
  isContest: false,
  isDataInitialized: false
}

export default (state = initialState, action) => {
  switch (action.type) { 
    case CONTEST_CHAMPIONSHIP:
      return {
        ...state,
        isContest: !state.isContest
      }

      case CONTEST_CHAMPIONSHIP_REQUESTED:
      return {
        ...state,
        isContest: true
      }

      case DATA_INITIALIZED:
        return{
          ...state,
          isDataInitialized: true
        }

    default:
      return state
  }
}

export const getInitalData = () => async dispatch => {
  try {
      let movies = await axios
          .get("https://copadosfilmes.azurewebsites.net/api/filmes");
      dispatch ({ type: DATA_INITIALIZED, movies }); 
      console.log(movies);
  }catch {
      console.log("Erro para recuperar filmes.");
  }
}

export const contestChampioship = (movies) => async dispatch => {
  try {
    let result = await axios
        .post("http://localhost:52518/api/v1/campeonato", movies);
    dispatch ({ type: CONTEST_CHAMPIONSHIP_REQUESTED, result }); 
    console.log(movies);
  }catch {
    console.log("Erro para gerar resultado do campeonato.");
  }
}
