import React, { useState, useEffect } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap"
import axios from "axios"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import toast, { Toaster } from "react-hot-toast"
import { URLS } from "../../../Baseurls"
import { useHistory } from "react-router-dom"
import { addData, updateData } from "Servicescalls"
const Roles = () => {
  const [ras, setras] = useState([])
  console.log(ras)

  const handleChange1s = e => {
    const myUser = { ...ras }
    myUser[e.target.name] = e.target.checked
    setras(myUser)
  }

  const [form, setform] = useState([])

  // const check = {
  //   Dashview: ras.Dashview,

  //   departementView: ras.departementView,
  //   departementAdd: ras.departementAdd,
  //   departementeEdit: ras.departementeEdit,
  //   departementDelete: ras.departementDelete,

  //   rolesAndPermissionView: ras.rolesAndPermissionView,
  //   rolesAndPermissionAdd: ras.rolesAndPermissionAdd,
  //   rolesAndPermissionEdit: ras.rolesAndPermissionEdit,
  //   rolesAndPermissionDelete: ras.rolesAndPermissionDelete,

  //   staffView: ras.staffView,
  //   staffAdd: ras.staffAdd,
  //   staffEdit: ras.staffEdit,
  //   staffDelete: ras.staffDelete,

  //   categoryView: ras.categoryView,
  //   categoryAdd: ras.categoryAdd,
  //   categoryeEdit: ras.categoryeEdit,
  //   categoryDelete: ras.categoryDelete,
  //   campanyproView: ras.campanyproView,
  //   campanyproAdd: ras.campanyproAdd,
  //   campanyproEdit: ras.campanyproEdit,
  //   campanyproDelete: ras.campanyproDelete,
  //   productsView: ras.productsView,
  //   productsAdd: ras.productsAdd,
  //   productseEdit: ras.productseEdit,
  //   productsDelete: ras.productsDelete,
  //   userView: ras.userView,
  //   userAdd: ras.userAdd,
  //   usereEdit: ras.usereEdit,
  //   userDelete: ras.userDelete,
  //   bannerView: ras.bannerView,
  //   bannerAdd: ras.bannerAdd,
  //   bannereEdit: ras.bannereEdit,
  //   bannerDelete: ras.bannerDelete,
  //   termsView: ras.termsView,
  //   privacyView: ras.privacyView,
  //   refundView: ras.refundView,
  // }

  const handleSubmit = async e => {
    e.preventDefault()
    const bodydata = {
      roleName: form.roleName,
      rolesAndPermission: ras,
    }
    try {
      const resonse = await updateData("role/editrole/" + form._id, bodydata)
      var _data = resonse
      console.log(_data)
      toast.success(_data.data.message)
      setTimeout(() => {
        history.push("/rolesandpermissions")
      }, 2000)
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

  function handleChange(e) {
    let myUser = { ...form }
    myUser[e.target.name] = e.target.value
    setform(myUser)
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)

  const history = useHistory()

  useEffect(() => {
    GetOneActins()
  }, [])

  const Actinid = sessionStorage.getItem("Roleids")

  const GetOneActins = async () => {
    const bodydata = {
      _id: Actinid,
    }
    const resonse = await addData("role/getrole", bodydata)
    var _data = resonse
    setform(_data.data.data)
    setras(_data.data.data.rolesAndPermission[0])
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Breadcrumbs title="Shicar" breadcrumbItem="Edit Roles" />
          <Row>
            <Col>
              <Button
                onClick={() => history.goBack()}
                className="mb-3  m-1 "
                style={{ float: "right" }}
                color="primary"
              >
                <i className="far fa-arrow-alt-circle-left"></i> Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white mt-2">
                  <CardTitle>Role & Permissions</CardTitle>
                </CardHeader>
                <CardBody>
                <Form
                    onSubmit={e => {
                      handleSubmit(e)
                    }}
                  >
                    <Row>
                      <Col md={4}>
                        <Label for="basicpill-firstname-input1">
                          Role <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="basicpill-firstname-input1"
                          placeholder="Enter Role  Name"
                          required
                          value={form.roleName}
                          name="roleName"
                          onChange={e => {
                            handleChange(e)
                          }}
                        />
                      </Col>
                    </Row>

                    <h5 className="mt-4 mb-3">Dashboard:</h5>
                    <Row className=" mt-3">
                      <Col md={2}>
                        <p className="">Dashboard: </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="Dashview"
                            defaultChecked={ras.Dashview}
                            value={ras.Dashview}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="Dashview"
                          />
                          <Label className="form-check-label" for="Dashview">
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Company Products:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Category : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="categoryView"
                            defaultChecked={ras.categoryView}
                            value={ras.categoryView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="categoryView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="categoryView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="categoryAdd"
                            defaultChecked={ras.categoryAdd}
                            value={ras.categoryAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="categoryAdd"
                          />
                          <Label className="form-check-label" for="categoryAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="categoryeEdit"
                            defaultChecked={ras.categoryeEdit}
                            value={ras.categoryeEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="categoryeEdit"
                          />
                          <Label className="form-check-label" for="categoryeEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="categoryDelete"
                            defaultChecked={ras.categoryDelete}
                            value={ras.categoryDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="categoryDelete"
                          />
                          <Label className="form-check-label" for="categoryDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Company Products : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="campanyproView"
                            defaultChecked={ras.campanyproView}
                            value={ras.campanyproView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="campanyproView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="campanyproView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="campanyproAdd"
                            defaultChecked={ras.campanyproAdd}
                            value={ras.campanyproAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="campanyproAdd"
                          />
                          <Label className="form-check-label" for="campanyproAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="campanyproEdit"
                            defaultChecked={ras.campanyproEdit}
                            value={ras.campanyproEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="campanyproEdit"
                          />
                          <Label className="form-check-label" for="campanyproEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="campanyproDelete"
                            defaultChecked={ras.campanyproDelete}
                            value={ras.campanyproDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="campanyproDelete"
                          />
                          <Label className="form-check-label" for="campanyproDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Products:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Products : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="productsView"
                            defaultChecked={ras.productsView}
                            value={ras.productsView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="productsView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="productsView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="productsAdd"
                            defaultChecked={ras.productsAdd}
                            value={ras.productsAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="productsAdd"
                          />
                          <Label className="form-check-label" for="productsAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="productseEdit"
                            defaultChecked={ras.productseEdit}
                            value={ras.productseEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="productseEdit"
                          />
                          <Label className="form-check-label" for="productseEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="productsDelete"
                            defaultChecked={ras.productsDelete}
                            value={ras.productsDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="productsDelete"
                          />
                          <Label className="form-check-label" for="productsDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Staff Managment:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Department : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementView"
                            defaultChecked={ras.departementView}
                            value={ras.departementView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="departementView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="departementView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementAdd"
                            defaultChecked={ras.departementAdd}
                            value={ras.departementAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="departementAdd"
                          />
                          <Label className="form-check-label" for="departementAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementeEdit"
                            defaultChecked={ras.departementeEdit}
                            value={ras.departementeEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="departementeEdit"
                          />
                          <Label className="form-check-label" for="departementeEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="departementDelete"
                            defaultChecked={ras.departementDelete}
                            value={ras.departementDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="departementDelete"
                          />
                          <Label className="form-check-label" for="departementDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Roles & Premissions : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionView"
                            defaultChecked={ras.rolesAndPermissionView}
                            value={ras.rolesAndPermissionView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="rolesAndPermissionView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="rolesAndPermissionView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionAdd"
                            defaultChecked={ras.rolesAndPermissionAdd}
                            value={ras.rolesAndPermissionAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="rolesAndPermissionAdd"
                          />
                          <Label className="form-check-label" for="rolesAndPermissionAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionEdit"
                            defaultChecked={ras.rolesAndPermissionEdit}
                            value={ras.rolesAndPermissionEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="rolesAndPermissionEdit"
                          />
                          <Label className="form-check-label" for="rolesAndPermissionEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rolesAndPermissionDelete"
                            defaultChecked={ras.rolesAndPermissionDelete}
                            value={ras.rolesAndPermissionDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="rolesAndPermissionDelete"
                          />
                          <Label className="form-check-label" for="rolesAndPermissionDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Staff : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffView"
                            defaultChecked={ras.staffView}
                            value={ras.staffView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="staffView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="staffView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffAdd"
                            defaultChecked={ras.staffAdd}
                            value={ras.staffAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="staffAdd"
                          />
                          <Label className="form-check-label" for="staffAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffEdit"
                            defaultChecked={ras.staffEdit}
                            value={ras.staffEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="staffEdit"
                          />
                          <Label className="form-check-label" for="staffEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="staffDelete"
                            defaultChecked={ras.staffDelete}
                            value={ras.staffDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="staffDelete"
                          />
                          <Label className="form-check-label" for="staffDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Users:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Users : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="userView"
                            defaultChecked={ras.userView}
                            value={ras.userView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="userView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="userView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="userAdd"
                            defaultChecked={ras.userAdd}
                            value={ras.userAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="userAdd"
                          />
                          <Label className="form-check-label" for="userAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="usereEdit"
                            defaultChecked={ras.usereEdit}
                            value={ras.usereEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="usereEdit"
                          />
                          <Label className="form-check-label" for="usereEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="userDelete"
                            defaultChecked={ras.userDelete}
                            value={ras.userDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="userDelete"
                          />
                          <Label className="form-check-label" for="userDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Rides Managment :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Pending Rides : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="pendingrides"
                            defaultChecked={ras.pendingrides}
                            value={ras.pendingrides}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="pendingrides"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="pendingrides"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Running Rides : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="runningrides"
                            defaultChecked={ras.runningrides}
                            value={ras.runningrides}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="runningrides"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="runningrides"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Completed Rides : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="completedrides"
                            defaultChecked={ras.completedrides}
                            value={ras.completedrides}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="completedrides"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="completedrides"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Cancelled Rides : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="cancelledrides"
                            defaultChecked={ras.cancelledrides}
                            value={ras.cancelledrides}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="cancelledrides"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="cancelledrides"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Withdraw Managment :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Withdraw Requests : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="withdrawrequest"
                            defaultChecked={ras.withdrawrequest}
                            value={ras.withdrawrequest}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="withdrawrequest"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="withdrawrequest"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Hold Withdraws : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="holdrequest"
                            defaultChecked={ras.holdrequest}
                            value={ras.holdrequest}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="holdrequest"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="holdrequest"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Approved Withdraws : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="approvedwithdraws"
                            defaultChecked={ras.approvedwithdraws}
                            value={ras.approvedwithdraws}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="approvedwithdraws"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="approvedwithdraws"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Rejected Withdraws : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="rejectedwithdraws"
                            defaultChecked={ras.rejectedwithdraws}
                            value={ras.rejectedwithdraws}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="rejectedwithdraws"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="rejectedwithdraws"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Banners:</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Banners : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="bannerView"
                            defaultChecked={ras.bannerView}
                            value={ras.bannerView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="bannerView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="bannerView"
                          >
                            View
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check  me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="bannerAdd"
                            defaultChecked={ras.bannerAdd}
                            value={ras.bannerAdd}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="bannerAdd"
                          />
                          <Label className="form-check-label" for="bannerAdd">
                            Add
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="bannereEdit"
                            defaultChecked={ras.bannereEdit}
                            value={ras.bannereEdit}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="bannereEdit"
                          />
                          <Label className="form-check-label" for="bannereEdit">
                            Edit
                          </Label>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="bannerDelete"
                            defaultChecked={ras.bannerDelete}
                            value={ras.bannerDelete}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="bannerDelete"
                          />
                          <Label className="form-check-label" for="bannerDelete">
                            Delete
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>

                    <h5 className="mt-3 mb-3">Settings :</h5>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Terms & Conditions : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="termsView"
                            defaultChecked={ras.termsView}
                            value={ras.termsView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="termsView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="termsView"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Privacy Policy : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="privacyView"
                            defaultChecked={ras.privacyView}
                            value={ras.privacyView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="privacyView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="privacyView"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                    <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Refund Policy : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="refundView"
                            defaultChecked={ras.refundView}
                            value={ras.refundView}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="refundView"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="refundView"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>
                     <Row className="mt-2">
                      <Col md={2}>
                        <p className="">Caoin Price : </p>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={2}>
                        <div className="form-check me-3 me-lg-5">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            name="coinprice"
                            defaultChecked={ras.coinprice}
                            value={ras.coinprice}
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            id="coinprice"
                          />
                          <Label
                            onClick={e => {
                              handleChange1s(e)
                            }}
                            className="form-check-label"
                            for="coinprice"
                          >
                            Access
                          </Label>
                        </div>
                      </Col>
                      <Col md={1}></Col>
                    </Row>



                    <div className="mt-3" style={{ float: "right" }}>
                      <button
                        type="submit"
                        style={{ width: "120px" }}
                        className="btn btn-success m-1"
                      >
                        Submit
                        <i
                          className="fa fa-check-circle-o"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Toaster />
    </React.Fragment>
  )
}

export default Roles
