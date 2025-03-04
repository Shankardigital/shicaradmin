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
  // const [agents, setAgents] = useState([{
  //   name:"shanker",
  //   profilePic:"https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png",
  //   email:"shanker@gmail.com",
  //   mobileNumber:564866533,
  //   status:"active"
  // }])

  // get all
  const getAllAgents = async () => {
    const bodydata ={
      userDocumentStatus: "rejected"
    }
    const resonse = await addData("users/getallactiveusers", bodydata)
    var _data = resonse
    setAgents(_data?.data?.user)
  }

  // search fuctions
  const agentSearch = async e => {
    const bodydata ={
      userDocumentStatus: "rejected"
    }
    const resonse = await addData("users/getallactiveusers?searchQuery=" + e.target.value, bodydata)
    var _data = resonse
    setAgents(_data?.data?.user)
    setPageNumber(0)
  }

  const getByfunction = (data) => {
    sessionStorage.setItem("userdataid", data._id)
    history.push("/users_details")
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
          <Breadcrumbs title="Shicar" breadcrumbItem="Rejected Users" />
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
                          <th>Data & Time</th>
                          <th>User Id</th>
                          <th>Name</th>
                          <th>Image</th>
                          {/* <th>Email</th> */}
                          <th>Mobile No</th>
                           <th>Wallet</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.length == 0?(
                          <tr>
                            <th colSpan="8"><h5 className="text-center">No Data...</h5></th>
                          </tr>
                        ):(<>
                         {lists.map((data, key) => ( 
                          <tr key={key} >
                            <td> {(pageNumber - 1) * 10 + key + 11}</td>
                            <td>{data.logCreatedDate.slice(0, 10)}, {data.logCreatedDate.slice(12, 16)}</td>
                            <td>{data.userUniqueId}</td>
                            <td>{data.name}</td>
                            <td>
                              <img src={imgUrl + data.profilePic} style={{height:"75px", width:"100px"}} />
                            </td>
                            {/* <td>{data.email}</td> */}
                            <td>{data.phone}</td>
                           <td>₹ {data.wallet}</td> 
                            <td className="text-danger"><b>Rejected</b></td>

                       
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
                                  onClick={()=>{getByfunction(data)}}
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
                         </>)}
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
 