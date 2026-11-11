# PPT Content Notes

## Scope and tools
16 slides, 16:9. Produced with python-pptx per the user preference. Text, diagrams, shapes and replacement frames are editable. Source images remain separate picture objects. No game code, scene, resource or configuration was modified.

## Planning basis
The complete Phase 2 plan was available in the conversation and used directly. Sample Deck and Workshop #1 originals were not available. Eight-chapter alignment is therefore unverified; the requested 16-slide order is retained. Workshop principles are presentation guidance, not asserted judging criteria.

## Confirm before submission
- Team names, institution, roles, contact, date and event branding.
- Current game title styling and final English screenshots.
- Home /50 denominator versus 56 items; marble names versus appearance IDs.
- Current build consistency; existing Web package is not confirmed to contain current bilingual code.
- Real device performance, touch, safe area and restart persistence.
- Actual Huawei/HMS integration: none verified in current project.
- Asset provenance and permissions, especially music and motif artwork.
- Proposed roadmap and cosmetic-only monetization; neither is a delivery commitment.
- Player preferences and replay motivation remain hypotheses. No market, revenue, user or retention figures are invented.

## Important editorial choices
- No slide count or section-order change. Shortened titles retain the intended content.
- Existing English gameplay and tutorial images are used as project captures; tutorial is explicitly not simulated gameplay evidence.
- Default-only skins are not presented as a full skin system.
- Historical full-collection and inconsistent result screenshots are not used as earned-progress evidence.
- 31 checks and typecheck refer to Phase 1 actual results, not a new run during authoring.
- 120 Hz means fixed physics step frequency, not measured display FPS.
- IMG-08, IMG-12, IMG-13, IMG-19 and IMG-20 are editable native diagrams/text evidence, not image screenshots.
- IMG-02 used on cover; IMG-04 and IMG-01 intentionally reused.
- IMG-07 uses three independently editable slots. IDs are stable asset identifiers; occurrence IDs identify individual placements.

## Slide evidence
- Slide 1: assets/scripts/GuliGame.ts: home(); assets/resources/hud/prefabs/Logo.prefab
- Slide 2: User confirmation required.
- Slide 3: assets/scripts/GameModel.ts: launch(), finishShot(); assets/scripts/GuliGame.ts: home()
- Slide 4: assets/scripts/GameModel.ts: LEVELS, stars, award(); assets/scripts/GuliGame.ts: levels()
- Slide 5: assets/scripts/Slingshot.ts; assets/scripts/GuliGame.ts: drawAim(), up(); assets/scripts/GameModel.ts: finishShot()
- Slide 6: assets/scripts/GameModel.ts: finishShot(), award(); assets/scripts/GuliGame.ts: update(), showModal()
- Slide 7: assets/scripts/GameModel.ts; assets/scripts/TutorialView.ts; assets/scripts/Localization.ts; assets/scripts/GuliGame.ts: collection(), persist()
- Slide 8: assets/scripts/GameModel.ts: finishShot(), rollMarbles(); assets/scripts/GameHints.ts: resolved()
- Slide 9: package.json; assets/scripts/GuliPhysics.ts; assets/scripts/GuliGame.ts; assets/scripts/GameModel.ts; tests/
- Slide 10: package.json; settings/v2/packages/builder.json; settings/v2/packages/cocos-service.json
- Slide 11: assets/scripts/GuliGame.ts: gameUI(), applySafeArea(), updateHints(); assets/scripts/TutorialView.ts; assets/scripts/LanguageSwitch.ts
- Slide 12: assets/resources/art/courtyard.png; assets/scripts/MarbleRenderer.ts; assets/scripts/GuliGame.ts: syncMusic(), playInvalidShotHudAnimation(); assets/resources/audio/
- Slide 13: assets/scripts/GameModel.ts: LEVELS, stars, award(); assets/scripts/GuliGame.ts: home()
- Slide 14: assets/scripts/GameModel.ts: award(), rollMarbles(); assets/scripts/GuliGame.ts: startLevel(), skins()
- Slide 15: assets/scripts/GameModel.ts; assets/scripts/Slingshot.ts; assets/scripts/GuliGame.ts
- Slide 16: User confirmation required.

## Verification
- PPTX package reopened using python-pptx; 16 slides confirmed.
- All shape bounding boxes are within slide bounds.
- IMG-01 through IMG-21 all accounted for.
- PowerPoint opening, PDF export and rendered visual review: see QA report after export.

## Final QA outcome
- Opened successfully in installed Microsoft PowerPoint via native automation.
- PowerPoint exported a matching 16-page PDF and 16 slide PNGs.
- Reviewed all 16 rendered slides; fixed short text frames, excess wrapping, a step-label mismatch, tutorial letterboxing and theme shadows.
- Native text-width and text-height checks reported zero overflow warnings.
- PPTX and PDF both contain 16 nonblank pages/slides.
- All 21 Phase 2 asset IDs are accounted for. IMG-07-A/B/C are the three frame slots under IMG-07.
- Editable text, native shapes and picture objects remain separate; no slide is a flattened screenshot.
- Full-size PNGs are in preview/. Build and validation helpers are in source/.
