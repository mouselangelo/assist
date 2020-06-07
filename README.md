# Assist 🗣

A tool to create & manage [audio descriptions](https://en.wikipedia.org/wiki/Audio_description).

- 🚀 Experimenting with using react everywhere.
- 💻 The main focus is on the desktop / electron app.

## Background 🐣

> Audio description, also referred to as a video description, described video, or more precisely called a visual description, is a form of narration used to provide information surrounding key visual elements in a media work (such as a film or television program, or theatrical performance) for the benefit of blind and visually impaired consumers. [source: [wikipedia](https://en.wikipedia.org/wiki/Audio_description)]

When talking to a friend who writes audio descriptions here in Berlin, I often heard mention of the lack of tools (at least inexpensive / open source ones) that could help with their work.

Currently, everything is done manually:

- Write dialogs from the speech in the video with matching timestamps (subtitles?).
- Find "gaps" between the speech, where descriptions could be inserted, measure the duration.
- Write description matching these _gaps'_ scene and durartion, annotate whether the speaker mush speak it at a normal, fast, or super-fast pace etc.
- Rewind / Forward videos manually each time to listen to / watch a specific part of the transcript.

There seem quite a few opportunities here to solve problems using technology! Hence this project was born.

## Planned features 🦄

- Playback video with controls and keyboard shortcuts to match various requirements of the writers.
- Automate speech recognition and speaker identification via technologies such as [AWS Transcribe](https://aws.amazon.com/transcribe/)
- Display transcription in editable and interactive UI, where each word in the transcription is linked to the position in the video and vice versa. Example: Check the **Transcript** tab of this [wwdc video](https://developer.apple.com/videos/play/wwdc2019/238/?time=108) - clicking the text jumps to the related video position.

## Setup 🤷

### Development environment 👨‍💻👩‍💻

You will need to install the following. Versions don't need to match exactly, using higher version **_should_** be fine.

- [node.js](https://nodejs.org/en/download/) - Needed to setup and run JavaScript

Verify:

```bash
> node -v
v10.20.1
```

- [ffmpeg](https://ffmpeg.org): A powerful library for editing videos from the command line!

Verify:

```bash
> ffmpeg -version
ffmpeg version 4.2.3
```

- [yarn](https://yarnpkg.com) package manager for node ([installed globally](https://yarnpkg.com/getting-started/install#global-install))

Install via node:

```bash
npm install -g yarn
```

Verify:

```bash
> yarn -v
1.22.4
```

> The project is currently being developed on MacOS and there might be issues running it in other environments. Feel free to [add an Issue] or create a [Pull Request]! 😀

### Download & Install Project 🛠

- Clone this repo

```bash
git clone git@github.com:mouselangelo/assist.git

```

- Install project dependencies

```bash
yarn install
```

### Run 🎉

> Currently only the electron app works - the others build and run but functionality maybe stubbed.

```bash
# desktop / electron app
yarn expo-electron start

#### others ( WIP, not all features implemented)

# web app
yarn web

# ios
yarn ios

# android (connect device or start emulator first)
yarn android

# interactive interface:
yarn start

```

## Code 🎯

- [typescript](https://www.typescriptlang.org) - is the JavaScript "flavour" of choice 🍦
- [eslint](https://eslint.org) / [prettier](https://prettier.io) - let's keep things pretty 💄
- testing ([jest?](https://jestjs.io)) - currently non-existent, hopefully coming soon! 💣
- [redux](https://redux.js.org) - also coming soon 🎛

## React (Native) Everywhere 🤹‍♂️

We are building an electron desktop app using react-native (via react-native-web)! 🙊

Yeah, it's kind of experimental - so expect things to not work at times. However, there is awesome work already done by the amazing React and JS community! 🙏

So, it's been a fun adventure, and so far - it works! 🏄‍♂️

Here are some of the awesome frameworks / libraries this is built upon:

Core:

- [expo](https://expo.io) / [react-native](https://reactnative.dev)
- [react-native-web](https://github.com/necolas/react-native-web) 🖤
- [electron](https://www.electronjs.org)
- [react-native-paper](https://reactnativepaper.com)

Also:

- [react-navigation](https://reactnavigation.org)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## Contributing

I'm still figuring out where this project is going, but if you are interested in contributing, just do it! [Add an Issue] or make a [Pull Request]!

[add an issue]: https://github.com/mouselangelo/assist/issues/new
[pull request]: https://github.com/mouselangelo/assist/compare
