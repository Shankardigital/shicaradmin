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

import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"
import Companyproduct from "../../assets/images/brands/Companyproduct.png"

// import avatar from "../../assets/images/users/avatar-2.jpg"
import avatar from "../../assets/images/usersicon.png"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Companyproductview = () => {
  const history = useHistory()
  //meta title
  //  document.title="Profile | CA Marketing - React Admin & Dashboard Template";

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const [modal, setmodal] = useState(false)
  const [form, setform] = useState([])

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
  const [cardData, setcardData] = useState([])
  const [cardData1, setcardData1] = useState([])
  console.log(cardData1)
  const [cardData2, setcardData2] = useState([])
  const [cardData3, setcardData3] = useState([])

  const getByProduct = async () => {
    const bodydata = {
      rideId: sessionStorage.getItem("rideid"),
    }
    const resonse = await addData("rides/getRidesById", bodydata)
    var _data = resonse
    setform(_data?.data?.rides[0])
    setcardData(_data?.data?.rides[0]?.carDetails)
    setcardData1(_data?.data?.rides[0]?.driverDetails)
    setcardData2(_data?.data?.rides[0]?.passengers)
    setcardData3(_data?.data?.rides[0]?.waypoints)
  }

  useEffect(() => {
    getByProduct()
  }, [])

  const redirectuser = data => {
    console.log(data)
    sessionStorage.setItem("userdataid", data)
   setTimeout(() => {
    history.push("/users_details")
   }, 1000);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Shicar" breadcrumbItem="Ride Details" />

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
                      <div
                        className="profile-user-wid"
                      >
                        <Slider {...settings}>
                          <div className="text-center">
                            <img
                              style={{ width: "100%", height: "180px" }}
                              src={imgUrl + cardData?.carFrontImage}
                              alt=""
                              className="img-thumbnail"
                            />
                          </div>
                          <div className="text-center">
                            <img
                              style={{ width: "100%", height: "180px" }}
                              src={imgUrl + cardData?.carFrontImage}
                              alt=""
                              className="img-thumbnail"
                            />
                          </div>
                        </Slider>
                      </div>

                      {/* <h5 className="font-size-15 text-center mt-1">
                        Coins: {form.coins}
                      </h5> */}

                      <div className="mt-4">
                        <h5>Vehicle Details</h5>
                      </div>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Brand</span>
                        </div>
                        <div className="col col-7">
                          <span>: {cardData.name} </span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Modal</span>
                        </div>
                        <div className="col col-7">
                          <span>: {cardData.model}</span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Color</span>
                        </div>
                        <div className="col col-7">
                          <span>: {cardData.colour}</span>
                          <br />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Seats</span>
                        </div>
                        <div className="col col-7">
                          <span>: {cardData.seats}</span>
                          <br />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Status</span>
                        </div>
                        <div className="col col-7">
                          <span
                          // className={
                          //   form.status == "active"
                          //     ? "text-success"
                          //     : "text-danger"
                          // }
                          >
                            : {cardData.status}
                          </span>
                          <br />
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
                      <NavItem className="border border-primary rounded p-1 m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            toggle("1")
                          }}
                        >
                          Booking Details
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded p-1 m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            toggle("2")
                          }}
                        >
                          Published User
                        </NavLink>
                      </NavItem>
                      <NavItem className="border border-primary rounded p-1 m-1">
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            toggle("3")
                          }}
                        >
                          Passengers
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <h6>Booking ID : # {form.bookingNo}</h6>
                      <h6>Date: {form.rideStartDate}</h6>
                      <h6>Time : {form.rideStartTime}</h6>
                      <h6>Price : ₹ {form.fare} /-</h6>
                      <h6>
                        Ride Status :{" "}
                        <b
                          className={
                            form.rideStatus == "completed"
                              ? "text-success"
                              : form.rideStatus == "cancelled"
                              ? "text-danger"
                              : "text-warning"
                          }
                        >
                          {" "}
                          {form.rideStatus}
                        </b>{" "}
                      </h6>
                      {form.rideStatus == "cancelled"?(
                      <h6>Reason : {form.cancellationReason}</h6>
                      ):""}

                      <Row className="mt-2">
                        <Col md="6" className="mt-3">
                          <h6>
                            <b>Pick Up :-</b>
                          </h6>
                          <p>
                            <b>Location</b>:{" "}
                            <a
                              href={`https://www.google.com/maps?q=${form?.pickupLocation?.coordinates[0]},${form?.pickupLocation?.coordinates[1]}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {form?.pickupLocation?.address}
                            </a>
                          </p>
                        </Col>
                        <Col md="6" className="mt-3">
                          <h6>
                            <b>Drop Off :-</b>
                          </h6>
                          <p>
                            <b>Location</b>:{" "}
                            <a
                              href={`https://www.google.com/maps?q=${form?.dropoffLocation?.coordinates[0]},${form?.dropoffLocation?.coordinates[1]}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {form?.dropoffLocation?.address}
                            </a>
                          </p>
                        </Col>
                      </Row>
                      <div>
                        <h6>
                          <b>Stop over cities :-</b>
                        </h6>
                        {cardData3.map((data, index) => (
                         <p key={index}>
                         <b>Location</b>:{" "}
                         <a
                           href={`https://www.google.com/maps?q=${data?.coordinates[0]},${data?.coordinates[1]}`}
                           target="_blank"
                           rel="noreferrer"
                         >
                           {data?.address}
                         </a>
                       </p>
                        ))}
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Name</th>
                              <th>Mobile Number</th>
                              <th>Image</th>
                              <th>Gender</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>{cardData1.name}</td>
                              <td>{cardData1.phone}</td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "70px" }}
                                  src={imgUrl + cardData1.profilePic}
                                />
                              </td>
                              <td>{cardData1.gender}</td>
                              <td>{cardData1.status}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    redirectuser(cardData1._id)
                                  }}
                                  outline
                                  color="warning"
                                >
                                  <i className="bx bx-show"></i>
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead>
                            <tr>
                              <th>Sl No</th>
                              <th>Name</th>
                              <th>Mobile Number</th>
                              <th>Image</th>
                              <th>Gender</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cardData2.map((data, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.phone}</td>
                                <td>
                                  <img
                                    style={{ width: "100px", height: "70px" }}
                                    src={imgUrl + data.profilePic}
                                  />
                                </td>
                                <td>{data.gender}</td>
                                <td>{data.status}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      redirectuser(data._id)
                                    }}
                                    outline
                                    color="warning"
                                  >
                                    <i className="bx bx-show"></i>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
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
          size="sm"
          autoFocus={true}
          centered
          data-toggle="modal"
          toggle={() => {
            setmodal(!modal)
          }}
        >
          <div>
            <ModalHeader
              //   className="border-bottom-0"
              toggle={() => {
                setmodal(!modal)
              }}
            >
              <h5>Add</h5>
            </ModalHeader>
          </div>
          <div className="modal-body">
            <form>
              <div>
                <Label>
                  Date <span className="text-danger">*</span>
                </Label>
                <Input required type="date" placeholder="Enter Date" />
              </div>
              <div className="mt-3">
                <Label>
                  Time <span className="text-danger">*</span>
                </Label>
                <Input required type="time" placeholder="Enter Time" />
              </div>
              <div className="mt-3">
                <Label>
                  Description <span className="text-danger">*</span>
                </Label>
                <textarea
                  required
                  className="form-control"
                  type="text"
                  placeholder="Enter Description"
                />
              </div>
              <div className="text-end mt-3">
                <Button type="submit" color="success" outline>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Companyproductview)
