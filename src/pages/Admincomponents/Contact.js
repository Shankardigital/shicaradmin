import React, { useState, useEffect } from "react";
import {
    CardBody, CardHeader, Container,
    Row, Col, Card, CardText, CardTitle,
    Form, Label, Input, Button, Table,
    Pagination,
    PaginationItem,
    PaginationLink, Modal,
} from "reactstrap"
// import img1 from "../assets/images/latest/car1.jpg"

//Import Breadcrumb
// import Breadcrumbs from "../components/Common/Breadcrumb"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
// import { URL } from "../../Apiurls";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import img3 from "../../assets/images/crypto/blog/img-3.jpg"
import { addData, updateData, deletedData, getAllData } from "Servicescalls"
import { imgUrl } from "Baseurls"

const Contact = () => {
    const [form, setform] = useState([])
    const history = useHistory();

    const handleChange = (e) => {
        let myUser = { ...form };
        myUser[e.target.name] = e.target.value;
        setform(myUser);
    };


    const [items, setItems] = useState([]);
    const [userinfo, setuserinfo] = useState([]);
    console.log(items.token)
    console.log(userinfo)

    // get all function

    const getAllbenners = async () => {
        const resonse = await getAllData("contactus/getcontactus")
        var _data = resonse
        setform(_data.data.contactus)
    }

    useEffect(() => {
        getAllbenners();
    }, []);

    // Edit fuction
    const editbenners = async (e) => {
        e.preventDefault()
        const dataArray = new FormData();
        dataArray.append("address", form.address);
        dataArray.append("phoneNumber", form.phoneNumber);
        dataArray.append("serviceHours", form.serviceHours);
        dataArray.append("facebook", form.facebook);
        dataArray.append("twitter", form.twitter);
        dataArray.append("instagram", form.instagram);
        dataArray.append("youtube", form.youtube);
        try {
            const resonse = await updateData("contactus/editcontactus/", dataArray)
            var _data = resonse
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
                // toast.error("An error occurred. Please try again.")
            }
        }
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Shicar" breadcrumbItem="Contact Details" />
                    {/* {permissioins.banner === true || roles === "admin" ? ( */}

                    <Row>
                            <Col md={12}>
                                <Card>
                                    {/* <CardHeader className="bg-white">
                                        <CardTitle>Add Testimonial</CardTitle>
                                    </CardHeader> */}
                                    <CardBody >

                                        <Form onSubmit={(e) => {
                                            editbenners(e);
                                        }}>
                                            <Row>
                                                <Col md="3">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Phone Number <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="number"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Number"
                                                            required
                                                            name="phoneNumber"
                                                            value={form.phoneNumber}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> </Col>
                                                <Col md="3">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Service Hours <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Hours"
                                                            required
                                                            name="serviceHours"
                                                            value={form.serviceHours}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> </Col>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Address <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Address"
                                                            required
                                                            name="address"
                                                            value={form.address}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> </Col>

                                                    <Col md="3">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Facebook <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Link"
                                                            required
                                                            name="facebook"
                                                            value={form.facebook}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> 
                                                    </Col>
                                                    <Col md="3">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Twitter <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Link"
                                                            required
                                                            name="twitter"
                                                            value={form.twitter}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> 
                                                    </Col>
                                                    <Col md="3">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Instagram <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Link"
                                                            required
                                                            name="instagram"
                                                            value={form.instagram}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> 
                                                    </Col>
                                                    <Col md="3">
                                                    <div className="mb-3">
                                                        <Label for="basicpill-firstname-input1">
                                                        Youtube <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="basicpill-firstname-input1"
                                                            placeholder="Enter Link"
                                                            required
                                                            name="youtube"
                                                            value={form.youtube}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </div> 
                                                    </Col>
                                              
                                                
                                            </Row>
                                            <div className="mt-4" style={{ float: "right" }}>
                                                <Button className="m-1" color="success" type="submit">
                                                    Submit <i className="fas fa-check-circle"></i>
                                                </Button>
                                                {/* <Button className="m-1" onClick={() => { showaddevent() }} color="danger" type="button">
                                                    Cancel <i className="bx bx-x-circle"></i>
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
        </React.Fragment >
    )
}

export default Contact
