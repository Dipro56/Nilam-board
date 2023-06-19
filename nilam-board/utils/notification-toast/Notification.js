import { toast } from 'react-hot-toast';

let notifications = {};
notifications.success = (message, position) => {
  console.log(message, position);
  toast.success(message, {
    position: position || 'top-right',
    autoClose: 3000,
  });
};

notifications.error = (message, position) => {
  toast.error(message, {
    position: position || 'top-right',
    autoClose: 3000,
  });
};

export default notifications;
