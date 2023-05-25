import pinataSDK from '@pinata/sdk';

const pinata = new pinataSDK(process.env.PINATA_API, process.env.PINATA_SECRET);
export default pinata;