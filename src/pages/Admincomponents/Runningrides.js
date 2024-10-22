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
    const bodydata={
      userStatus:"rejected"
    }
    const resonse = await addData("user/getallusers", bodydata)
    var _data = resonse
    setAgents(_data?.data?.user)
  }

  // search fuctions
  const agentSearch = async e => {
    const bodydata={
      userStatus:"rejected"
    }
    const resonse = await addData("user/getallusers?searchQuery=" + e.target.value, bodydata)
    var _data = resonse
    setAgents(_data?.data?.user)
  }

  const getByfunction = (data) => {
    sessionStorage.setItem("userdataid", data._id)
    history.push("/ridedetails")
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


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Shicar" breadcrumbItem="Running Rides" />
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

                  <div className="table-rep-plugin mt-4">
                    <Table hover bordered responsive>
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Date</th>
                          <th>Pick Up</th>
                          <th>Drop Off</th>
                          <th>Vehicle Name</th>
                          <th>Vehicle No</th>
                          <th>Vehicle Image</th>
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
                              <tr key={key}>
                                <td> {(pageNumber - 1) * 5 + key + 6}</td>
                                <td>04/10/2024</td>
                                <td>Hyderabad</td>
                                <td>Kurnool</td>
                                <td>Tata Curvv</td>
                                <td>TS df9 2105</td>
                                <td>
                                  <img
                                    src="https://imgd.aeplcdn.com/664x374/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80"
                                    style={{ height: "75px", width: "100px" }}
                                  />
                                </td>
                            
                                <td className="text-primary">Running</td>
                                <td>
                                  {/* <Button
                                onClick={() => {
                                  popup()
                                }}
                                size="sm"
                                className="m-1"
                                outline
                                color="success"
                              >
                                <i
                                  style={{ fontSize: " 14px" }}
                                  className="bx bx-edit"
                                ></i>
                              </Button> */}
                                  <Button
                                    size="sm"
                                    className="m-1"
                                    outline
                                    color="warning"
                                    onClick={() => {
                                      getByfunction(data)
                                    }}
                                  >
                                    <i
                                      style={{ fontSize: " 14px" }}
                                      className="fa fa-eye"
                                    ></i>
                                  </Button>
                                  {/* <Button
                                size="sm"
                                className="m-1"
                                outline
                                color="danger"
                                onClick={() => {
                                  popupdel()
                                }}
                              >
                                <i
                                  style={{ fontSize: " 14px" }}
                                  className="fas fa-trash-alt"
                                ></i>
                              </Button> */}
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
