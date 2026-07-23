import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { SAMPLE_TRIALS } from "@/lib/constants";

export default function OpenTrials() {
  return (
    <section id="trials" className="bg-[#0F1419] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Open <span className="text-[#D4A843]">Trials</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9CA3AF]">
            Currently available scouting opportunities
          </p>
        </div>

        {SAMPLE_TRIALS.length === 0 ? (
          <div className="mt-16 rounded-xl border border-white/10 bg-[#1A1F2E] p-12 text-center">
            <p className="text-lg text-[#9CA3AF]">
              No open trials at the moment. Check back soon for new
              opportunities!
            </p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {SAMPLE_TRIALS.map((trial) => (
              <div
                key={trial.id}
                className="group flex flex-col rounded-xl border border-white/10 bg-[#1A1F2E] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D7B3E]/40 hover:shadow-lg hover:shadow-[#0D7B3E]/5"
              >
                <h3 className="text-xl font-bold text-white">
                  {trial.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {trial.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-[#9CA3AF]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-[#0D7B3E]" />
                    <span>{trial.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0 text-[#0D7B3E]" />
                    <span>{trial.date}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {trial.positions.map((pos) => (
                    <span
                      key={pos}
                      className="rounded-full bg-[#0D7B3E]/15 px-3 py-1 text-xs font-medium text-[#0D7B3E]"
                    >
                      {pos}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <p className="text-xs text-[#9CA3AF]">
                    Deadline:{" "}
                    <span className="font-medium text-white">
                      {trial.deadline}
                    </span>
                  </p>
                  <Link
                    href="/register"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[#0D7B3E] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0A6631]"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
