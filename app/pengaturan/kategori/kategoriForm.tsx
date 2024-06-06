"use client";
import { kegiatanIDStore } from "@/app/store/zustand";
import InputKategori from "@/components/own/kategori/form/inputKategori";
import TableKategori from "@/components/own/kategori/table/tableKategori";
import SkeletonTableComponent from "@/components/own/skeleton/skeletonTable";
import { BukuKasType, KategoriType } from "@/lib/mongodb/models";
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
      .then(({ kategori, kegiatan }) => {
        kategori.map((data: any) => {
          // TAMBAH NAMA KEGIATAN
          data.kegiatanName = kegiatan.name;
        });
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
    return (
      <div className=" flex flex-col gap-5">
        <div>
          <InputKategori setTrigger={setTrigger} trigger={trigger} />
        </div>
        <SkeletonTableComponent
          count={[
            { cellWidth: "w-[5%]" },
            { cellWidth: "w-[25%]" },
            { cellWidth: "w-[20%]" },
            { cellWidth: "w-[40%]" },
            { cellWidth: "w-[5%]" },
            { cellWidth: "w-[5%]" },
          ]}
        />
      </div>
    );
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
