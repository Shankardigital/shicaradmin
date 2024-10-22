import React, { useState, useEffect } from "react"
import { CardBody, Container, Row, Col, Card, Button, Table } from "reactstrap"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
import { addData, deletedData } from "Servicescalls"

function City() {
  const [Actin, setActin] = useState([])
  const history = useHistory()

  const [listPerPage] = useState(20)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    GetRoles()
  }, [])

  const GetRoles = async () => {
    const resonse = await addData("role/getAll")
    var _data = resonse
    setActin(_data.data.roles)
  }

  const pagesVisited = pageNumber * listPerPage
  const lists = Actin.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(Actin.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to InActive?")
    if (confirmBox === true) {
      Delete(data)
    }
  }

  const Delete = async data => {
    try {
      const resonse = await deletedData("role/deleterole/" + data._id, {})
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      GetRoles()
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

  const RoleId = data => {
    sessionStorage.setItem("Roleids", data._id)
    history.push("/editroles")
  }
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Shicar" breadcrumbItem="Roles" />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <Col>
                    {Roles?.rolesAndPermissionAdd == true ||
                    Roles?.accessAll == true ? (
                    <>
                      <Link to="/addrole">
                        <Button color="primary">
                          Add Role <i className="bx bx-plus-circle"></i>
                        </Button>
                      </Link>
                    </>
                    ) : (
                      ""
                    )} 
                  </Col>
                  <div>
                    <div className="table-responsive">
                      <Table className="table table-bordered mb-2 mt-3">
                        <thead>
                          <tr className="text-center">
                            <th>S No</th>
                            <th>Role Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key} className="text-center">
                              <td>{(pageNumber - 1) * 20 + key + 21}</td>
                              <td>{data.roleName}</td>
                              <td>
                                {Roles?.rolesAndPermissionEdit == true ||
                                Roles?.accessAll == true ? (
                                <>
                                  <Button
                                    onClick={() => {
                                      RoleId(data)
                                    }}
                                    className="m-1 btn-sm"
                                    color="success"
                                  >
                                    <div className="d-flex">
                                      <small>
                                        <i className="bx bx-edit m-1"></i>
                                        Edit
                                      </small>
                                    </div>
                                  </Button>
                                </>
                               ) : (
                                  ""
                                )}
                                {Roles?.rolesAndPermissionDelete == true ||
                                Roles?.accessAll == true ? ( 
                                <>
                                  <Button
                                    onClick={() => {
                                      manageDelete(data)
                                    }}
                                    className="m-1 btn-sm"
                                    color="danger"
                                  >
                                    <div className="d-flex">
                                      <small>
                                        <i className="bx bx-trash m-1"></i>
                                        Delete
                                      </small>
                                    </div>
                                  </Button>
                                </>
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
        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default City
