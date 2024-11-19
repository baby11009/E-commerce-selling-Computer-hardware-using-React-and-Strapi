const Substract = ({size}) => {
  return (
    <svg
      fill="#ffffff"
      width={`${size || '32px'}`}
      height={`${size || '32px'}`}
      viewBox="-32 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:fill-redHover"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
      </g>
    </svg>
  );
};
export default Substract;
