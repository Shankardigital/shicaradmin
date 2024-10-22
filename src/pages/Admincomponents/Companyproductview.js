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
  const [cardData, setcardData] = useState([])
  const [cardData1, setcardData1] = useState([])
  console.log(cardData)
  const getByProduct = async () => {
    const bodydata = {
      id: sessionStorage.getItem("companyproductid"),
    }
    const resonse = await addData(
      "companyproduct/getcompanyproductbyid",
      bodydata
    )
    var _data = resonse
    setform(_data?.data?.product[0])
    setcardData(
      _data?.data?.product[0]?.unitsAndQrArray.filter(
        data => data.isUsed == false
      )
    )
    setcardData1(
      _data?.data?.product[0]?.unitsAndQrArray.filter(
        data => data.isUsed == true
      )
    )
  }

  useEffect(() => {
    getByProduct()
  }, [])

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

  const [listPerPage] = useState(8)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = cardData.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(cardData.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const [listPerPage1] = useState(8)
  const [pageNumber1, setPageNumber1] = useState(0)

  const pagesVisited1 = pageNumber1 * listPerPage1
  const lists1 = cardData1.slice(pagesVisited1, pagesVisited1 + listPerPage1)
  const pageCount1 = Math.ceil(cardData1.length / listPerPage1)
  const changePage1 = ({ selected }) => {
    setPageNumber1(selected)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb
            title="Shicar"
            breadcrumbItem="Company Product Details"
          />

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
                            src={imgUrl + form.image}
                            // src={imgUrl + form.profilePic}
                            alt=""
                            className="img-thumbnail"
                          />
                        </div>
                      </div>
                      <h5 className="font-size-15 text-center mt-1">
                        # {form.name}
                      </h5>
                      <h5 className="font-size-15 text-center mt-1">
                        Coins: {form.coins}
                      </h5>

                      <div className="mt-3">
                        <h5>Details</h5>
                      </div>

                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Product Name</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.name}</span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Category</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.categoryName}</span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Coins</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.coins}</span>
                          <br />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <div className="col col-5">
                          <span className="">Units</span>
                        </div>
                        <div className="col col-7">
                          <span>: {form.units}</span>
                          <br />
                        </div>
                      </Row>
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
                          Valid Codes
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
                          Used Codes
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab} className="p-3 text-muted">
                    <TabPane tabId="1">
                      <div>
                        {lists.length == 0 ? (
                          <h5 className="text-center">No Data...</h5>
                        ) : (
                          <>
                            <Row>
                              {lists.map((card, index) => (
                                <Col md="3" key={index}>
                                  <Card style={{ borderRadius: "30px 10px" }}>
                                    <div className="text-center mb-2">
                                      <img
                                        style={{ width: "100%" }}
                                        src={card.qrCode}
                                        alt={`QR code ${index}`}
                                      />
                                      <h5
                                        style={{ fontSize: "12px" }}
                                        className="mt-2 mb-0"
                                      >
                                        # {card.uniqueId}
                                      </h5>
                                      <span className="text-success">
                                        Valid
                                      </span>
                                    </div>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                            <div className="mt-3" style={{ float: "right" }}>
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
                          </>
                        )}
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div>
                        {lists1.length == 0 ? (
                          <h5 className="text-center">No Data...</h5>
                        ) : (
                          <>
                            <Row>
                              {lists1.map((card, index) => (
                                <Col md="3" key={index}>
                                  <Card style={{ borderRadius: "30px 10px" }}>
                                    <div className="text-center mb-2">
                                      <img
                                        style={{ width: "100%" }}
                                        src={card.qrCode}
                                        alt={`QR code ${index}`}
                                      />
                                      <h5
                                        style={{ fontSize: "12px" }}
                                        className="mt-2 mb-0"
                                      >
                                        # {card.uniqueId}
                                      </h5>
                                      <span className="text-danger">
                                        Used
                                      </span>
                                    </div>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                            <div className="mt-3" style={{ float: "right" }}>
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
                          </>
                        )}
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
