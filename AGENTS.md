# AGENTS.md

## Project Context
- **Platform:** iOS (iPhone/iPad)
- **Languages:** Swift 5+ (App), HTML/CSS (Privacy Policy)
- **Frameworks:** SwiftUI (Primary), UIKit (Legacy/Complex implementations)
- **Architecture:** MVVM (Model-View-ViewModel)

## Code Style: iOS (Swift)
- **SwiftUI:**
  - Use `@StateObject` for owning ViewModels and `@ObservedObject` for dependencies.
  - Prefer small, reusable Views over massive `body` properties.
  - Use `VStack`, `HStack`, and `ZStack` for layout; avoid `GeometryReader` unless absolutely necessary.
- **UIKit:**
  - **CRITICAL:** Use programmatic UI (Auto Layout with Anchors or SnapKit). Do NOT suggest Storyboards or XIBs (they are hard to diff and edit).
  - Use `final class` for ViewControllers to optimize dispatch.
  - When bridging to SwiftUI, use `UIViewRepresentable` strictly.
- **General Swift:**
  - specificy `private` or `fileprivate` access control where possible.
  - Force unwrap (`!`) is strictly forbidden. Use `guard let` or `if let`.

## Code Style: Privacy Policy (Static Web)
- **Location:** `/docs/privacy.html` (or wherever you host it)
- **Tech:** Pure HTML5 and inline CSS.
- **Constraints:**
  - Do NOT use Javascript frameworks (no React, Vue, etc.).
  - Ensure the page is mobile-responsive (use `<meta name="viewport">`).
  - Keep styling clean and readable (black text, white background, readable font size).

## Documentation & Assets
- **Assets:** System SF Symbols are preferred over custom PNGs/SVGs for icons.
- **Comments:** Use `///` for documentation comments on public functions.

## Common Tasks
- **Build:** Standard Xcode Build (`Cmd+B`)
- **Privacy Updates:** If updating the privacy policy, ensure the "Last Updated" date at the top of the HTML file is modified.
