"use client";
import { kegiatanIDStore } from "@/app/store/zustand";
import InputKategori from "@/components/own/kategori/form/inputKategori";
import TableKategori from "@/components/own/kategori/table/tableKategori";
import { useEffect, useState } from "react";

const KategoriForm = () => {
  const [KategoriSetting, setKategoriSetting] = useState();
  const [trigger, setTrigger] = useState(true);
  const kegiatanId = kegiatanIDStore((state: any) => state.kegiatanID);

  const getData = async (kegiatanId: string) => {
    const res = await fetch(`/api/kategori/perKegiatan?id=${kegiatanId}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then(({ kategori }) => {
        setKategoriSetting(kategori);
      });
  };

  useEffect(() => {
    getData(kegiatanId);
  }, []);

  useEffect(() => {
    getData(kegiatanId);
  }, [trigger]);

  if (KategoriSetting == null || KategoriSetting == undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col gap-5">
      <div>
        <InputKategori setTrigger={setTrigger} trigger={trigger} />
      </div>
      <div>
        <TableKategori
          kategori={KategoriSetting}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      </div>
    </div>
  );
};

export default KategoriForm;
