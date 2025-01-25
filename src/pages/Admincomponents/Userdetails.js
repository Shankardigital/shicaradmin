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
  const [modal1, setmodal1] = useState(false)
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [form2, setform2] = useState([])
  const [form3, setform3] = useState([])
  const [form4, setform4] = useState([])
  const [form5, setform5] = useState([])
  const [form6, setform6] = useState([])
  const [form7, setform7] = useState([])
  const [form8, setform8] = useState([])
  const [form9, setform9] = useState([])
  const [form11, setform11] = useState([])
  const [form12, setform12] = useState([])
  const [form10, setform10] = useState({ blockedReason: "" })

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
  const getByAgents = async () => {
    const bodydata = {
      userId: sessionStorage.getItem("userdataid"),
    }
    const resonse = await addData("users/getuserlistbyid", bodydata)
    var _data = resonse
    setform(_data?.data?.user)
    setform1(_data?.data?.userBankdetails)
    setform2(_data?.data?.userVechiles)
    setform3(_data?.data?.publishedRides)
    setform6(_data?.data?.bookedRides)
    setform7(_data?.data?.transactions)
    setform8(_data?.data?.userreviews)
    setform9(_data?.data?.receivedReviews)
    setform11(_data?.data?.completedRides)
    setform12(_data?.data?.cancelledRides)
  }
  //

  const handleSubmit1 = async e => {
    e.preventDefault()
    const bodydata = {
      userId: sessionStorage.getItem("userdataid"),
      blockedReason: form10.blockedReason,
    }
    try {
      const resonse = await updateData(
        "users/updatestatus/active/incative",
        bodydata
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getByAgents()
      setmodal1(false)
      setform10({ blockedReason: "" })
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
  const modalopen1 = () => {
    setmodal1(true)
  }

  const handleSubmit2 = async e => {
    e.preventDefault()
    const bodydata = {
      userId: sessionStorage.getItem("userdataid"),
      userDocumentStatus: form4,
      userDocumentsRejectedReason: form5.userDocumentsRejectedReason,
    }
    try {
      const resonse = await updateData(
        "riderverification/updateuserdocumentstatus",
        bodydata
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal(false)
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

  const handleChange = e => {
    let myUser = { ...form5 }
    myUser[e.target.name] = e.target.value
    setform5(myUser)
  }
  const handleChange1 = e => {
    let myUser = { ...form10 }
    myUser[e.target.name] = e.target.value
    setform10(myUser)
  }

  useEffect(() => {
    getByAgents()
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
  const [listPerPage2] = useState(5)
  const [pageNumber2, setPageNumber2] = useState(0)

  const pagesVisited2 = pageNumber2 * listPerPage2
  const lists2 = form6.slice(pagesVisited2, pagesVisited2 + listPerPage2)
  const pageCount2 = Math.ceil(form6.length / listPerPage2)
  const changePage2 = ({ selected }) => {
    setPageNumber2(selected)
  }

  const [listPerPage3] = useState(5)
  const [pageNumber3, setPageNumber3] = useState(0)

  const pagesVisited3 = pageNumber3 * listPerPage3
  const lists3 = form7.slice(pagesVisited3, pagesVisited3 + listPerPage3)
  const pageCount3 = Math.ceil(form7.length / listPerPage3)
  const changePage3 = ({ selected }) => {
    setPageNumber3(selected)
  }

  const [listPerPage4] = useState(5)
  const [pageNumber4, setPageNumber4] = useState(0)

  const pagesVisited4 = pageNumber4 * listPerPage4
  const lists4 = form8.slice(pagesVisited4, pagesVisited4 + listPerPage4)
  const pageCount4 = Math.ceil(form8.length / listPerPage3)
  const changePage4 = ({ selected }) => {
    setPageNumber4(selected)
  }

  const [listPerPage5] = useState(5)
  const [pageNumber5, setPageNumber5] = useState(0)

  const pagesVisited5 = pageNumber5 * listPerPage5
  const lists5 = form9.slice(pagesVisited5, pagesVisited5 + listPerPage5)
  const pageCount5 = Math.ceil(form9.length / listPerPage5)
  const changePage5 = ({ selected }) => {
    setPageNumber5(selected)
  }
  const [listPerPage6] = useState(5)
  const [pageNumber6, setPageNumber6] = useState(0)

  const pagesVisited6 = pageNumber6 * listPerPage6
  const lists6 = form11.slice(pagesVisited6, pagesVisited6 + listPerPage6)
  const pageCount6 = Math.ceil(form11.length / listPerPage6)
  const changePage6 = ({ selected }) => {
    setPageNumber6(selected)
  }
  const [listPerPage7] = useState(5)
  const [pageNumber7, setPageNumber7] = useState(0)

  const pagesVisited7 = pageNumber7 * listPerPage7
  const lists7 = form12.slice(pagesVisited7, pagesVisited7 + listPerPage7)
  const pageCount7 = Math.ceil(form12.length / listPerPage7)
  const changePage7 = ({ selected }) => {
    setPageNumber7(selected)
  }

  const redirectBooking = data => {
    sessionStorage.setItem("rideid", data._id)
    history.push("/ridedetails")
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
                            src={imgUrl + form.profilePic}
                            // src={imgUrl + form.profilePic}
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        {/* {form.agentId} */}#{form.name}
                      </h5>
                      <div className="font-size-15 text-center mt-1">
                        {form.review == "1" || form.review == "1.0" ? (
                          <i className="bx bxs-star text-warning" />
                        ) : form.review == "2" || form.review == "2.0" ? (
                          <>
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                          </>
                        ) : form.review == "3" || form.review == "3.0" ? (
                          <>
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                          </>
                        ) : form.review == "4" || form.review == "4.0" ? (
                          <>
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                          </>
                        ) : form.review == "5" ? (
                          <>
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" />
                            <i className="bx bxs-star text-warning" /> 
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <h5 className="font-size-15 text-center mt-1">
                        Wallet: ₹ {form.wallet} /-
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
                              <span>: {form.phone}</span>
                              <br />
                            </div>
                          </Row>
                          {/* <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Mobile</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.phone}</span>
                              <br />
                            </div>
                          </Row> */}
                          {form.userDocumentStatus == "rejected" ? (
                            <>
                              <Row className="mb-3">
                                <div className="col col-5">
                                  <span className="">Status</span>
                                </div>
                                <div className="col col-7">
                                  <span className="text-danger">
                                    : Rejected
                                  </span>
                                  <br />
                                </div>
                              </Row>
                              <Row className="mb-3">
                                <div className="col col-5">
                                  <span className="">Reason</span>
                                </div>
                                <div className="col col-7">
                                  <span>
                                    : {form.userDocumentsRejectedReason}
                                  </span>
                                  <br />
                                </div>
                              </Row>
                            </>
                          ) : (
                            <>
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
                              {form.status == "inactive" ? (
                                <Row className="mb-3">
                                  <div className="col col-5">
                                    <span className="">Reason</span>
                                  </div>
                                  <div className="col col-7">
                                    <span>: {form.blockedReason}</span>
                                    <br />
                                  </div>
                                </Row>
                              ) : (
                                ""
                              )}
                            </>
                          )}

                          {/* <Row className="mb-3">
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

                          <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">Address</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form.address}</span>
                            </div>
                          </Row>  */}
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
                          {/* <Row className="mb-3">
                            <div className="col col-5">
                              <span className="">UPI Id</span>
                            </div>
                            <div className="col col-7">
                              <span>: {form1.upiId}</span>
                              <br />
                            </div>
                          </Row> */}
                        </TabPane>
                      </TabContent>
                      <Row>
                      <Col md="7" style={{padding:"0px"}}>
                        {form.userDocumentStatus == "rejected" ? (
                        <div className="">
                          <Button
                            onClick={() => {
                              modalopen("update")
                            }}
                            color="warning"
                            style={{padding:"7px"}}
                          >
                      <i className="bx bx-check-circle" /> Update Document Status
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                        </Col>
                        <Col md="5"  style={{padding:"0px"}}>
                        {form.status == "active" ? (
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              modalopen1()
                            }}
                            style={{padding:"7px"}}
                            color="danger"
                          >
                            <i className="bx bx-block"></i> Block to User
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Button
                            onClick={() => {
                              modalopen1()
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
                    

                    
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md="8">
              <Card>
                <CardBody>
                  <div className="mt-3">
                    <Nav pills className="navtab-bg row">
                      {form.userDocumentStatus == "requested" || form.userDocumentStatus == "pending" ||
                      form.userDocumentStatus == "rejected" ? (
                        <NavItem className="rounded col-md-3 text-center">
                          <NavLink
                            style={{
                              cursor: "pointer",
                              padding: "3px 0px",
                              // padding: "3px",
                              // fontSize: "11px",
                            }}
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1")
                            }}
                          >
                            <i className="fas fa-file-contract"></i>
                            <br />
                            Documents
                          </NavLink>
                        </NavItem>
                      ) : (
                        <>
                          <Row>
                            <NavItem className="rounded col p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "1",
                                })}
                                onClick={() => {
                                  toggle("1")
                                }}
                              >
                                <i className="fas fa-file-contract"></i>
                                <br />
                                Documents
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded  col p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "2",
                                })}
                                onClick={() => {
                                  toggle("2")
                                }}
                              >
                                <i className="fas fa-car" />
                                <br />
                                Vehicles
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded col p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "3",
                                })}
                                onClick={() => {
                                  toggle("3")
                                }}
                              >
                                <i className="fas fa-car-side" />
                                <br />
                                Publish Rides
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded  col p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "4",
                                })}
                                onClick={() => {
                                  toggle("4")
                                }}
                              >
                                <i className="fas fa-car" />
                                <br />
                                Booked Rides
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded col p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "5",
                                })}
                                onClick={() => {
                                  toggle("5")
                                }}
                              >
                                <i className="fas fa-check-circle" />
                                <br />
                                Completed Rides
                              </NavLink>
                            </NavItem>
                          </Row>

                          <Row>
                            <NavItem className=" rounded  col-md-3 p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "6",
                                })}
                                onClick={() => {
                                  toggle("6")
                                }}
                              >
                                <i className="fas fa-times-circle" />
                                <br />
                                Cancelled Rides
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded  col-md-3 p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "7",
                                })}
                                onClick={() => {
                                  toggle("7")
                                }}
                              >
                                <i className="fas fa-money-bill-wave" />
                                <br />
                                Transactions
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded  col-md-3 p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                  // fontSize: "11px",
                                }}
                                className={classnames({
                                  active: activeTab === "8",
                                })}
                                onClick={() => {
                                  toggle("8")
                                }}
                              >
                                <i className="fas fa-star-half-alt" />
                                <br />
                                Given Ratings
                              </NavLink>
                            </NavItem>
                            <NavItem className=" rounded col-md-3 p-0 text-center">
                              <NavLink
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid #0b1a31",
                                  margin: "3px",
                                  padding: "3px 0px",
                                }}
                                className={classnames({
                                  active: activeTab === "9",
                                })}
                                onClick={() => {
                                  toggle("9")
                                }}
                              >
                                <i className="far fa-star" />
                                <br />
                                Taken Reviews
                              </NavLink>
                            </NavItem>
                          </Row>
                        </>
                      )}
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab} className="text-muted">
                    <TabPane tabId="1">
                      <Row>
                        <Col md="6" className="mb-3">
                          {/* <h5 className="mt-2">Card No. : {form.idNumber} </h5> */}
                        </Col>
                        <Col md="6" className="mb-3 text-end">
                          {form.userDocumentStatus == "requested" || form.userDocumentStatus == "pending" ? (
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
                                <i className="bx bx-check-circle" /> Accpect
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
                            src={imgUrl + form.documentFrontImage}
                          />
                        </Col>
                        <Col md="6">
                          <Label>Back </Label>
                          <img
                            style={{ width: "100%", height: "250px" }}
                            src={imgUrl + form.documentBackImage}
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
                              <th>Date</th>
                              <th>Brand</th>
                              <th>Modal</th>
                              <th>Front</th>
                              <th>Back</th>
                              <th>Color</th>
                              <th>Seats</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists.map((data, key) => (
                              <tr key={key}>
                                <td> {(pageNumber - 1) * 5 + key + 6}</td>
                                <td>{data.date}</td>
                                <td>{data.name}</td>
                                <td>{data.model}</td>
                                <td>
                                  <img
                                    style={{ width: "100px", height: "60px" }}
                                    src={imgUrl + data.carFrontImage}
                                  />
                                </td>
                                <td>
                                  <img
                                    style={{ width: "100px", height: "60px" }}
                                    src={imgUrl + data.carFrontImage}
                                  />
                                </td>

                                <td>{data.colour}</td>
                                <td>{data.seats}</td>
                              </tr>
                            ))}
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
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists1.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber1 - 1) * 5 + key + 6}</td>
                                <td>{data.rideStartDate}</td>
                                <td>{data?.pickupLocation?.address}</td>
                                <td>{data?.dropoffLocation?.address}</td>
                                <td
                                  className={
                                    data.rideStatus == "completed"
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {data.rideStatus}
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      redirectBooking(data)
                                    }}
                                    size="sm"
                                    color="warning"
                                  >
                                    <i className="bx bx-show" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
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
                              <th>Date</th>
                              <th>Pick Up</th>
                              <th>Drop Off</th>
                              {/* <th>Message</th> */}
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists2.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber2 - 1) * 5 + key + 6}</td>
                                <td>{data.rideStartDate}</td>
                                <td>{data?.pickupLocation?.address}</td>
                                <td>{data?.dropoffLocation?.address}</td>
                                <td
                                  className={
                                    data.rideStatus == "completed"
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {data.rideStatus}
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      redirectBooking(data)
                                    }}
                                    size="sm"
                                    color="warning"
                                  >
                                    <i className="bx bx-show" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
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
                              pageCount={pageCount2}
                              onPageChange={changePage2}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists2.length}
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
                              <th>Date</th>
                              <th>Pick Up</th>
                              <th>Drop Off</th>
                              {/* <th>Message</th> */}
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists6.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber2 - 1) * 5 + key + 6}</td>
                                <td>{data.rideStartDate}</td>
                                <td>{data?.pickupLocation?.address}</td>
                                <td>{data?.dropoffLocation?.address}</td>
                                <td
                                  className={
                                    data.rideStatus == "completed"
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {data.rideStatus}
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      redirectBooking(data)
                                    }}
                                    size="sm"
                                    color="warning"
                                  >
                                    <i className="bx bx-show" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
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
                              pageCount={pageCount2}
                              onPageChange={changePage2}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists2.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="6">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date</th>
                              <th>Pick Up</th>
                              <th>Drop Off</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists7.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber2 - 1) * 5 + key + 6}</td>
                                <td>{data.rideStartDate}</td>
                                <td>{data?.pickupLocation?.address}</td>
                                <td>{data?.dropoffLocation?.address}</td>
                                <td
                                  className={
                                    data.rideStatus == "completed"
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {data.rideStatus}
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      redirectBooking(data)
                                    }}
                                    size="sm"
                                    color="warning"
                                  >
                                    <i className="bx bx-show" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
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
                              pageCount={pageCount2}
                              onPageChange={changePage2}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists2.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="7">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date & Time</th>
                              <th>Transactions ID</th>
                              <th>Type</th>
                              <th>Amount</th>
                              <th>Description</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists3.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber3 - 1) * 5 + key + 6}</td>
                                <td>
                                  {data.date}, {data.time}
                                </td>
                                <td>{data.transactionId}</td>
                                <td>{data.type}</td>
                                <td>₹ {data.amount}</td>
                                <td>{data.description}</td>
                                <td
                                  className={
                                    data.transactionStatus == "completed"
                                      ? "text-success"
                                      : "text-warning"
                                  }
                                >
                                  {data.transactionStatus}
                                </td>
                              </tr>
                            ))}
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
                              pageCount={pageCount3}
                              onPageChange={changePage3}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists3.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="8">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date</th>
                              <th>User Name</th>
                              <th>Review</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists4.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber4 - 1) * 5 + key + 6}</td>
                                <td>{data.logModifiedDate.slice(0, 10)}</td>
                                <td>{data.userName}</td>
                                <td>
                                  <div className="font-size-15 text-center mt-1">
                                    {data.review == "1" ||
                                    data.review == "1.0" ? (
                                      <i className="bx bxs-star text-warning" />
                                    ) : data.review == "2" ||
                                      data.review == "2.0" ? (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    ) : data.review == "3" ||
                                      data.review == "3.0" ? (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    ) : data.review == "4" ||
                                      data.review == "4.0" ? (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    ) : (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td>{data.description}</td>
                              </tr>
                            ))}
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
                              pageCount={pageCount4}
                              onPageChange={changePage4}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists4.length}
                            />
                          </div>
                        </Col>
                      </div>
                    </TabPane>
                    <TabPane tabId="9">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Date</th>
                              <th>User Name</th>
                              <th>Review</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {lists5.map((data, key) => (
                              <tr key={key}>
                                <td>{(pageNumber5 - 1) * 5 + key + 6}</td>
                                <td>{data.logModifiedDate.slice(0, 10)}</td>
                                <td>{data.userName}</td>
                                <td>
                                  <div className="font-size-15 text-center mt-1">
                                    {data.review == "1" ||
                                    data.review == "1.0" ? (
                                      <i className="bx bxs-star text-warning" />
                                    ) : data.review == "2" ||
                                      data.review == "2.0" ? (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    ) : data.review == "3" ||
                                      data.review == "3.0" ? (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    ) : data.review == "4" ||
                                      data.review == "4.0" ? (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    ) : (
                                      <>
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                        <i className="bx bxs-star text-warning" />
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td>{data.description}</td>
                              </tr>
                            ))}
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
                              pageCount={pageCount5}
                              onPageChange={changePage5}
                              containerClassName={"pagination"}
                              previousLinkClassName={"previousBttn"}
                              nextLinkClassName={"nextBttn"}
                              disabledClassName={"disabled"}
                              activeClassName={"active"}
                              total={lists5.length}
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
                Do you want to {form4 == "approved" ? "accpect" : form4 == "update" ?"update": "reject"} this
                KYC details
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
                    name="userDocumentsRejectedReason"
                    onChange={e => handleChange(e)}
                    value={form5.userDocumentsRejectedReason}
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

        <Modal
          isOpen={modal1}
          role="dialog"
          // size="sm"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={() => {
            setmodal1(!modal1)
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
                handleSubmit1(e)
              }}
              className="text-center"
            >
              {form.status == "active" ? (
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
                Do you want to {form.status == "active" ? "block" : "active"}{" "}
                this user
              </h5>
              {form.status == "active" ? (
                <div className="mt-3">
                  <Label>
                    Reason <span className="text-danger">*</span>
                  </Label>
                  <textarea
                    required
                    className="form-control"
                    type="text"
                    name="blockedReason"
                    onChange={e => handleChange1(e)}
                    value={form10.blockedReason}
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
                    setmodal1(!modal1)
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
