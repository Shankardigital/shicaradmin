import React, { useState, useEffect, useRef } from "react";
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
import { getAllWebData } from "Servicescalls"
import { imgUrl } from "Baseurls"
import { CSVLink } from "react-csv"
import { useReactToPrint } from "react-to-print"

const Leads = () => {
    const [banner, setbanner] = useState([])
    // get all function

    const getAllbenners = async () => {
        const resonse = await getAllWebData("enquiry/getAllenquirys")
        var _data = resonse
        setbanner(_data.data.enquirys)
    }

    useEffect(() => {
        getAllbenners();
    }, []);


    const [listPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = banner.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(banner.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    const [forms, setforms] = useState([]);
    console.log(forms)

    // Search fuction
    const handleSearch = async (e) => {
        const resonse = await getAllWebData("enquiry/getAllenquirys?searchQuery=" + e.target.value)
        var _data = resonse
        setbanner(_data.data.enquirys)
    };

    // excel
    const csvReport = {
        filename: "Leads.csv",
        // headers: headers,
        data: banner,
    }
    // pdf 
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Shicar" breadcrumbItem="Leads" />
                    <Row>

                        <Col md={12}>
                            <Card>
                                <CardBody >
                                    <Row>
                                        <Col md="6">
                                            <div style={{ float: "left" }}>
                                                <Input
                                                    type="text"
                                                    name="search"
                                                    onChange={handleSearch}
                                                    className="form-control" placeholder="Search.." />
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div style={{ float: "right" }}>
                                                <CSVLink {...csvReport}>
                                                    <Button type="button" color="success m-1" outline>
                                                        Excel <i className="fas fa-file-excel"></i>
                                                    </Button>
                                                </CSVLink>
                                                <Button
                                                    onClick={handlePrint}
                                                    type="button"
                                                    color="danger m-1"
                                                    outline
                                                >
                                                    PDF <i className="fas fa-file-pdf"></i>
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div>
                                        <div className="table-responsive">
                                            <div ref={componentRef} >
                                            <Table className="table table-bordered mb-4 mt-3">
                                                <thead>
                                                    <tr>
                                                        <th>S No</th>
                                                        <th> Date</th>
                                                        <th> Name</th>
                                                        <th> Email</th>
                                                        <th> Mobile</th>
                                                        <th> State</th>
                                                        <th>City</th>
                                                        <th>Event Type</th>
                                                        <th>No. of people</th>
                                                        <th>Item Type</th>
                                                        <th>Description</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lists.map((data, key) => (
                                                        <tr key={key}>
                                                            <td> {(pageNumber - 1) * 10 + key + 11}</td>
                                                            <td>{data.date}</td>
                                                            <td>{data.enterYourName}</td>
                                                            <td>{data.enterYourEmail}</td>
                                                            <td>{data.enterContactNumber}</td>
                                                            <td>{data.selectState}</td>
                                                            <td>{data.selectCity}</td>
                                                            <td>{data.eventType}</td>
                                                            <td>{data.numberOfPeople}</td>
                                                            <td>{data.itemType}</td>
                                                            <td>{data.description}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            </div>
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
        </React.Fragment >
    )
}

export default Leads
