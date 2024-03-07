import BlockReservationComponent from "./BlockReservationComponent";
import BlockReservationDays from "./BlockReservationDays";

const BlockChainReservation = () => {
 
  return (
    <div className="account-settings ">
      <div className="borderRadiusTop borderNone ">
        <BlockReservationComponent
          fieldLabel="Block Timing"
        //   fieldValue="Enabled (Push, SMS) "
        //   fieldType="text"
        />
      </div>
       
      <div className="borderRadiusBottom  " style={{innerHeight: '100%'}}>
        <BlockReservationDays
          fieldLabel="Block Reservation Days"
                />
      </div>
    </div>
  );  
};

export default BlockChainReservation;
