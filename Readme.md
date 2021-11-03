# Node Stream

Here is a backend application to make video streaming for the videos in your computer created with the MERN stack with typescript.
![mern-stack](https://daniel-carrete.vercel.app/images/utils/mern_stack.jpg)

This app also has the optional use of a database, you decide if you want to use it or not.

## Table of Contents

1. [Introduction](#Introduction)
2. [Technical details](#technical-details)
3. [Run step by step](#run-step-by-step)

## Introduction (you can skip this )

This project is inspired by this article that explains how to make streaming of video like youtube with node js,
[link_to_the_article](https://www.linode.com/docs/guides/build-react-video-streaming-app/).

If you see the article that explains the fundamentals to make streaming with node, so I decided to take it 1 step more away, adding a frontend made with react and the backend with node, the frontend only consumes the API of the backend and make some little things, for example, use react-router-dom to create a single page app, you can see a description with more detail in the repo of the frontend [here](https://github.com/SL0W-HAND/react-video-streaming), the backend is written in typescript, so it needed to be compiled to javascript, and here is the full compiled version ready to use, also you can see de details in the [repository](https://github.com/SL0W-HAND/stream-express).

The entrance of the app is the login page in which we need to put the password that we set on the back-end.
![login-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_login.png)

Next, we can see is the home page with the videos provided for the back-end.
![home-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_home2.png)

As well the page of player
![player-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_player.png)

404
![404-picture](https://daniel-carrete.vercel.app/images/projects_images/node_stream/node_stream_404.png)

## Technical details

Let me explain to you some features, this is the repo only for production, there have 2 sub repositories one for the frontend and another for the backend, or you can go to the GitHub page to see each of them.

The production folder has already if you don't want to compile anything, there is the compile version of the react app in the folder `/build` inside `/production`, and all the other things are the compiled of the typescript code to javascript.

# !!important

This repository has the option of using one database with mongo, which is optional, you can use this repo without any database, all depends on the branch on you are, the branch main works without a database, and the branch mongo mandatory need a database MongoDB.

```
- main =>  don't need a database, recommended for little quantity of videos
- mongodb => needs to enable the database MongoDB
```

In this repository, you can see the folder production, which is the all-in-one in which you only need to run the scripts inside the production folder.

## Run step by step

The folder production can be considered the root for running the next scripts

- Nodejs installed

- Install ffmpeg

- In the production folder install all the dependencies with `npm install`

- Create the .env file

- Enable the database(only for the branch mongo)

- If you are on the branch of mongo you need to run the script `npm run seedData` before all

- Run `npm run start` comand
