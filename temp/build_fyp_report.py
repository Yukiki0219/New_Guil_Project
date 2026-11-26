from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import html
import re

ROOT = Path(r"C:\Users\Lenovo\Documents\Guil_Project")
OUT = ROOT / "output" / "Guli_Go_FYP1_Report.docx"
ASSETS = ROOT / "output" / "Guli_Go_FYP1_Report_Assets"
DIAGRAMS = ASSETS / "diagrams"
SOURCES = ASSETS / "editable_sources"
for p in (OUT.parent, DIAGRAMS, SOURCES):
    p.mkdir(parents=True, exist_ok=True)
for old_svg in DIAGRAMS.glob("*.svg"):
    old_svg.unlink()

NAVY = "#173F45"
TEAL = "#0B8C88"
GOLD = "#D49A42"
CREAM = "#FFF8E9"
PALE = "#E8F2EF"
INK = "#263A3D"
MUTED = "#6B7C7D"
WHITE = "#FFFFFF"
FONT_PATH = r"C:\Windows\Fonts\arial.ttf"
BOLD_PATH = r"C:\Windows\Fonts\arialbd.ttf"

def font(size, bold=False):
    return ImageFont.truetype(BOLD_PATH if bold else FONT_PATH, size)

def draw_text(draw, xy, text, size=22, fill=INK, bold=False, anchor=None):
    draw.text(xy, text, font=font(size, bold), fill=fill, anchor=anchor)

def rounded(draw, box, fill=CREAM, outline=TEAL, radius=18, width=3):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

def arrow(draw, a, b, fill=TEAL, width=4, dashed=False):
    x1, y1 = a; x2, y2 = b
    if dashed:
        dx, dy = x2-x1, y2-y1
        length = max(1, (dx*dx+dy*dy)**0.5)
        ux, uy = dx/length, dy/length
        pos = 0
        while pos < length-16:
            end = min(pos+13, length-16)
            draw.line((x1+ux*pos,y1+uy*pos,x1+ux*end,y1+uy*end), fill=fill, width=width)
            pos += 21
    else:
        draw.line((x1,y1,x2,y2), fill=fill, width=width)
    import math
    ang = math.atan2(y2-y1, x2-x1)
    size = 14
    p1=(x2,y2)
    p2=(x2-size*math.cos(ang-0.48),y2-size*math.sin(ang-0.48))
    p3=(x2-size*math.cos(ang+0.48),y2-size*math.sin(ang+0.48))
    draw.polygon((p1,p2,p3), fill=fill)

def canvas(name, title, width=1600, height=900):
    im=Image.new("RGB",(width,height),WHITE)
    d=ImageDraw.Draw(im)
    draw_text(d,(width//2,34),title,34,NAVY,True,"mt")
    d.line((60,88,width-60,88),fill=GOLD,width=4)
    return im,d

def box(d, xy, label, detail="", fill=CREAM, outline=TEAL, fs=24):
    rounded(d,xy,fill,outline,22,4)
    x1,y1,x2,y2=xy
    lines=label.split("\n")
    total=(len(lines)+(1 if detail else 0))*fs*1.25
    y=(y1+y2-total)/2
    for line in lines:
        draw_text(d,((x1+x2)//2,y),line,fs,INK,True,"mt")
        y+=fs*1.25
    if detail:
        for line in wrap(detail, max(14,int((x2-x1)/13))):
            draw_text(d,((x1+x2)//2,y),line,fs-5,MUTED,False,"mt")
            y+=fs*1.05

def save_image(im, name, mmd, svg):
    png=DIAGRAMS/name
    im.save(png,dpi=(200,200),optimize=True)
    stem=Path(name).stem
    (SOURCES/(stem+".mmd")).write_text(mmd,encoding="utf-8")
    return png

def svg_header(title, width=1600, height=900, body=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><rect width="100%" height="100%" fill="#fff"/><text x="{width//2}" y="52" text-anchor="middle" font-family="Arial" font-size="34" font-weight="bold" fill="{NAVY}">{html.escape(title)}</text><path d="M60 88 H{width-60}" stroke="{GOLD}" stroke-width="4"/>{body}</svg>'

def create_usecase():
    im,d=canvas("use_case.png","Guli Go! Use Case Diagram",1600,1150)
    rounded(d,(360,130,1510,1060),PALE,NAVY,24,4)
    draw_text(d,(935,160),"Guli Go! System",26,NAVY,True,"mt")
    d.ellipse((85,465,195,575),fill=CREAM,outline=NAVY,width=4)
    d.line((140,575,140,735),fill=NAVY,width=5)
    d.line((140,620,65,690),fill=NAVY,width=5); d.line((140,620,215,690),fill=NAVY,width=5)
    d.line((140,735,75,850),fill=NAVY,width=5); d.line((140,735,205,850),fill=NAVY,width=5)
    draw_text(d,(140,900),"Player",25,NAVY,True,"mt")
    cases=[
      (520,250,"Open home and set language or audio"),
      (520,410,"Select a level and view first-run guidance"),
      (520,570,"Aim, release a shot, and view feedback"),
      (520,730,"Pause, restart, exit, or continue after a result"),
      (520,890,"Review the collection, draw, and equip rewards")]
    for x,y,t in cases:
        d.ellipse((x,y,x+800,y+76),fill=CREAM,outline=TEAL,width=3)
        draw_text(d,(x+400,y+38),t,21,INK,False,"mm")
        arrow(d,(195,520),(x,y+38),NAVY,2)
    body=[]
    for x,y,t in cases:
        body.append(f'<ellipse cx="{x+400}" cy="{y+38}" rx="400" ry="38" fill="{CREAM}" stroke="{TEAL}" stroke-width="3"/><text x="{x+400}" y="{y+44}" text-anchor="middle" font-family="Arial" font-size="21" fill="{INK}">{html.escape(t)}</text>')
    svg=svg_header("Guli Go! Use Case Diagram",body="".join(body))
    mmd="""flowchart LR
  Player((Player))
  subgraph GuliGo["Guli Go! System"]
    Home([Open home and set language or audio])
    Levels([Select a level and view first-run guidance])
    Aim([Aim, release a shot, and view feedback])
    Round([Pause, restart, exit, or continue after a result])
    Rewards([Review collection, draw, and equip rewards])
  end
  Player --- Home
  Player --- Levels
  Player --- Aim
  Player --- Round
  Player --- Rewards"""
    return save_image(im,"use_case.png",mmd,svg)

def create_class():
    im,d=canvas("class_diagram.png","Core Class Diagram")
    items=[
      ((70,170,430,405),"GuliGame","+ screen, input, overlay\n+ render, sound\n+ readSave(), persist()"),
      ((610,155,980,400),"GameModel","+ levelIndex, phase, used\n+ balls, knocked\n+ launch(), afterPhysics()"),
      ((1150,155,1515,400),"GuliPhysics","+ Box2D bodies\n+ fixed-step accumulator\n+ advance(), dispose()"),
      ((70,535,430,775),"Slingshot","+ pointer, pull, power\n+ begin(), move()\n+ release(), cancel()"),
      ((610,535,980,775),"SaveData","+ stars, collection\n+ language, volumes\n+ rewards, equipped"),
      ((1150,535,1515,775),"Reward / Tutorial","+ reward kind and rarity\n+ tutorial page state\n+ drawReward(), equipReward()")]
    for xy,title,detail in items:
        box(d,xy,title,detail,PALE if title in ("GuliGame","GameModel") else CREAM,TEAL,22)
    arrow(d,(430,275),(610,275)); arrow(d,(980,275),(1150,275))
    arrow(d,(250,405),(250,535)); arrow(d,(790,400),(790,535))
    arrow(d,(980,655),(1150,655))
    draw_text(d,(520,245),"uses",18,MUTED,False,"mt")
    draw_text(d,(1060,245),"owns physics world",18,MUTED,False,"mt")
    draw_text(d,(270,475),"reads / writes",17,MUTED,False,"mt")
    draw_text(d,(800,475),"serializes",17,MUTED,False,"mt")
    draw_text(d,(1040,625),"uses rules",17,MUTED,False,"mt")
    body=[]
    for xy,title,detail in items:
        x1,y1,x2,y2=xy; lines=[title]+detail.split("\n")
        body.append(f'<rect x="{x1}" y="{y1}" width="{x2-x1}" height="{y2-y1}" rx="18" fill="{CREAM}" stroke="{TEAL}" stroke-width="3"/>')
        for idx,line in enumerate(lines):
            body.append(f'<text x="{(x1+x2)//2}" y="{y1+42+idx*34}" text-anchor="middle" font-family="Arial" font-size="{20 if idx else 23}" font-weight="{700 if idx==0 else 400}" fill="{INK}">{html.escape(line)}</text>')
    svg=svg_header("Core Class Diagram",body="".join(body))
    mmd="""classDiagram
  class GuliGame {
    +screen
    +render()
    +readSave()
    +persist()
  }
  class GameModel {
    +levelIndex
    +phase
    +balls
    +knocked
    +launch()
    +afterPhysics()
  }
  class GuliPhysics {
    +bodies
    +advance()
    +dispose()
  }
  class Slingshot {
    +begin()
    +move()
    +release()
    +cancel()
  }
  class SaveData {
    +stars
    +collection
    +language
    +volumes
    +rewards
  }
  class Reward
  class Tutorial
  GuliGame --> GameModel : coordinates
  GuliGame --> Slingshot : reads input
  GuliGame --> SaveData : loads and saves
  GuliPhysics --> GameModel : advances state
  GameModel --> SaveData : awards progress
  GuliGame --> Reward : displays rewards
  GuliGame --> Tutorial : presents tutorial"""
    return save_image(im,"class_diagram.png",mmd,svg)

def create_sequence():
    im,d=canvas("sequence_diagram.png","Sequence: Complete One Shot")
    actors=[("Player",130),("GuliGame",390),("Slingshot",650),("GameModel",930),("GuliPhysics",1210),("Local Save",1470)]
    for name,x in actors:
        rounded(d,(x-100,130,x+100,205),PALE,TEAL,14,3)
        draw_text(d,(x,167),name,20,NAVY,True,"mm")
        d.line((x,205,x,800),fill=MUTED,width=2)
    calls=[
      (130,390,260,"Select level"),(390,930,320,"Create GameModel with level setup"),
      (130,390,380,"Drag and release"),(390,650,440,"Update pointer and pull vector"),
      (390,930,500,"launch(direction, power)"),(390,1210,560,"Create Box2D bodies"),
      (1210,930,620,"Step fixed interval and report snapshots"),
      (930,390,680,"Settle shot and calculate outcome"),
      (390,1470,740,"Persist awards and settings if won")]
    for x1,x2,y,label in calls:
        arrow(d,(x1,y),(x2,y),TEAL if x1<x2 else GOLD,3)
        draw_text(d,((x1+x2)//2,y-24),label,16,INK,False,"mb")
    body=[]
    for name,x in actors:
        body.append(f'<rect x="{x-100}" y="130" width="200" height="75" rx="14" fill="{PALE}" stroke="{TEAL}" stroke-width="3"/><text x="{x}" y="176" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold" fill="{NAVY}">{html.escape(name)}</text><path d="M{x} 205 V800" stroke="{MUTED}" stroke-dasharray="8,8" stroke-width="2"/>')
    for x1,x2,y,label in calls:
        body.append(f'<path d="M{x1} {y} H{x2}" stroke="{TEAL}" stroke-width="3"/><text x="{(x1+x2)//2}" y="{y-8}" text-anchor="middle" font-family="Arial" font-size="16" fill="{INK}">{html.escape(label)}</text>')
    mmd="""sequenceDiagram
  actor Player
  participant UI as GuliGame
  participant Sling as Slingshot
  participant Model as GameModel
  participant Physics as GuliPhysics / Box2D
  participant Save as Local storage
  Player->>UI: Select level
  UI->>Model: Create level state
  Player->>UI: Drag and release
  UI->>Sling: Update pointer and pull vector
  UI->>Model: launch(direction, power)
  UI->>Physics: Create bodies
  loop Until settled
    Physics->>Model: Advance and report snapshots
  end
  Model->>UI: Resolve outcome
  UI->>Save: Persist if won"""
    return save_image(im,"sequence_diagram.png",mmd,svg_header("Sequence: Complete One Shot",body="".join(body)))

def create_activity():
    im=Image.new("RGB",(1400,1200),WHITE); d=ImageDraw.Draw(im)
    draw_text(d,(700,34),"Activity: Play a Level",34,NAVY,True,"mt")
    d.line((50,88,1350,88),fill=GOLD,width=4)
    def step(x,y,label,w=440):
        rounded(d,(x-w//2,y-32,x+w//2,y+32),PALE,TEAL,18,3)
        draw_text(d,(x,y),label,17,INK,True,"mm")
    def decision(x,y,label,w=380):
        d.polygon([(x,y-38),(x+w//2,y),(x,y+38),(x-w//2,y)],fill=CREAM,outline=GOLD)
        draw_text(d,(x,y),label,17,INK,True,"mm")
    d.ellipse((620,105,780,153),fill=TEAL,outline=NAVY,width=3)
    draw_text(d,(700,129),"Start",18,WHITE,True,"mm")
    step(700,205,"Open level selector")
    step(700,285,"Choose an unlocked level")
    step(700,365,"Show first-run guidance when required")
    step(700,445,"Aim by dragging the shooter")
    step(700,525,"Release shot")
    step(700,605,"Step Box2D until settled")
    decision(700,695,"Shooter fully exited?")
    step(340,790,"No: restore targets and spend shot",420)
    step(1060,790,"Yes: retain knocked-out targets",420)
    decision(700,895,"Target met?")
    step(340,995,"Yes: award stars and save",420)
    decision(1060,995,"Attempts remain?",400)
    step(800,1090,"Yes: aim again",320)
    step(1200,1090,"No: show failure",320)
    for a,b in [((700,153),(700,173)),((700,237),(700,253)),((700,317),(700,333)),((700,397),(700,413)),((700,477),(700,493)),((700,557),(700,573)),((700,637),(700,657)),((510,715),(400,758)),((890,715),(1000,758)),((340,822),(560,875)),((1060,822),(840,875)),((510,917),(410,963)),((890,917),(1060,957)),((950,1028),(800,1058)),((1260,1028),(1200,1058))]: arrow(d,a,b,NAVY,3)
    draw_text(d,(475,744),"No",17,GOLD,True,"mm")
    draw_text(d,(925,744),"Yes",17,GOLD,True,"mm")
    draw_text(d,(470,942),"Yes",17,GOLD,True,"mm")
    draw_text(d,(925,942),"No",17,GOLD,True,"mm")
    mmd="""flowchart TD
  Start([Start]) --> Levels[Open level selector]
  Levels --> Choose[Choose unlocked level]
  Choose --> Tutorial[Show first-run guidance when required]
  Tutorial --> Aim[Aim by dragging shooter]
  Aim --> Release[Release shot]
  Release --> Physics[Step Box2D until settled]
  Physics --> Valid{Shooter fully exited?}
  Valid -->|No| Rollback[Restore targets; spend shot]
  Valid -->|Yes| Keep[Retain knock-outs]
  Rollback --> Won{Target met?}
  Keep --> Won
  Won -->|Yes| Save[Award stars and save]
  Won -->|No| Remaining{Attempts remain?}
  Remaining -->|Yes| Aim
  Remaining -->|No| Fail[Show failure]"""
    return save_image(im,"activity_diagram.png",mmd,svg_header("Activity: Play a Level",body=""))

def create_architecture():
    im,d=canvas("architecture.png","Guli Go! System Architecture")
    box(d,(80,170,340,300),"Player Input","Mouse and touch",PALE,TEAL,22)
    box(d,(440,150,780,320),"GuliGame","Screens, HUD, input routing,\naudio and orchestration",PALE,TEAL,22)
    box(d,(910,125,1220,295),"GameModel","Rules, 30 levels,\nround state and awards",CREAM,TEAL,22)
    box(d,(910,355,1220,525),"Slingshot / Aim","Drag state, power,\nlaunch direction",CREAM,TEAL,22)
    box(d,(1310,125,1530,295),"GuliPhysics","Cocos Box2D\nfixed 1/120 s step",CREAM,TEAL,20)
    box(d,(1310,355,1530,525),"Local Storage","Progress, settings,\ncollection; no backend",CREAM,TEAL,20)
    box(d,(440,570,780,735),"Assets","HUD prefabs, artwork,\nmarble rendering, audio",PALE,TEAL,22)
    box(d,(910,600,1220,765),"Tutorial / Language","First-run guidance,\nhints, Chinese / English",PALE,TEAL,21)
    for a,b in [((340,235),(440,235)),((780,220),(910,210)),((780,270),(910,430)),((1220,210),(1310,210)),((1220,255),(1310,430)),((780,620),(910,665)),((780,680),(910,680))]:
        arrow(d,a,b,NAVY,3)
    draw_text(d,(800,815),"Runtime target in current project: Cocos Creator 3.8.8 browser preview",21,MUTED,False,"mt")
    draw_text(d,(800,855),"Android build is future work; no external server or account service is part of scope.",19,MUTED,False,"mt")
    mmd="""flowchart LR
  Player[Mouse / touch / keyboard] --> UI[GuliGame: screens, HUD, audio, orchestration]
  UI --> Model[GameModel: rules, 30 levels, round state, awards]
  UI --> Input[Slingshot and AimPrediction]
  Model <--> Physics[GuliPhysics: Cocos Box2D, fixed 1/120 s step]
  UI <--> Store[Local storage: progress, settings, collection]
  UI --> Assets[HUD prefabs, artwork, marble renderer, audio]
  UI --> Support[Tutorial, hints, Chinese / English]
  Engine[Cocos Creator 3.8.8] --- UI
  Browser[Browser preview] --- Engine
  Android[Android target, not built] -. planned .- Engine"""
    body="""<rect x="80" y="170" width="260" height="130" rx="18" fill="#E8F2EF" stroke="#0B8C88" stroke-width="3"/><text x="210" y="220" text-anchor="middle" font-family="Arial" font-size="22" fill="#263A3D">Player input</text><text x="210" y="255" text-anchor="middle" font-family="Arial" font-size="18" fill="#6B7C7D">mouse, touch, keyboard</text>"""
    # The editable Mermaid source is authoritative for this architecture figure.
    return save_image(im,"architecture.png",mmd,svg_header("Guli Go! System Architecture",body=body))

def create_gantt():
    im,d=canvas("gantt_chart.png","FYP1 Recorded Milestones and Proposed FYP2 Plan",1700,1260)
    # Timeline columns: FYP1 dated from repository milestones; FYP2 relative two-week blocks.
    left=420; top=170; row_h=66; commit_w=92; week_w=92
    fyp1=["11 Nov","15 Nov","16 Nov","17 Nov","19 Nov","20 Nov"]
    fyp2=["W1-2","W3-4","W5-6","W7-8","W9-10","W11-12","W13-14"]
    draw_text(d,(left+3*commit_w,120),"FYP1 repository dates (2026)",22,NAVY,True,"mt")
    draw_text(d,(left+6*commit_w+3.5*week_w,120),"FYP2 proposed relative weeks",22,NAVY,True,"mt")
    labels=["Initial repository milestone","Cocos Creator setup","Reward systems and 30 levels","Audio integration","Test entry points recorded","Overlap fixes recorded","Supervisor review / scope freeze","Refine design and build plan","Core prototype refinement","Input and physics verification","Android build and device checks","Player evaluation and difficulty tuning","Analyze findings and revise","Final report and presentation"]
    for i,label in enumerate(labels):
        y=top+i*row_h
        draw_text(d,(left-16,y+25),label,18,INK,False,"rm")
        if i < 6:
            for j,day in enumerate(fyp1):
                x=left+j*commit_w
                d.rectangle((x,y,x+commit_w,y+row_h),fill="#F5F7F6",outline="#D4DEDC",width=1)
                draw_text(d,(x+commit_w//2,y+row_h//2),day,14,MUTED,False,"mm")
            # Logged commit dates identify an activity cluster, not student effort duration.
            spans={0:(0,0),1:(1,1),2:(1,2),3:(3,3),4:(4,4),5:(5,5)}
            a,b=spans[i]
            d.rounded_rectangle((left+a*commit_w+5,y+15,left+(b+1)*commit_w-5,y+row_h-15),radius=12,fill=TEAL)
        else:
            x0=left+6*commit_w
            for j,label in enumerate(fyp2):
                x=x0+j*week_w
                d.rectangle((x,y,x+week_w,y+row_h),fill="#F5F7F6",outline="#D4DEDC",width=1)
                draw_text(d,(x+week_w//2,y+row_h//2),label,14,MUTED,False,"mm")
            starts=[0,0,1,2,3,4,6,6]
            ends=[0,1,3,3,4,5,6,6]
            idx=i-6
            d.rounded_rectangle((x0+starts[idx]*week_w+4,y+15,x0+(ends[idx]+1)*week_w-4,y+row_h-15),radius=12,fill=GOLD)
    d.rectangle((left,top,left+6*commit_w,top+6*row_h),outline=NAVY,width=3)
    d.rectangle((left+6*commit_w,top+6*row_h,left+6*commit_w+7*week_w,top+14*row_h),outline=NAVY,width=3)
    draw_text(d,(left,top+14*row_h+20),"Teal = recorded repository milestone. Gold = proposed FYP2 activity.",17,MUTED)
    draw_text(d,(left,top+14*row_h+48),"FYP1 bars mark commit dates only; FYP2 weeks need the official calendar.",17,MUTED)
    mmd="""timeline
  title FYP1 recorded milestones and proposed FYP2 relative weeks
  section FYP1 repository evidence
    2026-11-11 : Initial repository milestone
    2026-11-15 : Cocos Creator setup
    2026-11-16 : Reward systems and 30 levels
    2026-11-17 : Audio integration
    2026-11-19 : Test entry points recorded
    2026-11-20 : Overlap fixes recorded
  section FYP2 proposal
    W1-W2 : Supervisor review and scope freeze
    W1-W4 : Design refinement
    W3-W8 : Prototype refinement and technical checks
    W7-W9 : Android build and device checks
    W9-W11 : Player evaluation
    W11-W13 : Analysis and revision
    W13-W14 : Final report and presentation"""
    path=save_image(im,"gantt_chart.png",mmd,svg_header("FYP1 Recorded Milestones and Proposed FYP2 Plan"))
    (SOURCES/"gantt_chart.csv").write_text("activity,status,start,end\nInitial repository commit,recorded,2026-11-11,2026-11-11\nCocos Creator setup,recorded,2026-11-15,2026-11-15\nReward systems and 30 levels,recorded,2026-11-15,2026-11-16\nAudio integration,recorded,2026-11-17,2026-11-17\nTest entry points,recorded,2026-11-19,2026-11-19\nOverlap fixes,recorded,2026-11-20,2026-11-20\nSupervisor review and scope freeze,proposed,W1,W2\nDesign refinement,proposed,W1,W4\nPrototype refinement,proposed,W3,W8\nInput and physics checks,proposed,W5,W8\nAndroid build and device checks,proposed,W7,W9\nPlayer evaluation,proposed,W9,W11\nAnalysis and revision,proposed,W11,W13\nFinal report and presentation,proposed,W13,W14\n",encoding="utf-8")
    return path

def create_wireframes():
    im,d=canvas("wireframes.png","Guli Go! Clean-Install Interface Wireframes",1800,800)
    screens=[(80,"HOME"),(650,"LEVEL SELECT"),(1220,"GAMEPLAY")]
    for x,title in screens:
        rounded(d,(x,120,x+470,720),CREAM,NAVY,34,5)
        draw_text(d,(x+235,155),title,23,NAVY,True,"mm")
        d.line((x+28,185,x+442,185),fill=GOLD,width=3)
    # Home wireframe
    x=80
    draw_text(d,(x+235,245),"GULI GO!",34,TEAL,True,"mm")
    draw_text(d,(x+235,290),"A single-player marble challenge",17,MUTED,False,"mm")
    rounded(d,(x+100,330,x+370,375),PALE,TEAL,18,2); draw_text(d,(x+235,352),"Chinese  |  English",16,INK,False,"mm")
    rounded(d,(x+95,415,x+375,480),TEAL,TEAL,14,2); draw_text(d,(x+235,447),"Start Game",21,WHITE,True,"mm")
    for i,t in enumerate(["Collection  0 / 56","Wardrobe  0 / 35","Tutorial / Help","Sound settings"]):
        rounded(d,(x+105,500+i*45,x+365,536+i*45),CREAM,GOLD,12,2); draw_text(d,(x+235,518+i*45),t,15,INK,False,"mm")
    draw_text(d,(x+235,690),"Fresh-install state: no saved progress",15,MUTED,False,"mm")
    # Level select wireframe
    x=650
    draw_text(d,(x+235,235),"Courtyard Challenge",25,INK,True,"mm")
    for i in range(5):
        y=280+i*75
        rounded(d,(x+36,y,x+434,y+62),WHITE,TEAL if i==0 else "#C7D0CC",14,2)
        draw_text(d,(x+70,y+31),f"{i+1:02d}",18,TEAL if i==0 else MUTED,True,"mm")
        draw_text(d,(x+220,y+23),"Level preview",15,INK,False,"mm")
        draw_text(d,(x+220,y+45),"Target and shot limit",12,MUTED,False,"mm")
        rounded(d,(x+330,y+13,x+418,y+49),TEAL if i==0 else "#D6DAD7",10,1)
        draw_text(d,(x+374,y+31),"Play" if i==0 else "Locked",12,WHITE if i==0 else MUTED,True,"mm")
    draw_text(d,(x+235,690),"First level opens the onboarding tutorial",15,MUTED,False,"mm")
    # Gameplay wireframe
    x=1220
    draw_text(d,(x+235,235),"Level 1   Target 0/2   Shots 4",17,INK,True,"mm")
    d.ellipse((x+95,270,x+375,550),outline=TEAL,width=4)
    d.ellipse((x+195,335,x+235,375),fill=GOLD,outline=NAVY,width=2)
    d.ellipse((x+210,455,x+255,500),fill="#B8D4E7",outline=NAVY,width=2)
    arrow(d,(x+232,476),(x+230,403),GOLD,3)
    rounded(d,(x+42,575,x+428,650),WHITE,GOLD,14,2)
    draw_text(d,(x+235,598),"Power and aim feedback",15,INK,False,"mm")
    rounded(d,(x+275,610,x+411,640),TEAL,TEAL,10,1); draw_text(d,(x+343,625),"Release",13,WHITE,True,"mm")
    draw_text(d,(x+235,690),"Tutorial appears before first challenge",14,MUTED,False,"mm")
    svg=svg_header("Guli Go! Clean-Install Interface Wireframes",body="")
    mmd="""flowchart LR
  Home["Home: language, start, collection 0/56, wardrobe 0/35, help, sound"]
  Levels["Level select: first level unlocked; remaining levels locked"]
  Play["Gameplay: Level 1, target 0/2, shots 4; drag and release"]
  Tutorial["First-run tutorial"]
  Home --> Levels --> Tutorial --> Play"""
    return save_image(im,"wireframes.png",mmd,svg)

FIGS={
 "gantt": create_gantt(),
 "usecase": create_usecase(),
 "class": create_class(),
 "sequence": create_sequence(),
 "activity": create_activity(),
 "architecture": create_architecture(),
 "wireframes": create_wireframes()
}

doc=Document()
sec=doc.sections[0]
sec.page_width=Inches(8.27); sec.page_height=Inches(11.69)
sec.top_margin=Inches(1); sec.bottom_margin=Inches(1); sec.left_margin=Inches(1); sec.right_margin=Inches(1)
sec.header_distance=Inches(.49); sec.footer_distance=Inches(.49)

def set_font(style, name="Times New Roman", size=12, bold=None, color="000000"):
    style.font.name=name
    style._element.rPr.rFonts.set(qn("w:eastAsia"),name)
    style.font.size=Pt(size)
    style.font.color.rgb=RGBColor.from_string(color)
    if bold is not None: style.font.bold=bold

normal=doc.styles["Normal"]
set_font(normal,size=12)
normal.paragraph_format.line_spacing=1.15
normal.paragraph_format.space_after=Pt(6)
for sty,size in [("Title",20),("Heading 1",16),("Heading 2",13),("Heading 3",12)]:
    s=doc.styles[sty]; set_font(s,size=size,bold=True)
    s.paragraph_format.keep_with_next=True
doc.styles["Heading 1"].paragraph_format.space_before=Pt(0)
doc.styles["Heading 1"].paragraph_format.space_after=Pt(14)
doc.styles["Heading 2"].paragraph_format.space_before=Pt(14)
doc.styles["Heading 2"].paragraph_format.space_after=Pt(6)
doc.styles["Caption"].font.name="Times New Roman"; doc.styles["Caption"].font.size=Pt(10)
doc.styles["Caption"].paragraph_format.alignment=WD_ALIGN_PARAGRAPH.CENTER

def add_field(paragraph, instruction, placeholder=""):
    r=paragraph.add_run()
    begin=OxmlElement("w:fldChar"); begin.set(qn("w:fldCharType"),"begin")
    instr=OxmlElement("w:instrText"); instr.set(qn("xml:space"),"preserve"); instr.text=instruction
    separate=OxmlElement("w:fldChar"); separate.set(qn("w:fldCharType"),"separate")
    text=OxmlElement("w:t"); text.text=placeholder or "Update this field in Word."
    end=OxmlElement("w:fldChar"); end.set(qn("w:fldCharType"),"end")
    r._r.append(begin); r._r.append(instr); r._r.append(separate); r._r.append(text); r._r.append(end)

def set_cell_shading(cell, fill):
    tcPr=cell._tc.get_or_add_tcPr()
    shd=OxmlElement("w:shd"); shd.set(qn("w:fill"),fill); tcPr.append(shd)

def set_cell_margins(cell, top=100, start=110, bottom=100, end=110):
    tc=cell._tc; tcPr=tc.get_or_add_tcPr()
    tcMar=tcPr.first_child_found_in("w:tcMar")
    if tcMar is None: tcMar=OxmlElement("w:tcMar"); tcPr.append(tcMar)
    for m,v in (("top",top),("start",start),("bottom",bottom),("end",end)):
        node=tcMar.find(qn("w:"+m))
        if node is None: node=OxmlElement("w:"+m); tcMar.append(node)
        node.set(qn("w:w"),str(v)); node.set(qn("w:type"),"dxa")

def add_table(headers, rows, widths=None):
    table=doc.add_table(rows=1,cols=len(headers))
    table.alignment=WD_TABLE_ALIGNMENT.CENTER
    table.style="Table Grid"
    table.autofit=False
    for j,h in enumerate(headers):
        c=table.rows[0].cells[j]; c.text=h; set_cell_shading(c,NAVY); c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
        for p in c.paragraphs:
            p.alignment=WD_ALIGN_PARAGRAPH.CENTER
            for r in p.runs: r.font.bold=True; r.font.color.rgb=RGBColor(255,255,255); r.font.size=Pt(10)
    for i,row in enumerate(rows):
        cells=table.add_row().cells
        for j,val in enumerate(row):
            cells[j].text=str(val); cells[j].vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            set_cell_margins(cells[j])
            if i%2: set_cell_shading(cells[j],"F1F6F4")
            for p in cells[j].paragraphs:
                p.paragraph_format.space_after=Pt(2); p.paragraph_format.line_spacing=1.0
                for r in p.runs: r.font.size=Pt(9.5); r.font.name="Times New Roman"
    if widths:
        for row in table.rows:
            for j,w in enumerate(widths): row.cells[j].width=Inches(w)
    doc.add_paragraph()
    return table

def para(text="", style=None, align=None, italic=False):
    p=doc.add_paragraph(style=style)
    if align is not None: p.alignment=align
    r=p.add_run(text); r.italic=italic
    return p

def heading(text, level=2):
    return doc.add_heading(text,level)

def caption(text):
    p=doc.add_paragraph(style="Caption")
    match=re.match(r"(Figure|Table) (\d+)\. (.*)",text)
    if match:
        label,num,rest=match.groups()
        p.add_run(label+" ")
        add_field(p,f"SEQ {label} \\* ARABIC",num)
        p.add_run(". "+rest)
    else:
        p.add_run(text)
    return p

def figure(number,title,key,width=6.25):
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    pic=p.add_run().add_picture(str(FIGS[key]),width=Inches(width))
    pic._inline.docPr.set("descr",title)
    caption(f"Figure {number}. {title}")

def pagebreak():
    doc.add_page_break()

# Cover
p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_before=Pt(82)
r=p.add_run("SOUTHERN UNIVERSITY COLLEGE\n"); r.bold=True; r.font.size=Pt(17)
r=p.add_run("FACULTY OF ENGINEERING AND INFORMATION TECHNOLOGY\n"); r.bold=True; r.font.size=Pt(13)
p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before=Pt(65)
r=p.add_run("GULI GO!\n"); r.bold=True; r.font.size=Pt(23); r.font.color.rgb=RGBColor.from_string(NAVY.lstrip("#"))
r=p.add_run("A Single-Player Marble Knock-Out Game\n"); r.bold=True; r.font.size=Pt(18)
p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before=Pt(30)
p.add_run("FINAL YEAR PROJECT 1 REPORT").bold=True
for line in ["Subject Code: ______________________________","Subject Name: ______________________________","Student Name: ______________________________","Student ID: ______________________________","Supervisor: ______________________________","Co-Supervisor: ______________________________","Submission Date: 21 November 2026","Department of Computer Science","Faculty of Engineering and Information Technology"]:
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(8); p.add_run(line)
pagebreak()

# Title page and declarations
p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_before=Pt(95)
r=p.add_run("GULI GO!\n"); r.bold=True; r.font.size=Pt(23)
r=p.add_run("A Single-Player Marble Knock-Out Game\n\n"); r.bold=True; r.font.size=Pt(18)
r=p.add_run("Final Year Project 1 Report"); r.font.size=Pt(15)
for line in ["Student Name and ID: ______________________________","Supervisor: ______________________________","Co-Supervisor: ______________________________","Subject Code and Name: ______________________________","Submission Date: 21 November 2026"]:
    p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.paragraph_format.space_after=Pt(10); p.add_run(line)
pagebreak()
heading("Declaration of Copyright",1)
para("I hereby declare that this FYP report entitled “GULI GO! A Single-Player Marble Knock-Out Game” is submitted subject to the regulations of Southern University College.")
for t in ["1. This FYP report is a property of Southern University College.","2. Southern University College or its library may make and transmit copies for academic purposes.","3. Southern University College or its library may store this report in a retrieval system and supply copies to other universities and research libraries."]:
    para(t)
para("\nSignature: ______________________________\nName: ______________________________\nStudent ID: ______________________________\nDate: ______________________________")
pagebreak()
heading("Declaration of Responsible Artificial Intelligence Use",1)
para("This report draft used AI assistance for document analysis, report structuring, academic prose drafting, diagram preparation, and language editing. The student must verify all project claims, references, and declarations before submission and remains responsible for the final work.")
para("AI-use level and required disclosure format: to be confirmed by the student under the current faculty instructions.")
para("\nSignature: ______________________________\nName: ______________________________\nStudent ID: ______________________________\nDate: ______________________________")
pagebreak()

# Front matter
heading("Abstract",1)
para("Guli Go! is a proposed single-player marble game for portrait-oriented screens. It combines a draw-back-and-release shot, circular play boundary, collision-driven marble knock-outs, limited attempts, level progression, and collectible appearance rewards. The project addresses a design problem: how to make a short marble challenge understandable through direct input, visible shot feedback, and clear round outcomes while retaining enough physical interaction for repeated attempts. FYP1 uses an iterative prototyping approach. The inspected project source is organized around Cocos Creator 3.8.8, a TypeScript game controller, a rules model, a Cocos Box2D adapter, local save data, and rendering and support modules. The current model defines 30 fixed levels and 56 marble collection identifiers. A separate appearance reward catalog contains 35 items. A fresh save is initialized with no stars, no collected items, no appearance rewards, and no completed tutorial. FYP1 report content documents objectives, scope, system requirements, the selected methodology, core design diagrams, clean-install wireframes, and the existing prototype structure. It does not report participant feedback, user evaluation, Android device results, or new test outcomes. Those activities remain planned for FYP2. The report also compares Guli Go! with Peggle Deluxe, Zuma Deluxe, and Marble It Up! Ultra using their published feature descriptions. The comparison identifies a focused design combination for Guli Go!; it does not claim a market-wide research gap or prove player preference. The report covers FYP1 work in Chapters 1–5.")
para("Keywords: casual game, marble game, iterative prototyping, Cocos Creator, Box2D",italic=True)
pagebreak()
heading("Acknowledgements",1)
para("[Complete this page if acknowledgement is required. No names or contributions have been supplied for this draft.]")
pagebreak()
heading("Table of Contents",1)
p=doc.add_paragraph(); add_field(p,'TOC \\o "1-3" \\h \\z \\u',"Open in Word and update the field to generate page numbers.")
para("The table of contents is a Word field. Update it after editing headings.")
pagebreak()
heading("List of Figures",1)
p=doc.add_paragraph(); add_field(p,'TOC \\h \\z \\c "Figure"',"Open in Word and update the field.")
pagebreak()
heading("List of Tables",1)
p=doc.add_paragraph(); add_field(p,'TOC \\h \\z \\c "Table"',"Open in Word and update the field.")
pagebreak()
heading("List of Abbreviations",1)
add_table(["Abbreviation","Meaning"],[
 ["AI","Artificial intelligence"],["FR","Functional requirement"],["MDA","Mechanics, Dynamics, Aesthetics"],["NFR","Non-functional requirement"],["UI","User interface"]],[1.4,4.6])
pagebreak()
heading("List of Terms",1)
add_table(["Term","Definition"],[
 ["Clean-install state","Initial local state with no saved stars, collections, rewards, or completed tutorial."],
 ["Knock-out","A target marble is counted only after its full disc leaves the circular boundary."],
 ["Prototype","An interactive development artifact used to represent and refine the proposed game."],
 ["Shot","One accepted launch of the player's marble; invalid launches still consume an attempt."]],[1.7,4.3])
pagebreak()

# Chapter 1
heading("Chapter 1: Introduction",1)
heading("1.1 Background Research",2)
para("Casual digital games often organize interaction around a small set of repeatable actions, visible feedback, and a clear short-term goal. Guli Go! applies this design approach to a marble challenge. A player selects a level, pulls the shooter marble away from the intended direction, and releases it. The game then resolves collisions and checks whether target marbles have fully crossed the play boundary. Limited attempts make shot choice consequential, while level progress and collectible appearances provide longer-term structure.")
para("The project's focus is a combination of mechanics rather than a claim that no similar game exists. Peggle Deluxe uses aimed shots and bouncing balls to clear pegs; Zuma Deluxe fires balls into a moving chain and uses colour matches; Marble It Up! Ultra centres on controlling a rolling marble across platforming levels. These products provide useful comparison points because each shares one part of Guli Go!'s design space. Guli Go! instead combines a backward-drag launch, physical collisions among marbles, a circular boundary, limited attempts, and local collection progression (GULI Go! project, 2026).")
para("The current project files identify the target as a portrait-oriented, single-player game. The source uses a 720 by 1280 design canvas, shared mouse and touch input, Cocos Creator 3.8.8, and Cocos Box2D. Project scope is offline and local: no account, remote backend, cloud sync, advertising, or in-app purchase is part of the stated requirements. The target FYP1 artifact is an interactive prototype. Android packaging and physical-device verification are future activities.")

heading("1.2 Problem Statements",2)
para("A marble game with collision-based outcomes must make three things clear to a first-time player: how to aim, what counts as a valid shot, and why a round ended. A static target or scoring indicator alone cannot explain these rules when motion and boundary crossing determine the result. The design problem for Guli Go! is therefore to provide a compact interaction loop that communicates the draw-back-and-release action, distinguishes valid from invalid outcomes, and links limited attempts to a visible level objective.")
para("This is a project-defined design problem, not a conclusion from a participant study. No player interviews, survey, or usability study are reported in this FYP1 draft. The problem statement and objectives should be checked against the supervisor-approved proposal before submission.")

heading("1.3 Objectives",2)
para("The project pursues the following objectives:")
for t in [
 "1. To analyse the mechanics and interface requirements of a portrait-oriented, single-player marble knock-out game.",
 "2. To design and develop an interactive prototype in which players aim by dragging and releasing a shooter marble, resolve collisions, and complete fixed levels within limited attempts.",
 "3. To prepare the prototype for FYP2 evaluation by defining gameplay, interface, local-progress, and device-verification activities."
]: para(t)
para("The third objective is a preparation objective. It does not claim that user evaluation or Android device testing has already occurred.")

heading("1.4 Scope",2)
para("The project scope is limited to one local single-player game. It includes a home screen, level selection, gameplay and pause/result states, first-run tutorial, marble collection, appearance wardrobe and draw system, local progress and settings, and Chinese/English interface text. The inspected model contains 30 fixed level definitions and 56 marble collection identifiers. A separate reward catalog defines 5 scene appearances, 20 shooter-marble appearances, and 10 trail appearances. These are game-design inventories; they do not represent items unlocked by a player (GULI Go! project, 2026).")
para("A fresh installation is represented with an empty save: zero level stars, an empty marble collection, no draw rewards, no equipped appearance, and an incomplete tutorial. No player history or previously saved game state is used in this report. The design provides local persistence for progress and settings, but there is no remote account or server.")
para("Cocos Creator 3.8.8 is the project engine. The current source defines a portrait canvas, mouse and touch input paths, and a Box2D-based 2D physics adapter. The project documentation describes browser preview support. An Android build, physical-phone touch verification, performance measurement, participant evaluation, and final difficulty balancing are outside completed FYP1 claims and are planned for FYP2.")

heading("1.5 Summary",2)
para("Chapter 1 defined Guli Go!'s design problem, objectives, and scope. The following chapters review related game designs and technologies, explain the FYP1 methodology, document the proposed system design, and describe the FYP1 prototype without presenting FYP2 evaluation as completed work.")

# Chapter 2
pagebreak(); heading("Chapter 2: Literature Review",1)
heading("2.1 Introduction",2)
para("This chapter reviews game-design concepts and technical tools that inform Guli Go!. It compares three published games through their publicly described mechanics, then relates those patterns to the proposed game. The comparison is descriptive. It does not measure player preference, product quality, or commercial performance.")

heading("2.2 Literature Review on Technology",2)
para("Hunicke, LeBlanc, and Zubek's MDA framework separates a game into mechanics, dynamics, and aesthetics. Mechanics are the rules and components; dynamics describe how the rules interact during play; aesthetics describe the experience produced for players. The framework is useful here because Guli Go!'s rule choices (shot strength, boundary checks, and attempt limits) create dynamics such as chain collisions and uncertain final positions. The presentation and audio then communicate the resulting feedback. MDA is an analytical framework, not an empirical finding about Guli Go! (Hunicke et al., 2004).")
para("A 2D physics engine handles contact and motion rules that would otherwise need custom collision resolution. Cocos Creator 3.8 exposes 2D physics settings, contact callbacks, rigid bodies, and colliders. Its documentation explains the need to convert between engine world units and the physics unit system and allows fixed time-step configuration (Cocos, n.d.). Box2D documentation likewise recommends a fixed time step for stable simulation behavior (Box2D, n.d.). Guli Go!'s inspected adapter configures a 1/120-second step and circular rigid-body colliders. This is the project's implementation choice; it is not a measured performance advantage.")
para("Iterative design is appropriate for an interactive game because changes to input, physics, level layouts, and feedback can alter the experience together. Research on iterative game design argues for evaluating artifacts during development and refining the design from those evaluations. The cited study concerns serious games, so its process supports the general value of iteration but does not establish outcomes for a casual marble game (Ben Amara et al., 2024). In Guli Go!, FYP1 establishes the prototype and proposed evaluation plan; FYP2 is reserved for player feedback and device-specific checks.")

heading("2.3 Comparison Between Three Existing Systems",2)
para("The comparison uses official product descriptions as primary evidence. The selected games are not treated as interchangeable implementations; each contributes a distinct reference pattern.")
caption("Table 1. Feature comparison of related games and Guli Go!")
add_table(["System","Published core loop","Relevant similarity","Difference from Guli Go!"],[
 ["Peggle Deluxe","Aim and launch a ball to clear pegs across levels (PopCap Games, 2007).","Aimed projectile, collision-driven motion, level objective.","The target is a peg board; the goal is to clear marked pegs and score."],
 ["Zuma Deluxe","Fire coloured balls into a moving chain; form matches of three or more before the chain reaches its goal (PopCap Games, 2006).","Projectile aiming, marble-like objects, chain effects.","Matching colours and preventing chain arrival drive the rules; Guli Go! uses full-disc boundary exits."],
 ["Marble It Up! Ultra","Control a rolling marble through a single-player platform campaign with obstacles and power-ups (Marble It Up!, n.d.).","Marble movement, level progression, physical control.","The player steers a marble through a course rather than launching it at target marbles."],
 ["Guli Go!","Drag back and release a shooter marble; knock target marbles fully outside a ring using limited shots.","Combines aiming, motion, collision, attempts, and collection.","Project-specific circular arena and knock-out rule."]],[1.0,1.75,1.65,1.85])
para("The comparison suggests a focused design position: Guli Go! draws on aiming and bounce interactions from projectile puzzle games and on marble movement from marble platformers, then applies them to a circular knock-out objective. This observation is a feature-level synthesis of the reviewed descriptions. It is not evidence that the combination is novel across the whole game market.")

heading("2.4 Literature Review on Technology Used",2)
para("Cocos Creator 3.8.8 is used as the integrated authoring and runtime environment. The project uses TypeScript scripts and Cocos scene, node, UI, audio, resource, and input APIs. The current project settings target a 720 by 1280 portrait design with proportional display. The source assigns screen composition and game flow to GuliGame, round rules to GameModel, drag state to Slingshot, and physics stepping to GuliPhysics.")
para("The physics adapter creates dynamic rigid bodies with circular colliders and zero gravity for the tabletop-style play area. It advances a Box2D world at a configured fixed interval, reads body positions and velocities back into the rules model, and waits for bodies to settle before resolving a shot. Cocos Creator documentation describes its Box2D-backed 2D physics module, colliders, bodies, and timestep controls; Box2D's fixed-step guidance is relevant to the adapter's design (Cocos, n.d.; Box2D, n.d.). No benchmark or device performance claim is made in this report.")
para("The data layer is local storage rather than a relational database. The inspected SaveData structure contains level stars, collection IDs, audio settings, tutorial completion, language, draw currency, reward IDs, and equipped appearance IDs. Therefore, a relational ERD would misrepresent the implementation. The template's mandatory class-diagram-or-ERD choice is addressed with a class diagram of the code structure. There is no account service, external database, or cloud synchronization in the project scope (GULI Go! project, 2026).")

heading("2.5 Summary",2)
para("The literature and product comparison support an iterative, mechanics-focused design approach. Cocos Creator and Box2D provide the engine and physics basis already reflected in the source. The comparison identifies a project-specific combination of aiming, ring-boundary knock-outs, attempt limits, and local collection. It does not substitute for FYP2 usability evaluation.")

# Chapter 3
pagebreak(); heading("Chapter 3: Methodology",1)
heading("3.1 Introduction",2)
para("Guli Go! uses an iterative prototyping methodology. The project combines rule design, touch and mouse interaction, physics, screen feedback, and saved progression. These elements can affect each other, so a prototype provides a concrete artifact for refining the system. FYP1 documents the design and current code structure. FYP2 will perform the planned evaluation and platform checks.")

heading("3.2 Methodology Choice and Justification",2)
para("The selected method is an iterative software-prototyping process informed by MDA. The process is suitable because the central requirement is experiential: a player must understand the pull gesture and interpret a collision outcome. A paper specification alone cannot demonstrate whether the drag, shot, physics, and settlement feedback fit together. The inspected source already separates game rules, input handling, physics stepping, screen rendering, and local save data, which supports focused refinement.")
para("The method has four working stages. First, define the gameplay loop and acceptance rules. Second, implement a playable prototype and interface. Third, inspect the interaction and correct design defects during FYP1. Fourth, evaluate the prototype with players and target devices during FYP2. The first three stages describe the project approach; this report does not claim that any participant study has been completed.")
para("MDA provides a useful review lens: the shot rules are mechanics; collisions, settled positions, and attempt pressure are dynamics; the courtyard setting, sound, and collection feedback are aesthetic presentation. Iteration will connect these levels. The approach remains a development method rather than a controlled research experiment.")

heading("3.3 Phases Within the Chosen Methodology / Planning",2)
caption("Table 2. Methodology phases and stage status")
add_table(["Phase","FYP1 status","Evidence or output","FYP2 continuation"],[
 ["Requirements and scope","Defined in project records","PRD, objectives, acceptance criteria","Confirm with supervisor before evaluation"],
 ["Game and interface design","Represented in source and report diagrams","Use case, class, activity, sequence, architecture, wireframes","Refine after supervisor feedback"],
 ["Prototype construction","Source code contains the prototype modules","Cocos Creator project and TypeScript modules","Refine input, physics, content, and polish"],
 ["Technical verification","Not newly executed for this report","Existing validation notes are not treated as current test results","Run planned regression and device checks"],
 ["Player evaluation","Not performed; clean-install, no-player baseline","No participant data or feedback claimed","Recruit participants, collect consent, evaluate"],
 ["Final analysis and reporting","Future work","No evaluation results in FYP1 report","Analyze evidence, revise, and complete final report"]],[1.15,1.1,1.7,1.9])
para("FYP1 source-control milestones are dated 11–20 November 2026. They identify repository setup, Cocos Creator setup, reward and level work, audio integration, test-entry work, and overlap fixes. These timestamps document code-repository activity only. They do not establish the full semester schedule or date undated research and design work (GULI Go! project, 2026).")

heading("3.4 System Requirements Analysis",2)
para("The functional requirements below are derived from inspected source modules and the project requirements document. The non-functional items record constraints present in the project design. They are not performance measurements or user-acceptance results.")
para("Functional requirements",style="Heading 3")
caption("Table 3. Functional requirements")
add_table(["ID","Requirement","Current design evidence"],[
 ["FR-01","Show the home screen and allow language selection.","Home screen and localization modules."],
 ["FR-02","Show fixed levels, keep later levels locked until progression permits access, and start an unlocked level.","30 level definitions and level-selection flow."],
 ["FR-03","Present first-run guidance and allow the player to revisit help.","Tutorial and tutorial view modules."],
 ["FR-04","Allow mouse or touch input to drag the shooter, preview pull strength, release, or cancel.","Shared slingshot state and input handlers."],
 ["FR-05","Resolve marble motion and contacts; count target marbles only after the full disc exits the boundary.","GameModel boundary rules and Box2D adapter."],
 ["FR-06","Wait for a shot to settle, roll back an invalid shot's target changes, and spend an accepted attempt.","Shot snapshot, rollback, and settlement logic."],
 ["FR-07","Determine win/loss, preserve the best level stars, and award new collection items on a win.","GameModel outcome and award logic."],
 ["FR-08","Show the marble collection and separate appearance wardrobe.","Collection and wardrobe screens."],
 ["FR-09","Allow a draw when sufficient stars exist and equip owned appearance rewards.","Gacha reward model and wardrobe actions."],
 ["FR-10","Pause, resume, retry, and return home through the game flow.","Gameplay modal actions."],
 ["FR-11","Store progress, collection, rewards, language, audio levels, and tutorial state locally.","SaveData and local storage access."]],[.65,3.15,2.0])
para("Non-functional and platform requirements",style="Heading 3")
caption("Table 4. Non-functional and platform requirements")
add_table(["ID","Constraint","Evidence / limitation"],[
 ["NFR-01","Operate as a single-player offline game without accounts or remote services.","Defined project scope; no backend module in the inspected design."],
 ["NFR-02","Use a 720 by 1280 portrait design and preserve the play area proportionally.","Cocos view configuration and project requirements."],
 ["NFR-03","Use one shared game interaction model for mouse and touch.","Input routes to common slingshot state; physical devices remain unverified."],
 ["NFR-04","Use a fixed physics step for game-world advancement.","Adapter configures a 1/120-second Box2D step; this value is not a measured quality threshold."],
 ["NFR-05","Support Chinese and English text.","Localization dictionary and language control."],
 ["NFR-06","Initialize a fresh installation without prior player progress.","Default clean save has zero stars and empty collections/rewards."],
 ["NFR-07","Recover safely from invalid or damaged local save data.","Save cleaning and fallback logic exist in source; no new corruption test was run."],
 ["NFR-08","Support Android only after a build and device check.","Android packaging and device behavior are future FYP2 work."]],[.8,3.2,1.8])
heading("3.4.1 Hardware",3)
para("The project requires a computer capable of running Cocos Creator 3.8.8 and a supported browser for preview. Exact processor, memory, graphics, operating-system, and mobile-device specifications were not supplied in the inspected project files. They are therefore not invented here. Android SDK, NDK, JDK, and a physical Android device are needed for the planned FYP2 Android build and device checks, but those components are not confirmed as installed or used.")
heading("3.4.2 Software",3)
caption("Table 5. Software and tools documented for the project")
add_table(["Software/tool","Use in project","Status"],[
 ["Cocos Creator 3.8.8","Scene authoring, UI, assets, input, audio, and runtime","Version appears in project settings and package metadata"],
 ["TypeScript","Game rules, input, rendering orchestration, physics adapter","Source code present"],
 ["Cocos 2D physics / Box2D","Rigid-body motion and circle collisions","Source adapter present; this report did not run a physics preview"],
 ["Web browser","Target preview environment","Project documentation describes browser preview; not launched in this review"],
 ["Git","Version history and change tracking","Repository contains dated commits"],
 ["Microsoft Word","Editable report format","Required deliverable"]],[1.45,2.85,1.55])

heading("3.5 Gantt Chart",2)
para("Figure 1 separates repository-recorded FYP1 dates from a proposed FYP2 schedule. FYP1 markers show dated commits only; they are not estimates of time spent. FYP2 uses relative semester weeks because the official semester calendar was not provided. The supervisor should align these weeks to the academic calendar before submission.")
figure(1,"Recorded FYP1 repository milestones and proposed FYP2 activities","gantt",6.45)

heading("3.6 Financial Justification",2)
para("The student reports no project cost. The financial plan therefore records no new paid project expense. It does not assign a replacement value to existing hardware or estimate the value of student time.")
caption("Table 6. FYP1 financial summary")
add_table(["Cost item","FYP1 cost","Basis"],[
 ["Cocos Creator and project tooling","RM 0 reported","No paid project license or new tool cost declared"],
 ["Hardware","RM 0 new expenditure reported","Existing equipment cost is not valued in this draft"],
 ["Hosting and backend","RM 0","No remote service is in the defined scope"],
 ["Total new project expenditure","RM 0 reported","Student-provided cost statement"]],[2.0,1.4,2.45])

heading("3.7 Summary",2)
para("This chapter selected iterative prototyping, listed the phases and current stage, documented known software requirements, and described the Gantt and cost assumptions. Participant testing, Android device checks, and formal evaluation remain FYP2 activities.")

# Chapter 4
pagebreak(); heading("Chapter 4: Design",1)
heading("4.1 Introduction",2)
para("Chapter 4 describes the design visible in the inspected source and project requirements. It uses software-engineering diagrams to explain player interactions, class responsibilities, shot flow, activity logic, and system architecture. The design represents the current code structure where supported by the source. It is not a claim that Android packaging or device behavior has been verified.")

heading("4.2 Use Case Diagram (Mandatory)",2)
para("The only external system actor is the Player. The system is offline and has no administrator, remote service, or third-party login actor in scope. The player starts a level, follows the first-run tutorial, aims and releases a shot, pauses or retries, reviews the result, and views or equips appearance rewards. Local persistence is an internal system responsibility.")
figure(2,"Player interactions with Guli Go!","usecase")
para("The use cases derive from the project scope and current screen and input modules. They describe supported system interactions, not actions performed by study participants.")

heading("4.3 Sequence Diagram (Optional)",2)
para("The sequence below follows one representative shot. The controller routes input to the slingshot state, passes the resulting direction and power to the rules model, and advances the physics adapter. Once movement settles, the model decides whether the shooter fully exited, restores target state after an invalid shot, or records knock-outs. A win causes the controller to update local save data.")
figure(3,"Sequence for one shot and outcome resolution","sequence")

heading("4.4 Class Diagram / Entity Relationship Diagram",2)
para("The project uses local key-value storage and structured TypeScript data; it has no relational database. An ERD would imply relational tables that are not present. This report therefore uses the alternative class diagram required by the template. The diagram is a code-level view of the principal modules and their responsibilities.")
figure(4,"Core code classes and relationships","class")
para("GuliGame coordinates screen flow and input. GameModel owns level and shot rules. GuliPhysics advances Cocos Box2D and transfers body snapshots. Slingshot owns pointer and pull state. SaveData represents local settings and progress. Reward and Tutorial modules provide collection, wardrobe, draw, and onboarding state.")

heading("4.5 Data Flow Diagram",2)
para("A separate DFD is omitted because the project has no external data source, user account, web service, or server process. Local save reads and writes are shown in the architecture and sequence diagrams. The project remains a single-player offline application.")

heading("4.6 Activity Diagram (Optional)",2)
para("Figure 5 presents the core play loop. A valid shot is adjudicated only after the shooter exits the circular boundary and all marbles settle. If the shooter does not exit, target positions and knock-outs are rolled back while the accepted shot remains spent. A completed target objective takes priority over an exhausted shot count.")
figure(5,"Player activity for selecting and completing a level","activity")

heading("4.7 System Architecture (Optional)",2)
para("Figure 6 presents the implemented code architecture, based on source inspection. GuliGame connects input and presentation with the game model. The model exchanges state with the Box2D adapter. Local storage holds progress and settings. Assets, language support, tutorial, and hints remain local modules. Browser preview is the current project target; Android is shown only as planned work.")
figure(6,"Documented code architecture and platform boundary","architecture")
para("No relational database or remote server is part of this architecture. The local save begins empty on a fresh installation. The diagram does not claim that the browser preview or Android build was run during this report preparation.")

heading("4.8 Summary",2)
para("The design chapter documents one player actor, the shot sequence, class responsibilities, gameplay activity, and a local-only architecture. It excludes an ERD and DFD because those would imply data systems outside project scope.")

# Chapter 5
pagebreak(); heading("Chapter 5: Implementation (FYP I)",1)
heading("5.1 Introduction",2)
para("This chapter documents the FYP1 prototype and its interface plan. Source inspection confirms implementation modules for screen flow, rules, input, physics, tutorial, localization, rendering, rewards, and local saves. No participant trial, outcome analysis, or Android device test is reported. The initial save is treated as blank, with no player progress.")

heading("5.2 Content Design / Wireframe",2)
para("The interface uses a portrait 720 by 1280 design canvas and a courtyard visual theme. The home screen offers language selection, game start, collection, wardrobe, tutorial, and sound settings. The level selector shows five levels per page and exposes the first level in a fresh save. The first entry to level 1 displays the tutorial before the challenge. The gameplay screen places level, target, and attempt information above a circular play area, with the power and release controls below.")
figure(7,"Clean-install wireframes; these are design diagrams, not screenshots","wireframes",6.45)
para("The clean-install values shown in the wireframe are 0 of 56 collected marbles, 0 of 35 draw rewards, and no completed tutorial. The gameplay frame shows level 1 before any shot, with a target of two marbles and four attempts. These values come from the default save and level definition in source code; they are not player results.")

heading("5.3 Prototype",2)
para("The current repository contains the Cocos Creator prototype. GuliGame assembles the home, level selection, gameplay, collection, wardrobe, draw, and modal screens. GameModel defines 30 fixed layouts, shot accounting, full-disc boundary checks, invalid-shot rollback, win/loss state, and awards. Slingshot applies a drag dead zone and pull-distance cap. GuliPhysics uses Cocos Box2D rigid bodies and circular colliders with a configured 1/120-second step. Local SaveData stores progress, language, audio levels, draw rewards, and equipped appearance identifiers (GULI Go! project, 2026).")
para("The FYP1 report uses wireframes rather than screenshots. No verified clean-install screenshot was available for this draft. A genuine clean-install screenshot may be added after a clean preview capture.")
para("No player session or user study has been conducted for this report. Accordingly, it contains no player feedback, questionnaire results, usability score, or difficulty conclusion. Source-level implementation details establish designed behavior, not runtime success or player acceptance.")
para("FYP2 work should verify the prototype in a clean browser profile, perform regression and device checks, build for Android, conduct a small supervised player evaluation, tune level difficulty, and replace prototype art where needed. These are plans, not completed FYP1 outcomes.")

heading("5.4 Summary",2)
para("Chapter 5 records the implemented FYP1 prototype and its clean-install interface through wireframes. It reports no player study or test outcome. FYP2 remains responsible for runtime verification, device compatibility, participant evaluation, and final refinement.")

# References
pagebreak(); heading("References",1)
refs=[
 "Ben Amara, B., Mhiri Sellami, H., & Ben Said, L. (2024). An approach for serious game design and development based on iterative evaluation. Journal of Software: Evolution and Process, 36(10), e2680. https://doi.org/10.1002/smr.2680",
 "Box2D. (n.d.). Simulation. Box2D documentation. Retrieved November 21, 2026, from https://box2d.org/documentation/md_simulation.html",
 "Cocos. (n.d.). 2D physics manager. Cocos Creator User Manual 3.8. Retrieved November 21, 2026, from https://docs.cocos.com/creator/3.8/manual/en/physics-2d/physics-2d-system.html",
 "Hunicke, R., LeBlanc, M., & Zubek, R. (2004). MDA: A formal approach to game design and game research. In Proceedings of the AAAI Workshop on Challenges in Game AI. AAAI Press.",
 "Marble It Up! (n.d.). Marble It Up! Ultra. Retrieved November 21, 2026, from https://marbleitup.com/",
 "PopCap Games. (2006). Zuma Deluxe [Video game]. Steam. https://store.steampowered.com/app/3330/Zuma_Deluxe/",
 "PopCap Games. (2007). Peggle Deluxe [Video game]. Steam. https://store.steampowered.com/app/3480/Peggle_Deluxe/",
 "GULI Go! project. (2026). Product requirements document [Unpublished project document].",
 "GULI Go! project. (2026). Source code and project documentation [Unpublished software project]."
]
for ref in refs:
    p=doc.add_paragraph(ref)
    p.paragraph_format.left_indent=Inches(.5); p.paragraph_format.first_line_indent=Inches(-.5); p.paragraph_format.space_after=Pt(8)

# Appendices required by the template, left factual and editable.
for title,body in [
 ("Appendix A: Source Code / GitHub Link","[Add the approved project repository link before submission.]"),
 ("Appendix B: Similarity Report","[Attach the official similarity report before submission.]"),
 ("Appendix C: AI Chat / Prompt History","[Attach required AI-use records under current faculty instructions.]"),
 ("Appendix D: Paraphrasing Tools","[Complete only if paraphrasing tools were used and disclosure is required.]"),
 ("Appendix E: AI Tools","This report draft used AI assistance for analysis, structuring, drafting, diagrams, and language editing. Confirm the disclosure level and format required by the faculty."),
 ("Appendix F: Video Presentation","[Add the approved presentation recording link if required.]")]:
    pagebreak(); heading(title,1); para(body)

# Footer page numbers and field-update setting.
for section in doc.sections:
    f=section.footer.paragraphs[0]; f.alignment=WD_ALIGN_PARAGRAPH.CENTER
    f.add_run("GULI GO! | FYP1 | ")
    add_field(f,"PAGE")
settings=doc.settings.element
update=OxmlElement("w:updateFields"); update.set(qn("w:val"),"true"); settings.append(update)
doc.core_properties.title="GULI GO! A Single-Player Marble Knock-Out Game - FYP1 Report"
doc.core_properties.subject="Final Year Project 1 report, Chapters 1-5"
doc.core_properties.author=""
doc.save(OUT)
print(OUT)
