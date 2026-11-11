# Interactive tutorial — implementation and verification

## Implemented behavior

The existing Guli scene, Canvas, camera, slingshot, aim prediction and Box2D simulation remain in use. No new physics system or gameplay scene was introduced.

The main menu's Play button checks `save.tuto` before starting a normal level. Missing or malformed values default to `false`. When false, Play opens the tutorial introduction. When true, Play starts normal Level 1. The separate level-selection entry preserves access to the existing level menu. The Help entry always opens the tutorial, regardless of completion status.

Flow: Welcome → Identify → Aim → Power → Shoot → Wait for actual settling → Objective → Limited shots → Practice → Completion. Aim requires a real pull of at least 24 Canvas design pixels. Power requires a subsequent change of at least 15 points while pulled at least 24 pixels. The existing power calculation and launch speed mapping are unchanged. Early release before the shooting step cancels without spending a shot; the player can pull again. Sample-shot success does not complete the tutorial.

Practice uses a separate `TutorialGameModel` configuration: one target at (70, 150), five shots, one required target. It inherits all simulation and rule behavior. Normal Level 1 and other levels are not edited. Both target and shooter must fully leave the circle; an invalid shot restores targets immediately but still spends one shot. Practice failure exposes Retry, which resets only the practice board and shot count.

Only a real `won` result while the tutorial is in its final practice step sets `save.tuto = true`. Tutorial results never call normal level rewards. Skipping, leaving, or replaying does not reset or grant completion. A previously completed player's status stays true during an abandoned replay. All tutorial nodes are removed when leaving or starting normal gameplay. The tutorial has no global input subscriptions or scheduled automatic advancement.

The English instruction card sits above the circle. The shooter, power bar, circle and remaining-shot counter receive contextual pulsing highlights. Bottom controls provide Skip and step-appropriate continuation actions. Existing home/pause controls remain usable; pause hides the tutorial overlay and resume restores its current step.

## Persistence

The existing `guli.save.v2` record gains one Boolean field, `tuto`. Existing v1 fallback, stars, collection and sound data remain supported by `cleanSave`. There is no duplicate saved completion flag. Save failure follows the existing in-session behavior and storage warning; persistence cannot be guaranteed when device storage is unavailable.

## Files

- Modified `assets/scripts/GameModel.ts`: adds and validates `SaveData.tuto` only.
- Modified `assets/scripts/GuliGame.ts`: menu routing, tutorial lifecycle, minimal real-input and settled-shot hooks, reward isolation.
- Added `assets/scripts/Tutorial.ts` and `.meta`: transient state machine, instruction copy and isolated practice configuration.
- Added `assets/scripts/TutorialView.ts` and `.meta`: disposable overlay and highlights, native Cocos buttons.
- Added `assets/scripts/TutorialVerification.ts` and `.meta`: opt-in Cocos integration tests without production save writes.
- Added `tests/tutorial.cjs`: state, save round-trip and isolated-level regression tests.
- Modified `package.json`: includes tutorial and existing music checks in `npm test`.
- Added this report and `docs/tutorial-welcome.png`, `docs/tutorial-completed.png`, `docs/tutorial-returning-player.png`.

## Actual verification

- TypeScript check passed.
- Existing 25 model/slingshot/aim checks passed; music controller check passed.
- Three new tutorial checks passed: safe save default/round-trip; state gating and final-practice-only completion; unchanged normal Level 1.
- Five Cocos integration groups passed: welcome input block; actual aim/power/one-shot and settling; pause/skip/exit isolation; exhausted practice/retry; genuine Box2D win and replay preservation. A real winning pull was (-8, -119) design pixels. The test searches input angles, not fabricated success, target positions or phase changes.
- Four Cocos mouse/touch regression groups passed, including multi-touch ownership, cancellation and one launch per release. These use synthetic input events in the browser, not physical phone touches.
- Browser UI was operated through the complete lesson and final practice using real drag/release actions. The practice actually won. Reloading the page and clicking Play then opened normal Level 1 with four targets and no tutorial overlay.
- Persistent completion was tested on `127.0.0.1:7456`, separate from the user's usual `localhost:7456` storage. The usual preview's saved progress was not overwritten by this test. The isolated test origin now has a completed tutorial.
- Portrait device preview (iPhone 14 Pro profile, 393×852) was visually inspected: instruction card, target, shooter and power bar remained visible; native continuation buttons worked.
- Cocos Creator 3.8.8 Web Mobile release build completed successfully with exit code 36. Build log: `temp/tutorial-build.log`.

No Huawei RPK build, physical-device restart/touch test, or broad device/performance matrix was performed. Browser reload persistence is verified; it is not a claim of native application restart verification.

## Open and test

1. Open this existing project with Cocos Creator 3.8.8. Allow the added scripts and metadata to import. No Inspector wiring, scene replacement or manual editor setup is needed.
2. Open `assets/scenes/Guli.scene` and preview. On the main menu, choose Play for automatic status gating, or `新手教学 / Help` to replay.
3. Choose Let's Go, then Got it. Hold the blue shooter, pull backwards, vary the distance, then release after the shooting instruction appears.
4. Wait for settling; continue through objective and remaining shots. Start Practice and knock the target out while also sending the shooter fully outside. Low-power failures spend shots and restore targets. Retry after five failures.
5. Check Skip, pause/resume and home exit. Replay must not remove existing stars or collection. After success, refresh the preview and choose Play: normal Level 1 should open directly.
6. Automated scene checks: append `?guliTutorialTest=1` or `?guliSlingTest=1` to the actual Cocos preview URL. The tutorial test restores in-memory save data and does not persist its fixtures.
7. Run `npm test` and `npm run typecheck` for local checks. Web output is under `build/web-mobile`.
