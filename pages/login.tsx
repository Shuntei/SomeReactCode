import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [data, setData] = useState({ account: "", password: "" });
  const [msg, setMsg] = useState("");
  // const [loginMsg, setLoginMsg] = useState("");

  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    const res = await axios.post(
      "http://localhost:5000/login",
      {
        account: data.account,
        password: data.password,
      },
      { withCredentials: true }
    );

    if (res) {
      console.log("res success");
    } else {
      console.log("res failed");
    }
    setMsg(res.data.message);
  };

  const logoutHandler = async () => {
    const res = await axios.get(
      "http://localhost:5000/logout",
      { withCredentials: true }
    );

    if (res) {
      console.log("res success");
    } else {
      console.log("res failed");
    }
    setMsg(res.data.message);
  };

  return (
    <main>
      <label>
        帳號
        <input
          type="text"
          name="account"
          value={data.account}
          onChange={changeHandler}
        />
      </label>
      <br />
      <label>
        密碼
        <input
          type="text"
          name="password"
          value={data.password}
          onChange={changeHandler}
        />
      </label>
      <hr />
      <button onClick={loginHandler}>送出</button>
      <div>登入訊息: {msg}</div>
      <hr />
      <button onClick={logoutHandler}>登出</button>
      {/* <button onClick={loginMsgHandler}>顯示登入訊息</button>
      <div>{loginMsg}</div> */}
    </main>
  );
}
