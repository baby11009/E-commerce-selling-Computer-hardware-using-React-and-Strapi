import dollarUs from "../../components/Money";
import { TrashBinIcon, PlusIcon, SubstractIcon } from "../../assets/Icon";
import { useState, useLayoutEffect, useRef } from "react";
import request from "../../utils/request";
import { getToken } from "../../apiService/Login/tokenHelper";

const ProductCartItem = ({ toast, data, fetchUserCart }) => {
  const [newPrice, setNewPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [maxQty, setMaxQty] = useState(0);

  const timer = useRef();

  useLayoutEffect(() => {
    setQty(data?.attributes?.quantity);
    setMaxQty(data?.attributes?.product?.data.attributes?.Quantity);

    if (data?.attributes?.product?.data?.attributes?.sale?.data) {
      let price = data?.attributes?.product.data.attributes.Price;
      let saleP =
        data?.attributes?.product?.data?.attributes?.sale?.data?.attributes
          ?.Percent;
      setNewPrice(Math.ceil(price - (price * saleP) / 100));
    }
  }, [data]);

  const updateQty = async (value = 0) => {
    return request
      .put(
        `/product-carts/${data?.id}`,
        {
          data: {
            quantity:
              Number(qty) + value >
              data?.attributes?.product?.data.attributes?.Quantity
                ? data?.attributes?.product?.data.attributes?.Quantity
                : Number(qty) + value < 1
                ? 1
                : Number(qty) + value,
            Price:
              newPrice === 0
                ? (Number(qty) + value >
                  data?.attributes?.product?.data.attributes?.Quantity
                    ? data?.attributes?.product?.data.attributes?.Quantity
                    : Number(qty) + value < 1
                    ? 1
                    : Number(qty) + value) *
                  data?.attributes?.product.data.attributes.Price
                : (Number(qty) + value >
                  data?.attributes?.product?.data.attributes?.Quantity
                    ? data?.attributes?.product?.data.attributes?.Quantity
                    : Number(qty) + value < 1
                    ? 1
                    : Number(qty) + value) * newPrice,
          },
        },
        {
          headers: {
            Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
              import.meta.env.VITE_AUTH_TOKEN
            )}`,
          },
        }
      )
      .then(() => {
        fetchUserCart();
      })
      .catch((err) => {
        toast.error(() => <div>{err.response.data.error.name}</div>);
      });
  };

  // Handle type text
  const handleInput = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setQty(data?.attributes?.quantity);
    }
  };

  // handle key down
  function handleKeyDown(e) {
    window.clearTimeout(timer.current);
  }

  // handle key up
  function handleKeyUp(e) {
    window.clearTimeout(timer.current); // prevent errant multiple timeouts from being generated
    timer.current = window.setTimeout(() => {
      if (Number(e.target.value) > maxQty) {
        setQty(data?.attributes?.quantity);
        toast.error(() => (
          <div>Quantity must less then available ({maxQty})</div>
        ));
      } else {
        updateQty();
      }
    }, 1000);
  }

  // Handle adjust product
  console.log(data?.attributes?.product?.data.attributes?.Quantity);
  const handleAdjustQty = (value) => {
    if (qty + value > maxQty) {
      setQty(data?.attributes?.product?.data.attributes?.Quantity);
      toast.error(() => (
        <div>Quantity must less then available ({maxQty})</div>
      ));
    } else if (qty + value < 1) {
      setQty(1);
      toast.error(() => <div>Quantity must atleast equal 1</div>);
    } else {
      setQty((prev) => prev + value);
    }

    window.clearTimeout(timer.current); // prevent errant multiple timeouts from being generated
    timer.current = window.setTimeout(() => {
      updateQty(value);
    }, 400);
  };

  // Handle delete product
  const handleDelete = () => {
    const dltConfirm = confirm("Are you sure you want to delete this product?");
    if (dltConfirm) {
      request
        .delete(`/product-carts/${data?.id}`, {
          headers: {
            Authorization: `${import.meta.env.VITE_BEARER} ${getToken(
              import.meta.env.VITE_AUTH_TOKEN
            )}`,
          },
        })
        .then(() => {
          fetchUserCart();
        })
        .catch((err) => {
          toast.error(() => <div>{err.response.data.error.name}</div>);
        });
    }
  };

  return (
    <div className="flex justify-evenly items-center text-[18px] 2xl:text-[20x]">
      <div className="basis-[45%] flex items-center gap-[10px]">
        <div
          className="w-[75px] h-[75px] rounded-[5px] bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: `url('http://localhost:1337${data?.attributes?.product?.data?.attributes?.MainImage?.data?.attributes?.formats?.thumbnail?.url}')`,
          }}
        />
        <div className="flex-1 font-bold">
          {data?.attributes?.product?.data?.attributes?.Title}
        </div>
      </div>
      <div className="basis-[15%] flex justify-center gap-[10px]">
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => handleAdjustQty(1)}
        >
          <PlusIcon size={"20px"} />
        </div>
        <input
          type="text"
          min={1}
          max={maxQty}
          className="w-[25%] text-center bg-transparent"
          value={qty}
          onChange={(e) => setQty(e.target.value || "")}
          maxLength={2}
          inputMode="numeric"
          onInput={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => handleAdjustQty(-1)}
        >
          <SubstractIcon size={"20px"} />
        </div>
      </div>
      <div className="basis-[15%] flex justify-center ">
        {dollarUs.format(data?.attributes?.Price)}
      </div>
      <div
        className="basis-[12%]  flex justify-center cursor-pointer"
        onClick={handleDelete}
      >
        <TrashBinIcon />
      </div>
    </div>
  );
};
export default ProductCartItem;
