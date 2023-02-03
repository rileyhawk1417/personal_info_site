---
title: "Rust on Android"
date: "Feb 03 2023"
description: "Rust on android with AppFlowy"
tags:
  - Rust
  - Android
  - AppFlowy
  - OSS
cover_image: "https://raw.githubusercontent.com/rochacbruno/rust_memes/master/img/ferris_hand_up.jpg"
layout: ../../layouts/BlogPost.astro
---

##### Image credits rochacbruno

# Bridging Rust & Android in AppFlowy

Getting Rust running on android is exciting, just means you can build one backend for desktop and cross compile.
Though getting rust to work on android needs abit of elbow grease.
To get started we will need some ingredients.

## Ingredients

- Android NDK preferrably the latest LTS release if not v24r.
- cargo-ndk, is a rust tool that helps us compile the rust backend.
- You will also need some coffee, compile time can take a while ;)


### Notes

- First off if you are not using openssl in your project, it should compile without issues.
- If you are using openssl there's a specific feature that you need to enable in the package.

## How it was done

- We need to extract the NDK, then need to make it visible on the PATH, for cargo-ndk to work.
- cargo-ndk uses the NDK package you would have downloaded, to cross compile rust code to android.
  - cargo-ndk is like cargo, it's run using ``cargo ndk --target``.
- Trying to compile the backend for android wasn't easy at first. You could meet errors saying "can't find openssl".
- The problem is the rust package ``openssl``, since we were compiling for android it can't find the right library for it.
  - The package itself has no problems when compiling for desktop though. So why did it fail for android?
  The answer is because the desktop libraries for openssl are not the same for mobile libraries , hence why it failed to find openssl.
  - The solution to this problem was within the ``Cargo.toml`` file that had openssl as a dependancy.
  ```toml
  [dependancies]
  openssl = {version = "0.10.38", features=["vendored"]}
  ```
  - Adding the vendored featured allows it to cross compile the rust backend using the local libraries on the machine.
  Without the need of compiling the libraries seperately.
- From there you just need to run ``cargo ndk -t ${target_device} build --release``
  - List of targets available:
    - arm64-v8a
    - armeabi-v7a
    - x86
    - x86_64
- After compiling you just have to copy the file to the destination, that would be in the android folder
  - ``android/app/src/main/jniLibs/{target_device}``

## Summary

This blog might have been short & technical but it was just a summary of what I encountered while working on it. <br/>
The blog will also serve as a place to remind myself in case I do forget what & how I did it xD
