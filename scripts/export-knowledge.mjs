// Bundles src/data/portfolio.ts (resolving the "@/" alias) and writes the
// assistant's knowledge file, so the chatbot can never drift from the site.
//   node scripts/export-knowledge.mjs
import { build } from "esbuild";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = resolve(root, "assistant/backend/knowledge/portfolio.json");
const tmpFile = resolve(tmpdir(), `portfolio-data-${process.pid}.mjs`);

await build({
  entryPoints: [resolve(root, "src/data/portfolio.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: tmpFile,
  alias: { "@": resolve(root, "src") },
  logLevel: "error",
});

const data = await import(pathToFileURL(tmpFile).href);
rmSync(tmpFile, { force: true });

const { profile, topStats, strengths, companies, skillGroups, about, certifications } = data;

const knowledge = {
  profile: {
    name: profile.name,
    role: profile.role.trim(),
    location: profile.location,
    email: profile.email,
    linkedin: profile.linkedin,
    website: profile.website,
    whatsapp: profile.whatsappHref,
    resume: profile.resumeFile,
    fullResume: profile.fullResumeFile,
  },
  highlights: topStats,
  strengths: strengths.map(({ title, body }) => ({ title, body })),
  experience: companies.map((c) => ({
    company: c.name,
    role: c.role,
    dates: c.dates,
    projects: c.items.map((i) => ({
      id: i.id,
      title: i.title,
      domain: i.domain,
      stack: i.meta,
      summary: i.blurb,
      problem: i.problem,
      approach: i.approach,
      result: i.result,
      tradeoff: i.tradeoff,
    })),
  })),
  skills: skillGroups,
  education: about.education,
  certifications,
};

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(knowledge, null, 2) + "\n");
console.log(`wrote ${outFile} (${JSON.stringify(knowledge).length} chars)`);
