import { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import '../styles/tutorial.css';

export default function Tutorial(){

    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const onButtonClick = (direction) => {
    if (direction === 'next') {
      setIndex(index + 1);
    } else if (direction === 'prev') {
      setIndex(index - 1);
    }
  };

  return (
    <div className='Tb'> 

    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} className='Ta'>
  <Carousel.Item>
    <div className="d-block w-100" style={{ backgroundColor: "lightblue", height: "300px" }}>
      <Carousel.Caption style={{ color: "black" ,fontFamily:'initial'}}>
      <h3>Slide 1: Choose Origin and Destination</h3>
        <p>Select your origin and destination addresses using either the form or the map. Once selected, click the "Calculate" button to proceed.</p>
        <Button variant="outline-primary" onClick={() => onButtonClick('next')}>
          Next Slide
        </Button>{' '}
      </Carousel.Caption>
    </div>
  </Carousel.Item>

  <Carousel.Item>
    <div className="d-block w-100" style={{ backgroundColor: "lightgreen", height: "300px" }}>
      <Carousel.Caption style={{ color: "black",fontFamily:'initial' }}>
        <h3>Slide 2: Route Visualization and Toll Information</h3>
        <p> Explore the visual representation of your selected route. Click on the toll button to view the toll locations along the route.</p>
        <Button variant="outline-success" onClick={() => onButtonClick('next')}>
          Next Slide
        </Button>{' '}
      </Carousel.Caption>
    </div>
  </Carousel.Item>

  <Carousel.Item>
    <div className="d-block w-100" style={{ backgroundColor: "lightcoral", height: "300px" }}>
      <Carousel.Caption style={{ color: "black",fontFamily:'initial' }}>
        <h3><h3>Slide 3: Toll Costs and Distance Information</h3>3</h3>
        <p> Discover the minimum toll costs and total distance for your selected route. If tolls are present, their locations are visible in the table.</p>
        <Button variant="outline-danger" onClick={() => onButtonClick('next')}>
          Next Slide
        </Button>{' '}
      </Carousel.Caption>
    </div>
  </Carousel.Item>

  <Carousel.Item>
    <div className="d-block w-100" style={{ backgroundColor: "lightgoldenrodyellow", height: "300px" }}>
      <Carousel.Caption style={{ color: "black",fontFamily:'initial' }}>
        <h3>Slide 1: Origin and Destination Selection</h3>
        <p> In this slide, users can conveniently choose their starting and ending points using both the form and the map. After selecting the addresses, simply click the "Calculate" button to proceed.</p>
        <Button variant="outline-warning" onClick={() => onButtonClick('next')}>
          Next Slide
        </Button>{' '}
      </Carousel.Caption>
    </div>
  </Carousel.Item>

  <Carousel.Item>
    <div className="d-block w-100" style={{ backgroundColor: "lightpink", height: "300px" }}>
      <Carousel.Caption style={{ color: "black" ,fontFamily:'initial'}}>
        <h3>Slide 5: Limitations</h3>
        <p> Please note that the application does not support routing between countries. Users won't be able to select the origin and destination addresses across different countries.</p>
        <Button variant="outline-info" onClick={() => onButtonClick('prev')}>
          Go to Previous Slide
        </Button>{' '}
      </Carousel.Caption>
    </div>
  </Carousel.Item>
</Carousel>
</div>

  );

}