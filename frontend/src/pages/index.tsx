import Container from "@/components/layout/Container";
import InfoContainer from "@/components/layout/InfoContainer";
import SearchContainer from "@/components/layout/SearchContainer";
import SearchForm from "@/components/forms/SearchForm";
import SwapView from "@/components/display/SwapView";
import HeaderInfo from "@/components/display/HeaderInfo";

export default function Home() {
  return (
    <Container>
      <div className="space-y-4">
        <HeaderInfo />
        <div className="grid grid-cols-7 gap-6 h-96">
          <InfoContainer>
            <SwapView />
          </InfoContainer>
          <SearchContainer>
            <SearchForm />
          </SearchContainer>
        </div>
      </div>
    </Container>
  );
}
