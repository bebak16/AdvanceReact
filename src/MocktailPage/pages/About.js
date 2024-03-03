import React from 'react'

const About = () => {
  return (
    <section className='about-section'>
      <h1 className ='section-title'>About us</h1>
      <p>
        CSS box model is a container which contains multiple properties including borders, margin, padding
        and the content itself. It is used to create the design and layout of web pages. It can be used as
        a toolkit for customizing the layout of different elements. The web browser renders every element as
        a rectangular box according to the CSS box model. </p>

      <h5>Box-Model has multiple properties in CSS. Some of them are given below: </h5>
      <p>
        Content - The content of the box, where text and images appear. <br />
        Padding - Clears an area around the content. The padding is transparent.  <br />
        Border - A border that goes around the padding and content. <br />
        Margin - Clears an area outside the border. The margin is transparent.
        
      </p>
    </section>
  )
}

export default About
