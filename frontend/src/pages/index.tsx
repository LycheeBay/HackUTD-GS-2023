import Container from "@/components/layout/Container";
import InfoContainer from "@/components/layout/InfoContainer";
import SearchContainer from "@/components/layout/SearchContainer";
import SearchForm from "@/components/forms/SearchForm";
import SwapView from "@/components/display/SwapView";
import HeaderInfo from "@/components/display/HeaderInfo";
import CardGrid from "@/components/display/CardGrid";
import InfoCard from "@/components/display/InfoCard";

export default function Home() {
  return (
    <Container>
      <div className="space-y-4">
        <HeaderInfo />
        <div className="grid grid-cols-7 gap-6 h-96">
          <div className="col-span-5 space-y-6">
            <InfoContainer>
              <SwapView />
            </InfoContainer>
            <CardGrid>
              <InfoCard title="Thing" icon="mdi:globe">
                STuff
              </InfoCard>
            </CardGrid>
          </div>
          <SearchContainer>
            <SearchForm />
          </SearchContainer>
        </div>
      </div>
    </Container>
  );
}
