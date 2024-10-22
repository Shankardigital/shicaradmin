import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
const Login = lazy(() => import("../pages/Authentication/Login"));
const Logout = lazy(() => import("../pages/Authentication/Logout"));
const Register = lazy(() => import("../pages/Authentication/Register"));
const ForgetPwd = lazy(() => import("../pages/Authentication/ForgetPassword"));
const Otp = lazy(() => import("../pages/Authentication/Otp"));
const Setpwd = lazy(() => import("../pages/Authentication/Setpwd"));

// Dashboard
const Dashboard = lazy(() => import("../pages/Dashboard/index"));
const UserProfile = lazy(() => import("../pages/Authentication/user-profile"));

// Shicar
const Users = lazy(() => import("pages/Admincomponents/Users"));
const Runningrides = lazy(() => import("pages/Admincomponents/Runningrides"));
const Requstedusers = lazy(() => import("pages/Admincomponents/Requstedusers"));
const Approvedusers = lazy(() => import("pages/Admincomponents/Approvedusers"));
const Rejectedusers = lazy(() => import("pages/Admincomponents/Rejectedusers"));
const Inactiveusers = lazy(() => import("pages/Admincomponents/Inactiveusers"));
const Userdetails = lazy(() => import("pages/Admincomponents/Userdetails"));
const Customers = lazy(() => import("pages/Admincomponents/Customers"));
const Banner = lazy(() => import("pages/Admincomponents/Event"));
const Banners = lazy(() => import("pages/Admincomponents/Banners"));
const Dishes = lazy(() => import("pages/Admincomponents/Dishes"));
const Products = lazy(() => import("pages/Admincomponents/Products"));
const Productcat = lazy(() => import("pages/Admincomponents/Productcat"));
const Companypoduct = lazy(() => import("pages/Admincomponents/Companypoduct"));
const Leads = lazy(() => import("pages/Admincomponents/Leads"));
const Faq = lazy(() => import("pages/Admincomponents/Faq"));
const Contact = lazy(() => import("pages/Admincomponents/Contact"));
const Termsandconditions = lazy(() => import("pages/Admincomponents/TermsandConditions"));
const Privacy = lazy(() => import("pages/Admincomponents/PrivacyPolicy"));
const Refering = lazy(() => import("pages/Admincomponents/ReferingPolicy"));
const Withdraw = lazy(() => import("pages/Admincomponents/Withdraw"));
const Customerdetails = lazy(() => import("pages/Admincomponents/Customerdetails"));
const Cities = lazy(() => import("pages/Admincomponents/Cities"));
const Customersrep = lazy(() => import("pages/Admincomponents/reports/Customer"));
const Agentpayout = lazy(() => import("pages/Admincomponents/reports/Agentpayout"));
const Transactions = lazy(() => import("pages/Admincomponents/reports/Transactions"));
const Aboutus = lazy(() => import("pages/Admincomponents/Aboutus"));

// Staff
const AddRoles = lazy(() => import("pages/Admincomponents/Staff/AddRoles"));
const Departments = lazy(() => import("pages/Admincomponents/Staff/Departments"));
const EditRoles = lazy(() => import("pages/Admincomponents/Staff/EditRoles"));
const RolesPremissions = lazy(() => import("pages/Admincomponents/Staff/RolesPremissions"));
const Staff = lazy(() => import("pages/Admincomponents/Staff/Staff"));
const Companyproductview = lazy(() => import("pages/Admincomponents/Companyproductview"));
const Ridedetails = lazy(() => import("pages/Admincomponents/Ridedetails"));

const Coinrequest = lazy(() => import("pages/Admincomponents/Withdrawmanagement/Coinrequest"));
const Coinhold = lazy(() => import("pages/Admincomponents/Withdrawmanagement/Coinhold"));
const Coinapproved = lazy(() => import("pages/Admincomponents/Withdrawmanagement/Coinapproved"));
const Coinrejected = lazy(() => import("pages/Admincomponents/Withdrawmanagement/Coinrejected"));

const Coinsvalue = lazy(() => import("pages/Admincomponents/Coinsvalue"));
const Usertranscation = lazy(() => import("pages/Admincomponents/Usertranscation"));
const Admintransaction = lazy(() => import("pages/Admincomponents/Admintransaction"));
const Ticketrise = lazy(() => import("pages/Admincomponents/Ticketrise"));
const Chat = lazy(() => import("pages/Admincomponents/Chat"));


const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  
  { path: "/users", component: Users },
  { path: "/blockedusers", component: Inactiveusers },
  { path: "/users_details", component: Userdetails },
  { path: "/users_transaction", component: Usertranscation },
  { path: "/admin_transaction", component: Admintransaction },

  { path: "/runningrides", component: Runningrides },
  { path: "/pendingrides", component: Requstedusers },
  { path: "/completedrides", component: Approvedusers },
  { path: "/cancelledrides", component: Rejectedusers },

  { path: "/customers", component: Customers },
  { path: "/customer_details", component: Customerdetails },
  { path: "/events", component: Banner },
  { path: "/banners", component: Banners },
  { path: "/dishes", component: Dishes },
  { path: "/products", component: Products },
  { path: "/productcat", component: Productcat },
  { path: "/companyproductview", component: Companyproductview },
  { path: "/ridedetails", component: Ridedetails },
  { path: "/companyproduct", component: Companypoduct },
  { path: "/leads", component: Leads },
  { path: "/faq", component: Faq },
  { path: "/contact", component: Contact },
  { path: "/termsandconditions", component: Termsandconditions },
  { path: "/privacy", component: Privacy },
  { path: "/refering", component: Refering },
  { path: "/withdraw", component: Withdraw },
  { path: "/cities", component: Cities },
  { path: "/agentpayout", component: Agentpayout },
  { path: "/transactions", component: Transactions },
  { path: "/aboutus", component: Aboutus },
  { path: "/departments", component: Departments },
  { path: "/addrole", component: AddRoles },
  { path: "/editroles", component: EditRoles },
  { path: "/rolesandpermissions", component: RolesPremissions },
  { path: "/staff", component: Staff },
  { path: "/customer_reports", component: Customersrep },
  { path: "/profile", component: UserProfile },
  { path: "/withdrawrequest", component: Coinrequest },
  { path: "/holdwithdraws", component: Coinhold },
  { path: "/approvedwithdraws", component: Coinapproved },
  { path: "/rejectedwithdraws", component: Coinrejected },
  { path: "/coinsvalue", component: Coinsvalue },
  { path: "/ticketrise", component: Ticketrise },
  { path: "/chat", component: Chat },

  { path: "/", exact: true, component: () => <Redirect to="/login" /> }
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/otp", component: Otp },
  { path: "/setpassword", component: Setpwd }
];

export { publicRoutes, authProtectedRoutes };
