import { useCallback, useEffect, useState } from "react";
import { UserType, selectUser } from "../../store/features/userSlice";
import { useAppSelector } from "../../store";
import ApiClient from "../../lib/ApiInstance";
import { Button, CircularProgress, Typography, Table } from "@mui/joy";
import { useCountUp } from "use-count-up";
import { create } from "domain";
import TableTask from "./TableTask";
import TaskModal from "./TaskModal";
import ListView from "./ListView";

export type dataType = {
  board: string;
  comments: commentType[];
  createdAt: string;
  description: string;
  priority: string;
  status: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type commentType = {
  task: string;
  user: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export enum ListHeader {
  Name = "title",
  Description = "description",
  Status = "status",
  Priority = "priority",
}

export function DashboardTasks({
  name,
  params,
  openTaskModal,
  refresh,
}: {
  name?: string;
  params: any;
  openTaskModal: () => void;
  refresh: string;
}) {
  const [data, setData] = useState<dataType[] | null>(null);
  const [tableView, setTableView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const user: UserType = useAppSelector(selectUser);
  const [firstStatus, setFirstStatus] = useState<dataType[] | null>(null);
  const [secondStatus, setSecondStatus] = useState<dataType[] | null>(null);
  const [thirdStatus, setThirdStatus] = useState<dataType[] | null>(null);
  const [sorting, setSorting] = useState({
    field: ListHeader.Name,
    ascending: false,
  });

  const { value, reset } = useCountUp({
    isCounting: loading,
    duration: 2,
    start: 0,
    end: 100,
    easing: "easeOutCubic",
  });

  const applySorting = (key: any, ascending: any) => {
    setSorting({ field: key, ascending: ascending });
  };

  const fetchData = useCallback(async () => {
    await ApiClient.getInstance()
      .get({ url: `tasks/board/${params}`, token: user.accessToken })
      .then((data) => {
        const firstStatusFilter = data?.data?.filter(
          (e: dataType) => e.status === "0"
        );
        const secondStatusFilter = data?.data?.filter(
          (e: dataType) => e.status === "1"
        );
        const thirdStatusFilter = data?.data?.filter(
          (e: dataType) => e.status === "2"
        );

        const firstStatusSort = firstStatusFilter?.sort(
          (a: dataType, b: dataType) => {
            return a.priority < b.priority ? 1 : -1;
          }
        );
        const secondStatusSort = secondStatusFilter?.sort(
          (a: dataType, b: dataType) => {
            return a.priority < b.priority ? 1 : -1;
          }
        );
        const thirdStatusSort = thirdStatusFilter?.sort(
          (a: dataType, b: dataType) => {
            return a.priority < b.priority ? 1 : -1;
          }
        );

        setFirstStatus(firstStatusSort);
        setSecondStatus(secondStatusSort);
        setThirdStatus(thirdStatusSort);

        setData(data.data);
        setLoading(false);
        reset();
      });
  }, [params, user.accessToken, reset]);

  useEffect(() => {
    if (data !== null) {
      const dataCopy = [...data];
      const sortedData = dataCopy.sort((a: any, b: any) => {
        console.log(a[sorting.field], b);
        return a[sorting["field"]].localeCompare(b[sorting["field"]]);
      });

      setData(sorting["ascending"] ? sortedData : sortedData.reverse());
    }
  }, [sorting]);

  // Pobieranie danych o taskach
  useEffect(() => {
    setFirstStatus(null);
    setSecondStatus(null);
    setThirdStatus(null);
    if (!params) return;
    setLoading(true);
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, [params, refresh]);
  return (
    <>
      {params ? (
        <>
          <div
            className={` ${loading && "flex"} p-5 px-7 w-full h-full ${
              loading === true ? "justify-center items-center" : ""
            }`}
          >
            <div className="">
              {loading ? (
                <>
                  <p className="text-center translate-x-[-25%] mb-3">
                    Pobieranie danych
                  </p>
                  <CircularProgress
                    size="lg"
                    variant="plain"
                    determinate
                    color="success"
                    value={value as number}
                  >
                    <Typography color="primary">{value}%</Typography>
                  </CircularProgress>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold mb-5">{name}</h1>
                  <div className="flex gap-3 mb-5">
                    <p
                      className={`${tableView && "font-bold"} cursor-pointer`}
                      onClick={() => setTableView(true)}
                    >
                      Table
                    </p>
                    /
                    <p
                      className={`${!tableView && "font-bold"} cursor-pointer`}
                      onClick={() => setTableView(false)}
                    >
                      List
                    </p>
                  </div>
                  {tableView ? (
                    <div className="flex gap-2">
                      <div className="tableTaskContainer">
                        <h1 className="text-xl font-bold">Do zrobienia:</h1>
                        <div
                          // className="border-black border-2 cursor-pointer font-bold text-xl border-dashed my-4 hover:brightness-75 bg-white w-32 h-32 flex items-center justify-center rounded-md"
                          className="addTask"
                          onClick={() => openTaskModal()}
                        >
                          +
                        </div>
                        {firstStatus?.map((item, index) => {
                          return (
                            <>
                              <TableTask
                                item={item}
                                fetchData={() => fetchData()}
                                key={index}
                              />
                            </>
                          );
                        })}
                      </div>
                      <div className="tableTaskContainer">
                        <h1 className="text-xl font-bold">W trakcie:</h1>
                        <div
                          // className="border-black border-2 cursor-pointer font-bold text-xl border-dashed my-4 hover:brightness-75 bg-white w-32 h-32 flex items-center justify-center rounded-md"
                          className="addTask"
                          onClick={() => openTaskModal()}
                        >
                          +
                        </div>
                        {secondStatus?.map((item, index) => {
                          return (
                            <>
                              <TableTask
                                item={item}
                                fetchData={() => fetchData()}
                                key={index}
                              />
                            </>
                          );
                        })}
                      </div>
                      <div className="tableTaskContainer">
                        <h1 className="text-xl font-bold">Zrobione:</h1>
                        <div
                          // className="border-black border-2 cursor-pointer font-bold text-xl border-dashed my-4 hover:brightness-75 bg-white w-32 h-32 flex items-center justify-center rounded-md"
                          className="addTask"
                          onClick={() => openTaskModal()}
                        >
                          +
                        </div>
                        {thirdStatus?.map((item, index) => {
                          return (
                            <>
                              <TableTask
                                item={item}
                                fetchData={() => fetchData()}
                                key={index}
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="pb-12">
                      <Table
                        aria-label="table variants"
                        variant="plain"
                        stickyHeader
                        color="neutral"
                      >
                        <thead>
                          <tr>
                            <th
                              onClick={() =>
                                applySorting(
                                  ListHeader["Name"],
                                  !sorting["ascending"]
                                )
                              }
                              className="hover:cursor-pointer"
                            >
                              Nazwa
                            </th>
                            <th
                              onClick={() =>
                                applySorting(
                                  ListHeader["Description"],
                                  !sorting["ascending"]
                                )
                              }
                              className="hover:cursor-pointer"
                            >
                              Opis
                            </th>
                            <th
                              onClick={() =>
                                applySorting(
                                  ListHeader["Status"],
                                  !sorting["ascending"]
                                )
                              }
                              className="hover:cursor-pointer"
                            >
                              Status
                            </th>
                            <th
                              onClick={() =>
                                applySorting(
                                  ListHeader["Priority"],
                                  !sorting["ascending"]
                                )
                              }
                              className="hover:cursor-pointer"
                            >
                              Priorytet
                            </th>
                            {/* <th>Akcje</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            className="bg-white hover:brightness-90 cursor-pointer"
                            onClick={() => openTaskModal()}
                          >
                            <td>Dodaj zadanie...</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          {data?.map((item, index) => (
                            <ListView
                              item={item}
                              fetchData={() => fetchData()}
                              key={index}
                            />
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row w-full h-full justify-center items-center bg-[#212121] text-white">
          <h1 className="text-[2rem] font-semibold">Nie wybrano projektu</h1>
        </div>
      )}
    </>
  );
}
