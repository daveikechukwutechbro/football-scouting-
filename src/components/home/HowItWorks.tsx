const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Sign up with your email and set up your player account in minutes.",
  },
  {
    number: "02",
    title: "Complete Profile",
    description:
      "Fill in your personal details, football background, and physical stats.",
  },
  {
    number: "03",
    title: "Upload Videos & Docs",
    description:
      "Share highlight reels, match footage, and supporting documents.",
  },
  {
    number: "04",
    title: "Submit Application",
    description:
      "Review your profile and submit it for scout evaluation.",
  },
  {
    number: "05",
    title: "Scout Review",
    description:
      "Our professional scouts carefully review every submission.",
  },
  {
    number: "06",
    title: "Get Contacted",
    description:
      "If selected, you'll receive a trial invitation directly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0F1419] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
            From registration to trial invitation in 6 simple steps
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#0D7B3E]/50 via-[#0D7B3E]/20 to-transparent sm:left-8 lg:left-1/2 lg:block" />

          <div className="flex flex-col gap-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className="relative flex items-start gap-6 lg:items-center"
                >
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold ${
                        index % 2 === 0
                          ? "border-[#0D7B3E] bg-[#0D7B3E]/15 text-[#0D7B3E]"
                          : "border-[#D4A843] bg-[#D4A843]/10 text-[#D4A843]"
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div className="hidden flex-1 lg:block">
                    <div
                      className={`w-[calc(50%-3rem)] ${
                        isEven ? "mr-auto text-right" : "ml-auto text-left"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-[#9CA3AF]">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 lg:hidden">
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#9CA3AF]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
