import React from "react";
//import styled from "styled-components";
//import styled from "styled-c\lamadev\TYBCA-PROJECT\client\src\pages\register";

//import { GlobalStyle } from "./Styles/globalStyles";

import { useFormik } from "formik";
//import { signUpSchema } from "./schemas";
import { signUpSchema } from ".";

import { GlobalStyle } from "../../Styles/globalStyles";
import styled from "styled-components";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Registration = () => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(
        "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
        values
      );
      action.resetForm();
    },
  });
  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );
  // Function to handle form reset
  const handleFormReset = () => {
    resetForm(); // Resetting the form values to initial values
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">To WORKDAY</p>
                <form onSubmit={handleSubmit}>
                  <div className="input-block">
                    <label htmlFor="name" className="input-label">
                      CompanyName
                    </label>
                    <input
                      type="name"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      CompanyEmail
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="password" className="input-label">
                      Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="role" className="input-label">
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Role</option>
                      <option value="company">Company</option>
                      <option value="hr">HR</option>
                      <option value="admin">Admin</option>
                    </select>
                    {errors.role && touched.role ? (
                      <p className="form-error">{errors.role}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="cid" className="input-label">
                      Cid
                    </label>
                    <input
                      type="numbers"
                      autoComplete="off"
                      name="cid"
                      id="cid"
                      placeholder="ComanyID"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.cid && touched.cid ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
                  </div>

                  <div className="input-block">
                    <label htmlFor="mobile" className="input-label">
                      Mobile Number
                    </label>
                    <input
                      type="numbers" // Changed type to "number" for numeric input
                      autoComplete="off"
                      name="mobile" // Changed name to "mobile"
                      id="mobile"
                      placeholder="Mobile Number" // Updated placeholder
                      value={values.mobile} // Assuming you update values.mobile in handleChange
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.mobile && touched.mobile ? (
                      <p className="form-error">{errors.mobile}</p>
                    ) : null}
                  </div>

                  {/* <div className="input-block">
                    <label htmlFor="confirm_password" className="input-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="form-error">{errors.confirm_password}</p>
                    ) : null}
                  </div> */}
                  {/* Button to clear the form */}
                  {/* <button type="button" onClick={handleFormReset}> */}
                  {/* Clear Form */}
                  {/* </button> */}
                  <div className="modal-buttons">
                    {/* <a href="#" className="">
                      Want to register using Gmail?
                    </a> */}
                    {/* <button className="input-button" type="submit" onClick={handleFormReset}>
                     Clear
                    </button> */}
                  </div>

                  <div className="modal-buttons">
                    {/* <a href="#" className="">
                      Want to register using Gmail?
                    </a> */}
                    <button className="input-button" type="submit">
                      Registration
                    </button>
                  </div>
                </form>
                {/* <p className="sign-up">
                  Already have an account? <a href="#">Sign In now</a>
                </p> */}
              </div>
              <div className="modal-right">
                <img
                  src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: 100%;
    /* height: 60px; */
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }
  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;

    transition-duration: 0.3s;
    background: #fff;
  }
  .modal-title {
    margin: 0;
    font-weight: 400;
    color: #55311c;
  }
  .form-error {
    font-size: 1.4rem;
    color: #b22b27;
  }
  .modal-desc {
    margin: 6px 0 30px 0;
  }
  .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }

  .modal-right {
    flex: 2;
    font-size: 0;
    transition: 0.3s;
    overflow: hidden;
  }
  .modal-right img {
    width: 100%;
    height: 100%;
    transform: scale(1);
    -o-object-fit: cover;
    object-fit: cover;
    transition-duration: 1.2s;
  }

  .modal.is-open .modal-left {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.1s;
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .modal-buttons a {
    color: rgba(51, 51, 51, 0.6);
    font-size: 14px;
    ustify-content: space-between;
  }

  .sign-up {
    margin: 60px 0 0;
    font-size: 14px;
    text-align: center;
  }
  .sign-up a {
    color: #8c7569;
  }

  .input-button {
    padding: 1.2rem 3.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background: #8c7569;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }
  .input-button:hover {
    background: #55311c;
  }

  .input-label {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.7px;
    color: #8c7569;
    transition: 0.3s;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 20px;
    transition: 0.3s;
  }
  .input-block input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .input-block input::-moz-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input:-ms-input-placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block input::placeholder {
    color: #ccc;
    opacity: 1;
  }
  .input-block:focus-within {
    border-color: #8c7569;
  }
  .input-block:focus-within .input-label {
    color: rgba(140, 117, 105, 0.8);
  }

  @media (max-width: 750px) {
    .modal-container {
      max-width: 90vw;
    }

    .modal-right {
      display: none;
    }
  }
`;

export default Registration;
