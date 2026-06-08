"use client";

import { useState, Suspense } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Phone } from "lucide-react";

const SA_PHONE_RE = /^(\+9665|9665|05|5|009665)\d{8}$/;

function normalizeSaudiPhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  if (!SA_PHONE_RE.test(digits)) return null;

  if (digits.startsWith("009665")) return `+9665${digits.slice(6)}`;
  if (digits.startsWith("+9665")) return digits;
  if (digits.startsWith("9665")) return `+${digits}`;
  if (digits.startsWith("05")) return `+966${digits.slice(1)}`;
  if (digits.startsWith("5")) return `+9665${digits}`;

  return null;
}

function OnboardingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");
  const pendingCourseId = redirectUrl
    ? new URL(redirectUrl, "http://localhost").searchParams.get("course")
    : null;

  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const normalized = normalizeSaudiPhone(phone);
    if (!normalized) {
      setError("يرجى إدخال رقم جوال سعودي صحيح");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/complete-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: normalized }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || data.message || "حدث خطأ ما");
        setSubmitting(false);
        return;
      }

      await user?.reload();

      if (pendingCourseId) {
        try {
          const enrollRes = await fetch("/api/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId: pendingCourseId }),
          });
          if (enrollRes.ok || enrollRes.status === 409) {
            router.push("/my-library");
            return;
          }
        } catch {
          // auto-enroll failed, fall through
        }
      }

      const safeRedirect =
        redirectUrl &&
        redirectUrl.startsWith("/") &&
        !redirectUrl.startsWith("//")
          ? redirectUrl
          : "/enroll";
      router.push(safeRedirect);
    } catch {
      setError("حدث خطأ في الاتصال");
      setSubmitting(false);
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 my-auto pt-8">
      <UserButton />
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-bl from-[#ffa02f] to-[#e8942b] shadow-md">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl">أدخل رقم الجوال</CardTitle>
          <CardDescription>
            سنستخدمه للتواصل معك بخصوص حسابك وخدمات سند
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phoneNumber">رقم الجوال</Label>
              <Input
                id="phoneNumber"
                name="tel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                dir="ltr"
                placeholder="05xxxxxxxx"
                aria-describedby="phoneNumber-help phoneNumber-error"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={submitting}
              />
              <p
                id="phoneNumber-help"
                className="text-muted-foreground text-xs"
              >
                مثال: 05xxxxxxxx
              </p>
            </div>

            {error && (
              <p
                id="phoneNumber-error"
                className="text-destructive text-sm"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={submitting || !phone.trim()}
            >
              {submitting && <Loader2 className="animate-spin" />}
              {submitting ? "جاري الحفظ..." : "متابعة"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingPageContent />
    </Suspense>
  );
}
