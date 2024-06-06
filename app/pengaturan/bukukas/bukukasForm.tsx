"use client";
import InputBukuKas from "@/components/own/bukukas/form/inputBukuKas";
import TableBukukas from "@/components/own/bukukas/table/tableBukukas";
import SkeletonTableComponent from "@/components/own/skeleton/skeletonTable";
import { useEffect, useState } from "react";

const BukuKasForm = () => {
  const [BukuKasSetting, setBukuKasSetting] = useState();
  const [trigger, setTrigger] = useState(true);

  const getData = async () => {
    const res = await fetch("/api/bukukas", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then(({ kegiatan }) => {
        setBukuKasSetting(kegiatan);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [trigger]);

  if (BukuKasSetting == null || BukuKasSetting == undefined) {
    return <SkeletonTableComponent count={5} />;
  }

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <InputBukuKas setTrigger={setTrigger} trigger={trigger} />
      </div>
      <div>
        <TableBukukas
          bukuKas={BukuKasSetting}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      </div>
    </div>
  );
};

export default BukuKasForm;
