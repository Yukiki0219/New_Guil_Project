# Huawei Quick Game login and RPK

## Configuration

- Cocos Creator: 3.8.8
- Build configuration: `config/huawei/build.json`
- Platform: `huawei-quick-game` (not Android APK)
- Package: `com.jianxiang.kaile.GuliGo`
- App ID: `119532045`
- Version: `1.0.0`, versionCode `1` (confirm against any existing AGC release before uploading)
- Minimum platform version: `1078`
- Portrait, fullscreen, release signing (`useDebugKey: false`)
- Signing files: project-root `certificate.pem` and `private.pem`; ignored by Git along with the existing JKS.
- Certificate SHA-256: `5E:99:F5:F9:44:3B:04:0D:F5:67:0A:6E:B8:97:CB:83:37:44:A8:01:8F:9E:D8:30:A7:21:E2:A2:4E:EF:68:78`
- Desktop icon currently reuses the supplied square GULI GO artwork, copied unchanged into `config/huawei/icon.png`.

## Behavior

Huawei builds attempt `qg.gameLoginWithReal` once at startup with `forceLogin: 0`. The top-left HMS button retries with `forceLogin: 1` only after a player click. Browser preview does not call the native API.

Guest gameplay remains available during login, cancellation, errors, missing API and timeout. No automatic retry or login modal interrupts gameplay. A successful nonempty player ID hides the button and local-save notice. Callbacks update only the account controls; they do not rebuild the board, dismiss result panels or mutate saves. Pending requests disable duplicate clicks; stale callbacks remain ignored.

Per the user's clarification, there is no upload feature. All progress remains in `guli.save.v2`. Authentication does not reset or migrate local records. A requested one-time local reset must target the actual browser/device storage, not change the startup defaults for every player.

Verification of this guest-mode revision: automated mock-runtime tests and TypeScript checks cover success, cancellation, failure, explicit retry, timeout and preservation of model/physics/save references. Huawei device tests and visual checks have not been run for this revision. The signed RPK was rebuilt with this revision on 2026-10-27; archive inspection confirmed the login API, App ID and matching signing certificate.

Huawei's account FAQ states that sign-in is required to play. This user-requested guest mode must not be presented as verified for AppGallery acceptance; platform-enforced identity verification may still restrict gameplay. Confirm the target region and applicable publication requirements before release.

## Verification actually run

- TypeScript check passed.
- Existing 31 checks plus 6 Huawei mock-runtime test groups passed. These cover cancellation, identity-verification cancellation, exceptions, timeouts, retry, duplicate/stale callbacks, destruction, English messages and controller callback isolation preserving saves/model/physics.
- Cocos CLI build completed on 2026-10-27 with exit code 36 and a successful make-stage log.
- Output: `build/huawei-quick-game/dist/GULI Go!.rpk`
- Size: 12,899,695 bytes (about 12.9 MB / 12.3 MiB).
- RPK SHA-256: `0cedb722f02bef26ce92e485fc688f8f692ec680153a801422690dc8e5376f0c`
- Inspected the archive: expected package, portrait orientation, minimum platform version and release version are present; bundled code includes App ID and login API.
- The provided certificate's DER is present in the RPK signing data; the source certificate and private key match. No `private.pem` or JKS is present among archive entries. This inspection does not replace Huawei runtime signature verification.
- Build emitted editor cache warnings and default compression/config migration warnings, but completed successfully.

## Remaining gates

1. AGC configuration is user-reported, not independently verified. Confirm both APIs and the certificate fingerprint for App ID 119532045.
2. No Huawei device login, installation, resume, or real-name verification test has been run. Transfer the RPK to a Huawei phone and open it in the official Quick App Loader using local installation. Test success, cancellation, offline retry, return to foreground, preserved progress and gameplay.
3. This is a local test artifact, not an upload-ready release. Its current size exceeds the 10 MB upload limit described in Cocos 3.8 documentation. Icon/resource optimization or remote resource packaging is still required before release. Do not remove existing gameplay assets merely to reduce size.
4. Confirm distribution region, publication icon requirements and versionCode before submission. No AppGallery upload has been performed.
5. Local-loader testing does not prove production mandatory identity-verification behavior. Huawei documents a difference between local testing and enabled production verification.

Sources:
- https://developer.huawei.com/consumer/cn/codelab/QuickGame/index.html?cardName=QuickGame&lang=cn
- https://docs.cocos.com/creator/3.8/manual/zh/editor/publish/publish-huawei-quick-game.html
- https://developer.huawei.com/consumer/es/doc/quickApp-Guides/quickgame-faq-account-0000002453354825
