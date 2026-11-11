import { PGlite } from '@electric-sql/pglite'
import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
const db=new PGlite()
await db.exec(`create role anon; create role authenticated; create schema auth;
create table auth.users(id uuid primary key,email text,raw_user_meta_data jsonb default '{}');
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
create function auth.role() returns text language sql stable as $$ select current_user::text $$;
grant usage on schema public,auth to anon,authenticated;
grant execute on function auth.uid(),auth.role() to anon,authenticated;`)
await db.exec(await readFile('COMPLETE_DB_SETUP.sql','utf8'))
const migration=await readFile('supabase/migrations/20261031_community.sql','utf8')
await db.exec(migration);await db.exec(migration)
const reportsMigration=await readFile('supabase/migrations/20261105_reports.sql','utf8')
await db.exec(reportsMigration);await db.exec(reportsMigration)
let checks=0
const a='00000000-0000-4000-8000-000000000001',b='00000000-0000-4000-8000-000000000002'
await db.exec(`insert into auth.users(id,email) values('${a}','same@a.test'),('${b}','same@b.test')`)
assert.equal((await db.query('select * from profiles')).rows.length,2);checks++
async function as(role,id,sql){await db.exec(`set role ${role}; select set_config('request.jwt.claim.sub','${id||''}',false)`);try{return await db.query(sql)}finally{await db.exec('reset role')}}
async function denied(role,id,sql,code){await assert.rejects(()=>as(role,id,sql),e=>!code||e.code===code);checks++}
await denied('anon','',`insert into posts(user_id,content) values('${a}','anonymous')`,'42501')
await denied('authenticated',a,`insert into posts(user_id,content) values('${b}','spoof')`,'42501')
await denied('authenticated',a,`insert into posts(user_id,content) values('${a}','   ')`,'23514')
await denied('authenticated',a,`insert into posts(user_id,content) values('${a}',repeat('x',2001))`,'23514')
await denied('authenticated',a,`insert into posts(user_id,content,topic) values('${a}','text','bad')`,'23514')
const post=(await as('authenticated',a,`insert into posts(user_id,content,topic) values('${a}','test post','工具问答') returning id`)).rows[0].id
assert.equal((await as('anon','',`select content from posts where id='${post}'`)).rows[0].content,'test post');checks++
await denied('authenticated',a,`update posts set likes_count=999 where id='${post}'`,'42501')
await denied('authenticated',a,`insert into posts(user_id,content,likes_count) values('${a}','fake',999)`,'42501')
await as('authenticated',b,`delete from posts where id='${post}'`)
assert.equal((await db.query(`select * from posts where id='${post}'`)).rows.length,1);checks++
await as('authenticated',b,`insert into post_likes(user_id,post_id) values('${b}','${post}')`)
assert.equal((await db.query(`select likes_count from posts where id='${post}'`)).rows[0].likes_count,1);checks++
await denied('authenticated',b,`insert into post_likes(user_id,post_id) values('${b}','${post}')`,'23505')
assert.equal((await as('authenticated',b,`select * from post_likes where post_id='${post}'`)).rows.length,1);checks++
assert.equal((await as('authenticated',a,`select * from post_likes where post_id='${post}'`)).rows.length,0);checks++
await as('authenticated',b,`delete from post_likes where post_id='${post}'`)
assert.equal((await db.query(`select likes_count from posts where id='${post}'`)).rows[0].likes_count,0);checks++
await denied('authenticated',b,`insert into comments(user_id,post_id,content) values('${a}','${post}','spoof')`,'42501')
await denied('authenticated',b,`insert into comments(user_id,post_id,content) values('${b}','${post}',repeat('x',501))`,'23514')
const comment=(await as('authenticated',b,`insert into comments(user_id,post_id,content) values('${b}','${post}','reply') returning id`)).rows[0].id
await as('authenticated',a,`delete from comments where id='${comment}'`)
assert.equal((await db.query('select * from comments')).rows.length,1);checks++
await as('authenticated',b,`delete from comments where id='${comment}'`)
assert.equal((await db.query('select * from comments')).rows.length,0);checks++
for(let i=0;i<4;i++)await as('authenticated',a,`insert into posts(user_id,content) values('${a}','rate ${i}')`)
await denied('authenticated',a,`insert into posts(user_id,content) values('${a}','rate exceeded')`,'P0001')
for(let i=0;i<15;i++)await as('authenticated',b,`insert into comments(user_id,post_id,content) values('${b}','${post}','reply ${i}')`)
await denied('authenticated',b,`insert into comments(user_id,post_id,content) values('${b}','${post}','rate exceeded')`,'P0001')
await as('authenticated',b,`insert into post_likes(user_id,post_id) values('${b}','${post}')`)
await denied('anon','',`insert into post_reports(post_id,reporter_id,reason) values('${post}','${b}','其他')`,'42501')
await denied('authenticated',a,`insert into post_reports(post_id,reporter_id,reason) values('${post}','${b}','其他')`,'42501')
await denied('authenticated',b,`insert into post_reports(post_id,reporter_id,reason,status) values('${post}','${b}','其他','resolved')`,'42501')
await denied('authenticated',b,`insert into post_reports(post_id,reporter_id,reason) values('${post}','${b}','invalid')`,'23514')
await denied('authenticated',b,`insert into post_reports(post_id,reporter_id,reason,details) values('${post}','${b}','其他',repeat('x',501))`,'23514')
await as('authenticated',b,`insert into post_reports(post_id,reporter_id,reason) values('${post}','${b}','其他')`)
await denied('authenticated',b,`insert into post_reports(post_id,reporter_id,reason) values('${post}','${b}','其他')`,'23505')
assert.equal((await as('authenticated',b,'select * from post_reports')).rows.length,1);checks++
assert.equal((await as('authenticated',a,'select * from post_reports')).rows.length,0);checks++
await denied('anon','','select * from post_reports','42501')
await denied('authenticated',b,"update post_reports set status='resolved'",'42501')
await denied('authenticated',b,'delete from post_reports','42501')
await db.exec(`update posts set created_at=now()-interval '2 minutes'`)
const ratePosts=[]
for(let i=0;i<10;i++){ratePosts.push((await db.query(`insert into posts(user_id,content) values('${b}','report test') returning id`)).rows[0].id);await db.exec(`update posts set created_at=now()-interval '2 minutes'`)}
for(const id of ratePosts.slice(0,9))await as('authenticated',b,`insert into post_reports(post_id,reporter_id,reason) values('${id}','${b}','其他')`)
await denied('authenticated',b,`insert into post_reports(post_id,reporter_id,reason) values('${ratePosts[9]}','${b}','其他')`,'P0001')
await db.exec("update post_reports set status='resolved'")
assert.ok((await db.query('select status from post_reports')).rows.every(r=>r.status==='resolved'));checks++
await as('authenticated',a,`delete from posts where id='${post}'`)
assert.equal((await db.query('select * from comments')).rows.length,0);checks++
assert.equal((await db.query('select * from post_likes')).rows.length,0);checks++
assert.equal((await db.query(`select * from post_reports where post_id='${post}'`)).rows.length,0);checks++
console.log(`${checks} database checks passed; migration applied twice successfully.`)
await db.close()
