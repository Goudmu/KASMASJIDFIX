"use client";
import InputSignature from "@/components/own/signature/form/inputSignature";
import TableSignature from "@/components/own/signature/table/tableSignature";
import SkeletonTableComponent from "@/components/own/skeleton/skeletonTable";
import { useEffect, useState } from "react";

const SignatureForm = () => {
  const [signatureSetting, setsignatureSetting] = useState();
  const [trigger, setTrigger] = useState(true);
  const getData = async () => {
    const res = await fetch(`/api/signature`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then(({ signature }) => {
        setsignatureSetting(signature);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [trigger]);

  if (signatureSetting == null || signatureSetting == undefined) {
    return (
      <div className=" flex flex-col gap-5">
        <div>
          <InputSignature
            tipe={"input"}
            setTrigger={setTrigger}
            trigger={trigger}
          />
        </div>
        <SkeletonTableComponent
          count={[
            { cellWidth: "w-[25%]" },
            { cellWidth: "w-[10%]" },
            { cellWidth: "w-[55%]" },
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
        <InputSignature
          tipe={"input"}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      </div>
      <div>
        <TableSignature
          signature={signatureSetting}
          setTrigger={setTrigger}
          trigger={trigger}
        />
      </div>
    </div>
  );
};

export default SignatureForm;
