import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './sitemap.scss'

class SiteMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      description: 'Click the points on the map to see more info on the features.'
    }
  }

  handleAddPin = (event) => {
    this.setState({ description: 'Store locations around the world by dragging and dropping the pin.' })
    console.log(event)
    console.log('this has been clicked')
  }

  handleAddDesc = (event) => {
    this.setState({ description: 'Add descriptions to your pins to tell others what makes this place so special.' })
    console.log(event)
  }

  handleSearch = (event) => {
    this.setState({ description: 'Try searching for locations using our handy search bar!' })
  }

  handlePopups = (event) => {
    this.setState({ description: 'Checkout the locations you have stored by clicking on the various markers on the map. See the location and the description of each pin.' })
  }

  render () {
    const { description } = this.state

    return (
      <div className="sitemap row">
        <div className="col-lg-6 col-md-7 col-sm-12">
          <div className="image-indicators">
            <input onClick={this.handlePopups} type="checkbox" className="point" id="point-1" name="point" value="1"/>
            <input onClick={this.handleSearch} type="checkbox" className="point" id="point-2" name="point" value="2"/>
            <input onClick={this.handleAddDesc}type="checkbox" className="point" id="point-3" name="point" value="3"/>
            <input onClick={this.handleAddPin} type="checkbox" className="point" id="point-4" name="point" value="4"/>
            <label htmlFor="point-1" id="label-1" >
              <span>
                <span></span>
              </span>
            </label>
            <label htmlFor="point-2" id="label-2" >
              <span>
                <span></span>
              </span>
            </label>
            <label htmlFor="point-3" id="label-3">
              <span>
                <span></span>
              </span>
            </label>
            <label htmlFor="point-4" id="label-4">
              <span>
                <span></span>
              </span>
            </label>
            <img src="https://i.imgur.com/qdZi3Cg.png"/>
          </div>
        </div>
        <div className="col-lg-6 col-md-7 col-sm-12">
          <div>
            <h3 style={{ color: '#16212B' }}>Explore the App</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SiteMap)
