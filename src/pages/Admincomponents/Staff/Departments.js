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
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Department = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [cities, setCities] = useState([])
  const [form, setform] = useState({ departmentName: "" })
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

  const getAllCities = async () => {
    const resonse = await addData("department/getdepartments")
    var _data = resonse
    setCities(_data.data.departments)
  }

  useEffect(() => {
    getAllCities()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = cities.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(cities.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Add function

  const handleSubmit = async e => {
    e.preventDefault()
    const bodydata = {
      departmentName: form.departmentName,
    }
    try {
      const resonse = await addData("department/adddepartment", bodydata)
      var _data = resonse
      console.log(_data)
      setform({ departmentName: "" });
      toast.success(_data.data.message)
      clearForm()
      getAllCities()
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

  // edit function
  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    const bodydata = {
      departmentName: form1.departmentName,
      isActive: form1.isActive,
    }
    try {
      const resonse = await updateData("department/editdepartment/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal_small(false)
      getAllCities()
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
    const resonse = await addData("department/getdepartments?searchQuery=" + e.target.value)
    var _data = resonse
    setCities(_data.data.departments)
  }

  const deletecities = async(data) => {
    try {
        const resonse = await deletedData("department/deletedepartment/"+ data._id, {})
        var _data = resonse
        console.log(_data)
        toast.success(_data.data.message)
        getAllCities()
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

  const clearForm = () => {
    setform({
      departmentName: "",
    })
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Shicar" breadcrumbItem="Department" />

          <Row>
          {Roles?.departementAdd == true || Roles?.accessAll == true ? (
            <Col md={4}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Add Department</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      handleSubmit(e)
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
                        value={form.departmentName}
                        name="departmentName"
                        onChange={(e) => {
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
            <Col  md={Roles?.departementAdd == true || Roles?.accessAll == true? 8 : 12}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Departments </CardTitle>
                </CardHeader>

                <CardBody>
                  <div>
                    <div className="table-responsive">
                      <div style={{ float: "right" }}>
                        <Input
                          type="text"
                          name="search"
                          onChange={citiesSearch}
                          className="form-control"
                          placeholder="Search.."
                        />
                      </div>
                      <Table className="table table-bordered mb-4 mt-5">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th> Name</th>
                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td> {(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.departmentName} </td>
                              <td>{data.isActive == true ?"Active":"Inactive"}</td>
                              <td>
                              {Roles?.departementeEdit == true || Roles?.accessAll == true ? (
                                <Button
                                  onClick={() => {
                                    getpopup(data)
                                  }}
                                  className="mr-2"
                                  style={{ padding: "6px", margin: "3px" }}
                                  color="success"
                                  outline
                                >
                                  <i className="bx bx-edit "></i>
                                </Button>
                                 ) : (
                                  ""
                                )}
                                {Roles?.departementDelete == true || Roles?.accessAll == true ? (
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
              Edit Department
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

export default Department
