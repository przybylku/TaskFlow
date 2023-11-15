import React, { useEffect, useState } from "react";
import { dataType } from "./DashboardTasks";

export default function TableTask({ item }: { item: dataType }) {
  return (
    <>
      <abbr title={item.title} className="no-underline">
        <p className="border-black border-2 cursor-pointer font-bold text-lg my-4 hover:brightness-75 bg-white w-32 h-32 flex items-center justify-center rounded-md">
          {item.title.length > 8 ? `${item.title.slice(0, 8)}...` : item.title}
        </p>
      </abbr>
    </>
  );
}
