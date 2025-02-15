import { getCommunity } from "../_actions/get-specific-community";
import CommunitySettingsFormClient from "./edit-form";

export default async function CommunitySettingsCard({
  communityId,
}: {
  communityId: string;
}) {
  const community = await getCommunity(communityId);


  return <CommunitySettingsFormClient community={community} />;
}
