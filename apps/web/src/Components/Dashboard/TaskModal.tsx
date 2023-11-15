import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Select,
  Option,
} from "@mui/joy";
import React from "react";
import { dataType } from "./DashboardTasks";
import { Status } from "./TableTask";
import ApiClient from "../../lib/ApiInstance";
import { UserType, selectUser } from "../../store/features/userSlice";
import { useAppSelector } from "../../store";

export type TaskModalProps = {
  open: boolean;
  handleClose: () => void;
  item: dataType;
  taskValue: Status;
  setTaskValue: React.Dispatch<React.SetStateAction<Status>>;
  fetchData: () => void;
};

export default function TaskModal({
  open,
  handleClose,
  item,
  taskValue,
  setTaskValue,
  fetchData,
}: TaskModalProps) {
  const user: UserType = useAppSelector(selectUser);

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.innerHTML);
    setTaskValue(e.target.innerHTML as Status);
    ApiClient.getInstance()
      .put({
        url: "tasks",
        token: user.accessToken,
        data: {
          id: item._id,
          title: item.title,
          description: item.description,
          status:
            (e.target.innerHTML as Status) === Status.Todo
              ? 0
              : (e.target.innerHTML as Status) === Status.InProgress
              ? 1
              : 2,
          priority: Number(item.priority),
        },
      })
      .then(() => {
        fetchData();
        // setTimeout(() => {
        handleClose();
        // }, 1500);
      });
  };
  return (
    <Modal open={open} onClose={() => handleClose()}>
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
              {/* {item.status === "2"
            ? "Done"
            : item.status === "1"
            ? "In progress"
            : item.status === "0" && "Todo"} */}
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
    </Modal>
  );
}
