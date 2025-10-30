import './Button.css';

export default function Button({label, icon, onClick}: {label: string, icon?: React.ReactNode, onClick: () => void}) {
  return (
    <button onClick={onClick} className="button">
      {icon && (
        <span className="button-icon">{icon}</span>
      )}
      {label}
    </button>
  );
}