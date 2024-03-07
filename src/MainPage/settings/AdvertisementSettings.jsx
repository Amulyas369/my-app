import ToggleComponent from "./ToggleComponent";

const AdvertisementSettings = () => {
  return (
    <div className="account-settings  ">
      <div className=" borderCurved" style={{height: '90px'}}>
        <ToggleComponent
          fieldLabel="Ads Enabled
        "
          fieldValue="Ads Enabled
        "
          fieldType="text"
        />
      </div>
    </div>
  );
};

export default AdvertisementSettings;
