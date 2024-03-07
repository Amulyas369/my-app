import EditableField from "./EditableFields";

const Notifications = () => {
  return (
    <div className="account-settings  ">
      <div className="borderRadiusTop borderNone">
        <EditableField
          fieldLabel="Comments"
          fieldValue="Enabled (Push, SMS) "
          fieldType="text"
        />
      </div>
      <div className="borderNone">
        <EditableField
          fieldLabel="Tags"
          fieldValue="Disabled

          "
          fieldType="text"
        />
      </div>
      <div className="borderNone">
        <EditableField
          fieldLabel="Reminders
          "
          fieldValue="Enabled (Push, Email, SMS)"
          fieldType="text"
        />
      </div>
      <div className="borderRadiusBottom ">
        <EditableField
          fieldLabel="New orders
          "
          fieldValue="Enabled (Push, Email, SMS)
          "
          fieldType="text"
        />
      </div>
    </div>
  );
};

export default Notifications;
