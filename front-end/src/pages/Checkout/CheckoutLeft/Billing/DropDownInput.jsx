import { CategoryArrowIcon } from "../../../../assets/Icon";
import { motion,useAnimate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import axios from "axios";

const DropDownInput = ({
  width,
  toast,
  register,
  registerName,
  title,
  setValue,
  getValues,
  errors,
  pickItem,
  setPickItem,
  disable,
  api,
  dataID,
  dataTitle,
}) => {
  const [listItem, setListItem] = useState([]);

  const [showListItem, setShowListItem] = useState([]);

  const [open, setOpen] = useState(false);

  const [scope, animate] = useAnimate();

  const boxRef = useRef();

  const handleOnclick = () => {
    if (pickItem.id === 0) {
      setValue(registerName, "");
    }
    axios
      .get(api, {
        headers: {
          token : import.meta.env.VITE_GHN_TOKEN
        },
      })
      .then((rsp) => {
        setListItem(rsp.data?.data);
        setShowListItem(rsp.data?.data);
        if(rsp.data?.data?.length > 0){
          setOpen(true);
        } else {
          toast.error(() => `There is no shipping support in this ${title}`)
        }

      })
      .catch((err) => {
        toast.error(() => `Failed in getting ${title} data`)
        throw err;
      });
  };

  const handleOnchange = (e) => {
    setValue(registerName, e.target.value);
    setShowListItem(
      listItem?.filter((item) => {
        let ctName = item[dataTitle]?.toLowerCase();
        return ctName.includes(getValues(registerName)?.toLowerCase());
      })
    );
  };

  const handleOnBlur = () =>{
    if(getValues(registerName)===''){
      setValue(registerName,pickItem.title)
    }
  }

  useEffect(() => {
    if (open) {
      animate("svg", { rotateZ: 180 }, { duration: 0.05 });
    } else {
      animate("svg", { rotateZ: 0 }, { duration: 0.05 });
    }
  }, [open]);

  useEffect(() => {
    setValue(registerName, pickItem.title);
  }, [pickItem]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem sự kiện click có xảy ra bên ngoài dropdown hay không
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen("");
        if (pickItem.id === 0 && getValues(registerName)) {
          setValue(registerName, pickItem.title);
        }
      }
    };
    // Thêm lắng nghe sự kiện click khi component mount
    document.addEventListener("click", handleClickOutside);

    // Loại bỏ lắng nghe khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pickItem]);


  return (
    <div className={`basis-[${width}] relative`} ref={boxRef}>
      <label htmlFor={registerName}>{title} <span className="text-[#ff0d00]">*</span></label>
      <div className={`w-full border-b-[2px] ${errors[registerName] && 'border-redHover'} py-[3px] flex items-center`}>
        <input
          id={registerName}
          type="text"
          autoComplete="new-password"
          disabled={disable}
          className={`outline-none bg-transparent hover:cursor-pointer  focus:placeholder:text-transparent ${errors[registerName] ? 'placeholder:text-redHover' : 'placeholder:text-white'} py-[5px] w-[85%]  md:w-[95%]`}
          {...register(registerName, {
            required: true,
          })}
          onClick={handleOnclick}
          onChange={handleOnchange}
          onBlur={handleOnBlur}
          placeholder={`Enter ${title}`}
        />
        <div className="w-[15%] md:w-[5%] flex justify-end items-center" ref={scope} onClick={handleOnclick}>
          <CategoryArrowIcon motion={motion} />
        </div>
      </div>
      {open && (
        <div className="w-full max-h-[25vh] bg-white text-black overflow-y-scroll absolute z-50">
          {showListItem?.map((item, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setPickItem({
                  id: item[dataID],
                  title: item[dataTitle],
                });
                setOpen(false);
              }}
              className="cursor-pointer hover:bg-purpleBtn hover:text-white"
            >
              {item[dataTitle]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DropDownInput;
