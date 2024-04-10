import React from "react";
import styled from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GlobalStyle } from "../../Styles/globalStyles";

const initialValues = {
  fname: "",
  email: "",
  password: "",
  role: "",
  cid: "",
  mobileno: "",
};

const validationSchema = Yup.object().shape({
  fname: Yup.string().required("Company name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: Yup.string().required("Role is required"),
  cid: Yup.string().required("Company ID is required"),
  mobileno: Yup.string().required("Mobile number is required"),
});

const Regi = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration error:", error.message || "Registration failed");
    }
  };

  return (
    
    <>
   
      <GlobalStyle />
      <Wrapper>
      <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
        <div className="container">
          <div className="modal">
            <div className="modal-container">
              <div className="modal-left">
                <h1 className="modal-title">Welcome!</h1>
                <p className="modal-desc">To WORKDAY</p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className="input-block">
                      <label htmlFor="companyName" className="input-label">
                        CompanyName
                      </label>
                      <Field
                        type="text"
                        autoComplete="off"
                        name="fname"
                        id="companyName"
                        placeholder="Name"
                      />
                      <ErrorMessage name="fname" component="div" className="form-error" />
                    </div>
                    <div className="input-block">
                      <label htmlFor="companyEmail" className="input-label">
                        CompanyEmail
                      </label>
                      <Field
                        type="email"
                        autoComplete="off"
                        name="email"
                        id="companyEmail"
                        placeholder="Email"
                      />
                      <ErrorMessage name="email" component="div" className="form-error" />
                    </div>
                    <div className="input-block">
                      <label htmlFor="password" className="input-label">
                        Password
                      </label>
                      <Field
                        type="password"
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" component="div" className="form-error" />
                    </div>
                    <div className="input-block">
                      <label htmlFor="role" className="input-label">
                        Role
                      </label>
                      <Field as="select" name="role" id="role">
                        <option value="">Select Role</option>
                        <option value="company">Company</option>
                        <option value="hr">HR</option>
                        <option value="admin">Admin</option>
                      </Field>
                      <ErrorMessage name="role" component="div" className="form-error" />
                    </div>
                    <div className="input-block">
                      <label htmlFor="cid" className="input-label">
                        Cid
                      </label>
                      <Field
                        type="text"
                        autoComplete="off"
                        name="cid"
                        id="cid"
                        placeholder="ComanyID"
                      />
                      <ErrorMessage name="cid" component="div" className="form-error" />
                    </div>
                    <div className="input-block">
                      <label htmlFor="mobile" className="input-label">
                        Mobile Number
                      </label>
                      <Field
                        type="tel"
                        autoComplete="off"
                        name="mobileno"
                        id="mobile"
                        placeholder="Mobile Number"
                      />
                      <ErrorMessage name="mobileno" component="div" className="form-error" />
                    </div>

                    <div className="modal-buttons">
                      <button className="input-button" type="submit">
                        Registration
                      </button>
                    </div>
                  </Form>
                </Formik>
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
`;

export default Regi;
