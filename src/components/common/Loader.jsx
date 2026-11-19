import { FadeLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <FadeLoader
      color={"#4f39f6"}
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      }}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
