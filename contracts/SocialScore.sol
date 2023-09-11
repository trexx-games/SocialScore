// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialScore {
    struct DefiActions {
        uint256 loans;
        uint256 total_volume;
        uint256 swaps;
        uint256 repayments;
    }

    struct DaoActions {
        uint256 approvals;
        uint256 proposals_submitted;
        uint256 votes;
    }

    struct NftActions {
        uint256 minted;
        uint256 purchased;
        uint256 sold;
        uint256 held;
    }

    struct TokenActions {
        uint256 total_volume;
        uint256 purchased;
        uint256 sold;
        uint256 held;
    }

    struct GeneralActions {
        uint256 transactions;
        uint256 unique_addresses_interacted;
    }

    struct UserScore {
        DefiActions defi_actions;
        DaoActions dao_actions;
        TokenActions token_actions;
        NftActions nft_actions;
        GeneralActions general_actions;
    }

    mapping(address => UserScore) public userScores;
    event ScoreUpdated(address indexed user);

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, 'Not the contract owner');
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function updateDefiActions(
        address _user,
        uint256 _loans,
        uint256 _total_volume,
        uint256 _swaps,
        uint256 _repayments
    ) external onlyOwner {
        userScores[_user].defi_actions = DefiActions(
            _loans,
            _total_volume,
            _swaps,
            _repayments
        );
        emit ScoreUpdated(_user);
    }

    function updateDaoActions(
        address _user,
        uint256 _approvals,
        uint256 _proposals_submitted,
        uint256 _votes
    ) external onlyOwner {
        userScores[_user].dao_actions = DaoActions(
            _approvals,
            _proposals_submitted,
            _votes
        );
        emit ScoreUpdated(_user);
    }

    function updateNftActions(
        address _user,
        uint256 _minted,
        uint256 _purchased,
        uint256 _sold,
        uint256 _held
    ) external onlyOwner {
        userScores[_user].nft_actions = NftActions(
            _minted,
            _purchased,
            _sold,
            _held
        );
        emit ScoreUpdated(_user);
    }

    function updateTokenActions(
        address _user,
        uint256 _total_volume,
        uint256 _purchased,
        uint256 _sold,
        uint256 _held
    ) external onlyOwner {
        userScores[_user].nft_actions = NftActions(
            _total_volume,
            _purchased,
            _sold,
            _held
        );
        emit ScoreUpdated(_user);
    }

    function updateGeneralActions(
        address _user,
        uint256 _transactions,
        uint256 _unique_addresses_interacted
    ) external onlyOwner {
        userScores[_user].general_actions = GeneralActions(
            _transactions,
            _unique_addresses_interacted
        );
        emit ScoreUpdated(_user);
    }

    function getDefiActions(
        address _user
    ) external view returns (DefiActions memory) {
        return userScores[_user].defi_actions;
    }

    function getDaoActions(
        address _user
    ) external view returns (DaoActions memory) {
        return userScores[_user].dao_actions;
    }

    function getNftActions(
        address _user
    ) external view returns (NftActions memory) {
        return userScores[_user].nft_actions;
    }

    function getGeneralActions(
        address _user
    ) external view returns (GeneralActions memory) {
        return userScores[_user].general_actions;
    }
}
