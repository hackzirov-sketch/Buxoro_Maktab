import { PageWrapper, PageHeader } from "./Layout";
import ApplicationForm from "@/components/ApplicationForm";
import SectionNav from "@/components/SectionNav";

export default function ArizaPage() {
  return (
    <PageWrapper>
      <ApplicationForm />
      <SectionNav />
    </PageWrapper>
  );
}
