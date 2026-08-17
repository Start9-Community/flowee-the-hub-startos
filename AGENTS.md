# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **The `indexer` binary parses its arguments with Qt, the Hub with Bitcoin's own parser.** Qt reads `-datadir=/data` as the short option `-d` carrying the value `atadir=/data`, and then indexes into that relative path — outside the volume, so the index is silently lost on every restart. The indexer needs `--datadir=`; the Hub needs `-datadir=`. Do not "normalize" them. The indexer also has no notion of networks, so it is pointed at the Hub's directory for the active one rather than replaying every chain into one index.
- **The Hub predates v3 onion addresses.** `CNetAddr::SetSpecial` accepts only the 16-character v2 form, and a v3 address in `externalip` fails `IsValid()`, which aborts startup. Never write an onion address into the config, and do not offer `onlynet=onion` — Tor is usable here only as an outbound SOCKS proxy.
- **Credentials are `rpcauth` entries, never `rpcuser`/`rpcpassword`.** Leaving the password unset is what makes the Hub write `.cookie`, which is how the package's own `hub-cli` calls authenticate. Writing a plaintext password would break that and cap the node at one credential.
- **`create-dependent-credential` is a dependent-facing API.** Because the Hub stores only a hash and can never hand a password back, dependents (bch-asicseer, bch-elopool, bch-explorer) mint their own and call this action to register it. Keep its id and input shape stable, and never build a flow that expects to read a password out of the Hub.
- **`hub-cli` needs the network flag.** It is what tells the CLI which subdirectory holds the auth cookie, so leaving it off makes every call fail authorization on anything but mainnet.
- **Node ports are pinned to the mainnet pair on every network.** Only one network runs per container, so nothing has to be repointed after a switch and the bindings never churn.
- **`sigtermTimeout: 300_000` on the node is deliberate** — a chainstate flush can take minutes, and cutting it short corrupts the database.
- **The indexer's health check parses its log because that is its only output.** It logs the height it resumed from on connecting to the Hub, then each block it replays; there is no RPC to ask.
