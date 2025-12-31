"use client";

import { useState } from "react";
import { Button, Input, FormField, Modal, Icon, Badge } from "@balanceui/core";
import { useSession } from "@/hooks/useSession";

export function UserProfile() {
  const { session, loading, updateEmail } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"success" | "error" | null>(null);

  const handleNewsletterSubscribe = async () => {
    if (!emailInput || !emailInput.includes("@")) {
      return;
    }

    setIsSubscribing(true);
    setSubscriptionStatus(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput }),
      });

      const data = await response.json();

      if (response.ok) {
        await updateEmail(emailInput);
        setSubscriptionStatus("success");
        setTimeout(() => {
          setIsModalOpen(false);
          setEmailInput("");
          setSubscriptionStatus(null);
        }, 1500);
      } else {
        setSubscriptionStatus("error");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {session.email ? (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{
                backgroundColor: "var(--bu-primary, #1976d2)",
              }}
            >
              {session.email.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm hidden sm:inline" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
              {session.email}
            </span>
            <Badge variant="success" style={{ fontSize: "0.7rem", padding: "0.2rem 0.4rem" }}>
              Active
            </Badge>
          </div>
        ) : (
          <Button
            variant="stroke"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="hidden sm:inline">Newsletter</span>
          </Button>
        )}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ padding: "1.5rem", minWidth: "320px" }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}>
            {session.email ? "Update Newsletter Email" : "Subscribe to Newsletter"}
          </h2>
          <p className="mb-4 text-sm" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
            {session.email 
              ? "Update your email address to receive our latest updates and news."
              : "Stay updated with the latest BalanceUI features, components, and design tips. We'll never spam you."}
          </p>
          <FormField label="Email Address">
            <Input
              type="email"
              placeholder="you@example.com"
              value={emailInput || session.email || ""}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setSubscriptionStatus(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubscribing) {
                  handleNewsletterSubscribe();
                }
              }}
              disabled={isSubscribing}
            />
          </FormField>
          {subscriptionStatus === "success" && (
            <div className="mt-3 p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--bu-success, #4caf50)", color: "var(--bu-on-success, #ffffff)" }}>
              ✓ Successfully subscribed!
            </div>
          )}
          {subscriptionStatus === "error" && (
            <div className="mt-3 p-3 rounded-lg text-sm" style={{ backgroundColor: "var(--bu-error, #f44336)", color: "var(--bu-on-error, #ffffff)" }}>
              ✗ Failed to subscribe. Please try again.
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="stroke" 
              onClick={() => {
                setIsModalOpen(false);
                setEmailInput("");
                setSubscriptionStatus(null);
              }}
              disabled={isSubscribing}
            >
              Cancel
            </Button>
            <Button 
              variant="solid" 
              onClick={handleNewsletterSubscribe}
              disabled={isSubscribing || !emailInput || !emailInput.includes("@")}
            >
              {isSubscribing ? "Subscribing..." : session.email ? "Update" : "Subscribe"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

