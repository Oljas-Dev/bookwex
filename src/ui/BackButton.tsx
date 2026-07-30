import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  teacherName,
  mg,
}: {
  teacherName?: string;
  mg?: string;
}) {
  const navigate = useNavigate();
  function optionalNavigation() {
    if (teacherName) {
      navigate(`/teacher/${teacherName}`);
    } else {
      navigate(-1);
    }
  }
  return (
    <div className="bg-jet/20 max-w-fit px-2 rounded-lg hover:bg-jet/10">
      <ArrowLeft
        style={{
          alignSelf: "start",
          marginBottom: `${mg ? mg : "16px"}`,
          cursor: "pointer",
        }}
        onClick={optionalNavigation}
      />
    </div>
  );
}
