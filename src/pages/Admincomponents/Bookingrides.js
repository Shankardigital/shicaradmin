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
import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"
// import barcode from "../../assets/images/letast/barcode.jpg"
// import Barcode from "react-barcode";

const Users = () => {
  const history = useHistory()
  const [agents, setAgents] = useState([])

  // get all
  const getAllAgents = async () => {
    const bodydata = {
      status: "completed",
    }
    const resonse = await addData("rides/getBookingsByStatus", bodydata)
    var _data = resonse
    setAgents(_data?.data?.rides)
  }

  // search fuctions
  const agentSearch = async e => {
    const bodydata = {
      status: "completed",
    }
    const resonse = await addData(
      "rides/getBookingsByStatus?searchQuery=" + e.target.value,
      bodydata
    )
    var _data = resonse
    setAgents(_data?.data?.rides)
  }

  useEffect(() => {
    getAllAgents()
  }, [])

  const [listPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = agents.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(agents.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const redirectBooking = data => {
    sessionStorage.setItem("rideid", data.rideId)
    history.push("/ridedetails")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Shicar" breadcrumbItem="Booked Rides" />
          {/* {permissioins.customerView === true || roles === "admin" ? ( */}

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row>
                    {/* <Col>
                      <Button
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="primary"
                      >
                        New User <i className="bx bx-user-plus"></i>
                      </Button>
                    </Col> */}
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          // value={form.search}
                          onChange={agentSearch}
                          type="search"
                          placeholder="Search..."
                        />
                      </div>
                    </Col>
                  </Row>

                  <div className="table-rep-plugin table-responsive mt-4">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th style={{width:'150px'}}>Date & Time</th>
                          <th>Pick Up</th>
                          <th>Drop Off</th>
                          <th>Published User</th>
                          <th>Mobile</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.length == 0 ? (
                          <tr>
                            <th colSpan="9">
                              <h5 className="text-center">No Data...</h5>
                            </th>
                          </tr>
                        ) : (
                          <>
                            {lists.map((data, key) => (
                              <tr key={key} >
                                <td>{(pageNumber - 1) * 10 + key + 11}</td>
                                <td>{data?.rideDetails?.rideStartDate}<br/>{data?.rideDetails?.rideStartTime}</td>
                                <td>{data?.rideDetails?.pickupLocation?.address}</td>
                                <td>{data?.rideDetails?.dropoffLocation?.address}</td>
                                <td>{data?.passengers?.name}</td>
                                <td>{data?.passengers?.phone}</td>
                                <td>{data?.passengers?.gender}</td>

                                <td className="text-warning">{data.rideStatus}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    className="m-1"
                                    outline
                                    color="warning"
                                    onClick={() => {
                                      redirectBooking(data)
                                    }}
                                  >
                                    <i
                                      style={{ fontSize: " 14px" }}
                                      className="fa fa-eye"
                                    ></i>
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
      </div>
    </React.Fragment>
  )
}

export default Users
