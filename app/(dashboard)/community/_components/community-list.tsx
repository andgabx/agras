import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommunities } from "../_actions/get-communities";

const CommunityList = async () => {
  const communities = await getCommunities();
      
        return (
          <div className="space-y-4 mt-6">
            {communities.map((community) => (
              <Card key={community.id}>
                <CardHeader>
                  <CardTitle>{community.name}</CardTitle>
                  <CardDescription>
                    Membros: {community.members_count}
                    <br />
                    Criado em: {new Date(community.created_at).toLocaleDateString()}
                    <br />
                    Descrição: {community.description}
                    <br />
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
    </div>
  );
};

export default CommunityList;
