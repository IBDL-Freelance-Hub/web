import React from "react";
import { Check } from "lucide-react";

export interface SuccessHeaderProps {
  firstName: string;
  isAr: boolean;
}

export function SuccessHeader({ firstName, isAr }: SuccessHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <div className="suc__ring relative mx-auto mb-7 grid h-24 w-24 place-items-center rounded-full bg-[#419257]/15 text-[#419257] before:absolute before:inset-0 before:animate-ping before:rounded-full before:border-2 before:border-[#419257] before:opacity-60">
        <Check className="h-10 w-10 stroke-[3]" />
      </div>

      <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-[#16162c] sm:text-3xl">
        {isAr
          ? "أهلاً بك معنا. تم تفعيل عضويتك المجانية بنجاح."
          : "You are in. Your Essential Membership is active."}
      </h2>

      <p className="mx-auto max-w-md text-center text-xs leading-relaxed text-[#3e3e5c] sm:text-sm">
        {isAr
          ? `${firstName} — مرحباً بك في منصة المستقلين من IBDL. حسابك مفعل الآن — لا يتطلب أي شيء آخر ولا توجد أي رسوم. إليك ما حدث للتو:`
          : `${firstName} — Welcome to the IBDL L&D Freelancer Hub. Your account is live — nothing else is required and nothing is owed. Here is what has just happened:`}
      </p>
    </div>
  );
}
