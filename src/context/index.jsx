import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xa46f59556d5D8cC367f1bA40aa9859909176e4bC');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, // owner
                form.title, // title
                form.description, // description
                form.target,
                new Date(form.deadline).getTime(), // deadline,
                form.image
            ])

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
    }

    const getCampaignsHome = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner:campaign.owner,
            title:campaign.title,
            description:campaign.description,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            amtCollected:ethers.utils.formatEther(campaign.amtCollected.toString()),
            img:campaign.img,
            pId:i
        }))

        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaignsHome();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const donate = async(pId,amt) => {
        const data = await contract.call('donateToCampaign',pId,{
            value: ethers.utils.parseEther(amt)
        });

        return data;
    }

    const getDonations = async(pId) => {
        const donations = await contract.call('getDonators',pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i=0;i<numberOfDonations;i++){
            parsedDonations.push({
                donator:donations[0][i],
                donation:ethers.utils.formatEther(donations[1][i]).toString()
            })
        }

        return parsedDonations
    }
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaignsHome,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);