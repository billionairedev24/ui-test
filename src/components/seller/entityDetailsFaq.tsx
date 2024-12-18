import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function EntityDetailsFaq() {
  return (
    <div className="mb-36 mt-4 xl:mb-0 w-full max-w-[1440px]">
      <div className="border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger className="text-start">
              What is the correct format of the phone number?
            </AccordionTrigger>
            <AccordionContent>
              The phone number should be entered in the format: country code +
              area code + local number, without any spaces or special
              characters.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger className="text-start">
              What should I do if I do not have a mobile number to receive SMS?
            </AccordionTrigger>
            <AccordionContent>
              If you don&#39; have a mobile number for SMS, you can select the
              &#39;Call&#39; option to receive your PIN via a phone call
              instead.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger className="text-start">
              What if I have not received the SMS with the PIN?
            </AccordionTrigger>
            <AccordionContent>
              If you haven&#39; received the SMS, please check that you entered
              the correct phone number and try again. If the issue persists, you
              can try the &#39;Call&#39; option or contact our support team.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4" className="border-0">
            <AccordionTrigger className="text-start">
              What should I do if my country is not listed for the
              &#39;Call&#39; option?
            </AccordionTrigger>
            <AccordionContent>
              If your country is not listed, please contact our support team for
              assistance with alternative verification methods.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default EntityDetailsFaq;
