import { DatePicker } from "@mui/x-date-pickers";
import { memo } from "react";
import { useBookings } from "../contexts/useBookings";

const DateSelector = memo(() => {
  const { startDate, endDate, setStartDate, setEndDate } = useBookings();

  return (
    <div className="flex justify-between max-[850px]:flex-col max-[850px]:gap-4">
      <div className="flex flex-col gap-1">
        <p>Please set the start point</p>

        <DatePicker
          value={startDate}
          disablePast
          format="YYYY-MM-DD"
          onChange={setStartDate}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>Please set the end point</p>

        <DatePicker
          value={endDate}
          disabled={!startDate}
          disablePast
          minDate={startDate ?? undefined}
          format="YYYY-MM-DD"
          onChange={setEndDate}
        />
      </div>
    </div>
  );
});

export { DateSelector };

// const DateSelector = memo(() => {
//   const { setStartDate, setEndDate, startDate } = useBookings();

//   function showData(e, action) {
//     // console.log(value.format("YYYY-MM-DD"));
//     const value = e;
//     action(value.format("YYYY-MM-DD"));
//   }

//   return (
//     <div className="flex justify-between">
//       {/* To be refactored */}
//       <div className="flex flex-col gap-1">
//         <p>Please set the start point</p>
//         <DatePicker
//           disablePast
//           format="YYYY-MM-DD"
//           onChange={(value) => showData(value, setStartDate)}
//         />
//       </div>

//       {/* To be refactored */}
//       <div className="flex flex-col gap-1">
//         <p>Please set the end point</p>
//         <DatePicker
//           disabled={!startDate}
//           disablePast
//           format="YYYY-MM-DD"
//           onChange={(value) => showData(value, setEndDate)}
//           minDate={dayjs(startDate)}
//         />
//       </div>
//     </div>
//   );
// });

// export { DateSelector };
