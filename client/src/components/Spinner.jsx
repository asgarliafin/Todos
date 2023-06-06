import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClipLoader color="#36d7b7" size={100} />
    </div>
  );
}

export default Spinner;
