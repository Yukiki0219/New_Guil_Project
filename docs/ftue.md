# Three-page FTUE and contextual hints

## Current behavior

This supersedes the previous nine-step practice tutorial. First entry to a level opens three explanatory pages. Page 1 demonstrates pulling and releasing using presentation nodes only. Page 2 compares invalid and valid full-disc exits. Page 3 reads the current level's remaining target count and remaining shots. Previous/next buttons and horizontal swipes navigate; only the final Start Challenge button writes `SaveData.tuto = true`.

The existing game model and physics instance remain intact while the tutorial is open. The update loop does not advance physics and all gameplay pointer input is gated. Reopening through `?` preserves the same model, shots, targets, and even an in-flight round. Closing resumes that state. Opening from the failure dialog returns to that dialog; Retry creates a new attempt normally.

Background, logo, chalk ring, and marble renderer are reused. Cards, text, buttons, arrows, and the looping hand illustration are independent Cocos nodes. No reference screenshot is used as a UI. No new texture, shader, material, package, or external runtime dependency was introduced. The hand is a simple procedural illustration, not the polished glove artwork in the reference.

## Files

- `assets/scripts/GuliGame.ts`: tutorial entry/exit and input gates, contextual hint rendering, replay preservation, safe-area scaling and matching pointer conversion, failure actions.
- `assets/scripts/TutorialView.ts`: three-page presentation, arrows, labels, looping demonstration, navigation and dynamic counts.
- `assets/scripts/Tutorial.ts`: bounded three-page navigation; old exported practice helpers remain for compatibility but are not used by the new flow.
- `assets/scripts/GameHints.ts` and `.meta`: settled-result classification, idle timer, 12-second per-reason cooldown, six-second visibility and repeat tracking.
- `assets/scripts/GameModel.ts`: read-only last-shot report captured before rollback. Physics, shot cost, full-disc exit, rollback and win/loss rules are unchanged.
- `assets/scripts/TutorialVerification.ts`: updated opt-in Cocos integration checks.
- `assets/scripts/SlingshotVerification.ts`: existing input checks explicitly bypass first-run onboarding and restore the original completion flag.
- `tests/tutorial.cjs`: save compatibility, page navigation and result-feedback checks.

## Contextual feedback

Idle after ten seconds and wrong-target clicks point to the shooter. A valid grab clears old feedback. Result feedback is emitted only after existing settlement finishes: target-only exits, boundary contact, no effective knock-out, and successful knock-out are distinct. The target-only report retains the previous shooter position and labels it after rollback; it does not pretend that the newly spawned shooter is the failed one. When a result hint expires with two or fewer shots left, the shots HUD is emphasized. Repeated reasons offer View Hint. Exhausted shots show an explicit failure dialog with Retry and View Tutorial.

The existing rules allow a shooter-only exit to preserve target movements even if no target leaves. This remains valid movement but makes no objective progress, so the hint suggests adjusting direction and power. A target contributes to progress only when it fully exits and the shooter also fully exits. Tangency is not exit. Last-shot success retains priority over failure.

## Executed validation

- `npm test`: 16 model checks, 6 slingshot checks, 3 aim checks, 3 tutorial/hint checks, and 1 grouped music check passed.
- `npm run typecheck`: passed.
- Cocos preview `?guliTutorialTest=1`: 4 groups passed. Covered page navigation/swipe, no tutorial model mutations or cost, completion persistence call, first real launch, replay preserving model/physics identity and round state, wrong-click/idle hint clearing.
- Cocos preview `?guliSlingTest=1`: 4 groups passed. Covered synthetic touch, second finger, real Box2D settlement, one-shot cost, mouse, cancel, blur and background handling.
- Cocos Creator 3.8.8 web-mobile CLI build: completed successfully, exit 36 and Finished log.
- Actual built game manually inspected at browser viewports 320x568 and 430x932. Previous/next, horizontal drag navigation, dynamic HUD and clean initial play area were checked. Earlier preview was also inspected at 393x852.
- A real mouse drag after closing the tutorial launched the marble and reduced shots from 5 to 4.
- Model tests explicitly cover failed rollback restoring removed targets, one spent shot, full-disc/tangent boundary checks and last-shot victory.

## Screenshots

- `ftue-step1.png`, `ftue-step2.png`, `ftue-step3.png`: actual built tutorial pages.
- `ftue-320x568.png`: narrow-screen tutorial.
- `ftue-game-hint.png`: actual in-game idle feedback.

## Limits

No physical phone, Huawei RPK build, real device touch, notch device, or GPU performance measurements were run. Safe-area handling uses Cocos `sys.getSafeAreaRect` where the platform reports it, plus SHOW_ALL layout; platform reporting and browser chrome still need device QA. Graphics match the existing project's visual assets and palette, not the reference's exact illustration fidelity. The three-page help no longer requires a practice win to set `tuto`; this is intentional under the new requirements. Existing saved `tuto: true` values remain completed.

- Additional manual persistence check: completed the built tutorial, reloaded the page, and clicked Play; the normal level opened without onboarding. See ftue-returning-player.png.

## 2026-10-25 menu and level-specific teaching update

Play now opens the existing level selector. The standalone level selector button was removed from Home. Help is centered below skins and above sound. Auto-onboarding and contextual teaching run only in level 1. Later levels retain explicit Help, normal rolling/charging feedback, HUD, power and results, but remove instructional labels and use a shorter power panel raised within the existing slingshot clearance. No physics or shot rules changed.

Shooter, prior-position and boundary guidance outlines use segmented #808080 strokes, width 2 design pixels, with unchanged centers/radii and trigger timing. The actual chalk boundary is unchanged.

Validation: npm test (29 checks), typecheck, and Cocos tutorial verification (7 groups) passed. The added checks cover Home routing/order, levels 2–5 suppression and explicit replay, and dashed guide color/width/bounds. Manually clicked Play into the level selector, entered level 2, and triggered a level-1 wrong-target hint. Screenshots: menu-revised.png, level2-clean-ui.png, guide-gray-dashed.png. No physical-phone test was run.

## 2026-10-26 completed-level Home button

Completed-level results now add a centered 440x70 Home button at y=-275, using the same secondary style as Retry. Button centers are 94 design pixels apart. The completion panel extends downward (center y=-40, height 730); the save-status label is below all buttons at y=-352. Failure and pause panels remain unchanged. Home invokes existing navigation without modifying or writing save data.

Validation: typecheck and 29 Node checks passed. Eight Cocos integration groups passed, including completed-state UI fixtures for all five levels checking Home geometry, label placement, navigation, and unchanged awarded save data. The fixture intercepts persistence so it does not write test rewards to the user's save. Manually clicked the rendered Home button and confirmed the menu. Screenshot: result-home-button.png. No manual full-level playthrough or phone test was performed for this small UI change.
