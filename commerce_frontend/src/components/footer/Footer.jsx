import React from "react";
import {
  WhatsAppOutlined,
  MobileTwoTone,
  HomeTwoTone,
} from "@ant-design/icons";
import "./footer.scss";
function Footer() {
  const contacts = {
    id: "owner",
    mobile: "01090963154",
    whatsapp: "01090963154",
    address: "ش51 مسجد الهدايا الطوابق فيصل - الجيزة",
  };
  return (
    <div className="footer">
      <div className="fotter-content">
        <div>
          <h6>Copy right &copy;2022</h6>
        </div>
        <div className="contact">
          <ul>
            <li>
              <HomeTwoTone
                style={{
                  fontSize: "larger",
                  margin: "8px",
                }}
              />
              {contacts.address}
            </li>
            <li>
              <MobileTwoTone
                style={{
                  fontSize: "larger",
                  margin: "8px",
                }}
              />
              {contacts.mobile}
            </li>
            <li>
              <WhatsAppOutlined
                style={{
                  color: "greenyellow",
                  fontSize: "larger",
                  margin: "8px",
                }}
              />
              {contacts.whatsapp}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
