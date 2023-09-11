import { ethers } from 'ethers';
import { WS_PROVIDER, SOCIAL_SCORE_CONTRACT_ADDRESS, SOCIAL_SCORE_ABI } from '../../config/constant';

export class SocialScoreService {
  provider: ethers.providers.WebSocketProvider;
  contract: ethers.Contract;
  constructor() {
    this.provider = new ethers.providers.WebSocketProvider(WS_PROVIDER);
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
