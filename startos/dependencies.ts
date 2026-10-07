import { storeJson } from './fileModels/store.json'
import { torDescription } from './manifest/i18n'
import { sdk } from './sdk'

// Tor matters only as the SOCKS proxy peer traffic is sent through. The hub
// predates v3 onion addresses, so it is never needed for onion reachability.
const tor = sdk.Dependency.optional('tor', {
  description: torDescription,
  metadata: {
    title: 'Tor',
    icon: 'https://raw.githubusercontent.com/Start9Labs/tor-startos/65faea17febc739d910e8c26ff4e61f6333487a8/icon.svg',
  },
  versionRange: '>=0.4.9.11:4',
  kind: 'running',
  healthChecks: [],
  enabled: async ({ effects }) =>
    (await storeJson.read((s) => s.torProxyAll).const(effects)) === true,
})

export const dependencies = sdk.Dependencies.of().addDependency(tor)
