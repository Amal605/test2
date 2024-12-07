import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userCont } from "../../context/User.context";

export default function Login() {
  //within toast
  const [errorMsg, setErrorMsg] = useState(null);
  //to go to login
  const navigate = useNavigate();
  const { token, setToken } = useContext(userCont);
  const schema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),

    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9a-zA-Z]{5,15}$/,
        "password should start with uppercase letter followed by a combinations of letters and numberfrom 5 to 25 char"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });
  async function sendData(values) {
    let id;
    try {
      const option = {
        url: "http://gradproj.runasp.net/api/student/login",
        method: "POST",
        data: values,
      };

    //   id = toast.loading("waiting...");
      const { data } = await axios.request(option);
      console.log(data);
    //   toast.dismiss(id);
    //   toast.success("user logedin successfully");

      setTimeout(() => {
        if (data.message === "success") {
          //^el token kan b null
          //^ dlw2ty hyt change el state bta3tha ehy mogoda fe eh context الي كله يقدر يشوفها
          //^ lma el user y logi sucessfuly
          //^we el value bta3t el token.... bta3 el "user" de ahna mehtagenha fe kol el app
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/app");
        }
      }, 1000);
    } catch (error) {
        console.log(error);
    //   toast.dismiss(id);
    //   toast.error(error.response.data.message);
    //   setErrorMsg(error.response.data.message);
    }
  }

  return (
    <>
    <h1>Hello</h1>
    </>
  );
}
