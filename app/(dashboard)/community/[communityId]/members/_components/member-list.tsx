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
import { adminVerify } from "@/app/(dashboard)/community/[communityId]/members/_actions/admin-verify";
import { X, Crown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const MemberList = async ({ communityId }: { communityId: string }) => {
  const members = await getMembers(communityId);
  const adminId = await adminVerify(communityId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            className="pl-10 w-[300px]"
            placeholder="Pesquise Membros..."
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Posição</TableHead>
            <TableHead>Ações</TableHead>
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
              <TableCell>
                <div className="flex flex-row space-x-2">
                  <button className="hover:scale-110 transition-transform">
                    <Crown />
                  </button>
                  <button className="hover:scale-110 transition-transform">
                    <X />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MemberList;
