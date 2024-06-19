import { PlusCircleIcon } from "lucide-react";
import CreateGroupDialog from "~/components/CreateGroupDialog";
import { Button } from "~/components/ui/button";

const GroupsPage = () => {
  return (
    <div className="p-4">
      <CreateGroupDialog />
    </div>
  );
};

export default GroupsPage;
