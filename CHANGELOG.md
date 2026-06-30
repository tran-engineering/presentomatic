## [2.26.2](https://github.com/tran-engineering/presentomatic/compare/v2.26.1...v2.26.2) (2026-06-30)


### Bug Fixes

* harden smoke-test-install.mjs against slow CI startup ([7bc4ff7](https://github.com/tran-engineering/presentomatic/commit/7bc4ff7f6f4fc484c807b5b183cc5f9212d5fc54))
* pin vite/vite-plugin-svelte below v8 to fix broken global installs ([7b1b4db](https://github.com/tran-engineering/presentomatic/commit/7b1b4dbf0d270f2f8e6c8e92e26a605065bdd7f2)), closes [vitejs/rolldown-vite#304](https://github.com/vitejs/rolldown-vite/issues/304)
* raise smoke-test-install.mjs ready-banner timeout to 180s ([8ea48ab](https://github.com/tran-engineering/presentomatic/commit/8ea48ab60fa55a895bd45a33c97a22c0ecce16d2))
* stream smoke-test-install.mjs output live and poll HTTP instead of log text ([5c0a7d8](https://github.com/tran-engineering/presentomatic/commit/5c0a7d857f0c76f72d01d1f9f818ee9d72868ae2))

## [2.26.1](https://github.com/tran-engineering/presentomatic/compare/v2.26.0...v2.26.1) (2026-06-30)


### Bug Fixes

* restore mermaid rendering by allowing Vite to auto-detect CJS deps ([5563cbf](https://github.com/tran-engineering/presentomatic/commit/5563cbfb73695a73abd8f23607b33aaaf53a9d4f))

# [2.26.0](https://github.com/tran-engineering/presentomatic/compare/v2.25.0...v2.26.0) (2026-06-03)


### Features

* print GitHub Pages settings link after setup-github-workflow ([ff73ac8](https://github.com/tran-engineering/presentomatic/commit/ff73ac8f822fff2629ebb8708651554f9a40d248))

# [2.25.0](https://github.com/tran-engineering/presentomatic/compare/v2.24.8...v2.25.0) (2026-06-03)


### Features

* add setup-github-workflow command and fix manualChunks for Vite 8 ([1cbed13](https://github.com/tran-engineering/presentomatic/commit/1cbed13c31dcea9439fa03971c1b538d4b01a6d8))

## [2.24.8](https://github.com/tran-engineering/presentomatic/compare/v2.24.7...v2.24.8) (2026-06-03)


### Bug Fixes

* suppress Vite v8 dep scan error when installed from registry ([489ce8d](https://github.com/tran-engineering/presentomatic/commit/489ce8d0df8a61d012b99416cc43d925d4996798))

## [2.24.7](https://github.com/tran-engineering/presentomatic/compare/v2.24.6...v2.24.7) (2026-06-01)


### Bug Fixes

* **deps:** update dependency commander to v15 ([#85](https://github.com/tran-engineering/presentomatic/issues/85)) ([14f6007](https://github.com/tran-engineering/presentomatic/commit/14f6007a96b89ef8173e86b23a43e2aab0f5f8e1))

## [2.24.6](https://github.com/tran-engineering/presentomatic/compare/v2.24.5...v2.24.6) (2026-05-18)


### Bug Fixes

* **deps:** update dependency puppeteer to v25 ([#81](https://github.com/tran-engineering/presentomatic/issues/81)) ([14c6740](https://github.com/tran-engineering/presentomatic/commit/14c67400ac1e9126cd8a8bcc262caa98ddc564b9))

## [2.24.5](https://github.com/tran-engineering/presentomatic/compare/v2.24.4...v2.24.5) (2026-04-13)


### Bug Fixes

* **deps:** update dependency marked to v18 ([#72](https://github.com/tran-engineering/presentomatic/issues/72)) ([d141dcd](https://github.com/tran-engineering/presentomatic/commit/d141dcdbdad8f7ae7bfa3dabc7dbee07a5398055))

## [2.24.4](https://github.com/tran-engineering/presentomatic/compare/v2.24.3...v2.24.4) (2026-04-06)


### Bug Fixes

* **deps:** update dependency typescript to v6 ([#69](https://github.com/tran-engineering/presentomatic/issues/69)) ([a07cd0c](https://github.com/tran-engineering/presentomatic/commit/a07cd0cf60e043375e60659069dddc0e179b47e2))

## [2.24.3](https://github.com/tran-engineering/presentomatic/compare/v2.24.2...v2.24.3) (2026-03-16)


### Bug Fixes

* **deps:** update dependency vite to v8 ([#64](https://github.com/tran-engineering/presentomatic/issues/64)) ([0d07334](https://github.com/tran-engineering/presentomatic/commit/0d07334c16df30ded368f746b662b7939eb83135))
* regenerate lockfile with all-platform optional deps for npm ci compat ([fbb821a](https://github.com/tran-engineering/presentomatic/commit/fbb821a0038af9e6bd5a59aa8eb9fee7b009b2db))

## [2.24.2](https://github.com/tran-engineering/presentomatic/compare/v2.24.1...v2.24.2) (2026-03-09)


### Bug Fixes

* prevent section from exceeding available flex width ([df959c1](https://github.com/tran-engineering/presentomatic/commit/df959c132ea0bd56854c0c2167374c85a795183f))

## [2.24.1](https://github.com/tran-engineering/presentomatic/compare/v2.24.0...v2.24.1) (2026-03-02)


### Bug Fixes

* layouting problems with columns ([f5d99be](https://github.com/tran-engineering/presentomatic/commit/f5d99beddd8902ae7ba133f6ec8239ccb169bfbb))
* zoom and pan for mermaid overlay ([6a94232](https://github.com/tran-engineering/presentomatic/commit/6a942323fda4287c7cf5bb589d102c503495a98e))

# [2.24.0](https://github.com/tran-engineering/presentomatic/compare/v2.23.0...v2.24.0) (2026-03-01)


### Features

* Add support for columns ([238ec36](https://github.com/tran-engineering/presentomatic/commit/238ec36b8fd0153d1b1f56a155497358ab9ddef2))

# [2.23.0](https://github.com/tran-engineering/presentomatic/compare/v2.22.0...v2.23.0) (2026-02-25)


### Features

* add fullscreen mermaid diagram overlay with pan/zoom ([a8990c3](https://github.com/tran-engineering/presentomatic/commit/a8990c3e17e0d3981822a6194c34a0092cfdee27))

# [2.22.0](https://github.com/tran-engineering/presentomatic/compare/v2.21.1...v2.22.0) (2026-02-25)


### Features

* add Prettier and EditorConfig for consistent code formatting ([e2bf889](https://github.com/tran-engineering/presentomatic/commit/e2bf889141646354e727717993304a283fbc4d8b))
* convert mermaid code blocks to <pre mermaid> tags before parsing ([5c3f96f](https://github.com/tran-engineering/presentomatic/commit/5c3f96fe41a3c8cee36fddce6ad9b0490c92f5e3))

## [2.21.1](https://github.com/tran-engineering/presentomatic/compare/v2.21.0...v2.21.1) (2026-02-19)

### Bug Fixes

- **renovate:** schedule weekly updates and trigger patch releases ([ee74e40](https://github.com/tran-engineering/presentomatic/commit/ee74e400d02c6bf3c5caa1544dab19cb4a1e7079))
