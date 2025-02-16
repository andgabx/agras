import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { getMembers } from "../_actions/get-members";
import { Badge } from "@/components/ui/badge";
import { adminVerify } from "@/app/(dashboard)/community/[communityId]/participantes/_actions/admin-verify";

const MemberList = async ({ communityId }: { communityId: string }) => {

  const members = await getMembers(communityId);
  const adminId = await adminVerify(communityId);
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Participantes</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Posição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member: any) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell className="text-xs">{member.email}</TableCell>
              <TableCell>
                {member.id === adminId ? (
                  <Badge variant="default">Administrador</Badge>
                ) : (
                  <Badge variant="secondary">Membro</Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
