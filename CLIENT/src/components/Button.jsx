export default function Button({
  icon = null,
  isFull = false,
  isEmpty = false,
  isRounded = false,
  colored = false,
  isWidthFull = false,
  onClick = () => {},
  text = "Button",
  customClasses = "",
}) {
  return (
    <button
      onClick={onClick}
      className={
        customClasses
          ? customClasses
          : `flex items-center ${isWidthFull && "w-full"} justify-center ${
              isRounded
                ? "w-10 h-10 rounded-[100px]"
                : "rounded-md py-2 px-5 gap-2 flex "
            } cursor-pointer ${
              !isEmpty
                ? !isFull
                  ? colored
                    ? "bg-white text-primary border-[1px] border-primary hover:bg-primary hover:text-white hover:border-white font-medium"
                    : "bg-white text-black border-[1px] border-black/15 hover:border-primary hover:text-primary font-medium"
                  : "text-white bg-primary border-[1px] border-primary hover:bg-white hover:text-primary font-medium"
                : "text-black hover:text-primary"
            }`
      }
    >
      {icon && icon}
      {!isRounded && text}
    </button>
  );
}
