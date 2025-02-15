import LeaveCommunity from "./_components/leave-community";
import CommunitySettingsCard from "./_components/manage-account-cards";
import { getCommunity } from "./_actions/get-specific-community";

export default async function Settings({
  params,
}: {
  params: { communityId: string };
}) {
  const community = await getCommunity(params.communityId);
  return (
    <div className="h-full flex gap-4">
      <CommunitySettingsCard communityId={params.communityId} />
      <LeaveCommunity community={community} />
    </div>
  );
}
