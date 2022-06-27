import React from 'react'
import pic2 from "../../public/irone-made.jpg"
import "./SectionAbout.scss"

function SectionAbout() {
  return (
    <div className='about'>
               <section className="section-about">
  <div className="art">
    <h1 > تعريف الشركة</h1>
  <p className="article">
    Lorem ipsum dolor, <br/>
    sit amet consectetur adipisicing elit.<br/>
    Sint sapiente fuga quos vel laborum pariatur fugiat tempore magnam ea!<br/>
    Voluptates mollitia tenetur fugiat ea corrupti!<br/>
    Autem corporis voluptates voluptatem placeat.
  </p>
  </div>
  <div className="img">
    <img src={pic2} alt="" className="pic1"/>
    </div>
        </section>
    </div>
  )
}

export default SectionAbout