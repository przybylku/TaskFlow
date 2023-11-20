import React, { useEffect, useState } from "react";
import { dataType } from "./DashboardTasks";
import TaskModal from "./TaskModal";

export enum Status {
  Todo = "Todo",
  InProgress = "In Progress",
  Done = "Done",
}

export default function TableTask({
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
      <abbr title={item.title} className="no-underline">
        <p
          // className="border-black border-2 cursor-pointer font-bold text-lg my-4 hover:brightness-75 bg-white w-32 h-32 flex items-center justify-center rounded-md"
          className="tableTask"
          onClick={() => setOpen(true)}
        >
          {item.title.length > 8 ? `${item.title.slice(0, 8)}...` : item.title}
        </p>
      </abbr>
      {/* open: boolean;
          handleClose: () => void;
          item: dataType;
          taskValue: Status;
          setTaskValue: React.Dispatch<React.SetStateAction<Status>>;
          fetchData: () => void; */}
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

      {/* <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogContent>
            <div className="flex flex-col">
              <p>Opis: {item.description}</p>
              <p>
                Status:{" "}
                <Select
                  value={taskValue}
                  onChange={(e: any) => handleChangeStatus(e)}
                >
                  <Option value={Status.Todo}>{Status.Todo}</Option>
                  <Option value={Status.InProgress}>{Status.InProgress}</Option>
                  <Option value={Status.Done}>{Status.Done}</Option>
                </Select>
              </p>
              <p>Priorytet: {item.priority}</p>
              {item.comments.length > 0 && (
                <div>
                  <br />
                  <h1>Komentarze: </h1>
                  {item?.comments.map((e, i) => (
                    <p key={i}>
                      {i + 1}. {e.content} - {e.user}
                    </p>
                  ))}
                  <br />
                </div>
              )}
              <p>Utworzony: {new Date(item.createdAt).toLocaleString()}</p>
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal> */}
    </>
  );
}
