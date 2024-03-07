import EditableField from "./EditableFields";

const GeneralSection = () => {
  return (
    <div className="account-settings ">
      <div className="borderRadiusTop borderNone">
        <EditableField
          fieldLabel="Name"
          fieldValue="Sean Ngu"
          fieldType="text"
        />
      </div>
      <div className="borderNone">
        <EditableField
          fieldLabel="Username"
          fieldValue="@seantheme
          "
          fieldType="text"
        />
      </div>
      <div className="borderNone">
        <EditableField
          fieldLabel="Phone"
          fieldValue="+1-202-555-0183"
          fieldType="text"
        />
      </div>
      <div className="borderNone">
        <EditableField
          fieldLabel="Email address
          "
          fieldValue="support@studio.com
          "
          fieldType="text"
        />
      </div>
      <div className="borderRadiusBottom ">
        <EditableField
          fieldLabel="Password"
          fieldValue="******"
          fieldType="text"
        />
      </div>

      {/* Repeat the above pattern for username, phone, email, and password */}
    </div>
  );
};

export default GeneralSection;
