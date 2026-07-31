import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { NETWORKS } from '../utils'

export const shape = z.object({
  network: z.enum(NETWORKS).catch('mainnet'),
  reindex: z.boolean().catch(false),
  fullySynced: z.boolean().catch(false),
  torProxyAll: z.boolean().catch(false),
  torIsolation: z.boolean().catch(true),
  advertiseClearnetInbound: z.boolean().catch(false),
  // Written by versions before 2026.5.2:12 and cleared by its migration. A
  // file model preserves keys it was not told about, so these have to be named
  // to be removed — and two of them held RPC passwords in plaintext.
  rpcCredentials: z.undefined().optional().catch(undefined),
  rpcUser: z.undefined().optional().catch(undefined),
  rpcPassword: z.undefined().optional().catch(undefined),
  initialized: z.undefined().optional().catch(undefined),
  torEnabled: z.undefined().optional().catch(undefined),
})

export const storeJson = FileHelper.json(
  {
    base: sdk.volumes.main,
    subpath: '/store.json',
  },
  shape,
)
