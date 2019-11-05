import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Results from '../results'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/results" component={Results} />
    </main>
  </div>
)

export default App
