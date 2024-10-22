import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  CardFooter,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  CardTitle,
  FormGroup,
  Toast,
} from "reactstrap"
import classnames from "classnames"

import { addData, updateData } from "Servicescalls"
import { imgUrl } from "Baseurls"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-2.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"
import toast, { Toaster } from "react-hot-toast"


const UserProfile = () => {
  //meta title
  //  document.title="Profile | CA Marketing - React Admin & Dashboard Template";

  const dispatch = useDispatch()

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [idx, setidx] = useState(1)

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }))

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName)
        setemail(obj.email)
        setidx(obj.uid)
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username)
        setemail(obj.email)
        setidx(obj.uid)
      }
      setTimeout(() => {
        dispatch(resetProfileFlag())
      }, 3000)
    }
  }, [dispatch, success])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || "",
      idx: idx || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: values => {
      dispatch(editProfile(values))
    },
  })

  const [activeTab1, setactiveTab1] = useState("1")
  const toggle1 = tab => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab)
    }
  }

  const [admindata, setAdmindata] = useState([])
  const [form, setForm] = useState([])
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange1 = e => {
    const myForm = { ...form }
    myForm[e.target.name] = e.target.value
    setForm(myForm)
  }
  const handleChange = e => {
    const myForm = { ...password }
    myForm[e.target.name] = e.target.value
    setPassword(myForm)
  }

  // get admin
  const getAdmindata = async () => {
    const response = await addData("auth/getadminprofile")
    var _data = response.data
    console.log(_data)
    setAdmindata(_data.profile)
    setForm(_data.profile)
  }

  // edit admin

  const editAdmindata = async e => {
    e.preventDefault()
    const bodydata = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    }
    try {
      const response = await updateData("auth/editprofile", bodydata)
      var _data = response.data
      console.log(_data)
      toast.success(_data.message)
      getAdmindata()
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  // Edit Password

  const ChangePsw = async e => {
    e.preventDefault()
    const bodydata = {
      password: password.password,
      newpassword: password.newpassword,
      confirmpassword: password.confirmpassword,
    }
    try {
      const response = await addData("auth/changepass", bodydata)
      var _data = response.data
      toast.success(_data.message)
      console.log(response.status)
      getAdmindata()
      cleardata()
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  //Profile pic update

  const [file, setFile] = useState('')

  const fileChange = async (e) => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFile(e.target.files)
    } else {
        e.target.value = null
        toast.error('Please select a valid image file (jpg, jpeg, or png)')
    }

    const dataArray = new FormData();
    for (let i = 0; i < file.length; i++) {
      dataArray.append("profilePic", file[i]);
    }
    try {
      const response = await updateData("auth/editprofilepic", dataArray)
      var _data = response.data
      toast.success(_data.message)
      getAdmindata()
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  const cleardata = () => {
    setPassword({
      password: "",
      newpassword: "",
      confirmpassword: "",
    })
  }


  useEffect(() => {
    getAdmindata()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Shicar" breadcrumbItem="Profile" />
          <Row>
            <Col md="4">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="12">
                      <div className="text-primary p-3 mb-5">
                        {/* <h5 className="text-primary">Welcome Back !</h5>
                <p>CA Marketing Dashboard</p> */}
                      </div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="12">
                      <div className="profile-user-wid">
                        <div className="text-center">
                          <Label >
                            <Input accept=".jpg, .jpeg, .png" onChange={fileChange} name="profilepic" style={{ display: "none" }} type="file" />
                            <img
                              style={{ width: "100px" }}
                              src={imgUrl + admindata.profilePic}
                              alt="profilepic"

                              className="img-thumbnail rounded-circle"
                            />
                          </Label>

                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        # {admindata.name}
                      </h5>
                      <p className="font-size-15 mt-4 text-truncate text-dark">
                        Details
                      </p>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Full Name</span>
                        </div>
                        <div className="col col-7">
                          <span>: {admindata.name}</span>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Email</span>
                        </div>
                        <div className="col col-7">
                          <span>:{admindata.email}</span>
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Phone number</span>
                        </div>
                        <div className="col col-7">
                          <span>: {admindata.phone}</span>
                          <br />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Address</span>
                        </div>
                        <div className="col col-7">
                          <span>: {admindata.address}</span>
                        </div>
                      </Row>

                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardBody>
                  <div className="mt-3">
                    <Nav pills className="navtab-bg nav-justified">
                      <NavItem className="border border-primary rounded">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab1 === "1",
                          })}
                          onClick={() => {
                            toggle1("1")
                          }}
                        >
                          Edit Profile Details
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab1 === "2",
                          })}
                          onClick={() => {
                            toggle1("2")
                          }}
                        >
                          Change Password
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab1} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <form
                        onSubmit={e => {
                          editAdmindata(e)
                        }}
                      >
                        <h5 className="mb-4">Edit Profile</h5>
                        <Row>
                          <Col md={6} className="mt-3">
                            <Label htmlFor="validationCustom01">
                              Full Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="name"
                              value={form.name}
                              placeholder="Enter First Name"
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              required
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                         
                          <Col md={6} className="mt-3">
                            <Label htmlFor="validationCustom01">
                              Email <span className="text-danger">*</span>
                            </Label>
                            <Input
                              placeholder="Enter Email"
                              type="email"
                              className="form-control"
                              id="validationCustom01"
                              name="email"
                              value={form.email}
                              onChange={e => {
                                handleChange1(e)
                              }}
                              required
                            />
                          </Col>
                          <Col md={6} className="mt-3">
                            <Label htmlFor="validationCustom01">
                              Phone No. <span className="text-danger">*</span>
                            </Label>
                            <Input
                              placeholder="Enter Number"
                              type="number"
                              className="form-control"
                              id="validationCustom01"
                              name="phone"
                              value={form.phone}
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                          {/* <Col md={6}>
                        <Label htmlFor="validationCustom01">
                          Profile <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="profilePic"
                          type="file"
                          className="form-control"
                          id="validationCustom01"
                          // value={form1.profilePic}
                          // onChange={changeHandler1}
                        />
                      </Col> */}
                        </Row>
                        <Row className="mt-3 mb-5">
                          <Col md={12}>
                            <Label htmlFor="validationCustom01">
                              Address <span className="text-danger">*</span>
                            </Label>
                            <textarea
                              placeholder="Enter Address"
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              name="address"
                              value={form.address}
                              onChange={e => {
                                handleChange1(e)
                              }}
                            />
                          </Col>
                        </Row>

                        <div style={{ float: "right" }}>
                          <Button
                            style={{ width: "150px" }}
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </TabPane>
                    <TabPane tabId="2">
                      <form
                        onSubmit={e => {
                          ChangePsw(e)
                        }}
                      >
                        <Row className="mb-4">
                          <Col sm="12">
                            <CardText className="mb-0">
                              <h5>Change Password</h5>

                              <Row className="mt-5">
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom01">
                                      Current Password{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      placeholder="Current Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom01"
                                      required
                                      name="password"
                                      value={password.password}
                                      onChange={e => {
                                        handleChange(e)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom02">
                                      New Password{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      placeholder="New Password"
                                      type="password"
                                      required
                                      className="form-control"
                                      id="validationCustom02"
                                      name="newpassword"
                                      value={password.newpassword}
                                      onChange={e => {
                                        handleChange(e)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom02">
                                      Confirm Password{" "}
                                      <span className="text-danger">*</span>
                                    </Label>
                                    <Input
                                      placeholder="Confirm Password"
                                      type="password"
                                      required
                                      className="form-control"
                                      id="validationCustom02"
                                      name="confirmpassword"
                                      value={password.confirmpassword}
                                      onChange={e => {
                                        handleChange(e)
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </CardText>
                          </Col>
                        </Row>
                        <div style={{ float: "right" }}>
                          <Button
                            style={{ width: "150px" }}
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Toaster />
          {/* <h4 className="card-title mb-4">Change User Name</h4> */}

          {/* <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                  <Input name="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserProfile)
