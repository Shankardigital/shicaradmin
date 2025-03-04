import React, { useEffect, useState } from "react"

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Button,
  Table,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import { URL } from "../../Apiurls"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
import toast, { Toaster } from "react-hot-toast"
import { addData, updateData } from "Servicescalls"
import { imgUrl } from "Baseurls"
// import barcode from "../../assets/images/letast/barcode.jpg"
// import Barcode from "react-barcode";

const Ticketrise = () => {
  const history = useHistory()
  const [agents, setAgents] = useState([
    {
      date: "18-10-2024",
      time: "10:00 AM",
      userName: "Shanker",
      userMobileNumber: "4654563354",
      amount: "100",
      status: "pending",
    },
  ])
  const [modal, setmodal] = useState(false)
  const [modal1, setmodal1] = useState(false)

  // get all
  const getAlldata = async () => {
    const resonse = await addData("support/getallusersupports")
    var _data = resonse
    setAgents(_data?.data?.data)
  }

  // search fuctions
  const Searchfunction = async e => {
    const resonse = await addData(
      "support/getallusersupports?searchQuery=" + e.target.value
    )
    var _data = resonse
    setAgents(_data?.data?.data)
  }

  useEffect(() => {
    getAlldata()
  }, [])

  const [listPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = agents.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(agents.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const [filter, setfilter] = useState(false)

  const popup = () => {
    setfilter(!filter)
  }

  const [form, setform] = useState({ fromDate: "", toDate: "" })
  const [form1, setform1] = useState([])
  const [form2, setform2] = useState([])

  const handleChange = e => {
    const myData = { ...form }
    myData[e.target.name] = e.target.value
    setform(myData)
  }
  const handleChange1 = e => {
    const myData = { ...form1 }
    myData[e.target.name] = e.target.value
    setform1(myData)
  }


  const modalopen = data => {
    setform1(data)
    setmodal(true)
  }
  const modalopen1 = data => {
    setform2(data)
    setmodal1(true)
  }

  const handleSubmitform = async e => {
    e.preventDefault()
    const bodydata = {
      status: form1.status,
      reply: form1.reply || "",
    }
    try {
      const resonse = await updateData(
        "support/updateusersupport/" + form1._id,
        bodydata
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal(false)
      getAlldata()
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
      <div className="page-content">    
        <div className="container-fluid">
          <Breadcrumbs title="Shicar" breadcrumbItem="Ticketrise" />
          {/* {permissioins.customerView === true || roles === "admin" ? ( */}

          <Row>
            <Col>
              {/* {filter ? (
                <Card>
                  <CardBody>
                    <Form
                      onSubmit={e => {
                        filterSubmit(e)
                      }}
                    >
                      <Row>
                        <Col md="3">
                          <Label>From Date</Label>
                          <Input
                            type="date"
                            name="fromDate"
                            onChange={e => {
                              handleChange(e)
                            }}
                            value={form.fromDate}
                            max={new Date().toISOString().split("T")[0]}
                          />
                        </Col>
                        <Col md="3">
                          <Label>To Date</Label>
                          <Input
                            type="date"
                            name="toDate"
                            onChange={e => {
                              handleChange(e)
                            }}
                            value={form.toDate}
                            max={new Date().toISOString().split("T")[0]}
                          />
                        </Col>
                        <Col md="3" className="mt-3 pt-1">
                          <Button type="submit" color="success" className="m-2">
                            Submit <i className="bx bx-check-circle" />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              popup()
                            }}
                            color="danger"
                            className="m-2"
                          >
                            {" "}
                            Cancel <i className="bx bx-x-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              ) : (
                ""
              )}    */}
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      {/* <Button
                        onClick={() => {
                          popup()
                        }}
                        color="info"
                        className="m-2"
                      >
                        Filter <i className="bx bx-filter-alt"></i>
                      </Button>
                      <Button
                        onClick={() => {
                          getAlldata()
                        }}
                        color="success"
                        className="m-2"
                      >
                        Reset <i className="bx bx-reset"></i>
                      </Button> */}
                    </Col>
                    <Col>
                      <div className="mt-2" style={{ float: "right" }}>
                        <Input
                          name="search"
                          // value={form.search}
                          onChange={Searchfunction}
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="table-rep-plugin mt-4">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Date & Time</th>
                          <th>Ticket Id</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Reply</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.length == 0 ? (
                          <tr>
                            <th colSpan="8">
                              <h5 className="text-center">No Data...</h5>
                            </th>
                          </tr>
                        ) : (
                          <>
                            {lists.map((data, key) => (
                              <tr key={key}>
                                <td> {(pageNumber - 1) * 10 + key + 11}</td>
                                <td>
                                  {data.date}, {data.time}
                                </td>
                                <td># {data.ticketId}</td>
                                <td>{data.userName}</td>
                                <td>
                                 {data.description}
                                </td>
                                <td>
                                  {data.status == "solved"?(
                                 <Button 
                                 onClick={() => {
                                  modalopen1(data)
                                 }}
                                 size="sm" outline color="info">View</Button>
                                  ):""}
                                </td>
                                <td className={data.status == "solved"?"text-success":"text-warning"}>{data.status}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      modalopen(data)
                                    }}
                                    disabled={data.status == "solved"}
                                    size="sm"
                                    className="m-1"
                                    outline
                                    color="success"
                                  >
                                    <i
                                      style={{ fontSize: " 14px" }}
                                      className="bx bx-edit"
                                    ></i>{" "}
                                    Update
                                  </Button>
                                 {/* <Link to="/chat"> <Button
                                  
                                    size="sm"
                                    className="m-1"
                                    outline
                                    color="warning"
                                  >
                                    <i
                                      style={{ fontSize: " 14px" }}
                                      className="bx bx-chat"
                                    ></i>{" "}
                                    Chat
                                  </Button></Link> */}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
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
                </CardBody>
              </Card>
            </Col>
          </Row>

        </div>
        <Toaster />
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
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Update Status
            </h5>
            <button
              onClick={() => {
                setmodal(!modal)
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
                handleSubmitform(e)
              }}
            >
              <div className="mb-3">
                <Label for="basicpill-firstname-input3">
                  Status <span className="text-danger">*</span>
                </Label>
                <select
                  name="status"
                  value={form1.status}
                  onChange={e => {
                    handleChange1(e)
                  }}
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="solved">Solved</option>
                </select>
              </div>
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
                    name="reply"
                    value={form1.reply}
                    onChange={e => {
                      handleChange1(e)
                    }}
                  />
              </div>
              <div style={{ float: "right" }}>
                <Button className="m-1" color="success" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
                <Button
                  onClick={() => {
                    setmodal(!modal)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
              </div>

            </Form>
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
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="mySmallModalLabel">
             Info
            </h5>
            <button
              onClick={() => {
                setmodal1(!modal1)
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
          <div>
          <b>User Message: </b>
          <p>{form2.description}</p>
          </div>
          <div>
          <b>Given Reply: </b>
          <p>{form2.reply}</p>
          </div>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Ticketrise
