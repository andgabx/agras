import CommunitySettingsCard from "./_components/manage-account-cards";


export default async function Settings({
  params,
}: {
  params: { communityId: string };
}) {
  return (
    <div className="h-full">
      <CommunitySettingsCard communityId={params.communityId} />
    </div>
  );
}
