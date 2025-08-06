# Arctic This Week (Android adn IoS News Reader)

A mobile news reader built with **React Native**

> Currently a Work In Progress (WIP)

---

## Installation

Make sure you've completed the [React Native environment setup](https://reactnative.dev/docs/environment-setup) first.

```bash
git clone https://github.com/winfredselwyn/Arctic_This_Week.git your_folder
cd your_folder
yarn install
```

---

## Running the App

### Start the Metro Bundler

```bash
yarn start
```

> Keep this terminal open

### Launch on Android

In a new terminal window:

```bash
yarn android
```

### Launch on iOS

```bash
yarn ios
```

> You must have Xcode + CocoaPods properly configured

## Code

### Structure

```
src/
├── actions/        # Redux actions for async logic
├── assets/         # Static assets (icons, fonts)
├── components/     # Shared UI components
├── data/           # Static content (e.g., about, contact info)
├── hooks/          # Custom hooks (e.g. useAppTheme)
├── images/         # Local image assets
├── navigator/      # Navigation configuration (MainNavigator, stacks)
├── reducers/       # Redux slices (theme, text size, news)
├── store/          # Redux store setup
├── styles/         # Shared styles and theme system
├── types/          # TypeScript types/interfaces
├── utils/          # Utility functions/helpers
├── views/          # Screens like Home, ArticleDetail, Settings
```

### 🧠 Entry Point

`App.tsx` sets up:

- Redux provider
- Paper and navigation theming
- Navigation container
- Initial boot logic

---

### 🌐 Environment Variables

Configured via `.env`:

```env
COCKPIT_TOKEN=
COCKPIT_API_URL=
COCKPIT_BASE_URL=
MAJOR_VERSION=
MINOR_VERSION=
PATCH_VERSION=
```

These are injected using `react-native-config` to manage app versioning and backend access (e.g., Cockpit CMS).

---

### Navigation

- The main navigator is defined in `navigator/MainNavigator.tsx`
- Tabs:
  - `Podcast`: External SoundCloud link
  - `Home`: News list + detail
  - `Settings`: App config + info

- Stack navigators (`HomeNavigator`, `SettingsNavigator`) are separated for clarity

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b my-feature`
3. Commit: `git commit -am "feat: add X"`
4. Push: `git push origin my-feature`
5. Open a pull request

---

## Learn More

- [React Native Docs](https://reactnative.dev)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Metro Bundler](https://facebook.github.io/metro/)

---

## License

MIT © Arctic Institute / Contributors

---
