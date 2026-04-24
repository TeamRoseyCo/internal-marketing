"use client";

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget;
        const input = f.querySelector<HTMLInputElement>('input[type="email"]');
        if (input) input.value = "";
        const t = f.querySelector<HTMLDivElement>("[data-thanks]");
        if (t) t.style.display = "block";
      }}
      className="w-full max-w-md mx-auto flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="name@company.com"
          aria-label="Email address"
          className="flex-1 rounded-full border border-[#d2d2d7] bg-white px-5 py-3 text-[15px] outline-none focus:border-[#0071e3]"
        />
        <button
          type="submit"
          className="ac-pill"
          style={{ padding: "10px 20px", fontSize: "15px" }}
        >
          Subscribe
        </button>
      </div>
      <div className="ac-caption text-center">No spam. Unsubscribe in one click.</div>
      <div
        data-thanks
        style={{ display: "none" }}
        className="ac-caption text-center"
        role="status"
      >
        You are in. Check your inbox.
      </div>
    </form>
  );
}
