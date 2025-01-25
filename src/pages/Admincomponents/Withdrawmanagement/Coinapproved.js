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
import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"
// import barcode from "../../assets/images/letast/barcode.jpg"
// import Barcode from "react-barcode";
import { format } from "date-fns"
import Flatpickr from "react-flatpickr"
const Coinsrequest = () => {
  const history = useHistory()
  const [agents, setAgents] = useState([])

  // get all
  const getAlldata = async () => {
    const bodydata = {
      transactionStatus: "completed",
    }
    const resonse = await addData("wallet/getAllWallets", bodydata)
    var _data = resonse
    setAgents(_data?.data?.data)
    setPageNumber(0)
    setfilter(false)
  }

  // search fuctions
  const Searchfunction = async e => {
    const bodydata = {
      transactionStatus: "completed",
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
      transactionStatus: "completed",
      startDate: dates,
      endDate: dates1,
    }
    const resonse = await addData("wallet/getAllWallets", bodydata)
    var _data = resonse
    setAgents(_data?.data?.data)
    setPageNumber(0)
    popup()
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Shicar" breadcrumbItem="Approved Withdraws" />
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
                          <th>Transaction Id</th>
                          <th>Status</th>
                          {/* <th>Action</th> */}
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
                                <td>{data.transactionId}</td>
                                <td className="text-success">{data.transactionStatus}</td>
                                {/* <td>
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
                                      className="bx bx-edit"
                                    ></i>{" "}
                                    Update
                                  </Button>
                                </td> */}
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
    
      </div>
    </React.Fragment>
  )
}

export default Coinsrequest
