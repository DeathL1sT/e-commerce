import React from 'react'
import slide1 from "../../public/pipes.jpg"
import slide2 from "../../public/ipem.jpg"
import slide3 from "../../public/boxes.jpg"
import Carousel from 'react-bootstrap/Carousel';
import "./slider.scss"
function Slider() {

  return (
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide1}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3 className='slidelabel'>First slide label</h3>
      <p className='slidep'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide2}
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3 className='slidelabel'>Second slide label</h3>
      <p className='slidep'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={slide3}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3 className='slidelabel'>Third slide label</h3>
      <p className='slidep'>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}

export default Slider