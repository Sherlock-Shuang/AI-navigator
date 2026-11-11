import { test } from 'node:test'
import assert from 'node:assert/strict'
import { TOOLS_DATA } from '../src/data/tools.ts'
import { PRACTICE_PATHS } from '../src/data/practice.ts'
import { recommendTools, reviewAge } from '../src/lib/recommendations.ts'
import { emptyRecord, parseRecords, recordsCsv, shareText } from '../src/lib/practice-record.ts'
const date='2026-11-05'
test('all task suggestions point to catalog entries, never an unrelated task',()=>{
 for(const path of PRACTICE_PATHS){const rows=recommendTools(TOOLS_DATA,path,'',false,date);assert.equal(rows.length,path.tools.length);assert.ok(rows.every(r=>path.tools.some(t=>t.id===r.tool.id)));assert.ok(rows.every(r=>r.reasons.length&&r.reason))}
})
test('fresh filter excludes stale or missing evidence and never changes source dates',()=>{
 const p=PRACTICE_PATHS[0];assert.equal(recommendTools(TOOLS_DATA,p,'',true,'2027-01-01').length,0)
 assert.ok(recommendTools(TOOLS_DATA,p,'',true,date).every(r=>r.fresh))
 assert.equal(reviewAge({...TOOLS_DATA[0],checkedAt:'2027-01-01'},date),null)
 assert.equal(reviewAge({...TOOLS_DATA[0],checkedAt:undefined},date),null)
})
test('unknown query returns empty instead of fabricating recommendations',()=>{assert.deepEqual(recommendTools(TOOLS_DATA,PRACTICE_PATHS[0],'no-such-feature-xyz',false,date),[])})
test('keyword matching and sorting are deterministic',()=>{
 const rows=recommendTools(TOOLS_DATA,PRACTICE_PATHS[1],'CODEX',true,date);assert.equal(rows[0]?.tool.id,'codex')
 assert.deepEqual(rows,recommendTools(TOOLS_DATA,PRACTICE_PATHS[1],'CODEX',true,date))
})
test('record roundtrip preserves multiline evidence and does not merge other tasks',()=>{
 const r={...emptyRecord('paper'),goal:'核对论文',result:'第一行\n第二行',completed:[0,2]}
 assert.deepEqual(parseRecords(JSON.stringify({paper:r})),{paper:r})
 assert.deepEqual(parseRecords(JSON.stringify({unrecognized:r})),{})
})
test('corrupt, oversized or invalid records are rejected',()=>{
 for(const raw of ['null','[]','{',JSON.stringify({paper:{...emptyRecord('paper'),completed:[4]}}),JSON.stringify({paper:{...emptyRecord('paper'),goal:'x'.repeat(501)}})])assert.throws(()=>parseRecords(raw))
})
test('CSV quotes multiline text and neutralizes spreadsheet formulas',()=>{
 const r={...emptyRecord('paper'),goal:'=1+1',result:'"quote"\nnext'}
 const csv=recordsCsv([r]);assert.ok(csv.includes('"\'=1+1"'));assert.ok(csv.includes('""quote""\nnext'))
})
test('sharing distinguishes missing time and stays under community limit',()=>{
 assert.ok(shareText('论文',emptyRecord('paper')).includes('未记录'))
 assert.ok(shareText('论文',{...emptyRecord('paper'),minutes:'15'}).includes('15分钟'))
})
