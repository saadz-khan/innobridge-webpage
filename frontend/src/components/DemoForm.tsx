import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";

type DemoFormState = {
  firstName: string;
  lastName: string;
  firmName: string;
  email: string;
  phone: string;
  role: string;
  caseload: string;
  message: string;
  consent: boolean;
};

const initialState: DemoFormState = {
  firstName: "",
  lastName: "",
  firmName: "",
  email: "",
  phone: "",
  role: "",
  caseload: "",
  message: "",
  consent: false
};

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: "Submitting..." }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function DemoForm() {
  const [form, setForm] = useState<DemoFormState>(initialState);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });

  const isSubmitting = submitState.status === "loading";
  const isComplete = useMemo(
    () => form.firstName && form.lastName && form.firmName && form.email && form.consent,
    [form]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((current) => ({ ...current, [name]: target.checked }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState({ status: "loading", message: "Submitting..." });

    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || "The request could not be submitted.");
      }

      setForm(initialState);
      setSubmitState({
        status: "success",
        message: "Your request was received. Innobridge will follow up with demo scheduling details."
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : "The request could not be submitted."
      });
    }
  };

  return (
    <form className="demo-form" id="demo-form" onSubmit={handleSubmit}>
      <div className="form-title">Legal Workflow Fit Assessment</div>
      <div className="form-sub">A solutions expert will personally show you how SmartConveyance fits your firm.</div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">First name</label>
          <input
            className="form-input"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lastName">Last name</label>
          <input
            className="form-input"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder="Smith"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="firmName">Firm name</label>
        <input
          className="form-input"
          id="firmName"
          name="firmName"
          autoComplete="organization"
          placeholder="Smith & Associates LLP"
          value={form.firmName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="email">Work email</label>
          <input
            className="form-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@smithlaw.ca"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            className="form-input"
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (604) 000-0000"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="role">Your role</label>
          <select className="form-select" id="role" name="role" value={form.role} onChange={handleChange}>
            <option value="">Select role</option>
            <option value="Lawyer / Partner">Lawyer / Partner</option>
            <option value="Conveyancer">Conveyancer</option>
            <option value="Legal Assistant">Legal Assistant</option>
            <option value="Paralegal">Paralegal</option>
            <option value="Firm Owner / Administrator">Firm Owner / Administrator</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="caseload">Monthly matter volume</label>
          <select className="form-select" id="caseload" name="caseload" value={form.caseload} onChange={handleChange}>
            <option value="">Select volume</option>
            <option value="1-10">1-10</option>
            <option value="11-30">11-30</option>
            <option value="31-60">31-60</option>
            <option value="61-100">61-100</option>
            <option value="100+">100+</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          What should the demo focus on? <span>(optional)</span>
        </label>
        <textarea
          className="form-textarea"
          id="message"
          name="message"
          placeholder="e.g. LTSA filing workflow, document generation, team collaboration..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <label className="form-check">
        <input id="consent" name="consent" type="checkbox" checked={form.consent} onChange={handleChange} required />
        <span>
          I agree to be contacted by Innobridge about SmartConveyance. We respect your privacy and will never share your
          information.
        </span>
      </label>

      <div className="form-footer">
        <button
          className="btn btn--primary form-submit"
          type="submit"
          disabled={isSubmitting || !isComplete}
        >
          {isSubmitting ? <LoaderCircle className="spin" size={17} /> : null}
          Book your demo today
        </button>
        <div className={`form-status form-status--${submitState.status}`} aria-live="polite">
          {submitState.status === "success" ? <CheckCircle2 size={18} /> : null}
          <span>{submitState.message}</span>
        </div>
      </div>
    </form>
  );
}
