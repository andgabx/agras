import MemberList from "./_components/member-list";

export default async function Participantes({
  params,
}: {
  params: { communityId: string };
}) {
  return (
    <div className="h-full flex flex-col gap-4 max-w-xl">
      <MemberList communityId={params.communityId} />
    </div>
  );
}
