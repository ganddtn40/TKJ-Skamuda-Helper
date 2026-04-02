export interface SubnetResult {
  networkId: string;
  broadcast: string;
  netmask: string;
  firstHost: string;
  lastHost: string;
  totalHost: number;
}

export const calculateSubnet = (ip: string, prefix: number): SubnetResult | null => {
  const ipParts = ip.split('.').map(Number);
  if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255) || prefix < 0 || prefix > 32) {
    return null;
  }

  const mask = (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const ipNum = (ipParts[0] << 24 | ipParts[1] << 16 | ipParts[2] << 8 | ipParts[3]) >>> 0;

  const networkIdNum = (ipNum & mask) >>> 0;
  const broadcastNum = (networkIdNum | ~mask) >>> 0;

  const numToIp = (num: number) => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };

  const networkId = numToIp(networkIdNum);
  const broadcast = numToIp(broadcastNum);
  const netmask = numToIp(mask);

  let firstHost = '';
  let lastHost = '';
  let totalHost = 0;

  if (prefix === 32) {
    firstHost = networkId;
    lastHost = networkId;
    totalHost = 1;
  } else if (prefix === 31) {
    firstHost = networkId;
    lastHost = broadcast;
    totalHost = 2;
  } else {
    firstHost = numToIp(networkIdNum + 1);
    lastHost = numToIp(broadcastNum - 1);
    totalHost = Math.pow(2, 32 - prefix) - 2;
  }

  return {
    networkId,
    broadcast,
    netmask,
    firstHost,
    lastHost,
    totalHost: totalHost < 0 ? 0 : totalHost,
  };
};
