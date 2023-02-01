import React,{useState,useEffect} from 'react'
import {DisplayCampaigns} from '../components'

import { useStateContext } from '../context'

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaignsHome } = useStateContext();
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaignsHome();
    setCampaigns(data)
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCampaigns();
  },[address,contract])

  return (
    <DisplayCampaigns
    title="All Campaigns"
    isLoading={isLoading}
    campaigns={campaigns}
    />
  )
}

export default Home