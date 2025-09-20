import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import ServiceCard from "./ServiceCard"; 

const services = [
  {
    title: "Dept Recovery and Insolvency",
    description:
      "We represent plethora of Nigerian Financial Institutions, Commercial Banks and diverse Clients in recovering non-performing loans. Our recovery strategy is to aggressively pursue the recovery of all indebtedness until the matter is resolved. Our team offers other insolvency related services such as Acquisition and Sale of Distressed Assets, Negotiation with Creditors for Settlement, Restructuring under Arrangement with Creditors etc",
    image: "/images/debt-logo.jpg",
  },
  {
    title: "Construction and Real Estate",
    description:
      "BPL’s role has involved negotiating the acquisition of property, preparation and perfection of Deeds of Assignment, Leases, Tenancy agreements, Recovery of Possession, Power of Attorney, Mortgages and in obtaining statutory consents, approvals and registrations incidental to these transactions. We are also experienced in the investigation of title as well as the preparation of building leases and contractor-finance agreements. We also handle land litigation, compensation, claims and land dispute settlements.",
    image: "/images/construction.jpg",
  },
  {
    title: "Litigation and Dispute Resolution Practice",
    description:
      "Our aim is to represent our clients in the line with the best practices in law. As we constantly keep our clients’ long term goals and objectives in view, we endeavour to negotiate and pursue results that make good business sense. We provide insight, strategies and legal opinions on complex and technical areas of the law. Effective and efficient strategies are evolved for particular cases to ensure prompt and favorable results in practical manner as may be obtainable for our clients.",
    image: "/images/litigation-logo.jpg",
  },
  {
    title: "General Retainer",
    description:
      "The Firm provides a full range of legal advisory and secretarial  services on an annual basis. These services include but are not limited to the following: Conduct Company Secretarial/Regulatory Compliance with CAC. Attend meetings, provide legal advice and opinions, draft correspondence and negotiate contracts on behalf of your organisation; Draft and review various documents and ensure their due execution and perfection; Send notifications on new laws, regulations and other developments that may have an impact on your business;",
    image: "/images/retainer.jpg",
  },
  {
    title: "Company Secretarial Duties and Advisory",
    description:
      "BPL acts as Company Secretary to private and public companies in the following capacities; handling board meetings, filing requisite returns on behalf of our clients, ensuring our clients comply with the requirements of the Companies and Allied Matters Act 2020 and any other statute or rules regulating their sphere of business, liaising with our clients’ lawyers in Nigeria and overseas amongst others. We render general Legal advice and issue legal opinion on all aspects of commercial law and practice within and outside the Federal Republic of Nigeria.",
    image: "/images/company.jpg",
  },
  {
    title: "Entertainment Law",
    description:
      "At BPL, we provide our Clients with our deep expertise in a variety of entertainment Law matters, including but not limited to drafting and negotiating development and production contracts, such as writer agreements, talent agreements, and recording agreements. Facilitating and negotiating distribution deals for an entertainment project. We have worked on financing agreements for sponsorships, bank loans, co-production investments, grants, and other types of investments. Reviewing contracts and other legal documents to analyze rights issues or other business or legal questions is also our forte.",
    image: "/images/enter.jpg",
  },
  {
    title: "Labour and Employment",
    description:
      "BPL is engaged in rendering advice on personal and group contracts of employment and is involved in collective agreement negotiation. In addition, we advise on workmen compensation and other personal injury or fatal accident claims and act on our clients’ behalf in the above regard where required.",
    image: "/images/labour.jpg",
  },
  {
    title: "Patents, Trademarks and Intellectual Property",
    description:
      "BPL acts as Trademark Agents and has established itself as experts in the protection of other intellectual property rights as well as in negotiating and drafting franchise agreements.",
    image: "/images/patent.jpg",
  },
  {
    title: "Taxation",
    description:
      "Our lawyers offer tax advisory and compliance services in the following areas: Petroleum Income Tax, Companies Income Tax, Personal Income Tax, Revenue Charges and other liabilities, Customs and Excise Tax, Value-Added Tax, Tax Appeals, Legal and Regulatory Advisory, Tax Advice and Business Permits. BPL offers customized tax advice to suit our client’s specific situations, our lawyers routinely, engage in all-inclusive tax planning in order to address potential tax issues or liabilities in the future. In commercial transactions, our clients are regularly advised, to take full advantage of tax benefits such as tax exemptions subject to the line of services or products that the company shall operate in, or manufacture. In the event of contentious disputes with tax authorities, we work with the aim of mitigating our clients’ tax liability to a minimum charge.",
    image: "/images/tax.jpg",
  },
];

function Services() {
  const [activeIndex, setActiveIndex] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section services" style={{ margin: 0, padding: 0 }}>
      {/* 🔹 Full-Width Animated Banner Image */}
      <div
        ref={ref}
        style={{
          width: "100vw",
          height: "390px",
          overflow: "hidden",
          margin: 0,
          padding: 0,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.8s ease-out",
        }}
      >
        <img
          src="/images/hero-legal.jpg"
          alt="Legal Services Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* 🔹 Service Cards */}
      <div style={{ padding: "40px 20px" }}>
        <h2>Our Practice Areas</h2>
        <div
  className="service-cards"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  }}
>

          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              isActive={activeIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;