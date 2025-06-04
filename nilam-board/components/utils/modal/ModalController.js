import React from "react";
import PlayerSoldModal from "./player-sold-modal/PlayerSoldModal";
import { getModal, getModalProps } from "@/redux/feature/modal/modalSlice";
import { useSelector } from "react-redux";
import EditPlayerModal from "./edit-player-modal/EditPlayerModal";

const modalList = {
  PlayerSoldModal,
  EditPlayerModal,
};

function ModalController() {
  const modalType = useSelector(getModal);
  const modalProps = useSelector(getModalProps);
  let modalToBeShown = null;

  if (modalType) {
    const ModalComponent = modalList[modalType];
    modalToBeShown = <ModalComponent {...modalProps} />;
  }
  return <div>{modalToBeShown}</div>;
}

export default ModalController;
