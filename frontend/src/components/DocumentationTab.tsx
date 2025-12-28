import DocumentationHeader from "./documentation/DocumentationHeader";
import ExploreRepositoriesStep from "./documentation/ExploreRepositoriesStep";
import RepositoryDetailsStep from "./documentation/RepositoryDetailsStep";
import ConfigureAIAgentStep from "./documentation/ConfigureAIAgentStep";
import EffectivePromptsStep from "./documentation/EffectivePromptsStep";
import PracticalExampleStep from "./documentation/PracticalExampleStep";
import BestPracticesSection from "./documentation/BestPracticesSection";
import APIReferenceSection from "./documentation/APIReferenceSection";
import AboutDeveloperSection from "./documentation/AboutDeveloperSection";

export function DocumentationTab() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <DocumentationHeader />

        {/* Tutorial Steps */}
        <ExploreRepositoriesStep />
        <RepositoryDetailsStep apiUrl={apiUrl} />
        <ConfigureAIAgentStep />
        <EffectivePromptsStep />
        <PracticalExampleStep apiUrl={apiUrl} />

        {/* Additional Sections */}
        <BestPracticesSection />
        <APIReferenceSection apiUrl={apiUrl} />
        <AboutDeveloperSection />
      </div>
    </div>
  );
}
