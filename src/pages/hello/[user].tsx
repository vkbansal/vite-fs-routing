import { useParams } from "react-router-dom";

export default function HelloPage() {
  const { user } = useParams();

  return (
    <div>
      <h1>Hello {user}!</h1>
    </div>
  );
}
