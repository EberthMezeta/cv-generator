interface Props {
  title: string
  date: string
  subtitle: string
  location: string
}

export function SubHeading({ title, date, subtitle, location }: Props) {
  return (
    <div className="cv-subheading">
      <div className="cv-subheading__row">
        <h3 className="cv-subheading__title">{title}</h3>
        <span>{date}</span>
      </div>
      <div className="cv-subheading__row cv-subheading__row--small">
        <em>{subtitle}</em>
        <em>{location}</em>
      </div>
    </div>
  )
}
