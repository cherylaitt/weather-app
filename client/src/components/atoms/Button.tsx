import './Button.css';

export default function Button({label, onClick}: {label: string, onClick: () => void}) {
  return (
    <button onClick={onClick} className="button">
      {label}
    </button>
  );
}