// components/AttorneyProfile.js
import React from "react";
import { useParams } from "react-router-dom";

const teamDetails = {
  "ameh-jnr": {
    name: "Ameh Ameh Jnr esq.",
    specialty: "Corporate Law",
    bio: "Ameh Junior Ameh, Esq. is an Associate Partner and the Head of the Litigation Department at Crane & Clarks Legal (CCL). He brings a wealth of experience across a broad spectrum of legal practice areas including Corporate Law, Commercial Law, Civil Litigation, Real Estate, Criminal Litigation, Employment Law, Matrimonial/Family Law, and Alternative Dispute Resolution (ADR). He has led and successfully managed numerous high-stakes legal matters, including debt recovery cases for major Nigerian commercial banks, Asset Management Corporation of Nigeria (AMCON) cases, general contract disputes, employment-related claims, matrimonial and family law proceedings, and Fundamental Human Rights enforcement actions. In his corporate practice, Ameh advises clients on infrastructure-related agreements, real estate transactions, corporate partnership arrangements, and regulatory compliance. He also handles both pre-incorporation and post-incorporation filings with the Corporate Affairs Commission (CAC), where he is a registered and accredited agent. Additionally, he is accredited with the Trademarks, Patents and Designs Registry, allowing him to advise and represent clients on intellectual property matters, including trademark registration and protection.Ameh obtained his Bachelor of Laws (LL.B) from Benue State University, graduating with Second Class Honours (Upper Division). He is a member of the Nigerian Bar Association (NBA), the Association of Succession, Trusts and Estate Planning Practitioners (ASTEP), and a student member of both the Chartered Institute of Taxation of Nigeria (CITN) and the Compliance Institute of Nigeria (CIN).",
    photo: "/images/ameh jnr.jpeg",
  },
  "jane-doe": {
    name: "Jane Doe",
    specialty: "Family Law",
    bio: "Jane Doe is a compassionate advocate for families, specializing in custody, divorce, and mediation.",
    photo: "https://via.placeholder.com/150",
  },
};

function TeamProfile() {
  const { teamId } = useParams();
  const team = teamDetails[teamId];

  if (!team) return <p>Team not found.</p>;

  return (
    <div className="team-profile">
      <img src={team.photo} alt={team.name} />
      <h2>{team.name}</h2>
      <p>
        <strong>{team.specialty}</strong>
      </p>
      <p>{team.bio}</p>
    </div>
  );
}

export default TeamProfile;
