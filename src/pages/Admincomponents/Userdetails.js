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
  Table,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  CardTitle,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
import classnames from "classnames"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"
import toast, { Toaster } from "react-hot-toast"

import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

// import avatar from "../../assets/images/users/avatar-2.jpg"
import avatar from "../../assets/images/usersicon.png"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

import { addData, updateData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Userdetails = () => {
  const history = useHistory()
  //meta title
  //  document.title="Profile | CA Marketing - React Admin & Dashboard Template";

  const [modal, setmodal] = useState(false)
  const [form, setform] = useState({
    name: "shanker",
    profilePic:
      "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png",
    email: "shanker@gmail.com",
    mobileNumber: 564866533,
    status: "active",
    state: "Telangana",
    city: "Hyderabad",
    address: "KPHB Colony",
  })
  const [form1, setform1] = useState({
    bankName: "HDFC",
    accountNumber: "546545623165",
    IfscCode: "jntu4534",
    branch: "JNTU",
    upiId: "df534dj34543",
  })
  const [form2, setform2] = useState([])
  const [form3, setform3] = useState([])
  const [form4, setform4] = useState([])
  console.log(form4)
  const [form5, setform5] = useState([])

  const [activeTab, setactiveTab] = useState("1")
  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }
  const [activeTab1, setactiveTab1] = useState("1")
  const toggle1 = tab => {
    if (activeTab1 !== tab) {
      setactiveTab1(tab)
    }
  }

  // get all
  // const getByAgents = async () => {
  //   const bodydata = {
  //     userId: sessionStorage.getItem("userdataid"),
  //   }
  //   const resonse = await addData("user/getuserbyid", bodydata)
  //   var _data = resonse
  //   setform(_data?.data?.user)
  //   setform1(_data?.data?.userBankdetails)
  //   setform2(_data?.data?.redemproducts)
  //   setform3(_data?.data?.withdrawrequest)
  // }
  //
  const handleSubmit1 = async () => {
    const bodydata = {
      userId: sessionStorage.getItem("userdataid"),
    }
    try {
      const resonse = await updateData("user/userstatusupdate", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getByAgents()
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

  const modalopen = data => {
    setform4(data)
    setmodal(true)
  }

  const handleSubmit2 = async e => {
    e.preventDefault()
    const bodydata = {
      userId: sessionStorage.getItem("userdataid"),
      userStatus: form4,
      userStatusRejectedReason: form5.userStatusRejectedReason,
    }
    try {
      const resonse = await updateData("user/acceptkycrequest", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal(false)
      // getByAgents()
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

  const handleChange = e => {
    let myUser = { ...form5 }
    myUser[e.target.name] = e.target.value
    setform5(myUser)
  }

  useEffect(() => {
    // getByAgents()
    // getByAgentscustomers()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = form2.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(form2.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const [listPerPage1] = useState(5)
  const [pageNumber1, setPageNumber1] = useState(0)

  const pagesVisited1 = pageNumber1 * listPerPage1
  const lists1 = form3.slice(pagesVisited1, pagesVisited1 + listPerPage1)
  const pageCount1 = Math.ceil(form3.length / listPerPage1)
  const changePage1 = ({ selected }) => {
    setPageNumber1(selected)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Shicar" breadcrumbItem="User Details" />

          <Row>
            <div>
              <Button
                onClick={history.goBack}
                className="mb-2  m-1"
                style={{ float: "right" }}
                color="dark"
              >
                <i className="far fa-arrow-alt-circle-left"></i> Back
              </Button>
            </div>

            <Col md="4">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="12">
                      <div className="text-primary p-3 mb-5"></div>
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col sm="12">
                      <div className="profile-user-wid">
                        <div className="text-center">
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={form.profilePic}
                            // src={imgUrl + form.profilePic}
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        {/* {form.agentId} */}#{form.name}
                      </h5>
                      <h5 className="font-size-15 text-center mt-1">
                        <i className="bx bxs-star text-warning" />
                        <i className="bx bxs-star text-warning" />
                        <i className="bx bxs-star text-warning" />
                        <i className="bx bxs-star text-warning" />
                      </h5>

                      <h5 className="font-size-15 text-center mt-1">
                        Wallet: ₹ 500 /-
                      </h5>
                      {/* <p className="text-center mb-0"> <b>Coins: 524</b></p> */}

                      <div className="mt-3">
                        <Nav pills className="navtab-bg nav-justified">
                          <NavItem className="border border-primary rounded p-1 m-1">
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: activeTab1 === "1",
                              })}
                              onClick={() => {
                                toggle1("1")
                              }}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                          <NavItem className="border border-primary rounded p-1 m-1">
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: activeTab1 === "2",
                              })}
                              onClick={() => {
                                toggle1("2")
                              }}
                            >
                              Bank Details
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div>

                      <TabContent
                        activeTab={activeTab1}
                        className="p-3 text-muted"
                      >
                        <TabPane tabId="1">
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Full name</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.name}</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Email</span>
                            </div>
                            <div className="col col-7">
                              <span>:{form.email}</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Mobile</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.mobileNumber}</span>
                              <br />
                            </div>
                          </Row>
                          {/* <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Company</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.company}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Designation</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.designation}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Percentage</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.amountPercentage} %</span>
                              <br />
                            </div>
                          </Row> */}
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Status</span>
                            </div>
                            <div className="col col-7">
                              <span
                                className={
                                  form.status == "active"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                : {form.status}
                              </span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">State</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.state}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">City</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.city}</span>
                              <br />
                            </div>
                          </Row>

                          {/* <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Area</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.area}</span>
                              <br />
                            </div>
                          </Row> */}
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Address</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.address}</span>
                            </div>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Bank Name</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form1.bankName}</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">A/c Number</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form1.accountNumber}</span>
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">IFSC Code</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form1.IfscCode}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Branch</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form1.branch}</span>
                              <br />
                            </div>
                          </Row>
                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">UPI Id</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form1.upiId}</span>
                              <br />
                            </div>
                          </Row>
                        </TabPane>
                      </TabContent>
                      {form.status == "active" ? (
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              handleSubmit1()
                            }}
                            color="danger"
                          >
                            <i className="bx bx-block"></i> Block to User
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              handleSubmit1()
                            }}
                            color="success"
                          >
                            <i className="bx bx-check-circle"></i> Active to
                            User
                          </Button>
                        </div>
                      )}
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
                      <NavItem className="border border-primary rounded m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggle("1")
                          }}
                        >
                          Documents
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggle("2")
                          }}
                        >
                          Vehicles
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            toggle("3")
                          }}
                        >
                          Rides
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "4",
                          })}
                          onClick={() => {
                            toggle("4")
                          }}
                        >
                          Transactions
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "5",
                          })}
                          onClick={() => {
                            toggle("5")
                          }}
                        >
                          Ratings
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col md="6" className="mb-3">
                          {/* <h5 className="mt-2">Card No. : {form.idNumber} </h5> */}
                        </Col>
                        <Col md="6" className="mb-3 text-end">
                          {form.userStatus == "requested" ? (
                            <>
                              <Button
                                className="m-1"
                                color="danger"
                                outline
                                size="sm"
                                onClick={() => {
                                  modalopen("rejected")
                                }}
                              >
                                <i className="fa fa-times" /> Reject
                              </Button>
                              <Button
                                className="m-1"
                                color="success"
                                outline
                                size="sm"
                                onClick={() => {
                                  modalopen("approved")
                                }}
                              >
                                <i className="fa fa-check" /> Accpect
                              </Button>
                            </>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <Label>Front </Label>
                          <img
                            style={{ width: "100%", height: "250px" }}
                            src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202205/screenshot_2022-05-29_at_10-sixteen_nine.png?size=948:533"
                          />
                        </Col>
                        <Col md="6">
                          <Label>Back </Label>
                          <img
                            style={{ width: "100%", height: "250px" }}
                            src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202205/screenshot_2022-05-29_at_10-sixteen_nine.png?size=948:533"
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Brand</th>
                              <th>Modal</th>
                              <th>Image</th>
                              <th>Image2</th>
                              <th>Color</th>
                              <th>Seats</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {lists.map((data, key) => ( */}
                            <tr>
                              <td> 1</td>
                              <td>Tata</td>
                              <td>Tata Curvv</td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "70px" }}
                                  src="https://imgd.aeplcdn.com/664x374/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80"
                                />
                              </td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "70px" }}
                                  src="https://imgd.aeplcdn.com/664x374/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80"
                                />
                              </td>

                              <td>Gray</td>
                              <td>4</td>
                            </tr>
                            {/* // ))} */}
                          </tbody>
                        </Table>
                        <Col sm="12">
                          <div
                            className="d-flex mt-3 mb-1"
                            style={{ float: "right" }}
                          >
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount}
                              onPageChange={changePage}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date</th>
                              <th>Pick Up</th>
                              <th>Drop Off</th>
                              {/* <th>Message</th> */}
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {lists1.map((data, key) => ( */}
                            <tr>
                              <td> 1</td>
                              <td>18-10-2024</td>
                              <td>Hyderabad</td>
                              <td>Kurnool</td>
                              <td className="text-success">Completed</td>
                              <td>
                                <Link to="/ridedetails">
                                  <Button size="sm" color="warning">
                                    <i className="bx bx-show" />
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </Table>
                        <Col sm="12">
                          <div
                            className="d-flex mt-3 mb-1"
                            style={{ float: "right" }}
                          >
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount1}
                              onPageChange={changePage1}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists1.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date & Time</th>
                              <th>Transactions ID</th>
                              {/* <th>Coins</th> */}
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {lists1.map((data, key) => ( */}
                            <tr>
                              <td>1</td>
                              <td>18-10-2024, 10:30 AM</td>
                              <td>546d4543ddfd5d</td>
                              {/* <td>500</td> */}
                              <td>₹ 500</td>
                              <td className="text-success">Completed</td>
                              {/* <td>
                                  <Link to="/ridedetails" >
                                <Button  size="sm" color="warning"><i className="bx bx-show" /></Button>
                                </Link>
                                </td> */}
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </Table>
                        <Col sm="12">
                          <div
                            className="d-flex mt-3 mb-1"
                            style={{ float: "right" }}
                          >
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount1}
                              onPageChange={changePage1}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists1.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="5">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>Review</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {lists1.map((data, key) => ( */}
                            <tr>
                              <td>1</td>
                              <td>18-10-2024, 10:30 AM</td>
                              <td>shiva</td>
                              <td>
                                <h5 className="font-size-15 text-center mt-1">
                                  <i className="bx bxs-star text-warning" />
                                  <i className="bx bxs-star text-warning" />
                                  <i className="bx bxs-star text-warning" />
                                  <i className="bx bxs-star text-warning" />
                                </h5>
                              </td>
                              <td>Thank you for safe ride</td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </Table>
                        <Col sm="12">
                          <div
                            className="d-flex mt-3 mb-1"
                            style={{ float: "right" }}
                          >
                            <ReactPaginate
                              previousLabel={"Previous"}
                              nextLabel={"Next"}
                              pageCount={pageCount1}
                              onPageChange={changePage1}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists1.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal
          isOpen={modal}
          role="dialog"
          // size="sm"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={() => {
            setmodal(!modal)
          }}
        >
          {/* <div>
            <ModalHeader
              toggle={() => {
                setmodal(!modal)
              }}
            >
            </ModalHeader>
          </div> */}
          <div className="modal-body">
            <form
              onSubmit={e => {
                handleSubmit2(e)
              }}
              className="text-center"
            >
              {form4 == "rejected" ? (
                <i
                  className="bx bx-x-circle text-danger"
                  style={{ fontSize: "100px" }}
                />
              ) : (
                <i
                  className="bx bx-check-circle text-success"
                  style={{ fontSize: "100px" }}
                />
              )}
              <h5 className="text-center">
                Do you want to {form4 == "approved" ? "accpect" : "reject"} this
                KYC
              </h5>
              {form4 == "rejected" ? (
                <div className="mt-3">
                  <Label>
                    Reason <span className="text-danger">*</span>
                  </Label>
                  <textarea
                    required
                    className="form-control"
                    type="text"
                    name="userStatusRejectedReason"
                    onChange={e => handleChange(e)}
                    value={form5.userStatusRejectedReason}
                    placeholder="Enter Reason"
                  />
                </div>
              ) : (
                ""
              )}
              <div className="text-center mt-3">
                <Button
                  className="m-2"
                  style={{ width: "120px" }}
                  type="submit"
                  color="success"
                  outline
                >
                  <i className="bx bx-check-circle" /> Yes
                </Button>
                <Button
                  className="m-2"
                  onClick={() => {
                    setmodal(!modal)
                  }}
                  style={{ width: "120px" }}
                  type="button"
                  color="danger"
                  outline
                >
                  <i className="bx bx-x-circle" /> Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>

        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default withRouter(Userdetails)
