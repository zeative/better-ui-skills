#!/usr/bin/env python3
"""Collect one isolated run into the workspace and grade the measurable assertions.

usage: collect.py <sandbox_run_dir> <workspace_run_dir> [--setup setup.js]

sandbox_run_dir   holds work/ (what the session wrote) and transcript.jsonl
workspace_run_dir is e.g. better-ui-workspace/iteration-1/<case>/with_skill
"""
import json, os, shutil, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
AUDIT = ROOT / "better-ui" / "scripts" / "audit.cjs"

def main():
    src, dst = Path(sys.argv[1]).resolve(), Path(sys.argv[2]).resolve()
    setup = str(Path(sys.argv[sys.argv.index("--setup") + 1]).resolve()) if "--setup" in sys.argv else None
    out = dst / "outputs"
    if out.exists(): shutil.rmtree(out)
    out.mkdir(parents=True)
    page = src / "work" / "index.html"
    shutil.copy(page, out / "index.html")

    # what the session actually did
    tools, skills, files_read, result = {}, [], [], {}
    for line in open(src / "transcript.jsonl"):
        try: e = json.loads(line)
        except Exception: continue
        if e.get("type") == "assistant":
            for b in e["message"].get("content", []):
                if b.get("type") == "tool_use":
                    tools[b["name"]] = tools.get(b["name"], 0) + 1
                    if b["name"] == "Skill": skills.append(b["input"].get("skill"))
                    if b["name"] == "Read" and ".claude/skills" in b["input"].get("file_path", ""):
                        files_read.append(b["input"]["file_path"].split(".claude/skills/")[1])
        if e.get("type") == "result": result = e
    secs = round(result.get("duration_ms", 0) / 1000, 1)
    usage = result.get("usage", {})
    tokens = sum(usage.get(k, 0) for k in ("input_tokens", "output_tokens", "cache_creation_input_tokens", "cache_read_input_tokens"))
    json.dump({"total_tokens": tokens, "output_tokens": usage.get("output_tokens"), "duration_ms": result.get("duration_ms"),
               "total_duration_seconds": secs, "cost_usd": round(result.get("total_cost_usd", 0), 2), "turns": result.get("num_turns")},
              open(dst / "timing.json", "w"), indent=2)
    json.dump({"skills_invoked": skills, "skill_files_read": files_read, "tool_calls": tools,
               "permission_denials": [d.get("tool_input") for d in result.get("permission_denials", [])]},
              open(dst / "run_facts.json", "w"), indent=2)

    # screenshots + measurements
    shots = dst / "shots"
    cmd = ["node", str(AUDIT), str(out / "index.html"), "--out", str(shots), "--json"]
    if setup: cmd += ["--setup", setup]
    a = json.loads(subprocess.run(cmd, capture_output=True, text=True, check=True, cwd=dst).stdout)
    text = subprocess.run([c for c in cmd if c != "--json"] + ["--no-shots"], capture_output=True, text=True, cwd=dst).stdout
    (dst / "audit.txt").write_text(text)
    for w, name in ((1440, "desktop"), (375, "phone")):
        for kind in ("full", "fold"):
            p = shots / f"{w}-{kind}.png"
            if p.exists():
                shutil.copy(p, out / f"{name}.png"); break
    shutil.rmtree(shots, ignore_errors=True)

    R = a["results"]; wide, narrow = R[-1]["m"], R[0]["m"]; f = a.get("focus") or {"checked": 0, "invisible": []}
    n_sizes = max(len(r["m"]["fontSizes"]) for r in R)
    n_lc = max(r["m"]["lowContrastCount"] for r in R)
    hard = [t for r in R for t in r["m"]["smallTargets"] if t["hard"]]
    soft = [t for t in narrow["smallTargets"] if not t["hard"]]
    checks = [
        ("The page has no horizontal overflow when rendered at 375px, 768px and 1440px wide.",
         all(r["m"]["overflowPx"] <= 1 for r in R), "overflow px: " + ", ".join(f'{r["width"]}→{r["m"]["overflowPx"]}' for r in R)),
        ("Every piece of visible text meets WCAG AA contrast (4.5:1, or 3:1 for large text) against its background.",
         n_lc == 0, f"{n_lc} text elements below AA" + (": worst " + ", ".join(f'{x["ratio"]}:1 {x["el"]}' for x in wide["lowContrast"][:3]) if n_lc else "")),
        ("The rendered page uses at most 12 distinct font sizes.", n_sizes <= 12,
         f"{n_sizes} sizes: " + ", ".join(sorted(wide["fontSizes"], key=float))),
        ("The rendered page uses at most 7 distinct corner radii.", len(wide["radii"]) <= 7,
         f'{len(wide["radii"])} radii: ' + ", ".join(wide["radii"])),
        ("Every element reached by pressing Tab shows a visible focus style.", f["checked"] > 0 and not f["invisible"],
         f'{f["checked"]} elements tabbed, {len(f["invisible"])} with no visible change' + (": " + "; ".join(f["invisible"][:3]) if f["invisible"] else "")),
        ("No interactive element is smaller than 24×24px, and at 375px wide no button or control is under 40px in its tappable dimension.",
         not hard and not soft, f"{len(hard)} under 24px, {len(soft)} under 40px at 375px" + (": " + "; ".join(f'{t["el"]} {t["w"]}×{t["h"]}' for t in (hard + soft)[:4]) if hard or soft else "")),
        ("The page has a lang attribute, a viewport meta tag, exactly one visible h1, a main landmark, and no skipped heading levels.",
         bool(wide["lang"]) and wide["viewportMeta"] and wide["h1Count"] == 1 and wide["landmarks"]["main"] and not wide["headingSkips"],
         f'lang={wide["lang"]}, viewport={wide["viewportMeta"]}, h1={wide["h1Count"]}, main={wide["landmarks"]["main"]}, skips={wide["headingSkips"]}'),
        ("Every form field has a label and every button or link has an accessible name.", not wide["unnamed"] and not wide["unlabeled"],
         f'{len(wide["unnamed"])} unnamed controls, {len(wide["unlabeled"])} unlabelled fields' + (": " + "; ".join((wide["unnamed"] + wide["unlabeled"])[:3]) if wide["unnamed"] or wide["unlabeled"] else "")),
        ("The page loads with no console errors and no failed network requests.", not a["runtime"]["errors"] and not a["runtime"]["failed"],
         f'{len(a["runtime"]["errors"])} errors, {len(a["runtime"]["failed"])} failed requests' + (": " + "; ".join((a["runtime"]["errors"] + a["runtime"]["failed"])[:2]) if a["runtime"]["errors"] or a["runtime"]["failed"] else "")),
    ]
    exp = [{"text": t, "passed": bool(p), "evidence": ev} for t, p, ev in checks]
    passed = sum(e["passed"] for e in exp)
    json.dump({"expectations": exp, "summary": {"passed": passed, "failed": len(exp) - passed, "total": len(exp), "pass_rate": round(passed / len(exp), 2)},
               "execution_metrics": {"tool_calls": tools, "total_tool_calls": sum(tools.values())},
               "timing": {"total_duration_seconds": secs}},
              open(dst / "grading.json", "w"), indent=2, ensure_ascii=False)
    print(f"{dst}: {passed}/{len(exp)} passed | {secs}s | ${round(result.get('total_cost_usd', 0), 2)} | skills={skills}")
    for e in exp:
        print("  ", "PASS" if e["passed"] else "FAIL", "-", e["evidence"][:150])

main()
