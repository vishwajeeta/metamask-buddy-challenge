"use client"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import {mainnet,polygon,anvil,zksync} from "wagmi/chains"
export default getDefaultConfig({
    appName:"metamaskTest",
    projectId:'73a853602c168322b88d4bc3369f7bcf',
    chains:[mainnet,polygon,anvil,zksync],
    ssr:false

})