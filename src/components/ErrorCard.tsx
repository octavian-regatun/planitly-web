import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Alert, AlertDescription, AlertTitle } from "./shadcn/alert";

interface Props {
  message: string;
}

export function ErrorCard({ message }: Props) {
  return (
    <Alert variant="destructive" className="bg-red-100">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
