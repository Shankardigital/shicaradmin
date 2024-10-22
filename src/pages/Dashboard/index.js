import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap"
import { Link, useHistory } from "react-router-dom"

import classNames from "classnames"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import { getChartsData as onGetChartsData } from "../../store/actions"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"
import ReactApexChart from "react-apexcharts"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
import { addData } from "Servicescalls"
import ReactPaginate from "react-paginate"

const Dashboard = props => {
  const history = useHistory()
  const [modal, setmodal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData,
  }))

  const [form, setform] = useState([])
  const [graph, setgraph] = useState([])
  const [graph1, setgraph1] = useState([])
  const [customers, setcustomers] = useState([])

  const getAlldata = async () => {
    const resonse = await addData("getdashboard", {})
    var _data = resonse
    setform(_data.data)
    setgraph(_data?.data?.monthlyUsers)
    setgraph1(_data?.data?.monthlyRedemPoints)
    setcustomers(_data?.data?.latestUsers)
  }
  // const getAlldata1 = async () => {
  //   const resonse = await addData("dashboard/getAllenquiry", {})
  //   var _data = resonse
  //   setcustomers(_data.data.enquiry)
  // }

  useEffect(() => {
    getAlldata()
    // getAlldata1()
  }, [])

  const reports = [
    { title: "Total Users", iconClass: "bx bx-user-circle", description: form.totalUsers },
    { title: "Total Completed Rides", iconClass: "bx bx-building-house", description: form.totalCompanyProducts },
    // {title: "Total Radeem Products",iconClass: "bx bx-store-alt",description: form.totalredemProducts},
    // {title: "Total Coin Transactions",iconClass: "bx bx-git-repo-forked",description: form.totalRedemPoints},
    { title: "Today Users", iconClass: "bx bx-user-check", description: form.todayUsers },
    { title: "Today Completed Rides", iconClass: "bx bx-buildings", description: form.todayCompanyProducts },
    // {title: "Today Radeem Products",iconClass: "bx bx-notepad",description: form.todayRedemProducts},
    // {title: "Today Coin Transactions",iconClass: "bx bx-git-merge",description: form.todayRedemPoints},
  ]

  // useEffect(() => {
  //   setTimeout(() => {
  //     setSubscribemodal(true);
  //   }, 2000);
  // }, []);

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])

  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(onGetChartsData(pType))
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onGetChartsData("yearly"))
  }, [dispatch])

  const options = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: "line",
        dropShadow: {
          enabled: true,
          top: 18,
          left: 2,
          blur: 5,
          opacity: 0.2,
        },
        offsetX: -10,
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },
      grid: {
        borderColor: "#000",
        padding: {
          top: -20,
          bottom: 5,
          left: 20,
        },
      },
      legend: {
        show: false,
      },
      colors: ["#008955", "#74788d"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [props.primary, "#74788d"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 10000, 10000, 10000],
        },
      },
      markers: {
        size: 0,
        hover: {
          size: 5,
        },
      },
      xaxis: {
        labels: {
          offsetY: 5,
          style: {
            colors: "#e9c686",
            fontSize: "0.857rem",
            fontFamily: "Montserrat",
          },
        },
        axisTicks: {
          show: false,
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: false,
        },
        tickPlacement: "on",
      },
      yaxis: {
        tickAmount: 8,
        labels: {
          style: {
            colors: "#e9c686",
            fontSize: "0.857rem",
            fontFamily: "Montserrat",
          },
          formatter(val) {
            return val > 999 ? `${val / 1000}k` : val.toFixed(0)
          },
        },
      },
      tooltip: {
        x: { show: false },
      },
    },
    series = [
      {
        name: "Users",
        data: graph,
      },
      {
        name: "Completed Rides",
        data: graph1,
      },
    ]

    const getByfunction = (data) => {
      sessionStorage.setItem("userdata", data._id)
      history.push("/users_details")
    }

    const [listPerPage] = useState(5)
    const [pageNumber, setPageNumber] = useState(0)
  
    const pagesVisited = pageNumber * listPerPage
    const lists = customers.slice(pagesVisited, pagesVisited + listPerPage)
    const pageCount = Math.ceil(customers.length / listPerPage)
    const changePage = ({ selected }) => {
      setPageNumber(selected)
    }
  

  //meta title
  // document.title="Dashboard | Skote - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Shicar")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="3" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card>
                <CardBody>
                  <div className="clearfix">
                    <h4 className="card-title mb-4">Monthly Data


                    </h4>
                  </div>
                  <Row>
                    <Col lg="12">
                      <div id="line-chart" dir="ltr">
                        <ReactApexChart
                          series={series}
                          options={options}
                          type="line"
                          height={320}
                          className="apex-charts"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              {/* <LatestTranaction /> */}
            <div>
              <Card>
                <CardBody>
                  <h5 className="mt-3 mb-5">Latest Users</h5>
                <div className="table-rep-plugin mt-4">
                    <Table hover bordered responsive>
                      <thead className="bg-light">
                        <tr>
                          <th>Sl No</th>
                          <th>Date</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile No</th>
                          {/* <th>Coins</th> */}
                          <th>State</th>
                          <th>City</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lists.map((data, key) => (
                          <tr key={key}>
                            <th scope="row">
                              {(pageNumber - 1) * 5 + key + 6}
                            </th>
                            {/* <td>{data.customerId}</td> */}
                            <td>{data.logCreatedDate.slice(0, 10)}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>964534543</td>
                            {/* <td>{data.points}</td> */}
                            <td>Hyderabad</td>
                            <td>KPHB colony</td>
                            <td>{data.status}</td>
                            <td>
                                <Button
                                  size="sm"
                                  className="m-1"
                                  outline
                                  color="primary rounded-pill p-1"
                                  onClick={()=>{getByfunction(data)}}
                                >
                                 View Details
                                </Button>
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
            </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal)
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal)
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h4 className="text-primary">Subscribe !</h4>
                <p className="text-muted font-size-14 mb-4">
                  Subscribe our newletter and get notification to stay update.
                </p>

                <div className="input-group rounded bg-light">
                  <Input
                    type="email"
                    className="form-control bg-transparent border-0"
                    placeholder="Enter Email address"
                  />
                  <Button color="primary" type="button" id="button-addon2">
                    <i className="bx bxs-paper-plane"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={() => {
          setmodal(!modal)
        }}
      >
        <div>
          <ModalHeader
            toggle={() => {
              setmodal(!modal)
            }}
          >
            Order Details
          </ModalHeader>
          <ModalBody>
            <p className="mb-2">
              Product id: <span className="text-primary">#SK2540</span>
            </p>
            <p className="mb-4">
              Billing Name: <span className="text-primary">Neal Matthews</span>
            </p>

            <div className="table-responsive">
              <Table className="table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage1} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Wireless Headphone (Black)
                        </h5>
                        <p className="text-muted mb-0">$ 225 x 1</p>
                      </div>
                    </td>
                    <td>$ 255</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div>
                        <img src={modalimage2} alt="" className="avatar-sm" />
                      </div>
                    </th>
                    <td>
                      <div>
                        <h5 className="text-truncate font-size-14">
                          Hoodie (Blue)
                        </h5>
                        <p className="text-muted mb-0">$ 145 x 1</p>
                      </div>
                    </td>
                    <td>$ 145</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Sub Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Shipping:</h6>
                    </td>
                    <td>Free</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <h6 className="m-0 text-end">Total:</h6>
                    </td>
                    <td>$ 400</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              color="secondary"
              onClick={() => {
                setmodal(!modal)
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
