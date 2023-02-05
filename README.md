# blabla.page 
Is experimental general purpose web client for nostr protocol (https://www.nostr.how/).

- It aims to implement all the features of the protocol, and be a good example of how to use the protocol.
- It should be easily extensible and customizable (themes, colors) and deployable by anyone just by cloning the repository and building the code.

It runs purely in the browser and only requires a connection to atleast one nostr relay node.

Goal is that any community should be able to customize configuration object and deploy it on their own domain. 
There is also public http://blabla.page/ instance available.

## Technical details
https://pnpm.io/ is used as a package manager

```shell
npm -g install pnpm
```

```shell
pnpm install
pnpm run dev
pnpm run build
pnpm run start
```

It is built using:
- Typescript
- React
- Nextjs
- Tailwindcss
  - DaisyUI (https://daisyui.com/)
- In browser Sqlite for caching 
  - Sqlite and SQL.js https://sqlite.org/wasm/doc/tip/about.md - https://github.com/sql-js/sql.js/
- State management: Zustand (https://github.com/pmndrs/zustand)
- NostrRelay: Nostr-Relay-Pool (https://github.com/adamritter/nostr-relaypool-ts) 
- Nostr-tools (https://github.com/nbd-wtf/nostr-tools)
- ReactQuery https://tanstack.com/query/latest/
- TypeOrm (https://typeorm.io/)


Suggestions and contributions are welcome. Feel free to open issues and pull requests.
