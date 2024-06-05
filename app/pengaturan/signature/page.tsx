import { Separator } from "@/components/ui/separator";
import SignatureForm from "./signatureForm";

export default function SettingsKategoriPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tanda Tangan</h3>
        <p className="text-sm text-muted-foreground">
          Kelola Tanda Tanganmu Disini
        </p>
      </div>
      <Separator />
      <SignatureForm />
    </div>
  );
}
