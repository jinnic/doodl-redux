import { useSelector } from "react-redux";
import DoodleCard from "./DoodleCard";

const DoodleContainer = ({ doodles }) => {
  const currentUser = useSelector((state) => state.user.current);
  const page = useSelector((state) => state.doodle.page);
  const sliceStart = (page - 1) * 6;
  const sliceEnd = sliceStart + 6;

  const renderDoodle = () => {
    return doodles
      .slice(sliceStart, sliceEnd)
      .map((doodle) => (
        <DoodleCard key={doodle.id} doodle={doodle} user={currentUser} />
      ));
  };

  return (
    <div className="">
      <div className="flex-container">{renderDoodle()}</div>
    </div>
  );
};

export default DoodleContainer;
