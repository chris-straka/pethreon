import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("Pethreon_Build_Module", (m) => {
  // How frequently should payments be made?
  // 60s * 60mins * 24hours
  const dailyPayments = 60 * 60 * 24
  const pethreon = m.contract("Pethreon", [dailyPayments])

  console.log(`Pethreon deployed: ${pethreon}`)

  return { pethreon }
})
