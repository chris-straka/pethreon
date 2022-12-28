# Project Notes (should probably have named this PAIN.md)

These notes concern the overall structure of my pethreon project.

## I ran into the "it works on my machine!" problem 

I thought it was a meme, but I ran into this issue several times. I have a windows desktop and a mac laptop. Sometimes my project would work on windows but not mac, and when I fixed it for mac it would no longer work on windows 🤦‍♂️. After I got it working on both, I realized it didn't work at all on netlify or github actions. For this reason, I'm determined to use WSL for all my future non-containerized projects. 

## Does a monorepo make sense for this application?

Before the refactor, this project was a monorepo. I thought monorepos were great because they kept things independent in the ways that I liked (separate projects), and connected in the ways that I liked (same dependencies, import stuff between them). I'm still learning and figuring stuff out, but I think this was a bad idea. I didn't really need to link them together in the way that they typically are in a monorepo, and I ran into several complicated issues that I had difficulty in solving on my own. So I ended up switching the settings around so that it behaved more like a non-monorepo.

```
# put node_modules back in their own projects
nmHoistingLimits: "workspaces" 
```

The monorepo also made things much more complicated for deployment. I didn't want Netlify to install backend dependencies because it should only be concerned with the frontend, but that's sort of how monorepos work. I ended up using a more manual style of deployment, where I would build the project locally and then send the result to netlify.

## Typescript Issues

In the early stages of this project. I had a React app that used Jest and a backend that used truffle (Chai). There was a type conflict between the two, and I only figured out later how to solve it (typescript project references). I'm documenting the issue here so I remember.

```ts
// chai.ts
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...

// jest.ts
declare const expect: jest.Expect;         // this
```
