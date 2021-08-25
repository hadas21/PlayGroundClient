import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showLocation } from '../../api/movies'

// import Button from 'react-bootstrap/Button'

class ShowLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props

    showLocation(match.params.id, user)
      .then((res) => this.setState({ location: res.data.location }))
      .then(() =>
        msgAlert({
          heading: 'Show movie success',
          message: 'Check out the movie',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Show movie failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
  }

  // handleDelete = (event) => {
  //   const { match, user, msgAlert, history } = this.props
  //   deleteMovie(match.params.id, user)
  //   // Redirect to the list of movies
  //     .then(() => history.push('/movies'))
  //     .then(() =>
  //       msgAlert({
  //         heading: 'Delete movie successfully',
  //         message: 'Movie is no more',
  //         variant: 'success'
  //       })
  //     )
  //     .catch((err) =>
  //       msgAlert({
  //         heading: 'Delete movie failed :(',
  //         message: 'Something went wrong: ' + err.message,
  //         variant: 'danger'
  //       })
  //     )
  // }

  render () {
    if (this.state.location === null) {
      return 'Loading...'
    }

    // Get the owner (a user id) from the movie state
    const { title, description, owner } = this.state.location
    const { user } = this.props
    // history, match

    return (
      <>
        <h3>Show One Location</h3>
        <h5>{title}</h5>
        <p>Directed by: {description}</p>
        {/* Compare the signed in user's ID against the owner of this movie */}
        {user._id === owner && (
          <>
            {/* <Button onClick={this.handleDelete}>Delete This Movie</Button> */}
            {/* Button with a Link inside should work but is ugly. Better way below. */}
            {/* <Button>
              <Link to={`/locations/${match.params.id}/edit`}>Update Movie</Link>
            </Button> */}

            {/* Provide the Button a `onClick` handler & use the history object to redirect the user */}
            {/* <Button
              onClick={() => history.push(`/locations/${match.params.id}/edit`)}>
                        Update Movie
            </Button> */}
          </>
        )}
      </>
    )
  }
}

export default withRouter(ShowLocation)
