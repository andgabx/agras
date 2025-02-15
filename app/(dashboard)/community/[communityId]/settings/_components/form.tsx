import { getCommunity } from "../_actions/get-specific-community";
import CommunitySettingsFormClient from "./edit-form";
import React from "react";

export default async function CommunitySettingsCard({
  communityId,
}: {
  communityId: string;
}) {
  const community = await getCommunity(communityId);

  return <CommunitySettingsFormClient community={community} />;
}
