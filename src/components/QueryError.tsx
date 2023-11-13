import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";

interface Props {
  message: string;
}

export function QueryError({ message }: Props) {
  return (
    <div className="p-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <pre>{message}</pre>
        </AlertDescription>
      </Alert>
    </div>
  );
}
