import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import { Button } from "reactstrap"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  let history = useHistory()

  const logout = () => {
    localStorage.clear()
    history.push("/logout")
  }

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var Roles = data?.rolesAndPermission[0]

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            {Roles?.Dashview == true || Roles?.accessAll == true ? (
              <li>
                <Link to="/dashboard">
                  <i className="bx bx-home-circle"></i>
                  <span>{props.t("Dashboard")}</span>
                </Link>
              </li>
            ) : (
              ""
            )}
            {/* <li>
              {Roles?.categoryView == true ||
              Roles?.campanyproView == true ||
              Roles?.accessAll == true ? (
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-store-alt"></i>
                  <span>{props.t("Company Product")}</span>
                </Link>
              ) : (
                ""
              )}
              <ul className="sub-menu">
                {Roles?.categoryView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/productcat">{props.t("Category")}</Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.campanyproView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/companyproduct">
                      {props.t("Company Product")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>
            {Roles?.productsView == true || Roles?.accessAll == true ? (
              <li>
                <Link to="/products">
                  <i className="bx bx-cart-alt"></i>
                  <span>{props.t("Products")}</span>
                </Link>
              </li>
            ) : (
              ""
            )} 
 */}
            <li>
              {Roles?.departementView == true ||
              Roles?.rolesAndPermissionView == true ||
              Roles?.staffView == true ||
              Roles?.accessAll == true ? (
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-slider-alt"></i>
                  <span>{props.t("Staff Management")}</span>
                </Link>
              ) : (
                ""
              )}
              <ul className="sub-menu">
                {Roles?.departementView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/departments">{props.t("Department")}</Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.rolesAndPermissionView == true ||
                Roles?.accessAll == true ? (
                  <li>
                    <Link to="/rolesandpermissions">
                      {props.t("Roles & Permissions")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.staffView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/staff">{props.t("Staff")}</Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>
           
            
            <li>
              {Roles?.userView == true ||
              Roles?.userView == true ||
              Roles?.userView == true ||
              Roles?.accessAll == true ? (
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-user-circle"></i>
                  <span>{props.t("User Management")}</span>
                </Link>
              ) : (
                ""
              )}
              <ul className="sub-menu">
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/users">{props.t("Users")}</Link>
                  </li>
                ) : (
                  ""
                )}
               
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/blockedusers">
                      {props.t("Blocked Users")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/users_transaction">
                      {props.t("Transactions")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>

            <li>
              {Roles?.userView == true ||
              Roles?.userView == true ||
              Roles?.userView == true ||
              Roles?.accessAll == true ? (
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-customize"></i>
                  <span>{props.t("Ride Management")}</span>
                </Link>
              ) : (
                ""
              )}
              <ul className="sub-menu">
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/pendingrides">
                      {props.t("Pending Rides")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/runningrides">
                      {props.t("Running Rides")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/completedrides">
                      {props.t("Completed Rides")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.userView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/cancelledrides">
                      {props.t("Cancelled Rides")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>

            <li>
              {Roles?.withdrawrequest == true ||
              Roles?.holdrequest == true ||
              Roles?.approvedwithdraws == true ||
              Roles?.rejectedwithdraws == true ||
              Roles?.accessAll == true ? (
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-tone"></i>
                  <span>{props.t("Withdraw Management")}</span>
                </Link>
              ) : (
                ""
              )}
              <ul className="sub-menu">
                {Roles?.withdrawrequest == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/withdrawrequest">
                      {props.t("Requested")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.holdrequest == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/holdwithdraws">
                      {props.t("Hold")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.approvedwithdraws == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/approvedwithdraws">
                      {props.t("Approved")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.rejectedwithdraws == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/rejectedwithdraws">
                      {props.t("Rejected")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>


           
            {Roles?.bannerView == true || Roles?.accessAll == true ? (
              <li>
                <Link to="/banners">
                  <i className="bx bx-image-alt"></i>
                  <span>{props.t("Banners")}</span>
                </Link>
              </li>
            ) : (
              ""
            )}
            <li>
              {Roles?.termsView == true ||
              Roles?.privacyView == true ||
              Roles?.refundView == true ||
              Roles?.accessAll == true ? (
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-slider-alt"></i>
                  <span>{props.t("Settings")}</span>
                </Link>
              ) : (
                ""
              )}
              <ul className="sub-menu">
                {Roles?.termsView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/termsandconditions">
                      {props.t("Terms & Conditions")}
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {Roles?.privacyView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/privacy">{props.t("Privacy policy")}</Link>
                  </li>
                ) : (
                  ""
                )}
                {/* {Roles?.refundView == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/refering">{props.t("Refund Policy")}</Link>
                  </li>
                ) : (
                  ""
                )} */}
                 {Roles?.coinprice == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/admin_transaction">{props.t("Admin Transactions")}</Link>
                  </li>
                ) : (
                  ""
                )}
                 {Roles?.coinprice == true || Roles?.accessAll == true ? (
                  <li>
                    <Link to="/coinsvalue">{props.t("Charges")}</Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>
            {Roles?.bannerView == true || Roles?.accessAll == true ? (
              <li>
                <Link to="/ticketrise">
                <i className="dripicons-ticket"></i> 
                  <span>{props.t("Ticketrise")}</span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
