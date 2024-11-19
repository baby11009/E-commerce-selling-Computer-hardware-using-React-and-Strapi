import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { createLcItem } from "../../../../LocalStorage/LocalStorageFunc";

import DropDownInput from "./DropDownInput";

const Billing = ({ currStep, toast }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const [openCities, setOpenCities] = useState(false);
  const [cities, setCities] = useState([]);
  const [showCities, setShowCities] = useState([]);

  const [disabledDistrict, setDisabledDistrict] = useState(false);
  const [disabledWard, setDisabledWard] = useState(false);

  const [pickCity, setPickCity] = useState({
    id: 0,
    title: null,
  });

  const [pickDistrict, setPickDistrict] = useState({
    id: 0,
    title: null,
  });

  const [pickWard, setPickWard] = useState({
    id: 0,
    title: null,
  });

  const navigate = useNavigate();

  const onSubmit = (value) => {

    const shippingData = {
      clientName: value.firstName + value.lastName,
      clientPNb: value.phoneNumber,
      toCity: {
        ...pickCity,
      },
      toDistrict: {
        ...pickDistrict,
      },
      toWard: {
        ...pickWard,
      },
      address: value.address,
    };
    createLcItem("shippingData", shippingData);
    navigate(`/check-out/${currStep + 1}`);
  };

  useEffect(() => {
    if (pickCity.id === 0) {
      setDisabledDistrict(true);
      setDisabledWard(true);
    } else {
      setDisabledDistrict(false);
    }
    setPickDistrict({
      id: 0,
      title: null,
    });
    setPickWard({
      id: 0,
      title: null,
    });
  }, [pickCity]);

  useEffect(() => {
    if (pickDistrict.id !== 0) {
      setDisabledWard(false);
      setPickWard({
        id: 0,
        title: null,
      });
    }
  }, [pickDistrict]);
  return (
    <div className="h-full w-full flex flex-col gap-[15px] md:gap-[2%] text-white text-[20px]">
      <span className="text-[28px]">Billing details</span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        className="flex flex-wrap gap-[25px] justify-between h-full md:px-0 px-[10px]"
        spellCheck={false}
      >
        <div className="basis-[46%]">
          <label htmlFor="firstName">
            First name <span className="text-[#ff0d00]">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="off"
            placeholder="Enter first name"
            className={`outline-none bg-transparent focus:placeholder:text-transparent border-b-[2px] ${
              errors.firstName
                ? "border-redHover placeholder:text-redHover"
                : "placeholder:text-white"
            } py-[5px]  w-full`}
            {...register("firstName", {
              required: true,
            })}
          />
        </div>
        <div className="basis-[46%]">
          <label htmlFor="lastName">
            Last name <span className="text-[#ff0d00]">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="off"
            placeholder="Enter last name"
            className={`outline-none bg-transparent focus:placeholder:text-transparent border-b-[2px] ${
              errors.lastName
                ? "border-redHover placeholder:text-redHover"
                : "placeholder:text-white"
            } py-[5px] w-full`}
            {...register("lastName", {
              required: true,
            })}
          />
        </div>
        <div className="basis-[100%]">
          <label htmlFor="phoneNumber">
            Phone number <span className="text-[#ff0d00]">*</span>
          </label>
          <input
            id="phoneNumber"
            type="text"
            autoComplete="off"
            placeholder="Enter phone number"
            className={`outline-none bg-transparent focus:placeholder:text-transparent border-b-[2px] ${
              errors.phoneNumber
                ? "border-redHover placeholder:text-redHover"
                : "placeholder:text-white"
            } py-[5px] w-full`}
            {...register("phoneNumber", {
              required: true,
            })}
          />
        </div>
        <DropDownInput
          width={"100%"}
          toast={toast}
          register={register}
          registerName={"city"}
          title={"City/Province"}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          pickItem={pickCity}
          setPickItem={setPickCity}
          api={import.meta.env.VITE_PROVINCE_API}
          dataID="ProvinceID"
          dataTitle="ProvinceName"
        />
        <DropDownInput
          width={"46%"}
          toast={toast}
          register={register}
          registerName={"district"}
          title={"District"}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          pickItem={pickDistrict}
          setPickItem={setPickDistrict}
          disable={disabledDistrict}
          api={`${import.meta.env.VITE_DISTRICT_API}?province_id=${
            pickCity.id
          }`}
          dataID="DistrictID"
          dataTitle="DistrictName"
        />
        <DropDownInput
          width={"46%"}
          toast={toast}
          register={register}
          registerName={"ward"}
          title={"Ward"}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          pickItem={pickWard}
          setPickItem={setPickWard}
          disable={disabledWard}
          api={`${import.meta.env.VITE_WARD_API}?district_id=${
            pickDistrict.id
          }`}
          dataID="WardCode"
          dataTitle="WardName"
        />
        <div className="basis-[100%]">
          <label htmlFor="address">
            Address <span className="text-[#ff0d00]">*</span>
          </label>
          <input
            id="address"
            type="text"
            autoComplete="off"
            placeholder="Enter address"
            className={`outline-none bg-transparent focus:placeholder:text-transparent border-b-[2px] ${
              errors.address
                ? "border-redHover placeholder:text-redHover"
                : "placeholder:text-white"
            } py-[5px]  w-full`}
            {...register("address", {
              required: true,
            })}
          />
        </div>
        <div className="basis-[100%] flex justify-center md:justify-end">
          <button
            className="bg-purpleBtn py-[5px] text-center rounded-[5px] h-fit w-[45%]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};
export default Billing;
