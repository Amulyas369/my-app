import TextFieldComp from "./TextFieldComp";

const LoyaltyProgramComponent = () => {
  return (
    <div className="account-settings ">
      <div className="borderCurved">
        <TextFieldComp
          fieldLabel="Earnings: "
          Amount=""
          fieldValue="Per RM"
          fieldType="text"
        />
      </div>
      {/* <div className="borderNone">
        <EditableField
          fieldLabel="Points Per Spend"
          fieldValue="Points Per Spend"
          fieldType="text"
        />
      </div>
      <div className="borderRadiusBottom borderNone">
        <EditableField
          fieldLabel="Conversion To Wallet Per Point"
          fieldValue="Conversion To Wallet Per Point"
          fieldType="text"
        />
      </div> */}
    </div>
  );
};

export default LoyaltyProgramComponent;
