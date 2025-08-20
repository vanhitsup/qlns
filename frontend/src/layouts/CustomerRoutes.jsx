import LoaderSpinner from "@/components/Loader/LoaderSpinner";
import ButtonHome from "@/eCommerce/Home/ButtonHome";
import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Page404 = lazy(() => import("@/components/StaticPages/404Page"));
const ForgetPassword = lazy(() => import("@/CustomerUI/ForgetPassword"));
const Login = lazy(() => import("@/CustomerUI/Login"));
const User = lazy(() => import("@/CustomerUI/User"));

const GetJobDetails = lazy(() =>
  import("@/components/HRM/Recruitment/JobDetails/GetJobDetails")
);
const ApplyJob = lazy(() =>
  import("@/components/HRM/Recruitment/JobDetails/ApplyJob")
);
const PasswordChange = lazy(() =>
  import("@/eCommerce/CommonSection/PasswordChange")
);
const Order = lazy(() => import("@/eCommerce/Order/Order"));

const RecruitmentHome = lazy(() =>
  import("@/components/HRM/Recruitment/JobDesk/RecruitmentHome")
);
const Register = lazy(() => import("@/CustomerUI/Register"));

const isLoggedIn = localStorage.getItem("isLogged");

const CustomerRoutes = [
  isLoggedIn ? <Route path="/" element={<Navigate to="/user" />} /> : null,
  <Route index element={<ButtonHome />} key={"index-customer"} />,
  <Route
    path="/login"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <Login />
      </Suspense>
    }
    key={"login/customer"}
  />,
  <Route
    path="/register"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <Register />
      </Suspense>
    }
    key={"register/customer"}
  />,

  <Route
    path="/*"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <Page404 />
      </Suspense>
    }
    key={"404"}
  />,
  <Route
    path="/forget-password"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <ForgetPassword />
      </Suspense>
    }
    key={"forget-password"}
  />,
  <Route
    path="/forget-password/:token"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <PasswordChange />
      </Suspense>
    }
    key={"forget-password-token"}
  />,
  <Route element={<PrivateRoute />} key={"private"}>
    <Route
      path="/user"
      element={
        <Suspense fallback={<LoaderSpinner />}>
          <User />
        </Suspense>
      }
      key={"user-customer"}
    />

    <Route
      path="/order/:id"
      element={
        <Suspense fallback={<LoaderSpinner />}>
          <Order />
        </Suspense>
      }
      key={"order"}
    />
  </Route>,

  //===============Job Recruitment Route ===================
  // ==================This is a public Route===============
  <Route
    path="/recruitment"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <RecruitmentHome />
      </Suspense>
    }
    key={"recruitment"}
  />,
  <Route
    path="/recruitment/:id"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <GetJobDetails />
      </Suspense>
    }
    key={"recruitment"}
  />,
  <Route
    path="/recruitment/apply/:id"
    element={
      <Suspense fallback={<LoaderSpinner />}>
        <ApplyJob />
      </Suspense>
    }
    key={"recruitment"}
  />,

  // <Route path='/search' element={<MainSearch />} />
  // <Route path='/products/:id' element={<SingleProduct />} />
  // <Route path='/category/:name' element={<CategorySingle />} />
  // <Route path='/brand/:name' element={<BrandSingle />} />

  //  <Route element={<PrivateRoute />}>
  //   <Route path='/user' element={<UserDashboard />}>
  //     <Route path='/user' element={<MyAccount />} />
  //     <Route path='address' element={<Address />} />
  //     <Route path='my-order' element={<MyOrder />} />
  //     <Route path='my-returns' element={<MyReturns />} />
  //     <Route path='wishlist' element={<Wishlist />} />
  //   </Route>

  //   <Route path='/order/:id' element={<Order />} />
  //   <Route path='/review-rating/:id' element={<ReviewRating />} />
  //   <Route path='/proceed-to-checkout' element={<ProceedToCheckout />} />
  //   <Route path='/proceed-to-checkout/payment' element={<Payment />} />
  //   <Route
  //     path='proceed-to-checkout/payment/:name'
  //     element={<ProceedSuccess />}
  //   />
  // </Route>
];
export default CustomerRoutes;
