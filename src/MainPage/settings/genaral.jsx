import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import GeneralSection from "./General";
import Notifications from "./Notifications";
import ReservationSettings from "./Reservation";
import BlockChainReservation from "./BlockReservationTiming";
import LoyaltyProgramComponent from "./LoyaltyProgramSettings";
import AdvertisementSettings from "./AdvertisementSettings";
import CouponsComponent from "./CouponsSettings";
import WalletsComponent from "./WalletsSettings";

// eslint-disable-next-line react/prop-types
const Toggle = ({ isEnabled, toggle }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isEnabled} onChange={toggle} />
      <span className="slider round"></span>
    </label>
  );
};

const GeneralSettings = () => {
  const [isGeneralEnabled, setIsGeneralEnabled] = useState(true);
  const [isNotifEnabled, setIsNotifEnabled] = useState(true);
  const [isReservEnabled, setIsReservEnabled] = useState(true);
  const [isBlockEnabled, setIsBlockEnabled] = useState(true);
  const [isLoyalityEnabled, setIsLoyalityEnabled] = useState(true);
  const [isCouponsEnabled, setIsCouponsEnabled] = useState(true);
  const [isWalletsEnabled, setIsWalletsEnabled] = useState(true);
  const [isAdsEnabled, setIsAdsEnabled] = useState(true);

  const toggleGeneral = () => {
    setIsGeneralEnabled(!isGeneralEnabled);
  };
  const toggleNotifiction = () => {
    setIsNotifEnabled(!isNotifEnabled);
  };
  const toggleReservations = () => {
    setIsReservEnabled(!isReservEnabled);
  };
  const toggleBlock = () => {
    setIsBlockEnabled(!isBlockEnabled);
  };
  const toggleLoyalityPoints = () => {
    setIsLoyalityEnabled(!isLoyalityEnabled);
  };
  const toggleCoupons = () => {
    setIsCouponsEnabled(!isCouponsEnabled);
  };
  const toggleWallets = () => {
    setIsWalletsEnabled(!isWalletsEnabled);
  };
  const toggleAds = () => {
    setIsAdsEnabled(!isAdsEnabled);
  };
  return (
    <div className="page-wrapper customCenter">
      <Row className="mb-4" style={{ justifyContent: "center" }}>
        {/* General Section */}
        <Col md={6} className="mb-4">
          <div
            className="page-header headDef "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div className="page-title">
              <h4 className="subHeadings">General</h4>
              <h6>
                View and update your general account information and settings.
              </h6>
            </div>
            <Toggle isEnabled={isGeneralEnabled} toggle={toggleGeneral} />
          </div>
          {isGeneralEnabled && <GeneralSection />}
        </Col>

        {/* Notifications Section */}
        <Col md={6} className="mb-4">
          <div
            className="page-header headDef "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div className="page-title">
              <h4 className="subHeadings">Notifications</h4>
              <h6>Enable or disable what notifications you want to receive.</h6>
            </div>
            <Toggle isEnabled={isNotifEnabled} toggle={toggleNotifiction} />
          </div>
          {isNotifEnabled && <Notifications />}
        </Col>

        {/* Reservation Settings Section */}
        <Col md={6} className="mb-4">
          <div
            className="page-header headDef "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div className="page-title">
              <h4 className="subHeadings">Reservation Settings</h4>
              <h6>Enable or disable what notifications you want to receive.</h6>
            </div>
            <Toggle isEnabled={isReservEnabled} toggle={toggleReservations} />
          </div>
          {isReservEnabled && <ReservationSettings />}
        </Col>

        {/* Blackout Settings Section */}
        <Col md={6} className="mb-4">
          <div
            className="page-header headDef "
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div className="page-title">
              <h4 className="subHeadings">Blackout Settings</h4>
              <h6>
                Enable or disable what Block Reservations you want to receive.
              </h6>
            </div>
            <Toggle isEnabled={isBlockEnabled} toggle={toggleBlock} />
          </div>
          {isBlockEnabled && <BlockChainReservation />}
        </Col>

        {/* Loyalty Program Settings Section */}
        <Col md={6} className="mb-4">
          <div>
            <div
              className="page-header headDef "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div className="page-title">
                <h4 className="subHeadings">Loyalty Program Settings</h4>
                <h6>
                  Enable or disable what Loyality Points you want to receive.
                </h6>
              </div>
              <Toggle
                isEnabled={isLoyalityEnabled}
                toggle={toggleLoyalityPoints}
              />
            </div>
            {isLoyalityEnabled && <LoyaltyProgramComponent />}
          </div>
          {/*Coupons Settings Section */}
          <div>
            <div
              className="page-header headDef "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div className="page-title">
                <h4 className="subHeadings">Coupons Settings</h4>
                <h6>Enable or disable what Coupons you want to receive.</h6>
              </div>
              <Toggle isEnabled={isCouponsEnabled} toggle={toggleCoupons} />
            </div>
            {isCouponsEnabled && <CouponsComponent />}
          </div>
        </Col>
        {/*Wallets Settings Section */}
        <Col md={6} className="mb-4">
          <div>
            <div
              className="page-header headDef "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div className="page-title">
                <h4 className="subHeadings">Wallets Settings</h4>
                <h6>Enable or disable what Wallets you want to receive.</h6>
              </div>
              <Toggle isEnabled={isWalletsEnabled} toggle={toggleWallets} />
            </div>
            {isWalletsEnabled && <WalletsComponent />}
          </div>
          <div>
            <div
              className="page-header headDef "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div className="page-title">
                <h4 className="subHeadings">Advertisement Settings</h4>
                <h6>
                  Enable or disable what Advertisements you want to receive.
                </h6>
              </div>
              <Toggle isEnabled={isAdsEnabled} toggle={toggleAds} />
            </div>
            {isAdsEnabled && <AdvertisementSettings />}
          </div>
        </Col>
        {/* Advertisement Settings Section */}
      </Row>
    </div>
  );
};

export default GeneralSettings;
