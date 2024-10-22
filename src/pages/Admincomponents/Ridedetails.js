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

const Companyproductview = () => {
  const history = useHistory()
  //meta title
  //  document.title="Profile | CA Marketing - React Admin & Dashboard Template";

  const [modal, setmodal] = useState(false)
  const [form, setform] = useState([])

  const [activeTab, setactiveTab] = useState("1")
  const toggle = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }
  // const [activeTab1, setactiveTab1] = useState("1")
  // const toggle1 = tab => {
  //   if (activeTab1 !== tab) {
  //     setactiveTab1(tab)
  //   }
  // }

  // get all
  // const [cardData, setcardData] = useState([])
  // const [cardData1, setcardData1] = useState([])
  // console.log(cardData)
  // const getByProduct = async () => {
  //   const bodydata = {
  //     id: sessionStorage.getItem("userdataid"),
  //   }
  //   const resonse = await addData(
  //     "companyproduct/getcompanyproductbyid",
  //     bodydata
  //   )
  //   var _data = resonse
  //   setform(_data?.data?.product[0])
  //   setcardData(
  //     _data?.data?.product[0]?.unitsAndQrArray.filter(
  //       data => data.isUsed == false
  //     )
  //   )
  //   setcardData1(
  //     _data?.data?.product[0]?.unitsAndQrArray.filter(
  //       data => data.isUsed == true
  //     )
  //   )
  // }

  // useEffect(() => {
  //   getByProduct()
  // }, [])

  // const cardData = Array.from({ length: 20 }, (_, index) => ({
  //   id: `# PI2157${49 + index}`,
  //   status: "Valid",
  //   imgSrc:
  //     "https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png",
  // }))
  // const cardData1 = Array.from({ length: 20 }, (_, index) => ({
  //   id: `# PI2157${49 + index}`,
  //   status: "Used",
  //   imgSrc:
  //     "https://cdn.pixabay.com/photo/2013/07/12/14/45/qr-code-148732_1280.png",
  // }))

  // const [listPerPage] = useState(8)
  // const [pageNumber, setPageNumber] = useState(0)

  // const pagesVisited = pageNumber * listPerPage
  // const lists = cardData.slice(pagesVisited, pagesVisited + listPerPage)
  // const pageCount = Math.ceil(cardData.length / listPerPage)
  // const changePage = ({ selected }) => {
  //   setPageNumber(selected)
  // }
  // const [listPerPage1] = useState(8)
  // const [pageNumber1, setPageNumber1] = useState(0)

  // const pagesVisited1 = pageNumber1 * listPerPage1
  // const lists1 = cardData1.slice(pagesVisited1, pagesVisited1 + listPerPage1)
  // const pageCount1 = Math.ceil(cardData1.length / listPerPage1)
  // const changePage1 = ({ selected }) => {
  //   setPageNumber1(selected)
  // }

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
                      <div className="profile-user-wid">
                        <div className="text-center">
                          <img
                            style={{ width: "200px", width: "200px" }}
                            src="https://imgd.aeplcdn.com/664x374/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80"
                            // src={imgUrl + form.profilePic}
                            alt=""
                            className="img-thumbnail"
                          />
                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        # Tata Curvv
                      </h5>
                      {/* <h5 className="font-size-15 text-center mt-1">
                        Coins: {form.coins}
                      </h5> */}

                      <div className="mt-3">
                        <h5>Vehicle Details</h5>
                      </div>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Brand</span>
                        </div>
                        <div className="col col-7">
                          <span>: Tata </span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Modal</span>
                        </div>
                        <div className="col col-7">
                          <span>: Tata Curvv</span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Color</span>
                        </div>
                        <div className="col col-7">
                          <span>: Gray</span>
                          <br />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Seats</span>
                        </div>
                        <div className="col col-7">
                          <span>: 5</span>
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
                            : Active
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
                          Driver Details
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
                          User Details
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                        <h6>Booking ID : # SC32465</h6>
                        <h6>Date: 08/10/2024</h6>
                        <h6>Time : 10:30 AM</h6>
                        <h6>Price : ₹ 5000 /-</h6>
                      <Row className="mt-2">
                        <Col md="6" className="mt-3">
                          <h6>
                            <b>Pick Up :-</b>
                          </h6>
                          <p>
                            <b>Location</b>: Kukatpally Housing Board Colony,
                            Hyderabad
                          </p>
                        </Col>
                        <Col md="6" className="mt-3">
                          <h6>
                            <b>Drop Off :-</b>
                          </h6>
                          <p>
                            <b>Location</b>: Roadway in Visakhapatnam, Andhra
                            Pradesh
                          </p>
                        </Col>
                      </Row>
                      <div>
                      <h6>
                            <b>Stop over cities :-</b>
                          </h6>
                          <p>
                            <b>Location</b>: Kukatpally Housing Board Colony,
                            Hyderabad
                          </p>
                          <p>
                            <b>Location</b>: Kukatpally Housing Board Colony,
                            Hyderabad
                          </p>

                          <p>
                            <b>Location</b>: Kukatpally Housing Board Colony,
                            Hyderabad
                          </p>

                          <p>
                            <b>Location</b>: Kukatpally Housing Board Colony,
                            Hyderabad
                          </p>
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
                              <th>City</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {lists.map((data, key) => ( */}
                            <tr>
                              <td>1</td>
                              <td>Senkar</td>
                              <td>6954645565</td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "70px" }}
                                  src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                                />
                              </td>
                              <td>Hyderabad</td>
                              <td>Active</td>
                              <td>
                                <Link to="/users_details">
                                  <Button outline color="warning">
                                    <i className="bx bx-show"></i>
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </Table>
                        <Col sm="12">
                          {/* <div
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
                          </div> */}
                        </Col>
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
                              <th>City</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {lists.map((data, key) => ( */}
                            <tr>
                              <td>1</td>
                              <td>Shiva</td>
                              <td>9654645565</td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "70px" }}
                                  src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                                />
                              </td>
                              <td>Hyderabad</td>
                              <td>Active</td>
                              <td>
                                <Link to="/users_details">
                                  <Button outline color="warning">
                                    <i className="bx bx-show"></i>
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Mani</td>
                              <td>8654645565</td>
                              <td>
                                <img
                                  style={{ width: "100px", height: "70px" }}
                                  src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png"
                                />
                              </td>
                              <td>Hyderabad</td>
                              <td>Active</td>
                              <td>
                                <Link to="/users_details">
                                  <Button outline color="warning">
                                    <i className="bx bx-show"></i>
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                            {/* ))} */}
                          </tbody>
                        </Table>
                        <Col sm="12">
                          {/* <div
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
                          </div> */}
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
