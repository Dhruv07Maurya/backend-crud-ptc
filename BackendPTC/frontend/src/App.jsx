import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [newU, setNewU] = useState("");
  const [resp, setResp] = useState(null);
  const [checkU, setCheckU] = useState("");
  const [checkP, setCheckP] = useState("");
  const [see, setSee] = useState("");

  const result = async (e) => {
    e.preventDefault();
    const data = {
      user,
      pass,
    };

    const res = await axios.post("http://localhost:3000/create", data);
    const resObj = res.data.nam;
    setResp(resObj);
  };

  const update = async (e) => {
    e.preventDefault();
    const newuser = {
      user,
      newU,
    };
    const upd = await axios.post("http://localhost:3000/update", newuser);
  };

  const check = async (e) => {
    e.preventDefault();
    const checkUser = {
      checkU,
      checkP,
    };
    const chk = await axios.post("http://localhost:3000/check", checkUser);
    console.log(chk.data.val);
  };

  return (
    <>
      <form action="/create" method="post">
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="text"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />{" "}
        <br />
        <button type="submit" onClick={result}>
          Submit
        </button>
      </form>

      <form action="/update" method="post">
        Original: <input type="text" value={user} disabled /> <br />
        To Update:{" "}
        <input
          type="text"
          value={newU}
          onChange={(e) => {
            setNewU(e.target.value);
          }}
        />
        <br />
        <button type="submit" onClick={update}>
          Click to Update
        </button>
      </form>

      <h1>{resp}</h1>

      <form action="/check" method="post">
        enter username{" "}
        <input
          type="text"
          value={checkU}
          onChange={(e) => {
            setCheckU(e.target.value);
          }}
        />{" "}
        <br />
        enter Password{" "}
        <input
          type="text"
          value={checkP}
          onChange={(e) => {
            setCheckP(e.target.value);
          }}
        />{" "}
        <br />
        <button type="submit" onClick={check}>
          Check
        </button>
      </form>
    </>
  );
};

export default App;
