import { T } from '@start9labs/start-sdk'
import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import {
  GetBlockchainInfo,
  GetNetworkInfo,
  hubCliArgs,
  mainMounts,
} from '../utils'

export const runtimeInfo = sdk.Action.withoutInput(
  'runtime-info',

  async () => ({
    name: i18n('Node Info'),
    description: i18n(
      'Show the running node: version, chain, peer count and sync progress',
    ),
    warning: null,
    allowedStatuses: 'only-running',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const cli = hubCliArgs(
      (await storeJson.read((s) => s.network).once()) ?? 'mainnet',
    )

    return sdk.SubContainer.withTemp(
      effects,
      { imageId: 'flowee' },
      mainMounts,
      'runtime-info',
      async (sub) => {
        const call = async <T>(method: string): Promise<T | null> => {
          const res = await sub.exec([...cli, method])
          if (res.exitCode !== 0) return null
          try {
            return JSON.parse(res.stdout.toString())
          } catch {
            return null
          }
        }

        const [net, chain] = await Promise.all([
          call<GetNetworkInfo>('getnetworkinfo'),
          call<GetBlockchainInfo>('getblockchaininfo'),
        ])

        const single = (
          name: string,
          value: string,
          description: string | null = null,
        ): T.ActionResultMember => ({
          type: 'single',
          name,
          description,
          value,
        })

        const value = [
          ...(net
            ? [
                single(i18n('Version'), net.subversion),
                single(i18n('Peers'), String(net.connections)),
              ]
            : []),
          ...(chain
            ? [
                single(i18n('Chain'), chain.chain),
                single(
                  i18n('Blocks'),
                  `${chain.blocks} / ${chain.headers}`,
                  i18n(
                    'Blocks the node has verified, out of the block headers it has received',
                  ),
                ),
                single(
                  i18n('Sync'),
                  `${(chain.verificationprogress * 100).toFixed(2)}%`,
                  i18n(
                    "The node's estimate of how much of the chain it has verified",
                  ),
                ),
              ]
            : []),
        ]

        return {
          version: '1',
          title: i18n('Node Info'),
          message: value.length
            ? null
            : i18n('The node is not answering RPC calls yet.'),
          result: value.length ? { type: 'group', value } : null,
        }
      },
    )
  },
)
