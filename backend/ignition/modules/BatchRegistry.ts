import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BatchRegistryModule = buildModule("BatchRegistry", (m) => {
  const registry = m.contract("BatchAnchor");
  return { registry };
});

export default BatchRegistryModule;