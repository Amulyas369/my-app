import ToggleComponent from "./ToggleComponent";

const CouponsComponent = () => {
  return (
    <div className="account-settings  ">
      
      <div className="borderCurved " style={{height: '90px'}}>
        <ToggleComponent
          fieldLabel="Coupons Enabled"
          fieldValue="Coupons Enabled "
          fieldType="text"
        />
      </div>
    </div>
  );
};

export default CouponsComponent;
