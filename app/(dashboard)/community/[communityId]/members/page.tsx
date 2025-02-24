import MemberList from "./_components/member-list";

export default async function Participantes({
  params,
}: {
  params: { communityId: string };
}) {
  return (
    <div className="">
      <MemberList communityId={params.communityId} />
    </div>
  );
}
