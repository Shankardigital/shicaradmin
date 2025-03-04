import PropTypes from "prop-types";
import React, {useState} from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link, useHistory } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { userForgetPassword } from "../../store/actions";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.png";
import toast, { Toaster } from 'react-hot-toast';
import { addData } from "Servicescalls"

const ForgetPasswordPage = () => {
  const history = useHistory()

  const [form, setform] = useState([])
  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
};

 // Add function

 const handleSubmit = async e => {
  e.preventDefault()
  const bodydata = {
    _id: sessionStorage.getItem("forgotemail"),
    emailOtp: form.emailOtp
  }
  try {
    const resonse = await addData("auth/compareotp", bodydata)
    var _data = resonse
    console.log(_data)
    toast.success(_data.data.message)
    sessionStorage.setItem("emailOtp",form.emailOtp)
    history.push("/setpassword")

  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      toast.error(error.response.data.message)
    } else {
      // toast.error("An error occurred. Please try again.")
    }
  }
}

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to CA Marketing.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {/* {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {forgetSuccessMsg}
                      </Alert>
                    ) : null} */}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {handleSubmit(e)}}>
                      <div className="mb-3">
                        <Label className="form-label">Otp</Label>
                        <Input
                          name="emailOtp"
                          className="form-control"
                          placeholder="Enter Otp"
                          type="emailOtp"
                          onChange={(e)=>{handleChange(e)}}
                          // onChange={validation.handleChange}
                          // onBlur={validation.handleBlur}
                          // value={validation.values.email || ""}
                          // invalid={
                          //   validation.touched.email && validation.errors.email ? true : false
                          // }
                        />
                        {/* {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null} */}
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Submit
                          </button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Shicar. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Digitalraiz Creative Solutions Pvt Ltd.
                </p>
              </div>
            </Col>
          </Row>
          <Toaster/>
        </Container>
      </div>
    </React.Fragment>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);

