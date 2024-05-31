import { Separator } from "@/components/ui/separator";
import BukuKasForm from "./bukukasForm";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Buku Kas</h3>
        <p className="text-sm text-muted-foreground">
          Kelola Buku Kasmu Disini
        </p>
      </div>
      <Separator />
      <BukuKasForm />
    </div>
  );
}
