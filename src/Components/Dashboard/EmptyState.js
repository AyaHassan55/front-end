import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmptyState({ icon, title, subTitle }) {
  return (
    <div className="empty-state text-center py-5">
      <FontAwesomeIcon icon={icon} size="3x" color="#ddd" />
      <h5 className="mt-3">{title}</h5>
      <p className="text-secondary">{subTitle}</p>
    </div>
  );
}
