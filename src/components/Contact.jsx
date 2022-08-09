import { useState } from "react";
import "./Contact.css";

export const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (ev) => {
    ev.preventDefault();

    const { name, phone, email, address } = user;
    if (name && phone && email && address) {
      const res = await fetch(
        "https://reactform-a7fcd-default-rtdb.firebaseio.com/contact_form.json",
        {
          method: "POST",
          headers: {
            "Containt-Type": "application/json"
          },
          body: JSON.stringify({ name, email, phone, address })
        }
      );
      if (res) {
        setUser({
          name: "",
          phone: "",
          email: "",
          address: ""
        });
        alert("Data is saved");
      }
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <>
      <form method="POST">
        <h2 style={{ marginLeft: "44%" }}>Contact Form</h2>
        <div className="main-container">
          <div className="leftdiv">
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={user.name}
              placeholder="Enter your name..."
              autoComplete="off"
              required
              onChange={getUserData}
            />
            <span>Phone No:</span>
            <input
              type="number"
              name="phone"
              value={user.phone}
              placeholder="Enter your phone..."
              autoComplete="off"
              required
              onChange={getUserData}
            />
          </div>

          <div className="righttdiv">
            <span>Email :</span>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter your email..."
              autoComplete="off"
              required
              onChange={getUserData}
            />
            <span>Address:</span>
            <input
              type="text"
              name="address"
              value={user.address}
              placeholder="Enter your address..."
              autoComplete="off"
              required
              onChange={getUserData}
            />
          </div>
        </div>
        <div className="submit-div">
          <button onClick={postData}>Submit</button>
        </div>
      </form>
    </>
  );
};
