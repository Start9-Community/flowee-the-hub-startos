import { actions } from '../actions'
import { restoreInit } from '../backups'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { sdk } from '../sdk'
import { versionGraph } from '../versions'
import { publishRpc } from './publishRpc'
import { seedFiles } from './seedFiles'
import { watchHosts } from './watchHosts'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  publishRpc,
  setInterfaces,
  actions,
  dependencies,
  watchHosts,
)

export const uninit = sdk.setupUninit(versionGraph)
