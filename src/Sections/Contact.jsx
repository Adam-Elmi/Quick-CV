import { useState, useEffect } from "react";

export default function Contact({ contact, defaultValue }) {
  const [values, setValues] = useState(defaultValue);
  useEffect(() => {
    setValues(defaultValue);
  }, [defaultValue]);
  return (
    <div id={contact.id}>
      <div id="contact-title">{contact.title}</div>
      <div id="contact-wrapper">
        {values && Array.isArray(values)
          ? values.map((v, i) => (
              <div key={i}>
                <div id={"contact-phone-wrapper"}>
                  <span className={`${v.icons[0]}`}></span>
                  <p id={"contact-phone"}>{v.phone}</p>
                </div>
                <div id={"contact-email-wrapper"}>
                  <span className={`${v.icons[1]}`}></span>
                  <p id={"contact-email"}>{v.email}</p>
                </div>
                <div id={"contact-address-wrapper"}>
                  <span className={`${v.icons[2]}`}></span>
                  <p id={"contact-address"}>{v.address}</p>
                </div>
                <div id={"contact-website-wrapper"}>
                  <span className={`${v.icons[3]}`}></span>
                  <p id={"contact-website"}>{v.website}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
