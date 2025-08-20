import { useState } from "react";
import AddAwardHistory from "./AddAwardHistory";

const AwardAddSinglePopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  return (
    <>
    
        <AddAwardHistory/>
    </>
  );
};
export default AwardAddSinglePopup;
