import { api } from "../../utils/api"
import ProfilePicture from "../ProfilePicture"

export const EventParticipants: React.FC<{ eventId: number }> = ({
  eventId,
}) => {
  const getEventParticipantsQuery = api.events.getEventParticipants.useQuery({
    eventId,
  })

  return (
    <div className="flex gap-2">
      {getEventParticipantsQuery.data?.map((participant) => (
        <ProfilePicture
          size={24}
          key={`participant-${participant.id}`}
          firstName={participant.firstName}
          lastName={participant.lastName}
        />
      ))}
    </div>
  )
}
