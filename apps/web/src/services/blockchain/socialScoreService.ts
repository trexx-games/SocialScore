import { ethers } from 'ethers';
import { JSON_RPC_URL, 
        MUMBAI_NETWORK_ID, 
        SOCIAL_SCORE_CONTRACT_ADDRESS, 
        SOCIAL_SCORE_ABI } from '../../config/constant';

export class SocialScoreService {
  provider: ethers.providers.JsonRpcProvider;
  contract: ethers.Contract;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      JSON_RPC_URL,
      MUMBAI_NETWORK_ID
    );
    this.contract = new ethers.Contract(SOCIAL_SCORE_CONTRACT_ADDRESS, SOCIAL_SCORE_ABI, this.provider);
  }

  getProvider = () => this.provider;

  getDefiActions = async (address: string) => {
    return await this.contract.getDefiActions(address);
  }

  getNftActions = async (address: string) => {
    return await this.contract.getNftActions(address);
  }

  getDaoActions = async (address: string) => {
    return await this.contract.getDaoActions(address);
  }

  getGeneralActions = async (address: string) => {
    return await this.contract.getGeneralActions(address);
  }

  getUserScores = async (address: string) => {
    return await this.contract.getUserScores(address);
  }

}
