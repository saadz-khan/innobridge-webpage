import { Mail, MonitorPlay, Phone, UserRoundCheck } from "lucide-react";
import { contact, supportChannels } from "../data/siteContent";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

export function SupportSection() {
  return (
    <section className="section section--support" id="support" aria-labelledby="support-title">
      <div className="container">
        <SectionHeader
          eyebrow="360-degree support"
          title="Real support, whenever you need it."
          description="Innobridge supports legal professionals with practical training, live walkthroughs, and embedded guidance that keeps work moving."
        />

        <div className="support-grid">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <Reveal className="support-card" delay={index * 80} key={channel.title}>
                <Icon size={23} />
                <h3>{channel.title}</h3>
                <p>{channel.detail}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="support-contact">
          <a href={contact.phoneHref}>
            <Phone size={20} />
            <span>{contact.phone}</span>
          </a>
          <a href={contact.emailHref}>
            <Mail size={20} />
            <span>{contact.email}</span>
          </a>
          <div>
            <MonitorPlay size={20} />
            <span>Zoom walkthrough support</span>
          </div>
          <div>
            <UserRoundCheck size={20} />
            <span>1-on-1 expert support and training</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
