interface Props {
  message: string
}

export function AnnouncementBar({ message }: Props) {
  return (
    <div className="announcement-bar" role="banner" aria-label="Announcement">
      {message}
    </div>
  )
}
