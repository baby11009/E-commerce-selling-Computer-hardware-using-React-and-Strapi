import { useParams, useNavigate } from "react-router-dom";

import request from "../../../utils/request"
import { useAuthContext } from "../../../apiService/Login/context/AuthContext";

const ConfirmEmail = () => {
  const { confirmToken } = useParams();

  const { toast } = useAuthContext();

  const navigate = useNavigate();

  const confirmHandle = (e) => {
    e.preventDefault();

    try {
      request
        .get(
          `auth/email-confirmation?confirmation=${confirmToken}`
        )
        .then(() => {
          navigate("/", { replace: true });
        });
    } catch (error) {
      toast.error(() => <div>{error.message}</div>);
    }
  };

  return (
    <div>
      <button className="border-[2px]" onClick={confirmHandle}>
        Click here to confirm
      </button>
    </div>
  );
};
export default ConfirmEmail;
