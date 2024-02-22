import "./ErrorDisplay.css";

type ErrorDisplayProps = {
  loading: boolean;
  error: string;
};

export default function ErrorDisplay(props: ErrorDisplayProps) {
  const { loading, error } = props;
  return (
    <>
      {loading && <p>Loading countries...</p>}
      {error && <p className="error-message">{error}</p>}
    </>
  );
}
