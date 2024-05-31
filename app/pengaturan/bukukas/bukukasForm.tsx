"use client";
import TableBukukas from "@/components/own/bukukas/table/tableBukukas";
import { useEffect, useState } from "react";

const BukuKasForm = () => {
  const [BukuKasSetting, setBukuKasSetting] = useState();

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

  if (BukuKasSetting == null || BukuKasSetting == undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col gap-5">
      <div>
        {/* <InputBukuKas
          tipe={"input"}
          dataBukukas={BukuKasSetting}
          kegiatanId={idParams}
        /> */}
      </div>
      <div>
        <TableBukukas bukuKas={BukuKasSetting} />
      </div>
    </div>
  );
};

export default BukuKasForm;
