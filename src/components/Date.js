import "../styles/date.css";

const CurrentDate = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const todaysDay = today.toLocaleDateString("default", { weekday: "long" });

  return (
    <div className="date">
      {todaysDay} {""}
      {formattedDate}
    </div>
  );
};

export default CurrentDate;
