# ![RealWorld Example App](logo.png)

> ### React + Recoil codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://react-recoil-realworld.vercel.app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with **React + Recoil** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **React** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Features

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU- users (sign up & settings page - no deleting required)
- CRUD Articles
- CR-D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

# Routing Guidelines

- Home page (URL: / )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /login, /register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /settings )
  - Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
- Article page (URL: /article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /profile/:username, /profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

# Getting started

- Move to the folder where you want to clone this repo and run these commands in order.
  - ```git clone https://github.com/LeeHyoGeun-create/react-recoil-realworld-example-app.git```
  - ```yarn install```
  - ```yarn start```

[![Brought to you by Thinkster](end.png)](https://thinkster.io)

```
react-recoil-realworld-example-app
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ ORIG_HEAD
│  ├─ branches
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 09
│  │  │  └─ 8a2a8663bac7cdecbbedf64e9fe87d097e1736
│  │  ├─ 11
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 22
│  │  │  └─ 719e1f4dcec27030c476a38878ccf3c25e5b92
│  │  ├─ 2c
│  │  │  └─ 3fac689c7c4680cfb84bc0746512858b90b908
│  │  ├─ 3c
│  │  │  └─ 9f7cfb6e7f63e3491076017b3738ed11de7989
│  │  ├─ 3d
│  │  │  └─ 0a51a86e202419758206adb6effe775229ba38
│  │  ├─ 50
│  │  │  └─ b16f7145b7de3e44166d67a939cfb74984f1b5
│  │  ├─ 53
│  │  │  └─ d2db6a3b4290ee2257f3cd810d0ca8388a01fc
│  │  ├─ 55
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 58
│  │  │  └─ 5f71494dbd708cc77b8e5f3089f42fc59c6b5e
│  │  ├─ 5a
│  │  │  └─ 33944a9b41b59a9cf06ee4bb5586c77510f06b
│  │  ├─ 6c
│  │  │  ├─ 58747283d75a434dcb8e7c5a38eaef29b7fada
│  │  │  └─ 87de9bb3358469122cc991d5cf578927246184
│  │  ├─ 75
│  │  │  └─ bcc08b6b91878f8d997c8db090bfa4804ea605
│  │  ├─ 77
│  │  │  └─ 6eaa027ab01e9770d454fff29b0eba226be617
│  │  ├─ 79
│  │  │  └─ 1f139e242c70933e036ead54c9c25de43caf82
│  │  ├─ 7b
│  │  │  └─ 5939e2c0d830ca9eb38d92cda8ec66d41c7281
│  │  ├─ 89
│  │  │  └─ e5d4863b9bace633b0068be3ef804fc8626e07
│  │  ├─ 8c
│  │  │  ├─ 679ef4136abff8cafabf1aa6c62c39b9d985da
│  │  │  └─ e4d408416accb4359a698032f312e002df56a4
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 9c
│  │  │  └─ 60155e0a7c93d63de0184639c9d13b9f2ea814
│  │  ├─ 9d
│  │  │  └─ 31e2aed93c876bc048cf2f863cb2a847c901e8
│  │  ├─ a2
│  │  │  └─ 0f4d069a2a42e5ce0c5613de77d77c5fbafda3
│  │  ├─ a5
│  │  │  └─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ c1
│  │  │  └─ 5923b5d4bd0671a3d65057bb1cbe6971fff7ac
│  │  ├─ c6
│  │  │  └─ 6239c72eb3080a5ce061c209890e4008ff9dda
│  │  ├─ cd
│  │  │  └─ d7a44f1d2255defa298a8026afd7ef03ec90e0
│  │  ├─ df
│  │  │  └─ d45ef10bdb7dbba7a12606af077517792393fc
│  │  ├─ e0
│  │  │  └─ d1c840806ee7f517c3d9774be4bcf9c4e889db
│  │  ├─ e7
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ ee
│  │  │  ├─ a6bccfa5558ca46c9b141501bd2f837e9dbceb
│  │  │  └─ e6c8aeaee663aa19385660a9d9a20435110983
│  │  ├─ f3
│  │  │  └─ e49c6d5dbb851a14d8c2925859791b28fd185c
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-02adc84cfd019b96758a9bca822a821c2a3552f9.idx
│  │     └─ pack-02adc84cfd019b96758a9bca822a821c2a3552f9.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ feature
│     │  │  └─ setting
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     ├─ stash
│     └─ tags
├─ .github
│  ├─ ISSUE_TEMPLATE
│  │  └─ feature_request.md
│  └─ PULL_REQUEST_TEMPLATE.md
├─ .gitignore
├─ .prettierrc.json
├─ CODE_OF_CONDUCT.md
├─ LICENSE
├─ README.md
├─ favicon.ico
├─ index.html
├─ logo.png
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Article
│  │  │  └─ ArticlePage.tsx
│  │  ├─ Create
│  │  │  └─ CreatePage.tsx
│  │  ├─ EditPage.tsx
│  │  ├─ ErrorPage.tsx
│  │  ├─ FavoritesPage.tsx
│  │  ├─ HomePage.tsx
│  │  ├─ ProfilePage.tsx
│  │  ├─ SettingsPage.tsx
│  │  ├─ SignInPage.tsx
│  │  └─ SignUpPage.tsx
│  ├─ routes
│  │  ├─ Root.tsx
│  │  └─ route.tsx
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```