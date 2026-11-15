# Chinese / English UI

Implemented on 2026-10-26 for Cocos Creator 3.8.8.

- `Localization.ts`: Chinese source-string dictionary, explicit dynamic templates, all 56 marble names and five rarities. English plurals use the actual count. IDs and game data remain unchanged.
- `LanguageSwitch.ts`: cream/gold track, teal thumb, fixed 中文 / English labels. Click either half or drag; release snaps with smoothing. One pointer owns a gesture; cancel restores the saved side. Mouse listeners are removed on destruction.
- `GuliGame.ts`: translated label binding and direct HUD updates. The main-menu switch sits at the top right, scaled to 65% of its original size. Switching updates existing labels without rebuilding or resetting the game. Sound button widened for English.
- `TutorialView.ts`: uses the same translator for all three pages and dynamic counts.
- `GameModel.ts`: adds `language` to the existing v2 save. Missing or invalid values default to `zh`; `en` survives cleanSave and award. No storage reset or new storage key.
- `LanguageVerification.ts`, `tests/localization.cjs`, `package.json`: preview regression harness and normal test coverage.

## Executed verification

- `npm run typecheck`: passed.
- `npm test`: 31 checks passed, including the 29 existing checks and two localization groups.
- Cocos preview `?guliLanguageTest=1`: 5/5 groups passed. Mouse clicks, snap endpoints, synthetic Cocos touch drags, cancellation, second-pointer protection, player-state preservation, all menus, six collection pages, all five level HUDs, all hint reasons, pause/leave/win/loss panels, three tutorial pages, save serialization and award preservation.
- Cocos preview `?guliTutorialTest=1`: 8/8 groups passed, including level-1-only automatic hints, tutorial isolation, shot count rules and completion Home navigation.
- Real browser input: dragged right to English, refreshed and observed English retained; dragged left to Chinese; clicked English and entered Level Select and Level 2. Existing collection count remained unchanged.
- Visually inspected 360×640 main menu, level selector and Level 2 HUD, plus all three English tutorial pages at 390×844. No observed clipping or overlap. Later-level instructional hints remained absent.

Screenshots: `language-menu-zh.png`, `language-menu-en.png`, `language-tutorial-en.png`, `language-game-en.png`.

## Limits

No native mobile device test or new release build was run. Touch verification used Cocos touch events in the editor preview. Translation tests scan active text; visual inspection covered the screens and sizes above, not every possible device or every saved game state. Original main-menu collection denominator remains unchanged by this localization task.

New UI copy should receive a dictionary entry or dynamic template in `Localization.ts`. Continue using `setText` for changing main-game labels so live language updates retain their source text.

