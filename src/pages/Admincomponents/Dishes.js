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
// import { URL } from "../../Apiurls";
import axios from "axios"
import { useHistory } from "react-router-dom"
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { getAllData, addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Dishes = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [banner, setbanner] = useState([])
  const [form, setform] = useState({ name: "", price: "", rating: "" })
  const [form1, setform1] = useState([])
  console.log(form1)
  const [form2, setform2] = useState([])
  const [Files, setFiles] = useState({ image: "" })
  const [Files1, setFiles1] = useState({ image: "" })

  const history = useHistory()

  const changeHandler = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles(e.target.files)
    } else {
      e.target.value = null
      toast.error("Please select a valid image file (jpg, jpeg, or png)")
    }
  }
  const changeHandler1 = e => {
    const file = e.target.files
    var ext = file[0].name.split(".").pop()
    var type = ext
    if (type == "jpg" || type == "jpeg" || type == "png") {
      setFiles1(e.target.files)
    } else {
      e.target.value = null
      toast.error("Please select a valid image file (jpg, jpeg, or png)")
    }
  }

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

  const [items, setItems] = useState([])
  const [userinfo, setuserinfo] = useState([])
  console.log(items.token)
  console.log(userinfo)

  // get all function

  const getAllbenners = async () => {
    const resonse = await getAllData("dish/getAlldish")
    var _data = resonse
    setbanner(_data.data.Dishes)
  }

  useEffect(() => {
    getAllbenners()
  }, [])

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = banner.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(banner.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // Add function

  const addbenners = async e => {
    e.preventDefault()
    const dataArray = new FormData()
    dataArray.append("name", form.name)
    dataArray.append("price", form.price)
    dataArray.append("rating", form.rating)
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("image", Files[i])
    }
    try {
      const resonse = await addData("dish/adddish", dataArray)
      var _data = resonse
      console.log(_data)
      setFiles({ image: "" })
      setform({ name: "", price: "", rating: "" })
      toast.success(_data.data.message)
      getAllbenners()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  // Edit fuction
  const editbenners = async e => {
    e.preventDefault()
    const dataArray = new FormData()
    dataArray.append("name", form1.name)
    dataArray.append("price", form1.price)
    dataArray.append("rating", form1.rating)
    dataArray.append("status", form1.status)
    for (let i = 0; i < Files1.length; i++) {
      dataArray.append("image", Files1[i])
    }
    try {
      const resonse = await updateData("dish/editdish/" + form1._id, dataArray)
      var _data = resonse
      console.log(_data)
      setFiles1({ image: "" })
      toast.success(_data.data.message)
      clearForm()
      setmodal_small(false)
      getAllbenners()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  // Delete fuction
  const deletebenners = async data => {
    try {
      const resonse = await deletedData("dish/deletedish/" + data._id, {})
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      getAllbenners()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      deletebenners(data)
    }
  }

  const clearForm = () => {
    setform({ name: "", price: "", rating: "" })
    setFiles({ image: "" })
  }

  const getpopup = data => {
    setform1(data)
    tog_small()
  }

  const [forms, setforms] = useState([])
  console.log(forms)

  // Search fuction
  const handleSearch = async e => {
    const resonse = await getAllData(
      "dish/getAlldish?searchQuery=" + e.target.value
    )
    var _data = resonse
    setbanner(_data.data.Dishes)
  }

  const [show, setShow] = useState(false)
  const showaddevent = () => {
    setShow(!show)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Shicar" breadcrumbItem="Dishes" />
          {/* {permissioins.banner === true || roles === "admin" ? ( */}

          <Row>
            <Col md={4}>
              <Card>
                <CardHeader className="bg-white">
                  <CardTitle>Add Dishes</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      addbenners(e)
                    }}
                  >
                    <Row>
                      <Col md="12">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="basicpill-firstname-input1"
                            placeholder="Enter Name"
                            required
                            name="name"
                            value={form.name}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>{" "}
                      </Col>
                      <Col md="12">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Image <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="file"
                            className="form-control"
                            id="basicpill-firstname-input1"
                            placeholder="Enter image"
                            required
                            name="image"
                            accept=".jpg, .jpeg, .png"
                            value={Files.image}
                            onChange={changeHandler}
                          />
                        </div>{" "}
                      </Col>
                      <Col md="12">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Price <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="basicpill-firstname-input1"
                            placeholder="Enter Price"
                            required
                            name="price"
                            value={form.price}
                            onChange={e => {
                              handleChange(e)
                            }}
                          />
                        </div>{" "}
                      </Col>
                      <Col md="12">
                        <div className="mb-3">
                          <Label for="basicpill-firstname-input1">
                            Select Rating <span className="text-danger">*</span>
                          </Label>
                          <select
                            className="form-select"
                            required
                            name="rating"
                            value={form.rating}
                            onChange={e => {
                              handleChange(e)
                            }}
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                          </select>
                        </div>{" "}
                      </Col>
                    </Row>

                    <div className="mt-4" style={{ float: "right" }}>
                      <Button className="m-1" color="success" type="submit">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                      <Button
                        className="m-1"
                        onClick={() => {
                          clearForm()
                        }}
                        color="danger"
                        type="button"
                      >
                        Clear <i className="bx bx-x-circle"></i>
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            <Col md={8}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md="6">
                      {/* <Button onClick={() => { showaddevent() }} color="primary">Add Event <i className="bx bx-add-to-queue" /></Button> */}
                    </Col>
                    <Col md="6">
                      <div style={{ float: "right" }}>
                        <Input
                          type="text"
                          name="search"
                          onChange={handleSearch}
                          className="form-control"
                          placeholder="Search.."
                        />
                      </div>
                    </Col>
                  </Row>
                  <div>
                    <div className="table-responsive">
                      <Table className="table table-bordered mb-4 mt-3">
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th> Name</th>
                            <th> Image</th>
                            <th> Price</th>
                            <th>Status</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <td> {(pageNumber - 1) * 5 + key + 6}</td>
                              <td>{data.name} </td>
                              <td>
                                <img
                                  style={{ width: "100px" }}
                                  src={imgUrl + data.image}
                                />
                              </td>
                              <td>{data.price}</td>
                              <td>{data.status}</td>
                              <td>
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
              Edit Dishes
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
                editbenners(e)
              }}
            >
              <Row>
                <Col md="12">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Name"
                      required
                      name="name"
                      value={form1.name}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>{" "}
                </Col>
                <Col md="12">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">Image</Label>
                    <Input
                      type="file"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter image"
                      accept=".jpg, .jpeg, .png"
                      name="image"
                      onChange={changeHandler1}
                    />
                  </div>{" "}
                </Col>
                <Col md="12">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Price <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="number"
                      className="form-control"
                      id="basicpill-firstname-input1"
                      placeholder="Enter Price"
                      required
                      name="price"
                      value={form1.price}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    />
                  </div>{" "}
                </Col>
                <Col md="12">
                  <div className="mb-3">
                    <Label for="basicpill-firstname-input1">
                      Select Rating <span className="text-danger">*</span>
                    </Label>
                    <select
                      className="form-select"
                      required
                      name="rating"
                      value={form1.rating}
                      onChange={e => {
                        handleChange1(e)
                      }}
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                      <option value="4.5">4.5</option>
                      <option value="5">5</option>
                    </select>
                  </div>{" "}
                </Col>
                <Col md="12">
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
                      <option value="active">Active</option>
                      <option value="inactive">In Active</option>
                    </select>
                  </div>
                </Col>
              </Row>
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
                <Button className="m-1" color="success" type="submit">
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

export default Dishes
