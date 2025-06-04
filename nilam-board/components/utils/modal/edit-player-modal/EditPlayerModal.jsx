import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { closeModal, getModalProps } from "@/redux/feature/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import playerService from "@/service/playerService";
import notifications from "@/utils/notification-toast/Notification";
import { getPlayerList } from "@/redux/feature/player/playerSlice";

function EditPlayerModal() {
  const dispatch = useDispatch();
  const editPlayer = useSelector(getModalProps);

  // Local state for editable fields
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState("");
  const [type, setType] = useState("");

  // Initialize local state when modal opens or editPlayer changes
  useEffect(() => {
    if (editPlayer?.item) {
      setName(editPlayer.item.name || "");
      setPosition(editPlayer.item.position || "");
      setRating(editPlayer.item.rating || "");
      setType(editPlayer.item.type || "");
    }
  }, [editPlayer]);

  const fetchUpdatePlayer = async (playerId, updatedPlayer) => {
    let result = await playerService.updatePlayer(playerId, updatedPlayer);
    console.log("fetchUpdatePlayer", result);
    if (result?.status == 200) {
      notifications.success(
        result?.data?.message || "Player updated!",
        "top-right"
      );
      dispatch(getPlayerList());
      dispatch(closeModal());
    }
  };

  const fetchDeletePlayer = async (playerId) => {
    let result = await playerService.deletePlayer(playerId);
    console.log("fetchUpdatePlayer", result);
    if (result?.status == 200) {
      notifications.success(
        result?.data?.message || "Player updated!",
        "top-right"
      );
      dispatch(getPlayerList());
      dispatch(closeModal());
      window.location.href = "/player-list";
    }
  };

  const handleSubmit = () => {
    const updatedPlayer = {
      ...editPlayer.item,
      name,
      position,
      rating,
      type,
    };
    let playerId = updatedPlayer?._id;
    fetchUpdatePlayer(playerId, updatedPlayer);

    // TODO: dispatch an action or call API to save updated player
    // toast.success("Player updated!");
    // dispatch(closeModal());
  };

  const handleDelete = () => {
    let playerId = editPlayer?.item?._id;
    console.log("playerId", playerId, editPlayer);
    fetchDeletePlayer(playerId);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={Boolean(editPlayer)} onClose={handleClose}>
      <div className="w-full max-w-2xl max-h-full">
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Edit player</h3>
            <button
              onClick={handleClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block font-bold mb-1" htmlFor="name">
                Name:
              </label>
              <input
                id="name"
                type="text"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-bold mb-1" htmlFor="position">
                Position:
              </label>
              <input
                id="position"
                type="text"
                className="w-full border rounded px-3 py-2"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-bold mb-1" htmlFor="rating">
                Rating:
              </label>
              <input
                id="rating"
                type="number"
                min="0"
                max="99"
                className="w-full border rounded px-3 py-2"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-bold mb-1" htmlFor="type">
                Type:
              </label>
              <select
                id="type"
                className="w-full border rounded px-3 py-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="GK">GK</option>
                <option value="DEF">DEF</option>
                <option value="MID">MID</option>
                <option value="FWD">FWD</option>
              </select>
            </div>

            <div className="flex justify-center text-3xl font-bold my-5">
              <Image
                src={editPlayer?.item?.image || ""}
                alt="Player Image"
                width={300}
                height={300}
              />
            </div>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              onClick={handleDelete}
            >
              Delete Player
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </Dialog>
  );
}

export default EditPlayerModal;

// import React, { useState } from "react";
// import Dialog from "@material-ui/core/Dialog";
// import { closeModal, getModalProps } from "@/redux/feature/modal/modalSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";
// import axios from "axios";
// import notifications from "@/utils/notification-toast/Notification";
// import toast, { Toaster } from "react-hot-toast";
// import { getManagerList } from "@/redux/feature/manager/managerSlice";
// import { baseUrl } from "@/utils/config";

// function EditPlayerModal() {
//   const [isOpen, setIsOpen] = useState(true);
//   let dispatch = useDispatch();
//   let editPlayer = useSelector(getModalProps);

//   const handleSubmit = (editPlayer) => {
//     console.log("handle submit", editPlayer);
//   };

//   const handleClose = () => {
//     dispatch(closeModal());
//   };

//   return (
//     <Dialog open={isOpen} onClose={handleClose}>
//       {/* Content of your dialog */}
//       <div class="w-full max-w-2xl max-h-full">
//         <div class="bg-white rounded-lg shadow ">
//           <div class="flex items-start justify-between p-4 border-b rounded-t ">
//             <h3 class="text-xl font-semibold text-gray-900 ">Sell player</h3>
//             <button
//               onClick={handleClose}
//               type="button"
//               class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
//               data-modal-hide="defaultModal"
//             >
//               <svg
//                 aria-hidden="true"
//                 class="w-5 h-5"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clip-rule="evenodd"
//                 ></path>
//               </svg>
//               <span class="sr-only">Close modal</span>
//             </button>
//           </div>

//           <div class="p-6 ">
//             <div className=" text-xl font-bold">
//               <div>{editPlayer?.item?.name}</div>
//             </div>
//             <div className="text-sm font-bold my-2">
//               Position : {editPlayer?.item?.position}
//             </div>
//             <div className=" text-sm font-bold my-2">
//               Rating : {editPlayer?.item?.rating}
//             </div>

//             <div className="flex justify-center text-3xl font-bold my-5">
//               <Image
//                 src={editPlayer?.item?.image}
//                 alt="Example Image"
//                 width={300}
//                 height={300}
//               />
//             </div>
//           </div>

//           <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
//             <button
//               data-modal-hide="defaultModal"
//               type="button"
//               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
//               onClick={() => {
//                 handleSubmit(editPlayer);
//               }}
//             >
//               Submit
//             </button>
//             {/* <button
//               type="button"
//               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none"
//               onClose={handleSubmit}
//             >
//               Submit
//             </button> */}
//             <button
//               data-modal-hide="defaultModal"
//               type="button"
//               class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
//               onClick={handleClose}
//             >
//               Delete Player
//             </button>
//           </div>
//         </div>
//       </div>
//       <Toaster />
//     </Dialog>
//   );
// }

// export default EditPlayerModal;
