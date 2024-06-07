"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { AlertDialogAction, AlertDialogCancel } from "../../../ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function ComponentSignature({
  setTrigger,
  trigger,
  tipe,
  data,
}: any) {
  const [name, setName] = useState<string>(tipe == "edit" ? data.name : "");
  const [role, setRole] = useState<string>(tipe == "edit" ? data.role : "");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    // Load existing signature when in edit mode
    if (tipe === "edit" && data.signature && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const image = new Image();
        image.src = data.signature;
        image.onload = () => {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [tipe, data]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (tipe == "edit") {
      if (canvas) {
        const dataURL = canvas.toDataURL();
        const newdata = { name, role, signature: dataURL, _id: data._id };
        const response = await fetch("/api/signature", {
          method: "PUT",
          body: JSON.stringify(newdata),
        });
        if (response.ok) {
          toast.success("Signature edited successfully");
          // Reset form fields and clear canvas
          setName("");
          setRole("");
          clearCanvas();
          setTrigger(!trigger);
        } else {
          console.error("Failed to add signature");
        }
      }
    } else {
      if (canvas) {
        const dataURL = canvas.toDataURL();
        const data = { name, role, signature: dataURL };
        const response = await fetch("/api/signature", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (response.ok) {
          toast.success("Signature added successfully");
          // Reset form fields and clear canvas
          setName("");
          setRole("");
          clearCanvas();
          setTrigger(!trigger);
        } else {
          console.error("Failed to add signature");
        }
      }
    }
  };

  return (
    <div className="space-y-8 w-full">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-5">
          {/* NAME */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Enter your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ttd">Tanda Tangan</Label>
            <canvas
              id="ttd"
              ref={canvasRef}
              width={300}
              height={150}
              style={{ border: "1px solid black" }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
            <Button variant="destructive" type="button" onClick={clearCanvas}>
              Hapus Tanda Tangan
            </Button>
          </div>
        </div>
        <div className=" flex justify-between">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">
            {tipe == "edit" ? "Edit" : "Input"}
          </AlertDialogAction>
        </div>
      </form>
    </div>
  );
}
