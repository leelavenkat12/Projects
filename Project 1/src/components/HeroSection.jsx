import React from 'react'

const HeroSection = () => {
  return (
    <div className='Hero'>
        <div className='Hero-content'>
            <h1>YOUR FEET DESERVE THE BEST </h1>
            <p>YOUR FEET DESERVE THE BEST 
                AND WE’RE HERE TO HELP 
                YOU WITH OUR SHOES.
                YOUR FEET DESERVE THE BEST 
                AND WE’RE HERE TO HELP YOU WITH OUR SHOES.
                </p>

                <div className='Hero-btn'>
                  <button>Shop Now</button>
                  <button className='secondary-btn'>Category</button>
                </div>
                <div className="Shopping">
                  <p>Also Available On</p>
                   
                   <div className="brand-icons">
                    <img src="/images/amazon.png" alt="amazon-logo" />
                    <img src="/images/flipkart.png" alt="flipkart_logo" />
                   </div>
                </div>
        </div>
        <div className='Hero-img'>
<img src="/images/shoe_image.png" alt="shoe_image" />
        </div>
      
    </div>
  )
}

export default HeroSection
