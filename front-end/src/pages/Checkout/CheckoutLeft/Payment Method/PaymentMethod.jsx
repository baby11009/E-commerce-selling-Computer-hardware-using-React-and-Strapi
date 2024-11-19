import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const conVars = {
  hover: {
    borderColor: "#6e59f7",
    color: "#6e59f7",
  },
};

const childCircleVar = {
  hover: {
    borderColor: "#6e59f7",
  },
};

const childSmallCircleVar = {
  hover: {
    backgroundColor: "#6e59f7",
  },
};

const PaymentMethod = ({ currStep, toast, totalPrice }) => {
  const navigate = useNavigate();

  const handleCODPayment = () => {
    if (totalPrice > 500) {
      toast.error(() => (
        <div className="z-[50]">Order total must less then 500$</div>
      ));
      return null;
    }

    navigate("/check-out/2/paymentMethod/2");
  };

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <motion.div
          className="w-full border-[3px] rounded-[10px] cursor-pointer pl-[2%] py-[1.5%]
          flex   md:gap-[2%]"
          variants={conVars}
          whileHover="hover"
          onClick={() => navigate("/check-out/2/paymentMethod/1/paymentType/1")}
        >
          <div className="basis-[10%] flex justify-start">
            <motion.div
              className={`flex justify-center items-center 
              top-[8%] left-[2%] w-[30px] h-[30px] rounded-[50%] border-[2px]`}
              variants={childCircleVar}
            >
              <motion.div
                variants={childSmallCircleVar}
                className={`w-[13px] h-[13px] rounded-[50%] bg-white`}
              ></motion.div>
            </motion.div>
          </div>
          <div>
            <div className="text-[26px] leading-[30px] mb-[5px]">
              Online Payment
            </div>
            <div className="">
              Our e-commerce website uses advanced encryption and fraud
              detection technology for secure transactions. Its user-friendly
              interface allows customers to complete purchases using preferred
              payment methods.
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-full  border-[3px] rounded-[10px] cursor-pointer pl-[2%] py-[1.5%]
          flex  gap-[2%]"
          variants={conVars}
          whileHover="hover"
          onClick={handleCODPayment}
        >
          <div className="basis-[10%] flex justify-start">
            <motion.div
              className={`flex justify-center items-center 
              top-[8%] left-[2%] w-[30px] h-[30px] rounded-[50%] border-[2px]`}
              variants={childCircleVar}
            >
              <motion.div
                variants={childSmallCircleVar}
                className={`w-[13px] h-[13px] rounded-[50%] bg-white`}
              ></motion.div>
            </motion.div>
          </div>
          <div>
            <div className="text-[26px] leading-[30px] mb-[5px]">
              Cash on Delivery (COD)
            </div>
            <div className="">
              Experience the convenience of Cash on Delivery (COD) for orders
              under $500. Pay in cash upon delivery, ensuring a secure and
              hassle-free transaction. Shop confidently, knowing your payment is
              straightforward.
            </div>
          </div>
        </motion.div>
      </div>
      <div className="  mt-[5vh] flex">
        <Link
          className="bg-purpleBtn py-[5px] text-center rounded-[5px] h-fit w-[45%]"
          to={`/check-out/${currStep - 1}`}
        >
          Prev
        </Link>
      </div>
    </>
  );
};
export default PaymentMethod;
