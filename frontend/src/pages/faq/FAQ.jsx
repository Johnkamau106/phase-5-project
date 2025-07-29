import React from "react";

const faqs = [
  {
    question: "What is a children’s home?",
    answer:
      "A children’s home is a safe, nurturing environment that provides shelter, care, and support for children who are orphaned, abandoned, or unable to live with their families due to various circumstances.",
  },
  {
    question: "How does your platform support children’s homes?",
    answer:
      "Our platform connects donors, volunteers, and well-wishers with verified children’s homes. We facilitate donations, sponsorships, and volunteer opportunities to ensure every child receives the care and resources they need.",
  },
  {
    question: "How can I make a donation to a children’s home?",
    answer:
      "You can easily make a donation by selecting a home from our homepage, entering your details, and choosing your preferred donation amount and method. All donations go directly to the selected home.",
  },
  {
    question: "Are the children’s homes on your site verified?",
    answer:
      "Yes, we carefully vet and verify every children’s home before listing them on our platform to ensure transparency, safety, and accountability.",
  },
  {
    question: "Can I sponsor a specific child?",
    answer:
      "Absolutely! Our platform allows you to sponsor individual children. Sponsorship helps cover their education, healthcare, and daily needs.",
  },
  {
    question: "How do I know my donation is making a difference?",
    answer:
      "We provide regular updates and reports from the homes, so you can see the impact of your support. You can also view your donation history and the progress of the homes you support.",
  },
  {
    question: "Can I visit or volunteer at a children’s home?",
    answer:
      "Yes, we encourage visits and volunteering! You can sign up for volunteer opportunities or arrange a visit through our platform.",
  },
  {
    question: "Is my personal information safe on your site?",
    answer:
      "We take your privacy seriously. All personal and payment information is securely processed and never shared without your consent.",
  },
  {
    question: "How do you ensure donations are used properly?",
    answer:
      "We work closely with each home, require regular reporting, and conduct periodic audits to ensure all funds are used for the intended purposes.",
  },
  {
    question: "How can I contact you for more information?",
    answer:
      "You can reach out to us via our contact page or email. We’re always happy to answer your questions and help you get involved!",
  },
];

const FAQ = () => (
  <div className="faq-container" style={{ maxWidth: 700, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
    <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Frequently Asked Questions</h2>
    {faqs.map((faq, idx) => (
      <div key={idx} style={{ marginBottom: "1.5rem" }}>
        <h4 style={{ color: "#1565c0", marginBottom: 8 }}>{faq.question}</h4>
        <p style={{ color: "#333", margin: 0 }}>{faq.answer}</p>
      </div>
    ))}
  </div>
);

export default FAQ;
