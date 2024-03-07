import { Col } from "react-bootstrap";
import CheckboxComponent from "./CheckboxComponent";
// import EditableField from "./EditableFields";
// import ToggleComponent from "./ToggleComponent";
// import ValuesDropdown from "./ValuesDropdowm";
import CheckboxTxtFldComp from "./CheckboxTxtFldComponent";

const ReservationSettings = () => {
  // const reservationFeeOptions = [
  //   { value: "fixed", label: "Fixed" },
  //   { value: "Full fee", label: "Full fee" },
  // ];
  return (
    <div className="account-settings ">
      <div className="borderRadiusTop borderColor borderNone  " style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Col>
          <CheckboxComponent
            fieldLabel="Free Reservations"
            initialValue={true}
          />
        </Col>
        <Col>
          <CheckboxComponent
            fieldLabel="Table Selection"
            initialValue={true}
            // fieldValue="Enabled (Push, SMS) "
            // fieldType="text"
          />
        </Col>
      </div>
      <div className=" borderColor borderRadiusBottom  " style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }} >
        <CheckboxTxtFldComp 
        fieldLabel="Fixed Fee"
            initialValue={true}
                 />        
        </Col>
        <Col>
          <CheckboxComponent
            fieldLabel="Full Fee"
            initialValue={true}
                     />
        </Col>
      </div>
      {/* <div className=" borderNone">
        <ToggleComponent
          fieldLabel="Space Selection Enabled:"
          fieldValue="Enabled (Push, SMS) "
          fieldType="text"
        />
      </div> */}

      {/* <div className=" borderNone borderColor1  ">
        <ValuesDropdown
          fieldLabel="Reservation Fee Type"
          fieldValue={reservationFeeOptions}
          fieldType="dropdown"
          options={reservationFeeOptions}
        />
      </div> */}
      {/* <div className="borderRadiusBottom borderNone ">
        <EditableField
          fieldLabel="Reservation Fixed Fee"
          fieldValue="Reservation Fixed Fee"
          fieldType="text"
        />
      </div> */}
    </div>
  );
};

export default ReservationSettings;
