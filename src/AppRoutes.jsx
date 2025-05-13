import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Articles from "./components/Articles";
import Books from "./components/Books";
import Photos from "./components/Photos";
import Videos from "./components/Videos";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";

import AdminLogin from "./components/Admin/AdminLogin";
import Logout from "./components/Admin/Logout";
import PrivateRoute from "./components/Admin/PrivateRoute";
import DashBoardLayout from "./components/Admin/DashBoardLayout";
import Dashboard from "./components/Admin/Dashboard";
import Banner from "./components/Admin/Customize/Banner";
import SourceBanner from "./components/Admin/Customize/SourceBanner";
import Offices from "./components/Admin/Office/Offices";
import User from "./components/Admin/User/User";
import BlogList from "./components/Admin/Blog/BlogList";
import AddBlog from "./components/Admin/Blog/AddBlog";
import EditBlog from "./components/Admin/Blog/EditBlog";
import PhotoGalleryList from "./components/Admin/PhotoGallery/PhotoGalleryList";
import PhotoList from "./components/Admin/PhotoGallery/PhotoList";
import AddEditPhoto from "./components/Admin/PhotoGallery/AddEditPhoto";
import VideoGalleryList from "./components/Admin/VideoGallery/VideoGalleryList";
import VideoList from "./components/Admin/VideoGallery/VideoList";
import AddEditVideo from "./components/Admin/VideoGallery/AddEditVideo";
import MediaCategoryList from "./components/Admin/Media/MediaCategoryList";
import MediaList from "./components/Admin/Media/MediaList";
import AddEditMedia from "./components/Admin/Media/AddEditMedia";
import PhotoListUi from "./components/PhotoGallery/PhotoListUi";
import VideoListUi from "./components/VideoGalleryUi/VideoListUi";
import MediaCard from "./components/MediaCard";

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<DashBoardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="banner" element={<Banner />} />
            <Route path="sourcebanner" element={<SourceBanner />} />
            <Route path="offices" element={<Offices />} />
            <Route path="user" element={<User />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/add" element={<AddBlog />} />
            <Route path="blog/edit/:blogId" element={<EditBlog isEdit />} />

            <Route path="photo-gallery" element={<PhotoGalleryList />} />
            <Route path="photo-gallery/:category" element={<PhotoList />} />
            <Route path="photo-gallery/add/:category" element={<AddEditPhoto />} />
            <Route path="photo-gallery/edit/:photoId" element={<AddEditPhoto />} />

            <Route path="video-gallery" element={<VideoGalleryList />} />
            <Route path="video-gallery/:id" element={<VideoList />} />
            <Route path="video-gallery/:id/add" element={<AddEditVideo />} />
            <Route path="video-gallery/edit/:videoId" element={<AddEditVideo />} />

            <Route path="media-gallery" element={<MediaCategoryList />} />
            <Route path="media-gallery/:mediaCategory" element={<MediaList />} />
            <Route path="media-gallery/add/:mediaCategory" element={<AddEditMedia />} />
            <Route path="media-gallery/edit/:mediaId" element={<AddEditMedia />} />
          </Route>
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/books" element={<Books />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/photos/:category" element={<PhotoListUi />} />
        <Route path="/videos/:category" element={<VideoListUi />} />
        <Route path="/media/:Id" element={<MediaCard />} />



        <Route path="/videos" element={<Videos />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:blogId" element={<BlogDetail />} />
      </Routes>

      {!isAdminRoute && <Footer className="fixed bottom-0 w-full bg-black text-white" />}
    </>
  );
};

export default AppRoutes;
