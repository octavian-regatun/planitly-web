import { Avatar, Tooltip } from "antd"
import { api } from "../../utils/api"
import ProfilePicture from "../ProfilePicture"

export const EventParticipants: React.FC<{
  eventId: number
  size?: number
}> = ({ eventId, size }) => {
  const getEventParticipantsQuery = api.events.getEventParticipants.useQuery({
    eventIds: [eventId],
  })

  return (
    <Avatar.Group
      maxCount={5}
      maxStyle={{ color: "white", backgroundColor: "#115E59" }}
    >
      {getEventParticipantsQuery.data?.map(participant => (
        <Tooltip
          title={`${participant.user.firstName} ${participant.user.lastName}`}
          placement="top"
          key={`event-participant-${participant.id}`}
        >
          <Avatar
            src={participant.user.image}
            onClick={(e: React.MouseEvent | undefined) => e?.preventDefault()}
          >
            {participant.user.firstName.charAt(0)}
            {participant.user.lastName.charAt(0)}
          </Avatar>
        </Tooltip>
      ))}
    </Avatar.Group>
  )
}
