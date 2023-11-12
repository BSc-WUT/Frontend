import { useRouter } from "next/router";

export default function ModelPage() {
  const router = useRouter();
  return <div>{router.query.name}</div>;
}
