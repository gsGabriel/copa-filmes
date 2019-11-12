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
      case CONTEST_CHAMPIONSHIP_REQUESTED:
        return {
          ...state,
          result: action.result,
          isContest: true
        }

      case DATA_INITIALIZED:
        return{
          ...state,
          movies: action.movies,
          isDataInitialized: true
        }

    default:
      return state
  }
}

export const getInitalData = () => async dispatch => {
  try {
      await axios
          .get("https://copadosfilmes.azurewebsites.net/api/filmes")
          .then(response => {
            dispatch ({ type: DATA_INITIALIZED, movies: response.data });
          });
  }catch {
      console.log("Erro para recuperar filmes.");
  }
}

export const contestChampioship = (movies) => async dispatch => {
  try {
    debugger;
      await axios
        .post("http://localhost:52518/api/v1/campeonato", { filmes: movies })
        .then(response => {
          dispatch ({ type: CONTEST_CHAMPIONSHIP_REQUESTED, result: response.data });
          console.log(response.data);
        });
  }catch {
    console.log("Erro para gerar resultado do campeonato.");
  }
}
