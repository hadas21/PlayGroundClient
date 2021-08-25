import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showLocation, deleteLocation } from '../../api/location'
import Button from 'react-bootstrap/Button'

class ShowLocation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: null
    }
  }

  componentDidMount () {
    const { match, user } = this.props

    showLocation(match.params.id, user)
      .then((res) => this.setState({ location: res.data.location }))
      .catch((err) => console.log(err))
  }

  handleDelete = (event) => {
    const { match, user, history } = this.props
    deleteLocation(match.params.id, user)
    // Redirect to the list of locations
      .then(() => history.push('/locations'))
      .catch((err) => console.log(err))
  }

  render () {
    if (this.state.location === null) {
      return 'Loading...'
    }

    // Get the owner (a user id) from the movie state
    const { title, description, owner } = this.state.location
    const { user, history, match } = this.props
    // history, match

    return (
      <>
        <h3>Show One Location</h3>
        <h5>{title}</h5>
        <p>Where? Here - {description}</p>
        {user._id === owner && (
          <>
            <Button onClick={this.handleDelete}>Delete</Button>
            {/* <Button>
              <Link to={`/locations/${match.params.id}/edit`}>Update</Link>
            </Button> */}

            <Button
              onClick={() => history.push(`/locations/${match.params.id}/edit`)}>
              Update
            </Button>
          </>
        )}
      </>
    )
  }
}

export default withRouter(ShowLocation)
