import React, { useState } from "react";
import { dataType } from "./DashboardTasks";
import { Status } from "./TableTask";
import TaskModal from "./TaskModal";
import { Button } from "@mui/joy";

export default function ListView({
  item,
  fetchData,
}: {
  item: dataType;
  fetchData: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<Status>(
    item.status === "2"
      ? Status.Done
      : item.status === "1"
      ? Status.InProgress
      : Status.Todo
  );
  return (
    <>
      <tr
        className="bg-white hover:brightness-90 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <td>
          {item.title.length > 12
            ? `${item.title.slice(0, 12)}...`
            : item.title}
        </td>
        <td>
          {item.description.length > 16
            ? `${item.title.slice(0, 16)}...`
            : item.description}
        </td>
        <td>
          {item.status === "2"
            ? "Done"
            : item.status === "1"
            ? "In progress"
            : item.status === "0" && "Todo"}
        </td>
        <td>{item.priority}</td>
        {/* <td>
          <Button color="primary" onClick={() => setOpen(true)}>
            Edytuj
          </Button>
        </td> */}
      </tr>
      {open && (
        <TaskModal
          open={open}
          handleClose={() => setOpen(false)}
          item={item}
          taskValue={taskValue}
          setTaskValue={setTaskValue}
          fetchData={fetchData}
        />
      )}
    </>
  );
}
