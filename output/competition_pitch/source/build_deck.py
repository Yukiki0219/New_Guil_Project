from pathlib import Path
import json, math, hashlib
from PIL import Image
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.xmlchemy import OxmlElement

ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'output/competition_pitch'
AS=OUT/'assets'
P=Presentation(); P.slide_width=Inches(13.333333); P.slide_height=Inches(7.5)
C={'cream':'FFF8EB','ink':'164E54','teal':'008E96','gold':'C58B32','muted':'667A79','pale':'E8F1EF','white':'FFFFFF','line':'BED2CE','sand':'F2E3C6','red':'A74436'}
records=[]; sources={}; texts=[]
def rgb(c): return RGBColor.from_string(C.get(c,c))
def box(s,x,y,w,h,fill='pale',line=None,shape=MSO_SHAPE.RECTANGLE):
 q=s.shapes.add_shape(shape,Inches(x),Inches(y),Inches(w),Inches(h)); q.fill.solid();q.fill.fore_color.rgb=rgb(fill)
 if line:q.line.color.rgb=rgb(line);q.line.width=Pt(1)
 else:q.line.fill.background()
 q._element.spPr.append(OxmlElement('a:effectLst'))
 return q
def text(s,t,x,y,w,h,size=22,color='ink',bold=False,align=None):
 q=s.shapes.add_textbox(Inches(x),Inches(y),Inches(w),Inches(h));f=q.text_frame;f.clear();f.word_wrap=True
 f.margin_left=f.margin_right=Inches(.01);f.margin_top=f.margin_bottom=Inches(.02)
 for i,line in enumerate(t.split('\n')):
  p=f.paragraphs[0] if i==0 else f.add_paragraph();p.text=line;p.font.name='Aptos';p.font.size=Pt(size);p.font.bold=bold;p.font.color.rgb=rgb(color);p.space_after=Pt(5)
  if align is not None:p.alignment=align
 texts.append((len(P.slides),t));return q
def base(title,dark=False):
 s=P.slides.add_slide(P.slide_layouts[6]);s.background.fill.solid();s.background.fill.fore_color.rgb=rgb('ink' if dark else 'cream')
 text(s,title,.65,.48,12.05,.75,34,'white' if dark else 'ink',True)
 box(s,.65,1.4,.6,.045,'gold')
 text(s,'GULI  /  COMPETITION PITCH',.65,7.07,8,.2,10,'line' if dark else 'muted')
 text(s,f'{len(P.slides):02d} / 16',11.65,7.02,1,.3,11,'line' if dark else 'muted',align=PP_ALIGN.RIGHT)
 return s
def note(s,body,paths=()):
 n=len(P.slides);sources[n]=list(paths)
 s.notes_slide.notes_text_frame.text=body+'\n\nEvidence (project-relative paths):\n'+'\n'.join(paths)+'\nPlanning basis: Phase 2 report in this conversation. Sample Deck and Workshop originals were not available; the user-provided Workshop summary was used.'
def reg(id,s,kind,desc,source,status,ratio):
 occurrence=f'{id}-S{len(P.slides):02d}';records.append(dict(id=id,occurrence=occurrence,slide=len(P.slides),kind=kind,description=desc,source=source,status=status,ratio=ratio));return occurrence
def placeholder(s,id,label,hint,x,y,w,h,ratio='9:16',slot=None):
 q=box(s,x,y,w,h,'pale','line');q.name=reg(id,s,'Editable placeholder',hint,'User supply / current game capture','REPLACE',ratio)
 text(s,id+('-'+slot if slot else ''),x+.16,y+.12,w-.32,.25,11,'teal',True)
 if h<1.6:
  text(s,'[INSERT '+label+']',x+.85,y+.19,w-1.0,.42,14,'ink',True,PP_ALIGN.CENTER)
 else:
  text(s,'[INSERT '+label+']',x+.16,y+h*.36,w-.32,min(1.15,h*.35),16,'ink',True,PP_ALIGN.CENTER)
 if h>1.6:text(s,hint,x+.18,y+h-.85,w-.36,.65,12,'muted',align=PP_ALIGN.CENTER)
 return q
def picture(s,id,path,x,y,w,h,desc,source=None):
 im=Image.open(path);iw,ih=im.size;scale=min(w/iw,h/ih);ww,hh=iw*scale,ih*scale
 q=s.shapes.add_picture(str(path),Inches(x+(w-ww)/2),Inches(y+(h-hh)/2),width=Inches(ww),height=Inches(hh));q.name=reg(id,s,'Existing project image',desc,source or str(path.relative_to(ROOT)),'PLACED — review version',f'{iw}:{ih}')
 return q
def lineitem(s,k,t,y,x=.75,w=6.4):
 text(s,k,x,y,w,.4,21,'teal',True);text(s,t,x,y+.48,w,.95,21)
def diagramreg(s,id,desc):
 reg(id,s,'Editable native diagram',desc,'Based on current code / Phase 2 plan','COMPLETE','16:9')

# Use actual project pixels; crop atlas coordinates and black preview margins only.
atlas=Image.open(ROOT/'assets/resources/hud/guli-hud.png');atlas.crop((536,7,1015,219)).save(AS/'logo.png')
for name in ['ftue-step2','marbles-legendary','language-menu-top-right','invalid-shot-hud','language-tutorial-en']:
 im=Image.open(ROOT/f'docs/{name}.png').convert('RGB');mask=im.point(lambda a:255 if a>18 else 0).convert('L');bounds=mask.getbbox();im.crop(bounds).save(AS/f'{name}.png')
bg=ROOT/'assets/resources/art/courtyard.png';game=ROOT/'docs/language-game-en.png';tut=AS/'language-tutorial-en.png'

s=base('GULI: Courtyard Marbles',True)
back=picture(s,'IMG-02',bg,9.1,0,4.24,7.5,'Actual courtyard background resource')
s.shapes._spTree.remove(back._element);s.shapes._spTree.insert(2,back._element)
for q in s.shapes:
 if q.has_text_frame and q.text=='01 / 16':
  for p in q.text_frame.paragraphs:p.font.color.rgb=rgb('ink')
picture(s,'IMG-01',AS/'logo.png',.75,1.8,5.4,2.25,'Logo atlas region','assets/resources/hud/guli-hud.png; Logo region in guli-hud.plist')
text(s,'Aim. Release.\nMake every shot count.',.75,4.25,7.8,1.25,32,'white',True)
text(s,'UMPSA × HUAWEI GameCenter\nMobile App Competition 2026',.75,5.85,7.8,.75,19,'white')
text(s,'[TEAM NAME]  ·  [INSTITUTION]',.75,6.65,7.5,.3,14,'line')
note(s,'Game identity confirmed. Team and institution require confirmation. Competition name is user-supplied.', ['assets/scripts/GuliGame.ts: home()','assets/resources/hud/prefabs/Logo.prefab'])

s=base('Meet the Team')
placeholder(s,'IMG-03','TEAM PHOTO','Provide an approved team photo or member portraits.',.75,1.85,3.8,3.8,'1:1')
text(s,'[TEAM NAME]',5.15,1.85,7.2,.6,30,'teal',True)
for y,k,v in [(2.8,'[MEMBER NAME] — [ROLE]','[Specific contribution delivered]'),(4.05,'[PROGRAMME / FACULTY]','[Institution]'),(5.3,'[ADDITIONAL MEMBERS, IF APPLICABLE]','Confirm names, roles and contribution ownership.')]:
 text(s,k,5.15,y,7.1,.45,20,'ink',True);text(s,v,5.15,y+.48,7.1,.5,18,'muted')
note(s,'Do not infer team size or identity from source files. Replace all bracketed fields. For a solo project, identify the developer explicitly.')

s=base('Game Concept')
lineitem(s,'GENRE','A casual, single-player physics skill game.',1.95)
lineitem(s,'ACTION','Pull back and release your marble.',3.35)
lineitem(s,'TWIST','Your shooter must leave the circle\nfor target knockouts to count.',4.75)
picture(s,'IMG-04',game,9.0,1.65,2.65,4.72,'Existing English gameplay screenshot')
text(s,'Existing project capture',8.6,6.52,3.5,.3,12,'muted',align=PP_ALIGN.CENTER)
note(s,'Genre + Action + Twist follows the supplied Workshop summary, not a verified scoring rubric.', ['assets/scripts/GameModel.ts: launch(), finishShot()','assets/scripts/GuliGame.ts: home()'])

s=base('Player Objectives')
lineitem(s,'WIN THE LEVEL','Reach the target before shots run out.',1.9,w=7.6)
lineitem(s,'IMPROVE YOUR RESULT','Use fewer shots to earn up to three stars.',3.2,w=7.6)
lineitem(s,'BUILD YOUR COLLECTION','Complete levels and keep valid knockouts.',4.5,w=7.6)
placeholder(s,'IMG-06','WIN SCREEN','Capture a real completed level with matching HUD and result.',9.35,1.65,2.65,4.72)
text(s,'Level 1: knock out 2 of 4 targets within 5 shots.',.75,6.2,8.1,.45,19,'teal',True)
note(s,'Do not claim every level requires clearing all balls. Only a won level persists newly knocked-out IDs.', ['assets/scripts/GameModel.ts: LEVELS, stars, award()','assets/scripts/GuliGame.ts: levels()'])

s=base('How to Play')
text(s,'AIM',.8,1.8,3.7,.5,26,'teal',True);text(s,'COLLIDE',4.85,1.8,3.7,.5,26,'teal',True);text(s,'RESOLVE',8.9,1.8,3.7,.5,26,'teal',True)
for x,label,slot in [(.8,'Hold and pull to aim', 'A'),(4.85,'Release; capture the collision', 'B'),(8.9,'Wait for the settled result', 'C')]:
 q=placeholder(s,'IMG-07','GAMEPLAY FRAME',label,x,2.45,3.6,2.6,'4:3 crop from 9:16',slot);q.name+= '-'+slot
text(s,'Hold. Pull. Release. Set direction and power with one drag.',.8,5.45,11.8,.5,25,'ink',True)
text(s,'Shooter stays in? Targets reset. The shot is spent.',.8,6.15,11.8,.5,22,'red')
note(s,'IMG-07 has three distinct frame slots from one real shot. Do not synthesize motion or stage fake outcomes. Aim preview predicts only the first contact, not full chain outcomes.', ['assets/scripts/Slingshot.ts','assets/scripts/GuliGame.ts: drawAim(), up()','assets/scripts/GameModel.ts: finishShot()'])

s=base('Core Game Loop')
diagramreg(s,'IMG-08','DO → RESPONSE → REWARD → AGAIN; native editable shapes')
for i,(k,v) in enumerate([('DO','Aim and release'),('RESPONSE','Collide, settle\nand resolve'),('REWARD','Valid knockouts;\nwin to save rewards'),('AGAIN','Refine, replay\nor try the next level')]):
 x=.75+i*3.17;text(s,f'0{i+1}',x,2.0,2.6,.85,42,'gold',True);text(s,k,x,2.95,2.65,.5,25,'teal',True);text(s,v,x,3.62,2.65,1.5,21)
 if i<3:box(s,x+2.7,3.1,.32,.2,'teal',shape=MSO_SHAPE.RIGHT_ARROW)
box(s,.75,5.5,11.8,.03,'line');text(s,'Stars and new collection items are saved only after a win.',.75,5.9,11.8,.7,24)
note(s,'Workshop loop framing uses supplied summary. Per-shot progress is not a permanent reward; award() persists only after won.', ['assets/scripts/GameModel.ts: finishShot(), award()','assets/scripts/GuliGame.ts: update(), showModal()'])

s=base('Key Features')
features=[('01','Drag-to-shoot physics','Direction, power and collision feedback'),('02','Five levels, three-star goals','Replay for a better result'),('03','56 collectible marble designs','Win to retain valid knockouts'),('04','Tutorial and contextual hints','Learn the rules and interpret mistakes'),('05','Chinese / English + local saves','Retain progress and language choice')]
for i,(n,k,v) in enumerate(features):
 y=1.75+i*.94;text(s,n,.75,y,.55,.4,20,'gold',True);text(s,k,1.4,y,6.0,.38,21,'ink',True);text(s,v,1.4,y+.4,6.0,.37,16,'muted')
placeholder(s,'IMG-09','LEVEL SELECT','Show five levels, locks and best stars.',7.9,2.05,1.9,3.38)
placeholder(s,'IMG-10','COLLECTION','Use current, corrected labels and artwork.',10.3,2.05,1.9,3.38)
note(s,'These five features were selected for playable depth, replay goals, collection, learning and continuity. Skins are excluded as a key feature: only default skin is shown. Home denominator is still /50; current model count is 56.', ['assets/scripts/GameModel.ts','assets/scripts/TutorialView.ts','assets/scripts/Localization.ts','assets/scripts/GuliGame.ts: collection(), persist()'])

s=base('Design Differentiators')
text(s,'Plan the exit,\nnot only the hit.',.75,1.9,6.8,1.5,38,'teal',True)
text(s,'Your shooter must clear the circle.\nInvalid shots restore targets but cost an attempt.\nFixed layouts support practice; identities vary.',.75,3.85,7.25,2.0,23)
picture(s,'IMG-11',AS/'ftue-step2.png',9.05,1.65,2.8,4.95,'Actual tutorial illustration of valid and invalid shots','docs/ftue-step2.png')
text(s,'Tutorial illustration — not a recorded shot',8.0,6.65,4.7,.25,11,'muted',align=PP_ALIGN.CENTER)
note(s,'A design differentiator, not a claim of first-to-market originality. Player benefit remains a hypothesis. Screenshot is instructional presentation, not real simulation evidence.', ['assets/scripts/GameModel.ts: finishShot(), rollMarbles()','assets/scripts/GameHints.ts: resolved()'])

s=base('Technical Architecture & Validation')
text(s,'Cocos Creator 3.8.8  ·  TypeScript  ·  Box2D',.75,1.72,11.9,.5,24,'teal',True)
diagramreg(s,'IMG-12','Actual client-side architecture; no invented backend')
for x,k,v in [(.75,'Slingshot','Input'),(3.85,'GameModel','Rules & rewards'),(6.95,'GuliPhysics','Native simulation'),(10.05,'GuliGame','UI & coordination')]:
 box(s,x,2.65,2.5,1.1,'pale');text(s,k,x+.12,2.8,2.26,.35,21,'ink',True,PP_ALIGN.CENTER);text(s,v,x+.12,3.22,2.26,.3,15,'muted',align=PP_ALIGN.CENTER)
text(s,'GuliGame coordinates input, rules and physics; saves progress locally.',.75,4.08,11.8,.55,21)
diagramreg(s,'IMG-13','Review validation summary, not a fabricated console screenshot')
text(s,'120 Hz',.75,5.05,3.5,.8,40,'teal',True);text(s,'Fixed physics stepping\nNot display frame rate',.75,5.95,3.5,.8,18)
text(s,'31 checks',5.0,5.05,3.5,.8,40,'teal',True);text(s,'Passed in Phase 1 review\nType checking also passed',5.0,5.95,3.8,.8,18)
text(s,'Pending',9.65,5.05,2.7,.65,36,'gold',True);text(s,'Target-device validation',9.65,5.8,2.8,.8,18)
note(s,'31 groups: 16 model, 6 drag, 3 aim, 3 tutorial, 1 music, 2 localization. Results were actually obtained during Phase 1, not rerun during deck generation. No real-time engine or phone performance claim. GuliGame invokes model launch and physics advance; physics snapshots feed model adjudication; UI handles award and local persistence.', ['package.json','assets/scripts/GuliPhysics.ts','assets/scripts/GuliGame.ts','assets/scripts/GameModel.ts','tests/'])

s=base('Huawei Integration Status')
text(s,'NOT YET VERIFIED',.75,1.85,7,.4,17,'gold',True)
text(s,'No verifiable HMS or GameCenter\nintegration evidence was found\nin the current project.',.75,2.5,7.55,1.75,30,'ink',True)
text(s,'Next: confirm platform requirements, define scope,\nthen validate on a target device.',.75,4.85,7.7,1.0,23)
placeholder(s,'IMG-14','HMS EVIDENCE','SDK configuration, real API result and device details.',9.0,2.05,3.55,2.67,'4:3')
text(s,'Evidence required before claiming integration.',9.0,5.05,3.55,.8,17,'muted')
note(s,'No confirmed HMS/GameCenter dependency, AG Connect configuration, service call or device evidence. Cocos service list is empty. Web Mobile build is not proof of Huawei integration. If evidence remains absent at submission, retain the honest status and omit the image slot.', ['package.json','settings/v2/packages/builder.json','settings/v2/packages/cocos-service.json'])

s=base('Interface & Player Guidance')
text(s,'See the goal.\nUnderstand the result.',.75,1.8,5.6,1.25,33,'teal',True)
text(s,'Targets, shots and power stay visible.\nThree pages explain the core rules.\nLevel 1 adds contextual hints.\nChinese / English UI and pause controls.',.75,3.3,5.7,2.1,22)
placeholder(s,'IMG-05','HUD DETAIL','Target, shots and power',.75,5.85,5.6,.7,'8:1 detail strip')
picture(s,'IMG-15',tut,6.95,1.72,2.3,4.95,'Existing English tutorial capture','docs/language-tutorial-en.png')
placeholder(s,'IMG-16','HOME SCREEN','Use current layout and corrected collection total.',10.0,1.95,2.5,4.44)
note(s,'Safe-area handling exists but device coverage is not verified. Tutorial is three-page demonstration, not a required live practice challenge. Home screenshot intentionally left pending due /50 inconsistency and previous language-switch placement.', ['assets/scripts/GuliGame.ts: gameUI(), applySafeArea(), updateHints()','assets/scripts/TutorialView.ts','assets/scripts/LanguageSwitch.ts'])

s=base('Visual & Audio Identity')
text(s,'Warm courtyard.\nGlass-style marbles.\nClear feedback.',.75,1.85,6.1,2.1,36,'teal',True)
for i,c in enumerate(['teal','cream','gold','ink']):box(s,.75+i*.78,4.02,.55,.55,c,'line')
text(s,'Shot, collision and victory effects\nSeparate menu and gameplay music\nButton, tutorial and invalid-shot animation',.75,4.92,7.0,1.4,21)
placeholder(s,'IMG-17','MARBLE DETAILS','Capture actual in-game designs after label review.',8.35,1.9,3.3,3.3,'1:1')
placeholder(s,'IMG-18','INVALID-SHOT FEEDBACK','Red shot-count pulse',8.05,5.7,4.5,.85,'5:1 detail strip')
note(s,'Marbles use layered 2D graphics, masks and shared textures, not real glass refraction. Audio files and playback logic exist; listening quality and music licensing are not verified. Decorative atlas marble sprites are not substituted for current runtime marble designs.', ['assets/resources/art/courtyard.png','assets/scripts/MarbleRenderer.ts','assets/scripts/GuliGame.ts: syncMusic(), playInvalidShotHudAnimation()','assets/resources/audio/'])

s=base('Target Players & Validation Plan')
diagramreg(s,'IMG-19','Audience hypotheses and validation questions; no market metrics')
text(s,'AUDIENCE HYPOTHESES',.75,1.85,5.6,.45,18,'gold',True)
text(s,'Aiming and physics players\nMastery-driven casual players\nMarble and collection enthusiasts',.75,2.62,5.65,2.25,27,'ink',True)
box(s,6.62,1.85,.025,4.45,'line')
text(s,'VALIDATE WITH PLAYERS',7.2,1.85,5.3,.45,18,'teal',True)
text(s,'Can they explain a valid shot?\nDo they choose to replay?\nDo stars or collection motivate them?',7.2,2.62,5.3,2.25,25)
text(s,'No market size, user count or retention claim is made.',.75,6.15,11.7,.45,20,'muted')
note(s,'Audience statements are design hypotheses, not validated segments. No primary player study or external market research was provided. Potential comparison categories: marble, slingshot physics and collection casual games; compare controls, failure cost, progression and collection.', ['assets/scripts/GameModel.ts: LEVELS, stars, award()','assets/scripts/GuliGame.ts: home()'])

s=base('Replay Value & Development Roadmap')
diagramreg(s,'IMG-20','Now / Next / Explore; proposed work is clearly separated')
for x,k,v,c in [(.75,'NOW','Better stars\nLevel progression\nMarble collection','teal'),(4.95,'NEXT','Content consistency\nDevice testing\nPlayer feedback','gold'),(9.15,'EXPLORE','More levels\nCosmetic shooter skins\nPlatform integration','muted')]:
 text(s,k,x,1.95,3.4,.55,27,c,True);box(s,x,2.66,3.35,.035,c);text(s,v,x,3.05,3.4,2.25,25)
box(s,.75,5.7,11.8,.03,'line');text(s,'Monetization is not implemented.',.75,6.0,5.2,.45,23,'ink',True)
text(s,'Cosmetic purchases are an option to evaluate.',6.25,6.0,6.3,.6,21,'muted')
note(s,'Next and Explore are suggestions, not approved scope or delivery dates. Only a default shooter skin display exists. No ads, IAP, paid skins, revenue or financial projections. Repeat attempts keep identities; re-entering from selection redraws identities.', ['assets/scripts/GameModel.ts: award(), rollMarbles()','assets/scripts/GuliGame.ts: startLevel(), skins()'])

s=base('GULI: Make Every Shot Count',True)
text(s,'A marble.\nA childhood of memories.',.75,1.9,7.7,1.45,40,'white',True)
text(s,'A courtyard physics challenge where\nyour shooter must clear the circle too.',.75,3.72,7.6,1.0,25,'white')
text(s,'Aim for fewer shots.\nDiscover more marbles.',.75,5.15,7.2,1.0,27,'line')
picture(s,'IMG-04',game,9.45,1.65,2.65,4.72,'Reused actual gameplay capture')
note(s,'Hook: childhood memory. Game: physics skill challenge. Difference: shooter exit rule. Player: intended mastery/collection audience, not validated. Fun: better shots and discovery are the experience proposition. Close: invite a demo. No market leadership or satisfaction claim.', ['assets/scripts/GameModel.ts','assets/scripts/Slingshot.ts','assets/scripts/GuliGame.ts'])

s=base('Thank You — Try GULI')
picture(s,'IMG-01',AS/'logo.png',.75,1.8,5.4,2.3,'Reused project logo','assets/resources/hud/guli-hud.png')
text(s,'Questions & feedback',.75,4.55,7.5,.65,32,'teal',True)
text(s,'[TEAM NAME]\n[CONTACT EMAIL]\n[VERIFIED DEMO URL]',.75,5.45,7.6,1.15,20)
placeholder(s,'IMG-21','DEMO QR CODE','Generate only after verifying the public demo URL.',9.15,2.0,3.0,3.0,'1:1')
text(s,'Demo access and contact details pending',8.25,5.4,4.8,.7,17,'muted',align=PP_ALIGN.CENTER)
note(s,'No public demo URL or contact information supplied. Do not use a fabricated QR. Existing Web build is not confirmed current. Confirm demo environment and offline backup.')

# Distinguish repeated assets from separate object occurrences.
counts={}
for r in records:
 key=r['occurrence'];counts[key]=counts.get(key,0)+1
 if counts[key]>1:r['occurrence']+=f'-{counts[key]}'
P.core_properties.title='GULI: Courtyard Marbles — Competition Pitch'
P.core_properties.subject='Evidence-based 16-slide game pitch; editable content and pending evidence placeholders'
P.core_properties.author='GULI Project Team — confirmation pending'
P.save(OUT/'Guil_Project_Competition_Pitch_Deck.pptx')
check=Presentation(OUT/'Guil_Project_Competition_Pitch_Deck.pptx')
assert len(check.slides)==16
violations=[]
for i,s in enumerate(check.slides,1):
 for q in s.shapes:
  if q.left<0 or q.top<0 or q.left+q.width>check.slide_width+100 or q.top+q.height>check.slide_height+100:violations.append((i,q.name,'outside slide'))
assert not violations,violations
assert {r['id'] for r in records}=={f'IMG-{i:02d}' for i in range(1,22)}
(OUT/'source/placeholder_manifest.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
rows=['# Image Placeholder Checklist','', 'Asset IDs retain the Phase 2 checklist. Reused assets share an ID; slide/slot occurrence names are distinct. Native diagrams and placed assets are marked complete rather than missing.','', '| ID | Slide / occurrence | Purpose | Status | Source / required material |','|---|---|---|---|---|']
for r in records: rows.append(f"| {r['id']} | {r['slide']} / {r['occurrence']} | {r['description']} ({r['ratio']}) | {r['status']} | {r['source']} |")
rows+=['','## Replacement priority','1. IMG-07: three frames from one real shot; IMG-06: genuine matching win result.','2. IMG-09, IMG-10, IMG-16: current level selector, collection and corrected home screen.','3. IMG-03 and IMG-21: approved team image and verified demo QR.','4. IMG-14: actual Huawei integration evidence, if available; otherwise retain the honest status.','5. IMG-05, IMG-17, IMG-18: HUD, runtime marble details and invalid-shot pulse.','','Do not replace gameplay with generated illustrations. Do not use a full-collection preview as evidence of actual earned progress. Tutorial illustrations are labelled as instructional.']
(OUT/'Image_Placeholder_Checklist.md').write_text('\n'.join(rows),encoding='utf-8')
notes=['# PPT Content Notes','', '## Scope and tools','16 slides, 16:9. Produced with python-pptx per the user preference. Text, diagrams, shapes and replacement frames are editable. Source images remain separate picture objects. No game code, scene, resource or configuration was modified.','', '## Planning basis','The complete Phase 2 plan was available in the conversation and used directly. Sample Deck and Workshop #1 originals were not available. Eight-chapter alignment is therefore unverified; the requested 16-slide order is retained. Workshop principles are presentation guidance, not asserted judging criteria.','', '## Confirm before submission','- Team names, institution, roles, contact, date and event branding.','- Current game title styling and final English screenshots.','- Home /50 denominator versus 56 items; marble names versus appearance IDs.','- Current build consistency; existing Web package is not confirmed to contain current bilingual code.','- Real device performance, touch, safe area and restart persistence.','- Actual Huawei/HMS integration: none verified in current project.','- Asset provenance and permissions, especially music and motif artwork.','- Proposed roadmap and cosmetic-only monetization; neither is a delivery commitment.','- Player preferences and replay motivation remain hypotheses. No market, revenue, user or retention figures are invented.','', '## Important editorial choices','- No slide count or section-order change. Shortened titles retain the intended content.','- Existing English gameplay and tutorial images are used as project captures; tutorial is explicitly not simulated gameplay evidence.','- Default-only skins are not presented as a full skin system.','- Historical full-collection and inconsistent result screenshots are not used as earned-progress evidence.','- 31 checks and typecheck refer to Phase 1 actual results, not a new run during authoring.','- 120 Hz means fixed physics step frequency, not measured display FPS.','- IMG-08, IMG-12, IMG-13, IMG-19 and IMG-20 are editable native diagrams/text evidence, not image screenshots.','- IMG-02 used on cover; IMG-04 and IMG-01 intentionally reused.','- IMG-07 uses three independently editable slots. IDs are stable asset identifiers; occurrence IDs identify individual placements.','', '## Slide evidence']
for n,paths in sources.items():notes.append(f"- Slide {n}: "+('; '.join(paths) if paths else 'User confirmation required.'))
notes+=['','## Verification','- PPTX package reopened using python-pptx; 16 slides confirmed.','- All shape bounding boxes are within slide bounds.','- IMG-01 through IMG-21 all accounted for.','- PowerPoint opening, PDF export and rendered visual review: see QA report after export.']
(OUT/'PPT_Content_Notes.md').write_text('\n'.join(notes),encoding='utf-8')
print('Created 16-slide editable deck and two checklists. All 21 asset IDs accounted for; shape bounds pass.')
