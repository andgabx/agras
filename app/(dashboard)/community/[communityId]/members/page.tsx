import MemberList from "./_components/member-list";

export default async function Participantes({
  params,
}: {
  params: { communityId: string };
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <MemberList communityId={params.communityId} />
    </div>
  );
}
