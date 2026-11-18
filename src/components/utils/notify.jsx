import { toast } from "react-toastify";

const notify = (message, type) => {
  switch (type) {
    case "error":
      toast.error(message, {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
      });
      break;
    case "success":
      toast.success(message, {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
      });
      break;
    default:
      toast.info(message, {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
      });
      break;
  }
};

export default notify;
