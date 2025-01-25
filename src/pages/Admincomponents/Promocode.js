import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Button,
  Table,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import ReactPaginate from "react-paginate"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Staff = () => {
  const [show, setshow] = useState(false)
  const [show1, setshow1] = useState(false)
  const toggle = () => setshow1(!show1)

  const [users, setusers] = useState([])
  const [form, setform] = useState({
    title: "",
    couponCode: "",
    couponCodeType: "",
    price: "",
    description: "",
  })
  const [form1, setform1] = useState([])

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

  const Get = async () => {
    const resonse = await addData("coupon/getAll")
    var _data = resonse
    setusers(_data.data.cpns)
  }

  const custsearch = async e => {
    const resonse = await addData(
      "coupon/getAll?searchQuery=" + e.target.value
    )
    var _data = resonse
    setusers(_data.data.cpns)
  }

  const formsubmit = async e => {
    e.preventDefault()
    const bodydata = {
      title: form.title,
      couponCode: form.couponCode,
      couponCodeType: form.couponCodeType,
      price: form.price,
      description: form.description,
    }
    try {
      const resonse = await addData("coupon/addcpn", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setform({
        title: "",
        couponCode: "",
        couponCodeType: "",
        price: "",
        description: "",
      })
      Get()
      setshow(false)
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

  const formeditsubmit = async e => {
    e.preventDefault()
    const bodydata = {
      title: form1.title,
      couponCode: form1.couponCode,
      couponCodeType: form1.couponCodeType,
      price: form1.price,
      description: form1.description,
    }
    
    try {
      const resonse = await updateData(
        "coupon/editcpn/" + form1._id,
        bodydata
      )
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      Get()
      setshow1(false)
      setFiles1({ profilepic: "" })
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

  const usedata = datal => {
    setshow1(true)
    setform1(datal)
  }

  const [listPerPage] = useState(5)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = users.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(users.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const manageDelete = data => {
    const confirmBox = window.confirm("Do you really want to Delete?")
    if (confirmBox === true) {
      Delete(data)
    }
  }

  const Delete = async data => {
    try {
      const resonse = await deletedData("coupon/deletecoupon/" + data._id, {})
      var _data = resonse
      toast.success(_data.data.message)
      Get()
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

  const [dep, setdep] = useState([])
  const [role, setrole] = useState([])
  useEffect(() => {
    Get()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Shicar" breadcrumbItem="Coupons" />

          <Row>
            <Col md="4">
              <Card className="p-4">
                <Form
                  onSubmit={e => {
                    formsubmit(e)
                  }}
                >
                  <h5 className="mb-3">Add New Coupon</h5>
                  <Row>
                    <Col md="12">
                      <div className="mb-3">
                        <Label>Title </Label>
                        <span className="text-danger">*</span>
                        <Input
                          onChange={e => {
                            handleChange(e)
                          }}
                          name="title"
                          value={form.title}
                          required
                          type="text"
                          placeholder="Enter Title"
                        />
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="mb-3">
                        <Label>Coupon Code </Label>
                        <span className="text-danger">*</span>
                        <Input
                          onChange={e => {
                            handleChange(e)
                          }}
                          name="couponCode"
                          value={form.couponCode}
                          required
                          type="text"
                          placeholder="Enter Coupon Code"
                        />
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="mb-3">
                        <Label> Coupon Code Type</Label>
                        <span className="text-danger">*</span>
                        <select
                          value={form.couponCodeType}
                          name="couponCodeType"
                          required
                          onChange={e => {
                            handleChange(e)
                          }}
                          className="form-select"
                        >
                          <option value="">Select Code Type</option>
                          <option value="Price">Price</option>
                          <option value="Percentage">Percentage</option>
                        </select>
                      </div>
                    </Col>
                    {form.couponCodeType == "Percentage" ? (
                      <Col md="12">
                        <div className="mb-3">
                          <Label>Percentage %</Label>
                          <span className="text-danger">*</span>
                          <Input
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="price"
                            value={form.price}
                            required
                            type="text"
                            placeholder="Enter Percentage"
                          />
                        </div>
                      </Col>
                    ) : form.couponCodeType == "Price" ? (
                      <Col md="12">
                        <div className="mb-3">
                          <Label>Price</Label>
                          <span className="text-danger">*</span>
                          <Input
                            onChange={e => {
                              handleChange(e)
                            }}
                            name="price"
                            value={form.price}
                            required
                            type="text"
                            placeholder="Enter Amount"
                          />
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}

                    <Col md="12">
                      <Label>Description</Label>
                      <span className="text-danger">*</span>
                      <textarea
                        onChange={e => {
                          handleChange(e)
                        }}
                        name="description"
                        className="form-control"
                        value={form.description}
                        required
                        type="date"
                      />
                    </Col>
                  </Row>
                  <div className="text-end mt-3">
                    <Button type="submit" color="success m-1" outline>
                      Submit <i className="bx bx-check-circle"></i>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setshow(!show)
                      }}
                      color="danger m-1"
                      outline
                    >
                      Cancel <i className="bx bx-x-circle"></i>
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
            <Col md="8">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <div style={{ float: "right" }}>
                        <Input
                          name="search"
                          value={form.search}
                          onChange={e => {
                            custsearch(e)
                          }}
                          type="search"
                          placeholder="Search.."
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="table-rep-plugin mt-4 table-responsive">
                    <Table hover bordered responsive>
                      <thead>
                        <tr className="text-center">
                          <th>Sl.No</th>
                          <th>Coupon Title</th>
                          <th>Code</th>
                          <th>Code Type</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th style={{ width: "170px" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                          <tr key={key} className="text-center">
                            <th scope="row">
                              {(pageNumber - 1) * 5+ key + 6}
                            </th>
                            <td>{data.title}</td>
                            <td>{data.couponCode}</td>
                            <td>{data.couponCodeType}</td>
                            <td>₹{data.price}</td>
                            <td>{data.description}</td>

                            <td style={{ width: "170px" }}>
                              {Roles?.staffEdit == true ||
                              Roles?.accessAll == true ? (
                                <>
                                  <Button
                                    onClick={() => {
                                      usedata(data)
                                    }}
                                    className="m-1 btn-sm"
                                    color="success"
                                  >
                                    <div className="d-flex">
                                      <small className="d-flex">
                                        <i className="bx bx-edit px-1"></i>
                                        Edit
                                      </small>
                                    </div>
                                  </Button>
                                </>
                              ) : (
                                ""
                              )}
                              {Roles?.staffDelete == true ||
                              Roles?.accessAll == true ? (
                                <>
                                  <Button
                                    className="m-1 btn-sm"
                                    color="danger"
                                    onClick={() => {
                                      manageDelete(data)
                                    }}
                                  >
                                    <div className="d-flex">
                                      <small className="d-flex">
                                        <i className="bx bx-trash px-1"></i>
                                        Delete
                                      </small>
                                    </div>
                                  </Button>{" "}
                                </>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
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
      <Modal isOpen={show1} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Edit Details</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              formeditsubmit(e)
            }}
          >
            <Row>
              <Col md="6">
              <div className="mb-3">
                <Label>Title </Label>
                <span className="text-danger">*</span>
                <Input
                  onChange={e => {
                    handleChange1(e)
                  }}
                  name="title"
                  value={form1.title}
                  required
                  type="text"
                  placeholder="Enter Title"
                />
                </div>
              </Col>
              <Col md="6">
              <div className="mb-3">
                <Label>Coupon Code </Label>
                <span className="text-danger">*</span>
                <Input
                  onChange={e => {
                    handleChange1(e)
                  }}
                  name="couponCode"
                  value={form1.couponCode}
                  required
                  type="text"
                  placeholder="Enter Coupon Code"
                />
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <Label> Coupon Code Type</Label>
                  <span className="text-danger">*</span>
                  <select
                    value={form1.couponCodeType}
                    name="couponCodeType"
                    required
                    onChange={e => {
                      handleChange1(e)
                    }}
                    className="form-select"
                  >
                    <option value="">Select Code Type</option>
                    <option value="Price">Price</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </div>
              </Col>
              {form1.couponCodeType == "Percentage" ? (
                <Col md="6">
                  <div className="mb-3">
                    <Label>Percentage %</Label>
                    <span className="text-danger">*</span>
                    <Input
                      onChange={e => {
                        handleChange1(e)
                      }}
                      name="price"
                      value={form1.price}
                      required
                      type="text"
                      placeholder="Enter Percentage"
                    />
                  </div>
                </Col>
              ) : form1.couponCodeType == "Price" ? (
                <Col md="6">
                  <div className="mb-3">
                    <Label>Price</Label>
                    <span className="text-danger">*</span>
                    <Input
                      onChange={e => {
                        handleChange1(e)
                      }}
                      name="price"
                      value={form1.price}
                      required
                      type="text"
                      placeholder="Enter Amount"
                    />
                  </div>
                </Col>
              ) : (
                ""
              )}
              {/* <Col md="6">
                <Label>From Date</Label>
                <span className="text-danger">*</span>
                <Input
                  onChange={e => {
                    handleChange(e)
                  }}
                  name="fromdate"
                  value={form.fromdate}
                  required
                  type="date"
                />
              </Col>
              <Col md="6">
                <Label>Expire Date</Label>
                <span className="text-danger">*</span>
                <Input
                  onChange={e => {
                    handleChange(e)
                  }}
                  name="expireDate"
                  value={form.expireDate}
                  required
                  type="date"
                />
              </Col> */}
              <Col md="12">
                <Label>Description</Label>
                <span className="text-danger">*</span>
                <textarea
                  onChange={e => {
                    handleChange1(e)
                  }}
                  name="description"
                  className="form-control"
                  value={form1.description}
                  required
                  type="date"
                />
              </Col>
            </Row>
            <div className="text-end mt-3">
              <Button type="submit" color="success m-1" outline>
                Submit <i className="bx bx-check-circle"></i>
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setshow1(!show1)
                }}
                color="danger m-1"
                outline
              >
                Cancel <i className="bx bx-x-circle"></i>
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default Staff
