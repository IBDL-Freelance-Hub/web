import React from "react";
import { Mail, Clock } from "lucide-react";

export interface SuccessHeaderProps {
  firstName: string;
  isAr: boolean;
  email?: string;
}

export function SuccessHeader({ firstName, isAr, email }: SuccessHeaderProps) {
  return (
    <div className="mb-8 text-center">
      {/* 1. Account Status Pill: Inactive / Pending Activation */}
      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-800 shadow-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
        </span>
        <span>
          {isAr
            ? "حالة الحساب: غير مفعل (بانتظار التفعيل عبر البريد)"
            : "Account Status: Inactive (Pending Email Activation)"}
        </span>
      </div>

      {/* 2. Main Title */}
      <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
        {isAr
          ? "تم تأكيد تسجيلك! متبقي خطوة واحدة لتفعيل الحساب."
          : "Registration Received! One Step Left to Activate Your Account."}
      </h2>

      {/* 3. Subtitle */}
      <p className="mx-auto max-w-lg text-center text-xs leading-relaxed text-[#3e3e5c] sm:text-sm">
        {isAr
          ? `${firstName} — مرحباً بك في منصة المستقلين من IBDL. تم حجز عضويتك الأساسية المجانية بنجاح، ولكن حسابك غير مفعل حتى الآن حتى تؤكد بريدك الإلكتروني.`
          : `${firstName} — Welcome to the IBDL Freelancers Hub. Your complimentary Essential Membership is reserved, but your account is not active yet until you confirm your email.`}
      </p>

      {/* 4. Prominent Amber Action Card */}
      <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/50 p-4 text-start shadow-sm">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-500 text-white shadow-sm">
            <Mail className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-950">
                {isAr
                  ? "أرسلنا رابط التفعيل فوراً إلى بريدك الإلكتروني"
                  : "We sent an activation link to your email immediately"}
              </span>
            </div>
            <p className="leading-relaxed text-amber-900">
              {isAr ? (
                <>
                  تم إرسال رابط التفعيل إلى{" "}
                  {email ? (
                    <strong className="text-amber-950 underline underline-offset-2">
                      {email}
                    </strong>
                  ) : (
                    "بريدك الإلكتروني المسجل"
                  )}
                  . حسابك <strong>غير مفعل حالياً</strong>، ويجب الضغط على
                  الرابط وتعيين كلمة المرور لتتمكن من تسجيل الدخول.
                </>
              ) : (
                <>
                  An activation link was dispatched to{" "}
                  {email ? (
                    <strong className="text-amber-950 underline underline-offset-2">
                      {email}
                    </strong>
                  ) : (
                    "your registered email"
                  )}
                  . Your account is <strong>currently inactive</strong>, and you
                  must click the link and set your password to sign in.
                </>
              )}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#e11119]">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>
                {isAr
                  ? "⚠️ رابط التفعيل صالح لمدة ١٠ دقائق فقط من الآن!"
                  : "⚠️ The activation link is valid for 10 minutes only from now!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
