import { PlusCircleIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

const GroupsPage = () => {
  return (
    <div className="p-4">
      <Button disabled>
        <PlusCircleIcon className="mr-2 h-4 w-4" /> Create Group
      </Button>
    </div>
  );
};

export default GroupsPage;
