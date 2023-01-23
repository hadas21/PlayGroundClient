import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./gallery.scss";

class SlidingGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <div className="external">
          <div className="horizontal-scroll-wrapper">
            <div
              style={{ padding: "0px 0px 0px 4vw" }}
              className="img-wrapper slower slower-down"
            >
              <img src="https://i.imgur.com/gIazfeh.jpeg" alt="" />
            </div>

            <div className="img-wrapper slower vertical">
              <img src="https://i.imgur.com/3f0qxJg.jpeg" alt="" />
            </div>

            <div className="img-wrapper faster">
              <img
                src="https://i.imgur.com/uKQp0IA.jpeghttps://i.imgur.com/WgeXLaN.jpeg"
                alt=""
              />
            </div>

            <div className="img-wrapper slower vertical">
              <img src="https://i.imgur.com/IsZW4Sy.jpeg" alt="" />
            </div>

            <div className="img-wrapper slower slower-down">
              <img src="https://i.imgur.com/WgeXLaN.jpeg" alt="" />
            </div>

            <div className="img-wrapper">
              <img src="https://i.imgur.com/Dq2oeQV.jpeg" alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SlidingGallery);
