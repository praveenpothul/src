import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import FinTech from './../../images/FinTech.jpg';
import Agriculture from './../../images/Agriculture.jpg'
import AI from './../../images/AI.jpg'
import Automobile from './../../images/Automobile.jpg'
import CloudComputing from './../../images/CloudComputing.jpg'
import Construction from './../../images/Construction.jpg'
import Robotics from './../../images/Robotics.jpg'
import QuantumComputing from './../../images/QuantumComputing.jpg'
import SpaceTechnology from './../../images/SpaceTechnology.jpg'
import VR from './../../images/VR.jpg'
import MediTech from './../../images/MediTech.jpg'
import {useNavigate } from 'react-router-dom';

const CarouselContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: ${(props) => `${(props.items.length || 0) * (200 + 5)}px`};
  transition: transform 0.3s ease;
`;

const CardContainer = styled.div`
position: relative; /* Needed to position the title overlay */
min-width: 220px;
margin-right: 5px;
transition: transform 0.3s ease;

/* Add styles for card title overlay */
&:hover::before {
  content: attr(data-title); /* Show the card title as overlay */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  pointer-events: none; /* Prevent the overlay from blocking hover events on the card */
  opacity: 1; /* Show the overlay on hover */
  transition: opacity 0.3s ease;
}

/* Hide the overlay by default */
&::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardTitle = styled.h5`
  font-weight: bold;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

const AnotherCarousel = ({ items = [], type }) => {
  console.log(items)
  let navigate = useNavigate();
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScrollLeft = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else {
      // Wrap to the last item when reaching the first item
      setCurrentSlide(items.length - 1);
    }
  };

  const handleScrollRight = () => {
    if (currentSlide === items.length - 4) {
      // If the current slide is the second to last item, set to 0 to show leftmost item on the right
      setCurrentSlide(0);
    } else if (currentSlide < items.length - 1) {
      // If not the last item, increment the current slide
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const slideWidth = useRef(null);

  // Calculate the slide width when the component mounts or on window resize
  const calculateSlideWidth = () => {
    if (carouselRef.current) {
      slideWidth.current = carouselRef.current.children[0].clientWidth;
    }
  };

  useEffect(() => {
    calculateSlideWidth();
    window.addEventListener('resize', calculateSlideWidth);
    return () => window.removeEventListener('resize', calculateSlideWidth);
  }, []);

  // Update the carousel position when currentSlide changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentSlide * slideWidth.current}px)`;
    }
  }, [currentSlide]);

  const imageRendererFunc=(category)=>{

    switch(category)
    {
      case 'FinTech': 
      return FinTech
      case 'Agriculture':
      return Agriculture
      case 'AI':
      return AI
      case 'VR':
      return VR
      case 'Automobile':
      return Automobile
      case 'CloudComputing':
      return CloudComputing
      case 'Construction':
      return Construction
      case 'Robotics':
      return Robotics
      case 'SpaceTechnology':
      return SpaceTechnology
      case 'MediTech':
      return MediTech
      case 'QuantumComputing':
      return QuantumComputing
      default: 
      return Agriculture
    }

  }
  const handleNavigation=(id)=>{
   
      navigate(`/showCustomer/${id}`)
    


  }

  return (
    <div style={{ position: 'relative' }}>
      <LeftArrow onClick={handleScrollLeft}>
        &lt;
      </LeftArrow>
      <div style={{overflow:'hidden'}}>
        <CarouselContainer ref={carouselRef} items={items}>
          {items.map((item) => (
            <CardContainer key={item.id} data-title={item.category}>
              <CardImage src={imageRendererFunc(item.category)} alt={item.name} onClick={()=>
                handleNavigation(item.id )
               }/>
              {/* <CardTitle>{item.name}</CardTitle> */}
            </CardContainer>
          ))}
        </CarouselContainer>
      </div>
      <RightArrow onClick={handleScrollRight}>
        &gt;
      </RightArrow>
    </div>
  );
};

export default AnotherCarousel;
