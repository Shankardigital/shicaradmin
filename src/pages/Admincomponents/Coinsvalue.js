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
import axios from "axios"
import { useHistory } from "react-router-dom"
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Productcat = () => {
  const [form1, setform1] = useState({ pointsRatio: "" })
  console.log(form1)

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  // get all
  const getSettings = async () => {
    const resonse = await addData("settings/getsettings")
    var _data = resonse
    setform1(_data.data.settings)
  }

  useEffect(() => {
    getSettings()
  }, [])

  const handleSubmit1 = async e => {
    e.preventDefault()
    const bodydata = {
      referralAmount: form1.referralAmount,
      rideCommission: form1.rideCommission,
    }
    try {
      const resonse = await updateData("settings/updateridecomission", bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setmodal_small(false)
      getSettings()
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
        <Container fluid>
          <Breadcrumbs title="Shicar" breadcrumbItem="Charges" />
          <Card>
            <CardBody>
              <Form
                onSubmit={e => {
                  handleSubmit1(e)
                }}
              >
                <Row>
                  <Col md="3">
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Referral Charge <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Charge"
                        required
                        name="referralAmount"
                        value={form1.referralAmount}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                      <small className="text-danger">
                        Single referral charge
                      </small>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mb-3">
                      <Label for="basicpill-firstname-input1">
                        Ride commission <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="number"
                        className="form-control"
                        id="basicpill-firstname-input1"
                        placeholder="Enter Percentage"
                        required
                        name="rideCommission"
                        value={form1.rideCommission}
                        onChange={e => {
                          handleChange1(e)
                        }}
                      />
                      <small className="text-danger">
                        Single ride commission percentage(%)
                      </small>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="mt-4">
                      <Button className="m-1" color="success" type="submit">
                        Submit <i className="fas fa-check-circle"></i>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Container>

        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default Productcat
