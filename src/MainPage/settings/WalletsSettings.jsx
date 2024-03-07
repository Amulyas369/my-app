import { Col } from "react-bootstrap";
import CheckboxComponent from "./CheckboxComponent";
import ConversionCoins from "./ConversionCoins";

const WalletsComponent = () => {
  return (
    <div className="account-settings  ">
      <div className="borderRadiusTop borderColor borderNone" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '16px', height: '90px'}}>
        <Col>
          <CheckboxComponent
            fieldLabel="Products"
            initialValue={true}
          />
        </Col>
        <Col>
          <CheckboxComponent
            fieldLabel="Services"
            initialValue={true}          
          />
        </Col>
      </div>
      <div className="borderRadiusBottom ">
        <ConversionCoins
          fieldLabel="10"
          fieldValue="10 "
          fieldType="text"
        />
      </div>
          </div>
  );
};

export default WalletsComponent;
