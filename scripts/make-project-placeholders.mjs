// Writes placeholder project photos: public/images/projects/<slug>-1.svg … -4.svg
// Run once with: node scripts/make-project-placeholders.mjs
import { writeFileSync } from "node:fs";

// One wall / floor / accent colour per project
const projects = {
  "beth": ["#D9CBB4", "#B4673F", "#6E7448"],
  "dinkwac": ["#E3D5C3", "#8C6A4F", "#3F5A6B"],
  "good-company": ["#CFC6B8", "#7A5C45", "#A2563A"],
  "everyday-rituals": ["#E8DFD2", "#9C7B5B", "#5F6B4E"],
  "nook-and-move": ["#D6CCBF", "#6F5646", "#B08A4A"],
};

// Four simple scenes; each one is drawn on top of the wall + floor
const scenes = [
  // 1. window + sofa
  (a) => `
    <rect x="150" y="50" width="70" height="100" fill="#F4EFE6" stroke="#C9BFB4" stroke-width="3"/>
    <line x1="185" y1="50" x2="185" y2="150" stroke="#C9BFB4" stroke-width="2"/>
    <rect x="30" y="170" width="120" height="45" rx="6" fill="${a}"/>`,
  // 2. shelf with objects
  (a) => `
    <rect x="40" y="120" width="170" height="8" fill="#6B5D53"/>
    <rect x="60" y="85" width="22" height="35" fill="${a}"/>
    <circle cx="120" cy="105" r="15" fill="#2B1B15"/>
    <rect x="160" y="95" width="30" height="25" fill="#F4EFE6"/>`,
  // 3. table + pendant
  (a) => `
    <line x1="125" y1="0" x2="125" y2="90" stroke="#6B5D53" stroke-width="2"/>
    <path d="M 100 110 A 25 25 0 0 1 150 110 Z" fill="#2B1B15"/>
    <rect x="60" y="180" width="130" height="10" fill="${a}"/>
    <rect x="70" y="190" width="8" height="30" fill="${a}"/>
    <rect x="172" y="190" width="8" height="30" fill="${a}"/>`,
  // 4. arched doorway
  (a) => `
    <path d="M 80 210 V 110 A 45 45 0 0 1 170 110 V 210 Z" fill="${a}"/>`,
];

for (const [slug, [wall, floor, accent]] of Object.entries(projects)) {
  scenes.forEach((scene, i) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 300">
  <rect width="250" height="300" fill="${wall}"/>
  <rect x="0" y="210" width="250" height="90" fill="${floor}"/>${scene(accent)}
</svg>
`;
    writeFileSync(`public/images/projects/${slug}-${i + 1}.svg`, svg);
  });
}

console.log("Wrote 20 placeholder photos");
