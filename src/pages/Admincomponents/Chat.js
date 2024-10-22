import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  CardBody,
  Form,
  Modal,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { useHistory } from "react-router-dom"
import { isEmpty, map } from "lodash"
import io from "socket.io-client"
import axios from "axios"
import { imgUrl } from "Baseurls"

// import gig from "../../assets/images/loders.gif"
import toast, { Toaster } from "react-hot-toast"

// let socket = io.connect("http://194.238.19.189:5003")

const socket = io("https://api.actinplus.com", {
  transports: ["polling"],
})

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  const [messageBox, setMessageBox] = useState(null)

  const [Customer, setCustomer] = useState([])

  const [Chat, setChat] = useState([])

  const [Chats, setChats] = useState([])

  const [ids, setids] = useState([])

  const [Ticketcode, setTicketcode] = useState([])

  const history = useHistory()

  useEffect(() => {
    if (!isEmpty(Chat)) scrollToBottom()
  }, [Chat])

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000
    }
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token

  const Actinid = sessionStorage.getItem("chatid")

  const ticketid = sessionStorage.getItem("ticketid")

  const joinRoom = room => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const getChatss = async () => {
    try {
      const chatResponse = await axios.post(
        `https://api.actinplus.com/v1/actinapi/admin/chatmain/chat/${Actinid}`,
        { ticketId: ticketid },
        { headers: { Authorization: `Bearer ${datas}` } }
      )

      setCustomer(chatResponse.data.chat.participants[0])
      setids(chatResponse.data.room)
      setTicketcode(chatResponse.data.displayTicketid)
      joinRoom(chatResponse.data.room)
      setChats(chatResponse.data.userTicketStatus)
      setIsLoading(false)
      const messageResponse = await axios.post(
        `https://api.actinplus.com/v1/actinapi/admin/chatmain/get`,
        { ticketId: ticketid },
        { headers: { Authorization: `Bearer ${datas}` } }
      )
      setChat(messageResponse.data.data)
    } catch (error) {
      console.error("Error fetching chat:", error)
    }
  }

  useEffect(() => {
    getChatss()
  }, [])

  const getTimeString = () => {
    const now = new Date()

    const timeString = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })

    const dateString = now
      .toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")

    return { date: dateString, time: timeString }
  }

  const { date, time } = getTimeString()

  useEffect(() => {
    socket.on("receive_message", data => {
      const updatedMsgDatad = { ...data }
      setChat(list => [...list, updatedMsgDatad])
    })
  }, [socket])

  // useEffect(() => {
  //   socket.on("receive_message", data => {
  //     const updatedMsgData = { ...data };
  //     if (updatedMsgData.room === ids) { // Check if the message belongs to the current room
  //       setChat(list => [...list, updatedMsgData]);
  //     }
  //   });

  //   return () => {
  //     // Clean up the socket event listener when the component unmounts
  //     socket.off("receive_message");
  //   };
  // }, [socket, ids]); // Include 'ids' as a dependency

  const onKeyPress = e => {
    const { key, value } = e
    if (key === "Enter") {
      setCurrentMessage(value)
      sendMessage()
    }
  }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: ids,
        time: time,
        date: date,
        type: "admin",
        message: currentMessage,
      }
      await socket.emit("send_message", messageData)

      const msgdata = messageData
      setChat(list => [...list, msgdata])

      sendMessage1()
      setCurrentMessage("")
    }
  }

  const sendMessage1 = () => {
    axios
      .post(
        `https://api.actinplus.com/v1/actinapi/admin/chatmain/store`,
        {
          room: ids,
          time: time,
          date: date,
          type: "admin",
          ticketId: ticketid,
          message: currentMessage,
        },
        { headers: { Authorization: `Bearer ${datas}` } }
      )
      .then(response => {
        getChatss()
        setCurrentMessage("")
      })
      .catch(error => {
        console.error("Error sending message:", error)
      })
  }

  const [zones, setZones] = useState([])

  useEffect(() => {
    GetZones()
  }, [])

  const GetZones = () => {
    var token = datas
    axios
      .post(
        imgUrl.GetStaff,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          setZones(res.data.staff)
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }

  const [modal_small, setmodal_small] = useState(false)

  function tog_small() {
    setmodal_small(!modal_small)
  }

  const [form1, setform1] = useState([])

  const getpopup = () => {
    tog_small()
  }

  const handleChange1 = e => {
    let myUser = { ...form1 }
    myUser[e.target.name] = e.target.value
    setform1(myUser)
  }

  const handleSubmit1 = e => {
    e.preventDefault()
    Editstate()
  }

  const Editstate = () => {
    var token = datas

    const dataArray = {
      staffId: form1.personId,
      ticketId: ticketid,
    }

    axios
      .post(imgUrl.AddUserSupport, dataArray, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(
        res => {
          if (res.status === 200) {
            getChatss()
            toast(res.data.message)
            setmodal_small(false)
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast(error.response.data.message)
          }
        }
      )
  }
  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Shicar" breadcrumbItem="Chat" />
          {/* {isLoading == true ? (
            <>
              <div
                style={{ zIndex: "9999999999999", height: "420px" }}
                className="text-center mt-5 pt-5"
              >
                <img src={gig} height="140px"></img>
                <div>Loading......</div>
              </div>
            </>
          ) : ( */}
          <>
            <Row>
              <Col xl="12">
                <Button
                  onClick={history.goBack}
                  className="mb-3  m-1 "
                  style={{ float: "right" }}
                  color="primary"
                >
                  <i className="far fa-arrow-alt-circle-left"></i>
                  Back
                </Button>{" "}
                {Chats == "resolved" ? (
                  <></>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        getpopup()
                      }}
                      className="mb-3  m-1 "
                      style={{ float: "right" }}
                      color="warning"
                    >
                      <i className="bx bx-edit" /> Update Status
                    </Button>
                  </>
                )}
              </Col>
            </Row>
            <Row className="mb-5">
              <Col lg="12">
                <div className="d-lg-flex">
                  <div className="chat-leftsidebar me-lg-4">
                    <Card>
                    <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="12">
                      <div className="text-primary p-3 mb-5"></div>
                    </Col>
                  </Row>
                </div>
                      <CardBody>
                        <div>
                        <div className="profile-user-wid">
                    
                      </div>
                          <ul className="list-unstyled vstack mb-0">
                          <div className="text-center">
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                            // src={imgUrl + form.profilePic}
                            alt=""
                            className="img-thumbnail rounded-circle"
                          />
                            <br />
                              <b>Shanker</b>
                              <br />
                              <b>Ticket Id: #SC35466</b>
                        </div>
                        
                           
                            <li>
                              <div className="d-flex mt-3">
                                <i className="bx bxs-buildings font-size-18 text-primary"></i>
                                <div className="ms-3">
                                  <h6 className="mb-1 fw-semibold">Name: </h6>
                                  <span className="text-muted">Shanker</span>
                                </div>
                              </div>
                            </li>
                            
                            <li>
                              <div className="d-flex mt-3">
                                <i className="bx bx-money font-size-18 text-primary"></i>
                                <div className="ms-3">
                                  <h6 className="mb-1 fw-semibold">Email:</h6>
                                  <span className="text-muted">
                                    shanker@gmail.com
                                  </span>
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="d-flex  mt-3">
                                <i className="bx bxs-home-circle font-size-18 text-primary"></i>
                                <div className="ms-3">
                                  <h6 className="mb-1 fw-semibold">
                                    Contact Number:
                                  </h6>
                                  6894655132
                                </div>
                              </div>
                            </li>

                            <li>
                              <div className="d-flex  mt-3">
                                <i className="bx bx-bookmark font-size-18 text-primary"></i>
                                <div className="ms-3">
                                  <h6 className="mb-1 fw-semibold">Status :</h6>
                                  <span className="text-success">active</span>
                                </div>
                              </div>
                            </li>

                          </ul>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <div className="w-100 user-chat">
                    <Card>
                      <div className="p-4 border-bottom ">
                        <Row>
                          <Col md="12">
                            <h5 className="font-size-15 mb-1">
                              <span className="text-danger">Reason: </span>
                            </h5>
                            <span>
                              {" "}
                              I'm having trouble with automatic withdrawals.
                            </span>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <div className="chat-conversation p-3">
                          <ul className="list-unstyled">
                            <PerfectScrollbar
                              style={{ height: "360px" }}
                              containerRef={ref => setMessageBox(ref)}
                            >
                              <li>
                                <div className="chat-day-title">
                                  <span className="title">Today</span>
                                </div>
                              </li>
                              {Chat &&
                                map(Chat, message => (
                                  <li
                                    key={message.id}
                                    className={
                                      message.type === "admin" ? "right" : ""
                                    }
                                  >
                                    <div className="conversation-list">
                                      <div className="ctext-wrap">
                                        <div
                                          className="conversation-name"
                                          style={{ fontSize: "10px" }}
                                        >
                                          {message.type == "admin" ? (
                                            <>Me</>
                                          ) : (
                                            <>User</>
                                          )}
                                        </div>
                                        <p style={{ color: "black" }}>
                                          {message.message}
                                        </p>
                                        <p
                                          className="chat-time mb-0"
                                          style={{
                                            color: "green",
                                            fontSize: "10px",
                                          }}
                                        >
                                          <i className="bx bx-calendar align-middle me-1"></i>
                                          {message.date} /
                                          <i className="bx bx-time-five align-middle me-1"></i>
                                          {message.time}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </PerfectScrollbar>
                          </ul>
                        </div>
                        <div className="p-3 chat-input-section">
                          {Roles?.chatEdit === true ||
                          Roles?.accessAll === true ? (
                            <>
                              {Chats == "resolved" || Chats == "callback" ? (
                                <>
                                  <div className="pb-5"></div>
                                </>
                              ) : (
                                <>
                                  <Row>
                                    <Col>
                                      <div className="position-relative">
                                        <input
                                          type="text"
                                          value={currentMessage}
                                          required
                                          onKeyPress={onKeyPress}
                                          onChange={e =>
                                            setCurrentMessage(e.target.value)
                                          }
                                          className="form-control chat-input"
                                          placeholder="Enter Message..."
                                        />
                                      </div>
                                    </Col>
                                    <Col className="col-auto">
                                      <Button
                                        type="button"
                                        color="primary"
                                        onClick={sendMessage}
                                        className="btn btn-primary btn-rounded chat-send w-md "
                                      >
                                        <span className="d-none d-sm-inline-block me-2">
                                          Send
                                        </span>
                                        <i className="mdi mdi-send" />
                                      </Button>
                                    </Col>
                                  </Row>
                                </>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>

            <Modal
              size="md"
              isOpen={modal_small}
              toggle={() => {
                tog_small()
              }}
              centered
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="mySmallModalLabel">
                  Update Status
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
                  <Col md={12}>
                    <div className="mb-3">
                      <label> Staff</label>{" "}
                      <span className="text-danger">*</span>
                      <select
                        value={form1.personId}
                        name="personId"
                        onChange={e => {
                          handleChange1(e)
                        }}
                        required
                        className="form-select"
                      >
                        <option value="">Select Status</option>
                        <option value="requested">Requested</option>
                        <option value="solved">Solved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </Col>

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
          </>
          {/* )} */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Chat
