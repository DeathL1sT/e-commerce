import React from 'react'
import "./footer.scss"
function Footer() {
  const contacts ={
    id : "owner",
    mobile:"01090963154",
    whatsapp:"01090963154",
    address: "ش51 مسجد الهدايا الطوابق فيصل - الجيزة"
  }
  return (
    <div className= "footer">
<div className='fotter-content'>
<div>
        <h6>Copy right &copy;2022</h6>
      </div>
        <div className='contact'>
        <ul>
          <li>{contacts.address}</li>
          <li>{contacts.mobile}</li>
          <li>{contacts.whatsapp}</li>
        </ul>
           
      
        </div>
</div>
        
    </div>
  )
}

export default Footer