"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRegistration, StepNumber } from "./RegistrationProvider";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { cn } from "@/lib/utils";
import {
  X,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const EXPERTISE_OPTIONS = [
  "Leadership & Management",
  "Strategic Planning",
  "HR & Talent Development",
  "Sales & Marketing",
  "Financial Management",
  "Project Management",
  "Digital Transformation",
  "Soft Skills & Communication",
];

const EXPERIENCE_BANDS = [
  "1 - 3 Years",
  "4 - 7 Years",
  "8 - 12 Years",
  "13 - 18 Years",
  "19+ Years",
];

const COUNTRIES = [
  "Egypt",
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Jordan",
  "Lebanon",
  "Morocco",
  "Tunisia",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Turkey",
  "Malaysia",
  "Singapore",
  "South Africa",
];

export function RegistrationModal() {
  const {
    isOpen,
    step,
    formData,
    emailError,
    specimenCredential,
    closeRegistration,
    setStep,
    updateFormData,
    toggleExpertise,
    validateStep1,
    validateStep2,
    submitRegistration,
  } = useRegistration();

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md duration-200">
      <div className="bg-brand-primary border-brand-border/20 relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border shadow-2xl">
        {/* Modal Header */}
        <div className="border-brand-border/10 flex items-center justify-between border-b bg-slate-900/50 p-6">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <StatusPill tone="ok">Essential Tier</StatusPill>
              <span className="text-xs text-slate-400">
                100% Free Permanently
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Join IBDL Freelancers Hub
            </h2>
          </div>
          <button
            onClick={closeRegistration}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step <= 3 && (
          <div className="border-brand-border/10 flex items-center justify-between border-b bg-slate-900/80 px-6 py-3 text-xs">
            <div
              className={cn(
                "font-medium",
                step === 1 ? "text-brand-secondary font-bold" : "text-slate-400"
              )}
            >
              1. Your Details
            </div>
            <div className="text-slate-600">→</div>
            <div
              className={cn(
                "font-medium",
                step === 2 ? "text-brand-secondary font-bold" : "text-slate-400"
              )}
            >
              2. Your Practice
            </div>
            <div className="text-slate-600">→</div>
            <div
              className={cn(
                "font-medium",
                step === 3 ? "text-brand-secondary font-bold" : "text-slate-400"
              )}
            >
              3. Review & Confirm
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6 text-start">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ahmed Hassan"
                  value={formData.fullName}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                />
                {emailError && (
                  <p className="mt-1 text-xs text-rose-400">{emailError}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+20 100 000 0000"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Country of Residence *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) =>
                      updateFormData({ country: e.target.value })
                    }
                    className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedInUrl}
                  onChange={(e) =>
                    updateFormData({ linkedInUrl: e.target.value })
                  }
                  className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">
                  Areas of Expertise * (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {EXPERTISE_OPTIONS.map((item) => {
                    const isSelected = formData.expertise.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleExpertise(item)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                          isSelected
                            ? "bg-brand-secondary text-white shadow-sm"
                            : "border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                        )}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Years of Training Experience *
                </label>
                <select
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    updateFormData({ yearsExperience: e.target.value })
                  }
                  className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                >
                  <option value="">Select Experience Band</option>
                  {EXPERIENCE_BANDS.map((band) => (
                    <option key={band} value={band}>
                      {band}
                    </option>
                  ))}
                </select>
              </div>

              {/* CV Dropzone */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  CV / Trainer Bio Document * (.pdf, .doc, .docx)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:border-brand-secondary/60 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 p-6 text-center transition"
                >
                  <UploadCloud className="text-brand-secondary mb-2 h-8 w-8" />
                  {formData.cvFileName ? (
                    <p className="text-sm font-semibold text-emerald-400">
                      {formData.cvFileName}
                    </p>
                  ) : (
                    <>
                      <p className="text-xs font-medium text-slate-300">
                        Click to upload CV document
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        PDF or Word files accepted (Max 10MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateFormData({ cvFileName: file.name });
                    }
                  }}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Brief Trainer Biography (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a concise overview of your background..."
                  value={formData.biography}
                  onChange={(e) =>
                    updateFormData({ biography: e.target.value })
                  }
                  className="border-brand-border/20 focus:ring-brand-secondary w-full rounded-lg border bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:ring-2 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-brand-secondary/10 border-brand-secondary/30 flex items-center gap-3 rounded-xl border p-4">
                <Sparkles className="text-brand-secondary h-5 w-5 shrink-0" />
                <p className="text-xs text-slate-200">
                  You are joining on the{" "}
                  <strong className="text-white">Essential Membership</strong>{" "}
                  (100% Free permanently, no credit card required).
                </p>
              </div>

              <div className="border-brand-border/10 space-y-2 rounded-xl border bg-slate-900 p-4 text-xs text-slate-300">
                <p>
                  <strong className="text-white">Name:</strong>{" "}
                  {formData.fullName}
                </p>
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  {formData.email}
                </p>
                <p>
                  <strong className="text-white">Phone & Country:</strong>{" "}
                  {formData.phone} ({formData.country})
                </p>
                <p>
                  <strong className="text-white">Experience:</strong>{" "}
                  {formData.yearsExperience}
                </p>
                <p>
                  <strong className="text-white">Expertise:</strong>{" "}
                  {formData.expertise.join(", ")}
                </p>
                <p>
                  <strong className="text-white">CV Document:</strong>{" "}
                  {formData.cvFileName}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={formData.directoryOptIn}
                    onChange={(e) =>
                      updateFormData({ directoryOptIn: e.target.checked })
                    }
                    className="text-brand-secondary focus:ring-brand-secondary mt-0.5 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-slate-300">
                    Include my profile in the public IBDL Accredited Trainer
                    Directory
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={formData.consentDeclaration}
                    onChange={(e) =>
                      updateFormData({ consentDeclaration: e.target.checked })
                    }
                    className="text-brand-secondary focus:ring-brand-secondary mt-0.5 rounded border-slate-700 bg-slate-900"
                  />
                  <span className="text-slate-200">
                    I confirm that the information provided is accurate and
                    agree to the IBDL Freelancers Hub terms of service. *
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="space-y-6 py-6 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950 text-emerald-400">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">
                  Registration Complete!
                </h3>
                <p className="mx-auto max-w-md text-sm text-slate-300">
                  Your Essential account has been activated and your
                  complimentary PQP™ assessment credential is now available.
                </p>
              </div>

              {specimenCredential && (
                <div className="border-brand-border/20 mx-auto max-w-sm space-y-1 rounded-xl border bg-slate-900 p-4 text-center">
                  <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Specimen Credential ID
                  </p>
                  <p className="font-mono text-lg font-bold text-emerald-400">
                    {specimenCredential}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Tier: Essential (Free Access)
                  </p>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Link href="/dashboard" onClick={closeRegistration}>
                  <Button variant="primary" size="lg">
                    Enter Freelancers Hub Console →
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step <= 3 && (
          <div className="border-brand-border/10 flex items-center justify-between border-t bg-slate-900/50 p-6">
            {step > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep((step - 1) as StepNumber)}
              >
                <ArrowLeft className="me-1 h-4 w-4" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <Button
                variant="primary"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
              >
                Next: Your Practice <ArrowRight className="ms-1 h-4 w-4" />
              </Button>
            )}

            {step === 2 && (
              <Button
                variant="primary"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
              >
                Next: Review & Confirm <ArrowRight className="ms-1 h-4 w-4" />
              </Button>
            )}

            {step === 3 && (
              <Button
                variant="primary"
                disabled={!formData.consentDeclaration}
                onClick={submitRegistration}
              >
                Complete Registration <ShieldCheck className="ms-1 h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
