#!/usr/bin/env node
// One-shot migration: _legacy/_posts/**/*.{md,markdown} -> src/content/posts/
// Maps Jekyll front matter to Twilight's content schema.
// Usage: node scripts/migrate-jekyll.cjs

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, '_legacy', '_posts');
const DST_DIR = path.join(ROOT, 'src', 'content', 'posts');

const TEMPLATE_TITLES = new Set(['模板，改hidden']);

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

function* walk(dir, base = dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(full, base);
        else if (/\.(md|markdown)$/i.test(entry.name)) {
            yield { full, rel: path.relative(base, full) };
        }
    }
}

function stripQuotes(s) {
    s = s.trim();
    if (s.length >= 2 && ((s[0] === '"' && s.slice(-1) === '"') || (s[0] === "'" && s.slice(-1) === "'"))) {
        return s.slice(1, -1);
    }
    return s;
}

function parseFrontMatter(text) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!m) return { data: {}, body: text };
    const fmRaw = m[1];
    const body = m[2];
    const data = {};
    const lines = fmRaw.split(/\r?\n/);
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (!line.trim() || /^\s*#/.test(line)) { i++; continue; }
        const kv = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/);
        if (!kv) { i++; continue; }
        const key = kv[1];
        const rawVal = kv[2];
        if (rawVal === '') {
            const items = [];
            i++;
            while (i < lines.length && /^\s+-\s*/.test(lines[i])) {
                items.push(stripQuotes(lines[i].replace(/^\s+-\s*/, '')));
                i++;
            }
            data[key] = items;
        } else {
            let v = rawVal.trim();
            if (/^\[.*\]$/.test(v)) {
                data[key] = v.slice(1, -1).split(',').map(s => stripQuotes(s)).filter(Boolean);
            } else {
                data[key] = stripQuotes(v);
            }
            i++;
        }
    }
    return { data, body };
}

function parseDate(data, relPath) {
    if (data.date) {
        const s = String(data.date).trim().replace(/\s+/, 'T');
        const d = new Date(s);
        if (!isNaN(d.getTime())) return d;
        const d2 = new Date(String(data.date).trim());
        if (!isNaN(d2.getTime())) return d2;
    }
    const m = path.basename(relPath).match(/^(\d{4})-(\d{1,2})-(\d{1,2})-/);
    if (m) {
        const y = m[1];
        const mo = m[2].padStart(2, '0');
        const da = m[3].padStart(2, '0');
        return new Date(`${y}-${mo}-${da}T08:00:00+08:00`);
    }
    return null;
}

function yamlScalar(s) {
    s = String(s);
    if (s === '') return '""';
    if (/[:#&*!|>%@`\[\]{},]/.test(s) || /^[\s-]/.test(s) || /\s$/.test(s) || /["']/.test(s)) {
        return JSON.stringify(s);
    }
    return s;
}

function renderFrontMatter(obj) {
    const lines = ['---'];
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined || v === null) continue;
        if (Array.isArray(v)) {
            if (v.length === 0) continue;
            lines.push(`${k}:`);
            for (const item of v) lines.push(`  - ${yamlScalar(item)}`);
        } else if (typeof v === 'boolean') {
            lines.push(`${k}: ${v}`);
        } else {
            lines.push(`${k}: ${yamlScalar(v)}`);
        }
    }
    lines.push('---');
    return lines.join('\n');
}

function cleanFilename(name) {
    return name.replace(/\.markdown$/i, '.md').replace(/\s+/g, '-');
}

let migrated = 0, skipped = 0, drafts = 0;
const issues = [];

for (const { full, rel } of walk(SRC_DIR)) {
    const text = fs.readFileSync(full, 'utf8');
    const { data, body } = parseFrontMatter(text);

    const title = data.title ? String(data.title).trim() : '';
    if (!title) { skipped++; issues.push(`no title: ${rel}`); continue; }
    if (TEMPLATE_TITLES.has(title)) { skipped++; continue; }

    const date = parseDate(data, rel);
    if (!date) { skipped++; issues.push(`no date: ${rel}`); continue; }

    const fm = {};
    fm.title = title;
    fm.published = date.toISOString();
    if (data.subtitle) fm.description = String(data.subtitle).trim();

    const hasCoverImg = data['header-img'] && String(data['header-style']).trim() !== 'text';
    if (hasCoverImg) {
        let img = String(data['header-img']).trim();
        if (!/^https?:\/\//.test(img) && !img.startsWith('/')) img = '/' + img;
        fm.cover = img;
    }

    if (Array.isArray(data.tags) && data.tags.length) {
        fm.tags = data.tags.map(t => String(t).trim()).filter(Boolean);
    }

    let category = null;
    if (data.category) category = Array.isArray(data.category) ? data.category[0] : data.category;
    else if (data.categories) {
        if (Array.isArray(data.categories)) category = data.categories[0];
        else if (typeof data.categories === 'string') category = data.categories.trim().split(/\s+/)[0];
    }
    if (category) fm.category = String(category).trim();

    fm.author = data.author ? String(data.author).trim() : 'Eric';

    const inHiddenDir = /(^|[\\/])hidden([\\/]|$)/i.test(rel);
    const isHidden = data.hidden === true || String(data.hidden).trim().toLowerCase() === 'true' || inHiddenDir;
    if (isHidden) { fm.draft = true; drafts++; }

    const outRel = path.dirname(rel) === '.'
        ? cleanFilename(path.basename(rel))
        : path.join(path.dirname(rel), cleanFilename(path.basename(rel)));
    const outPath = path.join(DST_DIR, outRel);
    ensureDir(path.dirname(outPath));

    fs.writeFileSync(outPath, renderFrontMatter(fm) + '\n\n' + body.trim() + '\n');
    migrated++;
}

console.log(`migrated: ${migrated}`);
console.log(`drafts (hidden): ${drafts}`);
console.log(`skipped: ${skipped}`);
if (issues.length) {
    console.log('issues:');
    for (const s of issues) console.log('  - ' + s);
}
