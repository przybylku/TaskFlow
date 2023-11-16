import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Select,
  Option,
  Tooltip,
  Input,
  Textarea,
} from "@mui/joy";
import React, { useState } from "react";
import { dataType } from "./DashboardTasks";
import { Status } from "./TableTask";
import ApiClient from "../../lib/ApiInstance";
import { UserType, selectUser } from "../../store/features/userSlice";
import { useAppSelector } from "../../store";
import { Brush, Pencil, Trash2 } from "lucide-react";

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
  const [nameChangeInput, setNameChangeInput] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [errors, setError] = useState<string>("");
  const [newDesc, setNewDesc] = useState<string>("");
  const [newChangeDescInput, setNewChangeDescInput] = useState<boolean>(false);
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

  const submitNameChange = () => {
    setNameChangeInput(false);
    if (newName.length < 1) {
      return setError("Nazwa Musi być dłuższa niż 1 znak");
    }
    ApiClient.getInstance()
      .put({
        url: "tasks",
        token: user.accessToken,
        data: {
          id: item._id,
          title: newName,
          description: item.description,
          status: Number(item.status),
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
  const submitDescChange = () => {
    setNewChangeDescInput(false);
    if (newDesc.length < 1) {
      return setError("Nazwa Musi być dłuższa niż 1 znak");
    }
    ApiClient.getInstance()
      .put({
        url: "tasks",
        token: user.accessToken,
        data: {
          id: item._id,
          title: item.title,
          description: newDesc,
          status: Number(item.status),
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
        <DialogTitle>
          <div
            className={`flex w-full ${
              nameChangeInput && "justify-between"
            } items-center text-2xl`}
          >
            {!nameChangeInput ? (
              item.title
            ) : (
              <Input
                type="text"
                defaultValue={item.title}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitNameChange();
                  }
                }}
              />
            )}
            <Pencil
              width={15}
              className={`cursor-pointer ${!nameChangeInput && "ml-2"}`}
              onClick={() => setNameChangeInput(!nameChangeInput)}
            />
          </div>
        </DialogTitle>
        <DialogContent className="overflow-hidden">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="text-gray-500 flex-wrap text-[0.85rem]">Opis:</p>
              <div
                className={`flex w-full ${
                  newChangeDescInput && "justify-between"
                } mt-2`}
              >
                {!newChangeDescInput ? (
                  <p
                    className="whitespace-pre-wrap flex flex-wrap"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                ) : (
                  <Input
                    type="text"
                    defaultValue={item.description}
                    onChange={(e) => setNewDesc(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        submitDescChange();
                      }
                    }}
                  />
                )}{" "}
                <Pencil
                  width={15}
                  className={`cursor-pointer ${!newChangeDescInput && "ml-2"}`}
                  onClick={() => setNewChangeDescInput(!newChangeDescInput)}
                />
              </div>
            </div>
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
            <div className="flex flex-row flex-nowrap justify-between items-center mt-2">
              <p className="text-red-600 text-[0.8rem]">{errors && errors}</p>
              <Tooltip variant="plain" title="Usuń zadanie">
                <Trash2 className="cursor-pointer" color="red" />
              </Tooltip>
            </div>
          </div>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
