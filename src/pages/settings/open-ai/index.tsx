import { Separator } from "@/components/ui/separator";
import OpenAISettingsForm from "@/components/forms/OpenAISettingsForm";

export default function SettingsOpenAIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Open AI</h3>
        <p className="text-sm text-muted-foreground">
          Update your open ai settings. Set your key to access AI features
        </p>
      </div>
      <Separator />
      <OpenAISettingsForm />
    </div>
  );
}
