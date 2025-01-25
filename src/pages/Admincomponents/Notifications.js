import React, { useState, useEffect } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
} from "reactstrap"
// import img1 from "../assets/images/latest/car1.jpg"

//Import Breadcrumb
// import Breadcrumbs from "../components/Common/Breadcrumb"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Notifications = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [notifications, setnotifications] = useState([])
  const [form, setform] = useState({
    title: "",
    sendTo: "",
    description: "",
    users: "",
  })
  const [form1, setform1] = useState([])

  function tog_small() {
    setmodal_small(!modal_small)
    removeBodyCss()
  }

  const handleChange = e => {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }
  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  // get all

  const [agents, setAgents] = useState([])

  // get all
  const getAllAgents = async () => {
    const bodydata = {
      userDocumentStatus: "approved",
    }
    const resonse = await addData("users/getallactiveusers", bodydata)
    var _data = resonse
    setAgents(_data?.data?.user)
  }

  const getNotifications = async () => {
    const resonse = await addData("notification/getallnotifications")
    var _data = resonse
    setnotifications(_data.data.notifications)
  }

  useEffect(() => {
    getNotifications()
    getAllAgents()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = notifications.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(notifications.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Add function

  const handleSubmit = async e => {
    e.preventDefault()
    const bodydata = {
      title: form.title,
      sendTo: form.sendTo,
      description: form.description,
      users: form.sendTo == "User" ? [form.users] : [],
    }
    try {
      const resonse = await addData("notification/addnotification", bodydata)
      var _data = resonse
      console.log(_data)
      setform({ title: "", sendTo: "", description: "", users: "" })
      toast.success(_data.data.message)
      getNotifications()
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

  // search fuctions
  const citiesSearch = async e => {
    const resonse = await addData(
      "notification/getallnotifications?searchQuery=" + e.target.value
    )
    var _data = resonse
    setCities(_data.data.notifications)
  }

  const deletecities = async data => {
    try {
      const resonse = await deletedData(
        "notification/deletenotification/" + data._id,
        {}
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getNotifications()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        //   toast.error("An error occurred. Please try again.")
      }
    }
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      deletecities(data)
    }
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Shicar" breadcrumbItem="Notifications" />

          <Row>
            {Roles?.departementAdd == true || Roles?.accessAll == true ? (
              <Col md={4}>
                <Card>
                  <CardHeader className="bg-white">
                    <CardTitle>Add Notification</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form
                      onSubmit={e => {
                        handleSubmit(e)
                      }}
                    >
                      <div className="mb-3">
                        <Label for="basicpill-firstname-input1">
                          Title <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input1"
                          placeholder="Enter Title"
                          required
                          value={form.title}
                          name="title"
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <Label for="basicpill-firstname-input1">
                          Send To <span className="text-danger">*</span>
                        </Label>
                        <select
                          className="form-select"
                          required
                          value={form.sendTo}
                          name="sendTo"
                          onChange={e => {
                            handleChange(e)
                          }}
                        >
                          <option value="">Select</option>
                          <option value="User">Single User</option>
                          <option value="All">All Users</option>
                        </select>
                      </div>
                      {form.sendTo == "User" ? (
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Users <span className="text-danger">*</span>
                          </Label>
                          <select
                            className="form-select"
                            required
                            value={form.users}
                            name="users"
                            onChange={e => {
                              handleChange(e)
                            }}
                          >
                            <option value="">Select User</option>
                            {agents.map((data, index) => (
                              <option key={index} value={data._id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="mb-3">
                        <Label for="basicpill-firstname-input1">
                          Description <span className="text-danger">*</span>
                        </Label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input1"
                          placeholder="Enter Description"
                          required
                          value={form.description}
                          name="description"
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </div>

                      <div className="mt-4" style={{ float: "right" }}>
                        <Button color="primary" type="submit">
                          Submit <i className="fas fa-check-circle"></i>
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              ""
            )}
            <Col
              md={
                Roles?.departementAdd == true || Roles?.accessAll == true
                  ? 8
                  : 12
              }
            >
              <Card>
                <CardBody>
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <CardTitle>Notifications </CardTitle>
                      </div>
                      <div className="col-md-6">
                        <div style={{ float: "right" }}>
                          <Input
                            type="text"
                            name="search"
                            onChange={citiesSearch}
                            className="form-control"
                            placeholder="Search.."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <Table className="table table-bordered mb-4 mt-3">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Send To</th>
                            <th>Description</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td> {(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.date} </td>
                              <td>{data.title} </td>
                              <td>{data.sendTo} </td>
                              <td>{data.description} </td>

                              <td>
                                {Roles?.departementDelete == true ||
                                Roles?.accessAll == true ? (
                                  <Button
                                    onClick={() => {
                                      manageDelete(data)
                                    }}
                                    style={{ padding: "6px", margin: "3px" }}
                                    color="danger"
                                    outline
                                  >
                                    <i className="bx bx-trash"></i>
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

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
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal
          size="sm"
          isOpen={modal_small}
          toggle={() => {
            tog_small()
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Edit Notification
            </h5>
            <button
              onClick={() => {
                setmodal_small(false)
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={e => {
                handleSubmit1(e)
              }}
            >
              <div className="mb-3">
                <Label for="basicpill-firstname-input1">
                  Department Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Department Name"
                  required
                  name="departmentName"
                  value={form1.departmentName}
                  onChange={e => {
                    handleChange1(e)
                  }}
                />
              </div>

              <div className="mb-3">
                <Label for="basicpill-firstname-input3">
                  Status <span className="text-danger">*</span>
                </Label>
                <select
                  name="isActive"
                  value={form1.isActive}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  className="form-select"
                >
                  <option value="true">Active</option>
                  <option value="false">In Active</option>
                </select>
              </div>

              <div style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default Notifications
