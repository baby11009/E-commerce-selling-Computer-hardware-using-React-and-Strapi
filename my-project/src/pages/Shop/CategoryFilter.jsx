import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check } from "../../assets/Icon";

const CategoryFilter = ({
  openedCategory,
  boxVars,
  categories,
  checkedValues,
  setCheckedValues,
}) => {
  const [search, setSearch] = useState("");

  const handleOnchange = (e) => {
    if (e.target.checked) {
      setCheckedValues([...checkedValues, e.target.value]);
    } else {
      setCheckedValues(checkedValues.filter((item) => item !== e.target.value));
    }
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden px-[15px]">
      <AnimatePresence>
        {openedCategory && (
          <motion.div
            variants={boxVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col"
          >
            <input
              type="text"
              placeholder="Search"
              className="w-full my-[15px] px-[10px] py-[5px] border-[1px] border-[#929292] rounded-[5px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              spellCheck={false}
            />
            <div
              className=" overflow-y-auto flex-1
                                        [&::-webkit-scrollbar]:w-2
                                        [&::-webkit-scrollbar-track]:rounded-full
                                        [&::-webkit-scrollbar-track]:bg-gray-100
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                                        dark:[&::-webkit-scrollbar-track]:bg-[#fff]
                                        dark:[&::-webkit-scrollbar-thumb]:bg-[#78797e]"
            >
              <div className="relative flex flex-col text-gray-700 rounded-xl">
                <nav className="flex min-w-[240px] flex-col gap-1 p-2  text-base font-normal ">
                  {categories
                    .filter((er) =>
                      er.title
                        ?.toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                    .map((category) => (
                      <div
                        key={category.slug}
                        role="button"
                        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-[#ffffff] hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                      >
                        <label
                          htmlFor={`${category.slug}`}
                          className="flex items-center w-full px-3 py-[5px] cursor-pointer"
                        >
                          <div className="grid mr-3 place-items-center">
                            <div className="inline-flex items-center">
                              <label
                                className="relative flex items-center p-0 rounded-full cursor-pointer"
                                htmlFor={`${category.slug}`}
                              >
                                <input
                                  id={`${category.slug}`}
                                  value={category.slug}
                                  onChange={handleOnchange}
                                  type="checkbox"
                                  checked={
                                    checkedValues.indexOf(category.slug) !== -1
                                  }
                                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-[2.4px] border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                />
                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <Check />
                                </span>
                              </label>
                            </div>
                          </div>
                          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            {category.title}
                            <span className="ml-[5px] text-[#797979]">
                              ({category.quantity})
                            </span>
                          </p>
                        </label>
                      </div>
                    ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default CategoryFilter;
