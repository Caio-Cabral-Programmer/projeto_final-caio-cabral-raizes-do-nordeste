import { PRIVACY_INTRO, PRIVACY_SECTIONS } from "../data/privacyText";

// Renderização única da política de privacidade, compartilhada pelo modal de consentimento e pela página /privacidade.
export function PrivacyContent() {
  return (
    <div>
      <p>{PRIVACY_INTRO}</p>
      {PRIVACY_SECTIONS.map((section) => (
        <section key={section.title} className="mb-3">
          <h3 className="h6 fw-bold">{section.title}</h3>
          {section.text && <p className="mb-1">{section.text}</p>}
          {section.items && (
            <ul className="mb-1">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.footer && <p className="mb-0">{section.footer}</p>}
        </section>
      ))}
    </div>
  );
}
