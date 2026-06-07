import { lexSync, parseSync, transpile } from "sommark";
import fs from "fs";
import { performance } from "perf_hooks";

async function runDiagnostic() {
    console.log("--- SomMark Performance Diagnostic ---");

    const smarkSrc = fs.readFileSync("debug.smark", "utf-8");
    const imageBase64 = fs.readFileSync("elmi-tech-logo.png").toString("base64");
    const data = {
        "First-Name": "Adam",
        "Last-Name": "Elmi",
        "Title": "Developer",
        "Email": "adam@elmi.tech",
        "Phone": "+123456789",
        "City": "Hargeisa",
        "Country": "Somaliland",
        "picture": "data:image/png;base64," + imageBase64,
        "profile_title": "Senior Software Architect",
        "link-1": "github.com/adam",
        "link-2": "linkedin.com/in/adam",
        "exp-1-position": "CEO",
        "exp-1-company": "Elmi Tech",
        "exp-1-city": "Hargeisa",
        "exp-1-start": "2020",
        "exp-1-end": "Present",
        "exp-1-desc": "Leading the future of coding.",
        "edu-1-school": "MIT",
        "edu-1-degree": "PhD in Computer Science",
        "edu-1-start": "2015",
        "edu-1-end": "2019",
        "skill-1": "TypeScript",
        "skill-2": "React",
        "skill-3": "Bun",
        "skill-4": "SomMark"
    };

    console.log(`Source Size: ${(smarkSrc.length / 1024).toFixed(2)} KB`);
    console.log(`Image Size: ${(data.picture.length / 1024 / 1024).toFixed(2)} MB`);

    // 1. Lexing (Fast Path)
    const t1 = performance.now();
    const tokens = lexSync(smarkSrc);
    const t2 = performance.now();
    console.log(`Lexing (Source only): ${(t2 - t1).toFixed(2)}ms (${tokens.length} tokens)`);

    // 2. Parsing with Data (The suspected bottleneck)
    const t3 = performance.now();
    const ast = parseSync(smarkSrc, {
        placeholders: data,
        format: "html"
    });
    const t4 = performance.now();
    console.log(`Parsing (Source + Placeholders): ${(t4 - t3).toFixed(2)}ms`);

    // 3. Full Transpilation
    const t5 = performance.now();
    const result = await transpile({
        src: smarkSrc,
        format: "html",
        placeholders: data
    });
    const t6 = performance.now();
    console.log(`Total Transpilation: ${(t6 - t5).toFixed(2)}ms`);
    console.log(`Output Size: ${(result.length / 1024 / 1024).toFixed(2)} MB`);

    console.log("--------------------------------------");
}

runDiagnostic().catch(console.error);
