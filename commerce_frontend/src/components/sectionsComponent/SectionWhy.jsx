import React from 'react'
import pic1 from "../../public/mainfactor.jpg"
import "./SectionWhy.scss"
function SectionWhy() {
  return (
    <div className='why'>
               <section className="section-1">
  <div className="art">
    <h1 >لماذا نحن</h1>
  <p className="article">
    Lorem ipsum dolor, <br/>
    sit amet consectetur adipisicing elit.<br/>
    Sint sapiente fuga quos vel laborum pariatur fugiat tempore magnam ea!<br/>
    Voluptates mollitia tenetur fugiat ea corrupti!<br/>
    Autem corporis voluptates voluptatem placeat.
  </p>
  </div>
  <div className="img">
    <img src={pic1} alt="" className="pic1"/>
    </div>
        </section>
    </div>
  )
}

export default SectionWhy