import React, { useEffect, useState, useRef } from "react"

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
  FormGroup,
  InputGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
// import { URL } from "../../Apiurls"
import axios from "axios"
import { Link } from "react-router-dom"

import Flatpickr from "react-flatpickr"
import ReactPaginate from "react-paginate"
import toast, { Toaster } from "react-hot-toast"
import { addData } from "Servicescalls"
import { imgUrl } from "Baseurls"
// import ReactPaginate from 'react-paginate';
// import toast, { Toaster } from 'react-hot-toast';
// import barcode from "../../assets/images/letast/barcode.jpg"
// import Barcode from "react-barcode";
import { CSVLink } from "react-csv"
import { useReactToPrint } from "react-to-print"
import { format } from "date-fns";

const AGENTPAYOUT = () => {
  const [customer, setCustomer] = useState([])
  const [customerexcl, setCustomerexcl] = useState([])

  
  const [show, setshow] = useState(false)
  const [form, setform] = useState([])
  // get all

  const getAllCustomer = async () => {
    const resonse = await addData("agent/getallagentspayments")
    var _data = resonse
    setCustomer(_data.data.agentResult)
    setCustomerexcl(_data.data.agentResult)
  }

  const Customerearch = async (e) => {
    const resonse = await addData("agent/getallagentspayments?searchQuery=" + e.target.value)
    var _data = resonse
    setCustomer(_data.data.agentResult)
  }

  const [datastate, setDatastate]=useState([])

  let dates = [];

  const handleDateChange = (NewDate) => {
    console.log(NewDate[0]);

    const date1 = format(new Date(NewDate[0]), "yyyy-MM-dd");
    const date2 = format(new Date(NewDate[1]), "yyyy-MM-dd");
    dates.push(date1);
    dates.push(date2);
    setDatastate(dates);
  };

  useEffect(() => {
    getAllCustomer()
  }, [])

  const [listPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(0)

  const pagesVisited = pageNumber * listPerPage
  const lists = customer.slice(pagesVisited, pagesVisited + listPerPage)
  const pageCount = Math.ceil(customer.length / listPerPage)
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  // filter

  const filterCustomer = async (e) => {
    e.preventDefault()
    const bodydata = {
      date: datastate,
    }

    const resonse = await addData("agent/getallagentspaymentsfilter", bodydata)
    var _data = resonse
    setCustomer(_data.data.agentResult)
    setshow(false)
  }

  // excel

  const csvReport = {
    filename: "Agentpayout.csv",
    // headers: headers,
    data: customerexcl,
  }

  // pdf 
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="CA Marketing" breadcrumbItem="AGENT PAYOUT" />
          {/* {permissioins.customerView === true || roles === "admin" ? ( */}

          <Row>
            <Col>
              {show == true ? (
                <Card className="p-4">
                  <Form
                    onSubmit={(e) => {
                      filterCustomer(e)
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-4">
                          <Label>Date Range</Label>
                          <Flatpickr
                            placeholder="Select date"
                            className="form-control"
                            name="date"
                            onChange={(e) => {
                              handleDateChange(e);
                            }}
                            options={{
                              mode: "range",
                              dateFormat: "d M, Y",
                            }}
                          />
                          {/* <Flatpickr
                            required
                            className="form-control d-block"
                            placeholder="dd M,yyyy"
                            options={{
                              mode: "range",
                              dateFormat: "Y-m-d",
                            }}
                            name="date"
                            value={selectedDate}
                            onChange={(e)=>{handleDateChange(e)}}
                          /> */}
                        </div>
                      </Col>

                  
                      <Col md="3">
                        <div className="text-end mt-4">
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
                      </Col>
                    </Row>
                  </Form>
                </Card>
              ) : (
                ""
              )}
              <Card>
                <CardBody>
                  <Row>
                    <Col md="6">
                      {/* {permissioins.customerAdd === true || roles === "admin" ? ( */}
                      <Button
                        onClick={() => {
                          setshow(!show)
                        }}
                        color="primary"
                      >
                        Filter <i className="bx bx-filter-alt"></i>
                      </Button>
                    </Col>
                    <Col md="6">
                      <Row>
                        <Col className="text-end" md="6">
                          <div>
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
                        <Col className="text-end" md="6">
                          <Input
                            name="search"
                            onChange={Customerearch}
                            // value={form.search}
                            // onChange={custsearch}
                            type="search"
                            placeholder="Search..."
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <div className="table-rep-plugin mt-4">
                    <div ref={componentRef}>
                      <Table hover bordered responsive>
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Date</th>
                            <th>Agent id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Company</th>
                            <th>Designation</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                        {lists.length == 0?(
                             <tr >
                             <th className="text-center" colSpan="9">
                              <span className="text-center"> No Data...</span>
                             </th>
                             </tr>
                          ):(
                            <>
                          {lists.map((data, key) => (
                            <tr key={key}>
                              <th scope="row">
                                {(pageNumber - 1) * 10 + key + 11}
                              </th>
                              <td>{data.date}</td>
                              <td>{data.agentId}</td>
                              <td>{data.name}</td>
                              <td>{data.email}</td>
                              <td>{data.phone}</td>
                              <td>{data.company}</td>
                              <td>{data.designation}</td>
                              <td>{data.amount}</td>
                              
                            </tr>
                          ))}
                          </>
                          )}
                        </tbody>
                      </Table>
                    </div>
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
          {/* ) : (
                        <Card>
                            <h5 className="text-center p-1">You don't have permission to access</h5>
                        </Card>
                    )} */}
        </div>
        {/* <Toaster /> */}
      </div>
    </React.Fragment>
  )
}

export default AGENTPAYOUT
