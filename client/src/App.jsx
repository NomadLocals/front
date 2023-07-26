import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  SignUp,
} from "@clerk/clerk-react";
// Importar componentes:
import Home from "./components/views/Home.jsx";
import CreateAccountForm from "./components/views/CreateAccountForm.jsx";
import CreateAccountPlace from "./components/views/CreateAccountPlace.jsx";
import ActivityForm from "./components/views/ActivityForm.jsx";
import Profile from "./components/views/Profile.jsx";
import Detail from "./components/views/Detail.jsx";
import FilterActivities from "./components/views/Filter.jsx";
import Landing from "./components/views/Landing.jsx";
import Chat from "./components/views/Chat.jsx";
import ChatPersonal from "./components/views/ChatPersonal.jsx";
import About from "./components/views/About.jsx";
import Settings from "./components/views/Settings.jsx";
import Loading from "./components/views/Loading.jsx";
import EventReview from "./components/views/ReviewEvents.jsx";
import UserReview from "./components/views/ReviewUser.jsx";
import OthersDetail from "./components/views/OthersDetail.jsx";
import Report from "./components/views/Report.jsx";
import ReportUser from "./components/views/ReportUser.jsx";
import NotFound from "./components/views/NotFound";
import Developer from "./components/views/Developer.jsx";
//Componentes administrador:
import AllUsers from "./components/AdminComponents/AllUsers.jsx";
import AdminHome from "./components/AdminComponents/AdminHome.jsx";
import EventsReports from "./components/AdminComponents/EventsReports.jsx";
import AllEvents from "./components/AdminComponents/AllEvents.jsx";
import UsersReports from "./components/AdminComponents/UsersReports.jsx";
import UserReports from "./components/AdminComponents/UserReports.jsx";
import UsersReviews from "./components/AdminComponents/UsersReviews.jsx";
import EventsReviews from "./components/AdminComponents/EventsReviews.jsx";
import UserReviews from "./components/AdminComponents/UserReviews.jsx";
import EventReports from "./components/AdminComponents/EventReports.jsx";
import EventReviewsAdmin from "./components/AdminComponents/EventReviewsAdmin.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/reviewevent/:id" element={<EventReview />} />
        <Route path="/reviewuser/:id" element={<UserReview />} />
        <Route path="/report/:id" element={<Report />} />
        <Route path="/reportuser/:id" element={<ReportUser />} />
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-account1" element={<CreateAccountForm />} />
        <Route path="/create-account2" element={<CreateAccountPlace />} />
        <Route path="/home/detail/:id" element={<Detail />} />
        <Route path="/activities" element={<FilterActivities />} />
        <Route path="/activity-form" element={<ActivityForm />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/others/:id" element={<OthersDetail />} />
        <Route path="/chat/Personal" element={<ChatPersonal />} />
        <Route path="/activities/detail/:id/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/developer" element={<Developer />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/allEvents" element={<AllEvents />} />
        <Route path="/admin/eventsReports" element={<EventsReports />} />
        <Route path="/admin/usersReports" element={<UsersReports />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/users/reports/:id" element={<UserReports />} />
        <Route path="/admin/users/reviews/:id" element={<UserReviews />} />

        <Route path="/admin/eventsReviews" element={<EventsReviews />} />
        <Route path="/admin/usersReviews" element={<UsersReviews />} />

        <Route path="/admin/events/allReports/:id" element={<EventReports />} />
        <Route
          path="/admin/events/allReviews/:id"
          element={<EventReviewsAdmin />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
