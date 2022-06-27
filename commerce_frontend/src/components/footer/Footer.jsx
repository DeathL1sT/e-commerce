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
        
        <div className='contact'>
        
          <div className='mob'><spn>موبيل </spn>{contacts.mobile}</div>
          <div className='whatts'><span>واتس اب</span>{contacts.whatsapp}</div>
          <div className='address'><span>العنوان</span> {contacts.address}</div>
      
        </div>
        <h7>COPY RIGHT &copy;2022</h7>
    </div>
  )
}

export default Footer