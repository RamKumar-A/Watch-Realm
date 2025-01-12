const Accordion = ({ children }) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="border border-gray-300 bg-gray-50 rounded-md mb-2">
        {/* Accordion Header */}
        <AccordionSummary>{children}</AccordionSummary>
        {/* Accordion Content */}
        <AccordionDetails>{children}</AccordionDetails>
      </div>
    </div>
  );
};

const AccordionSummary = ({ children }) => {
  return <div>{children}</div>;
};

const AccordionDetails = ({ children }) => {
  return <div>{children}</div>;
};

export default Accordion;
