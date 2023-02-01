import React,{useState,useEffect} from 'react'
import {DisplayCampaigns} from '../components'

import { useStateContext } from '../context'

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCampaigns();
  },[address,contract])

  return (
    <DisplayCampaigns
    title="My Campaigns"
    isLoading={isLoading}
    campaigns={campaigns}
    />
  )
}

export default Profile