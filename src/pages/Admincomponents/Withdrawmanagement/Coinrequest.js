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
import Breadcrumbs from "../../../components/Common/Breadcrumb"
// import { URL } from "../../Apiurls"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import ReactPaginate from "react-paginate"
import toast, { Toaster } from "react-hot-toast"
import { addData, updateData } from "Servicescalls"
import { imgUrl } from "Baseurls"
// import barcode from "../../assets/images/letast/barcode.jpg"
// import Barcode from "react-barcode";
import { format } from "date-fns"
import Flatpickr from "react-flatpickr"
const Coinsrequest = () => {
  const history = useHistory()
  const [agents, setAgents] = useState([])
  const [modal, setmodal] = useState(false)
  const [modal1, setmodal1] = useState(false)

  const [form1, setform1] = useState([])
  // get all
  const getAlldata = async () => {
    const bodydata = {
      transactionStatus: "pending",
    }
    const resonse = await addData("wallet/getAllWallets", bodydata)
    var _data = resonse
    setAgents(_data?.data?.data)
    setPageNumber(0)
    setform({ startDate: "", endDate: "" })
    setfilter(false)
  }

  // search fuctions
  const Searchfunction = async e => {
    const bodydata = {
      transactionStatus: "pending",
    }
    const resonse = await addData(
      "wallet/getAllWallets?searchQuery=" + e.target.value,
      bodydata
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

  const handleChange1 = e => {
    const myData = { ...form1 }
    myData[e.target.name] = e.target.value
    setform1(myData)
  }

  const [dates, setDates] = useState("")
  const [dates1, setDates1] = useState("")

  const handleDateChange = async NewDate => {
    if (NewDate.length === 0) {
    } else {
      const date1 = format(new Date(NewDate[0]), "yyyy-MM-dd")
      const date2 = format(new Date(NewDate[1]), "yyyy-MM-dd")
      // const newDates = [date1, date2];
      setDates(date1)
      setDates1(date2)
    }
  }



  const filterSubmit = async e => {
    e.preventDefault()
    const bodydata = {
      transactionStatus: "pending",
 startDate: dates,
      endDate: dates1,
    }
    const resonse = await addData("wallet/getAllWallets", bodydata)
    var _data = resonse
    setPageNumber(0)
    setAgents(_data?.data?.data)
    popup()
  }

  const modalopen = data => {
    setform1(data)
    setmodal(true)
  }
  const modalopen1 = data => {
    setform1(data)
    setmodal1(true)
  }

  const handleSubmitform = async e => {
    e.preventDefault()
    const bodydata = {
      walletRequestId: form1._id,
      transactionId: form1.transactionId || "",
    }
    try {
      const resonse = await updateData("wallet/walletApproval", bodydata)
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
  const handleSubmitform1 = async e => {
    e.preventDefault()
    const bodydata = {
      walletRequestId: form1._id,
      reason: form1.reason || "",
    }
    try {
      const resonse = await updateData("wallet/walletRejection", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal1(false)
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
          <Breadcrumbs title="Shicar" breadcrumbItem="Withdraw Requests" />
          {/* {permissioins.customerView === true || roles === "admin" ? ( */}

          <Row>
            <Col>
              {filter ? (
                <Card>
                  <CardBody>
                    <Form
                      onSubmit={e => {
                        filterSubmit(e)
                      }}
                    >
                      <Row>
                      <Col md="3">
                          <Label>Date</Label>
                          <Flatpickr
                            placeholder="Select date"
                            className="form-control"
                            name="date"
                            onChange={e => {
                              handleDateChange(e)
                            }}
                            options={{
                              mode: "range",
                              dateFormat: "d M, Y",
                              maxDate: new Date(),
                            }}
                          />
                        </Col>
                        {/* <Col md="3">
                          <Label>To Date</Label>
                          <Input
                            type="date"
                            name="endDate"
                            onChange={e => {
                              handleChange(e)
                            }}
                            value={form.endDate}
                            max={new Date().toISOString().split("T")[0]}
                          />
                        </Col> */}
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
              )}

              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Button
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
                      </Button>
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
                          <th>Name</th>
                          <th>Mobile No</th>
                          {/* <th>Password</th>
                          <th>Designation</th> */}
                          {/* <th>Coins</th> */}
                          <th>Amount</th>
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
                                  {data.date} ({data.time})
                                </td>
                                <td>{data.userName}</td>
                                <td>{data.phone}</td>

                                {/* <td>{data.points}</td> */}
                                <td>₹ {data.amount}</td>
                                <td className="text-warning">
                                  {data.transactionStatus}
                                </td>
                                <td style={{width:"200px"}}>
                                  <Button
                                    onClick={() => {
                                      modalopen(data)
                                    }}
                                    size="sm"
                                    className="m-1"
                                    outline
                                    color="success"
                                  >
                                    <i
                                      style={{ fontSize: " 14px" }}
                                      className="bx bx-check-circle"
                                    ></i>{" "}
                                    Approve
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      modalopen1(data)
                                    }}
                                    size="sm"
                                    className="m-1"
                                    outline
                                    color="danger"
                                  >
                                    <i
                                      style={{ fontSize: " 14px" }}
                                      className="bx bx-x-circle"
                                    ></i>{" "}
                                    Reject
                                  </Button>
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
          <div className="modal-header p-0">
            {/* <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Update Status
            </h5> */}
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
              <div className="text-center mt-4">
                <i className="bx bx-error-alt text-warning" style={{fontSize:"70px"}} />
                <h5>Do you want to approval this withdraw request</h5>
              </div>

              <div className="mb-3 mt-4">
                <Label for="basicpill-firstname-input1">
                  Transactions Id <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Transactions Id"
                  required
                  name="transactionId"
                  value={form1.transactionId}
                  onChange={e => {
                    handleChange1(e)
                  }}
                />
              </div>

              <div className="text-center">
                <Button className="m-1 w-25" outline color="success" type="submit">
                  Yes <i className="fas fa-check-circle"></i>
                </Button>
                <Button
                  onClick={() => {
                    setmodal(!modal)
                  }}
                  color="danger"
                  outline
                  type="button"
                  className="w-25"
                >
                  No <i className="fas fa-times-circle"></i>
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
          <div className="modal-header p-0">
            {/* <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Update Status
            </h5> */}
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
            <Form
              onSubmit={e => {
                handleSubmitform1(e)
              }}
            >
              <div className="text-center mt-4">
                <i className="bx bx-error-alt text-warning" style={{fontSize:"70px"}} />
                <h5>Do you want to reject this withdraw request</h5>
              </div>

              <div className="mb-3 mt-4">
                <Label for="basicpill-firstname-input1">
                Reason <span className="text-danger">*</span>
                </Label>
                <textarea
                  type="text"
                  className="form-control"
                  id="basicpill-firstname-input1"
                  placeholder="Enter Reason"
                  required
                  name="reason"
                  value={form1.reason}
                  onChange={e => {
                    handleChange1(e)
                  }}
                />
              </div>

              <div className="text-center">
                <Button className="m-1 w-25" outline color="success" type="submit">
                  Yes <i className="fas fa-check-circle"></i>
                </Button>
                <Button
                  onClick={() => {
                    setmodal1(!modal1)
                  }}
                  color="danger"
                  outline
                  type="button"
                  className="w-25"
                >
                  No <i className="fas fa-times-circle"></i>
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  )
}

export default Coinsrequest
