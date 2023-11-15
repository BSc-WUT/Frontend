import Button from "@/components/Button/Button";
import PageLayout from "@/components/PageLayout/PageLayout";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout title="In progress">
      <Link href="/flows">
        <Button
          title="➡️ Go to Flows page ⬅️"
          type="button"
          hoverStyle="hover_white"
        />
      </Link>
    </PageLayout>
  );
}
