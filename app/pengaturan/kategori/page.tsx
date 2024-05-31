import { Separator } from "@/components/ui/separator";
import KategoriForm from "./kategoriForm";

export default function SettingsKategoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Kategori</h3>
        <p className="text-sm text-muted-foreground">
          Kelola Kategorimu Disini
        </p>
      </div>
      <Separator />
      <KategoriForm />
    </div>
  );
}
