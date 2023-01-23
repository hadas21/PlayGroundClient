import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

class CarouselGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Carousel fade>
          <Carousel.Item>
            <img
              width="100%"
              className="d-block w-100"
              src="https://i.imgur.com/CTLT5Pa.png"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>Discover</h3> */}
              <p>Patagonia Region, Argentina</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              width="100%"
              className="d-block w-100"
              src="https://i.imgur.com/KMOxj9A.png"
              alt="Second slide"
            />

            <Carousel.Caption>
              {/* <h3>Share</h3> */}
              <p>Tokyo, Japan</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              width="100%"
              className="d-block w-100"
              src="https://i.imgur.com/gSqbUQu.png"
              alt="Third slide"
            />

            <Carousel.Caption>
              {/* <h3></h3> */}
              <p>Tórshavn, Faroe Islands</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              width="100%"
              className="d-block w-100"
              src="https://i.imgur.com/mShIwxN.png"
              alt="Fourth slide"
            />

            <Carousel.Caption>
              {/* <h3></h3> */}
              <p>Altai Mountains, Mongolia</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              width="100%"
              className="d-block w-100"
              src="https://i.imgur.com/Jb3Ds81.png"
              alt="Fifth slide"
            />

            <Carousel.Caption>
              {/* <h3></h3> */}
              <p>Mount Kilimanjaro, Tanzania</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    );
  }
}

export default withRouter(CarouselGallery);
