import { api } from "../../utils/api"
import ProfilePicture from "../ProfilePicture"

export const EventParticipants: React.FC<{
  eventId: number
  size?: number
}> = ({ eventId, size }) => {
  const getEventParticipantsQuery = api.events.getEventParticipants.useQuery({
    eventId,
  })

  return (
    <div className="flex gap-2">
      {getEventParticipantsQuery.data?.map((participant) => (
        <ProfilePicture
          size={size}
          key={`participant-${participant.id}`}
          firstName={participant.user.firstName}
          lastName={participant.user.lastName}
          loading={participant.status === "PENDING"}
        />
      ))}
    </div>
  )
}
