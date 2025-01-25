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
// import avatar from "../../assets/images/usersicon.png"
// import avatar from "./girl.png"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import ReactPaginate from "react-paginate"
// import { URL } from "../../Apiurls";
import axios from "axios"
import { useHistory } from "react-router-dom"
// import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { getAllData, addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const DeleteAccount = () => {
  const [modal_small, setmodal_small] = useState(false)
  const [cities, setCities] = useState([])
  const [form, setform] = useState({ name: "" })
  const [form1, setform1] = useState([])
  const history = useHistory()

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

  // get all

  const getAllCities = async () => {
    const resonse = await addData("state/getall")
    var _data = resonse
    setCities(_data.data.states)
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
      name: form.name,
    }
    try {
      const resonse = await addData("state/addstate", bodydata)
      var _data = resonse
      console.log(_data)
      setform({ name: "" })
      toast(_data.data.message)
      clearForm()
      getAllCities()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast(error.response.data.message)
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

  const handleSubmit1 = async e => {
    e.preventDefault()
    const bodydata = {
      name: form1.name,
      // status: form1.status,
    }
    try {
      const resonse = await updateData("state/editstate/" + form1._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast(_data.data.message)
      setmodal_small(false)
      getAllCities()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast(error.response.data.message)
      } else {
        // toast.error("An error occurred. Please try again.")
      }
    }
  }

  // search fuctions
  const citiesSearch = async e => {
    const resonse = await addData("state/getall?searchQuery=" + e.target.value)
    var _data = resonse
    setCities(_data.data.states)
  }

  const deletecities = async data => {
    try {
      const resonse = await deletedData("state/deletestate/" + data._id, {})
      var _data = resonse
      console.log(_data)
      toast(_data.data.message)
      getAllCities()
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast(error.response.data.message)
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
      name: "",
    })
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}>
        <Container fluid="sm">
          <Row className="justify-content-center">
            
            <Col md={8} lg={5}>
              <Card>
                  <h3 className="my-3 text-primary text-center">Delete Account</h3>
                <CardBody>
                  <Form
                    onSubmit={e => {
                      handleSubmit(e)
                    }}
                  >
                    <div className="mb-3">
                      <Label for="name-input">
                        Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="name-input"
                        placeholder="Enter Name"
                        required
                        // value={form.name}
                        name="name"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <Label for="email-input">
                        Email <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="email"
                        className="form-control"
                        id="email-input"
                        placeholder="Enter Email"
                        required
                        // value={form.email}
                        name="email"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <Label for="password-input">
                        Password <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="password-input"
                        placeholder="Enter Password"
                        required
                        // value={form.password}
                        name="password"
                        // onChange={handleChange}
                      />
                    </div>

                    <div className="d-flex justify-content-end mt-2">
                      <Button color="success" type="submit" className="me-2">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                      {/* <Button color="danger" >
                        Delete Account <i className="fas fa-trash-alt"></i>
                      </Button> */}
                    </div>
                  </Form>
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

export default DeleteAccount
