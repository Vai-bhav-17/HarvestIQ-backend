import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const Sidebar = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#294B29">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link
            to="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            HarvestIQ
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link
              to="/"
              className="text-decoration-none"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </Link>
            <Link
              to="/Crop"
              className="text-decoration-none"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="seedling">
                Crop Recommendation
              </CDBSidebarMenuItem>
            </Link>
            <Link
              to="/disease"
              className="text-decoration-none"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="leaf">
                Disease Detection
              </CDBSidebarMenuItem>
            </Link>
            <Link
              to="/fertilizer"
              className="text-decoration-none"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="flask">
                Fertilizer Suggestion
              </CDBSidebarMenuItem>
            </Link>
            <Link
              to="/price"
              className="text-decoration-none"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="dollar-sign">
                Price Prediction
              </CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
};

export default Sidebar;
