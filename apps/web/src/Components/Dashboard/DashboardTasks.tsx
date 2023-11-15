import { useEffect, useState } from "react";
import { UserType, selectUser } from "../../store/features/userSlice";
import { useAppSelector } from "../../store";
import ApiClient from "../../lib/ApiInstance";
import { Button, CircularProgress, Typography } from "@mui/joy";
import { useCountUp } from "use-count-up";
import { create } from "domain";
import { Table } from "lucide-react";
import TableTask from "./TableTask";

export type dataType = {
  board: string;
  comments: string[];
  createdAt: string;
  description: string;
  priority: string;
  status: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

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
  const [data, setData] = useState<dataType[] | null>();
  const [tableView, setTableView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const user: UserType = useAppSelector(selectUser);
  const [firstStatus, setFirstStatus] = useState<dataType[] | null>(null);
  const [secondStatus, setSecondStatus] = useState<dataType[] | null>(null);
  const [thirdStatus, setThirdStatus] = useState<dataType[] | null>(null);

  const { value, reset } = useCountUp({
    isCounting: loading,
    duration: 2,
    start: 0,
    end: 100,
    easing: "easeOutCubic",
  });
  // Pobieranie danych o taskach
  useEffect(() => {
    setFirstStatus(null);
    setSecondStatus(null);
    setThirdStatus(null);
    if (!params) return;
    setLoading(true);
    setTimeout(() => {
      ApiClient.getInstance()
        .get({ url: `tasks/board/${params}`, token: user.accessToken })
        .then((data) => {
          setFirstStatus(data?.data?.filter((e: dataType) => e.status === "0"));
          setSecondStatus(
            data?.data?.filter((e: dataType) => e.status === "1")
          );
          setThirdStatus(data?.data?.filter((e: dataType) => e.status === "2"));

          setData(data.data);
          setLoading(false);
          reset();
        });
    }, 2000);
  }, [params, refresh]);
  return (
    <>
      {params ? (
        <>
          <div
            className={`p-5 px-7 w-full h-full ${
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
                    value={value as number}
                  >
                    <Typography>{value}%</Typography>
                  </CircularProgress>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold mb-10">{name}</h1>
                  {/* <Button color="primary" onClick={() => openTaskModal()}>
                    Nowe Zadanie
                  </Button> */}
                  <div className="grid grid-cols-3">
                    <div className="flex flex-col">
                      <h1 className="text-2xl font-bold">Do zrobienia:</h1>
                      <div
                        className="border-black border-2 cursor-pointer font-bold text-lg border-dashed my-4 hover:brightness-75 bg-white w-32 h-32 flex items-center justify-center rounded-md"
                        onClick={() => openTaskModal()}
                      >
                        +
                      </div>
                      {firstStatus?.map((item, index) => {
                        return (
                          <>
                            <TableTask item={item} key={index} />
                          </>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-2xl font-bold">W trakcie:</h1>
                      {secondStatus?.map((item, index) => {
                        return (
                          <>
                            <TableTask item={item} key={index} />
                          </>
                        );
                      })}
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-2xl font-bold">Zrobione:</h1>
                      {thirdStatus?.map((item, index) => {
                        return (
                          <>
                            <TableTask item={item} key={index} />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row w-full h-full justify-center items-center">
          <h1 className="text-[2rem] font-semibold">Nie wybrano projektu</h1>
        </div>
      )}
    </>
  );
}
