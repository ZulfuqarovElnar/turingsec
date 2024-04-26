import { Triangle } from "react-loader-spinner";
export default function SpinnerLoader() {
  return (
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="blue"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
