import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "./Button";

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
      <div className="form-grid">
        <label>
          <span>First name</span>
          <input name="firstName" autoComplete="given-name" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>
          <span>Last name</span>
          <input name="lastName" autoComplete="family-name" value={form.lastName} onChange={handleChange} required />
        </label>
        <label className="form-grid__wide">
          <span>Firm name</span>
          <input name="firmName" autoComplete="organization" value={form.firmName} onChange={handleChange} required />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          <span>Role</span>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="">Select role</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Conveyancer">Conveyancer</option>
            <option value="Paralegal">Paralegal</option>
            <option value="Firm owner">Firm owner</option>
            <option value="Operations leader">Operations leader</option>
          </select>
        </label>
        <label>
          <span>Monthly matter volume</span>
          <select name="caseload" value={form.caseload} onChange={handleChange}>
            <option value="">Select volume</option>
            <option value="1-20">1-20</option>
            <option value="21-50">21-50</option>
            <option value="51-100">51-100</option>
            <option value="100+">100+</option>
          </select>
        </label>
        <label className="form-grid__wide">
          <span>What should the demo focus on?</span>
          <textarea name="message" rows={4} value={form.message} onChange={handleChange} />
        </label>
      </div>

      <label className="consent-row">
        <input name="consent" type="checkbox" checked={form.consent} onChange={handleChange} required />
        <span>I agree to be contacted by Innobridge about SmartConveyance.</span>
      </label>

      <div className="form-footer">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || !isComplete}
          icon={isSubmitting ? <LoaderCircle className="spin" size={17} /> : <ArrowRight size={17} />}
        >
          Book your demo today
        </Button>
        <div className={`form-status form-status--${submitState.status}`} aria-live="polite">
          {submitState.status === "success" ? <CheckCircle2 size={18} /> : null}
          <span>{submitState.message}</span>
        </div>
      </div>
    </form>
  );
}
